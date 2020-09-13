import React from "react";
import ControlBar from "./controlBar.component";
import { Song } from "./winamp.const";

import "./album.scss";

function Album(props: any) {
    console.log(props);
    return (
        <div className="container__content">
            <img
                className="content__bg"
                src={props.chosenAlbum.cover}
                alt="cdcover"
            />
            <div className="content__tracks scrollbar--light">
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
