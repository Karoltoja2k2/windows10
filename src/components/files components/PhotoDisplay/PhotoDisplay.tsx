import React, { useState, useEffect, memo } from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import Logo from "../../media/win_logo.png";
import "./photoDisplay.scss";

const PhotoDisplay = (props: any) => {
    return (
        <WindowBase
            id={props.id}
            file={props.file}
            properties={props.properties}
            mobileMode={props.mobileMode}
        >
            <div className="photoContainer">
                <img src={`${props.file.content.source}`} />
            </div>
        </WindowBase>
    );
};

export default React.memo(PhotoDisplay, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
