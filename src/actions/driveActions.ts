import CreateFileDto from "../models/CreateFileDto";
import File from "../models/File";
import { GetFileComponentById } from "../components/system/FilesRegistry";

export const DeleteFile = (fileToDelete: File) => {
    return {
        type: "DELETE",
        payload: { fileToDelete },
    };
};

export const CreateFile = (fileDto: CreateFileDto) => {
    let data = GetFileComponentById(fileDto.componentId);
    var newFile: File = {
        fileId: fileDto.fileId !== null ? fileDto.fileId : 0,
        path: fileDto.path,
        componentId: fileDto.componentId,
        component: data.component,
        extension: data.extension,
        title: fileDto.title,
        iconsrc: data.iconsrc,
        prevFolderId: fileDto.prevFolderId,
        // If new file is .img then this is base64 string
        // in future this should be only url to resource
        content: fileDto.content,
    };
    return {
        type: "CREATE",
        payload: newFile,
    };
};

export const OverwriteContent = (content: any, fileToChangeId: number) => {
    return {
        type: "OVERWRITECONTENT",
        payload: {
            content,
            fileToChangeId,
        },
    };
};

export const LoadFiles = () => {
    return {
        type: "LOAD",
    };
};
