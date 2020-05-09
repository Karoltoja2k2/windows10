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

    const [openFilesCount, setOpenFilesCount] = useState(1);
    const [openFiles, setOpenFiles] = useState<any[]>([])

    function openFile(id: number, file: any, style: any) {
        return {
            id: id,
            style: style,
            data: {},
            file: file
        }
    }

    function UpdateWindow(id: number, dataUpdate: any) {
        var threadedWinIndex = openFiles.findIndex(x => x.id == id)
        var threadedWin = openFiles.splice(threadedWinIndex, 1)
        threadedWin[0].data = dataUpdate
        setOpenFiles([...openFiles, threadedWin[0]])
    }

    function Navigate(id: number, fileToOpen: any) {
        var oF;
        if (id === 0 || fileToOpen.extension !== '.fld') {
            oF = openFile(openFilesCount, fileToOpen, {
                left: openFilesCount * 10 + 100,
                top: openFilesCount * 10 + 100,
                height: 400,
                width: 600,
                zIndex: 4,
                position: 'absolute'
            })
            setOpenFiles([...openFiles, oF])
            setOpenFilesCount(openFilesCount + 1)
        } else {
            var threadedWinIndex = openFiles.findIndex(x => x.id == id)
            var threadedWin = openFiles.splice(threadedWinIndex, 1)
            threadedWin[0].file = fileToOpen
            setFocusedWin(id);
            setOpenFiles([...openFiles, threadedWin[0]])
        }
    }

    function CloseWindow(id: number) {
        setFocusedWin(0);
        var newList = openFiles.filter(x => x.id != id)
        setOpenFiles(newList);
    }

    function MinimizeWindow(id: number) {
        var files = openFiles.slice();
        var file = files.find(x => x.id === id)
        file.style = {
            ...file.style,
            display: 'none'
        }
        setOpenFiles(files);
    }

    function FullScreenMode(id: number) {
        console.log('fullscreen')
    }

    const [focusedWin, setFocusedWin] = useState(0)
    useEffect(() => {
        var windows = openFiles.slice();
        windows.forEach(function (win) {
            if (win.id === focusedWin) {
                win.style = {
                    ...win.style,
                    zIndex: 4
                }
            } else {
                win.style = {
                    ...win.style,
                    zIndex: 3
                }
            }
        })
    }, [focusedWin])

    function SetStyle(id: number, styleToSet: any) {
        console.log(id)
        var windows = openFiles.slice();
        var file = windows.find(x => x.id === id)

        var array = Object.entries(styleToSet)
        for (const entry of array) {
            file.style[entry[0]] = entry[1]
        }
        file.style = {
            ...file.style,
        };
        setOpenFiles(windows);
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
                style={obj.style}
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
                openFiles.length > 0 &&
                openFiles.map((obj: any, index: number) => (
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
                    <TaskBarItem />
                    <TaskBarItem />

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
