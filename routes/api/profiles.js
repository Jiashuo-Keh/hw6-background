const express = require('express');
const router = express.Router();
const Post = require('../../models/articles');
const {isLoggedIn}=require('./auth')
const Profile = require('../../models/profiles');
const User = require('../../models/users');










// stub data
const profile = {
  username: 'DLeebron',
  headline: 'This is my headline!',
  email: 'foo@bar.com',
  zipcode: 12345,
  dob: '09011999',
  avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
  following:['Jessic','Ambor']
}

router.post('/article',isLoggedIn,async (req, res) => {
  const { text, img } = req.body;
  const author=req.username
  try {
      const newid = await Post.find().count()+1;

const newPost=new Post({
  id:newid,
  author:author,
  text:text,
  img:img,
  comments:[]
});


await newPost.save();
  
      res.json({"articles":[newPost]});
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
});


router.put('/headline',isLoggedIn,async (req, res) => {

  try {

      const headline=req.body.headline
      const username=req.username
      console.log("username: "+username)
      
  
      let profile = await Profile.findOneAndUpdate(
        { username: username },
        { $set: {headline:headline} },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json({username:profile.username,headline:profile.headline});
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
})

router.get('/headline/:user?',isLoggedIn,async (req, res) => {

  try {

    if(typeof(req.params.user)=="undefined"){
      const profile = await Profile.findOne({username:req.username});
      res.json({username:profile.username,headline:profile.headline});
    }else{
      const profile = await Profile.findOne({username:req.params.user});
      res.json({username:profile.username,headline:profile.headline});
    }

    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

// stub
  router.put('/password',isLoggedIn, (req, res) => {
    res.json({ username: req.username, result: 'success' })
    });
// stub
  router.get('/email/:user?',isLoggedIn, (req, res) => {
    const user=profile
    if(typeof(req.params.user)=="undefined"){
      res.json({ username: req.username, email: user["email"] })
    }else{
      res.json({ username: req.params.user, email: user["email"] })
    }
    });
// stub
  router.put('/email',isLoggedIn, (req, res) => {
    const newemail=req.body.email
    profile.email=newemail
    res.json({ username: req.username, email: newemail })
    });
  // stub
  router.get('/zipcode/:user?',isLoggedIn, (req, res) => {
    const user=profile
    if(typeof(req.params.user)=="undefined"){
      res.json({ username: req.username, zipcode: user["zipcode"] })
    }else{
      res.json({ username: req.params.user, zipcode: user["zipcode"] })
    }
    });
// stub
  router.put('/zipcode',isLoggedIn, (req, res) => {
    const newzipcode=req.body.zipcode
    profile.zipcode=newzipcode
    res.json({ username: req.username, zipcode: newzipcode })
    });
  // stub
  router.get('/avatar/:user?',isLoggedIn, (req, res) => {
    const user=profile
    if(typeof(req.params.user)=="undefined"){
      res.json({ username: req.username, avatar: user["avatar"] })
    }
    else{
      res.json({ username: req.params.user, avatar: user["avatar"] })
    }
    });
// stub
  router.put('/avatar',isLoggedIn, (req, res) => {
    const newavatar=req.body.avatar
    profile.avatar=newavatar
    res.json({ username: req.username, avatar: newavatar })
    });
  // stub
  router.get('/dob/:user?',isLoggedIn, (req, res) => {
    const user=profile
    if(typeof(req.params.user)=="undefined"){
      res.json({ username: req.username, dob: user["dob"] })
    }else{
      res.json({ username: req.params.user, dob: user["dob"] })
    }
    });
// stub
router.put('/dob',isLoggedIn, (req, res) => {
  const newdob=req.body.dob
  res.json({ username: req.username, dob: newdob})
  });
// stub
    router.delete('/following/:user', isLoggedIn, async (req, res) => {
      const followings=profile.following.filter(
        (fo)=>fo!==req.params.user
      )
      profile.following=followings
      res.json({ username: req.username, following: followings })
    })

// stub
router.put('/following/:user',isLoggedIn, (req, res) => {
  const user=profile
  for(var i=0;i<user.following.length;i++){
    if(req.params.user==user.following[i]){
      res.json("The following already exits!")
      return;
    }
  }
  const followings=user.following.push(req.params.user)
  res.json({ username: req.username, following: user["following"] })
  });

// stub
router.get('/following/:user?',isLoggedIn, (req, res) => {
  const user=profile
  if(typeof(req.params.user)=="undefined"){
    res.json({ username: req.username, following: user["following"] })
  }else{
    res.json({ username: req.params.user, following: user["following"] })
  }
  });

  module.exports = router;