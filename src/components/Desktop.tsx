import React, { useState, useEffect } from 'react';
import '../scss/desktop.scss'
import Icon from './Icon'
import WindowBase from './WindowBase'
import TaskBarItem from './TaskBarItem'

import Logo from '../media/win_logo.png'

import FileStructure from '../media/fileStructure.json'
import files from '../media/fileStructure'


function Desktop() {
    const path = "Drive:/desktop/"
    var DesktopIcons = files.filter(x => x.path === path)

    const [openWindowsCount, setOpenWindowsCount] = useState(1);
    const [openWindows, setOpenWindows] = useState<any[]>([])

    function Window(id: number, file: any, dimensions: any) {
        return {
            id: id,
            windowProps: {
                ...dimensions,
                isFocused: true,
                isMinimized:false,
                isFullScreen:false
            },
            data: {},
            file: file
        }
    }

    function UpdateWindow(id: number, dataUpdate: any) {
        var windows = openWindows.slice();
        var window = windows.find(x => x.id === id)
        window.data = dataUpdate;
        setOpenWindows(windows);
    }

    function Navigate(id: number, fileToOpen: any) {
        var oF;
        if (id === 0 || fileToOpen.extension !== '.fld') {
            oF = Window(openWindowsCount, fileToOpen, {
                left: openWindowsCount * 10 + 100,
                top: openWindowsCount * 10 + 100,
                height: 400,
                width: 600,
                position: 'absolute'
            })
            setOpenWindows([...openWindows, oF])
            setFocusedWin(openWindowsCount);
            setOpenWindowsCount(openWindowsCount + 1)
        } else {
            var windows = openWindows.slice();
            var window = windows.find(x => x.id === id)
            window.data = {}
            window.file = fileToOpen;
            setFocusedWin(id);
            setOpenWindows(windows);
        }
    }

    function CloseWindow(id: number) {
        setFocusedWin(0);
        var newList = openWindows.filter(x => x.id != id)
        setOpenWindows(newList);
    }

    function MinimizeWindow(id: number) {
        var windows = openWindows.slice();
        var window = windows.find(x => x.id === id)
        window.windowProps.isMinimized = true;
        setOpenWindows(windows);
    }

    function UnMinimizeWindow(){

    }

    function FullScreenMode(id: number) {
        console.log('fullscreen')
    }

    const [focusedWin, setFocusedWin] = useState(0)
    useEffect(() => {
        console.log(openWindows)
        var windows = openWindows.slice();
        windows.forEach(function (win) {
            if (win.id === focusedWin) {
                win.windowProps.isFocused = true;
            } else {
                win.windowProps.isFocused = false;
            }
        })
    }, [focusedWin])

    function SetStyle(id: number, styleToSet: any) {
        var windows = openWindows.slice();
        var window = windows.find(x => x.id === id)
        var array = Object.entries(styleToSet)
        for (const entry of array) {
            window.windowProps[entry[0]] = entry[1]
        }
        window.windowProps = {
            ...window.windowProps,
        };
        setOpenWindows(windows);
    }

    const [offset, setOffset] = useState({
        top: 0,
        left: 0
    })
    const [movingWin, setMovingWin] = useState(0)
    function SetMovinWinPosition(e: any) {
        if (movingWin !== 0) {
            SetStyle(movingWin, {
                top: e.pageY - offset.top,
                left: e.pageX - offset.left
            })
        }
    }

    const WindowManagement = {
        setMovingWin: setMovingWin,
        SetStyle: SetStyle,
        setOffset: setOffset,
        setFocusedWin: setFocusedWin,
        Navigate: Navigate,
        CloseWindow: CloseWindow,
        MinimizeWindow: MinimizeWindow,
        FullScreenMode: FullScreenMode
    }

    const DataManagement = {
        UpdateWindow: UpdateWindow
    }

    function RenderWindow(obj: any) {
        return (
            <obj.file.component
                file={obj.file}
                id={obj.id}
                windowProps={obj.windowProps}
                data={obj.data}
                WindowManagement={WindowManagement}
                DataManagement={DataManagement}
            />
        );
    }


    console.log('render desktop')
    return (
        <div
            className="desktop"
            id="desktop"
            onMouseUp={() => {
                setMovingWin(0)
                setOffset({
                    top: 0,
                    left: 0
                })
            }}
            onMouseMove={(e) => SetMovinWinPosition(e)}
        >
            {
                openWindows.length > 0 &&
                openWindows.map((obj: any, index: number) => (
                    RenderWindow(obj)
                ))
            }

            <div className="iconGrid">
                {
                    DesktopIcons.map((obj: any, index: number) => (
                        <Icon Navigate={Navigate} file={obj} id={0} />
                    ))
                }
            </div>
            <div className="taskBar">
                <button className="startBtn">
                    <img src={Logo} alt="startBtnLogo" />
                </button>

                <div className="taskBarItems">
                    {
                        openWindows.length > 0 &&
                        openWindows.map((obj: any, index: number) => (
                            <TaskBarItem id={obj.id} title={obj.file.title} iconsrc={obj.file.iconsrc}/>
                        ))
                    }
                    

                </div>
                <div className="toolBar">
                    <p className="timeContainer">11:45</p>
                    <button className="minimizeAllBtn"></button>

                </div>
            </div>
        </div>
    );
}

export default Desktop;
