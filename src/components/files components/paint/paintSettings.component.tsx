import React, { useState, useEffect } from "react";
import "./paintSettings.scss";
import "../../common/scrollbar--light.scss";
import { IsNatural } from "../../common/calculators/numberValidator";
import { HexToRGB } from "../../common/calculators/colors.calculator";

const PaintSettings = (props: any) => {
    const [state, setState] = useState({
        width: props.state.width,
        height: props.state.height,
        threadedFile: props.state.threadedFile,
    });

    function WidthValidator(e: React.ChangeEvent<HTMLInputElement>) {
        let val = e.target.value;
        if (val === "") {
            return "";
        }
        if (IsNatural(val)) {
            if (parseInt(val) <= 1920) {
                return val;
            }
            return state.width;
        }
    }

    function HeightValidator(e: React.ChangeEvent<HTMLInputElement>) {
        let val = e.target.value;
        if (val === "") {
            return "";
        }
        if (IsNatural(val)) {
            if (parseInt(val) <= 1080) {
                return val;
            }
            return state.height;
        }
    }

    return (
        <div className="paint__settings scrollbar--light">
            <div className="settings_segments">
                <div className="settings__segment">
                    <label className="settings__label">Canvas width (max 1920)</label>
                    <input
                        type="text"
                        className="settings__input"
                        value={state.width}
                        onChange={(e) => {
                            setState({ ...state, width: WidthValidator(e) });
                        }}
                    />
                </div>
                <div className="settings__segment">
                    <label className="settings__label">Canvas height (max 1080)</label>
                    <input
                        type="text"
                        className="settings__input"
                        value={state.height}
                        onChange={(e) => {
                            setState({ ...state, height: HeightValidator(e) });
                        }}
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
