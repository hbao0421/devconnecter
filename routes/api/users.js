const express = require('../../node_modules/express');
const router = express.Router();
const {body, validationResult} = require('express-validator');


router.post('/',
    body('name','Name is required').not().isEmpty(),
    body('username','email should be valid').isEmail(),
    body('password','password should be more  than 5').isLength({min:6}),
    (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    res.send('User route');
});

module.exports = router;
