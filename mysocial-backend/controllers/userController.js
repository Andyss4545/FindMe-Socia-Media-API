const asyncHandler = require('express-async-handler');


// Get all users
const getUsers = asyncHandler(async (req, res) => {
    res.status(201).json({message: "Get all users"})
})

// Get a single user
const getUser = asyncHandler(async (req, res) => {
    res.status(201).json({message: `Get the user ${req.params.id}`})
})

// Create a user
const postUser = asyncHandler(async (req, res) => {
    res.status(201).json({message: "Post the user"})
})

// Update a single user
const updateUser = asyncHandler(async (req, res) => {
    res.status(201).json({message: `Update user ${req.params.id}`})
})

// Delete a single user
const deleteUser = asyncHandler(async (req, res) => {
    res.status(201).json({message: `users deleted successfull ${req.params.id}`})
})


module.exports = ({
     getUsers,
     getUser,
     postUser,
     updateUser,
     deleteUser
})

