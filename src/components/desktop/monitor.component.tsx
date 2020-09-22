import React, { useState, useEffect, useCallback } from "react";
import "./monitor.scss";
import "../common/noselect.scss";
import FileIcon from "../common/icons/FileIcon.component";
import Taskbar from "./Taskbar.component";

import Background from "../../media/winxpbg.jpg";

import File from "../../models/File";
// import Files from "../../models/fileStructure2";
import WindowsManager from "../../models/WindowsManager";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import Window from "../../models/Window";
import {
    UnFocusWindows,
    EndDragWindow,
    OpenWindow,
    MobileMode,
} from "../../actions/windowsActions";
import { LmbUp, SetPosition, LmbDown } from "../../actions/mouseActions";
import DesktopIcon from "../common/icons/desktopIcon.component";
import FileRegistry from "../system/FileRegistry";
import Desktop from "./desktopModes/desktop.component";
import GravityDesktop from "./desktopModes/gravityDesktop.component";

const startupsound = require("../../media/win10startupsound.mp3");

function Monitor(props: any) {
    const dispatch = useDispatch();
    const path = "Drive C:/Desktop/";

    const drive: File[] = useSelector((state: RootState) => state.driveReducer);

    const windowManager: WindowsManager = useSelector(
        (state: RootState) => state.windowsReducer
    );

    function HandleResize(e: UIEvent) {
        if (window.innerWidth < 700) {
            dispatch(MobileMode(true));
        }
        if (window.innerWidth >= 700) {
            dispatch(MobileMode(false));
        }
    }
    const [files, setFiles] = useState(
        drive.filter((x) => x.path === path).filter((x) => x.fileId < 100)
    );
    const [mouseState, setMouseState] = useState({
        top: 0,
        left: 0,
        lmbDown: false,
        rmbDown: false,
    });
    useEffect(() => {
        setFiles(drive.filter((x) => x.path === path));
        console.log(drive);
    }, [drive]);

    useEffect(() => {
        window.addEventListener("resize", (e) => HandleResize(e));
        // dispatch(
        //     OpenWindow(
        //         drive.find((x) => x.componentId === FileRegistry.Winamp)!,
        //         { width: 800, height: 400 }
        //     )
        // );

        let audio = new Audio(startupsound);
        audio.play();
    }, []);

    return (
        <div className="noselect">
            <div
                className="monitor"
                onMouseDown={() => {
                    dispatch(LmbDown());
                    dispatch(UnFocusWindows());
                }}
                onMouseUp={() => {
                    dispatch(LmbUp());
                    dispatch(EndDragWindow());
                }}
                onMouseMove={(e) => {
                    setMouseState({...mouseState, top: e.pageY, left: e.pageX});
                }}
            >
                <img src={props.background.src} className="monitor__bg" />
                <Desktop files={files} />
                {/* <GravityDesktop files={files} mouseState={mouseState}/> */}

                {windowManager.openWindows.length > 0 &&
                    windowManager.openWindows.map((window: Window) => (
                        <window.file.component
                            key={window.id}
                            file={window.file}
                            id={window.id}
                            isClosed={window.isClosed}
                            properties={window.properties}
                            mouseState={mouseState}
                            mobileMode={windowManager.mobileMode}
                        />
                    ))}
            </div>
            <Taskbar />
        </div>
    );
}

export default Monitor;
