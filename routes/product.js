const express = require('express');
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth');
const {getUserById} = require('../controllers/user');

const { getProductById,
        createProduct,
        getProduct,
        getPhoto,
        getAllCategories,
        getAllProducts,
        updateProduct,
        deleteProduct} = require('../controllers/product');


//params
router.param("userID",getUserById);
router.param("productID",getProductById);

//all the routes

//create
router.post("/product/create/:userID",isSignedIn,isAuthenticated,isAdmin,createProduct);

//read
router.get("/product/:productID",getProduct);
router.get("/product/photo/:productID",getPhoto);
router.get("/products",getAllProducts);
router.get('/product/categories',getAllCategories)

//update
router.put("/product/:userID/:productID",isSignedIn,isAuthenticated,isAdmin,updateProduct)

//delete
router.delete("/product/:userID/:productID",isSignedIn,isAuthenticated,isAdmin,deleteProduct)

module.exports = router;