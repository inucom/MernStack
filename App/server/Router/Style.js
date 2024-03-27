const express = require("express");
const {Counter} = require("../Model/Counter");
const {Style} = require("../Model/Style");
const {User} = require("../Model/User");
const {Tts} = require("../Model/Tts");
const router = express.Router();
const setUpload = require("../Util/upload");

router.post("/submit", (req, res) => {
    let temp = {
        title:req.body.title,
        content:req.body.content,
        image : req.body.image,
    };
    Counter.findOne({name: "counter"})
        .exec()
        .then((counter) => {
            temp.styleNum = counter.styleNum;
            User.findOne({uid:req.body.uid}).exec().then((userInfo)=>{
                temp.author = userInfo._id;
                const VoiceStyle = new Style(temp);
                VoiceStyle.save().then(() => {
                    Counter.updateOne(
                        {name: "counter"},
                        {$inc: {styleNum: 1}})
                        .then(() => {
                                res.status(200).json({success: true});
                            }
                        );
                });
            })
        })
        .catch((err) => {
            res.status(400).json({success: false});
        });
});

router.post("/list", async (req, res) => {
    try {
        const user = await User.findOne({uid:req.body.uid});
        const styles = await Style.find({ "author": user._id }).exec();
        res.status(200).json({ success: true, styleList: styles });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false });
    }
});

router.post("/detail", (req, res) => {
    Style.findOne({styleNum: Number(req.body.styleNum)})
        .populate("author")
        .exec()
        .then((doc) => {
            res.status(200).json({success: true, style: doc});
        }).catch((err) => {
        res.status(400).json({success: false});
    });
});

router.post("/edit", (req, res) => {
    let temp = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
    };
    Style.updateOne({styleNum: Number(req.body.styleNum)}, {$set: temp})
        .exec()
        .then(() => {
            res.status(200).json({success: true});
        }).catch((err) => {
        res.status(400).json({success: false});
    });
});

router.post("/delete", async (req, res) => {
    const styleNum = Number(req.body.styleNum);
    try {
        const style = await Style.findOne({ styleNum: styleNum }).exec();

        if (!style) {
            return res.status(400).json({ success: false});
        }
        await Tts.deleteMany({ styleId: style._id }).exec();
        await style.deleteOne();

        res.status(200).json({ success: true });
    } catch (err) {
        res.status(400).json({ success: false });
    }
});

router.post("/image/upload", setUpload("inu-attention/style"), (req, res) => {
        const filePaths = req.files.map(file => file.location);
        res.status(200).json({success: true, filePaths});
    });


module.exports = router;