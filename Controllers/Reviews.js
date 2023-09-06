const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let reviews = [];

const generateID = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

app.post("/reviews", (req, res) => {
  const reviewData = req.body;
  reviewData.reviewID = generateID();
  reviews.push(reviewData);
  res.status(201).json(reviewData);
});

app.patch("/reviews/:reviewID", (req, res) => {
  const reviewID = req.params.reviewID;
  const updatedData = req.body;

  const reviewIndex = reviews.findIndex(
    (review) => review.reviewID === reviewID
  );

  if (reviewIndex === -1) {
    return res.status(404).json({ error: "Review not found" });
  }

  reviews[reviewIndex] = { ...reviews[reviewIndex], ...updatedData };
  res.status(200).json(reviews[reviewIndex]);
});

app.delete("/reviews/:reviewID", (req, res) => {
  const reviewID = req.params.reviewID;

  const reviewIndex = reviews.findIndex(
    (review) => review.reviewID === reviewID
  );

  if (reviewIndex === -1) {
    return res.status(404).json({ error: "Review not found" });
  }

  reviews.splice(reviewIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Review server is running on port ${port}`);
});
