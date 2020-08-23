import React from "react";
import "./paintToolbar.scss";
import ToolPicker from "./toolPicker.component";
import { CompactPicker } from "react-color";
import Tool from '../models/Tool'
import ColorPallet from "./colorPallet.component";

const PaintToolbar = (props: any) => {
    return (
        <div className="container__toolbar">
            <div
                    className=""
                    style={{
                        width: 50,
                        height: 50,
                        color: "red",
                        fontSize: 30,
                    }}
                    onClick={() => {
                        props.SaveImg();
                    }}
                >
                    <i className="fas fa-caret-square-down"></i>
                </div>

                {/* <CompactPicker
                    color={
                        props.tools.find((x: Tool) => x.name === "PENCIL")!
                            .strokeStyle
                    }
                    onChange={(color) => props.SetColor(color.hex)}
                /> */}

                <ColorPallet SetColor={props.SetColor} chosenColor={props.tools.find((x: any) => x.name === "PENCIL").strokeStyle}/>

                <div className="toolbar__thickness">
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={props.activeTool.lineWidth}
                        onChange={(e) => props.SetThickness(e)}
                    />
                </div>
                <ToolPicker
                    SetTool={props.SetTool}
                    activeTool={props.activeTool}
                    pencilColor={
                        props.tools.find((x: Tool) => x.name === "PENCIL")!
                            .strokeStyle
                    }
                />
        </div>
    );
};

export default PaintToolbar;
