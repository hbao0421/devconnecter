const express = require('../../node_modules/express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
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
        const{company,website,location,bio,status,githubusername,skills,youtube,facebook,twitter,instergram,linkedin} = req.body;
        //Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company){
            profileFields.company = company;
        }
        if(website){
            profileFields.website = website;
        }
        if(location){
            profileFields.location = location;
        }
        if(bio){
            profileFields.bio = bio;
        }
        if(status){
            profileFields.status = status;
        }
        if(githubusername){
            profileFields.githubusername = githubusername;
        }
        if(skills){
            profileFields.skills = skills.split(',').map(skill=>skill.trim());
        }
        //Build social object
        profileFields.social = {};
        if(youtube){
            profileFields.social.youtube = youtube;
        }
        if(facebook){
            profileFields.social.facebook = facebook;
        }

        if(twitter){
            profileFields.social.twitter = twitter;
        }

        if(instergram){
            profileFields.social.instergram = instergram;
        }

        if(linkedin){
            profileFields.social.linkedin = linkedin;
        }
        try{
            let profile = await Profile.findOne({user:req.user.id});
            if(profile){
                //update
                profile = await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true});
                return res.json(profile);
            }
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});

//get all profile
router.get('/',async(req,res)=>{
    try{
        const profile = await Profile.find().populate('user',['name','avatar']);
        res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//get profile by user id
router.get('/user/:user_id',async(req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'});
        }
        res.json(profile);
    }catch(err){
        console.log(err.message);
        if(err.kind =='ObjectId'){
            return res.status(400).json({msg:'Profile not found'});
        }
        res.status(500).send('Server Error');
    }
});

//delete profile by user id
router.delete('/',auth,async(req,res)=>{
    try{
        await Profile.findOneAndRemove({user:req.user.id});
        await User.findOneAndRemove({_id:req.user.id});
        res.json({msg:'User deleted'});
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//add experience
router.put('/experience',[auth,[
    body('title','Title is required').not().isEmpty(),
    body('company','Company is required').not().isEmpty(),
    body('from','From date is required').not().isEmpty(),
]
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {title,company,location,from,to,current,description} = req.body;
    const newExp = {title,company,location,from,to,current,description};
    try{
        const profile = await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp);//push to to beginning
        await profile.save();
        res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
