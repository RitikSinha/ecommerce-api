const express = require('express');
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth');
const {getUserById,pushOrderInPurchaselist} = require('../controllers/user');
const {getOrderById,createOrder,getAllOrders,updateOrderStatus,getOrderStatus} = require('../controllers/order');
const {updateStock} = require('../controllers/product')

router.param("orderID",getOrderById);
router.param("userID",getUserById);

//create
router.post("/order/create/:userID",isSignedIn,isAuthenticated,pushOrderInPurchaselist,updateStock,createOrder)

//read
router.get("order/all/:userID",isSignedIn,isAuthenticated,isAdmin,getAllOrders);

//status
router.get("/order/status/:userID",isSignedIn,isAuthenticated,getOrderStatus);
router.put("/order/:orderID/status/:userID",isSignedIn,isAuthenticated,isAdmin,updateOrderStatus)


module.exports = router;