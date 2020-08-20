import { ToolType } from "./ToolType";

export default interface Tool {
    name: ToolType
    strokeStyle: string;
    lineWidth: number;
    lineStyle: "round";
}
