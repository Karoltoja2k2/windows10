import React from "react";
import "./toolPicker.scss";
import { ToolType } from "../models/ToolType";

const ToolPicker = (props: any) => {
    return (
        <div className="toolbar__tools">
            <div
                className="tools__tool"
                style={{ color: props.pencilColor }}
                onClick={() => {
                    props.SetTool("PENCIL");
                }}
            >
                <i className="fas fa-pencil-alt"></i>
            </div>
            <div
                className="tools__tool"
                onClick={() => {
                    props.SetTool("RUBBER");
                }}
            >
                <i className="fas fa-eraser"></i>
            </div>
        </div>
    );
};

export default ToolPicker;
