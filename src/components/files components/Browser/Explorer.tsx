import React, { useState, useEffect } from "react";
import "./explorer.scss";
import WindowBase from "../../common/windowBase/WindowBase";
import DynamicGrid from "../../common/dynamicGrid/dynamicGrid.component";

const Explorer = (props: any) => {
    return (
        <WindowBase id={props.id} file={props.file} state={props.state}>
            {/* <div className="explorerContainer">
                <iframe src="https://karoltoja2k2.github.io/MyResume/" />
            </div> */}
            <DynamicGrid />
        </WindowBase>
    );
};

export default React.memo(Explorer, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.state === nextProps.state &&
        nextProps.state.isDragged !== true
    );
});
