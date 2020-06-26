interface File {
    fileId: number
    path: string
    component: any
    extension: string
    title: string
    iconsrc: string

    prevFolder?: File
    content?: {}
}

export default File;