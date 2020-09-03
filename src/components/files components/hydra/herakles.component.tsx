import React, { useState } from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import ErrorContent from "../../common/error/error.component";
import NewErrorOption from "../../common/error/errorOption";
import { useDispatch, useSelector } from "react-redux";
import { CloseWindow } from "../../../actions/windowsActions";
import WindowsManager from "../../../models/WindowsManager";
import { RootState } from "../../../reducers";
import FileRegistry from "../../system/FileRegistry";

const Herakles = (props: any) => {
    const dispatch = useDispatch();
    const windowManager: WindowsManager = useSelector(
        (state: RootState) => state.windowsReducer
    );

    function KillHydras() {
        var hydras = windowManager.openWindows.filter(
            (x) => x.file.componentId === FileRegistry.Hydra
        );
        if (hydras.length === 0) {
            setState({
                options: [NewErrorOption(Close, "Sorry")],
                errorText: "Why are you wasting my time??",
            });
        } else {
            hydras.forEach((hydra) => {
                dispatch(CloseWindow(hydra.id));
            });
            setState({
                options: [NewErrorOption(Close, "Thanks")],
                errorText: `Please be careful next time`,
            });
        }
    }

    function Close() {
        dispatch(CloseWindow(props.id));
    }
    const [state, setState] = useState({
        options: [
            NewErrorOption(KillHydras, "Yep!"),
            NewErrorOption(Close, "Nope"),
        ],
        errorText: "Again these annoying Hydras?",
    });

    return (
        <WindowBase
            id={props.id}
            file={props.file}
            properties={{
                ...props.properties,
                width: 300,
                height: 150,
                isFullscreen: false,
                isFixedSize: true,
                canMinimize: false,
                canClose: false,
            }}
            mobileMode={false}
        >
            <ErrorContent
                options={state.options}
                errorText={state.errorText}
                file={props.file}
            />
        </WindowBase>
    );
};

export default React.memo(Herakles, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
