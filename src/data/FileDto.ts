interface FileDto {
	fileId: number;
	path: string;
	title: string;
	extension: string;
	componentId: number;
	prevFolderId?: number;
	content?: any;
}

export default FileDto;
