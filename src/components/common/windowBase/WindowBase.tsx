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

    console.log("rerender windowbase");

    const [state, setState] = useState({
        properties: { ...props.properties },
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
        let fullscreen = props.properties.isFullscreen;
        if (props.mobileMode) {
            fullscreen = true;
        }

        setState({
            ...state,
            properties: {
                ...state.properties,
                isFullscreen: fullscreen,
            },
        });
    }, [props.mobileMode]);

    useEffect(() => {
        if (props.properties.isDragged) {
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
        if (!props.properties.isDragged) {
            setState({
                ...state,
                drag: {
                    dragging: false,
                    offsetTop: 0,
                    offsetLeft: 0,
                },
            });
        }
    }, [props.properties.isDragged]);

    useEffect(() => {
        setState({
            ...state,
            properties: { ...props.properties },
        });
    }, [props.properties]);

    function TriggerMinimize() {
        state.properties.isMinimized
            ? disptach(UnMinimizeWindow(props.id))
            : disptach(MinimizeWindow(props.id));
    }

    function TriggerFullscreen() {
        if (!props.mobileMode) {
            state.properties.isFullscreen
                ? disptach(ExitFullscreenWindow(props.id))
                : disptach(FullscreenWindow(props.id));
        }
    }

    function StartDrag(e: React.MouseEvent) {
        if (e.detail === 2) {
            TriggerFullscreen();
            return;
        }

        if (!state.properties.isFullscreen) {
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
        className: state.properties.isFocused
            ? "resizableWindow focused"
            : "resizableWindow",
        enable: {
            top: false,
            right: !state.properties.isFullscreen,
            bottom: !state.properties.isFullscreen,
            left: false,
            topRight: false,
            bottomRight: !state.properties.isFullscreen,
            bottomLeft: false,
            topLeft: false,
        },
        size: !state.properties.isFullscreen
            ? {
                  width: state.dimensions.width,
                  height: state.dimensions.height,
              }
            : {
                  width: window.innerWidth,
                  height: window.innerHeight,
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
                !state.properties.isFullscreen
                    ? {
                          ...state.dimensions,
                          position: "absolute",
                          zIndex: state.properties.isFocused ? 4 : 3,
                          visibility: state.properties.isMinimized
                              ? "hidden"
                              : "visible",
                      }
                    : {
                          top: 0,
                          left: 0,
                          position: "absolute",
                          zIndex: state.properties.isFocused ? 4 : 3,
                          visibility: state.properties.isMinimized
                              ? "hidden"
                              : "visible",
                      }
            }
            onResizeStart={(e) => {
                e.stopPropagation();
                if (!state.properties.isFocused) {
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
                    disptach(LmbDown());
                    if (!state.properties.isFocused) {
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
                            {props.properties.isFullscreen ? (
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
                {React.cloneElement(props.children, {
                    width: state.properties.isFullscreen
                        ? window.innerWidth
                        : state.dimensions.width,
                    height: state.properties.isFullscreen
                        ? window.innerHeight
                        : state.dimensions.height,
                    left: state.properties.isFullscreen
                        ? 0
                        : state.dimensions.left,
                    top: state.properties.isFullscreen
                        ? 0
                        : state.dimensions.top,
                })}
            </div>
        </Resizable>
    );
};

export default React.memo(WindowBase);
