const jwt = require("jsonwebtoken");

const creators = require("../models/creator.model");
const Influencer = require("../models/influencer.model");

const validateSession = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = await jwt.verify(token, process.env.JWT);
    // console.log(decoded);


        const creator = await creators.findById(decoded.id);
        req.creator = creator;
        
        if (!creator) {
        const influencer = await Influencer.findById(decoded.id);
        req.influencer = influencer;
        return next(); 
        }
        
        
        return next(); 
   
        
    } catch (err) {
        res.json({message: err.message});


    }
};

module.exports = validateSession;
