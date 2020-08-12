import React, { useState, useEffect } from "react";
import "./fileExplorer.scss";
import "../../common/scrollbar--dark.scss"
import WindowBase from "../../common/windowBase/WindowBase";

import Files from "../../../models/fileStructure2";
import File from "../../../models/File";

import Bar from "./bar.component";
import Content from "./content.component";
import Footer from "./footer.component";
import { Navigate } from "../../../actions/windowsActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";

const FileExplorer = (props: any) => {
    const disptach = useDispatch();
    const [iconDisplay, setIconDisplay] = useState("folderIcon");
    const [state, setState] = useState({
        filter: "",
        files: Array<File>(),
    });

    const drive: File[] = useSelector((state: RootState) => state.driveReducer);

    console.log("rerender fileexploer");

    // THIS NEED CHANGES
    useEffect(() => {
        filterFiles(state.filter);
    }, [props.file, drive]);

    function filterFiles(filter: string) {
        setState({
            filter: filter,
            files: drive.filter(
                (x) =>
                    x.prevFolder &&
                    x.prevFolder.fileId === props.file.fileId &&
                    x.title.toLowerCase().includes(filter.toLowerCase())
            ),
        });
    }
    // END

    const previousFolder = () => {
        if (props.file.prevFolder) {
            disptach(Navigate(props.id, props.file.prevFolder));
        }
    };

    return (
        <WindowBase id={props.id} file={props.file} state={props.state}>
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
        prevProps.state === nextProps.state &&
        nextProps.state.isDragged !== true
    );
});
