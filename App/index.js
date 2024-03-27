const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const config = require("./server/config/key");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "./client/build/")));
app.use("/image", express.static("./image"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/style", require("./server/Router/Style"));
app.use("/api/user", require("./server/Router/User"));
app.use("/api/tts", require("./server/Router/Tts"));
app.use("/api/survey", require("./server/Router/Survey"));

app.listen(port, () => {
    mongoose.connect(
        config.mongoURI
    ).then(() => {
        console.log(`http://localhost:${port}`);
        console.log("connecting MongoDB...");
    }).catch((err) => {
        console.log(`${err}`);
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})