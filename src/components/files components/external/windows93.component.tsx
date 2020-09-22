import React from "react";
import useSoftExit from "../../common/hooks/useSoftExit";
import WindowBase from "../../common/windowBase/WindowBase";
import IframeFocusable from "../../common/windowExtensions/iframeFocusable.component";

function Windows10(props: any) {
    useSoftExit(props.isClosed, props.id);

    return (
        <WindowBase
            id={props.id}
            file={props.file}
            properties={props.properties}
            mouseState={props.mouseState}
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
        (prevProps.mouseState === nextProps.mouseState ||
            nextProps.properties.isDragged !== true) &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
