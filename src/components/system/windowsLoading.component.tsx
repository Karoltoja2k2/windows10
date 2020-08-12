import React, { useEffect, useState } from "react";
import "./windowsLoading.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { LoadFiles } from "../../actions/driveActions";
import File from "../../models/File";
import Desktop from "../desktop/Desktop.component";

const SystemInitializer = (props: any) => {
    const dispatch = useDispatch();
    const drive: File[] = useSelector(
        (state: RootState) => state.driveReducer
    );

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(LoadFiles());
    }, []);

    useEffect(() => {
        if (drive.length > 0) {
            setLoading(false);
        }
    }, [drive]);

    if (loading) {
        return (
            <div className="background">
                <div className="background__logo">LOADING</div>
            </div>
        );
    } else {
        return <Desktop />;
    }
};

export default SystemInitializer;
