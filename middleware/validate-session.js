const jwt = require('jsonwebtoken');
const creators = require('../models/creator.model');

const validateSession = async(req,res,next) => {
    try {
        const token = req.headers.authorization;
        const decoded = await jwt.verify(token, process.env.JWT);
        // console.log(decoded);
        const creator = await creators.findById(decoded.id);
        req.creator = creator;
        return next(); 
    } catch (err) {
        `Error: ${err.message}`
        console.log(err)
        // res.json({message: err.message});
    }
}

module.exports = validateSession;