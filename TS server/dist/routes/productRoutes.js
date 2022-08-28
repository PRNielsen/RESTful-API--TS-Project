"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controller/productController"));
const router = express_1.default.Router();
router.get('/:productId', productController_1.default.getProduct);
router.get('/', productController_1.default.getAllProducts);
router.put('/:productId', productController_1.default.updateProduct);
router.delete('/:productId', productController_1.default.removeProduct);
router.post('/', productController_1.default.createProduct);
module.exports = router;
