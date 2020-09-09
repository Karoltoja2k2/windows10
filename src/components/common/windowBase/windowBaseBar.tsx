import React from "react";
import "./windowBase.scss";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import bxX from "@iconify/icons-bx/bx-x";
import {
    UnMinimizeWindow,
    MinimizeWindow,
    ExitFullscreenWindow,
    FullscreenWindow,
    DragWindow,
    StartCloseWindow,
} from "../../../actions/windowsActions";
import { LmbDown } from "../../../actions/mouseActions";

function WindowBaseBar(props: any) {
    const dispatch = useDispatch();

    function TriggerMinimize() {
        if (props.state.properties.canMinimize) {
            props.state.properties.isMinimized
                ? dispatch(UnMinimizeWindow(props.id))
                : dispatch(MinimizeWindow(props.id));
        }
    }

    function TriggerFullscreen() {
        if (!props.mobileMode && props.state.properties.canFullscreen) {
            props.state.properties.isFullscreen
                ? dispatch(ExitFullscreenWindow(props.id))
                : dispatch(FullscreenWindow(props.id));
        }
    }

    function StartDrag(e: React.MouseEvent) {
        if (e.detail === 2) {
            TriggerFullscreen();
            return;
        }

        if (!props.state.properties.isFullscreen) {
            props.setState({
                ...props.state,
                drag: {
                    dragging: true,
                    offsetTop: e.pageY - props.state.dimensions.top,
                    offsetLeft: e.pageX - props.state.dimensions.left,
                },
            });
            dispatch(LmbDown());
            dispatch(DragWindow(props.id));
        }
    }

    return (
        <div className="bar">
            <div
                className="barTitle"
                onMouseDown={(e: React.MouseEvent) => {
                    e.preventDefault();
                    StartDrag(e);
                }}
            >
                <img src={props.file.iconsrc} alt="fileIcon" />
                <label>{`${props.file.title}${
                    props.file.content?.file?.title
                        ? ` (${props.file.content?.file?.title})`
                        : ""
                }`}</label>
            </div>
            <div
                className="barButtons"
                onMouseDown={(e) => {
                    return;
                }}
            >
                <button
                    className={
                        props.state.properties.canClose
                            ? "control"
                            : "control disabled"
                    }
                    onClick={(e) => {
                        TriggerMinimize();
                    }}
                >
                    <i className="far fa-window-minimize"></i>
                </button>
                <button
                    className={
                        props.state.properties.canClose
                            ? "control"
                            : "control disabled"
                    }
                    onClick={(e) => {
                        TriggerFullscreen();
                    }}
                >
                    {props.state.properties.isFullscreen ? (
                        <i className="far fa-window-restore"></i>
                    ) : (
                        <i className="far fa-window-maximize"></i>
                    )}
                </button>
                <button
                    className={
                        props.state.properties.canClose
                            ? "exit"
                            : "exit disabled"
                    }
                    onClick={(e) => {
                        if (props.state.properties.canClose) {
                            dispatch(StartCloseWindow(props.id));
                        }
                    }}
                >
                    <Icon icon={bxX} height={30} />
                </button>
            </div>
        </div>
    );
}

export default WindowBaseBar;
