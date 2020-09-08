import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import FileRegistry from "../../system/FileRegistry";
import { FinishCloseWindow } from "../../../actions/windowsActions";
import File from "../../../models/File";
import InitialState, { WinampState, Action, Song } from "./winamp.const";

function WinampApp(props: any) {
    const dispatch = useDispatch();
    const drive: File[] = useSelector((state: RootState) => state.driveReducer);
    const [state, setState] = useState<WinampState>(
        InitialState(
            drive.filter((x) => x.componentId === FileRegistry.Audio),
            props.file
        )
    );

    useEffect(() => {
        if (props.isClosed) {
            if (!state.audio.paused) {
                state.audio.pause();
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
            ChangeSong(newSong)
        }
    }

    function ChangeSong(newSong: Song){
        let audio = state.audio;
        audio.src = newSong.source;
        audio.play();
        setState({ ...state, chosenSong: newSong, audio: audio });
    }

    function SetSongTime(e: React.ChangeEvent<HTMLInputElement>) {
        let audio = state.audio;
        audio.currentTime = parseInt(e.target.value);
        setState({
            ...state,
            audio: audio,
        });
    }

    function TogglePlay() {
        let audio = state.audio;
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
    return (
        <div className="winamp">
            <div className="winamp__controls">
                <div
                    className="controls__item"
                    onClick={() => {
                        SkipSong(Action.Backward);
                    }}
                >
                    back
                </div>
                <div
                    className="controls__item"
                    onClick={() => {
                        TogglePlay();
                    }}
                >
                    stop/play
                </div>

                <input
                    type="range"
                    min={0}
                    onChange={(e) => {
                        SetSongTime(e);
                    }}
                    max={state.audio.duration == NaN ? 0 : state.audio.duration}
                    value={state.audio.currentTime}
                ></input>

                <div
                    className="controls__item"
                    onClick={() => {
                        SkipSong(Action.Forward);
                    }}
                >
                    next
                </div>
                <img src={state.chosenSong.cover} style={{width: 100, height: 100}}/>
                <label htmlFor="" className="">{state.chosenSong.title}</label>

                {state.songs.map((song) => 
                    <button onClick={() => {ChangeSong(song)}}>{song.title}</button>
                )}
            </div>
        </div>
    );
}

export default React.memo(WinampApp, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed
    );
});
