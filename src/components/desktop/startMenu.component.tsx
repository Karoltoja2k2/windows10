import React, { useState } from "react";
import "./startMenu.scss";
import "../common/scrollbar--dark.scss";

import StartMenuIcon from "../common/icons/startMenuIcon.component";
import File from "../../models/File";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

interface Dictionary<T> {
    [Key: string]: T;
}

interface State {
    path: string;
    files: File[];
    groupedFiles: Dictionary<File[]>;
}

const StartMenu = (props: any) => {

    // THIS COMPONENT LOGIC HAS TO BE CHANGED AS SOON AS THE API WILL BE DONE
    function GroupFilesByLetter(files: File[]) {
        var groupedCollection: Dictionary<File[]> = {};
        for (let i = 0; i < files.length; i++) {
            var firstLetter = files[i].title.charAt(0);
            if (groupedCollection[firstLetter] == undefined) {
                groupedCollection[firstLetter] = [];
            }
            groupedCollection[firstLetter].push(files[i]);
        }

        return groupedCollection;
    }

    const [state, setState] = useState<State>(InitState());

    function InitState(): State {
        let path = "";
        let files = props.files;
        let groupedFiles = GroupFilesByLetter(files);
        return {
            path: path,
            files: files,
            groupedFiles: groupedFiles,
        };
    }

    return (
        <div
            className="menu"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div className="menu__column menu__column--left">
                <button className="">
                    <i className="fas fa-user-cog"></i>
                </button>
                <button className="">
                    <i className="fas fa-cog"></i>
                </button>

                <button className="">
                    <i className="fas fa-power-off"></i>
                </button>
            </div>
            <div className="menu__column menu__column--middle scrollbar--dark">
                {Object.keys(state.groupedFiles).map((key, index) => (
                    <div className="column__section">
                        <div className="section__title">{key}</div>
                        <div className="section__container">
                            {state.groupedFiles[key].map((file, index) => (
                                <StartMenuIcon
                                    file={file}
                                    key={index}
                                    type={"horizontalIcon"}
                                    Navigate={props.Navigate}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="menu__column menu__column--right scrollbar--dark">
                
                <div className="column__section">
                    <div className="section__title">Apps</div>
                    <div className="section__grid">
                        {state.files &&
                            state.files
                                .filter((x) => x.extension === ".exe")
                                .map((file, index) => (
                                    <StartMenuIcon
                                        file={file}
                                        key={index}
                                        type={"squareIcon"}
                                        Navigate={props.Navigate}
                                    />
                                ))}
                    </div>
                </div>
                <div className="column__section">
                    <div className="section__title">Audio</div>
                    <div className="section__grid">
                        {state.files &&
                            state.files
                                .filter((x) => x.extension === ".mp3")
                                .map((file, index) => (
                                    <StartMenuIcon
                                        file={file}
                                        key={index}
                                        type={"squareIcon"}
                                        Navigate={props.Navigate}
                                    />
                                ))}
                    </div>
                </div>
                <div className="column__section">
                    <div className="section__title">Pictures</div>
                    <div className="section__grid">
                        {state.files &&
                            state.files
                                .filter((x) => x.extension === ".img")
                                .map((file, index) => (
                                    <StartMenuIcon
                                        file={file}
                                        key={index}
                                        type={"squareIcon"}
                                        Navigate={props.Navigate}
                                    />
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartMenu;
