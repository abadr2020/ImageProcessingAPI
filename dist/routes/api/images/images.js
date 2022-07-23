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
// create images object from the router module
const images = express_1.default.Router();
// use express.json for response purposes
images.use(express_1.default.json());
// declare get endpoint on route /api/images
images.get('/', [
    (0, express_validator_1.query)('filename').optional().isString(),
    (0, express_validator_1.query)('width').optional().isInt({ min: 0 }).withMessage('Width should be positive number!'),
    (0, express_validator_1.query)('height').optional().isInt({ min: 0 }).withMessage('Height should be positive number!'),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // validating query stringq
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        // if validation fails, response with array of errors
        res.status(400).json({
            errors: errors.array(),
        });
    }
    else { // case query strings validated successfully
        // declare variables for expected query strings
        const filename = (_a = req.query.filename) === null || _a === void 0 ? void 0 : _a.toString().trim();
        let height = (_b = req.query.height) === null || _b === void 0 ? void 0 : _b.toString().trim();
        let width = (_c = req.query.width) === null || _c === void 0 ? void 0 : _c.toString().trim();
        if (!filename) {
            // filename not provided at all, response with list of images available in library
            res.status(200).send('Available Images: (' + (yield helpers_1.fullImgs) + ') Please input one of them');
        }
        else if (!width && !height) {
            // width and height not provided, serve Full image
            if (yield (0, helpers_1.isfullImgExist)(filename)) { // check filename exist in library
                // filename exist, return image
                res.status(200).sendFile((0, path_1.resolve)((0, helpers_1.getFullPath)(filename)));
            }
            else {
                // filename doesn't exist
                res.status(404).json('No such filename.');
            }
        }
        else {
            if (!width && height) {
                // width not provided, set it to height
                width = height;
            }
            else if (!height && width) {
                // height not provided, set it to width
                height = width;
            }
            if (yield (0, helpers_1.isfullImgExist)(filename)) { // check filename exist in library
                if (yield (0, helpers_1.isThumbExist)(filename, height, width)) { // check thumbnail created before
                    // return with cached thumbnail
                    res.status(200).sendFile((0, path_1.resolve)((0, helpers_1.getThumbPath)(filename, height, width)));
                }
                else {
                    // create thumbnail
                    const result = yield (0, helpers_1.resizeImg)(filename, height, width);
                    if (result != '') {
                        // thumbnail created successfuly
                        res.status(200).sendFile((0, path_1.resolve)(result));
                    }
                    else {
                        // thumbnail creation failed
                        res.status(500).json('Something Went Wrong !!');
                    }
                }
            }
            else {
                // filename dosen't exist
                res.status(404).json('No such filename.');
            }
        }
    }
}));
exports.default = images;
