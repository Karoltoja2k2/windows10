import React from 'react';
import '../scss/desktop.scss'
import Icon from './Icon'

import Logo from '../media/win_logo.png'


function Desktop() {

    function loopItems(){
        let children = []
        for (let i = 0; i < 30; i++){
            children.push(<Icon/>);
        }
        return children;
    }

    return (
    <div className="desktop">
        <div className="iconGrid">     
            { loopItems() }
        </div>
        <div className="taskBar">
            <button className="startBtn">
                <img src={Logo} alt="startBtnLogo"/>    
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
