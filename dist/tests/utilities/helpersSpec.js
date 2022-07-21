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
const fs_1 = __importDefault(require("fs"));
const helpers_1 = require("../../utilities/helpers");
describe('Testing Resize Image', () => {
    it('expect image to be resized and added to thumb folder', () => __awaiter(void 0, void 0, void 0, function* () {
        const path = yield (0, helpers_1.resizeImg)('fjord', '1000', '400');
        const response = yield fs_1.default.promises.stat(path).catch(e => false);
        expect(response).not.toBe(false);
        yield fs_1.default.promises.unlink(path);
    }));
});
