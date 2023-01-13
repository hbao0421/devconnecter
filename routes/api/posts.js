const express = require('../../node_modules/express');
const router = express.Router();


router.get('/',(req,res)=>res.send('Posts route'));

module.exports = router;