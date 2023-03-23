const express = require('express')
const router = express.Router()
const {createPost, updatePost, deletePost, likePost, getPost, getPosts}  = require('../controllers/postController')


// create a post route
router.post('/', createPost)
// update a post route
router.put('/:id', updatePost)
// delete a post route
router.delete('/', deletePost)
// like a post route
router.put('/', likePost)
// get a post route
router.get('/', getPost)
// get timeline post route
router.get('/', getPosts)


module.exports = router