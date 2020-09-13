import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import FileRegistry from "../../system/FileRegistry";
import { FinishCloseWindow } from "../../../actions/windowsActions";
import File from "../../../models/File";
import InitialState, { WinampState, Action, Song } from "./winamp.const";

import winampflowersbg from "../../../media/images/winampflowersbgedited.jpg";
import bgedited from "../../../media/images/bgedited.jpg";
import winampicon from "../../../media/images/winampicon.png";
import ControlBar from "./controlBar.component";
import Menu from "./menu.component";
import Hamburger from "../../common/hamburger/hambuger.component";

import "../../common/scrollbar--light.scss";
import Album from "./album.component";


function WinampApp(props: any) {
    const dispatch = useDispatch();
    const audioRef = useRef<HTMLAudioElement>(null);
    const drive: File[] = useSelector((state: RootState) => state.driveReducer);
    const [state, setState] = useState<WinampState>(
        InitialState(
            drive.filter((x) => x.componentId === FileRegistry.Audio),
            props.file
        )
    );

    console.log(state.albums)

    const [dynamicMenu, setDynamicMenu] = useState({
        isActive: props.width < 700,
        isOpen: false,
    });

    useEffect(() => {
        let isActive = props.width < 700;
        let isOpen = false;

        if (isActive !== dynamicMenu.isActive) {
            setDynamicMenu({ isActive, isOpen });
        }
    }, [props.width]);

    useEffect(() => {
        if (props.isClosed) {
            let audio = audioRef.current!;
            if (!audio.paused) {
                audio.pause();
            }
            console.log("closing");
            dispatch(FinishCloseWindow(props.id));
        }
    }, [props.isClosed]);

    useEffect(() => {
        audioRef.current!.volume = state.volume;
    }, [state.volume]);

    function SkipSong(action: Action) {
        let newSong = state.chosenAlbum.songs.find(
            (x) => x.id === state.chosenSong.id + action
        );
        if (newSong) {
            ChangeSong(newSong);
        }
    }

    function ChangeSong(newSong: Song) {
        setState({ ...state, chosenSong: newSong });
    }

    function SetAlbum(albumId: number){
        let newAlbum = state.albums.find(x => x.id === albumId)!;
        let chosenSong = newAlbum.songs[0]
        setState({...state, chosenAlbum: newAlbum, chosenSong: chosenSong})
    }

    function UpdateTime(e: React.SyntheticEvent<HTMLAudioElement, Event>) {
        setState({ ...state, currentTime: e.currentTarget.currentTime });
    }

    function SetVolume(value: number) {
        setState({ ...state, volume: value });
    }

    function TriggerMenu() {
        setDynamicMenu({
            ...dynamicMenu,
            isOpen: !dynamicMenu.isOpen,
        });
    }

    const controlBarProps = {
        chosenSong: state.chosenSong,
        chosenAlbum: state.chosenAlbum,
        currentTime: state.currentTime,
        volume: state.volume,
        audioRef: audioRef,
        isPlaying: !audioRef.current?.paused,
        SkipSong: SkipSong,
        ChangeSong: ChangeSong,
        SetVolume: SetVolume,
    };

    const menuProps = {
        chosenAlbum: state.chosenAlbum,
        SetAlbum: SetAlbum
    }

    console.log(dynamicMenu);

    return (
        <div className="winamp">
            <audio
                ref={audioRef}
                onTimeUpdate={(e) => {
                    UpdateTime(e);
                }}
                src={state.chosenSong.source}
                onLoadedData={() => audioRef.current!.play()}
                onEnded={() => SkipSong(Action.Forward)}
            ></audio>
            <div className="winamp__container">
                {dynamicMenu.isActive && (
                    <div className="container__logo">
                        <Hamburger
                            isClicked={dynamicMenu.isOpen}
                            action={TriggerMenu}
                            color="white"
                            clickedColor="black"
                            gap={4}
                            width={20}
                            height={30}
                            thickness={3}
                            borderRadius={0}
                        />
                    </div>
                )}

                <Menu
                    isActive={dynamicMenu.isActive}
                    isOpen={dynamicMenu.isOpen}
                    albums={state.albums}
                    {...menuProps}
                />

                <Album {...controlBarProps}/>
            </div>
        </div>
    );
}

export default React.memo(WinampApp, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.width === nextProps.width
    );
});

// export default WinampApp
