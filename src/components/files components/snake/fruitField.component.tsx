import React, { useState, useEffect } from "react";
import "./fruitField.scss";

const FruitField = (props: any) => {
    return (
        <div
            className={`FRUIT ${props.fruit.type}`}
            style={{
                gridColumn: props.fruit.cords.X,
                gridRow: props.fruit.cords.Y,
            }}
        />
    );
};

export default FruitField;
