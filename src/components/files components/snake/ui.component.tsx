import React, { useState, useEffect } from "react";
import CalculateSquareSize from "../../common/calculators/squareSize.calculator";

const SnakeUi = (props: any) => {
    return (
        <div className="container__ui" style={{ height: 2 * props.squareSize }}>
            <label
                htmlFor=""
                className=""
                style={{ fontSize: 2 * props.squareSize }}
            >
                <i
                    className="fas fa-medal"
                    style={{
                        fontSize: 1.7 * props.squareSize,
                    }}
                ></i>
                {props.highScore}
            </label>
            <label
                htmlFor=""
                className=""
                style={{ fontSize: 2 * props.squareSize }}
            >
                <i
                    className="fab fa-apple"
                    style={{
                        fontSize: 2 * props.squareSize,
                    }}
                ></i>

                {props.actualScore}
            </label>
        </div>
    );
};

export default SnakeUi;
