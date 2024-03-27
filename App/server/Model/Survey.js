const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
    suggestion:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {collection:"surveys"});

const Survey = mongoose.model("Survey",surveySchema);

module.exports = {Survey};