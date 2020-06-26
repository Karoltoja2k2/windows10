import React, { useState, useEffect } from 'react';
import '../scss/icon.scss'


const FileIcon = (props: any) => {

    console.log(props)

    function OpenFileEvent(event: any) {
        props.Navigate(props.id, props.file)
    }
    return (
        <div className="icon" onDoubleClick={(e) => OpenFileEvent(e)}>
            <div className="bg"></div>
            <img src={props.file.iconsrc} alt="fileIcon" />
            <label>{props.file.title}{props.file.extension}</label>
        </div>
    );
}

export default FileIcon