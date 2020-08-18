import React from "react";
import "./colorPalletItem.scss";

const ColorPalletItem = (props: any) => {
    return (
        <button
            className="item"
            style={{
                backgroundColor: props.color !== "" ? props.color : "#ffffff",
            }}
            onClick={() => {
                if (props.color !== "") {
                    props.setColor(props.color);
                }
            }}
        ></button>
    );
};

export default ColorPalletItem;
