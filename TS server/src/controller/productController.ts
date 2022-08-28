import express, { NextFunction, Request, Response } from 'express';
import productModel from '../database/models/productModel';
import mongoose from 'mongoose';

const createProduct = (req: Request, res: Response, next: NextFunction) => {
    const name: string = req.body.name;
    const price: string = req.body.price;
    const brand: string = req.body.brand;
    const product = new productModel({
        id: new mongoose.Types.ObjectId(),
        name,
        price,
        brand
    });
    return product
    .save()
    .then(product => res.status(201).json({product}))
    .catch(error => res.status(500).json({error}));
};

const getProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return productModel.findById(productId)
    .then(product => product ? res.status(200).json({product}) : res.status(404).json({message: 'Not found'}))
    .catch(error => res.status(500).json({error}));
};
const getAllProducts = (req: Request, res: Response, next: NextFunction) => {
    return productModel.find()
    .then(products => res.status(201).json({products}))
    .catch(error => res.status(500).json({error}));
};

const updateProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return productModel.findById(productId)
    .then(product => {
        if (product){
            product.set(req.body);

            return product
                .save()
                .then(product => res.status(201).json({product}))
                .catch(error => res.status(500).json({error}));
        } else {
            res.status(404).json({message: 'Not found'});
        }
    })
    .catch(error => res.status(500).json({error}));
};

const removeProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    
    return productModel.findByIdAndDelete(productId)
    .then(product => product ? res.status(201).json({message: 'deleted'}) : res.status(404).json({message: 'Not found'}))
    .catch(error => res.status(500).json({error}));
};

export default { createProduct, getProduct, getAllProducts, updateProduct, removeProduct };