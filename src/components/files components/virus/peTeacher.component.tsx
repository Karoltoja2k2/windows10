import React, { useState } from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import ErrorContent from "../../common/error/error.component";
import NewErrorOption from "../../common/error/errorOption";
import { useDispatch, useSelector } from "react-redux";
import { FinishCloseWindow } from "../../../actions/windowsActions";
import WindowsManager from "../../../models/WindowsManager";
import { RootState } from "../../../reducers";
import FileRegistry from "../../system/FileRegistry";
import JustDesktop from "../../desktop/desktopModes/justDesktop.component";
import Window from "../../../models/Window";
import TagDesktop from "../../desktop/desktopModes/tagDesktop";
import { SMALL_ERROR } from "../../common/error/error.const";
import JumpDesktop from "../../desktop/desktopModes/jumpDesktop.component";

const PETeacher = (props: any) => {
    const dispatch = useDispatch();
    const windowManager: WindowsManager = useSelector(
        (state: RootState) => state.windowsReducer
    );

    const [state, setState] = useState(InitState());

    function InitState() {
        return props.file.content?.desktopType.current.name === JumpDesktop.name ?
             {
                options: [
                    NewErrorOption(StopJumpDesktop, "Yes 😭"),
                    NewErrorOption(Close, "Nope"),
                ],
                errorText : "You want me to tell them to stop?",
            } : {
                options: [
                    NewErrorOption(StopTagGame, "Yes 😭"),
                    NewErrorOption(Close, "Nope"),
                ],
                errorText : "You are too weak to catch them?",
            }
    }

    function StopJumpDesktop(){
        if (typeof props.file.content?.setDesktopType === "function") {
            if (
                props.file.content?.desktopType.current.name === JumpDesktop.name
            ) {
                props.file.content?.setDesktopType({
                    desktopComponent: JustDesktop,
                });
                let viursWindows = windowManager.openWindows.filter(
                    (x) => x.file.componentId === FileRegistry.WannaJump
                );

                viursWindows.forEach((window: Window) => {
                    dispatch(FinishCloseWindow(window.id));
                });

                dispatch(FinishCloseWindow(props.id));
            }
        }
    }

    function StopTagGame() {
        if (typeof props.file.content?.setDesktopType === "function") {
            if (
                props.file.content?.desktopType.current.name === TagDesktop.name
            ) {
                props.file.content?.setDesktopType({
                    desktopComponent: JustDesktop,
                });
                let viursWindows = windowManager.openWindows.filter(
                    (x) => x.file.componentId === FileRegistry.Tag
                );

                viursWindows.forEach((window: Window) => {
                    dispatch(FinishCloseWindow(window.id));
                });

                dispatch(FinishCloseWindow(props.id));

            } else {
                setState({
                    options: [NewErrorOption(Close, "I'm sorry")],
                    errorText: "Nobody is running from you",
                });
            }
        }
    }

    function Close() {
        dispatch(FinishCloseWindow(props.id));
    }

    return (
        <WindowBase
            id={props.id}
            file={props.file}
            properties={{
                ...props.properties,
                ...SMALL_ERROR,
            }}
            mouseState={props.mouseState}
            mobileMode={false}
        >
            <ErrorContent
                options={state.options}
                errorText={state.errorText}
                file={props.file}
            />
        </WindowBase>
    );
};

export default React.memo(PETeacher, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.properties === nextProps.properties &&
        (prevProps.mouseState === nextProps.mouseState ||
            nextProps.properties.isDragged !== true) &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
