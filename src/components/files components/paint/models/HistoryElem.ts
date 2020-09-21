import IPoint from "../../../common/Point";
import Tool from "./Tool";

export default interface HistoryElem {
    points: IPoint[];
    tool: Tool;
}
