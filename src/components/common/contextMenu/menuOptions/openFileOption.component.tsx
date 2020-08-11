import React from "react";
import "./optionBase.scss";
import { useDispatch } from "react-redux";
import { OpenWindow } from "../../../../actions/windowsActions";

const OpenFileOption = (props: any) => {
    const dispatch = useDispatch();

    return <button className="container__option" onClick={() => dispatch(OpenWindow(props.file))}></button>;
};

export default OpenFileOption;
