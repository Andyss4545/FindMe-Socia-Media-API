const route = require('express')
const { getUser, updateUser, deleteUser, followUser, unfollowUser } = require('../controllers/userController')
const router = route.Router()


// Note: We don't get all users in social media application

// Get a user
router.get('/:id', getUser)
// update a user
router.put('/:id', updateUser)
// delete a user
router.delete('/:id', deleteUser)
// follow a user
router.put('/:id/follow', followUser)
// unfollow a user
router.put('/:id/unfollow', unfollowUser)

module.exports = router