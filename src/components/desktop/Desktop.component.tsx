import React, { useState, useEffect, useCallback } from "react";
import "./desktop.scss";
import FileIcon from "../fileIcon/FileIcon.component";
import Taskbar from "./Taskbar.component";

import Background from "../../media/winxpbg.jpg";

import File from "../../models/File";
import Files from "../../models/fileStructure2";
import WindowsManager from "../../models/WindowsManager";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import Window from "../../models/Window";
import { UnFocusWindows, EndDragWindow } from "../../actions/windowsActions";
import { LmbUp, SetPosition } from "../../actions/mouseActions";

function Desktop(props: any) {

    const path2 = "Drive C:/Desktop/";

    const [files, setFiles] = useState(Files.filter((x) => x.path === path2));

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
                        <FileIcon
                            type="desktopIcon"
                            file={obj}
                            key={index}
                        />
                    ))}
                </div>

                {windowManager.openWindows.length > 0 &&
                    windowManager.openWindows.map(
                        (window: Window) => (
                            <window.file.component
                                key={window.id}
                                file={window.file}
                                id={window.id}
                                state={window.state}
                            />
                        )
                    )}

                <div className="activateWindows">
                    <p className="top">Aktywuj system Windows</p>
                    <p className="down">
                        Przejdź do ustawień, aby aktywować system Windows.
                    </p>
                </div>
            </div>
            <Taskbar />
        </div>
    );
}

export default Desktop;
