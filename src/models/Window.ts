import File from "./File";

export default interface Window {
    id: number;
    properties: {
        top?: number;
        left?: number;
        width?: number;
        height?: number;
        isDragged: boolean;
        isFocused: boolean;
        isMinimized: boolean;
        isFullscreen: boolean;
    };
    file: File;
    isClosed: boolean;
}
