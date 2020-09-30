import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FinishCloseWindow } from "../../../actions/windowsActions";
import Window from "../../../models/Window";
import WindowsManager from "../../../models/WindowsManager";
import { RootState } from "../../../reducers";
import GravityDesktop from "../../desktop/desktopModes/gravityDesktop.component";
import JustDesktop from "../../desktop/desktopModes/justDesktop.component";
import FileRegistry from "../../system/FileRegistry";
import Gravity from "./gravity.component";

function FlatEarth(props: any) {
    const dispatch = useDispatch();
    const windowManager: WindowsManager = useSelector(
        (state: RootState) => state.windowsReducer
    );

    useEffect(() => {
        if (typeof props.file.content?.setDesktopType === "function") {
            if (
                props.file.content?.desktopType.current.name ===
                GravityDesktop.name
            ) {
                props.file.content?.setDesktopType({
                    desktopComponent: JustDesktop,
                });
                let viursWindows = windowManager.openWindows.filter(
                    (x) => x.file.componentId === FileRegistry.Gravity
                );

                viursWindows.forEach((window: Window) => {
                    dispatch(FinishCloseWindow(window.id));
                });
            }

            dispatch(FinishCloseWindow(props.id));
        }
    }, []);

    return <div></div>;
}

export default FlatEarth;
