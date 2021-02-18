const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {signup,signin,isAdmin,signout,isSignedIn} = require('../controllers/auth')


router.post('/signup',
check('email',"invalid email").isEmail().normalizeEmail(),
check('name', "give your full name").isLength({min:3}),
check('password',"use strong password").isLength({min:5}),
signup);

router.post('/signin',
check('email',"invalid email").isEmail().normalizeEmail(),
check('password',"password is required").isLength({min:5}),signin);

router.post('/signout',signout);

router.get('/test',isSignedIn,(req,res)=>{
    return res.json({msg:"protected route"});
})
module.exports = router;