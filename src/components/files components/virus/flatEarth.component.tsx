import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FinishCloseWindow } from "../../../actions/windowsActions";
import Window from "../../../models/Window";
import WindowsManager from "../../../models/WindowsManager";
import { RootState } from "../../../reducers";
import JustDesktop from "../../desktop/desktopModes/justDesktop.component";
import FileRegistry from "../../system/FileRegistry";

function FlatEarth(props: any) {
    const dispatch = useDispatch();
    const windowManager: WindowsManager = useSelector(
        (state: RootState) => state.windowsReducer
    );

    useEffect(() => {
        if (props.desktopType !== JustDesktop) {
            if (typeof props.file.content?.setDesktopType === "function") {
                props.file.content?.setDesktopType({
                    desktopComponent: JustDesktop,
                });
                let gravityWindows = windowManager.openWindows.filter(
                    (x) => x.file.componentId === FileRegistry.Gravity
                );

                gravityWindows.forEach((window: Window) => {
                    dispatch(FinishCloseWindow(window.id));
                });
            }

            dispatch(FinishCloseWindow(props.id));
        }
    }, []);

    return <div></div>;
}

export default FlatEarth;
