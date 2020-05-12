import React from 'react'
import TaskBarItem from './TaskBarItem'

import '../scss/taskbar.scss'
import Logo from '../media/win_logo.png'


const Taskbar = (props:any) => {


    return(
        <div className="taskBar">
            <button className="startBtn">
                <img src={Logo} alt="startBtnLogo" />
            </button>

            <div className="taskBarItems">
                {
                    props.openWindows.length > 0 &&
                    props.openWindows.map((obj: any, index: number) => (
                        <TaskBarItem id={obj.id} focusedWin={props.focusedWin} title={obj.file.title} iconsrc={obj.file.iconsrc} WindowManagement={props.WindowManagement} />
                    ))
                }
                

            </div>
            <div className="toolBar">
                <p className="timeContainer">11:45</p>
                <button className="minimizeAllBtn"></button>

            </div>
        </div>
    );
}

export default Taskbar