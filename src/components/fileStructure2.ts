// Components
import FileExplorer from "./FileExplorer";
import PhotoDisplay from "./PhotoDisplay";
import Explorer from "./Explorer";

// Images
import winxpbg from "../media/winxpbg.jpg";
import lenna from "../media/lenna.jpg";
import xd from "../media/xd.png";

// Icons
import logo192 from "../media/logo192.png";
import chrome from "../media/chrome.png";
import windrive from "../media/windrive.png";
import foldericon from "../media/folder.png";

import File from "./File";

const files2: File[] = [];
let id: number = -1;

const driveC: File = {
	fileId: id++,
	path: "Device/",
	component: FileExplorer,
	extension: ".fld",
	title: "Drive C:",
	iconsrc: windrive,
};

const driveD: File = {
	fileId: id++,
	path: "Device/",
	component: FileExplorer,
	extension: ".fld",
	title: "Drive D:",
	iconsrc: windrive,
};

const desktop: File = {
	fileId: id++,
	path: "Drive C:/",
	component: FileExplorer,
	extension: ".fld",
	title: "Desktop",
	iconsrc: foldericon,
};

const lennaimg: File = {
	fileId: id++,
	path: "Drive C:/Desktop/",
	component: PhotoDisplay,
	extension: ".img",
	title: "Lenna",
	iconsrc: lenna,

	prevFolder: desktop,
	content: {
		source: lenna,
	},
};

const winimg: File = {
	fileId: id++,
	path: "Drive C:/Desktop/",
	component: PhotoDisplay,
	extension: ".img",
	title: "Windows bg",
	iconsrc: winxpbg,

	prevFolder: desktop,
	content: {
		source: winxpbg,
	},
};

const testfolder: File = {
	fileId: id++,
	path: "Drive C:/Desktop/",
	component: FileExplorer,
	extension: ".fld",
	title: "Test folder",
	iconsrc: foldericon,

	prevFolder: desktop,
};

const testfolder2: File = {
	fileId: id++,
	path: "Drive C:/Desktop/Test folder",
	component: FileExplorer,
	extension: ".fld",
	title: "Test folder in folder",
	iconsrc: foldericon,

	prevFolder: testfolder,
};

const testfolder3: File = {
	fileId: id++,
	path: "Drive C:/Desktop/",
	component: FileExplorer,
	extension: ".fld",
	title: "Test folder3",
	iconsrc: foldericon,

	prevFolder: desktop,
};

const testfolder4: File = {
	fileId: id++,
	path: "Drive C:/Desktop/",
	component: FileExplorer,
	extension: ".fld",
	title: "Test folder4",
	iconsrc: foldericon,

	prevFolder: desktop,
};

const testfolder5: File = {
	fileId: id++,
	path: "Drive C:/Desktop/",
	component: FileExplorer,
	extension: ".fld",
	title: "Test folder5",
	iconsrc: foldericon,

	prevFolder: desktop,
};

const testfolder6: File = {
	fileId: id++,
	path: "Drive C:/Desktop/",
	component: FileExplorer,
	extension: ".fld",
	title: "Test folder6",
	iconsrc: foldericon,

	prevFolder: desktop,
};

const nestedfoldertest: File = {
	fileId: id++,
	path: "Drive C:/Desktop/Test folder",
	component: FileExplorer,
	extension: ".fld",
	title:
		"NESTED FOLDER NESTED FOLDER NESTED FOLDER NESTED FOLDER NESTED FOLDER",
	iconsrc: foldericon,

	prevFolder: testfolder2,
};

files2.push(
	driveC,
	driveD,
	desktop,
	lennaimg,
	winimg,
	testfolder,
	testfolder2,
	nestedfoldertest,
	testfolder3,
	testfolder4,
	testfolder5,
	testfolder6
);

export default files2;
