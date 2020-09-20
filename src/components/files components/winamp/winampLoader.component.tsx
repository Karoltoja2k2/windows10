import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import File from "../../../models/File";
import { RootState } from "../../../reducers";
import FileRegistry from "../../system/FileRegistry";
import { Album, MapSongsToAlbums } from "./winamp.const";
import WinampApp from "./winampApp.component";
import winamplogo from "../../../media/images/winamplogo.png";

import "./winampLoader.scss";
import { BarLoader } from "react-spinners";

function WinampLoader(props: any) {
    const drive: File[] = useSelector((state: RootState) => state.driveReducer);

    const [state, setState] = useState({
        albums: LoadAlbums(),
        isLoaded: false,
    });

    function LoadAlbums() {
        var songs = drive.filter((x) => x.componentId === FileRegistry.Audio);
        let albums = MapSongsToAlbums(songs);

        let loadingStart = Date.now();
        let loadedCovers = 0;
        albums.forEach((album) => {
            album.cover.onload = () => {
                loadedCovers += 1;
                if (loadedCovers === albums.length) {
                    let span = Date.now() - loadingStart;
                    let duration = span < 1000 ? 1000 - span : 0;
                    setTimeout(() => {
                        setState({ ...state, isLoaded: true });
                    }, duration);
                }
            };
        });

        return albums;
    }

    return (
        <div>
            {state.isLoaded && <WinampApp {...props} albums={state.albums} />}
            {!state.isLoaded && (
                <div className="winampLoader">
                    <img
                        src={winamplogo}
                        className="winampLoader__logo"
                        alt=""
                    />
                    <div className="winampLoader__progress">
                        <BarLoader color={"black"} width={"100%"} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default WinampLoader;
