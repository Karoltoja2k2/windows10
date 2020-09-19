import File from "./File";

export default interface Window {
    id: number;
    properties: WindowProperties;
    file: File;
    isClosed: boolean;
}

export interface WindowProperties {
    top?: number;
    left?: number;
    width?: number;
    minWidth?: number;
    height?: number;
    minHeight?: number;
    isDragged?: boolean;
    isFocused?: boolean;
    isMinimized?: boolean;
    isFullscreen?: boolean;
    isFixedSize?: boolean;
    canMinimize?: boolean;
    canFullscreen?: boolean;
    canClose?: boolean;
}
