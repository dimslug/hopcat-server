const jwt = require('jsonwebtoken');
const influencer = require('../models/influencer.model');

const validateSession = async(req,res,next) => {
    try {
        const token = req.headers.authorization;
        const decoded = await jwt.verify(token, process.env.JWT);
        // console.log(decoded);
        const user = await influencer.findById(decoded.id);
        req.user = user;
        return next(); 
    } catch (err) {
        `Error: ${err.message}`
        console.log(err)
        // res.json({message: err.message});
    }
}

module.exports = validateSession;