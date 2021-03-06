import React, { useState, useEffect, useRef } from "react";
import "./paintContent.scss";
import Canvas from "../../common/canvas.component";
import ColorPalletItem from "./toolbar/tools/colorPalletItem.component";
import History from "./models/History";
import { COLORS, TOOLS } from "./const";
import Tool from "./models/Tool";
import { useDispatch, useSelector } from "react-redux";
import CreateFileDto from "../../../models/CreateFileDto";
import { CreateFile } from "../../../actions/driveActions";
import { RootState } from "../../../reducers";
import File from "../../../models/File";
import ColorPallet from "./toolbar/tools/colorPallet.component";
import ToolPicker from "./toolbar/tools/toolPicker.component";
import { ToolType } from "./models/ToolType";
import { stat } from "fs";
import { SketchPicker, CompactPicker } from "react-color";
import PaintToolbar from "./toolbar/paintToolbar.component";
import HistoryElem from "./models/HistoryElem";

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
    img: HTMLImageElement | null;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    top: number;
    left: number;
    FileManagement: any;
}

const PaintContent = (props: PaintContentProps) => {
    // const imgRef = useRef<HTMLImageElement>(null);
    // const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasOffset = {
        top: 155,
        left: 6,
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
        img: props.img,
        colors: COLORS(),
        tools: TOOLS(),
        activeTool: TOOLS().find((x) => x.name === "PENCIL")!,
    });

    useEffect(() => {
        setState({
            ...state,
            properties: {
                width: props.canvasWidth,
                height: props.canvasHeight,
                top: props.top + canvasOffset.top,
                left: props.left + canvasOffset.left,
            },
        });
    }, [props.left, props.top, props.canvasHeight, props.canvasWidth]);

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

    function UndoAction() {
        const canvas: HTMLCanvasElement = props.canvasRef.current!;
        const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (props.img) {
            context.drawImage(props.img, 0, 0);
        }

        var lines: HistoryElem[] = history.latest;
        lines.pop();
        for (let line of lines) {
            context.strokeStyle = line.tool.strokeStyle;
            context.lineWidth = line.tool.lineWidth;
            context.lineJoin = context.lineCap = line.tool.lineStyle;
            context.beginPath();
            context.moveTo(line.points[0].X, line.points[0].Y);
            line.points.map((point) => {
                context.lineTo(point.X, point.Y);
                context.stroke();
            });
        }

        setHistory({ ...history, latest: [...lines] });
    }

    return (
        <div className="paint__container">
            <PaintToolbar
                FileManagement={props.FileManagement}
                tools={state.tools}
                activeTool={state.activeTool}
                SetTool={SetTool}
                SetColor={SetColor}
                SetThickness={SetThickness}
                UndoAction={UndoAction}
            />
            {props.img && (
                <Canvas
                    properties={state.properties}
                    backgroundColor={state.backgroundColor}
                    tool={state.activeTool}
                    img={props.img}
                    canvasRef={props.canvasRef}
                    history={history}
                    setHistory={setHistory}
                />
            )}
            {!props.img && (
                <Canvas
                    properties={state.properties}
                    backgroundColor={state.backgroundColor}
                    tool={state.activeTool}
                    img={null}
                    canvasRef={props.canvasRef}
                    history={history}
                    setHistory={setHistory}
                />
            )}
        </div>
    );
};

export default PaintContent;
