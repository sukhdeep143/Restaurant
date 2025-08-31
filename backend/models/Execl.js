const mongoose = require("mongoose");



const GetUserExecl = new mongoose.Schema({
    Roll_no:{
        type: String,
        required: true
    },
    Registration_no:{
         type: String,
        required: true
    },
    Batch_Code:{
        type: String,
        required: true
    },
    Candidate_Name:{
        type: String,
        required: true
    },
    Mother_Name:{
        type: String,
        required: true
    },
    Father_Name:{
        type: String,
        required: true
    },
    DOB:{
        type:Date,
        required: true
    },
    Institude_Training_Partner:{
         type: String,
        required: true

    },
    Training_Parner:{
        type: String,
        required: true

    },
    Practical_1:{
        type:String,
        required: true

    },
    Internal_Assessment:{
        type:String,
        required:true
    },
    Project:{
         type:String,
        required:true
    }
})


module.exports = mongoose.model("GetUserExecl", GetUserExecl);

