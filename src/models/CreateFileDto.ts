import File from "./File";

interface CreateFileDto {
    path: string;
    title: string;
    componentId: number;
    prevFolderId?: number;
    content?: any;
}

export default CreateFileDto;
