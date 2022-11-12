const express=require('express');
const connectDB=require('./config/db');
const router = express.Router();
const config = require('config');
const md5 = require('md5');
const cookieParser = require('cookie-parser')
const {login, logout, register}= require('./routes/api/auth');
const User = require('./models/users');
const Profile=require('./models/profiles');
const Post = require('./models/articles');
let sessionUser = {};
let cookieKey = 'sid';

const app=express();

connectDB();

app.use(express.json({extended:false}))
app.use(cookieParser())







function setup(app) {
  app.post('/login', login);
  app.put('/logout', logout);
  app.post('/register', register);
}




async function headline(req, res) {
    console.log("111")
    try {

        const headline=req.body.headline
        const username=req.username
        console.log("username: "+username)
        
    
        let profile = await Profile.findOneAndUpdate(
          { username: username },
          { $set: {headline:headline} },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return res.json(profile);
      } catch (err) {
        console.error(err.message);
    
        res.status(500).send('Server Error');
      }
}





async function getheadline(req,res){
    console.log("is here")
    try {
        const profile = await Profile.findOne({username:req.params.user});

    
        res.json({username:profile.username,headline:profile.headline});
      } catch (err) {
        console.error(err.message);
    
        res.status(500).send('Server Error');
      }
}

async function updatePost(req,res){
  console.log("jere")
  const id=req.params.id
  const { text, commentId } = req.body; 

  const post = await Post.findOne({ id: id });

  if(typeof(commentId)=="undefined"){
      
      if(post.author==req.username){
        post.text=text
        await post.save();
        res.json(post)
      }else{
        res.json({ result: "the user does not own the article"});
      }

  }else{
    if(commentId=='-1'){
      // new comment
      const oldcomments=post.comments
      const id=oldcomments.length+1
      const newcom={commentId:id,user:req.username,text:text}
      oldcomments.push(newcom)
      post.comments=oldcomments
      await post.save();
      res.json(post)

  }else{
 //  update the requested comment on the article
      const newPost=await Post.updateOne(
        {id:id}, {$set:{
          "comments.$[updateID].text" : text
      }}, {
          "arrayFilters": [
            {"updateID.commentId" : commentId},
          ]
      }
      );
    res.json(newPost)

  }
  }
}


async function addartcile(req,res){
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
  
      res.json(newPost);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
}

async function checkPost(req,res){
  const id=req.params.id
  
  try {
    if(typeof(id)=="undefined"){
      // articles by logged author
      const posts=await Post.find({author:req.username})
      res.json({articles:posts})
    }else{
      // by a user or articles
      console.log(id)
      const posts=await Post.find({'$or':[{author:id},{id:id}]})
      res.json({articles:posts})
    }


  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

console.log(typeof(setup))
// setup(app) 

app.get('/',(req,res)=>res.send('API Running'));
app.post('/login', login);
app.put('/logout', logout);
app.post('/register', register);


// app.post('/login', auth.login);
// app.put('/logout',auth.logout)
// app.post('/register', auth.register);

// app.put('/headline',isLoggedIn, headline);
// app.get('/headline/:user',getheadline)
// app.put('/articles/:id',isLoggedIn,updatePost)
// app.post('/article',isLoggedIn,addartcile)
// app.get('/articles/:id?',isLoggedIn,checkPost)
app.use('/articles',require('./routes/api/articles'))
app.use('/',require('./routes/api/profiles'));




const PORT=process.env.PORT ||3000;



app.listen(PORT,()=>console.log(`server started on port ${PORT}`));

module.exports = app;