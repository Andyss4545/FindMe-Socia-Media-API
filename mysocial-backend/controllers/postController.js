const asyncHandler = require('express-async-handler');
const Posts = require('../models/postModel');
const Users = require('../models/userModel')

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
        if (post.userId === req.body.userId){
             await post.updateOne({
                  $set: req.body,
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
   //  try{
   //      // find the post by it's id
   //       const post = Posts.findById(req.params.id)
   //       // if the post userId is equal to our user id
   //       if(post.userId === req.body.userId){
   //       // delete the post
   //              await post.deleteOne() 

   //              res.status(200).json('This post has been deleted')
   //       } else {
   //          res.status(403).json('you can only delete your own post')
   //       }
   //  }catch(error){
   //      res.status(500).json(error)
   //  }

    try{
         // find the post by it's id
          const post = await Posts.findById(req.params.id)
          // if the post id is equal to the user id that wants to delete the post, then delete the post
          if(post.userId === req.body.userId){
                 await post.deleteOne() // delete the post
                 res.status(200).json('This post has been deleted')
          }else{
               res.status(403) // throw error if the are not the same userId
               throw new Error('You can only delete your post')
          }

    } catch(error){
          res.status(500).json(error)
    }
})
// like and dislike post
const likePost = asyncHandler(async(req, res) => {
      try{
            // first find the post by it's id
      const post = await Posts.findById(req.params.id)
      if(!post.likes.includes(req.body.userId)){
            // like and update the post with the current user
            await post.updateOne({$push: {likes: req.body.userId}})
            res.status(200).json('Post has been liked')
      } else {
            // remove user like and update the post
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).json('Post has been disliked')
      }
      }catch(error){
      res.status(500).json(error)
      }
})


// get a post
const getPost = asyncHandler(async(req, res) => {
     try{

      // find the post by it's id
        const post = await Posts.findById(req.params.id)
      // return the post in json format
        res.status(200).json(post)

     }catch(error){
      // return internal error
       res.status(500).json(error)
     }
})
// get timeline posts
const getPosts = asyncHandler(async(req, res) => {
      try{
          const currentUser = await Users.findById(req.body.userId)
          const userPosts = await Posts.find({userId: currentUser._id})
          const friendPosts = await Promise.all(
               currentUser.followings.map((friendId) => {
                   return Posts.find({user: friendId})
               })
          )
          res.json(userPosts.concat(...friendPosts))
      }catch(error){
             res.status(500).json(error)
      }
})


module.exports = {
      createPost,
      updatePost,
      deletePost,
      likePost,
      getPost,
      getPosts
}