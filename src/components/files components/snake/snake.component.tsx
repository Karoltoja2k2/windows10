import React, { useState, useEffect } from "react";
import "./snake.scss";

import WindowBase from "../WindowBase";
import Game from "./game.component";
// import Field from "./field.component"

const Snake = (props: any) => {
    return (
        <WindowBase
            id={props.id}
            file={props.file}
            state={props.state}
            WindowManagement={props.WindowManagement}
        >
            <Game />
        </WindowBase>
    );
};

export default React.memo(Snake, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        nextProps.id !== nextProps.WindowManagement.mouseState.movingWinId &&
        prevProps.state === nextProps.state
    );
});
