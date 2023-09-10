const jwt = require('jsonwebtoken');
const Influencer = require('../models/influencer.model');

const validateSession = async(req,res,next) => {
    try {
        const token = req.headers.authorization;
        const decoded = await jwt.verify(token, process.env.JWT);
        // console.log(decoded);
        const influencer = await Influencer.findById(decoded.id);
        req.influencer = influencer;
        return next(); 
    } catch (err) {
        res.json({message: err.message});
        `Error: ${err.message}`
        console.log(err)
        // res.json({message: err.message});
    }
}

module.exports = validateSession;