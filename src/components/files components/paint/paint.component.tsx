import React, { useState, useEffect, memo } from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import Logo from "../../media/win_logo.png";
import Application from "./paintContent.component";
import IMAGE from "../../../media/lenna.jpg";

const Paint = (props: any) => {
    return (
        <WindowBase id={props.id} file={props.file} state={props.state}>
            {/* <Application canvasWidth={600} canvasHeight={400} /> */}
            <Application canvasWidth={600} canvasHeight={400} content={{source: IMAGE}}/>
        </WindowBase>
    );
};

export default React.memo(Paint, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.state === nextProps.state &&
        nextProps.state.isDragged !== true
    );
});
