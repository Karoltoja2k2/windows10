import File from "../../../models/File";

export default function InitialState(audioFiles: File[], file:File): WinampState {


    let counter = 0;
    let songs = audioFiles.map((song: File) => {
        counter++;
        return {
            id: counter,
            fileId: song.fileId,
            title: song.title,
            cover: song.content.cover,
            source: song.content.source,
        };
    });

    let song = songs[0];
    if (file.content?.source) {
        song = songs.find((x) => x.fileId === file.fileId)!;
    }

    return {
        isPlaying: false,
        songs: songs,
        chosenSong: song,
        audio: new Audio(song.source),
    };
}

export enum Action {
    Backward = -1,
    Forward = 1,
}

export interface Song {
    id: number;
    fileId: number;
    cover: string;
    source: string;
    title: string;
}

export interface WinampState {
    isPlaying: Boolean;
    songs: Song[];
    chosenSong: Song;
    audio: HTMLAudioElement;
}
