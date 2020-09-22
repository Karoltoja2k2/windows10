import React, { useState, useEffect, useContext } from "react";
import "./windowBaseStyles/windowBase.scss";

import { Resizable } from "re-resizable";

import { useDispatch } from "react-redux";
import { FocusWindow, SetDimensions } from "../../../actions/windowsActions";
import WindowBaseBar from "./windowBaseBar";

const WindowBase = (props: any) => {
console.log('rerender', props.file.title)

    const dispatch = useDispatch();
    const [state, setState] = useState({
        properties: { ...props.properties },
        drag: {
            dragging: false,
            offsetTop: 0,
            offsetLeft: 0,
        },
        windowBaseStyle: props.windowBaseStyle
            ? props.windowBaseStyle
            : "classic",
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
            dispatch(
                SetDimensions(props.id, {
                    width: state.properties.width,
                    height: state.properties.height,
                    top: props.mouseState.top - state.drag.offsetTop,
                    left: props.mouseState.left - state.drag.offsetLeft
                })
            );
        }
    }, [props.mouseState.top, props.mouseState.left]);

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

    const resizableProps = {
        className: state.properties.isFocused
            ? `resizable--${state.windowBaseStyle} resizable--${state.windowBaseStyle}--focused`
            : `resizable--${state.windowBaseStyle}`,
        // className: state.properties.isFocused
        //     ? "resizable--classic resizable--classic--focused"
        //     : "resizable--classic",
        enable: {
            top: false,
            right:
                !state.properties.isFullscreen && !state.properties.isFixedSize,
            bottom:
                !state.properties.isFullscreen && !state.properties.isFixedSize,
            left: false,
            topRight: false,
            bottomRight:
                !state.properties.isFullscreen && !state.properties.isFixedSize,
            bottomLeft: false,
            topLeft: false,
        },
        size: !state.properties.isFullscreen
            ? {
                  width: state.properties.width,
                  height: state.properties.height,
              }
            : {
                  width: window.innerWidth,
                  height: window.innerHeight - 35,
              },
        contentDimensions: {
            width: state.properties.isFullscreen
                ? window.innerWidth
                : state.properties.width,
            height: state.properties.isFullscreen
                ? window.innerHeight - 35
                : state.properties.height,
            left: state.properties.isFullscreen ? 0 : state.properties.left,
            top: state.properties.isFullscreen ? 0 : state.properties.top,
        },
    };

    return (
        <Resizable
            className={resizableProps.className}
            minHeight={
                props.properties.minHeight ? props.properties.minHeight : 200
            }
            minWidth={
                props.properties.minWidth ? props.properties.minWidth : 300
            }
            enable={resizableProps.enable}
            size={resizableProps.size}
            style={
                !state.properties.isFullscreen
                    ? {
                          top: state.properties.top,
                          left: state.properties.left,
                          height: state.properties.height,
                          width: state.properties.width,

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
                    dispatch(FocusWindow(props.id));
                }
            }}
            onResizeStop={(e, direction, ref, d) => {
                dispatch(
                    SetDimensions(props.id, {
                        width: state.properties.width + d.width,
                        height: state.properties.height + d.height,
                        top: state.properties.top,
                        left: state.properties.left
                    })
                );
            }}
        >
            <div
                className="resizable__window"
                onMouseDown={(e) => {
                    e.stopPropagation();
                    if (!state.properties.isFocused) {
                        dispatch(FocusWindow(props.id));
                    }
                }}
            >
                <WindowBaseBar
                    id={props.id}
                    file={props.file}
                    state={state}
                    setState={setState}
                    mobileMode={props.mobileMode}
                />

                {React.Children.map(props.children, (child) =>
                    React.cloneElement(child, {
                        ...resizableProps.contentDimensions,
                    })
                )}
            </div>
        </Resizable>
    );
};

export default React.memo(WindowBase);
