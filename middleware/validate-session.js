const jwt = require("jsonwebtoken");

const creators = require("../models/creator.model");
const Influencer = require("../models/influencer.model");

const validateSession = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = await jwt.verify(token, process.env.JWT);
    // console.log(decoded);

<<<<<<< HEAD
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
=======
    const creator = await creators.findById(decoded.id);
    req.creator = creator;
>>>>>>> af88a6b0ab8c83663edade433a09d8168ae29215

    if (!creator) {
      const influencer = await Influencer.findById(decoded.id);
      req.influencer = influencer;
      return next();
    }

    return next();
  } catch (err) {
    res.json({ message: err.message });

    `Error: ${err.message}`;
    console.log(err);
    // res.json({message: err.message});
  }
};

module.exports = validateSession;
