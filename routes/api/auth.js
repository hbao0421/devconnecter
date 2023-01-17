const express = require('../../node_modules/express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const config = require('../../node_modules/config');
const bcrypt = require('../../node_modules/bcryptjs');
const jwt = require('../../node_modules/jsonwebtoken');
const {body, validationResult} = require('express-validator');


router.get('/',auth, async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');

    }
});

router.post('/',
    body('email','email should be valid').isEmail(),
    body('password','password is required').exists(),
    async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password}=req.body;
    try{
    //if user exists
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({errors:[{msg:'invalid credentials'}]});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({errors:[{msg:'wrong password'}]});
    }
    //return json web token
    const payload = {
        user:{
            id:user.id
        }
    }
    jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000},(err,token)=>{
        if(err){
            throw err;
        }else{
            res.json({token});
        }
    });

    }catch(err){
        console.log(err);
        res.status(500).send('Server error');
    }
    
});


module.exports = router;
