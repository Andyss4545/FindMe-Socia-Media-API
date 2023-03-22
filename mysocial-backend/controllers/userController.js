const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel')
const bcrypt = require('bcrypt')


// Get a single user
const getUser = asyncHandler(async (req, res) => {

    try{
        const user = await Users.findById(req.params.id)
        // don't show password, updatedAt only display others instead of all user details
        const {password, updatedAt, ...other} = user._doc
        // return user
        
        if(!user) {
              res.status(401) // resource not found 
              throw new Error('User not found')
        }
    
        res.status(201).json(user); 
         
    }catch(error){
          res.status(403).json(error)
    }
    
    
})


// Update a single user
const updateUser = asyncHandler(async (req, res) => {
    
      //if the userId matches witht user id
      if(req.body.userId === req.params.id || req.body.isAdmin){
             // if user try to update password again try and await
               if(req.body.password){
                    try{  
                         // hash and update new password
                          req.body.password = await bcrypt.hash(req.body.password, 10)
                
                    }catch(error){
                         return res.status(500).json(error)
                    }
               }

               try{
                //Find user by id and update
                    const user = await Users.findByIdAndUpdate(
                        req.params.id,
                        {$set: req.body},
                        {new: true}
                    )

                // resouces updated succesfully
                 res.status(201).json("Account has been updated")
                 // return the user
                 res.status(500).json(user)
                } catch(error){
                    // catch error if there is anyy
                    res.status(500).json(error)
                }
      }else{
             res.status(403).json('You can update only your account')
      }

    
    
})

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
    const user = await Users.findByIdAndDelete(req.params.id)

    
    // If there is no user, throw 401 error
    if(!user){
         res.status(404)
         throw new Error('User not found')
    }

    // if the userId is equal to the id stored on the database
    if(req.body.userId !== req.params.id || req.body.isAdmin){
        res.status(403) 
        throw new Error('You can delete only your account')
    } 

    res.status(201).json(user)
      
})

const followUser = asyncHandler(async (req, res) => {
     if(req.body.userId !== req.params.id){
            try{
                  // find the user with id we are trying to folow
                  const user = await Users.findById(req.params.id)
                  // find the current userId that wants to follow the user
                  const currentUser = await Users.findById(req.body.userId)
                   
                  if(!user.followers.includes(req.body.userId)){
                       // Push cuurentuser into the user followers
                       await user.updateOne({$push: {followers: req.body.userId}})
                       // update and push followings of the currentUser
                       await currentUser.updateOne({$push: {followings: req.params.id}})
                       res.status(200).json('user has been followed')
                  }else{
                      res.status(403).json('You already followed this user')
                  }

            } catch(error){
                  // catch error if any
                  res.status(500).json(error)
            }
     } else {
            res.status(403).json(`you can't follow yourself`)
     }
}) 


const unfollowUser = asyncHandler(async (req, res) => {
    if(req.body.userId !== req.params.id){
           try{
                 // find the user with id we followed
                 const user = await Users.findById(req.params.id)
                 // find the current userId that follow the user
                 const currentUser = await Users.findById(req.body.userId)
                  
                 if(user.followers.includes(req.body.userId)){
                      // pull curentuser from the user followers
                      await user.updateOne({$pull: {followers: req.body.userId}})
                      // update and pull followings of the currentUser
                      await currentUser.updateOne({$pull: {followings: req.params.id}})
                      res.status(200).json('user has been unfollowed')
                 }else{
                     res.status(403).json(`You don't follow user`)
                 }

           } catch(error){
                 // catch error if any
                 res.status(500).json(error)
           }
    } else {
           res.status(403).json(`you can't follow yourself`)
    }
}) 


module.exports = ({
     getUser,
     updateUser,
     deleteUser,
     followUser,
     unfollowUser
})

