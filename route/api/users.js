const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

const gravatar = require('gravatar');

//@route    post api/User
//@desc     Test route
//@access   public
router.post('/',[
  check('name','Name is required ').not().isEmpty(),
check('email','Please include a valid email').isEmail(),
check('password','please enter password is 6 or more character').isLength({min:6 })
], async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
     return  res.status(400).json({errors:errors.array()});
  }

const {name,email,password} = req.body;

try{
  let user = await User.findOne({email})
    //see if user already exist
    if(user){
      res.status(400).json({errors:[{msg:'User already exists'}]})
    }  
    //Get user gravatar
      const avatar =  gravatar.url({
        s:'200',
        r:'pg',
        d:'mm'
      })
       user = new User({
        name,
        email,
        avatar,
        password
      })
    //Encrypt password
    const salt = await bcrypt.genSalt(10);
    // const salt = bcrypt.genSaltSync(10)
    // user.password =  bcrypt.hashSync(password,salt);
    user.password = await bcrypt.hash(password,salt);
     
    await user.save()
  // Return web tocken
  const payload = {
    user:{
      id:user._id,
    }
  }
   jwt.sign(
      payload,
      config.get('jWtSecret'),
      {expiresIn:'24h'},(err,token)=>{
        if(err) throw err
        res.json({token})
      })

    // res.send('User registered');
}
catch(err){
  console.error(err.message);
  res.status(500).send('server error');
}

})

module.exports = router;
