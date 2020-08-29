import File from "./File";

interface CreateFileDto {
    fileId: number | null;
    path: string;
    title: string;
    componentId: number;
    prevFolderId?: number;
    content?: any;
}

export default CreateFileDto;
