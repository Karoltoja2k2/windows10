import React, { useState, useEffect } from "react";
import "./fileExplorer.scss";
import "../../common/scrollbar--dark.scss";
import WindowBase from "../../common/windowBase/WindowBase";

import File from "../../../models/File";

import Bar from "./bar.component";
import Content from "./content.component";
import Footer from "./footer.component";
import { Navigate } from "../../../actions/windowsActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import useSoftExit from "../../common/hooks/useSoftExit";

const FileExplorer = (props: any) => {
    const dispatch = useDispatch();
    const [iconDisplay, setIconDisplay] = useState("folderIcon");
    const [state, setState] = useState({
        filter: "",
        files: Array<File>(),
    });

    const drive: File[] = useSelector((state: RootState) => state.driveReducer);

    useSoftExit(props.isClosed, props.id);

    // THIS NEED CHANGES
    useEffect(() => {
        filterFiles(state.filter);
    }, [props.file, drive]);

    function filterFiles(filter: string) {
        setState({
            filter: filter,
            files: drive.filter(
                (x) =>
                    x.prevFolderId &&
                    x.prevFolderId === props.file.fileId &&
                    x.title.toLowerCase().includes(filter.toLowerCase())
            ),
        });
    }
    // END

    const previousFolder = () => {
        if (props.file.prevFolderId !== 0) {
            dispatch(
                Navigate(
                    props.id,
                    drive.find((x) => x.fileId === props.file.prevFolderId)!
                )
            );
        }
    };

    return (
        <WindowBase
            id={props.id}
            file={props.file}
            properties={props.properties}
            mouseState={props.mouseState}
            mobileMode={props.mobileMode}
        >
            <div className="fileExplorer__container">
                <Bar
                    previousFolder={previousFolder}
                    id={props.id}
                    file={props.file}
                    filterFiles={filterFiles}
                />
                <Content
                    iconsInFolder={state.files}
                    iconDisplay={iconDisplay}
                    id={props.id}
                />
                <Footer
                    iconsCount={state.files.length}
                    setIconDisplay={setIconDisplay}
                    iconDisplay={iconDisplay}
                />
            </div>
        </WindowBase>
    );
};

export default React.memo(FileExplorer, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.properties === nextProps.properties &&
        (prevProps.mouseState === nextProps.mouseState ||
            nextProps.properties.isDragged !== true) &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
