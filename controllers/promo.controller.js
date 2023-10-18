const router = require("express").Router();
const { Drink, Creator, Promo } = require("../models");
const validateSession = require("../middleware/validate-session");
const { error, success, incomplete } = require("../helpers");
const log = console.log;

// !!Create -- POST
router.post("/:drinkID/create", validateSession, async (req, res) => {
  try {
    const creatorID = req.creator._id;
    const drinkID = req.params.drinkID;
    // const influencerID = req.body.influencerID;
    const promoText = req.body.promoText;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;


    try {
  
        const creatorID = req.creator._id;
        const drinkID = req.params.drinkID;
        // const influencerID = req.body.influencerID;
        const promoText = req.body.promoText;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const promoPlace = req.body.promoPlace;

        const promo = new Promo({
            creatorID: creatorID,
            drinkID: drinkID,
            // influencerID: influencerID,
            promoText: promoText,
            startDate: startDate,
            endDate: endDate,
            promoPlace: promoPlace,
          
        });

        const newPromo = await promo.save();
        newPromo ? success(res, newPromo) : incomplete(res);



    } catch (err) {
        error(res, err)
    }
})

// !! Get All by creatorID -- GET
router.get("/:creatorID/", validateSession, async (req, res) => {
    try {
      const creatorID = req.params.creatorID;
      const getAllPromos = await Promo.find({ creatorID: creatorID });
  
      getAllPromos ? success(res, getAllPromos) : incomplete(res);
    } catch (err) {
      error(res, err);
    }
  });


  // !! Get One by drinkID -- GET
router.get("/getone/:promoID/", validateSession, async (req, res) => {
  try {
    log(req.params.promoID)
    const promoID = req.params.promoID;
    const getPromo = await Promo.find({ _id: promoID });

    getPromo ? success(res, getPromo) : incomplete(res);
  } catch (err) {
    error(res, err);
  }
});


// !! Update -- PATCH
router.patch("/edit/:promoID", validateSession, async (req, res) => {

    try {
        const promoID = req.params.promoID;
        const creatorID = req.creator._id;
        // const newInfluencerID = req.body.influencerID;
        const newPromoText = req.body.promoText;
        const newStartDate = req.body.startDate;
        const newEndDate = req.body.endDate;
        const newPromoPlace = req.body.promoPlace

        const updatedInfo = {
            // influencerID: newInfluencerID, 
            promoText: newPromoText, startDate: newStartDate, endDate: newEndDate, promoPlace: newPromoPlace
        }
        const updatedPromo = await Promo.findOneAndUpdate(
            { _id: promoID, creatorID: creatorID }, updatedInfo, { new: true }
        );
        if (!updatedPromo) {
            return res
            .status(404)
            .json({ message: "Invalid Promo/Creator Combination" });
        }
        res
      .status(200)
      .json({ message: "Promo has been updated", updatedPromo });

    } catch (err) {
        error(res, err)

    }
    res.status(200).json({ message: "Promo has been updated", updatedPromo });
  } catch (err) {
    error(res, err);
  }
});

// !! Delete -- DELETE
router.delete("/delete/:promoID", validateSession, async (req, res) => {
  try {
    const promoID = req.params.promoID;
    const creatorID = req.creator._id;

    const deletePromo = await Promo.deleteOne({
      _id: promoID,
      creatorID: creatorID,
    });

    if (!deletePromo) {
      return res
        .status(404)
        .json({ message: "Invalid Promo/Creator Combination" });
    }
    res.status(200).json({ message: "Promo has been deleted" });
  } catch (err) {
    error(res, err);
  }
});
//!Calender
// Create a listener for new promos.
app.post("/promos", async (req, res) => {
  // Create the new promo.
  const promo = new Promo(req.body);

  // Save the new promo to the database.
  await promo.save();

  // Send a notification to the client.
  await axios.post("/calendar/update", {
    promo: promo,
  });

  res.sendStatus(201);
});

module.exports = router;
