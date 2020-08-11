import React from 'react'
import './contextMenu.scss'
import OpenFileOption from './menuOptions/openFileOption.component'
import PinFileToStartMenuOption from './menuOptions/pinFileToStartMenuOption,component'

const DesktopIconContextMenu = (props: any) => {

    return(
        <div className="container" style={{top: props.top, left: props.left}}>
            <OpenFileOption file={props.file}/>
            <PinFileToStartMenuOption />
        </div>
    )
}

export default DesktopIconContextMenu;