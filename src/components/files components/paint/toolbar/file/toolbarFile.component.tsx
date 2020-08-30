import React, { useState } from "react";
import "../../../../common/scrollbar--light.scss";
import "../paintToolbar.scss";
import "./toolbarFile.scss";
import Tool from "../../models/Tool";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../reducers";
import File from "../../../../../models/File";
import { Navigate } from "../../../../../actions/windowsActions";

const ToolbarFile = (props: any) => {
    const dispatch = useDispatch();
    const drive: File[] = useSelector((state: RootState) => state.driveReducer);

    const [state, setState] = useState({
        dialogOpen: false,
        title: props.FileManagement.file.content?.file?.title
            ? props.FileManagement.file.content?.file?.title
            : "New drawing",
    });

    return (
        <div className="toolbar__segments scrollbar--light">
            <div className="segment">
                <div
                    className="toolbar__button"
                    onClick={() => props.FileManagement.OverwriteFile()}
                >
                    <i className="far fa-edit"></i>
                    <label>Save</label>
                </div>
            </div>

            <div className="segment">
                <div
                    className="toolbar__button"
                    onClick={() => {
                        setState({ ...state, dialogOpen: !state.dialogOpen });
                    }}
                >
                    <i className="far fa-save"></i>
                    <label>Save as</label>
                </div>
            </div>

            {state.dialogOpen && (
                <div className="segment">
                    <div className="toolbar__options">
                        <div className="options__row--up">
                            <input
                                value={state.title}
                                onChange={(e) =>
                                    setState({
                                        ...state,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="options__row--down">
                            <input value={"Drive C:/Desktop/"} />
                            <button
                                onClick={() =>
                                    props.FileManagement.SaveFile(state.title)
                                }
                            >
                                <i className="fas fa-check"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ToolbarFile;
