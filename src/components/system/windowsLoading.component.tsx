import React, { useEffect, useState } from "react";
import "./windowsLoading.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { LoadFiles } from "../../actions/driveActions";
import File from "../../models/File";
import Desktop from "../desktop/Desktop.component";
import WelcomeScreen from "./welcomeScreen.component";
import { MoonLoader } from "react-spinners";
import { wait } from "@testing-library/react";

const SystemInitializer = (props: any) => {
    const dispatch = useDispatch();
    const drive: File[] = useSelector((state: RootState) => state.driveReducer);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(LoadFiles());
    }, []);

    useEffect(() => {
        if (drive.length > 0) {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [drive]);

    if (loading) {
        return (
            <div className="winLoading">
                <div className="winLoading__logo">
                    <i className="fab fa-windows"></i>
                </div>
                <MoonLoader color={"white"} size={25} />
            </div>
        );
    } else {
        return <WelcomeScreen />;
    }
};

export default SystemInitializer;
