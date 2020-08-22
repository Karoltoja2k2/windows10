import File from "../models/File";
import FilesDto from "../data/files";
import FileDto from "../data/FileDto";
import {GetFileComponentById} from "../components/system/FilesRegistry";

const driveReducer = (state: File[] = [], action: any) => {
    switch (action.type) {
        case "LOAD": {
            return FilesDto.map((file: FileDto) => {
                let data = GetFileComponentById(file.componentId);
                return {
                    fileId: file.fileId,
                    path: file.path,
                    title: file.title,
                    extension: data.extension,
                    component: data.component,
                    iconsrc: data.iconsrc,
                    prevFolderId: file.prevFolderId,
                    content: file.content,
                };
            });
        }
        case "CREATE": {
            return [
                ...state,
                {
                    ...action.payload,
                    fileId: Math.max(...state.map((x) => x.fileId)),
                },
            ];
        }
        default: {
            return state;
        }
    }
};

export default driveReducer;
