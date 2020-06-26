import React, { useState, useEffect } from 'react'
import WindowBase from './WindowBase'
import Logo from '../media/win_logo.png'
import '../scss/photoDisplay.scss'


const PhotoDisplay = (props: any) => {


    return (
        <WindowBase
            id={props.id}
            title={props.file.title}
            windowProps={props.windowProps}
            WindowManagement={props.WindowManagement}
        >
            <div className="photoContainer">
                <img src={props.file.source} />
            </div>
        </WindowBase>
    );
}

export default PhotoDisplay