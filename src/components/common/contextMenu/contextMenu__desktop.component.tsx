import React from "react";
import "./contextMenu.scss";
import OpenFileOption from "./menuOptions/openFileOption.component";

const DesktopContextMenu = (props: any) => {
    return (
        <div className="container" style={{ top: props.top, left: props.left }}>
            <OpenFileOption />
        </div>
    );
};

export default DesktopContextMenu;
