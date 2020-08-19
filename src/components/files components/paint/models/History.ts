import HistoryElem from "./HistoryElem";

export default interface History {
    current: HistoryElem | null;
    latest: HistoryElem[];
}
