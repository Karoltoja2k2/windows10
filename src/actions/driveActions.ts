import CreateFileDto from "../models/CreateFileDto";
import File from "../models/File";
import GetFileComponentById from "../components/files components/FilesRegistry";

export const DeleteFile = (fileToDelete: File) => {
    return {
        type: "DELETE",
        payload: { fileToDelete },
    };
};

export const CreateFile = (fileDto: CreateFileDto) => {
    let data = GetFileComponentById(fileDto.componentId);
    var newFile: File = {
        fileId: 0,
        path: fileDto.path,
        component: data.component,
        extension: data.extension,
        title: fileDto.title,
        iconsrc: data.iconsrc,
        prevFolder: fileDto.prevFolder,
        content: data.content,
    };
    return {
        type: "CREATE",
        payload: newFile,
    };
};

export const LoadFiles = () => {
    return {
        type: "LOAD",
    };
};
