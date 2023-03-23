const asyncHandler = require('express-async-handler');
const Posts = require('../models/postModel');

// create a post
const createPost = asyncHandler(async(req, res) => {
    // create new post to the body
     const newPost = new Posts(req.body)
     try{
        // save the post
        const savedPost = await newPost.save()
        // send to the database
        res.status(200).json(savedPost)
     }catch(error){
        res.status(500).json(err)
     }
})
// update a post
const updatePost = asyncHandler(async(req, res) => {
      try{
        // find the post by it's id
        const post =  await Posts.findById(req.params.id)
        // if the post userId is equal to our user id
        if (post.userId === req.user.userId){
             await post.updateOne({
                  $set: req.body
             })
             res.status(200).json('The post has been updated')
         } else {
            res.status(403).json('you can update only your post')
         }
        
      } catch(error){
          res.status(500).json(error)
      }
})
// delete a post
const deletePost = asyncHandler(async(req, res) => {
    
})
// like a post
const likePost = asyncHandler(async(req, res) => {
    
})
// get a post
const getPost = asyncHandler(async(req, res) => {
    
})
// get timeline posts
const getPosts = asyncHandler(async(req, res) => {
    
})


module.exports = {
      createPost,
      updatePost,
      deletePost,
      likePost,
      getPost,
      getPosts
}