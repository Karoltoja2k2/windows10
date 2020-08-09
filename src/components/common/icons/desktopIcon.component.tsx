import React from "react";
import "./desktopIcon.scss";

import { useDispatch } from "react-redux";
import { OpenWindow } from "../../../actions/windowsActions";

const DesktopIcon = (props: any) => {
    const dispatch = useDispatch();

    return (
        <button
            className="desktopIcon"
            onDoubleClick={() => dispatch(OpenWindow(props.file))}
        >
            <img src={props.file.iconsrc} />
            <label>{props.file.title}</label>
        </button>
    );
};

export default DesktopIcon;
