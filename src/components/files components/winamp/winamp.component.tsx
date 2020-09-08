import React, { useEffect, useState } from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import "./winamp.scss";
import { useDispatch, useSelector } from "react-redux";
import { FinishCloseWindow } from "../../../actions/windowsActions";
import { RootState } from "../../../reducers";
import File from "../../../models/File";
import FileRegistry from "../../system/FileRegistry";

enum Action {
    Backward = -1,
    Forward = 1,
}

interface Song {
    id: number;
    cover: string;
    audio: HTMLAudioElement;
}

interface WinampState {
    isPlaying: Boolean;
    songs: Song[];
    chosenSong: Song;
}

// const lancuch1 = require("../../../media/audio/songs/")

function Winamp(props: any) {
    const dispatch = useDispatch();
    const drive: File[] = useSelector((state: RootState) => state.driveReducer);

    useEffect(() => {
        const songurls = drive.filter(
            (x) => x.componentId === FileRegistry.Audio
        );

        let counter = 0;

        let songs = songurls.map((song: File) => {
            counter++;
            return {
                id: counter,
                cover: song.content.cover,
                audio: new Audio(song.content.source),
            };
        });
        setState({
            ...state,
            songs: [...songs],
            chosenSong: songs[0],
        });
    }, []);

    function GetSongs(): Song[] {
        const songurls = drive.filter(
            (x) => x.componentId === FileRegistry.Audio
        );

        let counter = 0;

        let songs = songurls.map((song: File) => {
            counter++;
            return {
                id: counter,
                cover: song.content.cover,
                audio: new Audio(song.content.source),
            };
        });

        return songs;
    }

    useEffect(() => {
        if (props.isClosed) {
            state.chosenSong.audio.pause();
            dispatch(FinishCloseWindow(props.id));
        }
    }, [props.isClosed]);

    const [state, setState] = useState<WinampState>({
        isPlaying: false,
        songs: GetSongs(),
    });

    useEffect(() => {
        if (state.isPlaying) {
            state.chosenSong.audio.play();
        } else {
            state.chosenSong.audio.pause();
        }
    }, [state.isPlaying]);

    useEffect(() => {
        if (state.isPlaying) {
            state.chosenSong.audio.currentTime = 0;
            state.chosenSong.audio.play();
        }
    }, [state.chosenSong]);

    function ChangeSong(action: Action) {
        let newSong = songs.find((x) => x!.id === state.chosenSong.id + action);
        if (!newSong) {
            return;
        }
        console.log(newSong, state.chosenSong);

        state.chosenSong.audio.pause();
        setState({ ...state, chosenSong: newSong });
    }

    return (
        <WindowBase
            id={props.id}
            file={props.file}
            properties={props.properties}
            mobileMode={props.mobileMode}
        >
            <div className="winamp">
                <div className="winamp__controls">
                    <div
                        className="controls__item"
                        onClick={() => {
                            ChangeSong(Action.Backward);
                        }}
                    >
                        back
                    </div>
                    <div
                        className="controls__item"
                        onClick={() => {
                            setState({ ...state, isPlaying: !state.isPlaying });
                        }}
                    >
                        stop/play
                    </div>

                    <div
                        className="controls__item"
                        onClick={() => {
                            ChangeSong(Action.Forward);
                        }}
                    >
                        next
                    </div>
                </div>
            </div>
        </WindowBase>
    );
}

export default React.memo(Winamp, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.file.content?.source === nextProps.file.content?.source &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
