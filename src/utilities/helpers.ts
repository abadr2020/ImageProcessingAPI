import fs from 'fs';
import sharp from 'sharp';

// create fspromises object from the file system/ promises module
const fsPromises = fs.promises;
// declare full image path
const fullImgPath = './assets/full/';
// declare thumb path
const thumbImgPath = './assets/thumb/';
// declare thumImg type
type thumbImg = {
    imgName: string;
    imgHeight: string;
    imgWidth: string;
};
// init array of full images available
export let fullImgs = readFullImgs(fullImgPath);
// init array of thumb available
let thumbImgs = readThumbImgs(thumbImgPath);

// returns the relative path of certain thumb image
export function getThumbPath(imgName: string, imgHeight: string, imgWidth: string): string {
    return `${thumbImgPath}${imgName}_${imgWidth}_${imgHeight}.jpg`;
}

// returns the relative path of certain full image
export function getFullPath(imgName: string): string {
    return `${fullImgPath}${imgName}.jpg`;
}

// checks if full image exists in folder with given name
export async function isfullImgExist(imgName: string): Promise<boolean> {
    let isfullImgExist = false;
    fullImgs = readFullImgs(fullImgPath);
    (await fullImgs).find((i) => i == imgName) ? (isfullImgExist = true) : (isfullImgExist = false);
    return isfullImgExist;
}

// checks if thumb image exists in folder with given name, width and heigth
export async function isThumbExist(imgName: string, imgHeight: string, imgWidth: string): Promise<boolean> {
    let isThumbExist = false;
    thumbImgs = readThumbImgs(thumbImgPath);
    (await thumbImgs).find((ti) => ti.imgName == imgName && ti.imgHeight == imgHeight && ti.imgWidth == imgWidth)
        ? (isThumbExist = true)
        : (isThumbExist = false);
    return isThumbExist;
}

// checks if full image exists in folder with given name
export async function resizeImg(filename: string, height: string, width: string): Promise<string> {
    const resizedImgPath = `${thumbImgPath}${filename}_${width}_${height}.jpg`;
    if (!(await isThumbExist(filename, height, width))) {
        let thumbDirExist = false;
        if (!(await checkDirExist(thumbImgPath))) {
            thumbDirExist = await createDir(thumbImgPath);
        } else {
            thumbDirExist = true;
        }
        if (thumbDirExist) {
            try {
                await sharp(fullImgPath + filename + '.jpg')
                    .resize(parseInt(width), parseInt(height))
                    .toFormat('jpg')
                    .toFile(resizedImgPath);
            } catch (err) {
                console.log('Error ocurred in sharp with error: ' + err);
            }
        }
    }
    return resizedImgPath;
}

// check directory exist
async function checkDirExist(dir: string): Promise<boolean> {
    let isDirExist = false;
    try {
        await fsPromises.access(dir);
        isDirExist = true;
    } catch (err) {
        console.error('Directory doesnt exist.');
        isDirExist = false;
    }
    return isDirExist;
}

// create directory
async function createDir(dir: string): Promise<boolean> {
    let dirCreated = false;
    try {
        await fsPromises.mkdir(dir);
        dirCreated = true;
    } catch (err) {
        console.error('Error creating directory.');
        dirCreated = false;
    }
    return dirCreated;
}

// read full images from full images folder
async function readFullImgs(fullImgPath: string): Promise<string[]> {
    const fImgs: string[] = [];
    try {
        await fsPromises.access(fullImgPath);
        const files = await fsPromises.readdir(fullImgPath);
        files.forEach((f) => {
            fImgs.push(f.split('.')[0]);
        });
    } catch (err) {
        console.error('Error occured in readFullImgs!');
    }
    return fImgs;
}

// read thumb images from thumb images folder
async function readThumbImgs(thumbImgPath: string): Promise<thumbImg[]> {
    const thumImgs: thumbImg[] = [];
    try {
        await fsPromises.access(thumbImgPath);
        const files = await fsPromises.readdir(thumbImgPath);
        files.forEach((f) => {
            const fname = f.split('.')[0];
            thumImgs.push({
                imgName: fname.split('_')[0],
                imgWidth: fname.split('_')[1],
                imgHeight: fname.split('_')[2],
            });
        });
    } catch (err) {
        console.error('Error occured in readThumbImgs!');
    }
    return thumImgs;
}
