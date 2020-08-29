import React from "react";
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

    return (
        <div className="toolbar__segments scrollbar--light">
            <div className="segment">
                <div
                    className="toolbar__button"
                    onClick={() => props.FileManagement.SaveFile()}
                >
                    <i className="far fa-save"></i>
                    <label>Save as</label>
                </div>
            </div>
            <div className="segment">
                <div
                    className="toolbar__button"
                    onClick={() => props.FileManagement.OverwriteFile()}
                >
                    <i className="far fa-edit"></i>
                    <label>Save</label>
                </div>
            </div>
        </div>
    );
};

export default ToolbarFile;
