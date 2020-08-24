import React from "react";
import "../../../../common/scrollbar--light.scss";
import Tool from "../../models/Tool";

const ToolbarFile = (props: any) => {
    return (
        <div className="toolbar__segments scrollbar--light">
            <div className="segment">
                <button>SAVE FILE</button>
            </div>
            <div className="segment">
                <button>OPEN FILE</button>
            </div>
            <div className="segment">
                <button>SAVE AS</button>
            </div>
            <div className="segment">
                <button>NEW CANVAS</button>
            </div>
        </div>
    );
};

export default ToolbarFile;
