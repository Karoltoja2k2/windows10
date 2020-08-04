import React, { useState, useEffect } from "react";
import "./dynamicGrid.scss";

const DynamicGrid = (props: any) => {
    const [state, setState] = useState({
        columns: props.columns,
        rows: props.rows,
        squareSize: CalculateSquareSize(
            props.width - 50,
            props.height - 50,
            props.maxWidth,
            props.maxHeight,
            props.columns,
            props.rows
        ),
    });

    function CalculateSquareSize(
        width: number,
        height: number,
        maxWidth: number,
        maxHeight: number,
        columns: number,
        rows: number
    ): number {
        let squareSize;
        if (columns >= rows) {
            squareSize = width / columns;
            if (squareSize * rows > height) {
                squareSize = height / rows;
            }
        } else {
            squareSize = height / rows;
            if (squareSize * columns > width) {
                squareSize = width / columns;
            }
        }
        return squareSize;
    }

    useEffect(() => {
        console.log(props.width, props.height);
        setState({
            ...state,
            squareSize: CalculateSquareSize(
                props.width - 50,
                props.height - 50,
                props.maxWidth,
                props.maxHeight,
                props.columns,
                props.rows
            ),
        });
    }, [props.width, props.height]);

    return (
        <div className="container">
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${state.columns}, ${state.squareSize}px)`,
                    gridTemplateRows: `repeat(${state.rows}, ${state.squareSize}px)`,
                }}
            ></div>
        </div>
    );
};

export default DynamicGrid;
