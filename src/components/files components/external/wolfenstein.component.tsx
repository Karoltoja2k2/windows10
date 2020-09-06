import React, { useState, useEffect } from "react";
import "./iframeBase.scss";
import WindowBase from "../../common/windowBase/WindowBase";
import { useDispatch } from "react-redux";
import { FinishCloseWindow } from "../../../actions/windowsActions";

const sound = require("../../../media/testsong.mp3");
var audio = new Audio(sound);

const Wolfenstein = (props: any) => {
    const [state, setState] = useState({
        openTabs: [],
    });
    useEffect(() => {
        audio.play();
    }, []);

    const dispatch = useDispatch();
    useEffect(() => {
        if (props.isClosed) {
            audio.pause();
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
            <div className="container">
                <iframe src="https://loadx.github.io/html5-wolfenstein3D/" />
            </div>
        </WindowBase>
    );
};

export default React.memo(Wolfenstein, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
