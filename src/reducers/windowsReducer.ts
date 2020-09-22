import WindowsManager from "../models/WindowsManager";
import File from "../models/File";
import Window from "../models/Window";
import { bindActionCreators } from "redux";

let windowsState = {
    freeWindowId: 1,
    openWindows: [],
    mobileMode: false,
};

function CalculatePosition(windowId: number) {}

const windowsReducer = (state: WindowsManager = windowsState, action: any) => {
    switch (action.type) {
        case "OPEN":
            return {
                ...state,
                openWindows: state.openWindows
                    .map((window) =>
                        window.properties.isFocused
                            ? {
                                  ...window,
                                  properties: {
                                      ...window.properties,
                                      isFocused: false,
                                  },
                              }
                            : window
                    )
                    .concat({
                        ...action.payload.window,
                        id: state.freeWindowId,
                    }),
                freeWindowId: state.freeWindowId + 1,
            };

        case "OPEN_AS":
            return {
                ...state,
                openWindows: state.openWindows
                    .map((window) =>
                        window.properties.isFocused
                            ? {
                                  ...window,
                                  properties: {
                                      ...window.properties,
                                      isFocused: false,
                                  },
                              }
                            : window
                    )
                    .concat({
                        ...action.payload.window,
                        id: state.freeWindowId,
                    }),
                freeWindowId: state.freeWindowId + 1,
            };

        case "STARTCLOSE":
            return {
                ...state,
                openWindows: state.openWindows.map((window) =>
                    window.id === action.payload.windowId
                        ? { ...window, isClosed: true }
                        : window
                ),
            };

        case "FINISHCLOSE":
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
                              properties: {
                                  ...window.properties,
                                  isMinimized: true,
                                  isFocused: false,
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
                              properties: {
                                  ...window.properties,
                                  isMinimized: false,
                                  isFocused: true,
                              },
                          }
                        : window.properties.isFocused
                        ? {
                              ...window,
                              properties: {
                                  ...window.properties,
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
                    properties: {
                        ...window.properties,
                        isMinimized: window.properties.canMinimize,
                        isFocused: false,
                    },
                })),
            };

        case "FULLSCREEN":
            return {
                ...state,
                openWindows: state.openWindows.map((window) =>
                    window.id === action.payload.windowId
                        ? {
                              ...window,
                              properties: {
                                  ...window.properties,
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
                              properties: {
                                  ...window.properties,
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
                              properties: {
                                  ...window.properties,
                                  isFocused: true,
                              },
                          }
                        : {
                              ...window,
                              properties: {
                                  ...window.properties,
                                  isFocused: false,
                              },
                          }
                ),
            };

        case "UNFOCUSALL":
            return {
                ...state,
                openWindows: state.openWindows.map((window) =>
                    window.properties.isFocused
                        ? {
                              ...window,
                              properties: {
                                  ...window.properties,
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
                              properties: {
                                  ...window.properties,
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
                    window.properties.isDragged
                        ? {
                              ...window,
                              properties: {
                                  ...window.properties,
                                  isDragged: false,
                              },
                          }
                        : window
                ),
            };

        case "SETDIMENSIONS":
            return {
                ...state,
                openWindows: state.openWindows.map((window) =>
                    window.id === action.payload.windowId
                        ? {
                              ...window,
                              properties: {
                                  ...window.properties,
                                  ...action.payload.dimensions,
                              },
                          }
                        : window
                ),
            };

        case "MOBILE_MODE":
            console.log(action.payload.stateToSet);
            return {
                ...state,
                mobileMode: action.payload.stateToSet,
            };
        default:
            return state;
    }
};

export default windowsReducer;
