import React, { useState, useEffect } from "react";
import "./snake.scss";

import WindowBase from "../../common/windowBase/WindowBase";
import Game from "./game.component";
import ResizeWindow from "../../common/resizeWindow/resizeWindow.component";
// import Field from "./field.component"

const Snake = (props: any) => {
    return (
        <WindowBase id={props.id} file={props.file} state={props.state}>
            <Game />
        </WindowBase>
    );
};

export default React.memo(Snake, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.state === nextProps.state &&
        nextProps.state.isDragged !== true
    );
});
