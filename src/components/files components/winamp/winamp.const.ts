import { Dictionary } from "@reduxjs/toolkit";
import File from "../../../models/File";

export default function InitialState(
    albums: Album[],
    file: File
): WinampState {    
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

export function MapSongsToAlbums(audioFiles: File[]){
    let counter = 0;
    let albums: Album[] = [];
    audioFiles.forEach((song: File) => {
        let albumId = song.content.albumId;
        if (albums[albumId] == undefined) {
            let cover = new Image()
            cover.src = song.content.cover
            albums = [
                ...albums,
                {
                    id: albumId,
                    title: song.content.album,
                    artist: song.content.artist,
                    cover: cover,
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

    return albums;
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
    cover: HTMLImageElement;
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
