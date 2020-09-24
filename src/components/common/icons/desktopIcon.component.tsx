import React, { useEffect } from "react";
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
            className={`desktop-icon ${props.isSelected ? 'desktop-icon--selected' : ''}`}
            style={{ top: props.rb.pos.Y, left: props.rb.pos.X }}
            onMouseDown={(e) => {e.stopPropagation(); props.StartDrag(props.rb.id)}}
            onDoubleClick={() => dispatch(OpenWindow(props.rb.file))}
        >
            <img draggable={false} src={props.rb.file.icon.src} />
            <label>{props.rb.file.title}</label>
        </button>
    );
};

export default DesktopIcon
