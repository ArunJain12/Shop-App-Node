const path = require('path');
const express = require('express');

const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/products', adminController.getAdminProducts);

router.get('/add-product', adminController.getAddProductPage);

router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProductPage);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;