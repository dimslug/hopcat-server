const router = require('express').Router();
const { response } = require('express');
const Influencer = require('../models/influencer.model');
const bcrypt = require(bcrypt);
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT;


//! Signup POST
router.post('/signup/influencer', async (req, res) =>  {

});

//! Login POST
router.post('/login/influencer', async(req, res) => {

});

//! Get all
router.get('/influencer/', async (req, res) => {

});

//! Get One by ID
router.get('/influencer/:id', async (req, res) => {

})


//! Update by ID
router.patch('/influencer/update/:id', async (req, res) => {

})


//! Delete by ID
router.delete('/influencer/delete/:id', async (req, res) => {

})

module.exports = router;