import React, { useState, useEffect, useRef } from "react";
import "./paintContent.scss";
import Canvas from "../../common/canvas.component";
import ColorPalletItem from "./toolbar/colorPalletItem.component";
import History from "./models/History";
import { COLORS, TOOLS } from "./const";
import Tool from "./models/Tool";
import { useDispatch, useSelector } from "react-redux";
import CreateFileDto from "../../../models/CreateFileDto";
import { CreateFile } from "../../../actions/driveActions";
import { RootState } from "../../../reducers";
import File from "../../../models/File";
import ColorPallet from "./toolbar/colorPallet.component";
import ToolPicker from "./toolbar/toolPicker.component";
import { ToolType } from "./models/ToolType";
import { stat } from "fs";
import { SketchPicker, CompactPicker } from "react-color";
import PaintToolbar from "./toolbar/paintToolbar.component";

interface PaintContentState {
    properties: {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    backgroundColor: string;
    img: HTMLImageElement | null;
    colors: string[];
    tools: Tool[];
    activeTool: Tool;
}

interface PaintContentProps {
    canvasWidth: number;
    canvasHeight: number;
    imgSource: string;
    top: number;
    left: number;
}

const PaintContent = (props: PaintContentProps) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasOffset = {
        top: 130,
        left: 1,
    };

    const [history, setHistory] = useState<History>({
        current: null,
        latest: [],
    });

    const [state, setState] = useState<PaintContentState>({
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
        activeTool: TOOLS().find((x) => x.name === "PENCIL")!,
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

    function SetColor(strokeStyle: string) {
        if (
            strokeStyle !== state.activeTool.strokeStyle &&
            state.activeTool.name !== "RUBBER"
        ) {
            UpdateTool(strokeStyle, state.activeTool.lineWidth);
        }
    }

    function SetTool(tool: ToolType) {
        if (state.activeTool.name === tool) {
            return;
        }
        setState({
            ...state,
            activeTool: state.tools.find((x) => x.name == tool)!,
        });
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

    function SetThickness(e: React.ChangeEvent<HTMLInputElement>) {
        let newValue = parseInt(e.target.value);
        if (newValue !== state.activeTool.lineWidth) {
            UpdateTool(state.activeTool.strokeStyle, newValue);
        }
    }

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

    const drive: File[] = useSelector((state: RootState) => state.driveReducer);
    const dispatch = useDispatch();
    function SaveImg() {
        var canvas = canvasRef.current!;
        var img = canvas.toDataURL("image/png");
        let createFileDto: CreateFileDto = {
            path: `Drive C:/Desktop/`,
            componentId: 3,
            title: "Nowe zdjęcie",
            prevFolderId: drive.find((x) => x.fileId === 1)!.fileId,
            content: {
                source: img,
            },
        };
        dispatch(CreateFile(createFileDto));
    }

    return (
        <div className="paint__container">
            <PaintToolbar
                SaveImg={SaveImg}
                tools={state.tools}
                activeTool={state.activeTool}
                SetTool={SetTool}
                SetColor={SetColor}
                SetThickness={SetThickness}
            />

            {props.imgSource && (
                <img
                    style={{
                        display: "none",
                        position: "absolute",
                    }}
                    src={props.imgSource}
                    ref={imgRef}
                    onLoad={() => {
                        HandleImageOnLoad();
                    }}
                />
            )}

            {state.img && (
                <Canvas
                    properties={state.properties}
                    backgroundColor={state.backgroundColor}
                    tool={state.activeTool}
                    img={state.img}
                    canvasRef={canvasRef}
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
                    canvasRef={canvasRef}
                    history={history}
                    setHistory={setHistory}
                />
            )}
        </div>
    );
};

export default PaintContent;
