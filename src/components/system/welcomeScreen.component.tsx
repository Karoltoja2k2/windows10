import React, { useEffect, useState } from "react";
import "./welcomeScreen.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { LoadFiles } from "../../actions/driveActions";
import File from "../../models/File";
import Desktop from "../desktop/Desktop.component";

import win10bg from "../../media/win10bg.jpg";
import guestphoto from "../../media/guestphoto.png";

const WelcomeScreen = (props: any) => {
    const dispatch = useDispatch();
    const drive: File[] = useSelector((state: RootState) => state.driveReducer);

    const [state, setState] = useState({
        isLogged: false,
        chosenProfile: 1,
    });

    const profiles = [
        {
            Id: 1,
            Name: "Guest",
        },
        {
            Id: 2,
            Name: "Cowboy",
        },
    ];

    function Login() {
        if (state.chosenProfile !== 0) {
            setState({ ...state, isLogged: true });
        }
    }

    if (state.isLogged) {
        return <Desktop />;
    }

    return (
        <div className="background">
            <img src={win10bg} alt="" className="" />
            <div className="background__content">
                <div className="content__accounts">
                    {profiles.map((profile: any) => (
                        <AccountIem
                            profile={profile}
                            setState={setState}
                            state={state}
                        />
                    ))}
                </div>
                <div
                    className="content__button"
                    onClick={() => {
                        Login();
                    }}
                >
                    Login
                </div>
            </div>
        </div>
    );
};

const AccountIem = (props: any) => {
    function FocusProfile() {
        let newValue =
            props.state.chosenProfile === props.profile.Id
                ? 0
                : props.profile.Id;
        props.setState({ chosenProfile: newValue });
    }
    return (
        <div
            className={
                props.state.chosenProfile === props.profile.Id
                    ? "accounts__item accounts__item--chosen"
                    : "accounts__item"
            }
            onClick={() => {
                FocusProfile();
            }}
        >
            <div className="item__photo">
                <i className="far fa-user"></i>
            </div>
            <div className="item__label">{props.profile.Name}</div>
        </div>
    );
};

export default WelcomeScreen;
