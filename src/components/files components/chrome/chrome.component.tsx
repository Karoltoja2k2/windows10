import React from "react";
import useSoftExit from "../../common/hooks/useSoftExit";
import WindowBase from "../../common/windowBase/WindowBase";

function Chrome(props: any) {
    useSoftExit(props.isClosed, props.id);
    return (
        <WindowBase
            id={props.id}
            file={props.file}
            windowBaseStyle="chrome"
            properties={props.properties}
            mouseState={props.mouseState}
            mobileMode={props.mobileMode}
        ></WindowBase>
    );
}

export default React.memo(Chrome, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.properties === nextProps.properties &&
        (prevProps.mouseState === nextProps.mouseState ||
            nextProps.properties.isDragged !== true) &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
