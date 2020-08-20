interface File {
	fileId: number;
	path: string;
	title: string;
	extension: string;
	component: any;
	iconsrc: string;
	prevFolderId?: number;
	content?: {};
}

export default File;
