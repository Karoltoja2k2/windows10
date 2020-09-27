import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FinishCloseWindow } from "../../../actions/windowsActions";
import Window from "../../../models/Window";
import WindowsManager from "../../../models/WindowsManager";
import { RootState } from "../../../reducers";
import JustDesktop from "../../desktop/desktopModes/justDesktop.component";
import TagDesktop from "../../desktop/desktopModes/tagDesktop";

function Tag(props: any) {
    const dispatch = useDispatch();
    const windowManager: WindowsManager = useSelector(
        (state: RootState) => state.windowsReducer
    );

    useEffect(() => {
        if (typeof props.file.content?.setDesktopType === "function") {
            props.file.content?.setDesktopType({desktopComponent: TagDesktop});
            let viursWindows = windowManager.openWindows.filter(
                (x) => x.file.extension === ".xD"
            );

            viursWindows.forEach((window: Window) => {
                dispatch(FinishCloseWindow(window.id));
            });
        }
    }, []);

    return <div></div>;
}

export default Tag;
