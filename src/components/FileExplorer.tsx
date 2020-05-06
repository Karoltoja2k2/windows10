import React, { useState, useEffect } from 'react';
import '../scss/fileExplorer.scss'
import FileStructure from '../media/fileStructure.json'

import Icon from './Icon'


const FileExplorer = (props:any) => {
    var iconsInFolder = FileStructure.filter(x => x.path == props.fileObj.file.contentPath)
    return (
        <div className="explorerContainer">
            <div className="toolBar">

            </div>
            <div className="iconGrid">
                {
                    iconsInFolder &&
                    iconsInFolder.map((file:any, index:number) => (
                        <Icon fileObj={{file: file, id:props.fileObj.id}} Navigate={props.Navigate}/>
                    ))
                }
            </div>
        </div>
    );
}

export default FileExplorer