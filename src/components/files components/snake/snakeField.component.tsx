import React from "react";
import "./snakeField.scss";

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
