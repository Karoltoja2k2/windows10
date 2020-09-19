import React, { useEffect } from "react";
import { ErrorOption } from "./errorOption";
import "./error.scss";

const windowserrorsound = require("../../../media/audio/windowserrorsound.wav");

const ErrorContent = (props: any) => {
    useEffect(() => {
        let audio = new Audio(windowserrorsound);
        audio.play();
    }, []);
    return (
        <div className="container">
            <div className="container__error">
                <div className="error__text">{props.errorText}</div>
                <div className="error__options">
                    {props.options.map((option: ErrorOption, index: number) => (
                        <div
                            className="options__item"
                            onClick={() => option.action()}
                            key={index}
                        >
                            <label>{option.text}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ErrorContent;
