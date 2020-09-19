import React, { useState, useEffect } from "react";
import "./iframeBase.scss";
import WindowBase from "../../common/windowBase/WindowBase";
import { useDispatch } from "react-redux";
import { FinishCloseWindow } from "../../../actions/windowsActions";
import IframeFocusable from "../../common/windowExtensions/iframeFocusable.component";

const Robby = (props: any) => {
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
                <iframe src="http://www.nurykabe.com/dump/games/robby/web/index.html" />
            </div>
        </WindowBase>
    );
};

export default React.memo(Robby, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
