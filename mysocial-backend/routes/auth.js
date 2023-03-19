const route = require('express')
const { registerUser, loginUser } = require('../controllers/authController')
const router = route.Router()


// REGISTER
router.post('/register', registerUser)

router.post('/login', loginUser)



module.exports = router