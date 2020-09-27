import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FinishCloseWindow } from "../../../actions/windowsActions";
import Window from "../../../models/Window";
import WindowsManager from "../../../models/WindowsManager";
import { RootState } from "../../../reducers";
import GravityDesktop from "../../desktop/desktopModes/gravityDesktop.component";
import FileRegistry from "../../system/FileRegistry";

function Gravity(props: any) {
    const dispatch = useDispatch();
    const windowManager: WindowsManager = useSelector(
        (state: RootState) => state.windowsReducer
    );
    
    useEffect(() => {
        if (typeof props.file.content?.setDesktopType === "function") {
            props.file.content?.setDesktopType({
                desktopComponent: GravityDesktop,
            });

            let viursWindows = windowManager.openWindows.filter(
                (x) =>
                    x.file.extension === ".xD" &&
                    x.file.componentId !== FileRegistry.Gravity
            );

            viursWindows.forEach((window: Window) => {
                dispatch(FinishCloseWindow(window.id));
            });
        }
    }, []);

    return <div></div>;
}

export default Gravity;
