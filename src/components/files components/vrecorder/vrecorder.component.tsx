import React, { useState } from "react";
import WindowBase from "../../common/windowBase/WindowBase";

import "./vrecorder.scss";

import img from "../../../media/images/covers/europa.jpg";

function Vrecorder(props: any) {
    return (
        <WindowBase
            id={props.id}
            file={{ ...props.file, title: "Winamp" }}
            properties={{ ...props.properties, minWidth: 500, minHeight: 300 }}
            mobileMode={props.mobileMode}
        >
            <div className="vrecorder">
                <a href="" download={img} className="vrecorder__download">
                    DOWNLOAD
                </a>
            </div>
            
        </WindowBase>
    );
}

export default React.memo(Vrecorder);
