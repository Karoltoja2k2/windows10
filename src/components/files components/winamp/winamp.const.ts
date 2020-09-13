import { Dictionary } from "@reduxjs/toolkit";
import File from "../../../models/File";

export default function InitialState(
    audioFiles: File[],
    file: File
): WinampState {
    let counter = 0;
    let albums: Album[] = [];
    let songs = audioFiles.map((song: File) => {
        let albumId = song.content.albumId;
        if (albums[albumId] == undefined) {
            albums = [
                ...albums,
                {
                    id: albumId,
                    title: song.content.album,
                    artist: song.content.artist,
                    cover: song.content.cover,
                    songs: [],
                },
            ];
        }

        counter++;
        albums[albumId].songs.push({
            id: counter,
            fileId: song.fileId,
            source: song.content.source,
            title: song.content.title,
            artist: song.content.artist,
            album: song.content.album,
        });

    });

    let chosenAlbum = albums[0];
    let song = chosenAlbum.songs[0];

    if (file.content?.source) {
        chosenAlbum = albums[file.content.albumId]!;
        song = chosenAlbum.songs.find(x => x.title === file.content.title)!
    }

    return {
        isPlaying: false,
        albums: albums,
        chosenSong: song,
        chosenAlbum: chosenAlbum,
        currentTime: 0,
        volume: 1,
    };
}

export enum Action {
    Backward = -1,
    Forward = 1,
}

export interface Song {
    id: number;
    fileId: number;
    source: string;
    title: string;
    album: string;
    artist: string;
}

export interface Album {
    id: number;
    title: string;
    artist: string;
    cover: string;
    songs: Song[];
}

export interface WinampState {
    isPlaying: Boolean;
    albums: Album[];
    chosenSong: Song;
    chosenAlbum: Album;
    currentTime: number;
    volume: number;
}
