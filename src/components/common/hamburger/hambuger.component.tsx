import React, { useEffect, useState } from "react";

import "./hamburger.scss";

export interface HamburgerProps {
    isClicked: boolean;
    action: any;

    width?: number;
    height?: number;
    color?: string;
    hoverColor?: string;
    clickedColor?: string;
    thickness?: number;
    gap?: number;
    borderRadius?: number;
}

const defaultProps = {
    width: 25,
    height: 25,
    color: "white",
    hoverColor: "gray",
    clickedColor: "black",
    thickness: 5,
    gap: 5,
    borderRadius: 5,
};

// default
// width: 25px,
// height: 25px,
// color: white,
// hoverColor: gray,
// clickedColor: black,
// thickness: 5px,
// gap: 5px,
// borderRadius: 5px,
function Hamburger(props: HamburgerProps) {
    const [state, setState] = useState({
        isHovered: false,
        hamburgerStyle: {
            width: props.width ? props.width : defaultProps.width,
            height: props.height ? props.height : defaultProps.height,
        },
        lineStyle: {
            backgroundColor: props.color ? props.color : defaultProps.color,
            height: props.thickness ? props.thickness : 5,
            borderRadius: props.borderRadius ? props.borderRadius : 5,
            marginBottom: props.gap ? props.gap : 5,
        },
    });

    function Hover() {
        if (!state.isHovered) {
            let backgroundColor = props.hoverColor
                ? props.hoverColor
                : state.lineStyle.backgroundColor;

            setState({
                ...state,
                isHovered: true,
                lineStyle: {
                    ...state.lineStyle,
                    backgroundColor,
                },
            });
        }
    }

    function HoverOut() {
        let backgroundColor = props.color ? props.color : defaultProps.color;
        if (props.isClicked) {
            backgroundColor = props.clickedColor ? props.clickedColor : defaultProps.clickedColor;
        }

        setState({
            ...state,
            isHovered: false,
            lineStyle: {
                ...state.lineStyle,
                backgroundColor,
            },
        });
    }

    useEffect(() => {
        let backgroundColor = props.color ? props.color : defaultProps.color;
        if (props.isClicked) {
            backgroundColor = props.clickedColor ? props.clickedColor : defaultProps.clickedColor;
        } else {
            backgroundColor = props.color ? props.color : defaultProps.color;
        }

        if (state.isHovered) {
            backgroundColor = props.hoverColor
                ? props.hoverColor
                : backgroundColor;
        }

        setState({
            ...state,
            lineStyle: {
                ...state.lineStyle,
                backgroundColor,
            },
        });
    }, [props.isClicked]);

    return (
        <div
            className={`hamburger`}
            style={state.hamburgerStyle}
            onClick={() => props.action()}
            onMouseOver={() => Hover()}
            onMouseLeave={() => HoverOut()}
        >
            <div className="hamburger__line" style={state.lineStyle}></div>
            <div className="hamburger__line" style={state.lineStyle}></div>
            <div className="hamburger__line" style={state.lineStyle}></div>
        </div>
    );
}

export default Hamburger;
