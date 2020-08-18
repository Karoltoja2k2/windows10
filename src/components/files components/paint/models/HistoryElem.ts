import Point from "../../../common/Point";

export default interface HistoryElem {
    points: Point[];
    thickness: number | null;
    color: string | null;
}
