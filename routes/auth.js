const express = require('express');
const router = express.Router();
const {signup,signin,isAdmin} = require('../controllers/auth')


router.get('/signup',isAdmin,signup);
router.get('/signin',signin);

module.exports = router;