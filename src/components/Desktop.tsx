import React, { useState, useEffect, useCallback } from 'react';
import '../scss/desktop.scss'
import Icon from './Icon'
import WindowBase from './WindowBase'
import Taskbar from './Taskbar'


import FileStructure from '../media/fileStructure.json'
import files from '../media/fileStructure'


function Desktop() {
    const path = "Drive:/desktop/"
    var DesktopIcons = files.filter(x => x.path === path)

    const [openWindowsCount, setOpenWindowsCount] = useState(1);
    const [openWindows, setOpenWindows] = useState<any[]>([])

    // interface Window {                        
    //     id: number,
    //     windowProps: {
    //         isFocused: true,
    //         isMinimized: false,
    //         isFullScreen: false
    //     },
    //     data: {},
    //     file: {}
    // }

    function Window(id: number, file: any, dimensions: any) {
        return {
            id: id,
            windowProps: {
                ...dimensions,
                isFocused: true,
                isMinimized: false,
                isFullScreen: false
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
            console.log(oF)
            setOpenWindows([...openWindows, oF])
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
        if (window.windowProps.isFocused && !window.windowProps.isMinimized) {
            window.windowProps = {
                ...window.windowProps,
                isMinimized: true,
            }
            setFocusedWin(0)
        } else if (!window.windowProps.isFocused && !window.windowProps.isMinimized) {
            setFocusedWin(id);
        } else if (window.windowProps.isMinimized) {
            window.windowProps = {
                ...window.windowProps,
                isMinimized: false,
            }
            setFocusedWin(id);
        }
        setOpenWindows(windows)
    }

    function UnMinimizeWindow(id: number) {

    }

    function FullScreenMode(id: number) {
        console.log('fullscreen')
    }

    const [focusedWin, setFocusedWin] = useState(0)

    useEffect(() => {
        var windows = openWindows.slice();
        windows.forEach(function (win) {
            if (win.id === focusedWin) {
                win.windowProps = {
                    ...win.windowProps,
                    isFocused: true
                }
            } else {
                win.windowProps = {
                    ...win.windowProps,
                    isFocused: false
                }
            }
        })
        setOpenWindows(windows)
    }, [focusedWin])

    const SetStyle = (id: number, styleToSet: any) => {
        console.log(openWindows)

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
        SetFocusedWin: setFocusedWin,
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
                key={obj.id}
                file={obj.file}
                id={obj.id}
                windowProps={obj.windowProps}
                data={obj.data}
                WindowManagement={WindowManagement}
                DataManagement={DataManagement}
                openWindowsCount={openWindowsCount}
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


            <div className="activateWindows">
                <p className="top">Aktywuj system Windows</p>
                <p className="down">Przejdź do ustawień, aby aktywować system Windows.</p>
            </div>

            <Taskbar
                openWindows={openWindows}
                focusedWin={focusedWin}
                WindowManagement={WindowManagement}
            />
        </div>
    );
}

export default Desktop;
