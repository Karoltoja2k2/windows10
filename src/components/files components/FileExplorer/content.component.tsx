import React, { useState, useEffect } from "react";
import FileIcon from "../../common/icons/FileIcon.component";
import "./content.scss";
import FolderIcon from "../../common/icons/folderIcon.component";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

const Content = (props: any) => {
    const drive: File[] = useSelector((state: RootState) => state.driveReducer);

    function HandleClick(e: React.MouseEvent){
        console.log(e.button)
        if (e.button !== 2){
            return;
        }
        e.preventDefault()

    }
    return (
        <div className="container__content">
            <div className="content__left scrollbar--dark">
                {drive.map((file: any, index: number) => (
                    <FolderIcon
                        iconDisplay="inrow"
                        file={file}
                        id={props.id}
                        key={index}
                    />
                ))}
            </div>

            <div
                className={`content__right--${props.iconDisplay} scrollbar--dark`} onContextMenu={(e) => HandleClick(e)}
            >
                {props.iconsInFolder &&
                    props.iconsInFolder.map((file: any, index: number) => (
                        <FolderIcon
                            iconDisplay={props.iconDisplay}
                            file={file}
                            id={props.id}
                            key={index}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Content;
