const router = require("express").Router();
const Influencer = require("../models/influencer.model");
const jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validate-session");

const errorResponse = (res, error) => {
    return res.status(500).json({
        error: error.message,
    });
};

//! Get One Profile by Influecer ID
router.get("/:id", validateSession, async (req, res) => {
    try {

        if()
        const influencer = await Influencer.findById(req.params.id);
        res.status(200).json({
            influencer,
            message: "success",
        });
    } catch (err) {
        errorResponse(res, err);
    }
});

//! Update by Influencer ID

router.patch("/update/:id", validateSession, async (req, res) => {
    try {
        const influencer = await Influencer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({
            influencer,
            message: "success",
        });
    } catch (err) {
        errorResponse(res, err);
    }

});

//! Delete by Influencer ID

router.delete("/delete/:id", validateSession, async (req, res) => {
    try {
        const influencer = await Influencer.findByIdAndDelete(req.params.id);
        res.status(200).json({
            influencer,
            message: "success",
        });
    } catch (err) {
        errorResponse(res, err);
    }
});