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
    var DesktopIcons2 = Files.filter((x) => x.path === path2);

    const [mouseState, setMouseState] = useState({
        lmbDown: false,
        rmbDown: false,
        position: {
            top: 0,
            left: 0,
        },
        movingWinId: 0,
    });

    const WindowManagement = {
        mouseState: mouseState,
        setMouseState: setMouseState,
    };

    function RenderWindow(window: Window) {
        return (
            <window.file.component
                key={window.id}
                file={window.file}
                id={window.id}
                state={window.state}
                WindowManagement={WindowManagement}
            />
        );
    }

    const windowManager: WindowsManager = useSelector(
        (state: RootState) => state.windowsReducer
    );

    const mouseState2 = useSelector((state: RootState) => state.mouseReducer)

    const dispatch = useDispatch();
    return (
        <div className="">
            <div
                className="desktop"
                id="desktop"
                onMouseDown={() => {
                    console.log("unfocus all");
                    dispatch(UnFocusWindows());
                }}
                onMouseUp={() => {
                    setMouseState({
                        ...mouseState,
                        lmbDown: false,
                        movingWinId: 0,
                    });
                    dispatch(LmbUp());
                    dispatch(EndDragWindow());
                }}
                onMouseMove={(e) => {
                    setMouseState({
                        ...mouseState,
                        position: {
                            top: e.pageY,
                            left: e.pageX,
                        },
                    });
                    dispatch(SetPosition(e.pageY, e.pageX))
                }}
            >
                <img src={Background} className="desktopBackground" />
                <div className="iconGrid">
                    {windowManager.openWindows.length > 0 &&
                        windowManager.openWindows.map(
                            (obj: Window, index: number) => RenderWindow(obj)
                        )}
                    {DesktopIcons2.map((obj: any, index: number) => (
                        <FileIcon
                            type="desktopIcon"
                            file={obj}
                            id={0}
                            key={index}
                        />
                    ))}
                </div>

                <div className="activateWindows">
                    <p className="top">Aktywuj system Windows</p>
                    <p className="down">
                        Przejdź do ustawień, aby aktywować system Windows.
                    </p>
                </div>
            </div>
            <Taskbar openWindows={props.openWindows} />
        </div>
    );
}

export default Desktop;
