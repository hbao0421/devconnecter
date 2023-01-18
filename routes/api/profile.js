const express = require('../../node_modules/express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const {body, validationResult} = require('express-validator');

//get current user's profile
router.get('/me',auth,async(req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'});
        }
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//ceate current user's profile
router.post('/',[auth,[
    body('status','Status is required').not().isEmpty(),
    body('skills','Skills is required').not().isEmpty(),
    ]],
    async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        
})
module.exports = router;
