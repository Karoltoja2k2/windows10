import React from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import "./winamp.scss";

import WinampLoader from "./winampLoader.component";

function Winamp(props: any) {
    console.log(props);
    return (
        <WindowBase
            id={props.id}
            windowBaseStyle="winamp"
            file={{ ...props.file, title: "Winamp" }}
            properties={{ ...props.properties, minWidth: 500, minHeight: 300 }}
            mouseState={props.mouseState}
            mobileMode={props.mobileMode}
        >
            <WinampLoader {...props} />
        </WindowBase>
    );
}

export default React.memo(Winamp, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.file.content?.source === nextProps.file.content?.source &&
        prevProps.properties === nextProps.properties &&
        (prevProps.mouseState === nextProps.mouseState ||
            nextProps.properties.isDragged !== true) &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
