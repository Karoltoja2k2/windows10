import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FinishCloseWindow } from "../../../actions/windowsActions";
import GravityDesktop from "../../desktop/desktopModes/gravityDesktop.component";
import JumpDesktop from "../../desktop/desktopModes/jumpDesktop.component";

function WannaJump(props: any) {
    const dispatch = useDispatch();
    useEffect(() => {
        if (props.desktopType !== GravityDesktop) {
            if (typeof props.file.content?.setDesktopType === "function") {
                props.file.content?.setDesktopType({
                    desktopComponent: JumpDesktop,
                });
            } else {
                dispatch(FinishCloseWindow(props.id));
            }
        }
    }, []);

    return <div></div>;
}

export default WannaJump;
