const express = require("express");
const router = express.Router();
const {Survey} = require("../Model/Survey");
const {User} = require("../Model/User");



router.post("/submit", (req,res) => {
    let temp ={
        suggestion:req.body.suggestion,
    }
    User.findOne({uid:req.body.uid}).exec().then((userInfo)=>{
        temp.author = userInfo._id;
        const Suggestion = new Survey(temp);
        Suggestion.save().then(()=>{
            res.status(200).json({success:true});
        })
    }).catch((err) => {
        res.status(400).json({success: false});
    });
})

router.post("/list", (req, res) => {
    Survey.find().populate("author").exec().then((SurveyList)=>{
        res.status(200).json({success:true,SurveyList});
    }).catch((err) => {
        res.status(400).json({success: false});
    });
});

module.exports = router;