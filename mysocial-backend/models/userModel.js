const mongoose = require('mongoose')


//Here we defined schema and the model for our user

const userSchema = new mongoose.Schema({
         username: {
              type: String, // string character
              required: true,
              min: 3,    // minimum password character should be 3
              max: 20,   // maximum password character should be 20
              unique: true
         },

         email: {
            type: String,  // string character
            required: true,
            max: 50,    // maximum email character should be 50
            unique: true
         },

         password: {
            type: String, // string character
            required: true,
            min: 6,     // minimum character should be
            unique: true
         },

         profilePicture: {
              type: String,
              default: ""  // by default it will be empty string
         },

         coverPicture: {
            type: String,
            default: ""  // by default it will be empty string
        },

        followers: {
            type: Array,  // this is an array character
            default: []   // by default followers wiil be empty array
        },

        followings: {
         type: Array,  // this is an array character
         default: []   // by default followers wiil be empty array
        },
       
       isAdmin:{
           type: Boolean,  // this is a Bolean character
           default: false  // by default  it will be false
       },

       desc: {
           type: String, // this is a string characte
           max: 50,
       },

       city: {
           type: String, // this is a string characte
           max: 50
       },

       from: {
            type: String, // this is a string characte
            max: 50
       },

       relationship: {
            type: Number, // this is a number character
            emum: [1, 2, 3]
       },


},

    {timestamps: true}
)



module.exports = mongoose.model('users', userSchema)