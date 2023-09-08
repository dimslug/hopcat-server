const router = require('express').Router();
const { response } = require('express');
const Influencer = require('../models/influencer.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');
const SECRET = process.env.JWT;

const errorResponse = (res, error) => {
    return(
        res.status(500).json({
            error: error.message
        })
    )
}


//! Signup POST
router.post('/influencer/signup', async (req, res) =>  {
    try{
        
        const influencer = new Influencer({
            username: req.body.username,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            password: bcrypt.hashSync(req.body.password, 13)
        })

        const newInfluencer = await influencer.save();

        const token = jwt.sign({id: newInfluencer._id}, SECRET, {expiresIn: "1 day"});

        res.status(200).json({
            influencer: newInfluencer,
            message: 'success',
            token
        })
    } catch (err) {
        errorResponse(res, err)
    }

});

//! Login POST
router.post('/influencer/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        const influencer = await Influencer.findOne({email: email});

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!user || !password) throw new Error('Email or Password does not match');

        const token = jwt.sign({id: user._id}. SECRET, {expiresIn: "1 day"});

        req.status(200).json({
            message: 'success',
            user,
            token
        })

    }   catch (err) {
        errorResponse(res, err)
    }


});

//! Get all
router.get('/influencer/' , validateSession, async (req, res) => {
    try {

        const getAllInfl = await Influencer.find();

        gettAllInfl ?
            res.status(200).json({
                getAllInfl
            }) :
            res.status(404).json({
                message: `No rooms(s) Found`
            });                          

    } catch (err) {
        errorResponse(res, err)
    }
});

//! Get One by ID
router.get('/influencer/:id', validateSession, async (req, res) => {
    try {
        const { _id } = req.params;
        const getInfl = await Influencer.findOne( {id: _id} );

        getInfl ?
            res.status(200).json({
                getInfl
            }) :
            res.status(404).json({
                message: 'no influencer found'
            })
    }   catch (err) {
        errorResponse(res, err)
    }
})


//! Update by ID
router.patch('/influencer/update/:id', validateSession, async (req, res) => {
    try {
        const { id } = req.params;

        const filter = {_id: id}

        const info = req.body;

        const returnOption = {new: true};

        const update = await Influencer.findOneAndUpdate(filter, info, returnOption);

        res.status(200).json({
            message: `${updates.username} Updated!`,
            update
        })
    } catch (err) {
        errorResponse(res, err)
    }
})


//! Delete by ID
router.delete('/influencer/delete/:id', validateSession, async (req, res) => {
    try {
        const { id } = req.params;

        const deleteInfl = await Influencer.deleteOne({_id: id});

        deleteRoom.deleteCount ?
            res.status(200).json({message: 'Influencer Deleted'}) :
            req.status(404).json({message: 'No Influencer Found'})

    } catch (err) {
        errorResponse(res, err);
    }
})

module.exports = router;