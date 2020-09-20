import File from "../models/File";
import FilesDto from "../data/files";
import FileDto from "../data/FileDto";
import { GetFileComponentById } from "../components/system/FilesRegistry";

const driveReducer = (state: File[] = [], action: any) => {
    switch (action.type) {
        case "LOAD": {
            return FilesDto.map((file: FileDto) => {
                let data = GetFileComponentById(file.componentId);
                let icon = new Image()
                icon.src = data.iconsrc
                return {
                    fileId: file.fileId,
                    path: file.path,
                    title: file.title,
                    extension: data.extension,
                    componentId: file.componentId,
                    component: data.component,
                    iconsrc: data.iconsrc,
                    icon: icon,
                    prevFolderId: file.prevFolderId,
                    content: file.content,
                };
            });
        }
        case "CREATE": {
            let file = action.payload;
            let files = state.filter((x) => x.path === file.path);
            let title = file.title;
            let counter = 0;
            while (true) {
                let repetition = files.find((x) => x.title === title);
                if (repetition) {
                    counter++;
                    title = `${file.title} (${counter})`;
                    continue;
                }
                file = {
                    ...file,
                    title: title,
                };
                break;
            }

            return [
                ...state,
                {
                    ...file,
                    fileId: Math.max(...state.map((x) => x.fileId)) + 1,
                },
            ];
        }
        case "OVERWRITECONTENT": {
            return state.map((file: File) =>
                file.fileId === action.payload.fileToChangeId
                    ? {
                          ...file,
                          content: {
                              ...file.content,
                              source: action.payload.content.source,
                          },
                      }
                    : file
            );
        }
        default: {
            return state;
        }
    }
};

export default driveReducer;
