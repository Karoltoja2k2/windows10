import FileExplorer from '../components/FileExplorer'
import PhotoDisplay from '../components/PhotoDisplay'

const files = [
    {
        "path":"Drive:/",
        "contentPath":"Drive:/desktop/",
        component: FileExplorer,
        "title":"desktop",
        "icon-src":"",
        "extension":".fld"
    },
    {
        "path":"Drive:/desktop/",
        "contentPath":"Drive:/desktop/testowe zdjęcie2/",
        component: PhotoDisplay,
        "title":"testowe zdjęcie2",
        "icon-src":"",
        "extension":".img"
    },
    {
        "path":"Drive:/desktop/",
        "contentPath":"Drive:/desktop/folder1/",
        component: FileExplorer,
        "title":"folder1",
        "icon-src":"",
        "extension":".fld"
    },
    {
        "path":"Drive:/desktop/",
        "contentPath":"Drive:/desktop/folder2/",
        component: FileExplorer,
        "title":"folder2",
        "icon-src":"./logo192.png",
        "extension":".fld"
    },
    {
        "path":"Drive:/desktop/",
        "contentPath":"Drive:/desktop/folder3/",
        component: FileExplorer,
        "title":"folder3",
        "icon-src":"",
        "extension":".fld"
    },
    {
        "path":"Drive:/desktop/",
        "contentPath":"Drive:/desktop/folder4/",
        component: FileExplorer,
        "title":"folder4",
        "icon-src":"",
        "extension":".fld"
    },
    {
        "path":"Drive:/desktop/folder1/",
        "contentPath":"Drive:/desktop/testowe zdjęcie/",
        component: PhotoDisplay,
        "title":"testowe zdjęcie",
        "icon-src":"",
        "extension":".img"
    },
    {
        "path":"Drive:/desktop/folder2/",
        "contentPath":"Drive:/desktop/testowe zdjęcie/",
        component: PhotoDisplay,
        "title":"testowe zdjęcie",
        "icon-src":"",
        "extension":".img"
    },
    {
        "path":"Drive:/desktop/folder3/",
        "contentPath":"Drive:/desktop/testowe zdjęcie/",
        component: PhotoDisplay,
        "title":"testowe zdjęcie",
        "icon-src":"",
        "extension":".img"
    },
    {
        "path":"Drive:/desktop/folder1/",
        "contentPath":"Drive:/desktop/folder1/testowe zdjęcie3/",
        component: PhotoDisplay,
        "title":"testowe zdjęcie3",
        "icon-src":"",
        "extension":".img"
    },
    {
        "path":"Drive:/desktop/folder1/",
        "contentPath":"Drive:/desktop/folder1/kolejnyFolder/",
        component: FileExplorer,
        "title":"kolejnyFolder",
        "icon-src":"",
        "extension":".fld"
    },
    {
        "path":"Drive:/desktop/folder1/kolejnyFolder/",
        "contentPath":"Drive:/desktop/folder1/kolejnyFolder/zdjęcie/",
        component: PhotoDisplay,
        "title":"zdjęcie",
        "icon-src":"",
        "extension":".img"
    }
]


export default files;