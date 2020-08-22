import React, { useState } from "react";
import "./colorPallet.scss";
import ColorPalletItem from "./colorPalletItem.component";
import { CompactPicker } from "react-color";
import { COLORS } from "../const";

const ColorPallet = (props: any) => {
    const [colors, setColors] = useState(COLORS());
    return (
        <div className="toolbar__colorPallet">
            <div className="colorPallet__colors">
                {colors.map((color: string) => (
                    <ColorPalletItem color={color} SetColor={props.SetColor} />
                ))}
            </div>
            <div className="colorPallet__chosenColor">
                <input
                    type="number"
                    className="colorPallet__chosenColor--rgb"
                    style={{borderBottom: `5px solid red`}}
                    value={225}
                />
                <input
                    type="number"
                    className="colorPallet__chosenColor--rgb"
                    style={{borderBottom: `5px solid green`}}
                    value={255}
                />
                <input
                    type="number"
                    className="colorPallet__chosenColor--rgb"
                    style={{borderBottom: `5px solid blue`}}
                    value={111}
                    onChange={() => {}}
                />
                <input
                    type="text"
                    className="colorPallet__chosenColor--hex"
                    style={{borderBottom: `5px solid ${props.chosenColor}`}}
                    value={props.chosenColor}
                />
            </div>
        </div>
    );
};

export default ColorPallet;
