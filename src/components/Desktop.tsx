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

    interface Window {
        id: number,
        windowProps: {
            top: number,
            left: number,
            width: number,
            height: number,
            isFocused: boolean,
            isMinimized: boolean,
            isFullScreen: boolean,
        },
        component: (props: any) => JSX.Element,
        file: {
            path: string,
            contentPath: string,
            title: string,
            iconsrc: string,
            extension: string
        }
    }

    function Win(id: number, file: any) {
        return {
            id: id,
            windowProps: {
                isFocused: true,
                isMinimized: false,
                isFullScreen: false
            },
            component: file.component,
            file: {
                ...file
            }
        }
    }

    function Navigate(id: number, fileToOpen: any) {
        var oF;
        if (id === 0 || fileToOpen.extension !== '.fld') {
            oF = Win(openWindowsCount, fileToOpen)
            setOpenWindows([...openWindows, oF])
            setOpenWindowsCount(openWindowsCount + 1)
        } else {
            var windows = openWindows.slice();
            var window = windows.find(x => x.id === id)!
            window.file = { ...fileToOpen };
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
        var window = windows.find(x => x.id === id)!
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
    function FullScreenMode(id: number) {
        var windows = openWindows.slice();
        var window = windows.find(x => x.id === id)!
        window.windowProps = {
            ...window.windowProps,
            isFullScreen:true,
            isFocused:true
        }
        console.log(window.windowProps)
        setOpenWindows(windows)
    }

    function setFocusedWin(id: number) {
        var windows = openWindows.slice();
        windows.forEach(function (win) {
            if (win.id === id) {
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
    }

    const [lmbDown, setLmbDown] = useState(false);
    useEffect(() => {
        console.log(lmbDown)
    }, [lmbDown])

    const [movingPos, setMovingPos] = useState({})

    const WindowManagement = {
        SetFocusedWin: setFocusedWin,
        setLmbDown: setLmbDown,
        movingPos: movingPos,
        lmbDown: lmbDown,
        Navigate: Navigate,
        CloseWindow: CloseWindow,
        MinimizeWindow: MinimizeWindow,
        FullScreenMode: FullScreenMode
    }

    function RenderWindow(obj: Window) {
        return (
            <obj.component
                key={obj.id}
                file={obj.file}
                id={obj.id}
                windowProps={obj.windowProps}
                WindowManagement={WindowManagement}
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
                setLmbDown(false)
            }}
            onMouseMove={(e) => {
                if (lmbDown) {
                    console.log('moving')
                    setMovingPos({
                        top: e.pageY,
                        left: e.pageX
                    })
                }
            }}
        >
            {
                openWindows.length > 0 &&
                openWindows.map((obj: Window, index: number) => (
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
                WindowManagement={WindowManagement}
            />
        </div>
    );
}

export default Desktop;
