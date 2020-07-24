import React, { useState, useEffect, useContext } from "react";
import "./windowBase.scss";
import PhotoDisplay from "./PhotoDisplay/PhotoDisplay";
import { Resizable } from "re-resizable";

import { Icon } from "@iconify/react";
import bxX from "@iconify/icons-bx/bx-x";
import bxExitFullscreen from "@iconify/icons-bx/bx-exit-fullscreen";
import bxExpand from "@iconify/icons-bx/bx-expand";
import bxSpaceBar from "@iconify/icons-bx/bx-space-bar";

const WindowBase = (props: any) => {
    console.log(props.focusedWinId, props.id);

    useEffect(() => {
        if (
            drag.dragging &&
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
                setDimensions({
                    ...dimensions,
                    top: obj.top - drag.offset.top,
                    left: obj.left - drag.offset.left,
                });
            }
        }
    }, [props.WindowManagement.mouseState.position]);

    useEffect(() => {
        if (!props.WindowManagement.mouseState.lmbDown) {
            setDrag({
                dragging: false,
                offset: {
                    top: 0,
                    left: 0,
                },
            });
        }
    }, [props.WindowManagement.mouseState.lmbDown]);

    useEffect(() => {
        setWindowProps(props.windowProps);
    }, [props.windowProps]);

    const [windowState, setWindowState] = useState({
        properties: {...props.windowProps},
        drag:{
            dragging: false,
            offsetTop: 0,
            offsetLeft: 0
        },
        dimensions:{
            top: 100,
            left: 100,
            width: 600,
            height: 400
        }
    })

    const [windowProps, setWindowProps] = useState(props.windowProps);
    const [drag, setDrag] = useState({
        dragging: false,
        offset: {
            top: 0,
            left: 0,
        },
    });

    const [dimensions, setDimensions] = useState({
        top: 100,
        left: 100,
        width: 600,
        height: 400,
    });

    useEffect(() => {
        setWindowProps(props.windowProps);
    }, [props.windowProps]);

    return (
        <Resizable
            className={
                props.focusedWinId === props.id
                    ? "resizableWindow focused"
                    : "resizableWindow"
            }
            minHeight={200}
            minWidth={300}
            enable={{
                top: false,
                right: !windowProps.isFullScreen,
                bottom: !windowProps.isFullScreen,
                left: false,
                topRight: false,
                bottomRight: !windowProps.isFullScreen,
                bottomLeft: false,
                topLeft: false,
            }}
            size={
                !windowProps.isFullScreen
                    ? {
                          width: dimensions.width,
                          height: dimensions.height,
                      }
                    : {
                          width: "100%",
                          height: "100%",
                      }
            }
            style={
                !windowProps.isFullScreen
                    ? {
                          ...dimensions,
                          position: "absolute",
                          zIndex: windowProps.isFocused ? 4 : 3,
                          visibility: windowProps.isMinimized
                              ? "hidden"
                              : "visible",
                      }
                    : {
                          top: 0,
                          left: 0,
                          position: "absolute",
                          zIndex: windowProps.isFocused ? 4 : 3,
                          visibility: windowProps.isMinimized
                              ? "hidden"
                              : "visible",
                      }
            }
            onResizeStart={(e) => {
                e.stopPropagation();
                props.WindowManagement.SetFocusedWin(props.id);
            }}
            onResizeStop={(e, direction, ref, d) => {
                setDimensions({
                    ...dimensions,
                    width: dimensions.width + d.width,
                    height: dimensions.height + d.height,
                });
            }}
        >
            <div
                className="resizableWindowContainer"
                onMouseDown={(e) => {
                    e.stopPropagation();

                    props.WindowManagement.SetFocusedWin(props.id);
                }}
                onMouseUp={(e) => {}}
            >
                <div className="bar">
                    <div
                        className="barTitle"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            if (e.detail === 2) {
                                props.WindowManagement.FullScreenMode(props.id);
                                return;
                            }
                            console.log("clicked");

                            if (
                                !windowProps.isFullScreen
                                // if (
                                // e.target === e.currentTarget &&
                                // !windowProps.isFullScreen
                            ) {
                                setDrag({
                                    dragging: true,
                                    offset: {
                                        top: e.pageY - dimensions.top,
                                        left: e.pageX - dimensions.left,
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
                                props.WindowManagement.MinimizeWindow(props.id);
                            }}
                        >
                            <i className="far fa-window-minimize"></i>
                        </button>
                        <button
                            className="control"
                            onClick={(e) => {
                                props.WindowManagement.FullScreenMode(props.id);
                            }}
                        >
                            {props.windowProps.isFullScreen ? (
                                <i className="far fa-window-restore"></i>
                            ) : (
                                <i className="far fa-window-maximize"></i>
                            )}
                        </button>
                        <button
                            className="exit"
                            onClick={(e) => {
                                props.WindowManagement.CloseWindow(props.id);
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
