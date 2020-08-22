import React from "react";
import "./colorPalletItem.scss";

const ColorPalletItem = (props: any) => {
    return (
        <button
            className="colors__item"
            style={{
                backgroundColor: props.color !== "" ? props.color : "#ffffff",
            }}
            onClick={() => {
                if (props.color !== "") {
                    props.SetColor(props.color);
                }
            }}
        ></button>
    );
};

export default React.memo(ColorPalletItem);
