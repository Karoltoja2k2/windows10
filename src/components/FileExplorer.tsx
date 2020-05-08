import React, { useState, useEffect } from 'react';
import '../scss/fileExplorer.scss'
import FileStructure from '../media/fileStructure.json'
import WindowBase from './WindowBase'
import files from '../media/fileStructure'

import Icon from './Icon'


const FileExplorer = (props: any) => {
    console.log(props)
    var iconsInFolder = files.filter(x => x.path == props.file.contentPath)

    return (
        <WindowBase 
            id={props.id}
            title={props.file.title}
            style={props.style}
            WindowManagement={props.WindowManagement}
        >
            <div className="explorerContainer" style={{}}
            >
                <div className="toolBar">

                </div>
                <div className="iconGrid">
                    {
                        iconsInFolder &&
                        iconsInFolder.map((file: any, index: number) => (
                            <Icon file={file}  id={props.id} Navigate={props.WindowManagement.Navigate} />
                        ))
                    }
                    <button>TEST</button>
                </div>
            </div>
        </WindowBase>
    );
}

export default FileExplorer