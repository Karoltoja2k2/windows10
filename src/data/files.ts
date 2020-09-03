// Images
import winxpbg from "../media/winxpbg.jpg";
import lenna from "../media/lenna.jpg";
import xd from "../media/xd.png";
import papa from "../media/yellowman.jpg";
import colorfullPixelsimg from "../media/random-pixels-wallpaper-big.jpg";
import lensimg from "../media/lens.jpg";
import treeimg from "../media/tree.jpg";
import eyeimg from "../media/eye.png";
import asiaimg from "../media/asia.jpg";
import earthimg from "../media/earth.jpg";
import img19 from "../media/19icon.png";

import FileDto from "./FileDto";
import FileRegistry from "../components/system/FileRegistry";

const FilesDto: FileDto[] = [];
let id: number = 1;

// const driveC: FileDto = {
//     fileId: id++,
//     path: "Device/",
//     title: "Drive C",
//     componentId: FileRegistry.FileExlorer,
// };

const desktop: FileDto = {
    fileId: id++,
    path: "Drive C:/",
    title: "Desktop",
    componentId: FileRegistry.Desktop,
    prevFolderId: 2,
};

const thiscomp: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "This computer",
    componentId: FileRegistry.ThisComputer,
    prevFolderId: desktop.fileId,
};

const driveC: FileDto = {
    fileId: id++,
    path: "This computer/",
    title: "Drive C",
    componentId: FileRegistry.Drive,
    prevFolderId: thiscomp.fileId,
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

const hydra: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "Hydra",
    componentId: FileRegistry.Hydra,
    prevFolderId: desktop.fileId,
};

const herakles: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "Herakles",
    componentId: FileRegistry.Herakles,
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
    componentId: FileRegistry.Resume,
    prevFolderId: desktop.fileId,
};

const wolfenstein: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "Wolfenstein 3D",
    componentId: FileRegistry.Wolfenstein,
    prevFolderId: desktop.fileId,
};

const Wallpaper: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "Wallpaper",
    componentId: FileRegistry.PhotoDisplay,
    prevFolderId: desktop.fileId,
    content: {
        source: winxpbg,
    },
};

const imagesFolder: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/",
    title: "More images",
    componentId: FileRegistry.FileExplorer,
    prevFolderId: desktop.fileId,
};

const colorfullPixels: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/More images/",
    title: "Colorfull squares",
    componentId: FileRegistry.PhotoDisplay,
    prevFolderId: imagesFolder.fileId,
    content: {
        source: colorfullPixelsimg,
    },
};

const lens: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/More images/",
    title: "Lens",
    componentId: FileRegistry.PhotoDisplay,
    prevFolderId: imagesFolder.fileId,
    content: {
        source: lensimg,
    },
};

const tree: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/More images/",
    title: "Tree",
    componentId: FileRegistry.PhotoDisplay,
    prevFolderId: imagesFolder.fileId,
    content: {
        source: treeimg,
    },
};

const eye: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/More images/",
    title: "AI eye",
    componentId: FileRegistry.PhotoDisplay,
    prevFolderId: imagesFolder.fileId,
    content: {
        source: eyeimg,
    },
};

const asia: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/More images/",
    title: "Rocks",
    componentId: FileRegistry.PhotoDisplay,
    prevFolderId: imagesFolder.fileId,
    content: {
        source: asiaimg,
    },
};

const earth: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/More images/",
    title: "Handful earth",
    componentId: FileRegistry.PhotoDisplay,
    prevFolderId: imagesFolder.fileId,
    content: {
        source: earthimg,
    },
};

const idontthinkso: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/More images/",
    title: "+18",
    componentId: FileRegistry.FileExplorer,
    prevFolderId: imagesFolder.fileId,
};

const whyuopenthis: FileDto = {
    fileId: id++,
    path: "Drive C:/Desktop/More images/+18",
    title: "115648113331654",
    componentId: FileRegistry.PhotoDisplay,
    prevFolderId: idontthinkso.fileId,
    content: {
        source: img19,
    },
};

FilesDto.push(
    driveC,
    thiscomp,
    desktop,
    mineswepper,
    resume,
    lennaimg,
    paint,
    hydra,
    herakles,
    snake,
    Wallpaper,
    wolfenstein,
    imagesFolder,
    colorfullPixels,
    lens,
    tree,
    eye,
    asia,
    earth,
    idontthinkso,
    whyuopenthis
);

export default FilesDto;
