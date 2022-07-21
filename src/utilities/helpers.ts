import { Result } from 'express-validator';
import fs from 'fs';
import sharp from 'sharp';

const fsPromises = fs.promises;
const fullImgPath = './assets/full/';
const thumbImgPath = './assets/thumb/';
type thumbImg = {
    imgName: string;
    imgHeight: string;
    imgWidth: string;
};
export let fullImgs = readFullImgs(fullImgPath);
let thumbImgs = readThumbImgs(thumbImgPath);

export function getThumbPath(imgName: string, imgHeight: string, imgWidth: string) {
    return `${thumbImgPath}${imgName}_${imgWidth}_${imgHeight}.jpg`;
}
export function getFullPath(imgName: string) {
    return `${fullImgPath}${imgName}.jpg`;
}
export async function isfullImgExist(imgName: string): Promise<boolean> {
    let isfullImgExist = false;
    fullImgs = readFullImgs(fullImgPath);
    (await fullImgs).find((i) => i == imgName) ? (isfullImgExist = true) : (isfullImgExist = false);
    return isfullImgExist;
}
export async function isThumbExist(imgName: string, imgHeight: string, imgWidth: string): Promise<boolean> {
    let isThumbExist = false;
    thumbImgs = readThumbImgs(thumbImgPath);
    (await thumbImgs).find((ti) => ti.imgName == imgName && ti.imgHeight == imgHeight && ti.imgWidth == imgWidth)
        ? (isThumbExist = true)
        : (isThumbExist = false);
    return isThumbExist;
}
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
async function checkDirExist(dir: string) {
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
async function createDir(dir: string) {
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
