import React, { useEffect, useState } from "react";
import "./windowsLoading.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { LoadFiles } from "../../actions/driveActions";
import File from "../../models/File";
import Monitor from "../desktop/monitor.component";
import WelcomeScreen from "./welcomeScreen.component";
import { MoonLoader } from "react-spinners";

import desktopBgImg from "../../media/winxpbg.jpg";
import welcomeScreenBgImg from "../../media/win10bg.jpg";

let loadedImages = 0
let additionalImgs = {
    loginImg: new Image(),
    desktopImg: new Image(),
    count: 2,
}
additionalImgs.loginImg.src = welcomeScreenBgImg;
additionalImgs.desktopImg.src = desktopBgImg;

let loadStart = Date.now();

const SystemInitializer = (props: any) => {
    const dispatch = useDispatch();
    const drive: File[] = useSelector((state: RootState) => state.driveReducer);

    const [isLoaded, setState] = useState(false);

    useEffect(() => {
        dispatch(LoadFiles());
    }, []);

    useEffect(() => {
        if (drive.length > 0 && !isLoaded) {
            AddHandler(additionalImgs.loginImg);
            AddHandler(additionalImgs.desktopImg);

            drive.forEach((file) => {
                AddHandler(file.icon);
            });
        }
    }, [drive]);

    function HandleImageLoaded() {
        loadedImages += 1;
        if (loadedImages === drive.length + additionalImgs.count) {
            let span = Date.now() - loadStart
            let duration = span < 1000 ? 1000 - span : 0
            setTimeout(() => {
                setState(true);

            }, duration)
        }
    }

    function AddHandler(img: HTMLImageElement) {
        img.complete
            ? HandleImageLoaded()
            : (img.onload = () => {
                  HandleImageLoaded();
              });
    }

    if (isLoaded) {
        // return <WelcomeScreen images={{desktopImg: additionalImgs.desktopImg, loginImg: additionalImgs.loginImg}} />;
        return <Monitor background={additionalImgs.desktopImg}/>;
    } else {
        return (
            <div className="winLoading">
                <div className="winLoading__logo">
                    <i className="fab fa-windows"></i>
                </div>
                <MoonLoader color={"white"} size={25} />
            </div>
        );
    }
};

export default SystemInitializer;
