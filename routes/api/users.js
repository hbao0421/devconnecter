const express = require('../../node_modules/express');
const router = express.Router();


router.post('/',(req,res)=>{
    console.log(req.body);
    res.send('User route')
});

module.exports = router;
