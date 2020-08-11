import React, { useState, useEffect, useCallback } from "react";
import "./desktop.scss";
import FileIcon from "../common/icons/FileIcon.component";
import Taskbar from "./Taskbar.component";

import Background from "../../media/winxpbg.jpg";

import File from "../../models/File";
import Files from "../../models/fileStructure2";
import WindowsManager from "../../models/WindowsManager";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import Window from "../../models/Window";
import { UnFocusWindows, EndDragWindow } from "../../actions/windowsActions";
import { LmbUp, SetPosition, LmbDown } from "../../actions/mouseActions";
import DesktopIcon from "../common/icons/desktopIcon.component";
import ContextMenu from "../common/contextMenu/contextMenu__desktop.component";
import DesktopIconContextMenu from "../common/contextMenu/contextMenu__desktopIcon.component";

function Desktop(props: any) {
    const path = "Drive C:/Desktop/";

    const files2: File[] = useSelector(
        (state: RootState) => state.driveReducer
    );

    const [files, setFiles] = useState(files2.filter((x) => x.path === path));

    const windowManager: WindowsManager = useSelector(
        (state: RootState) => state.windowsReducer
    );

    const dispatch = useDispatch();
    return (
        <div className="">
            <div
                className="desktop"
                id="desktop"
                onMouseDown={() => {
                    dispatch(LmbDown());
                    dispatch(UnFocusWindows());
                }}
                onMouseUp={() => {
                    dispatch(LmbUp());
                    dispatch(EndDragWindow());
                }}
                onMouseMove={(e) => {
                    dispatch(SetPosition(e.pageY, e.pageX));
                }}
            >
                <img src={Background} className="desktopBackground" />
                <div className="iconGrid">
                    {files.map((obj: any, index: number) => (
                        <DesktopIcon file={obj} key={index} />
                    ))}
                </div>

                {windowManager.openWindows.length > 0 &&
                    windowManager.openWindows.map((window: Window) => (
                        <window.file.component
                            key={window.id}
                            file={window.file}
                            id={window.id}
                            state={window.state}
                        />
                    ))}

                <div className="activateWindows">
                    <p className="top">Aktywuj system Windows</p>
                    <p className="down">
                        Przejdź do ustawień, aby aktywować system Windows.
                    </p>
                </div>
            </div>
            <Taskbar />
            <DesktopIconContextMenu file={files[0]} top={100} left={600}/>
        </div>
    );
}

export default Desktop;
