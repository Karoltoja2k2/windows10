import React, { useState, useEffect } from "react";
import "./toolbarTools.scss"
import ColorPalletItem from "./colorPalletItem.component";
import { COLORS } from "../../const";
import { HexToRGB } from "../../../../common/calculators/colors.calculator";

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
                        <ColorPalletItem
                            color={color}
                            SetColor={props.SetColor}
                        />
                    ))}
                </div>
                <div className="colorPallet__chosenColor">
                    <input
                        type="text"
                        className="colorPallet__chosenColor--rgb"
                        style={{
                            borderBottom: `5px solid red`,
                        }}
                        value={color.rgb!.R}
                    />
                    <input
                        type="text"
                        className="colorPallet__chosenColor--rgb"
                        style={{
                            borderBottom: `5px solid green`,
                        }}
                        value={color.rgb!.G}
                    />
                    <input
                        type="text"
                        className="colorPallet__chosenColor--rgb"
                        style={{
                            borderBottom: `5px solid blue`,
                        }}
                        value={color.rgb!.B}
                    />
                    <input
                        type="text"
                        className="colorPallet__chosenColor--hex"
                        style={{
                            borderBottom: `5px solid ${props.chosenColor}`,
                        }}
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
