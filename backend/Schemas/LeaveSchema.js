import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    StartDate: {  // Corrected the typo here
        type: String,
        required: true
    },
    EndDate: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
});

// Corrected the model creation method (use mongoose.model instead of mongoose.Model)
const Leave = mongoose.model("Leave", LeaveSchema);

export default Leave;
