const route = require('express')
const { getUsers, getUser, postUser, updateUser, deleteUser } = require('../controllers/userController')
const router = route.Router()



// Get a user
router.get('/:id', getUser)
// create a user
router.post('/', postUser)
// update a user
router.put('/:id', updateUser)
// delete a user
router.delete('/:id', deleteUser)
// follow a user

// unfollow a user

module.exports = router