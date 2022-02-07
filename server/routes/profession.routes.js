const express = require("express");
const Profession = require("../models/Profession");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    try {
        const list = await Profession.find();
        res.status(200).send(list);
    } catch (error) {
        res.status(500).json({
            message: "Server-side error"
        });
    }
});

module.exports = router;
