import React, { useState, useEffect } from 'react';
import '../scss/explorer.scss'
import WindowBase from './WindowBase'
import files from '../media/fileStructure'

import Icon from './Icon'

const Explorer = (props: any) => {

    return(
        <WindowBase
            id={props.id}
            title={props.file.title}
            windowProps={props.windowProps}
            WindowManagement={props.WindowManagement}
        >
            <div className="explorerContainer">
                <iframe src="http://www.youtube.com/embed/W7qWa52k-nE" />
            </div>

        </WindowBase>
    )
}

export default Explorer