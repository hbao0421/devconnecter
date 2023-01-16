const express = require('../../node_modules/express');
const router = express.Router();
const gravatar =  require('../../node_modules/gravatar');
const bcrypt = require('../../node_modules/bcryptjs');
const jwt = require('../../node_modules/jsonwebtoken');
const config = require('../../node_modules/config');
const {body, validationResult} = require('express-validator');

const User  = require('../../models/User');


router.post('/',
    body('name','Name is required').not().isEmpty(),
    body('email','email should be valid').isEmail(),
    body('password','password should be more  than 5').isLength({min:6}),
    async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password}=req.body;
    try{
    //if user exists
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({errors:[{msg:'User exists'}]});
    }

    //get avatar
    const avatar = gravatar.url(email,{
        s:'200',
        r:'pg',
        d:'mm'
    });

    //encrypt password
    user = new User({
        name,
        email,
        avatar,
        password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);
    await user.save();

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
        res.status(500).send('Server error');
    }
    
});

module.exports = router;
