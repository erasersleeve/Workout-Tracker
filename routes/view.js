const router = require("express").Router();
const path = require("path");

//create new workout form
router.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
});

//work out tracker
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"))
});

module.exports = router;