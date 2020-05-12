import React, { useState, useEffect } from 'react';
import '../scss/desktop.scss'
import Logo from '../media/logo192.png'

const TaskBarItem = (props:any) => {

    return(
        <div 
        className={props.focusedWin === props.id ? "taskBarItem selected" : "taskBarItem"}
        onClick={(e) => {
            e.stopPropagation();
            props.WindowManagement.MinimizeWindow(props.id);
        }}
        >
            <img src={props.iconsrc} />
            <label>{props.title}</label>
        </div>
    )
}

export default TaskBarItem