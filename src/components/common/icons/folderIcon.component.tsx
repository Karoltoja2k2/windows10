import React from "react";
import "./folderIcon.scss";

import { useDispatch } from "react-redux";
import { OpenWindow, Navigate } from "../../../actions/windowsActions";

const FolderIcon = (props: any) => {
    const dispatch = useDispatch();

    return (
        <button
            className={props.iconDisplay}
            onDoubleClick={() => {
                props.file.extension === ".fld"
                    ? dispatch(Navigate(props.id, props.file))
                    : dispatch(OpenWindow(props.file));
            }}
        >
            <img src={props.file.icon.src} />
            <label>{props.file.title}</label>
        </button>

        
    );
};

export default FolderIcon;
