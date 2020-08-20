import React, { useState } from "react";
import "./colorPallet.scss";
import ColorPalletItem from "./colorPalletItem.component";
import { CompactPicker } from "react-color";

const ColorPallet = (props: any) => {
    const [isShown, setIsShown] = useState(false);
    return (
        <div className="toolbar__colorPallet">
            <div
                className="colorPallet__sketchPicker"            >
                <CompactPicker
                    color={props.chosenColor}
                    onChange={(color) => props.SetColor(color.hex)}
                />
            </div>
        </div>
    );
};

export default ColorPallet;
