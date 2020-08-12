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
import GetFileComponentById from "../components/files components/FilesRegistry";
import FileDto from "./FileDto";

const FilesDto: FileDto[] = [];
let id: number = 0;

const driveC: FileDto = {
    fileId: id++,
    path: "Device/",
    title: "Drive C",
    extension: ".fld",
    componentId: 1,
};

const desktop: FileDto = {
    fileId: id++,
    path: "Drive C:/",
    title: "Desktop",
    extension: ".fld",
    componentId: 1,
    prevFolderId: driveC.fileId,
};

const lennaimg: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "Lenna",
    extension: ".img",
    componentId: 3,
    prevFolderId: desktop.fileId,
    content: {
        source: lenna,
    },
};

const snake: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "Snake",
    extension: ".exe",
    componentId: 2,
    prevFolderId: desktop.fileId,
};

const browser: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "Resume",
    extension: ".exe",
    componentId: 4,
    prevFolderId: desktop.fileId,
};

const winimg: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "Windows bggggggggggggggggggggggggggggggggggggggg",
    extension: ".img",
    componentId: 3,
    prevFolderId: desktop.fileId,
    content: {
        source: winxpbg,
    },
};

const testfolder: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "Test folder",
    extension: ".fld",
    componentId: 1,
    prevFolderId: desktop.fileId,
};

const testfolder2: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/Test folder/",
    title: "Test folder in folder",
    extension: ".fld",
    componentId: 1,
    prevFolderId: testfolder.fileId,
};

FilesDto.push(
    driveC,
    desktop,
    browser,
    lennaimg,
    snake,
    winimg,
    testfolder,
    testfolder2
);

export default FilesDto;
