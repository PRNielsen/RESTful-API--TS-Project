"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = __importDefault(require("../database/models/productModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const brand = req.body.brand;
    const product = new productModel_1.default({
        id: new mongoose_1.default.Types.ObjectId(),
        name,
        price,
        brand
    });
    return product
        .save()
        .then(product => res.status(201).json({ product }))
        .catch(error => res.status(500).json({ error }));
};
const getProduct = (req, res, next) => {
    const productId = req.params.productId;
    return productModel_1.default.findById(productId)
        .then(product => product ? res.status(200).json({ product }) : res.status(404).json({ message: 'Not found' }))
        .catch(error => res.status(500).json({ error }));
};
const getAllProducts = (req, res, next) => {
    return productModel_1.default.find()
        .then(products => res.status(201).json({ products }))
        .catch(error => res.status(500).json({ error }));
};
const updateProduct = (req, res, next) => {
    const productId = req.params.productId;
    return productModel_1.default.findById(productId)
        .then(product => {
        if (product) {
            product.set(req.body);
            return product
                .save()
                .then(product => res.status(201).json({ product }))
                .catch(error => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    })
        .catch(error => res.status(500).json({ error }));
};
const removeProduct = (req, res, next) => {
    const productId = req.params.productId;
    return productModel_1.default.findByIdAndDelete(productId)
        .then(product => product ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' }))
        .catch(error => res.status(500).json({ error }));
};
exports.default = { createProduct, getProduct, getAllProducts, updateProduct, removeProduct };
