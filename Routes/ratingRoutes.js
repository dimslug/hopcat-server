const Drink = require("../models/drink.model");

const newRating = 4;
const drinkId = "someDrinkId";

const drink = await Drink.findById(drinkId);

if (drink) {
  try {
    const currentAverageRating = drink.averageRating;
    const currentNumRatings = drink.numRatings;

    const newAverageRating =
      (currentAverageRating * currentNumRatings + newRating) /
      (currentNumRatings + 1);

    drink.averageRating = newAverageRating;
    drink.numRatings = currentNumRatings + 1;

    await drink.save();

    res.status(200).json({
      message: "Rating submitted successfully",
      updatedDrink: drink,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
} else {
  res.status(404).json({ error: "Drink not found" });
}
