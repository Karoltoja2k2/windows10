import React, { useState, useEffect } from "react";
import "./dynamicGrid.scss";
import CalculateSquareSize from "../calculators/squareSize.calculator";

const DynamicGrid = (props: any) => {
    // const [state, setState] = useState({
    //     columns: props.columns,
    //     rows: props.rows,
    //     squareSize: CalculateSquareSize(
    //         props.width,
    //         props.height,
    //         props.columns,
    //         props.rows,
    //         props.maxWidth,
    //         props.maxHeight
    //     ),
    // });

    // useEffect(() => {
    //     setState({
    //         ...state,
    //         squareSize: CalculateSquareSize(
    //             props.width,
    //             props.height,
    //             props.columns,
    //             props.rows,
    //             props.maxWidth,
    //             props.maxHeight
    //         ),
    //     });
    // }, [props.width, props.height]);

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
