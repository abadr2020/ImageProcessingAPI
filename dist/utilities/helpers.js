"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImg = exports.isThumbExist = exports.isfullImgExist = exports.getFullPath = exports.getThumbPath = exports.fullImgs = void 0;
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const fsPromises = fs_1.default.promises;
const fullImgPath = './assets/full/';
const thumbImgPath = './assets/thumb/';
exports.fullImgs = readFullImgs(fullImgPath);
let thumbImgs = readThumbImgs(thumbImgPath);
function getThumbPath(imgName, imgHeight, imgWidth) {
    return `${thumbImgPath}${imgName}_${imgWidth}_${imgHeight}.jpg`;
}
exports.getThumbPath = getThumbPath;
function getFullPath(imgName) {
    return `${fullImgPath}${imgName}.jpg`;
}
exports.getFullPath = getFullPath;
function isfullImgExist(imgName) {
    return __awaiter(this, void 0, void 0, function* () {
        let isfullImgExist = false;
        exports.fullImgs = readFullImgs(fullImgPath);
        (yield exports.fullImgs).find((i) => i == imgName) ? (isfullImgExist = true) : (isfullImgExist = false);
        return isfullImgExist;
    });
}
exports.isfullImgExist = isfullImgExist;
function isThumbExist(imgName, imgHeight, imgWidth) {
    return __awaiter(this, void 0, void 0, function* () {
        let isThumbExist = false;
        thumbImgs = readThumbImgs(thumbImgPath);
        (yield thumbImgs).find((ti) => ti.imgName == imgName && ti.imgHeight == imgHeight && ti.imgWidth == imgWidth)
            ? (isThumbExist = true)
            : (isThumbExist = false);
        return isThumbExist;
    });
}
exports.isThumbExist = isThumbExist;
function resizeImg(filename, height, width) {
    return __awaiter(this, void 0, void 0, function* () {
        const resizedImgPath = `${thumbImgPath}${filename}_${width}_${height}.jpg`;
        if (!(yield isThumbExist(filename, height, width))) {
            let thumbDirExist = false;
            if (!(yield checkDirExist(thumbImgPath))) {
                thumbDirExist = yield createDir(thumbImgPath);
            }
            else {
                thumbDirExist = true;
            }
            if (thumbDirExist) {
                try {
                    yield (0, sharp_1.default)(fullImgPath + filename + '.jpg')
                        .resize(parseInt(width), parseInt(height))
                        .toFormat('jpg')
                        .toFile(resizedImgPath);
                }
                catch (err) {
                    console.log('Error ocurred in sharp with error: ' + err);
                }
            }
        }
        return resizedImgPath;
    });
}
exports.resizeImg = resizeImg;
function checkDirExist(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        let isDirExist = false;
        try {
            yield fsPromises.access(dir);
            isDirExist = true;
        }
        catch (err) {
            console.error('Directory doesnt exist.');
            isDirExist = false;
        }
        return isDirExist;
    });
}
function createDir(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        let dirCreated = false;
        try {
            yield fsPromises.mkdir(dir);
            dirCreated = true;
        }
        catch (err) {
            console.error('Error creating directory.');
            dirCreated = false;
        }
        return dirCreated;
    });
}
function readFullImgs(fullImgPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const fImgs = [];
        try {
            yield fsPromises.access(fullImgPath);
            const files = yield fsPromises.readdir(fullImgPath);
            files.forEach((f) => {
                fImgs.push(f.split('.')[0]);
            });
        }
        catch (err) {
            console.error('Error occured in readFullImgs!');
        }
        return fImgs;
    });
}
function readThumbImgs(thumbImgPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const thumImgs = [];
        try {
            yield fsPromises.access(thumbImgPath);
            const files = yield fsPromises.readdir(thumbImgPath);
            files.forEach((f) => {
                const fname = f.split('.')[0];
                thumImgs.push({
                    imgName: fname.split('_')[0],
                    imgWidth: fname.split('_')[1],
                    imgHeight: fname.split('_')[2],
                });
            });
        }
        catch (err) {
            console.error('Error occured in readThumbImgs!');
        }
        return thumImgs;
    });
}
