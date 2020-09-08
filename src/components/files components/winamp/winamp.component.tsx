import React from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import "./winamp.scss";
import { useDispatch } from "react-redux";
import WinampApp from "./winampApp.component";


function Winamp(props: any) {
    return (
        <WindowBase
            id={props.id}
            file={{ ...props.file, title: "Winamp" }}
            properties={props.properties}
            mobileMode={props.mobileMode}
        >
            <WinampApp id={props.id} file={props.file} isClosed={props.isClosed}/>
        </WindowBase>
    );
}

export default React.memo(Winamp, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.file.content?.source === nextProps.file.content?.source &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
