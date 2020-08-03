import React, { useState, useEffect } from "react";
import "./snake.scss";

const Field = (props: any) => {
    let classes = `${props.dynamicColor} BODY `;
    if (props.dynamicRadius && props.field.type === "HEAD") {
        classes += `${props.dynamicRadius} `;
    }
    return (
        <div
            className={classes}
            style={{
                gridColumn: props.field.cords.X,
                gridRow: props.field.cords.Y,
            }}
        />
    );
};

export default Field;
