// Components
import FileExplorer from '../components/FileExplorer'
import PhotoDisplay from '../components/PhotoDisplay'
import Explorer from '../components/Explorer'

// Images
import winxpbg from './winxpbg.jpg'
import lenna from './lenna.jpg'
import xd from './xd.png'

// Icons
import logo192 from './logo192.png'
import chrome from './chrome.png'
import windrive from './windrive.png'
import foldericon from './folder.png'
import { ExecFileSyncOptions } from 'child_process'


interface File{
    path: string
    component: any
    extension: string
    title: string
    iconsrc: string

    prevFolder?: File
    content?:{}
}

const files2: File[] = [] 


const driveC:File = {
    path: 'Device/',
    component: FileExplorer,
    extension: '.fld',
    title: 'Drive C:',
    iconsrc: windrive
}

const driveD:File = {
    path: 'Device/',
    component: FileExplorer,
    extension: '.fld',
    title: 'Drive D:',
    iconsrc: windrive
}


const desktop:File = {
    path: 'Drive C:/',
    component: FileExplorer,
    extension: '.fld',
    title: 'Desktop',
    iconsrc: foldericon,
}

const lennaimg:File = {
    path: 'Drive C:/Desktop/',
    component: PhotoDisplay,
    extension: '.img',
    title: 'Lenna',
    iconsrc: lenna,

    prevFolder: desktop,    
    content:{
        source: lenna
    }
}

const winimg:File = {
    path: 'Drive C:/Desktop/',
    component: PhotoDisplay,
    extension: '.img',
    title: 'Windows bg',
    iconsrc: winxpbg,

    prevFolder:desktop,
    content:{
        source: winxpbg
    }
}

const testfolder:File = {
    path: 'Drive C:/Desktop/',
    component: FileExplorer,
    extension: '.fld',
    title: 'Test folder',
    iconsrc: foldericon,

    prevFolder:desktop,
}

const testfolder2:File = {
    path: 'Drive C:/Desktop/Test folder',
    component: FileExplorer,
    extension: '.fld',
    title: 'Test folder in folder',
    iconsrc: foldericon,

    prevFolder:testfolder
}

files2.push(driveC, driveD, desktop, lennaimg, winimg, testfolder, testfolder2)
