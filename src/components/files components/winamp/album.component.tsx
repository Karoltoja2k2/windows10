import React from "react";
import ControlBar from "./controlBar.component";
import { Song } from "./winamp.const";

import "./album.scss";

function Album(props: any) {
    return (
        <div className="container__album" onClick={() => props.TriggerMenu(false)}>
            <img
                className="album__bg"
                src={props.chosenAlbum.cover.src}
                alt="cdcover"
            />
            <div className="album__tracks scrollbar--light">
                <div className="tracks__album">
                    {`${props.chosenSong.artist} - ${props.chosenSong.album}`}
                </div>
                {props.chosenAlbum.songs.map((song: Song, index: number) => (
                    <div
                        className={`tracks__item ${
                            song.id === props.chosenSong.id
                                ? "tracks__item--playing"
                                : ""
                        }`}
                        key={index}
                        onClick={() => {
                            props.ChangeSong(song)
                        }}
                    >
                        <label>{song.title}</label>
                    </div>
                ))}
            </div>
            <ControlBar {...props} />
        </div>
    );
}

export default Album;
