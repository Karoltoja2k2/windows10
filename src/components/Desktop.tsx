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

    const [openWindows, setOpenWindows] = useState<any[]>([])
    function OpenWindow(file: any) {
        console.log(file)
        setOpenWindows([...openWindows, file])
        console.log(openWindows)
    }
    useEffect(() => {
        console.log(openWindows)
    }, [openWindows])
    

    function CloseWindow() {
        // var newList = openWindows.filter()
        console.log('qwe')
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
                        title={obj.title} 
                        file={obj.file} 
                    />
                ))
            }

            <div className="iconGrid">
                {
                    DesktopIcons.map((obj:any, index:number) => (
                        <Icon OpenWindow={OpenWindow} file={obj}/>
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
