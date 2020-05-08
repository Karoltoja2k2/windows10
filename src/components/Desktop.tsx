import React, { useState, useEffect } from 'react';
import '../scss/desktop.scss'
import Icon from './Icon'
import WindowBase from './WindowBase'
import FileExplorer from './FileExplorer'
import FileStructure from '../media/fileStructure.json'
import TaskBarItem from './TaskBarItem'

import Logo from '../media/win_logo.png'
import { NONAME } from 'dns';


function Desktop() {

    const path = "Drive:/desktop/"
    var DesktopIcons = FileStructure.filter(x => x.path == path)

    const [openFilesCount, setOpenFilesCount] = useState(1);
    const [openFiles, setOpenFiles] = useState<any[]>([])

    function openFile(id: number, file: any, style: any) {
        return {
            id: id,
            file: file,
            style: style
        }
    }

    function Navigate(fileReference: any) {
        var extension = fileReference.file.extension
        if (extension) {
            if (extension == '.fld') {
                OpenFolder(fileReference)
            } else {
                OpenFile(fileReference)
            }
        }
    }

    function OpenFile(fileReference: any) {
        var oF = openFile(openFilesCount, fileReference.file, {
            left: openFilesCount * 10 + 100,
            top: openFilesCount * 10 + 100,
            height: 400,
            width:600,
            zIndex: 4
        })
        console.log(oF)
        setOpenFiles([...openFiles, oF])
        setOpenFilesCount(openFilesCount + 1)
    }

    function OpenFolder(folderToOpen: any) {
        if (folderToOpen.id == 0) {
            var oF = openFile(openFilesCount, folderToOpen.file, {
                left: openFilesCount * 10 + 100,
                top: openFilesCount * 10 + 100,
                height: 400,
                width:600,
                zIndex: 4
            })
            setOpenFiles([...openFiles, oF])
            setOpenFilesCount(openFilesCount + 1)

        } else {
            // navigate if open
            var threadedWinIndex = openFiles.findIndex(x => x.id == folderToOpen.id)
            var threadedWin = openFiles.splice(threadedWinIndex, 1)
            threadedWin[0].file = folderToOpen.file
            var oF = openFile(folderToOpen.id, folderToOpen.file, {
                ...threadedWin[0].style,
                zIndex: 4
            })
            setOpenFiles([...openFiles, oF])
        }
    }

    function CloseWindow(openFile: any) {
        setFocusedWin(0);
        var newList = openFiles.filter(x => x.id != openFile.id)
        console.log(newList)
        setOpenFiles(newList);
    }

    function MinimizeWindow(openFile: any) {
        var files = openFiles.slice();
        var file = files.find(x => x.id === openFile.id)
        file.style = {
            ...file.style,
            display: 'none'
        }
        setOpenFiles(files);
    }

    function FullScreenMode(openFile: any) {
        console.log('fullscreen')

    }

    const [focusedWin, setFocusedWin] = useState(0)
    useEffect(() => {
        console.log('asd')
        var windows = openFiles.slice();
        windows.forEach(function(win){
            if (win.id === focusedWin){
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

    const [offset, setOffset] = useState({
        top: 0,
        left: 0
    })
    const [movingWin, setMovingWin] = useState(0)
    function Test(e: any) {
        if (movingWin !== 0) {
            var windows = openFiles.slice();
            var file = windows.find(x => x.id === movingWin)
            file.style = {
                ...file.style,
                top: e.pageY - offset.top,
                left: e.pageX - offset.left
            }
            setOpenFiles(windows);
        }
    }

    const WindowManagement = {
        setMovingWin: setMovingWin,
        setOffset: setOffset,
        setFocusedWin: setFocusedWin,
        Navigate: Navigate,
        CloseWindow: CloseWindow,
        MinimizeWindow: MinimizeWindow,
        FullScreenMode: FullScreenMode
    }


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
            onMouseMove={(e) => Test(e)}
        >
            {
                openFiles.length > 0 &&
                openFiles.map((obj: any, index: number) => (
                    <WindowBase
                        openFile={obj}
                        position={obj.position}
                        fnc={WindowManagement}

                    />
                ))
            }

            <div className="iconGrid">
                {
                    DesktopIcons.map((obj: any, index: number) => (
                        <Icon Navigate={Navigate} fileReference={{ file: obj, id: 0 }} />
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
