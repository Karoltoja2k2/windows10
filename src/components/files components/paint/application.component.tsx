import React, {
    useState,
    useEffect,
    useRef,
    CanvasHTMLAttributes,
} from "react";
import "./application.scss";
import GENERATE_CANVAS from "./const";
import Canvas from "./canvas.component";
import COLORS from "./const";
import ColorPalletItem from "./colorPalletItem.component";
import HistoryElem from "./models/HistoryElem";

interface History {
    current: HistoryElem | null;
    latest: HistoryElem[];
}

const Application = (props: any) => {
    const canvasOffset = {
        top: 130,
        left: 1,
    };
    const [state, setState] = useState({
        canvasPosition: {
            top: props.top + canvasOffset.top,
            left: props.left + canvasOffset.left,
        },
        size: { X: 600, Y: 400 },
        backgroundColor: "#ffffff",
        source: props.content?.source,
        colors: COLORS(),
        color: "#00ff15",
        thickness: 2,
        drawType: "source-over",
    });

    // const [history, setHistory] = useState([])
    const [history, setHistory] = useState<History>({
        current: null,
        latest: [],
    });

    function SetColor(color: string) {
        setState({
            ...state,
            color: color,
        });
    }

    useEffect(() => {
        setState({
            ...state,
            canvasPosition: {
                top: props.top + canvasOffset.top,
                left: props.left + canvasOffset.left,
            },
        });
    }, [props.left, props.top]);

    function HandleSlider(e: React.ChangeEvent<HTMLInputElement>) {
        let newValue = parseInt(e.target.value);
        if (newValue !== state.thickness) {
            setState({
                ...state,
                thickness: newValue,
            });
        }
    }
    return (
        <div className="paint__container">
            <div className="container__toolbar">
                <div
                    className="toolbar__colors--chosen"
                    style={{ backgroundColor: state.color }}
                ></div>
                <div className="toolbar__colors">
                    {state.colors.map((color: string) => (
                        <ColorPalletItem color={color} setColor={SetColor} />
                    ))}
                </div>
                <div className="toolbar__thickness">
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={state.thickness}
                        onChange={(e) => HandleSlider(e)}
                    />
                </div>
                <div className="toolbar__tools">
                    <div
                        className="tools_tool"
                        onClick={() => {
                            setState({ ...state, drawType: "source-over" });
                        }}
                    >
                        <i className="fas fa-pencil-alt"></i>
                    </div>
                    <div
                        className="tools_tool"
                        onClick={() => {
                            setState({ ...state, drawType: "destination-out" });
                        }}
                    >
                        <i className="fas fa-eraser"></i>
                    </div>
                </div>
            </div>
            <Canvas
                width={state.size.X}
                height={state.size.Y}
                top={state.canvasPosition.top}
                left={state.canvasPosition.left}
                drawType={state.drawType}
                backgroundColor={state.backgroundColor}
                color={state.color}
                thickness={state.thickness}
                source={state.source}
                history={history}
                setHistory={setHistory}
            />
        </div>
    );
};

export default Application;
