import React, { useRef, useEffect, useState } from "react";
import Point from "./Point";
import History from "../files components/paint/models/History";
import Tool from "../files components/paint/models/Tool";

interface CanvasProps {
    properties: {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    backgroundColor: string;
    tool: Tool;
    img: HTMLImageElement | null;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    history: History;
    setHistory: React.Dispatch<React.SetStateAction<History>>;
}

const Canvas = (props: CanvasProps) => {
    const [drawing, setDrawing] = useState(false);

    useEffect(() => {
        const canvas: HTMLCanvasElement = props.canvasRef.current!;
        const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
        if (props.img !== null) {
            console.log(props.img)
            RenderImage();
        } else {
            context.fillStyle = props.backgroundColor;
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            context.fill();
        }
    }, []);

    function RenderImage() {
        if (props.img != null) {
            const canvas: HTMLCanvasElement = props.canvasRef.current!;
            const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
            console.log(props.img)
            context.drawImage(props.img, 0, 0);
        }
    }

    useEffect(() => {
        RenderImage();
    }, [props.img, props.properties.width, props.properties.height])

    function CalculateOffset(e: React.MouseEvent): Point {
        return {
            X:
                e.pageX -
                props.properties.left +
                e.currentTarget.parentElement!.scrollLeft,
            Y:
                e.pageY -
                props.properties.top +
                e.currentTarget.parentElement!.scrollTop,
        };
    }

    function Draw(context: CanvasRenderingContext2D, point: Point) {
        context.strokeStyle = props.tool.strokeStyle;
        context.lineWidth = props.tool.lineWidth;
        context.lineJoin = context.lineCap = props.tool.lineStyle;
        context.lineTo(point.X, point.Y);
        context.stroke();
    }

    function HandleMouseDown(e: React.MouseEvent) {
        if (e.button !== 0) {
            return;
        }
        setDrawing(true);
        const canvas: HTMLCanvasElement = props.canvasRef.current!;
        const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
        let point = CalculateOffset(e);
        context.moveTo(point.X, point.Y);
        context.beginPath();
        Draw(context, point);
        props.setHistory({
            ...props.history,
            current: {
                points: [point],
                tool: { ...props.tool },
            },
            latest: [...props.history.latest],
        });
    }

    function StopDrawing(e: React.MouseEvent) {
        if (drawing) {
            props.setHistory({
                ...props.history,
                current: null,
                latest: [...props.history.latest, props.history.current!],
            });
            setDrawing(false);
        }
    }

    function HandleMouseMove(e: React.MouseEvent) {
        if (drawing) {
            const canvas: HTMLCanvasElement = props.canvasRef.current!;
            const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
            let point = CalculateOffset(e);
            Draw(context, point);
            props.setHistory({
                ...props.history,
                current: {
                    ...props.history.current!,
                    points: [...props.history.current!.points, point],
                },
            });
        }
    }

    function HandleKeyDown(e: React.KeyboardEvent) {
        console.log(e.key);
    }

    return (
        <div
            className="scrollbar--light"
            style={{
                overflow: "auto",
                width: "100%",
                height: "100%",
                padding: 5,
                backgroundColor: "#d5deec",
            }}
        >
            <div
                style={{
                    width: props.properties.width,
                    height: props.properties.height,
                }}
                onMouseDown={(e) => HandleMouseDown(e)}
                onMouseUp={(e) => StopDrawing(e)}
                onMouseMove={(e) => HandleMouseMove(e)}
                onMouseLeave={(e) => StopDrawing(e)}
                onKeyDown={(e) => HandleKeyDown(e)}
            >
                <canvas
                    style={{
                        backgroundColor: props.backgroundColor,
                        cursor: "crosshair",
                        boxShadow: "7px 7px 7px -5px #000000"
                    }}
                    ref={props.canvasRef}
                    {...props.properties}
                />
            </div>
        </div>
    );
};

export default Canvas;
