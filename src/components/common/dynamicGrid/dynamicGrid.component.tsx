import React, { useState, useEffect } from "react";
import "./dynamicGrid.scss";
import CalculateSquareSize from "../calculators/squareSize.calculator";

const DynamicGrid = (props: any) => {
    return (
        <div
            className="grid"
            style={{
                gridTemplateColumns: `repeat(${props.columns}, ${props.squareSize}px)`,
                gridTemplateRows: `repeat(${props.rows}, ${props.squareSize}px)`,
            }}
        >
            {props.children}
        </div>
    );
};

export default DynamicGrid;
