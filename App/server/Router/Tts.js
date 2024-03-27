const express = require("express");
const router = express.Router();
const {Style} = require("../Model/Style");
const {Tts} = require("../Model/Tts");

router.post("/submit", async (req, res) => {
    try {
        let temp = {
            text: req.body.text,
            styleId:req.body.styleId,
        }
        const NewTts = new Tts(temp);
        await NewTts.save();
        await Style.findOneAndUpdate(
            { _id: req.body.styleId },
            { $inc: { ttsNum: 1 } }
        ).exec();
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ success: false });
    }
});

router.post("/getTts", (req,res)=>{
    Tts.find({styleId: req.body.styleId})
        .exec()
        .then((ttsInfo)=>{
            return res.status(200).json({
                success:true,
                ttsList:ttsInfo,
            })
        }).catch((err)=>{
        return res.status(400).json({
            success:false,
        })
    })
})

router.post("/edit", (req,res)=>{
    let temp = {
        text:req.body.text,
        styleId: req.body.styleId,
    }
    Tts.findOneAndUpdate({_id:req.body.ttsId}, {$set: temp}).exec()
        .then((doc)=>{
            return res.status(200).json({
                success: true,
            })
        }).catch((err)=>{
            return res.status(400).json({
                success: false,
            })
    })
})

router.post("/delete", (req,res)=>{
    let temp = {
        text:req.body.text,
        styleId: req.body.styleId,
    }
    Tts.deleteOne({_id:req.body.ttsId}).exec()
        .then(()=>{
            Style.findOneAndUpdate(
                { _id: req.body.styleId },
                { $inc: { ttsNum: -1 } }
            ).exec().then(()=>{
                return res.status(200).json({
                    success: true,
                })
            })
        }).catch(()=>{
        return res.status(400).json({
            success: false,
        })
    })
})

module.exports = router;