

import mongoose from "mongoose";

  const AdminSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,

    },
    role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now },
})

const Admin = mongoose.model ("Admin",AdminSchema)

export default Admin