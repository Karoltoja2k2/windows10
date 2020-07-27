import React, { useState, useEffect, useContext } from "react";
import "./windowBase.scss";
import PhotoDisplay from "./PhotoDisplay/PhotoDisplay";
import { Resizable } from "re-resizable";

import { Icon } from "@iconify/react";
import bxX from "@iconify/icons-bx/bx-x";
import bxExitFullscreen from "@iconify/icons-bx/bx-exit-fullscreen";
import bxExpand from "@iconify/icons-bx/bx-expand";
import bxSpaceBar from "@iconify/icons-bx/bx-space-bar";
import { useDispatch } from "react-redux";
import { FocusWindow, ExitFullscreenWindow, Minimize, CloseWIndow } from "../../actions/windowsActions";

const WindowBase = (props: any) => {
    const disptach = useDispatch();
    const [state, setState] = useState({
        props: { ...props.state },
        drag: {
            dragging: false,
            offsetTop: 0,
            offsetLeft: 0,
        },
        dimensions: {
            top: 100,
            left: 100,
            width: 600,
            height: 400,
        },
    });

    useEffect(() => {
        if (
            state.drag.dragging &&
            props.WindowManagement.mouseState.lmbDown &&
            props.WindowManagement.mouseState.movingWinId === props.id
        ) {
            var obj = {
                top: props.WindowManagement.mouseState.position.top
                    ? props.WindowManagement.mouseState.position.top
                    : 0,
                left: props.WindowManagement.mouseState.position.left
                    ? props.WindowManagement.mouseState.position.left
                    : 0,
            };
            if (obj.top !== 0 || obj.left !== 0) {
                setState({
                    ...state,
                    dimensions: {
                        ...state.dimensions,
                        top: obj.top - state.drag.offsetTop,
                        left: obj.left - state.drag.offsetLeft,
                    },
                });
            }
        }
    }, [props.WindowManagement.mouseState.position]);

    useEffect(() => {
        if (!props.WindowManagement.mouseState.lmbDown) {
            setState({
                ...state,
                drag: {
                    dragging: false,
                    offsetTop: 0,
                    offsetLeft: 0,
                },
            });
        }
    }, [props.WindowManagement.mouseState.lmbDown]);

    useEffect(() => {
        setState({
            ...state,
            props: { ...props.state },
        });
    }, [props.state]);

    return (
        <Resizable
            className={
                state.props.isFocused
                    ? "resizableWindow focused"
                    : "resizableWindow"
            }
            minHeight={200}
            minWidth={300}
            enable={{
                top: false,
                right: !state.props.isFullScreen,
                bottom: !state.props.isFullScreen,
                left: false,
                topRight: false,
                bottomRight: !state.props.isFullScreen,
                bottomLeft: false,
                topLeft: false,
            }}
            size={
                !state.props.isFullScreen
                    ? {
                          width: state.dimensions.width,
                          height: state.dimensions.height,
                      }
                    : {
                          width: "100%",
                          height: "100%",
                      }
            }
            style={
                !state.props.isFullScreen
                    ? {
                          ...state.dimensions,
                          position: "absolute",
                          zIndex: state.props.isFocused ? 4 : 3,
                          visibility: state.props.isMinimized
                              ? "hidden"
                              : "visible",
                      }
                    : {
                          top: 0,
                          left: 0,
                          position: "absolute",
                          zIndex: state.props.isFocused ? 4 : 3,
                          visibility: state.props.isMinimized
                              ? "hidden"
                              : "visible",
                      }
            }
            onResizeStart={(e) => {
                e.stopPropagation();
                disptach(FocusWindow(props.id));
            }}
            onResizeStop={(e, direction, ref, d) => {
                setState({
                    ...state,
                    dimensions: {
                        ...state.dimensions,
                        width: state.dimensions.width + d.width,
                        height: state.dimensions.height + d.height,
                    },
                });
            }}
        >
            <div
                className="resizableWindowContainer"
                onMouseDown={(e) => {
                    e.stopPropagation();
                    disptach(FocusWindow(props.id));
                }}
                onMouseUp={(e) => {}}
            >
                <div className="bar">
                    <div
                        className="barTitle"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            if (e.detail === 2) {
                                disptach(ExitFullscreenWindow(props.id));
                                return;
                            }
                            console.log("clicked");

                            if (
                                !state.props.isFullScreen
                                // if (
                                // e.target === e.currentTarget &&
                                // !windowProps.isFullScreen
                            ) {
                                setState({
                                    ...state,
                                    drag: {
                                        dragging: true,
                                        offsetTop:
                                            e.pageY - state.dimensions.top,
                                        offsetLeft:
                                            e.pageX - state.dimensions.left,
                                    },
                                });
                                props.WindowManagement.setMouseState({
                                    ...props.WindowManagement.mouseState,
                                    lmbDown: true,
                                    movingWinId: props.id,
                                });
                            }
                        }}
                    >
                        <img src={props.file.iconsrc} alt="fileIcon" />
                        <label>{props.file.title}</label>
                    </div>
                    <div
                        className="barButtons"
                        onMouseDown={(e) => {
                            return;
                        }}
                    >
                        <button
                            className="control"
                            onClick={(e) => {
                                disptach(Minimize(props.id));
                            }}
                        >
                            <i className="far fa-window-minimize"></i>
                        </button>
                        <button
                            className="control"
                            onClick={(e) => {
                                disptach(ExitFullscreenWindow(props.id));
                            }}
                        >
                            {props.state.isFullScreen ? (
                                <i className="far fa-window-restore"></i>
                            ) : (
                                <i className="far fa-window-maximize"></i>
                            )}
                        </button>
                        <button
                            className="exit"
                            onClick={(e) => {
                                disptach(CloseWIndow(props.id));
                            }}
                        >
                            <Icon icon={bxX} height={30} />
                        </button>
                    </div>
                </div>

                {props.children}
            </div>
        </Resizable>
    );
};

export default React.memo(WindowBase);
