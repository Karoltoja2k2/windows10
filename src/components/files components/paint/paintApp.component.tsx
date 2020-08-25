import React, { useState, useEffect, memo, useRef } from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import Logo from "../../media/win_logo.png";
import PaintContent from "./paintContent.component";
import IMAGE from "../../../media/bg.jpg";
import { Provider } from "react-redux";
import PaintSettings from "./paintSettings.component";

const PaintApp = (props: any) => {
    const imgRef = useRef<HTMLImageElement>(null);
    function HandleImageOnLoad() {
        let img = imgRef.current!;
        setState({
            ...state,
            img:img,
            width: img.width,
            height: img.height,
        });
    }

    const [state, setState] = useState({
        file: props.file,
        threadedFile: props.file.content?.file,
        imgSource: props.file.content?.file.content?.source,
        img: imgRef.current,
        setup:
            props.file.content?.file.content?.source !== undefined
                ? false
                : true,
        width: 600,
        height: 400,
    });
    console.log(state.img)
    return (
        <div className="">
            <PaintContent
                canvasWidth={state.width}
                canvasHeight={state.height}
                img={state.img}
                left={props.left}
                top={props.top}
            />

            {state.setup && <PaintSettings setState={setState} state={state} />}
            {state.imgSource && (
                <img
                    style={{
                        display: "none",
                        position: "absolute",
                    }}
                    src={state.imgSource}
                    ref={imgRef}
                    onLoad={() => {
                        HandleImageOnLoad();
                    }}
                />
            )}
        </div>
    );
};

export default PaintApp;
