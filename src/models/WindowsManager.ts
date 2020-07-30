import Window from "./Window";

export default interface WindowsManager{
    openWindows: Window[],
    freeWindowId: number,
}