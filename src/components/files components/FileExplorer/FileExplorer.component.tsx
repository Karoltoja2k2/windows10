import React, { useState, useEffect } from "react";
import "./fileExplorer.scss";
import WindowBase from "../WindowBase";

import Files from "../../../models/fileStructure2";
import File from "../../../models/File";

import Bar from "./bar.component";
import Content from "./content.component";
import Footer from "./footer.component";

const FileExplorer = (props: any) => {
    // THIS NEED OPTIMALIZATION !!!!!!
    const [filter, setFilter] = useState("");
    const [files, setFiles] = useState(Array<File>());
    useEffect(() => {
        setFiles(
            Files.filter(
                (x) =>
                    x.prevFolder &&
                    x.prevFolder.fileId === props.file.fileId &&
                    x.title.toLowerCase().includes(filter.toLowerCase())
            )
        );
    }, [props.file, filter]);
    // END

    const [iconDisplay, setIconDisplay] = useState("folderIcon");

    const previousFolder = () => {
        if (props.file.prevFolder) {
            props.WindowManagement.Navigate(props.id, props.file.prevFolder);
        }
    };

    console.log(`rerender fileexplorer ${props.id}`)

    return (
        <WindowBase
            id={props.id}
            file={props.file}
            state={props.state}
            focusedWinId={props.focusedWinId}
            WindowManagement={props.WindowManagement}
        >
            <div className="fileExplorer__container">
                <Bar
                    previousFolder={previousFolder}
                    Navigate={props.WindowManagement.Navigate}
                    id={props.id}
                    file={props.file}
                    setFilter={setFilter}
                />
                <Content
                    iconsInFolder={files}
                    iconDisplay={iconDisplay}
                    id={props.id}
                    Navigate={props.WindowManagement.Navigate}
                />
                <Footer
                    iconsCount={files.length}
                    setIconDisplay={setIconDisplay}
                    iconDisplay={iconDisplay}
                />
            </div>
        </WindowBase>
    );
};
// export default FileExplorer

export default React.memo(FileExplorer, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        nextProps.id !== nextProps.WindowManagement.mouseState.movingWinId
        // prevProps.focusedWinId === nextProps.focusedWinId &&
        // prevProps.windowProps === nextProps.windowProps &&
        // prevProps.openWindows === nextProps.openWindows
    );
});
