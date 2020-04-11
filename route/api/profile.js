const express = require('express');
const router = express.Router();

// @route   GER api/profile
// @desc    Test route
// @access  public

 router.get('/',(req,res)=>{
   res.send('user profile');
 })

 module.exports = router;
