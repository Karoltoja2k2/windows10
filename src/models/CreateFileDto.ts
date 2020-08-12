import File from "./File";

interface CreateFileDto{
    path: string,
    title: string,
    componentId: number,
    prevFolder? : File,
}

export default CreateFileDto