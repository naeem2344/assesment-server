const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const { uploadProducts,getAllProducts, saveCustomization, getAllCustomization } = require('../controllers/product.controller');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const upload = uploadMiddleware("3D_model");

const route = express.Router();

// i have added authMiddleware, so that authenticate user can hit the endpoints only
route.post('/upload-data', authMiddleware ,upload.fields([
    { name: '3d_texture', maxCount: 10 }, 
    { name: '3d_model', maxCount: 1 },
    { name: 'jpg_model', maxCount: 1 },

]), uploadProducts);

route.get('/get-products', authMiddleware, getAllProducts)
route.post('/save-customizaton', authMiddleware, saveCustomization);
route.get('/get-customizaton', authMiddleware, getAllCustomization);
module.exports = route;