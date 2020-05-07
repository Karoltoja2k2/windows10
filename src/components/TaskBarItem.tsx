import React, { useState, useEffect } from 'react';
import '../scss/desktop.scss'
import Logo from '../media/logo192.png'

const TaskBarItem = () => {

    return(
        <div className="taskBarItem">
            <img src={Logo} />
            <label>Test</label>
        </div>
    )
}

export default TaskBarItem