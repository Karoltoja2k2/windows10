interface File {
    fileId: number;
    path: string;
    title: string;
    extension: string;
    componentId: number;
    component: any;
    iconsrc: string;
    icon: HTMLImageElement;
    prevFolderId?: number;
    content?: any;
}

export default File;
