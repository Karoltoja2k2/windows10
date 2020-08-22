// Components
import FileExplorer from "../components/files components/FileExplorer/FileExplorer.component";
import PhotoDisplay from "../components/files components/PhotoDisplay/PhotoDisplay";
import Explorer from "../components/files components/Browser/Explorer";
import Snake from "../components/files components/snake/snake.component";

// Images
import winxpbg from "../media/winxpbg.jpg";
import lenna from "../media/lenna.jpg";
import xd from "../media/xd.png";

// Icons
import logo192 from "../media/logo192.png";
import chrome from "../media/chrome.png";
import windrive from "../media/windrive.png";
import foldericon from "../media/folder.png";

import File from "../models/File";
import FileDto from "./FileDto";
import { FileRegistry } from "../components/system/FilesRegistry";

const FilesDto: FileDto[] = [];
let id: number = 0;

const driveC: FileDto = {
    fileId: id++,
    path: "Device/",
    title: "Drive C",
    componentId: FileRegistry.FileExlorer,
};

const desktop: FileDto = {
    fileId: id++,
    path: "Drive C:/",
    title: "Desktop",
    componentId: FileRegistry.FileExlorer,
    prevFolderId: driveC.fileId,
};

const lennaimg: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "Lenna",
    componentId: FileRegistry.PhotoDisplay,
    prevFolderId: desktop.fileId,
    content: {
        source: lenna,
    },
};

const paint: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "Paint",
    componentId: FileRegistry.Paint,
    prevFolderId: desktop.fileId,
};

const snake: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "Snake",
    componentId: FileRegistry.Snake,
    prevFolderId: desktop.fileId,
};

const mineswepper: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "Mineswepper",
    componentId: FileRegistry.Mineswepper,
    prevFolderId: desktop.fileId,
};

const resume: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "Resume",
    componentId: FileRegistry.Browser,
    prevFolderId: desktop.fileId,
};

const winimg: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "Windows bggggggggggggggggggggggggggggggggggggggg",
    componentId: FileRegistry.PhotoDisplay,
    prevFolderId: desktop.fileId,
    content: {
        source: winxpbg,
    },
};

const testfolder: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "Test folder",
    componentId: FileRegistry.FileExlorer,
    prevFolderId: desktop.fileId,
};

const testfolder2: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/Test folder/",
    title: "Test folder in folder",
    componentId: FileRegistry.FileExlorer,
    prevFolderId: testfolder.fileId,
};

FilesDto.push(
    driveC,
    desktop,
    mineswepper,
    resume,
    lennaimg,
    paint,
    snake,
    winimg,
    testfolder,
    testfolder2
);

export default FilesDto;
