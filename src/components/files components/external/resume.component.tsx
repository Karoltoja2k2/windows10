import React, { useState, useEffect } from "react";
import "./iframeBase.scss";
import WindowBase from "../../common/windowBase/WindowBase";
import { useDispatch } from "react-redux";
import { FinishCloseWindow } from "../../../actions/windowsActions";
import IframeFocusable from "../../common/windowExtensions/iframeFocusable.component";

const Resume = (props: any) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (props.isClosed) {
            dispatch(FinishCloseWindow(props.id));
        }
    }, [props.isClosed]);
    return (
        <WindowBase
            id={props.id}
            file={props.file}
            properties={props.properties}
            mobileMode={props.mobileMode}
        >
            <IframeFocusable isFocused={props.properties.isFocused} />
            <div className="container">
                <iframe src="https://karoltoja2k2.github.io/MyResume/" />
            </div>
        </WindowBase>
    );
};

export default React.memo(Resume, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
