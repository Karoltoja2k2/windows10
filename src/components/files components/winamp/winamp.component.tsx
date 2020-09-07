import React, { useEffect, useState } from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import "./winamp.scss";

const lancuch1 = require("../../../media/audio/songs/01 - Taco Hemingway - Lancuch I Kiosk.mp3");
const tango = require("../../../media/audio/songs/03 - Taco Hemingway - Polskie Tango.mp3");
const szczekoscisk = require("../../../media/audio/songs/11 - Taco Hemingway - Szczekoscisk.mp3");

const songurls = [lancuch1, tango, szczekoscisk];

let counter = 0;
let songs = songurls.map((url) => {
    counter++;
    return {
        id: counter,
        audio: new Audio(url),
    };
});

enum Action {
    Backward = -1,
    Forward = 1,
}

// const lancuch1 = require("../../../media/audio/songs/")

function Winamp(props: any) {
    const [state, setState] = useState({
        isPlaying: false,
        chosenSong: songs[0],
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
        let newSong = songs.find((x) => x.id === state.chosenSong.id + action);
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
