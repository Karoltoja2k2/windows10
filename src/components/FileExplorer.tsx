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
            <div className="explorerContainer" style={{}}
            >
                <div className="toolBar">

                </div>
                <div className="iconGrid" style={{background: props.data.isRed ? 'red' : 'blue'}}>
                    {
                        iconsInFolder &&
                        iconsInFolder.map((file: any, index: number) => (
                            <Icon file={file}  id={props.id} Navigate={props.WindowManagement.Navigate} />
                        ))
                    }
                    <button onClick={() => {
                        props.WindowManagement.SetStyle(props.id, {
                            ...props.windowProps,
                            width: props.windowProps.width,
                            height: props.windowProps.height
                        })
                        // props.DataManagement.UpdateWindow(props.id, {...props.data, isRed: !props.data.isRed})
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

export default FileExplorer