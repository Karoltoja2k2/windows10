import React, { useState, useEffect } from "react";
import "./colorPallet.scss";
import ColorPalletItem from "./colorPalletItem.component";
import { COLORS } from "../const";
import { HexToRGB } from "../../../common/calculators/colors.calculator";

const ColorPallet = (props: any) => {
    const [colors, setColors] = useState(COLORS());
    const [color, setColor] = useState({
        hex: props.chosenColor,
        rgb: HexToRGB(props.chosenColor),
    });
    useEffect(() => {
        setColor({ hex: props.chosenColor, rgb: HexToRGB(props.chosenColor) });
    }, [props.chosenColor]);

    function HandleHexChange(hex: string) {
        if (hex.length > 7 || hex[0] !== "#") {
            return;
        }
        if (hex.length < 7) {
            setColor({ ...color, hex: hex });
        } else {
            props.SetColor(hex);
        }
    }

    return (
        <div className="toolbar__colorPallet">
            <div className="colorPallet__colors">
                {colors.map((color: string) => (
                    <ColorPalletItem color={color} SetColor={props.SetColor} />
                ))}
            </div>
            <div className="colorPallet__chosenColor">
                <label
                    className="colorPallet__chosenColor--rgb"
                    style={{ borderBottom: `5px solid red` }}
                >
                    {color.rgb!.R}
                </label>
                <label
                    className="colorPallet__chosenColor--rgb"
                    style={{ borderBottom: `5px solid green` }}
                >
                    {color.rgb!.G}
                </label>
                <label
                    className="colorPallet__chosenColor--rgb"
                    style={{ borderBottom: `5px solid blue` }}
                >
                    {color.rgb!.B}
                </label>
                <input
                    type="text"
                    className="colorPallet__chosenColor--hex"
                    style={{ borderBottom: `5px solid ${props.chosenColor}` }}
                    value={color.hex}
                    onChange={(e) => {
                        HandleHexChange(e.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default ColorPallet;
