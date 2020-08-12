import File from "../../models/File";
import Snake from "./snake/snake.component";
import FileExplorer from "./FileExplorer/FileExplorer.component";
import PhotoDisplay from "./PhotoDisplay/PhotoDisplay";
import Explorer from "./Browser/Explorer";

import logo192 from "../../media/logo192.png";
import chrome from "../../media/chrome.png";
import windrive from "../../media/windrive.png";
import foldericon from "../../media/folder.png";

const GetFileComponentById = (id: number): any => {
    switch (id) {
        case 1:
            return {
                component: FileExplorer,
                iconsrc: foldericon,
                extension: ".fld",
            };
        case 2:
            return { component: Snake, iconsrc: logo192, extension: ".exe" };
        case 3:
            return {
                component: PhotoDisplay,
                iconsrc: logo192,
                extension: ".img",
            };
        case 4:
            return { component: Explorer, iconsrc: logo192, extension: ".exe" };
    }
};

export default GetFileComponentById;
