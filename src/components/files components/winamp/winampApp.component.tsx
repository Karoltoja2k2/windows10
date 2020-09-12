import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import FileRegistry from "../../system/FileRegistry";
import { FinishCloseWindow } from "../../../actions/windowsActions";
import File from "../../../models/File";
import InitialState, { WinampState, Action, Song } from "./winamp.const";

import winampflowersbg from "../../../media/images/winampflowersbgedited.jpg";
import bgedited from "../../../media/images/bgedited.jpg";
import winampicon from "../../../media/images/winampicon.png";
import ControlBar from "./controlBar.component";
import Menu from "./menu.component";

function WinampApp(props: any) {
    const dispatch = useDispatch();
    const audioRef = useRef<HTMLAudioElement>(null);
    const drive: File[] = useSelector((state: RootState) => state.driveReducer);
    const [state, setState] = useState<WinampState>(
        InitialState(
            drive.filter((x) => x.componentId === FileRegistry.Audio),
            props.file
        )
    );

    const [style, setStyle] = useState({
        dynamicMenu: props.width > 700,
        isShown: false
    });

    useEffect(() => {
        console.log('asd')
        if (props.width > 700) {
            setStyle({ ...style, dynamicMenu: false });
        } else {
            setStyle({ ...style, dynamicMenu: true });
        }
    }, [props.width]);

    useEffect(() => {
        if (props.isClosed) {
            let audio = audioRef.current!;
            if (!audio.paused) {
                audio.pause();
            }
            console.log("closing");
            dispatch(FinishCloseWindow(props.id));
        }
    }, [props.isClosed]);

    function SkipSong(action: Action) {
        let newSong = state.songs.find(
            (x) => x.id === state.chosenSong.id + action
        );
        if (newSong) {
            ChangeSong(newSong);
        }
    }

    function ChangeSong(newSong: Song) {
        setState({ ...state, chosenSong: newSong });
    }

    function UpdateTime(e: React.SyntheticEvent<HTMLAudioElement, Event>) {
        setState({ ...state, currentTime: e.currentTarget.currentTime });
    }

    const controlBarProps = {
        chosenSong: state.chosenSong,
        currentTime: state.currentTime,
        audioRef: audioRef,
        SkipSong: SkipSong,
        ChangeSong: ChangeSong,
    };

    return (
        <div className="winamp">
            <audio
                ref={audioRef}
                onTimeUpdate={(e) => {
                    UpdateTime(e);
                }}
                src={state.chosenSong.source}
                onLoadedData={() => audioRef.current!.play()}
                onEnded={() => SkipSong(Action.Forward)}
            ></audio>
            <div className="winamp__container">
                {style.dynamicMenu && (
                    <div className="container__logo">
                        <img src={winampicon} alt="" />
                    </div>
                )}

                <Menu dynamicMenu={style.dynamicMenu} />

                <div className="container__content">
                    <img
                        className="content__bg"
                        src={state.chosenSong.cover}
                        alt="cdcover"
                    />
                    <ControlBar {...controlBarProps} />
                </div>
            </div>
        </div>
    );
}

export default React.memo(WinampApp, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.width === nextProps.width
    );
});

// export default WinampApp
