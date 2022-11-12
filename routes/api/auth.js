const express = require('express');
const router = express.Router();
// const auth = require('../../middleware/auth');
const config = require('config');
const md5 = require('md5');
// const app=require('../../server')
const User = require('../../models/users');
const Profile=require('../../models/profiles');

sessionUser = {"mockcookie":"testUser"};
let cookieKey = "sid";

// module.exports = function getcookie(){
//     return sessionUser
// }

function getSec(){
  return sessionUser
}
function isLoggedIn(req, res, next){

  
  if (!req.cookies) {
     return res.sendStatus(401);
  }

  let sid = req.cookies[cookieKey];

  // no sid for cookie key
  if (!sid) {
      return res.sendStatus(401);
  }

  let username = sessionUser[sid];
  console.log("username1111111"+username)
  // no username mapped to sid
  if (username) {
      req.username = username;
      next();
  }
  else {
      return res.sendStatus(401)
  }
}


async function  login(req, res) {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    let sid=''
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Username' }] });
    }


    // let userSes=userObjs[username]
    let curHash=md5(user.salt+password)
    if(curHash==user.hash){
        
        
        // const session={username:username}
        sid = `${Date.now()}_${Math.random()}`
        res.cookie(cookieKey, sid, { maxAge: 3600 * 1000, httpOnly: true });
        sessionUser[sid]=username
        res.send({ username: username, result: "success"})
    }else{
        return res
        .status(400)
        .json({ errors: [{ msg: 'Login failed' }] });
    }



  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}


async function register(req, res) {
  const { username,email,dob,zipcode, password } = req.body;


  try {
    let user = await User.findOne({ username });
    if(user){
        res.status(400).json({errors:[{msg:'User has existed'}]});
        return;
   }


    const newprofile=new Profile({
      username:username,
      email:email,
      phone:dob,
      zip:zipcode,
      img:"",
      headline:"Happy",
      friends:[]
    })
     
const salt=username + new Date().getTime()
const hash=md5(salt+password)

const newuser=new User({
  username:username,
  salt:salt,
  hash:hash
});


await newuser.save();
await newprofile.save();


res.json({ result: 'success',username:username, });



  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}


function logout(req, res) {
  res.clearCookie(cookieKey)
  res.send("OK")
}


  module.exports = {isLoggedIn, register, login, logout ,sessionUser,getSec}