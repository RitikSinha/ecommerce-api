const express = require('express');
const router = express.Router();
const{isAdmin,isSignedIn,isAuthenticated} = require('../controllers/auth');
const{getUserById} = require('../controllers/user')
const{getCategoryByID,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getCategory} = require('../controllers/category');
//params
router.param("getCategoryByID",getCategoryByID);
router.param("userID",getUserById)

//create category
router.post('/category/:userID',isSignedIn,isAuthenticated,isAdmin,createCategory);

//read categories
router.get('/categories',getCategories);
router.get('/category/:getCategoryByID',getCategory);


//update category 
router.put('/category/:getCategoryByID/:userID',isSignedIn,isAuthenticated,isAdmin,updateCategory);

//delete categories
router.delete('/category/:getCategoryByID/:userID',isSignedIn,isAuthenticated,isAdmin,deleteCategory);

module.exports = router;