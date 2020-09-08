interface File {
    fileId: number;
    path: string;
    title: string;
    extension: string;
    componentId: number;
    component: any;
    iconsrc: string;
    prevFolderId?: number;
    content?: any;
}

export default File;
