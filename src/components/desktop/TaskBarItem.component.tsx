import React, { useState, useEffect } from "react";
import "./taskbaritem.scss";
import Logo from "../../media/logo192.png";
import WindowsManager from "../../models/WindowsManager";
import { useSelector } from "react-redux";

import { rootReducers, RootState } from "../../reducers";

import { useDispatch } from "react-redux";
import {
    OpenWindow,
    Navigate,
    MinimizeAllWindows,
    MinimizeWindow,
    FocusWindow,
    UnMinimizeWindow,
} from "../../actions/windowsActions";

const TaskBarItem = (props: any) => {
    const windowManager: WindowsManager = useSelector(
        (state: RootState) => state.windowsReducer
    );
    const dispatch = useDispatch();
    const state = props.window.state;

    return (
        <div
            className={state.isFocused ? "taskBarItem selected" : "taskBarItem"}
            onClick={(e) => {
                e.stopPropagation();
                console.log(state);
                if (state.isMinimized) {
                    console.log("maximize");
                    dispatch(UnMinimizeWindow(props.id));
                } else if (!state.isMinimized && state.isFocused) {
                    console.log("minimizing");
                    dispatch(MinimizeWindow(props.id));
                } else {
                    console.log("focus");
                    dispatch(FocusWindow(props.id));
                }
            }}
        >
            <img src={props.window.file.iconsrc} />
            <label>{props.window.file.title}</label>
        </div>
    );
};

export default TaskBarItem;
