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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const path_1 = require("path");
const helpers_1 = require("../../../utilities/helpers");
const images = express_1.default.Router();
images.use(express_1.default.json());
images.get('/', [
    (0, express_validator_1.query)('filename').optional().isString(),
    (0, express_validator_1.query)('width').optional().isInt({ min: 0 }).withMessage('Width should be positive number!'),
    (0, express_validator_1.query)('height').optional().isInt({ min: 0 }).withMessage('Height should be positive number!'),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    else {
        const filename = (_a = req.query.filename) === null || _a === void 0 ? void 0 : _a.toString().trim();
        let height = (_b = req.query.height) === null || _b === void 0 ? void 0 : _b.toString().trim();
        let width = (_c = req.query.width) === null || _c === void 0 ? void 0 : _c.toString().trim();
        if (!filename) {
            res.status(200).send('Available Images: (' + helpers_1.fullImgs + ') Please input one of them');
        }
        else if (!width && !height) {
            // Serve Full image
            if (yield (0, helpers_1.isfullImgExist)(filename)) {
                res.status(200).sendFile((0, path_1.resolve)((0, helpers_1.getFullPath)(filename)));
            }
            else {
                res.status(404).json('No such filename.');
            }
        }
        else {
            if (!width && height) {
                width = height;
            }
            else if (!height && width) {
                height = width;
            }
            if (yield (0, helpers_1.isfullImgExist)(filename)) {
                if (yield (0, helpers_1.isThumbExist)(filename, height, width)) {
                    res.status(200).sendFile((0, path_1.resolve)((0, helpers_1.getThumbPath)(filename, height, width)));
                }
                else {
                    const result = yield (0, helpers_1.resizeImg)(filename, height, width);
                    if (result != '') {
                        res.status(200).sendFile((0, path_1.resolve)(result));
                    }
                    else {
                        res.status(500).json('Something Went Wrong !!');
                    }
                }
            }
            else {
                res.status(404).json('No such filename.');
            }
        }
    }
}));
exports.default = images;
