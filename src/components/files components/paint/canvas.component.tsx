import React, {
    useRef,
    useEffect,
    useState,
    CanvasHTMLAttributes,
} from "react";
import Point from "../../common/Point";
import "./canvas.scss";
import "./application.scss";
import HistoryElem from "./models/HistoryElem";

interface state {
    properties: {
        height: number;
        width: number;
        top: number;
        left: number;
    };
    source: string;
}

const Canvas = (props: any) => {
    const drawLayer = useRef(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const [state, setState] = useState<state>({
        properties: {
            height: props.height,
            width: props.width,
            top: props.top,
            left: props.left,
        },
        source: props.source,
    });
    const [drawing, setDrawing] = useState(false);

    useEffect(() => {
        const canvas: HTMLCanvasElement = drawLayer.current!;
        const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
        if (props.source !== undefined) {
            setState({
                ...state,
                properties: {
                    ...state.properties,
                    height: imgRef.current!.naturalHeight,
                    width: imgRef.current!.naturalWidth,
                },
            });
        } else {
            context.fillStyle = props.backgroundColor;
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            context.fill();
        }
    }, []);

    useEffect(() => {
        console.log(state.source);
        if (state.source !== undefined) {
            RenderImage();
        }
    }, [state.source, state.properties]);

    useEffect(() => {
        console.log(state.properties);
    }, [state.properties]);

    useEffect(() => {
        setState({
            ...state,
            properties: {
                ...state.properties,
                width: props.width,
                height: props.height,
            },
        });
    }, [props.width, props.height]);

    function RenderImage() {
        const canvas: HTMLCanvasElement = drawLayer.current!;
        const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
        let img = new Image();
        img.src = state.source;
        img.onload = () => {
            context.drawImage(img, 0, 0);
            context.fill();
        };
    }

    function CalculateOffset(e: React.MouseEvent): Point {
        return {
            X: e.pageX - props.left + e.currentTarget.parentElement!.scrollLeft,
            Y: e.pageY - props.top + e.currentTarget.parentElement!.scrollTop,
        };
    }

    function Draw(context: CanvasRenderingContext2D, point: Point) {
        context.strokeStyle = props.color;
        context.lineWidth = props.thickness;
        context.lineJoin = context.lineCap = "round";

        context.lineTo(point.X, point.Y);
        context.stroke();

        props.setHistory({
            ...props.history,
            current: {
                ...props.history.current,
                points: [...props.history.current.points, point],
            },
        });
    }

    function RedrawAll() {
        const canvas: HTMLCanvasElement = drawLayer.current!;
        const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (state.source !== undefined) {
            context.drawImage(imgRef.current!, 0, 0);
        }
        var lines: HistoryElem[] = props.history.latest;
        console.log(lines);

        lines.pop();
        console.log(lines);

        for (let line of lines) {
            context.strokeStyle = line.color!;
            context.lineWidth = line.thickness!;
            context.beginPath();
            context.moveTo(line.points[0].X, line.points[0].Y);
            line.points.map((point) => {
                context.lineTo(point.X, point.Y);
            });
            context.stroke();
        }
        console.log(lines);

        props.setHistory({ ...props.history, latest: [...lines] });
    }

    function HandleMouseDown(e: React.MouseEvent) {
        if (e.button !== 0) {
            return;
        }
        setDrawing(true);
        const canvas: HTMLCanvasElement = drawLayer.current!;
        const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
        let point = CalculateOffset(e);
        context.moveTo(point.X, point.Y);
        context.beginPath();
        context.strokeStyle = props.color;
        context.lineWidth = props.thickness;
        context.lineTo(point.X, point.Y);
        context.stroke();
        let newElem: HistoryElem = {
            points: [point],
            thickness: props.thickness,
            color: props.color,
        };
        props.setHistory({
            ...props.history,
            current: newElem,
            latest: [...props.history.latest],
        });
    }

    function StopDrawing(e: React.MouseEvent) {
        if (drawing) {
            props.setHistory({
                ...props.history,
                current: null,
                latest: [...props.history.latest, props.history.current],
            });
            setDrawing(false);
        }
    }

    function HandleMouseMove(e: React.MouseEvent) {
        if (drawing) {
            const canvas: HTMLCanvasElement = drawLayer.current!;
            const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
            let point = CalculateOffset(e);
            Draw(context, point);
        }
    }

    console.log(state.properties);
    return (
        <div className="container__canvas">
            <div style={{ display: "none", position: "absolute" }}>
                {state.source && <img src={state.source} ref={imgRef} />}
            </div>
            <div
                style={{
                    width: state.properties.width,
                    height: state.properties.height,
                }}
                onMouseDown={(e) => HandleMouseDown(e)}
                onMouseUp={(e) => StopDrawing(e)}
                onMouseMove={(e) => HandleMouseMove(e)}
                onMouseLeave={(e) => StopDrawing(e)}
            >
                <canvas
                    style={{ backgroundColor: props.backgroundColor }}
                    ref={drawLayer}
                    {...state.properties}
                />
            </div>

            <button
                style={{ width: 50, height: 50 }}
                onClick={() => RedrawAll()}
            />
        </div>
    );
};

export default Canvas;
