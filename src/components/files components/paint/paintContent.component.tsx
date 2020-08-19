import React, { useState, useEffect, useRef } from "react";
import "./paintContent.scss";
import Canvas from "../../common/canvas.component";
import ColorPalletItem from "./colorPalletItem.component";
import History from "./models/History";
import { COLORS, TOOLS } from "./const";
import Tool from "./models/Tool";

interface State {
    properties: {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    backgroundColor: "#ffffff";
    img: HTMLImageElement | null;
    colors: string[];
    tools: Tool[];
    activeTool: Tool;
}

const Application = (props: any) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const canvasOffset = {
        top: 130,
        left: 1,
    };

    const [history, setHistory] = useState<History>({
        current: null,
        latest: [],
    });

    const [state, setState] = useState<State>({
        properties: {
            width: props.canvasWidth,
            height: props.canvasHeight,
            top: props.top + canvasOffset.top,
            left: props.left + canvasOffset.left,
        },
        backgroundColor: "#ffffff",
        img: null,
        colors: COLORS(),
        tools: TOOLS(),
        activeTool: TOOLS().find((x) => x.name === "Pencil")!,
    });

    useEffect(() => {
        setState({
            ...state,
            properties: {
                ...state.properties,
                top: props.top + canvasOffset.top,
                left: props.left + canvasOffset.left,
            },
        });
    }, [props.left, props.top]);

    function HandleImageOnLoad() {
        let img = imgRef.current!;
        setState({
            ...state,
            properties: {
                ...state.properties,
                width: img.width,
                height: img.height,
            },
            img: img,
        });
    }

    function SetColor(strokeStyle: string) {
        if (
            strokeStyle !== state.activeTool.strokeStyle &&
            state.activeTool.name !== "Rubber"
        ) {
            UpdateTool(strokeStyle, state.activeTool.lineWidth);
        }
    }

    function UpdateTool(strokeStyle: string, lineWidth: number) {
        var tools = state.tools.map((tool: Tool) =>
            tool.name === state.activeTool.name
                ? {
                      ...tool,
                      strokeStyle: strokeStyle,
                      lineWidth: lineWidth,
                  }
                : tool
        );
        setState({
            ...state,
            tools: [...tools],
            activeTool: {
                ...state.activeTool,
                strokeStyle: strokeStyle,
                lineWidth: lineWidth,
            },
        });
    }

    function HandleSlider(e: React.ChangeEvent<HTMLInputElement>) {
        let newValue = parseInt(e.target.value);
        if (newValue !== state.activeTool.lineWidth) {
            UpdateTool(state.activeTool.strokeStyle, newValue);
        }
    }

    return (
        <div className="paint__container">
            <div className="container__toolbar">
                <div
                    className="toolbar__colors--chosen"
                    style={{ backgroundColor: state.activeTool.strokeStyle }}
                >
                    {" "}
                </div>
                <div className="toolbar__colors">
                    {state.colors.map((color: string, index: number) => (
                        <ColorPalletItem
                            color={color}
                            setColor={SetColor}
                            key={index}
                        />
                    ))}
                </div>
                <div className="toolbar__thickness">
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={state.activeTool.lineWidth}
                        onChange={(e) => HandleSlider(e)}
                    />
                </div>
                <div className="toolbar__tools">
                    <div
                        className="tools_tool"
                        onClick={() => {
                            setState({
                                ...state,
                                activeTool: state.tools.find(
                                    (x) => x.name === "Pencil"
                                )!,
                            });
                        }}
                    >
                        <i className="fas fa-pencil-alt"></i>
                    </div>
                    <div
                        className="tools_tool"
                        onClick={() => {
                            setState({
                                ...state,
                                activeTool: state.tools.find(
                                    (x) => x.name === "Rubber"
                                )!,
                            });
                        }}
                    >
                        <i className="fas fa-eraser"></i>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: "none",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                }}
            >
                {props.content?.source && (
                    <img
                        src={props.content.source}
                        ref={imgRef}
                        onLoad={() => {
                            HandleImageOnLoad();
                        }}
                    />
                )}
            </div>
            {state.img && (
                <Canvas
                    properties={state.properties}
                    backgroundColor={state.backgroundColor}
                    tool={state.activeTool}
                    img={state.img}
                    history={history}
                    setHistory={setHistory}
                />
            )}
            {!state.img && (
                <Canvas
                    properties={state.properties}
                    backgroundColor={state.backgroundColor}
                    tool={state.activeTool}
                    img={null}
                    history={history}
                    setHistory={setHistory}
                />
            )}
        </div>
    );
};

export default Application;
