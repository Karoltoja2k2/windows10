import React from "react";
import TaskBarItem from "./TaskBarItem.component";
import Clock from "../common/clock/clock";

import "./taskbar.scss";

import { useSelector, useDispatch } from "react-redux";
import WindowsManager from "../../models/WindowsManager";
import { RootState } from "../../reducers";
import { MinimizeAllWindows, OpenWindow } from "../../actions/windowsActions";
import StartMenu from "./startMenu.component";
import File from "../../models/File";

const Taskbar = (props: any) => {
    const dispatch = useDispatch();
    const windowManager: WindowsManager = useSelector(
        (state: RootState) => state.windowsReducer
    );

    function NavigateStartMenu(file: File) {
        if (props.startMenu === true) {
            props.setStartMenu(false);
        }
        dispatch(OpenWindow(file));
    }

    return (
        <div className="taskBar">
            <button
                className={`startBtn open--${props.startMenu} taskBar__hoverable`}
                onClick={() => props.setStartMenu(!props.startMenu)}
            >
                <i className="fab fa-windows winLogo"></i>
            </button>
            {props.startMenu && (
                <StartMenu Navigate={NavigateStartMenu} files={props.files} />
            )}

            <div className="taskBarItems">
                {windowManager.openWindows.length > 0 &&
                    windowManager.openWindows.map((obj: any, index: number) => (
                        <TaskBarItem key={obj.id} id={obj.id} window={obj} />
                    ))}
            </div>
            <div className="toolBar">
                <i className="fas fa-wifi toolBar__icon taskBar__hoverable"></i>
                <i className="fas fa-volume-up toolBar__icon taskBar__hoverable"></i>
                <div className="toolbar__lang taskBar__hoverable">
                    <p>POL</p>
                    <p>PLP</p>
                </div>
                <div className="toolBar__clock">
                    <Clock />
                </div>
                <i className="far fa-comment-alt toolBar__icon taskBar__hoverable"></i>
                <button
                    className="minimizeAllBtn taskBar__hoverable"
                    onClick={() => dispatch(MinimizeAllWindows())}
                ></button>
            </div>
        </div>
    );
};

export default Taskbar;
