import React, { useState, useEffect } from 'react';
import '../scss/fileExplorer.scss'
import FileStructure from '../media/fileStructure.json'
import WindowBase from './WindowBase'
import files from '../media/fileStructure'

import Icon from './Icon'


const FileExplorer = (props: any) => {
    console.log('render' + props.file.title)
    var iconsInFolder = files.filter(x => x.path == props.file.contentPath)

    const [data, setData] = useState(props.data)
    const [isRed, setIsRed] = useState(false)

    return (
        <WindowBase
            id={props.id}
            title={props.file.title}
            windowProps={props.windowProps}
            WindowManagement={props.WindowManagement}
        >
            <div className="explorerContainer" style={{ background: isRed ? "red" : "" }}
            >
                <div className="toolBar">
                    <button></button>
                    <button></button>

                    <textarea></textarea>
                    <input type="text"></input>
                </div>
                <div
                    className="iconGrid"
                    onMouseDown={(e) => {
                        e.stopPropagation()
                        props.WindowManagement.SetFocusedWin(props.id)
                    }}
                >
                    {
                        iconsInFolder &&
                        iconsInFolder.map((file: any, index: number) => (
                            <Icon file={file} id={props.id} Navigate={props.WindowManagement.Navigate} />
                        ))
                    }
                    <button onClick={() => {
                        setIsRed(!isRed);
                    }}>TEST</button>
                </div>
            </div>
        </WindowBase>
    );
}

// export default React.memo(FileExplorer, (prevProps, nextProps) => {
//     return prevProps.test === nextProps.test
// 
// })

export default React.memo(FileExplorer, (prevProps, nextProps) => {
    // console.log(nextProps.id, nextProps.WindowManagement.movingPos.id)
    // return nextProps.id === nextProps.WindowManagement.movingPos.id
    return false;
})