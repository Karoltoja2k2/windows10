import React from "react";
import { Action } from "./winamp.const";

import "./controlBar.scss";

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
        <div
            className="controlBar"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div className="controlBar__section--left">
                {/* <p>{props.chosenSong.artist}</p>
                <p>{props.chosenSong.title}</p> */}
            </div>
            <div className="controlBar__section--middle">
                <div className="section__top">
                    <div className="top__item top__item--small">
                        <i className="fas fa-random"></i>
                    </div>
                    <div
                        className="top__item top__item--medium"
                        onClick={() => {
                            props.SkipSong(Action.Backward);
                        }}
                    >
                        <i className="fas fa-backward"></i>
                    </div>
                    <div
                        className="top__item"
                        onClick={(e) => {
                            TogglePlay();
                        }}
                    >
                        <i
                            className={`fas ${
                                props.isPlaying ? "fa-pause" : "fa-play-circle"
                            }`}
                        ></i>
                    </div>
                    <div
                        className="top__item top__item--medium"
                        onClick={() => {
                            props.SkipSong(Action.Forward);
                        }}
                    >
                        <i className="fas fa-forward"></i>
                    </div>

                    <div className="top__item top__item--small">
                        <i className="fas fa-redo-alt"></i>
                    </div>
                </div>
                <div className="section__bottom">
                    <input
                        className="slider"
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
                {/* <input className="slider" type="range" value={props.volume} min={0} max={1} step={0.01} onChange={(e) => {
                    console.log(e.target.value)
                    props.SetVolume(e.target.value)
                }}/> */}
            </div>
        </div>
    );
}

export default ControlBar;
