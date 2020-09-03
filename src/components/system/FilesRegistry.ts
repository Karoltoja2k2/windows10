import File from "../../models/File";

import Snake from "../files components/snake/snake.component";
import FileExplorer from "../files components/FileExplorer/FileExplorer.component";
import PhotoDisplay from "../files components/PhotoDisplay/PhotoDisplay";
import Explorer from "../files components/Browser/Explorer";
import Paint from "../files components/paint/paint.component";
import Mineswepper from "../files components/external/mineswepper.component";
import Hydra from "../files components/hydra/hydra.component";
import Herakles from "../files components/hydra/herakles.component";
import Wolfenstein from "../files components/external/wolfenstein.component";
import Resume from "../files components/external/resume.component";

import logo192 from "../../media/logo192.png";
import imgicon from "../../media/imgicon2.png";
import snakeicon from "../../media/snakeicon.png";
import resume from "../../media/resume.png";
import chrome from "../../media/chrome.png";
import foldericon from "../../media/folder.png";
import mineswepperIcon from "../../media/mineswepper.png";
import painticon from "../../media/painticon.png";
import hydraicon from "../../media/hydraicon.png";
import heraklesicon from "../../media/heraklesicon.png";
import wolfensteinicon from "../../media/wolfensteinicon.png";
import thiscomputericon from "../../media/thiscomputericon.png";
import desktopicon from "../../media/desktopicon.png";
import driveicon from "../../media/windrive.png";

import FileRegistry from "./FileRegistry";
import DesktopIcon from "../common/icons/desktopIcon.component";

export const GetFileComponentById = (id: number): any => {
    switch (id) {
        case FileRegistry.FileExplorer:
            return {
                component: FileExplorer,
                iconsrc: foldericon,
                extension: ".fld",
            };
        case FileRegistry.Snake:
            return { component: Snake, iconsrc: snakeicon, extension: ".exe" };
        case FileRegistry.PhotoDisplay:
            return {
                component: PhotoDisplay,
                iconsrc: imgicon,
                extension: ".img",
            };
        case FileRegistry.Browser:
            return { component: Explorer, iconsrc: resume, extension: ".exe" };
        case FileRegistry.Paint:
            return { component: Paint, iconsrc: painticon, extension: ".exe" };
        case FileRegistry.Mineswepper:
            return {
                component: Mineswepper,
                iconsrc: mineswepperIcon,
                extension: ".exe",
            };
        case FileRegistry.Hydra:
            return {
                component: Hydra,
                iconsrc: hydraicon,
                extension: ".exe",
            };
        case FileRegistry.Herakles:
            return {
                component: Herakles,
                iconsrc: heraklesicon,
                extension: ".exe",
            };
        case FileRegistry.Wolfenstein:
            return {
                component: Wolfenstein,
                iconsrc: wolfensteinicon,
                extension: ".exe",
            };
        case FileRegistry.Resume:
            return {
                component: Resume,
                iconsrc: resume,
                extension: ".exe",
            };
        case FileRegistry.ThisComputer:
            return {
                component: FileExplorer,
                iconsrc: thiscomputericon,
                extension: ".fld",
            };
        case FileRegistry.Desktop:
            return {
                component: FileExplorer,
                iconsrc: desktopicon,
                extension: ".fld",
            };
        case FileRegistry.Drive:
            return {
                component: FileExplorer,
                iconsrc: driveicon,
                extension: ".fld",
            };
    }
};
