interface File {
    fileId: number;
    path: string;
    title: string;
    extension: string;
    componentId: number;
    component: any;
    iconsrc: string;
    prevFolderId?: number;
    content?: {};
}

export default File;
