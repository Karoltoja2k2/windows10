import IPoint from "../../../common/Point";

export default interface SelectState {
    active: boolean;
    start: IPoint;
    end: IPoint;
    selected: number[];
}
