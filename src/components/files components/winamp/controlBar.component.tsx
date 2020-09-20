import React from "react";
import { Action } from "./winamp.const";

import "./controlBar.scss";
import { MoonLoader, ScaleLoader } from "react-spinners";

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

    function RenderPlayBtn() {
        return props.isLoading ? (
            <div className="top__item">
                <ScaleLoader color="white" height={15} width={2} margin={1} />
            </div>
        ) : (
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
        );
    }

    return (
        <div
            className="controlBar"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div className="controlBar__controls">
                <div className="controls__top">
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
                    {RenderPlayBtn()}
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
        </div>
    );
}

export default ControlBar;
