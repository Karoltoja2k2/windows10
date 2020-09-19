import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FinishCloseWindow } from "../../../actions/windowsActions";
import WindowBase from "../../common/windowBase/WindowBase";
import IframeFocusable from "../../common/windowExtensions/iframeFocusable.component";

function Windows10(props: any) {
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
                <iframe src="https://karoltoja2k2.github.io/windows95/" />
            </div>
        </WindowBase>
    );
}

export default React.memo(Windows10, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
