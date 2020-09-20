import React, { useEffect, useState } from "react";
import "./windowsLoading.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { LoadFiles } from "../../actions/driveActions";
import File from "../../models/File";
import Desktop from "../desktop/Desktop.component";
import WelcomeScreen from "./welcomeScreen.component";
import { MoonLoader } from "react-spinners";

import desktopBgImg from "../../media/winxpbg.jpg";
import welcomeScreenBgImg from "../../media/win10bg.jpg";

const SystemInitializer = (props: any) => {
    const dispatch = useDispatch();
    const drive: File[] = useSelector((state: RootState) => state.driveReducer);

    const [state, setState] = useState({
        isLoaded: false,
        images: {
            desktopImg: new Image(),
            loginImg: new Image(),
        },
    });

    useEffect(() => {
        dispatch(LoadFiles());
    }, []);

    useEffect(() => {
        if (drive.length > 0) {
            state.images.loginImg.src = welcomeScreenBgImg;
            state.images.desktopImg.src = desktopBgImg;
            setState({
                ...state,
                isLoaded: true,
            });
        }
    }, [drive]);

    if (state.isLoaded) {
        // return <WelcomeScreen images={state.images}/>;
        return <Desktop background={state.images.desktopImg}/>;
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
