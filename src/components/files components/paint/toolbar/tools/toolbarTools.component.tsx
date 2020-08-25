import React from "react";
import "./toolbarTools.scss"
import "../../../../common/scrollbar--light.scss";
import ToolPicker from "./toolPicker.component";
import Tool from "../../models/Tool";
import ColorPallet from "./colorPallet.component";

const ToolbarTools = (props: any) => {
    return (
        <div className="toolbar__segments scrollbar--light">
            <div className="segment">
                <ToolPicker
                    SetTool={props.SetTool}
                    activeTool={props.activeTool}
                    pencilColor={
                        props.tools.find((x: Tool) => x.name === "PENCIL")!
                            .strokeStyle
                    }
                    UndoAction={props.UndoAction}
                />
            </div>
            <div className="segment">
                <div className="toolbar__thickness">
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={props.activeTool.lineWidth}
                        onChange={(e) => props.SetThickness(e)}
                    />
                </div>
            </div>
            <div className="segment">
                <ColorPallet
                    SetColor={props.SetColor}
                    chosenColor={
                        props.tools.find((x: any) => x.name === "PENCIL")
                            .strokeStyle
                    }
                />
            </div>
        </div>
    );
};

export default ToolbarTools;
