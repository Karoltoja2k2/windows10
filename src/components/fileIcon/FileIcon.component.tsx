import React, { useState, useEffect } from "react";
import "./icon.scss";

import { useDispatch } from "react-redux";
import { OpenWindow, Navigate } from "../../actions/windowsActions";

const FileIcon = (props: any) => {

    const dispatch = useDispatch();

    if (props.type === "desktopIcon") {
        return (
            <button
                className="desktopIcon"
                onDoubleClick={() => dispatch(OpenWindow(props.file))}
            >
                <img src={props.file.iconsrc} />
                <label>{props.file.title}</label>
            </button>
        );
    } else if (props.type === "folderIcon") {
        return (
            <button
                className="desktopIcon"
                onDoubleClick={() => dispatch(Navigate(props.id, props.file))}
            >
                <img src={props.file.iconsrc} />
                <label>{props.file.title}</label>
            </button>
        );
    } else if (props.type === "inrow") {
        return (
            <button
                className="inrow"
                onDoubleClick={() => dispatch(Navigate(props.id, props.file))}
            >
                <img src={props.file.iconsrc} />
                <label>{props.file.title}</label>
            </button>
        );
    } else if (props.type === "searchResult") {
        return (
            <button
                className="searchResult"
                onClick={() => dispatch(Navigate(props.id, props.file))}
            >
                <img />
                <label>{props.file.path + props.file.title}</label>
            </button>
        );
    } else {
        return <button />;
    }
};

export default FileIcon;
