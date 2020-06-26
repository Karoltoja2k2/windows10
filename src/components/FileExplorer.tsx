import React, { useState, useEffect } from 'react';
import '../scss/fileExplorer.scss'
import FileStructure from '../media/fileStructure.json'
import WindowBase from './WindowBase'
import files from './fileStructure2'

import FileIcon from './FileIcon'
import files2 from './fileStructure2';

import {Icon, InlineIcon} from '@iconify/react'
import bxArrowBack from '@iconify/icons-bx/bx-arrow-back'
import bxSearchAlt from '@iconify/icons-bx/bx-search-alt'


const FileExplorer = (props: any) => {
    console.log('render' + props.file.title)
    var iconsInFolder = files.filter(x => x.prevFolder && x.prevFolder.fileId === props.file.fileId)
    console.log(files)


    const [data, setData] = useState(props.data)
    const [isRed, setIsRed] = useState(false)

    const previousFolder = () => {
        if (props.file.prevFolder) {
            props.WindowManagement.Navigate(props.id, props.file.prevFolder)
        }
    }

    const searchFile = () => {

    }

    return (
        <WindowBase
            id={props.id}
            file={props.file}
            windowProps={props.windowProps}
            WindowManagement={props.WindowManagement}
        >
            <div className="explorerContainer" style={{ background: isRed ? "red" : "" }}
            >
                <div className="toolBar">
                    <button onClick={() => {previousFolder()}}><Icon icon={bxArrowBack} width={22}/></button>

                    <input type="text" value={props.file.path + props.file.title} readOnly={false} />

                    <button onClick={() => {searchFile() }}><Icon icon={bxSearchAlt} width={22}/></button>

                </div>
                <div className="content">
                    <div className="otherFolders">

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
                                <FileIcon file={file} id={props.id} Navigate={props.WindowManagement.Navigate} />
                            ))
                        }
                        <button onClick={() => {
                            setIsRed(!isRed);
                        }}>TEST</button>
                    </div>
                </div>
            </div>
        </WindowBase>
    );
}

// export default React.memo(FileExplorer, (prevProps, nextProps) => {
//     return prevProps.test === nextProps.test
// 
// })

export default FileExplorer

// export default React.memo(FileExplorer, () => {
// //     // console.log(nextProps.id, nextProps.WindowManagement.movingPos.id)
// //     // return nextProps.id === nextProps.WindowManagement.movingPos.id
// return false;
// })