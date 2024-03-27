const mongoose = require("mongoose");

const ttsSchema = new mongoose.Schema({
    text:String,
    styleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Style",
    },
}, {collection:"ttss"});

const Tts = mongoose.model("Tts",ttsSchema);

module.exports = {Tts};