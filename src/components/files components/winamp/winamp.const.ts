import File from "../../../models/File";

export default function InitialState(
    audioFiles: File[],
    file: File
): WinampState {
    let counter = 0;
    let songs = audioFiles.map((song: File) => {
        counter++;
        return {
            id: counter,
            fileId: song.fileId,
            cover: song.content.cover,
            source: song.content.source,
            title: song.content.title,
            artist: song.content.artist,
            album: song.content.album,
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
        currentTime: 0,
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
    album: string;
    artist: string;
}

export interface WinampState {
    isPlaying: Boolean;
    songs: Song[];
    chosenSong: Song;
    currentTime: number;
}
