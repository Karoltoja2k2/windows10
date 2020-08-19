import Point from "../../../common/Point";
import Tool from "./Tool";

export default interface HistoryElem {
    points: Point[];
    tool: Tool;
}
