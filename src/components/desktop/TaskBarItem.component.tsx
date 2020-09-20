import React, { useState, useEffect } from "react";
import "./taskbaritem.scss";
import Logo from "../../media/logo192.png";
import WindowsManager from "../../models/WindowsManager";
import { useSelector } from "react-redux";

import { rootReducers, RootState } from "../../reducers";

import { useDispatch } from "react-redux";
import {
    MinimizeWindow,
    FocusWindow,
    UnMinimizeWindow,
} from "../../actions/windowsActions";

const TaskBarItem = (props: any) => {
    const windowManager: WindowsManager = useSelector(
        (state: RootState) => state.windowsReducer
    );
    const dispatch = useDispatch();
    const state = props.window.properties;
    return (
        <div
            className={state.isFocused ? "taskBarItem selected taskBar__hoverable" : "taskBarItem taskBar__hoverable"}
            onClick={(e) => {
                e.stopPropagation();
                console.log(state);
                if (state.isMinimized) {
                    dispatch(UnMinimizeWindow(props.id));
                } else if (!state.isMinimized && state.isFocused) {
                    if (state.canMinimize) {
                        dispatch(MinimizeWindow(props.id));
                    }
                } else {
                    dispatch(FocusWindow(props.id));
                }
            }}
        >
            <img src={props.window.file.iconsrc} />
            <label>{props.window.file.title}</label>
        </div>
    );
};

export default React.memo(TaskBarItem, (prevProps, nextProps) => {
    return prevProps.window === nextProps.window;
});
