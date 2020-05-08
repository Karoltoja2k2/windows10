import React, { useState, useEffect } from 'react'
import WindowBase from './WindowBase'


const PhotoDisplay = (props: any) => {
    return (
        <WindowBase
            id={props.id}
            title={props.file.title}
            style={props.style}
            WindowManagement={props.WindowManagement}
        >
            <div></div>
        </WindowBase>
    );
}

export default PhotoDisplay