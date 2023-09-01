const router = require("express").Router();
const { response } = require("express");
const Creator = require("../models/creator.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT;

router.post("/signup", async (req, res) => {

    try {
        const creator = new Creator({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 13),
            socials: req.body.socials
        });
        const newCreator = await creator.save();
        const token = jwt.sign({ id: newCreator._id }, SECRET, { expiresIn: "1 day",

        });
        res.status(200).json({
            creator: newCreator,
        message: "Success!",
    token,
});


    } catch (err) {
        res.status(500).json({
           error: err.message
        })
       
    }
})

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const creator = await Creator.findOne({ email: email });
      const passwordMatch = await bcrypt.compare(password, creator.password);
      if (!creator || !passwordMatch) throw new Error("That combination of Email and Password does not match");
      const token = jwt.sign({ id: creator._id }, SECRET, {
          expiresIn: "1 day",
        });
        let creatorID = creator._id;
        res.status(200).json({
            message: `Success!`,
            creator,
            creatorID,
            token
        })
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });