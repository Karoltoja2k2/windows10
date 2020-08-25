import React, { useState, useEffect } from "react";
import "./paintSettings.scss";
import "../../common/scrollbar--light.scss";
import { IsNatural } from "../../common/calculators/numberValidator";

const PaintSettings = (props: any) => {
    const [state, setState] = useState({
        width: props.state.width,
        height: props.state.height,
        threadedFile: props.state.threadedFile,
    });

    function asd(e: React.ChangeEvent<HTMLInputElement>) {
        let val = e.target.value;
        if (val === "") {
            return "";
        }
        if (IsNatural(val)) {
            return val;
        }
    }

    return (
        <div className="paint__settings scrollbar--light">
            <div className="settings_segments">
                <div className="settings__segment">
                    <label className="settings__label">Canvas width</label>
                    <input
                        type="text"
                        className="settings__input"
                        value={state.width}
                        onChange={(e) => {
                            setState({ ...state, width: asd(e) });
                        }}
                    />
                </div>
                <div className="settings__segment">
                    <label className="settings__label">Canvas height</label>
                    <input
                        type="text"
                        className="settings__input"
                        value={state.height}
                        onChange={(e) => {
                            setState({ ...state, height: asd(e) });
                        }}
                    />
                </div>
                <div className="settings__segment">
                    <label className="settings__label">Open file</label>
                    <input
                        type="text"
                        className="settings__input"
                        value={state.threadedFile?.content?.file.title}
                    />
                </div>

                <div className="settings__segment">
                    <button
                        className="settings__button"
                        onClick={() => {
                            props.setState({
                                ...props.state,
                                width: state.width,
                                height: state.height,
                                threadedFile: state.threadedFile,
                                setup: false,
                            });
                        }}
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default PaintSettings;
