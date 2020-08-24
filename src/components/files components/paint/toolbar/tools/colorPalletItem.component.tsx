import React from "react";
import "./toolbarTools.scss"

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
