import React, { useState, useEffect } from 'react';
import '../scss/desktop.scss'
import Icon from './Icon'
import WindowBase from './WindowBase'
import FileExplorer from './FileExplorer'
import FileStructure from '../media/fileStructure.json'

import Logo from '../media/win_logo.png'


function Desktop() {

    const path = "Drive:/desktop/"
    var DesktopIcons = FileStructure.filter(x => x.path == path)

    const [position, setPosition] = useState({
        top: 100,
        left: 100
    })

    const [lmbDown, setLmbDown] = useState(false)
    function changeLmbDown(state: boolean) {
        setLmbDown(lmbDown => state);
    }

    const [windowsCount, setWindowsCount] = useState(1);
    const [openWindows, setOpenWindows] = useState<any[]>([])
    function OpenWindow(fileObj: any) {
        if (fileObj.id == 0){
            fileObj.id = windowsCount;
            setOpenWindows([...openWindows, fileObj])
            setWindowsCount(windowsCount + 1)
        }
    }

    function Navigate(file:any){
        var extension = file.file.extension
        console.log(openWindows)
        if (extension){
            if(extension == '.fld'){
                OpenFolder(file)
            } else {
                OpenFile(file)
            }
        }
    }

    function OpenFile(file: any){
        file.id = windowsCount;
        setOpenWindows([...openWindows, file])
        setWindowsCount(windowsCount + 1)
    }

    useEffect(() => {
        console.log(openWindows)
    }, [openWindows])

    function OpenFolder(folder:any) {
        if (folder.id == 0){
            // open if not open
            folder.id = windowsCount;
            setOpenWindows([...openWindows, folder])
            setWindowsCount(windowsCount + 1)

        } else {
            // navigate if open
            var threadedWinIndex = openWindows.findIndex(x => x.id == folder.id)
            var threadedWin = openWindows.splice(threadedWinIndex, 1)
            threadedWin[0].file = folder.file

            setOpenWindows([...openWindows, threadedWin[0]])   
        }
    }

    function CloseWindow(fileObj:any) {
        var newList = openWindows.filter(x => x.id != fileObj.id)
        setOpenWindows(newList);
    }

    function NavigateToWin(){

    }


    return (
        <div
            className="desktop"
            id="desktop"
            onMouseUp={(e) => {
                changeLmbDown(false)
                setPosition({
                    top: e.pageY,
                    left: e.pageX
                })
            }}
            onMouseMove={(e) => {
                if (lmbDown) {
                    setPosition({
                        top: e.pageY,
                        left: e.pageX
                    })
                }
            }}
            onMouseLeave={(e) => {
                changeLmbDown(false)
            }}
        >

            {
                openWindows.length > 0 &&
                openWindows.map((obj: any, index: number) => (
                    <WindowBase 
                        lmbDown={lmbDown} 
                        setLmbDown={changeLmbDown}
                        position={position}
                        Navigate={Navigate}
                        CloseWindow={CloseWindow}
                        fileObj={obj}
                    />
                ))
            }

            <div className="iconGrid">
                {
                    DesktopIcons.map((obj:any, index:number) => (
                        <Icon Navigate={Navigate} fileObj={{file: obj, id: 0}}/>
                    ))
                }
            </div>
            <div className="taskBar">
                <button className="startBtn">
                    <img src={Logo} alt="startBtnLogo" />
                </button>

                <div className="taskBarItems">
                    <div className="taskBarItem">
                    </div>
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
