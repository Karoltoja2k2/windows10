import React, { useState, useEffect } from "react";
import "./explorer.scss";
import WindowBase from "../WindowBase";

const Explorer = (props: any) => {
    return (
        <WindowBase id={props.id} file={props.file} state={props.state}>
            <div className="explorerContainer">
                <iframe src="https://karoltoja2k2.github.io/MyResume/" />
            </div>
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
