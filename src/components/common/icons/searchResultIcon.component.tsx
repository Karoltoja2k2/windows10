import React from "react";
import "./searchResultIcon.scss";

import { useDispatch } from "react-redux";
import { OpenWindow, Navigate } from "../../../actions/windowsActions";

const SearchResultIcon = (props: any) => {
    const dispatch = useDispatch();

    return (
        <button
            className="searchResult"
            onClick={() => {
                dispatch(Navigate(props.id, props.file));
            }}
        >
            <img />
            <label>{props.file.path + props.file.title}</label>
        </button>
    );
};

export default SearchResultIcon;
