import React, { useState, useEffect, useCallback } from "react";
import "./desktop.scss";
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

const startupsound = require('../../media/winstartupsound.mp3')
const sound = require("../../media/testsong.mp3")

function Desktop(props: any) {
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

    const [files, setFiles] = useState(drive.filter((x) => x.path === path));
    useEffect(() => {
        setFiles(drive.filter((x) => x.path === path));
        console.log(drive);
    }, [drive]);

    useEffect(() => {
        window.addEventListener("resize", (e) => HandleResize(e));
        dispatch(OpenWindow(drive.find((x) => x.componentId === FileRegistry.Resume)!, {width: 1024, height: 640}));

        let audio = new Audio(startupsound);
        audio.play();
    
    }, []);

    console.log("rerender desktop");
    return (
        <div className="noselect">
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
                            properties={window.properties}
                            mobileMode={windowManager.mobileMode}
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
            {/* <DesktopIconContextMenu
                file={files.find((x) => x.title === "Test folder")}
                top={100}
                left={600}
            /> */}
        </div>
    );
}

export default Desktop;
