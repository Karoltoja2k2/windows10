export const DeleteFile = (fileToDelete: File) => {
    return {
        type: "DELETE",
        payload: { fileToDelete },
    };
};

export const CreateFile = () => {
    return {
        type: "DELETE",
        payload: { },
    };
};
