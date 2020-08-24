import React from "react";
import "./toolbarTools.scss"

const ToolPicker = (props: any) => {
    return (
        <div className="toolbar__tools">
            <div
                className={`tools__tool ${props.activeTool.name === 'PENCIL' ? 'tools__tool--chosen' : ''}`}
                onClick={() => {
                    props.SetTool("PENCIL");
                }}
            >
                <i className="fas fa-pencil-alt"></i>
            </div>
            <div
                className={`tools__tool ${props.activeTool.name === 'RUBBER' ? 'tools__tool--chosen' : ''}`}
                onClick={() => {
                    props.SetTool("RUBBER");
                }}
            >
                <i className="fas fa-eraser"></i>
            </div>
            <div
                className="tools__tool"
                onClick={() => {
                    // props.SetTool("SELECTOR");
                }}
            >
                <i className="fas fa-eye-dropper"></i>
            </div>
            <div
                className="tools__tool"
                onClick={() => {
                    props.UndoAction();
                }}
            >
                <i className="fas fa-undo"></i>
            </div>
        </div>
    );
};

export default ToolPicker;
