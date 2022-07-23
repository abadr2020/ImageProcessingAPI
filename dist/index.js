"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./routes/api/images/images"));
// create app object from the express module
const app = (0, express_1.default)();
// use port 3500 to listen 
const port = 3500;
// use routes defined in images router
app.use('/api/images', images_1.default);
// declare an endpoint for the root path
app.get('/', (req, res) => {
    // redirect to the /api/images path
    res.redirect('/api/images');
});
// listen to port 3500 
app.listen(port, () => {
    console.log('Server is running on port 3500');
});
exports.default = app;
