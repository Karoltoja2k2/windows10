import FileExplorer from '../components/FileExplorer'
import PhotoDisplay from '../components/PhotoDisplay'
import Explorer from '../components/Explorer'

import winxpbg from './winxpbg.jpg'
import logo192 from './logo192.png'
import lenna from './lenna.jpg'
import xd from './xd.png'
import chrome from './chrome.png'




const files = [
    {
        path: "Drive:/desktop/",
        contentPath: "Drive:/desktop/mozilla",
        component: Explorer,
        title: "Chrome",
        iconsrc: chrome,
        extension: ".exe"
    },
    {
        path: "Drive:/",
        contentPath: "Drive:/desktop/",
        component: FileExplorer,
        title: "desktop",
        iconsrc: "logo192",
        extension: ".fld"
    },
    {
        path: "Drive:/desktop/",
        contentPath: "Drive:/desktop/lenna/",
        component: PhotoDisplay,
        title: "lenna",
        source: lenna,
        iconsrc: lenna,
        extension: ".img"
    },
    {
        path: "Drive:/desktop/",
        contentPath: "Drive:/desktop/folder1/",
        component: FileExplorer,
        title: "folder1",
        iconsrc: logo192,
        extension: ".fld"
    },
    {
        path: "Drive:/desktop/",
        contentPath: "Drive:/desktop/folder2/",
        component: FileExplorer,
        title: "folder2",
        iconsrc: logo192,
        extension: ".fld"
    },
    {
        path: "Drive:/desktop/",
        contentPath: "Drive:/desktop/folder4/",
        component: FileExplorer,
        title: "folder4",
        iconsrc: logo192,
        extension: ".fld"
    },
    {
        path: "Drive:/desktop/folder1/",
        contentPath: "Drive:/desktop/bg/",
        component: PhotoDisplay,
        title: "bg",
        source: winxpbg,
        iconsrc: winxpbg,
        extension: ".img"
    },
    {
        path: "Drive:/desktop/folder2/",
        contentPath: "Drive:/desktop/bg/",
        component: PhotoDisplay,
        title: "bg",
        source: winxpbg,
        iconsrc: winxpbg,
        extension: ".img"
    },
    {
        path: "Drive:/desktop/folder3/",
        contentPath: "Drive:/desktop/testowe zdjęcie/",
        component: PhotoDisplay,
        title: "testowe zdjęcie",
        iconsrc: logo192,
        extension: ".img"
    },
    {
        path: "Drive:/desktop/folder1/",
        contentPath: "Drive:/desktop/folder1/kolejnyFolder/",
        component: FileExplorer,
        title: "kolejnyFolder",
        iconsrc: logo192,
        extension: ".fld"
    },
    {
        path: "Drive:/desktop/folder1/kolejnyFolder/",
        contentPath: "Drive:/desktop/folder1/kolejnyFolder/xd/",
        component: PhotoDisplay,
        title: "xd",
        source: xd,
        iconsrc: xd,
        extension: ".img"
    }
]


export default files;