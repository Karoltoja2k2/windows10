import File from "../models/File";
import Window from "../models/Window";

export const OpenWindow = (fileToOpen: File) => {
    let window = NewWindow(0, fileToOpen);
    return {
        type: "OPEN",
        payload: { window },
    };
};

export const CloseWIndow = (windowId: number) => {
    return {
        type: "CLOSE",
        payload: { windowId },
    };
};

export const Navigate = (windowId: number, fileToOpen: File) => {
    return {
        type: "NAVIGATE",
        payload: { windowId, fileToOpen },
    };
};

export const Minimize = (windowId: number) => {
    return {
        type: "MINIMIZE",
        payload: { windowId },
    };
};

export const UnMinimizeWindow = (windowId: number) => {
    return {
        type: "UNMINIMIZE",
        payload: { windowId },
    };
};

export const MinimizeAllWindows = () => {
    return {
        type: "MINIMIZEALL",
    };
};

export const FullscreenWindow = (windowId: number) => {
    return {
        type: "FULLSCREEN",
        payload: { windowId },
    };
};

export const ExitFullscreenWindow = (windowId: number) => {
    return {
        type: "EXITFULLSCREEN",
        payload: { windowId },
    };
};

export const FocusWindow = (windowId: number) => {
    return {
        type: "FOCUS",
        payload: { windowId },
    };
};

export const UnFocusWindows = () => {
    return {
        type: "UNFOCUSALL",
    };
};

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
