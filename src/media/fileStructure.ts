import FileExplorer from '../components/FileExplorer'
import PhotoDisplay from '../components/PhotoDisplay'
import Explorer from '../components/Explorer'


import logo192 from './logo192.png'

const files = [
    {
        path:"Drive:/desktop/",
        contentPath:"Drive:/desktop/mozilla",
        component: Explorer,
        title:"desktop",
        iconsrc:logo192,
        extension:".exe"
    },
    {
        path:"Drive:/",
        contentPath:"Drive:/desktop/",
        component: FileExplorer,
        title:"desktop",
        iconsrc:"logo192",
        extension:".fld"
    },
    {
        path:"Drive:/desktop/",
        contentPath:"Drive:/desktop/testowe zdjęcie2/",
        component: PhotoDisplay,
        title:"testowe zdjęcie2",
        iconsrc:logo192,
        extension:".img"
    },
    {
        path:"Drive:/desktop/",
        contentPath:"Drive:/desktop/folder1/",
        component: FileExplorer,
        title:"folder1",
        iconsrc:logo192,
        extension:".fld"
    },
    {
        path:"Drive:/desktop/",
        contentPath:"Drive:/desktop/folder2/",
        component: FileExplorer,
        title:"folder2",
        iconsrc:logo192,
        extension:".fld"
    },
    {
        path:"Drive:/desktop/",
        contentPath:"Drive:/desktop/folder3/",
        component: FileExplorer,
        title:"folder3",
        iconsrc:logo192,
        extension:".fld"
    },
    {
        path:"Drive:/desktop/",
        contentPath:"Drive:/desktop/folder4/",
        component: FileExplorer,
        title:"folder4",
        iconsrc:logo192,
        extension:".fld"
    },
    {
        path:"Drive:/desktop/folder1/",
        contentPath:"Drive:/desktop/testowe zdjęcie/",
        component: PhotoDisplay,
        title:"testowe zdjęcie",
        iconsrc:logo192,
        extension:".img"
    },
    {
        path:"Drive:/desktop/folder2/",
        contentPath:"Drive:/desktop/testowe zdjęcie/",
        component: PhotoDisplay,
        title:"testowe zdjęcie",
        iconsrc:logo192,
        extension:".img"
    },
    {
        path:"Drive:/desktop/folder3/",
        contentPath:"Drive:/desktop/testowe zdjęcie/",
        component: PhotoDisplay,
        title:"testowe zdjęcie",
        iconsrc:logo192,
        extension:".img"
    },
    {
        path:"Drive:/desktop/folder1/",
        contentPath:"Drive:/desktop/folder1/testowe zdjęcie3/",
        component: PhotoDisplay,
        title:"testowe zdjęcie3",
        iconsrc:logo192,
        extension:".img"
    },
    {
        path:"Drive:/desktop/folder1/",
        contentPath:"Drive:/desktop/folder1/kolejnyFolder/",
        component: FileExplorer,
        title:"kolejnyFolder",
        iconsrc:logo192,
        extension:".fld"
    },
    {
        path:"Drive:/desktop/folder1/kolejnyFolder/",
        contentPath:"Drive:/desktop/folder1/kolejnyFolder/zdjęcie/",
        component: PhotoDisplay,
        title:"zdjęcie",
        iconsrc:logo192,
        extension:".img"
    }
]


export default files;