const router = require("express").Router();
const { Drink, Creator } = require("../models");
const validateSession = require("../middleware/validate-session");
const { error, success, incomplete } = require("../helpers");
const log = console.log;

// !!Create -- POST
router.post('/:creatorID/create', validateSession, async (req, res) => {

    try {
        const { text } = req.body;
        const creatorID = req.params.creatorID;
        const cat1 = req.body.cat1;
        const cat2 = req.body.cat2;
        const cat3 = req.body.cat3;
        const price = req.body.price;
        const description = req.body.description;
        const photo = req.body.photo;
        const ingredients = req.body.ingredients;

        const drink = new Drink({
            creatorID: creatorID,
            cat1: cat1,
            cat2: cat2,
            cat3: cat3,
            price: price,
            description: description,
            photo: photo,
            ingredients: ingredients
        });

        const newDrink = await drink.save();
        newDrink ? success(res, newDrink) : incomplete(res);



    } catch (err) {
        error(res, err)
    }
})

// !! Update -- PATCH
router.patch("/:drinkID", validateSession, async (req, res) => {
    try {
        const drinkID = req.params.drinkID;
        const creatorID = req.creator._id
        const newCat1 = req.body.cat1;
        const newCat2 = req.body.cat2;
        const newCat3 = req.body.cat3;
        const newPrice = req.body.price;
        const newDescription = req.body.description;
        const newPhoto = req.body.photo;
        const newIngredients = req.body.ingredients;
        const updatedInfo = {
            cat1: newCat1, cat2: newCat2, cat3: newCat3, price: newPrice, description: newDescription, photo: newPhoto, ingredients: newIngredients
        }
        const updatedDrink = await Drink.findOneAndUpdate(
            { _id: drinkID, creatorID: creatorID }, updatedInfo, { new: true }
        );
        if (!updatedDrink) {
            return res
            .status(404)
            .json({ message: "Invalid Drink/Creator Combination" });
        }
        res
      .status(200)
      .json({ message: "Drink has been updated", updatedDrink });

    } catch (err) {
        error(res, err)
    }
})

// !! Delete -- DELETE

// !! Get All by creatorID -- GET

// !! Get One by drinkID -- GET

// !! Get by category -- GET

// !! Get by ingredient -- GET