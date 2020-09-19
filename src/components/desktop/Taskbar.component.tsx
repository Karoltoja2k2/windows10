import React, { useState, useEffect } from "react";
import TaskBarItem from "./TaskBarItem.component";
import Clock from "../common/clock/clock";

import "./taskbar.scss";

import { useSelector, useDispatch } from "react-redux";
import WindowsManager from "../../models/WindowsManager";
import { RootState } from "../../reducers";
import { MinimizeAllWindows, OpenWindow } from "../../actions/windowsActions";
import StartMenu from "./startMenu.component";
import MouseState from "../../models/MouseState";
import File from "../../models/File";

const Taskbar = (props: any) => {
    const [state, setState] = useState(false);

    const dispatch = useDispatch();
    const windowManager: WindowsManager = useSelector(
        (state: RootState) => state.windowsReducer
    );
    const mouseState: MouseState = useSelector(
        (state: RootState) => state.mouseReducer
    );

    useEffect(() => {
        if (state === true && mouseState.lmbDown === true) {
            setState(false);
        }
    }, [mouseState.lmbDown]);

    function NavigateStartMenu(file: File) {
        if (state === true) {
            setState(false);
        }
        dispatch(OpenWindow(file));
    }

    return (
        <div className="taskBar">
            <button className={`startBtn open--${state}`} onClick={() => setState(!state)}>
                <i className="fab fa-windows winLogo"></i>
            </button>
            {state && <StartMenu Navigate={NavigateStartMenu} />}

            <div className="taskBarItems">
                {windowManager.openWindows.length > 0 &&
                    windowManager.openWindows.map((obj: any, index: number) => (
                        <TaskBarItem key={obj.id} id={obj.id} window={obj} />
                    ))}
            </div>
            <div className="toolBar">
                <Clock />
                <button
                    className="minimizeAllBtn"
                    onClick={() => dispatch(MinimizeAllWindows())}
                ></button>
            </div>
        </div>
    );
};

export default Taskbar;
