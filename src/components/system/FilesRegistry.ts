import Snake from "../files components/snake/snake.component";
import FileExplorer from "../files components/FileExplorer/FileExplorer.component";
import PhotoDisplay from "../files components/PhotoDisplay/PhotoDisplay";
import Paint from "../files components/paint/paint.component";
import Mineswepper from "../files components/external/mineswepper.component";
import Hydra from "../files components/hydra/hydra.component";
import Herakles from "../files components/hydra/herakles.component";
import Wolfenstein from "../files components/external/wolfenstein.component";
import Resume from "../files components/external/resume.component";
import Winamp from "../files components/winamp/winamp.component";
import Robby from "../files components/external/robby.component";
import Impersonator from "../files components/external/impersonator.component";
import windows93 from "../files components/external/windows93.component";
import Chrome from "../files components/chrome/chrome.component";
import Vrecorder from "../files components/vrecorder/vrecorder.component";
import Word from "../files components/word/word.component";
import Gravity from "../files components/virus/gravity.component";
import FlatEarth from "../files components/virus/flatEarth.component";
import WannaJump from "../files components/virus/wannaJump.component";
import PETeacher from "../files components/virus/peTeacher.component";

import logo192 from "../../media/logo192.png";
import imgicon from "../../media/imgicon2.png";
import snakeicon from "../../media/snakeicon.png";
import resume from "../../media/resume.png";
import chromeicon from "../../media/images/chromeicon.png";
import foldericon from "../../media/folder.png";
import mineswepperIcon from "../../media/mineswepper.png";
import painticon from "../../media/painticon.png";
import hydraicon from "../../media/hydraicon.png";
import heraklesicon from "../../media/heraklesicon.png";
import wolfensteinicon from "../../media/wolfensteinicon.png";
import thiscomputericon from "../../media/thiscomputericon.png";
import desktopicon from "../../media/desktopicon.png";
import driveicon from "../../media/windrive.png";
import robbyicon from "../../media/robbyicon.png";
import winampicon from "../../media/images/winampicon.png";
import audioicon from "../../media/images/audioicon.png";
import impersonatoricon from "../../media/images/impersonatoricon.png";
import wordicon from "../../media/images/wordicon.png";
import texticon from "../../media/images/texticon.png";
import win10icon from "../../media/images/win10icon.png";
import binicon from "../../media/images/binicon.png";
import gravityicon from "../../media/images/gravityicon.png";
import flatearthicon from "../../media/images/flatearthicon.png";
import wannajumpicon from "../../media/images/wannajumpicon.png";
import tagiconpng from "../../media/images/tagiconpng.png";
import peteachericon from "../../media/images/peteachericon.png";

import FileRegistry from "./FileRegistry";
import Tag from "../files components/virus/tag.component";

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
        case FileRegistry.Winamp:
            return {
                component: Winamp,
                iconsrc: winampicon,
                extension: ".exe",
            };
        case FileRegistry.Robby:
            return {
                component: Robby,
                iconsrc: robbyicon,
                extension: ".exe",
            };
        case FileRegistry.Impersonator:
            return {
                component: Impersonator,
                iconsrc: impersonatoricon,
                extension: ".exe",
            };
        case FileRegistry.Audio:
            return {
                component: Winamp,
                iconsrc: audioicon,
                extension: ".mp3",
            };
        case FileRegistry.Vrecorder:
            return {
                component: Vrecorder,
                iconsrc: logo192,
                extension: ".exe",
            };
        case FileRegistry.Word:
            return {
                component: Word,
                iconsrc: wordicon,
                extension: ".exe",
            };
        case FileRegistry.TextDisplay:
            return {
                component: Word,
                iconsrc: texticon,
                extension: ".txt",
            };
        case FileRegistry.Windows10:
            return {
                component: windows93,
                iconsrc: win10icon,
                extension: ".exe",
            };
        case FileRegistry.RecycleBin:
            return {
                component: FileExplorer,
                iconsrc: binicon,
                extension: ".fld",
            };
        case FileRegistry.Chrome:
            return {
                component: Chrome,
                iconsrc: chromeicon,
                extension: ".fld",
            };
        case FileRegistry.Gravity:
            return {
                component: Gravity,
                iconsrc: gravityicon,
                extension: ".xD",
            };
        case FileRegistry.FlatEarth:
            return {
                component: FlatEarth,
                iconsrc: flatearthicon,
                extension: ".xD",
            };
        case FileRegistry.WannaJump:
            return {
                component: WannaJump,
                iconsrc: wannajumpicon,
                extension: ".xD",
            };
        case FileRegistry.Tag:
            return {
                component: Tag,
                iconsrc: tagiconpng,
                extension: ".xD",
            };
        case FileRegistry.PETeacher:
            return {
                component: PETeacher,
                iconsrc: peteachericon,
                extension: ".xD",
            };
    }
};
