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

export const MinimizeWindow = (windowId: number) => {
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
    console.log("exitfs");
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

export const DragWindow = (windowId: number) => {
    return {
        type: "DRAG",
        payload: { windowId },
    };
};

export const EndDragWindow = () => {
    return {
        type: "ENDDRAG",
    };
};

export const MobileMode = (stateToSet: boolean) => {
    return {
        type: "MOBILE_MODE",
        payload: {stateToSet},
    };
};

function NewWindow(id: number, file: File): Window {
    return {
        id: id,
        properties: {
            isDragged: false,
            isFocused: true,
            isMinimized: false,
            isFullscreen: false,
        },
        file: {
            ...file,
        },
        isClosed: false,
    };
}
