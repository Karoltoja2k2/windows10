import React from "react";
import "./colorPalletItem.scss";

const ColorPalletItem = (props: any) => {
    return (
        <button
            className="colors__item"
            style={{
                backgroundColor: props.color,
            }}
            onClick={() => {
                    props.SetColor(props.color);
            }}
        ></button>
    );
};

export default React.memo(ColorPalletItem);
