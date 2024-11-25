import mongoose, { model } from "mongoose";


const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true

    },
    Email:{
        type:String,
        unique:true,
        required:true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'], // Email format validation
    },

    Password:{
        type:String,
        required:true

    },
    Image: {
        fileName: {
          type: String,
          required: true
        },
        path: {
          type: String,
          required: true, // Path where the image is stored
        },
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})
const User = mongoose.model("User",UserSchema)
 export default User