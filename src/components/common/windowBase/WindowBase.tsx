import React, { useState, useEffect, useContext } from "react";
import "./windowBaseStyles/windowBase.scss";

import { Resizable } from "re-resizable";

import { useDispatch, useSelector } from "react-redux";
import { FocusWindow } from "../../../actions/windowsActions";
import { RootState } from "../../../reducers";
import { LmbDown } from "../../../actions/mouseActions";
import MouseState from "../../../models/MouseState";
import WindowBaseBar from "./windowBaseBar";

const WindowBase = (props: any) => {
    const disptach = useDispatch();
    const mouseState: MouseState = useSelector(
        (state: RootState) => state.mouseReducer
    );

    const [state, setState] = useState({
        properties: { ...props.properties },
        drag: {
            dragging: false,
            offsetTop: 0,
            offsetLeft: 0,
        },
        dimensions: {
            top: props.properties.top,
            left: props.properties.left,
            width: props.properties.width,
            height: props.properties.height,
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
                  width: state.dimensions.width,
                  height: state.dimensions.height,
              }
            : {
                  width: window.innerWidth,
                  height: window.innerHeight - 35,
              },
        contentDimensions: {
            width: state.properties.isFullscreen
                ? window.innerWidth
                : state.dimensions.width,
            height: state.properties.isFullscreen
                ? window.innerHeight - 35
                : state.dimensions.height,
            left: state.properties.isFullscreen ? 0 : state.dimensions.left,
            top: state.properties.isFullscreen ? 0 : state.dimensions.top,
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
                className="resizable__window"
                onMouseDown={(e) => {
                    e.stopPropagation();
                    disptach(LmbDown());
                    if (!state.properties.isFocused) {
                        disptach(FocusWindow(props.id));
                    }
                }}
                onMouseUp={(e) => {}}
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
