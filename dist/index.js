"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./routes/api/images/images"));
const app = (0, express_1.default)();
const port = 3500;
app.use('/api/images', images_1.default);
app.get('/', (req, res) => {
    res.redirect('/api/images');
});
app.get('/test', (req, res) => {
    res.send('/api/images');
});
app.listen(port, () => {
    console.log('Server is running on port 3500');
});
exports.default = app;
