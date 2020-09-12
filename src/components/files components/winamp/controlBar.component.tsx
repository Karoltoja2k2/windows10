import React from "react";
import { Action } from "./winamp.const";

import './controlBar.scss'

function ControlBar(props: any) {
    function SetSongTime(e: React.ChangeEvent<HTMLInputElement>) {
        let audio = props.audioRef.current!;
        audio.currentTime = parseInt(e.target.value);
    }

    function TogglePlay() {
        let audio = props.audioRef.current!;
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
    return (
        <div className="controlBar">
            <div className="controlBar__section--left">
                <p>{props.chosenSong.artist}</p>
                <p>{props.chosenSong.title}</p>
            </div>
            <div className="controlBar__section--middle">
                <div className="section__top">
                    <div
                        className="controls__item"
                        onClick={() => {
                            props.SkipSong(Action.Backward);
                        }}
                    ></div>
                    <div
                        className="controls__item"
                        onClick={() => {
                            TogglePlay();
                        }}
                    ></div>
                    <div
                        className="controls__item"
                        onClick={() => {
                            props.SkipSong(Action.Forward);
                        }}
                    ></div>
                </div>
                <div className="section__bottom">
                    <input
                        type="range"
                        min={0}
                        onChange={(e) => {
                            SetSongTime(e);
                        }}
                        max={
                            props.audioRef.current?.duration === null
                                ? 0
                                : props.audioRef.current?.duration
                        }
                        value={props.currentTime}
                    ></input>
                </div>
            </div>
            <div className="controlBar__section--right">
                <div className="controls__item"></div>
            </div>
        </div>
    );
}

export default ControlBar;
