import mongoose from "mongoose";


const DataSchema = new mongoose.Schema({
    Date:{
        type:String,
        required:true
    },
    Status: { type: String, default: 'Abscent' },
    Email:{
        type:String,
        required:true,
        unique:true,
    }
})
const UserData = mongoose.model("UserData" , DataSchema)
export default  UserData