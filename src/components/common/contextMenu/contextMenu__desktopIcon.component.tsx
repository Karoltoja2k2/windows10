import React from 'react'
import './contextMenu.scss'
import OpenFileOption from './menuOptions/openFileOption.component'
import PinFileToStartMenuOption from './menuOptions/pinFileToStartMenuOption,component'
import NewFileOption from './menuOptions/newFileOption.component'

const DesktopIconContextMenu = (props: any) => {

    return(
        <div className="container" style={{top: props.top, left: props.left}}>
            <OpenFileOption file={props.file}/>
            <NewFileOption file={props.file}/>
            <PinFileToStartMenuOption />
        </div>
    )
}

export default DesktopIconContextMenu;