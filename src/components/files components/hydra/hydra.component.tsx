import React, { useState } from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import { useDispatch, useSelector } from "react-redux";
import WindowsManager from "../../../models/WindowsManager";
import { RootState } from "../../../reducers";
import NewErrorOption, { ErrorOption } from "../../common/error/errorOption";
import { OpenWindow, FinishCloseWindow } from "../../../actions/windowsActions";
import ErrorContent from "../../common/error/error.component";
import File from "../../../models/File";
import FileRegistry from "../../system/FileRegistry";
import IPoint, { RandomPoint } from "../../common/Point";

const Hydra = (props: any) => {
    const dispatch = useDispatch();
    const drive: File[] = useSelector((state: RootState) => state.driveReducer);

    function CutHead() {
        dispatch(FinishCloseWindow(props.id));
        let boundriesFrom: IPoint = { X: 0, Y: 0 };
        let boundriesTo: IPoint = {
            X: window.innerWidth - 300,
            Y: window.innerHeight - 180,
        };
        let times = 0;
        while (times < 2) {
            let randomPos: IPoint = RandomPoint(boundriesFrom, boundriesTo);
            console.log(randomPos);

            dispatch(
                OpenWindow(state.file, {
                    top: randomPos.Y,
                    left: randomPos.X,
                    width: 300,
                    minWidth: 300,
                    height: 150,
                    minHeight: 150,
                    isFullscreen: false,
                    isFixedSize: true,
                    canMinimize: false,
                    canFullscreen: false,
                    canClose: false,
                })
            );
            times++;
        }
    }

    const [state, setState] = useState({
        options: [NewErrorOption(CutHead, "Ok")],
        file: drive.find((x) => x.componentId === FileRegistry.Hydra)!,
    });

    return (
        <WindowBase
            id={props.id}
            file={props.file}
            properties={{
                ...props.properties,
                width: 300,
                minWidth: 300,
                height: 150,
                minHeight: 150,
                isFullscreen: false,
                isFixedSize: true,
                canMinimize: false,
                canFullscreen: false,
                canClose: false,
            }}
            mobileMode={false}
        >
            <ErrorContent
                options={state.options}
                errorText="Cut my head, two more will take its place"
                file={props.file}
            />
        </WindowBase>
    );
};

export default React.memo(Hydra, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
