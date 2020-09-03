import React from "react";
import { ErrorOption } from "./errorOption";
import File from "../../../models/File";

import "./error.scss";

const ErrorContent = (props: any) => {
    return (
        <div className="container">
            <div className="container__error">
                <div className="error__text">{props.errorText}</div>
                <div className="error__options">
                    {props.options.map((option: ErrorOption, index: number) => (
                        <div
                            className="options__item"
                            onClick={() => option.action()}
                        >
                            <label htmlFor="">{option.text}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ErrorContent;
