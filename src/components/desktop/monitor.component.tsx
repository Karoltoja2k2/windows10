import React, { useState, useEffect } from "react";
import "./monitor.scss";
import "../common/noselect.scss";
import Taskbar from "./Taskbar.component";

import File from "../../models/File";
// import Files from "../../models/fileStructure2";
import WindowsManager from "../../models/WindowsManager";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import Window from "../../models/Window";
import {
    UnFocusWindows,
    EndDragWindow,
    MobileMode,
} from "../../actions/windowsActions";
import JustDesktop from "./desktopModes/justDesktop.component";
import RigidBody from "./desktopModes/models/RigidBody";
import { MapFilesToRbs } from "./desktopModes/desktop.const";
import GravityDesktop from "./desktopModes/gravityDesktop.component";
import DesktopBase from "./desktopModes/desktopBase.component";

const startupsound = require("../../media/win10startupsound.mp3");
const path = "Drive C:/Desktop/";

function Monitor(props: any) {
    const dispatch = useDispatch();
    const drive: File[] = useSelector((state: RootState) => state.driveReducer);
    const windowManager: WindowsManager = useSelector(
        (state: RootState) => state.windowsReducer
    );

    const [desktopType, setDesktopType] = useState({
        desktopComponent: JustDesktop,
    });
    const [files, setFiles] = useState(drive);
    const [rigidBodies, setRigidBodies] = useState<RigidBody[]>([]);
    const [startMenu, setStartMenu] = useState(false);
    const [mouseState, setMouseState] = useState({
        top: 0,
        left: 0,
        lmbDown: false,
        rmbDown: false,
    });

    const MalwareProps = {
        desktopType,
        setDesktopType,
    };

    useEffect(() => {
        let files = drive;
        files = files.map((file: File) => {
            return file.extension === ".xD"
                ? {
                      ...file,
                      content: {
                          ...file.content,
                          ...MalwareProps,
                      },
                  }
                : file;
        });

        setFiles(files);

        let rbs = MapFilesToRbs(files.filter((x) => x.path === path));
        setRigidBodies(rbs);

        window.addEventListener("resize", (e) => HandleResize(e));
        // dispatch(
        //     OpenWindow(
        //         files.find((x) => x.componentId === FileRegistry.Winamp)!,
        //         { width: 800, height: 400 }
        //     )
        // );

        let audio = new Audio(startupsound);
        audio.play();
    }, []);

    useEffect(() => {
        let rbs = rigidBodies.slice();
        if (rbs.length === 0) {
            return;
        }

        let files = drive.slice();
        setFiles(files)

        let sortedDesktopFiles = files
            .filter((x) => x.path === path)
            .sort((a, b) => a.fileId - b.fileId);

        let newFile: File | null = null;
        if (sortedDesktopFiles.length > rbs.length) {
            newFile = sortedDesktopFiles[sortedDesktopFiles.length - 1];
            let newRb = MapFilesToRbs(sortedDesktopFiles).find(
                (x) => x.file.fileId === newFile!.fileId
            )!;

            setRigidBodies([...rbs, newRb]);
        }
    }, [drive]);

    useEffect(() => {
        if (startMenu) {
            setStartMenu(false);
        }
    }, [mouseState.lmbDown, mouseState.rmbDown]);

    function HandleResize(e: UIEvent) {
        if (window.innerWidth < 700) {
            dispatch(MobileMode(true));
        }
        if (window.innerWidth >= 700) {
            dispatch(MobileMode(false));
        }
    }

    return (
        <div className="noselect">
            <div
                className="monitor"
                onMouseDown={() => {
                    dispatch(UnFocusWindows());
                    setMouseState({
                        ...mouseState,
                        lmbDown: true,
                    });
                }}
                onMouseUp={() => {
                    dispatch(EndDragWindow());
                    setMouseState({
                        ...mouseState,
                        lmbDown: false,
                    });
                }}
                onMouseMove={(e) => {
                    setMouseState({
                        ...mouseState,
                        top: e.pageY,
                        left: e.pageX,
                    });
                }}
            >
                <img src={props.background.src} className="monitor__bg" />
                {rigidBodies.length > 0 && (
                    <DesktopBase
                        rbs={rigidBodies}
                        setRbs={setRigidBodies}
                        mouseState={mouseState}
                        setMouseState={setMouseState}
                    >
                        <desktopType.desktopComponent />
                    </DesktopBase>
                )}
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
            <Taskbar
                startMenu={startMenu}
                setStartMenu={setStartMenu}
                files={files}
            />
        </div>
    );
}

export default Monitor;
