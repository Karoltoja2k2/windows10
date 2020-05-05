import React, { useState, useEffect } from 'react';
import '../scss/fileExplorer.scss'
import FileStructure from '../media/fileStructure.json'


const FileExplorer = (props:any) => {
    console.log(props.path)
    var iconsInFolder = FileStructure.filter(x => x.path == props.file.path + props.file.title + '/')
    console.log(iconsInFolder)
    return (
        <div className="explorerContainer">
            <div className="toolBar">

            </div>
            <div className="filesContainer">

            </div>
        </div>
    );
}

export default FileExplorer