interface File {
	fileId: number;
	path: string;
	title: string;
	extension: string;
	component: any;
	iconsrc: string;
	prevFolder?: File;
	content?: {};
}

export default File;
