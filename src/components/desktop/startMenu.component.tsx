import React, { useEffect } from "react";
import "./startMenu.scss";
import "../common/scrollbar--dark.scss";

import MouseState from "../../models/MouseState";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";

const StartMenu = () => {
    return (
        <div
            className="menu"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div className="menu__column menu__column--left">
                <div className="column__item--left"></div>
                <div className="column__item--left"></div>
            </div>
            <div className="menu__column menu__column--middle scrollbar--dark">
                <div className="column__section">
                    <div className="section__title">SECTION 1</div>
                    <div className="section__container">
                        <div className="container__item"></div>
                        <div className="container__item"></div>
                        <div className="container__item"></div>
                        <div className="container__item"></div>
                    </div>
                </div>
                <div className="column__section">
                    <div className="section__title">SECTION 2</div>
                    <div className="section__container">
                        <div className="container__item"></div>
                        <div className="container__item"></div>
                        <div className="container__item"></div>
                        <div className="container__item"></div>
                    </div>
                </div>
                <div className="column__section">
                    <div className="section__title">SECTION 3</div>
                    <div className="section__container">
                        <div className="container__item"></div>
                        <div className="container__item"></div>
                        <div className="container__item"></div>
                        <div className="container__item"></div>
                    </div>
                </div>

                <div className="column__section">
                    <div className="section__title">SECTION 4</div>
                    <div className="section__container">
                        <div className="container__item"></div>
                        <div className="container__item"></div>
                        <div className="container__item"></div>
                        <div className="container__item"></div>
                    </div>
                </div>
            </div>
            <div className="menu__column menu__column--right scrollbar--dark">
                <div className="column__section">
                    <div className="section__title">SECTION 1</div>
                    <div className="section__grid">
                        <div className="grid__item"></div>
                        <div className="grid__item"></div>
                        <div className="grid__item"></div>
                        <div className="grid__item"></div>
                    </div>
                </div>
                <div className="column__section">
                    <div className="section__title">SECTION 2</div>
                    <div className="section__grid">
                        <div className="grid__item"></div>
                        <div className="grid__item"></div>
                        <div className="grid__item"></div>
                        <div className="grid__item"></div>
                    </div>
                </div>
                <div className="column__section">
                    <div className="section__title">SECTION 3</div>
                    <div className="section__grid">
                        <div className="grid__item"></div>
                        <div className="grid__item"></div>
                        <div className="grid__item"></div>
                        <div className="grid__item"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartMenu;
