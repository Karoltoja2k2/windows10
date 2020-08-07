import React from "react";

import WindowBase from "../../common/windowBase/WindowBase";
import Game from "./game.component";

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
