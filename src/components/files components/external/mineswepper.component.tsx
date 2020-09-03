import React, { useState } from "react";
import "./iframeBase.scss";
import WindowBase from "../../common/windowBase/WindowBase";

const Mineswepper = (props: any) => {
    return (
        <WindowBase
            id={props.id}
            file={props.file}
            properties={props.properties}
            mobileMode={props.mobileMode}
        >
            <div className="container">
                <iframe src="https://karoltoja2k2.github.io/MineswepperTs/" onClick={() => console.log('clik iframe')} />
            </div>
        </WindowBase>
    );
};

export default React.memo(Mineswepper, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
