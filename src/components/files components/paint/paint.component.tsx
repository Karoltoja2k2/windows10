import React, { useState, useEffect, memo } from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import Logo from "../../media/win_logo.png";
import PaintContent from "./paintContent.component";
import IMAGE from "../../../media/bg.jpg";
import { Provider } from "react-redux";
import PaintSettings from "./paintSettings.component";
import PaintApp from "./paintApp.component";

const Paint = (props: any) => {
    // console.log(props.file)
    return (
        <WindowBase
            id={props.id}
            file={props.file}
            properties={props.properties}
            mobileMode={props.mobileMode}
        >
            <PaintApp file={props.file} />
        </WindowBase>
    );
};

export default React.memo(Paint, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
