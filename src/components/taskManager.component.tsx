import React, { useEffect, useState } from "react";

import File from "../models/File";
import Window from "../models/Window"

import Files from "../models/fileStructure2";
import Desktop from "./desktop/Desktop.component";



const TaskManager = (props: any) => {
    useEffect(() => {
        if (window.innerWidth < 600 && state.smallScreen === false) {
            setState({
                ...state,
                smallScreen: true,
            });
        } else {
            setState({
                ...state,
                smallScreen: false,
            });
        }
    }, [window.innerWidth]);

    const [state, setState] = useState({
        freeWindowId: 2,
        openWindows: [NewWindow(1, Files[2])],
        focusedWinId: 1,
        smallScreen: window.innerWidth < 600 ? true : false,
    });

    function NewWindow(id: number, file: File): Window {
        return {
            id: id,
            state: {
                isFocused: true,
                isMinimized: false,
                isFullScreen: false,
            },
            file: {
                ...file,
            },
            isClosed: false,
        };
    }

    function Navigate(id: number, fileToOpen: File) {
        var windowToOpen;
        if (id === 0 || fileToOpen.extension !== ".fld") {
            windowToOpen = NewWindow(state.freeWindowId, fileToOpen);
            setState({
                ...state,
                openWindows: [...state.openWindows, windowToOpen],
                focusedWinId: windowToOpen.id,
                freeWindowId: state.freeWindowId + 1,
            });
        } else {
            var openWindows = state.openWindows.slice();
            var threadedWindow = openWindows.find((x) => x.id === id);
            if (threadedWindow === null) {
                /// throw error
            } else {
                threadedWindow!.file = { ...fileToOpen };
                setState({
                    ...state,
                    openWindows: openWindows,
                    focusedWinId: id,
                });
            }
        }
    }

    function CloseWindow(id: number) {
        var openWindows = state.openWindows.slice().filter((x) => x.id !== id);
        setState({
            ...state,
            openWindows: openWindows,
            focusedWinId: 0,
        });
    }

    function MinimizeWindow(id: number) {
        var openWindows = state.openWindows.slice();
        var threadedWindow = openWindows.find((x) => x.id === id)!;
        var threadedWindowProps = threadedWindow.state;
        var focusedWinId = threadedWindow.id;

        console.log(state.focusedWinId, focusedWinId);

        if (threadedWindow.state.isMinimized) {
            threadedWindowProps = {
                ...threadedWindowProps,
                isMinimized: false,
            };
            focusedWinId = id;
        } else if (
            !threadedWindow.state.isMinimized &&
            threadedWindow.id !== state.focusedWinId
        ) {
            focusedWinId = id;
        } else if (
            !threadedWindow.state.isMinimized &&
            threadedWindow.id === state.focusedWinId
        ) {
            threadedWindowProps = {
                ...threadedWindowProps,
                isMinimized: true,
            };
            focusedWinId = 0;
        }
        threadedWindow = {
            ...threadedWindow,
            state: threadedWindowProps,
        };
        setState({
            ...state,
            openWindows,
            focusedWinId: focusedWinId,
        });
    }

    function FullScreenMode(id: number) {
        var openWindows = state.openWindows.slice();
        var threadedWindow = openWindows.find((x) => x.id === id)!;
        threadedWindow.state = {
            ...threadedWindow.state,
            isFullScreen: !threadedWindow?.state.isFullScreen,
        };
    }

    function SetFocusedWin(id: number) {
        setState({ ...state, focusedWinId: id });
    }

    const WindowManagement = {
        SetFocusedWin: SetFocusedWin,
        Navigate: Navigate,
        CloseWindow: CloseWindow,
        MinimizeWindow: MinimizeWindow,
        FullScreenMode: FullScreenMode,
    };

    console.log(state.focusedWinId);

    return (
        <div className="">
            <Desktop
                openWindows={state.openWindows}
                focusedWinId={state.focusedWinId}
                WindowManagement={WindowManagement}
            />
        </div>
    );
};

export default TaskManager;
