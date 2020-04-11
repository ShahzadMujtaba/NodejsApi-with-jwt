const express = require('express');
const router = express.Router();

// @route   GER api/post
// @desc    Test route
// @access  public

 router.get('/',(req,res)=>{
   res.send('user post');
 })

 module.exports = router;
