import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FinishCloseWindow } from "../../../actions/windowsActions";

export default function useSoftExit(
    isClosed: boolean,
    id: number,
    callback?: Function
) {
    const dispatch = useDispatch();
    useEffect(() => {
        if (isClosed) {
            dispatch(FinishCloseWindow(id));
            if (callback != null) {
                callback();
            }
        }
    }, [isClosed]);
}
