import React, { useState, useEffect, memo } from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import Logo from "../../media/win_logo.png";
import "./photoDisplay.scss";
import File from "../../../models/File";
import { RootState } from "../../../reducers";
import { useSelector, useDispatch } from "react-redux";
import { OpenAs, FinishCloseWindow } from "../../../actions/windowsActions";

const PhotoDisplay = (props: any) => {
    const dispatch = useDispatch();
    const drive: File[] = useSelector(
        (state: RootState) => state.driveReducer
    )!;

    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (props.isClosed) {
            dispatch(FinishCloseWindow(props.id));
        }
    }, [props.isClosed]);

    return (
        <WindowBase
            id={props.id}
            file={props.file}
            properties={props.properties}
            mobileMode={props.mobileMode}
        >
            <div className="content">
                <div className="content__container">
                    <div className="container__buttons">
                        <button
                            onClick={() => {
                                setScale(scale * 0.8);
                            }}
                        >
                            <i className="fas fa-search-minus"></i>
                        </button>
                        <button
                            onClick={() => {
                                dispatch(
                                    OpenAs(
                                        props.file,
                                        drive.find((x) => x.title === "Paint")!
                                    )
                                );
                                dispatch(FinishCloseWindow(props.id));
                            }}
                        >
                            <i className="far fa-edit"></i>
                        </button>
                        <button
                            onClick={() => {
                                setScale(scale * 1.25);
                            }}
                        >
                            <i className="fas fa-search-plus"></i>
                        </button>
                    </div>
                    <div className="container__photo">
                        <img
                            style={{ transform: `scale(${scale})` }}
                            src={`${props.file.content.source}`}
                        />
                    </div>
                </div>
            </div>
        </WindowBase>
    );
};

export default React.memo(PhotoDisplay, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.file.content.source === nextProps.file.content.source &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
