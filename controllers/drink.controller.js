const router = require("express").Router();
const { Drink, Creator } = require("../models");
const validateSession = require("../middleware/validate-session");
const { error, success, incomplete } = require("../helpers");
const log = console.log;

// !!Create -- POST
router.post('/create', validateSession, async (req, res) => {

    try {
    
        const creatorID = req.creator._id;
        const name = req.body.name;
        const cat1 = req.body.cat1;
        const cat2 = req.body.cat2;
        const cat3 = req.body.cat3;
        const price = req.body.price;
        const description = req.body.description;
        const photo = req.body.photo;
        const ingredients = req.body.ingredients;

        const drink = new Drink({
            creatorID: creatorID,
            name: name,
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
        const newName= req.body.name;
        const newCat1 = req.body.cat1;
        const newCat2 = req.body.cat2;
        const newCat3 = req.body.cat3;
        const newPrice = req.body.price;
        const newDescription = req.body.description;
        const newPhoto = req.body.photo;
        const newIngredients = req.body.ingredients;
        const updatedInfo = {
            name: newName, cat1: newCat1, cat2: newCat2, cat3: newCat3, price: newPrice, description: newDescription, photo: newPhoto, ingredients: newIngredients
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
router.delete("/:drinkID", validateSession, async (req, res) => {
    try {
      const drinkID = req.params.drinkID;
      const creatorID = req.creator._id;
   
      const deleteDrink = await Drink.deleteOne({
        _id: drinkID,
        creatorID: creatorID,
      });
  
      if (!deleteDrink) {
        return res
          .status(404)
          .json({ message: "Invalid Drink/Creator Combination" });
      }
    res.status(200).json({ message: "Drink has been deleted" });
    } catch (err) {
      error(res, err);
    }
  });

// !! Get All by creatorID -- GET
router.get("/creations/:creatorID/", async (req, res) => {
    try {
      const creatorID = req.params.creatorID;
      const getAllDrinks = await Drink.find({ creatorID: creatorID });
  
      getAllDrinks ? success(res, getAllDrinks) : incomplete(res);
    } catch (err) {
      error(res, err);
    }
  });

// !! Get One by drinkID -- GET
router.get("/getone/:drinkID/", async (req, res) => {
    try {
      log(req.params.drinkID)
      const drinkID = req.params.drinkID;
      const getDrink = await Drink.find({ _id: drinkID });
  
      getDrink ? success(res, getDrink) : incomplete(res);
    } catch (err) {
      error(res, err);
    }
  });


// !! Get by category -- GET
router.get("/bycategory/:cat1/:cat2/:cat3", async (req, res) => {
  try {
    log(req.params.cat1)
    log(req.params.cat2)
    log(req.params.cat3)
    const cat1 = req.params.cat1
    const cat2 = req.params.cat2
    const cat3 = req.params.cat3
    const getDrinkByCat = await Drink.find({$or: [
      {cat1: {$in: [cat1, cat2, cat3]}}, 
      {cat2: {$in: [cat1, cat2, cat3]}}, 
      {cat3: {$in: [cat1, cat2, cat3]}}
    ]
  });

    getDrinkByCat ? success(res, getDrinkByCat) : incomplete(res);
  } catch (err) {
    error(res, err);
  }
});

// !! Get by ingredient -- GET
router.get("/byingredient/:ing1/:ing2/:ing3", async (req, res) => {
  try {
    const ing1 = req.params.ing1
    const ing2 = req.params.ing2
    const ing3 = req.params.ing3
    const getDrinkByIng = await Drink.find({ 
      $or: [
        { ingredients: ing1 }, 
        { ingredients: ing2 },
        { ingredients: ing3 }
      ]
    });

    getDrinkByIng ? success(res, getDrinkByIng) : incomplete(res);
  } catch (err) {
    error(res, err);
  }
});

module.exports = router;