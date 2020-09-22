import React from "react";

import WindowBase from "../../common/windowBase/WindowBase";
import Game from "./game.component";
import useSoftExit from "../../common/hooks/useSoftExit";

const Snake = (props: any) => {
    useSoftExit(props.isClosed, props.id);

    return (
        <WindowBase
            id={props.id}
            file={props.file}
            properties={props.properties}
            mouseState={props.mouseState}
            mobileMode={props.mobileMode}
        >
            <Game />
        </WindowBase>
    );
};

export default React.memo(Snake, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.properties === nextProps.properties &&
        (prevProps.mouseState === nextProps.mouseState ||
            nextProps.properties.isDragged !== true) &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
