import React from 'react'
import WindowBase from '../../common/windowBase/WindowBase'

function Vrecorder(props: any) {
    return (
        <WindowBase
            id={props.id}
            file={{ ...props.file, title: "Winamp" }}
            properties={{ ...props.properties, minWidth: 500, minHeight: 300 }}
            mobileMode={props.mobileMode}
        >            
        </WindowBase>
    )
}

export default React.memo(Vrecorder)
