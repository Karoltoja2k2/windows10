import React, { useState, useEffect, useContext } from "react";
import "./windowBase.scss";
import { Resizable } from "re-resizable";

import { Icon } from "@iconify/react";
import bxX from "@iconify/icons-bx/bx-x";

import { useDispatch, useSelector } from "react-redux";
import {
    FocusWindow,
    ExitFullscreenWindow,
    MinimizeWindow,
    CloseWIndow,
    UnMinimizeWindow,
    FullscreenWindow,
    DragWindow,
} from "../../../actions/windowsActions";
import { RootState } from "../../../reducers";
import { LmbDown } from "../../../actions/mouseActions";
import MouseState from "../../../models/MouseState";

const WindowBase = (props: any) => {
    const disptach = useDispatch();
    const mouseState: MouseState = useSelector(
        (state: RootState) => state.mouseReducer
    );

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
        if (props.state.isDragged) {
            setState({
                ...state,
                dimensions: {
                    ...state.dimensions,
                    top: mouseState.position.top - state.drag.offsetTop,
                    left: mouseState.position.left - state.drag.offsetLeft,
                },
            });
        }
    }, [mouseState.position]);

    useEffect(() => {
        if (!props.state.isDragged) {
            setState({
                ...state,
                drag: {
                    dragging: false,
                    offsetTop: 0,
                    offsetLeft: 0,
                },
            });
        }
    }, [props.state.isDragged]);

    useEffect(() => {
        setState({
            ...state,
            props: { ...props.state },
        });
    }, [props.state]);

    function TriggerMinimize() {
        state.props.isMinimized
            ? disptach(UnMinimizeWindow(props.id))
            : disptach(MinimizeWindow(props.id));
    }

    function TriggerFullscreen() {
        state.props.isFullscreen
            ? disptach(ExitFullscreenWindow(props.id))
            : disptach(FullscreenWindow(props.id));
    }

    function StartDrag(e: React.MouseEvent) {
        if (e.detail === 2) {
            TriggerFullscreen();
            return;
        }
        console.log("clicked");

        if (!state.props.isFullscreen) {
            setState({
                ...state,
                drag: {
                    dragging: true,
                    offsetTop: e.pageY - state.dimensions.top,
                    offsetLeft: e.pageX - state.dimensions.left,
                },
            });
            disptach(LmbDown());
            disptach(DragWindow(props.id));
        }
    }

    const resizableProps = {
        className: state.props.isFocused
            ? "resizableWindow focused"
            : "resizableWindow",
        enable: {
            top: false,
            right: !state.props.isFullscreen,
            bottom: !state.props.isFullscreen,
            left: false,
            topRight: false,
            bottomRight: !state.props.isFullscreen,
            bottomLeft: false,
            topLeft: false,
        },
        size: !state.props.isFullscreen
            ? {
                  width: state.dimensions.width,
                  height: state.dimensions.height,
              }
            : {
                  width: "100%",
                  height: "100%",
              },
    };

    return (
        <Resizable
            className={resizableProps.className}
            minHeight={200}
            minWidth={300}
            enable={resizableProps.enable}
            size={resizableProps.size}
            style={
                !state.props.isFullscreen
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
                if (!state.props.isFocused) {
                    disptach(FocusWindow(props.id));
                }
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
                    if (!state.props.isFocused) {
                        disptach(FocusWindow(props.id));
                    }
                }}
                onMouseUp={(e) => {}}
            >
                <div className="bar">
                    <div
                        className="barTitle"
                        onMouseDown={(e: React.MouseEvent) => {
                            e.preventDefault();
                            StartDrag(e);
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
                                TriggerMinimize();
                            }}
                        >
                            <i className="far fa-window-minimize"></i>
                        </button>
                        <button
                            className="control"
                            onClick={(e) => {
                                TriggerFullscreen();
                            }}
                        >
                            {props.state.isFullscreen ? (
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
                {React.cloneElement(props.children, {width: state.dimensions.width, height: state.dimensions.height})}
            </div>
        </Resizable>
    );
};

export default React.memo(WindowBase);
