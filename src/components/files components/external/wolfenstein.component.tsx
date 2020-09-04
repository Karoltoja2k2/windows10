import React, { useState, useEffect } from "react";
import "./iframeBase.scss";
import WindowBase from "../../common/windowBase/WindowBase";

const sound = require("../../../media/testsong.mp3")

const Wolfenstein = (props: any) => {
    const [state, setState] = useState({
        openTabs: [],
    });
    useEffect(() => {
        var audio = new Audio(sound);
        audio.play();
    }, []);

    return (
        <WindowBase
            id={props.id}
            file={props.file}
            properties={props.properties}
            mobileMode={props.mobileMode}
        >
            <div className="container">
                <iframe src="https://loadx.github.io/html5-wolfenstein3D/" />
            </div>
        </WindowBase>
    );
};

export default React.memo(Wolfenstein, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
