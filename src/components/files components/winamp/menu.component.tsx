import React, { useEffect, useState } from "react";
import winamplogo from "../../../media/images/winamplogo.png";

import "../../common/scrollbar--dark.scss";
import "./menu.scss";
import { Album, Song } from "./winamp.const";

function Menu(props: any) {
    const [state, setState] = useState({
        isActive: props.isActive,
        isOpen: props.isOpen,
    });

    useEffect(() => {
        setState({
            isActive: props.isActive,
            isOpen: props.isOpen,
        });
    }, [props.isActive, props.isOpen]);

    const classes = `container__menu scrollbar--dark ${
        state.isActive
            ? state.isOpen
                ? "container__menu--open"
                : "container__menu--hidden"
            : ""
    }`;

    return (
        <div className={classes}>
            {!state.isActive && (
                <div className="menu__logo">
                    <img src={winamplogo} alt="winamplogo" />
                </div>
            )}

            <div className="menu__albums">
                {props.albums.map((album: Album, index: number) => (
                    <div
                        className={`albums__item ${
                            props.chosenAlbum.id === album.id
                                ? "albums__item--focused"
                                : ""
                        }`}
                        onClick={() => {
                            props.SetAlbum(album.id);
                        }}
                        key={index}
                    >
                        <img
                            className="album__cover"
                            src={album.cover.src}
                            alt="albumCover"
                        />
                        <div className="album__dsc">
                            <p className="dsc__title">{album.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
