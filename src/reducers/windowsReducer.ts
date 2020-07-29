import WindowsManager from "../models/WindowsManager";
import File from "../models/File";
import Window from "../models/Window";
import { bindActionCreators } from "redux";

let windowsState = {
    freeWindowId: 1,
    openWindows: [],
    focusedWinId: 0,
};

const windowsReducer = (state: WindowsManager = windowsState, action: any) => {
    let threadedWindow;
    let openWindows;
    switch (action.type) {
        case "OPEN":
            return {
                ...state,
                openWindows: [
                    ...state.openWindows,
                    {
                        ...action.payload.window,
                        id: state.freeWindowId,
                    },
                ],
                focusedWinId: state.freeWindowId,
                freeWindowId: state.freeWindowId + 1,
            };

        case "CLOSE":
            return {
                ...state,
                openWindows: state.openWindows.filter(
                    (x) => x.id !== action.payload.windowId
                ),
            };

        case "NAVIGATE":
            return {
                ...state,
                openWindows: state.openWindows.map((window) =>
                    window.id === action.payload.windowId
                        ? { ...window, file: action.payload.fileToOpen }
                        : window
                ),
            };

        case "MINIMIZE":
            return {
                ...state,
                openWindows: state.openWindows.map((window) =>
                    window.id === action.payload.windowId
                        ? {
                              ...window,
                              state: {
                                  ...window.state,
                                  isMinimized: true,
                              },
                          }
                        : window
                ),
            };

        case "UNMINIMIZE":
            return {
                ...state,
                openWindows: state.openWindows.map((window) =>
                    window.id === action.payload.windowId
                        ? {
                              ...window,
                              state: {
                                  ...window.state,
                                  isMinimized: false,
                                  isFocused: true,
                              },
                          }
                        : window.state.isFocused
                        ? {
                              ...window,
                              state: {
                                  ...window.state,
                                  isFocused: false,
                              },
                          }
                        : window
                ),
            };

        case "MINIMIZEALL":
            return {
                ...state,
                openWindows: state.openWindows.map((window) => ({
                    ...window,
                    state: { ...window.state, isMinimized: true },
                })),
            };

        case "FULLSCREEN":
            return {
                ...state,
                openWindows: state.openWindows.map((window) =>
                    window.id === action.payload.windowId
                        ? {
                              ...window,
                              state: {
                                  ...window.state,
                                  isFullscreen: true,
                              },
                          }
                        : window
                ),
            };

        case "EXITFULLSCREEN":
            console.log("asd");
            return {
                ...state,
                openWindows: state.openWindows.map((window) =>
                    window.id === action.payload.windowId
                        ? {
                              ...window,
                              state: {
                                  ...window.state,
                                  isFullscreen: false,
                              },
                          }
                        : window
                ),
            };

        case "FOCUS":
            return {
                ...state,
                openWindows: state.openWindows.map((window) =>
                    window.id === action.payload.windowId
                        ? {
                              ...window,
                              state: {
                                  ...window.state,
                                  isFocused: true,
                              },
                          }
                        : {
                              ...window,
                              state: {
                                  ...window.state,
                                  isFocused: false,
                              },
                          }
                ),
            };

        case "UNFOCUSALL":
            return {
                ...state,
                openWindows: state.openWindows.map((window) =>
                    window.state.isFocused
                        ? {
                              ...window,
                              state: {
                                  ...window.state,
                                  isFocused: false,
                              },
                          }
                        : window
                ),
            };

        case "DRAG":
            return {
                ...state,
                openWindows: state.openWindows.map((window) =>
                    window.id === action.payload.windowId
                        ? {
                              ...window,
                              state: {
                                  ...window.state,
                                  isDragged: true,
                              },
                          }
                        : window
                ),
            };

        case "ENDDRAG":
            return {
                ...state,
                openWindows: state.openWindows.map((window) =>
                    window.state.isDragged
                        ? {
                              ...window,
                              state: {
                                  ...window.state,
                                  isDragged: false,
                              },
                          }
                        : window
                ),
            };
        default:
            return state;
    }
};

export default windowsReducer;
