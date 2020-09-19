import React, { useEffect } from "react";

import WindowBase from "../../common/windowBase/WindowBase";
import Game from "./game.component";
import { useDispatch } from "react-redux";
import { FinishCloseWindow } from "../../../actions/windowsActions";
import IframeFocusable from "../../common/windowExtensions/iframeFocusable.component";

const Snake = (props: any) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (props.isClosed) {
            dispatch(FinishCloseWindow(props.id));
        }
    }, [props.isClosed]);
    return (
        <WindowBase
            id={props.id}
            file={props.file}
            properties={props.properties}
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
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
