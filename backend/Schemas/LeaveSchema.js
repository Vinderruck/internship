import mongoose from "mongoose";


const LeaveSchema = new mongoose.Schema({
    Email:{
        type:String,
        required:true,
        unique:true
    },
    StartDate:{
        typr:String,
        required:true
    },
    EndDate:{
        type:String,
        required:true,
    },
    reason:{
        type:String,
        required:true,
    }
})
const Leave = mongoose.Model("Leave",LeaveSchema);

export default Leave;