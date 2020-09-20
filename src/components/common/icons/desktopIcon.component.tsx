import React from "react";
import "./desktopIcon.scss";

import { useDispatch, useSelector } from "react-redux";
import { OpenWindow, OpenAs } from "../../../actions/windowsActions";
import { RootState } from "../../../reducers";
import File from "../../../models/File";

const DesktopIcon = (props: any) => {
    const dispatch = useDispatch();
    const drive: File[] = useSelector((state: RootState) => state.driveReducer)!;
    return (
        <button
            className="desktopIcon"
            // onDoubleClick={() => dispatch(OpenAs(props.file, drive.find(x => x.title === "Paint")!))}
            onDoubleClick={() => dispatch(OpenWindow(props.file))}

        >
            
            <img src={props.file.icon.src} />
            <label>{props.file.title}</label>
        </button>
    );
};

export default DesktopIcon;
