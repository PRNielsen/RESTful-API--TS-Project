"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("./database/connection");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// db connectivity
(0, connection_1.connectDB)();
//cors
app.use((0, cors_1.default)());
//request payload middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Routes
app.use('/api/v1/product', productRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server is running in a new src folder!');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
//error handler middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({
        status: 500,
        message: err.message,
        body: {}
    });
});
