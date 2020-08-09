import React from "react";
import "./startMenuIcon.scss";

import { useDispatch } from "react-redux";
import { OpenWindow, Navigate } from "../../../actions/windowsActions";

const StartMenuIcon = (props: any) => {
    const dispatch = useDispatch();

    return (
        <button
            className={props.type}
            onClick={() => {
                props.Navigate(props.file);
            }}
        >
            <img src={props.file.iconsrc} />
            <label>{props.file.title}</label>
        </button>
    );
};

export default StartMenuIcon;
