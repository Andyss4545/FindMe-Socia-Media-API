const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const { User } = require('nit');

// Register user
const registerUser = asyncHandler(async(req, res) => {
    
    // try catch if there is any error
    try{

       // Generate new  password
      const hashedPasword = await bcrypt.hash(req.body.password, 10)

      // create new user
      const newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hashedPasword
      })

      // save the user and return response
       const user = await newUser.save()
       res.status(201).json(user)

    }catch(error){
        // return error from the console
         console.log(error)
    }
    
}) 


const loginUser = asyncHandler(async(req, res) => {

      //try{
            const {email, password} = req.body
            // IF there is not email
            if(!email || !password){
                  res.status(402)
                  throw new Error('Email could not be found');
            }
            // find the user in the database
            const user = await Users.findOne({email});

            // compare the password typed and the user password in the database
            const validPassword = await bcrypt.compare(password, user.password)

            // Throw error when there is no validPassword
             if(!validPassword) {
                   res.status(401)
                   throw new Error('Password is not valid');
             }

            // throw error when user is not found
            if(!user) {
                   res.status(402);
                   throw new Error('User could not be found');
            }
            // login the user
            res.status(201).json(user)
           
      //}catch(error){
            // throw error
            // res.status(500).json(error)
     // }
        
})


module.exports = {
      registerUser,
      loginUser
}
