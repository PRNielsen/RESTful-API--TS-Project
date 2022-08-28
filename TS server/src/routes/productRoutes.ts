import express from 'express';
import productController from '../controller/productController';
const router = express.Router();

router.get('/:productId', productController.getProduct);
router.get('/', productController.getAllProducts);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.removeProduct);
router.post('/', productController.createProduct);

export = router;