const express = require('express');
const router = express.Router();
const {isLoggedIn}=require('./auth')
const Post = require('../../models/articles');

router.get('/:id?',isLoggedIn,async (req, res) => {
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

})

// stub
router.put('/:id',isLoggedIn, (req, res) => {
  res.json({articles:[{id:1,author:req.username,comments:[]}]})
  });
  // router.put(
  //   '/:id',isLoggedIn,
  //   async(req,res)=>{
  //     console.log("jere")
  //     const id=req.params.id
  //     const { text, commentId } = req.body; 
    
  //     const post = await Post.findOne({ id: id });
    
  //     if(typeof(commentId)=="undefined"){
          
  //         if(post.author==req.username){
  //           post.text=text
  //           await post.save();
  //           res.json({"articles":[post]})
  //         }else{
  //           res.json({ result: "the user does not own the article"});
  //         }
    
  //     }else{
  //       if(commentId=='-1'){
  //         // new comment
  //         const oldcomments=post.comments
  //         const id=oldcomments.length+1
  //         const newcom={commentId:id,user:req.username,text:text}
  //         oldcomments.push(newcom)
  //         post.comments=oldcomments
  //         await post.save();
  //         res.json({"articles":[post]})
    
  //     }else{
  //    //  update the requested comment on the article
  //         const newPost=await Post.updateOne(
  //           {id:id}, {$set:{
  //             "comments.$[updateID].text" : text
  //         }}, {
  //             "arrayFilters": [
  //               {"updateID.commentId" : commentId},
  //             ]
  //         }
  //         );
  //       res.json({"articles":[newPost]})
    
  //     }
  //     }
  //   }
  // )






  module.exports = router;