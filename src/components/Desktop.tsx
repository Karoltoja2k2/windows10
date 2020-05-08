import React, { useState, useEffect } from 'react';
import '../scss/desktop.scss'
import Icon from './Icon'
import WindowBase from './WindowBase'
import FileExplorer from './FileExplorer'
import TaskBarItem from './TaskBarItem'

import Logo from '../media/win_logo.png'

import FileStructure from '../media/fileStructure.json'
import files from '../media/fileStructure'


function Desktop() {

    console.log(files)

    const path = "Drive:/desktop/"
    var DesktopIcons = files.filter(x => x.path === path)

    const [openFilesCount, setOpenFilesCount] = useState(1);
    const [openFiles, setOpenFiles] = useState<any[]>([])

    function openFile(id: number, file: any, style: any) {
        return {
            id: id,
            file: file,
            style: style
        }
    }

    function Navigate(id:number, fileToOpen: any) {
        if (id === 0 || fileToOpen.extension !== '.fld'){
            var oF = openFile(openFilesCount, fileToOpen, {
                left: openFilesCount * 10 + 100,
                top: openFilesCount * 10 + 100,
                height: 400,
                width:600,
                zIndex: 4,
                position: 'absolute'
            })
            setOpenFiles([...openFiles, oF])
            setOpenFilesCount(openFilesCount + 1)
        } else {
            var oF = openFile(id, fileToOpen, {
                left: openFilesCount * 10 + 100,
                top: openFilesCount * 10 + 100,
                height: 400,
                width:600,
                zIndex: 4,
                position: 'absolute'
            })
            var threadedWinIndex = openFiles.findIndex(x => x.id == id)
            var threadedWin = openFiles.splice(threadedWinIndex, 1)
            threadedWin[0].file = fileToOpen
            var oF = openFile(id, fileToOpen, {
                ...threadedWin[0].style,
                zIndex: 4
            })
            setOpenFiles([...openFiles, oF])
        }
    }

    function CloseWindow(id: number) {
        setFocusedWin(0);
        var newList = openFiles.filter(x => x.id != id)
        console.log(newList)
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

    function SetStyle(id:number, styleToSet:any){
        console.log(id)
        var windows = openFiles.slice();
        var file = windows.find(x => x.id === id)
        file.style = styleToSet;

        setOpenFiles(windows);
    }

    const [offset, setOffset] = useState({
        top: 0,
        left: 0
    })
    const [movingWin, setMovingWin] = useState(0)
    function SetMovinWinPosition(e: any) {
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
        SetStyle: SetStyle,
        setOffset: setOffset,
        setFocusedWin: setFocusedWin,
        Navigate: Navigate,
        CloseWindow: CloseWindow,
        MinimizeWindow: MinimizeWindow,
        FullScreenMode: FullScreenMode
    }

    function RenderWindow(obj:any){
        console.log(obj)
        return (
            obj.file.component({...obj, WindowManagement})
        );
    }


    console.log('render')
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
