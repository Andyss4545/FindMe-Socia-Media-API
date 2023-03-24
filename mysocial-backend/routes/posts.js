const express = require('express')
const router = express.Router()
const {createPost, updatePost, deletePost, getPost, getPosts, likePost}  = require('../controllers/postController')


// create a post route
router.post('/', createPost)
// update a post route
router.put('/:id', updatePost)
// delete a post route
router.delete('/:id', deletePost)
// like a post route
router.put('/:id/like', likePost)
// get a post route
router.get('/:id', getPost)
// get timeline post route
router.get('/timeline/all', getPosts)


module.exports = router