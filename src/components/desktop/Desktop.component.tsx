import React, { useState, useEffect, useCallback } from "react";
import "./desktop.scss";
import FileIcon from "../fileIcon/FileIcon.component";
import Taskbar from "./Taskbar.component";

import Background from "../../media/winxpbg.jpg";

import File from "../../models/File";
import Files from "../../models/fileStructure2";

interface Window {
    id: number;
    windowProps: {
        top?: number;
        left?: number;
        width?: number;
        height?: number;
        isFocused: boolean;
        isMinimized: boolean;
        isFullScreen: boolean;
    };
    file: File;
}

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
        SetFocusedWin: props.WindowManagement.SetFocusedWin,
        mouseState: mouseState,
        setMouseState: setMouseState,
        Navigate: props.WindowManagement.Navigate,
        CloseWindow: props.WindowManagement.CloseWindow,
        MinimizeWindow: props.WindowManagement.MinimizeWindow,
        FullScreenMode: props.WindowManagement.FullScreenMode,
    };

    function RenderWindow(window: Window) {
        return (
            <window.file.component
                key={window.id}
                file={window.file}
                id={window.id}
                windowProps={window.windowProps}
                WindowManagement={WindowManagement}
                openWindows={props.openWindows}
                focusedWinId={props.focusedWinId}
            />
        );
    }

    return (
        <div
            className="desktop"
            id="desktop"
            onMouseDown={() => {
                console.log("asd");
                props.WindowManagement.SetFocusedWin(0);
            }}
            onMouseUp={() => {
                setMouseState({
                    ...mouseState,
                    lmbDown: false,
                    movingWinId: 0,
                });
            }}
            onMouseMove={(e) => {
                setMouseState({
                    ...mouseState,
                    position: {
                        top: e.pageY,
                        left: e.pageX,
                    },
                });
            }}
        >
            <img src={Background} className="desktopBackground" />
            <div className="iconGrid">
                {props.openWindows.length > 0 &&
                    props.openWindows.map((obj: Window, index: number) =>
                        RenderWindow(obj)
                    )}
                {DesktopIcons2.map((obj: any, index: number) => (
                    <FileIcon
                        type="icon"
                        Navigate={props.WindowManagement.Navigate}
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

            <Taskbar
                openWindows={props.openWindows}
                WindowManagement={WindowManagement}
            />
        </div>
    );
}

export default Desktop;
