import React from "react";
import "./startMenuIcon.scss";

const StartMenuIcon = (props: any) => {
    return (
        <button
            className={props.type}
            onClick={() => {
                props.Navigate(props.file);
            }}
        >
            <div className="img__background">
                <img src={props.file.icon.src} />
            </div>
            <label>{props.file.title}</label>
        </button>
    );
};

export default StartMenuIcon;
