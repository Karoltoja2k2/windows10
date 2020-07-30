import React from "react";
import TaskBarItem from "./TaskBarItem.component";
import Clock from "../clock/Clock.component";

import "./taskbar.scss";

import { useSelector, useDispatch } from "react-redux";
import WindowsManager from "../../models/WindowsManager";
import { RootState } from "../../reducers";
import { MinimizeAllWindows } from "../../actions/windowsActions";

const Taskbar = (props: any) => {
    const dispatch = useDispatch();
    const windowManager: WindowsManager = useSelector(
        (state: RootState) => state.windowsReducer
    );
    
    return (
        <div className="taskBar">
            <button className="startBtn">
                <i className="fab fa-windows winLogo"></i>
            </button>
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
