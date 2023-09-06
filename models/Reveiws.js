class Review {
  constructor(reviewID, drinkID, influencerID, rating, description, photo) {
    this.reviewID = reviewID;
    this.drinkID = drinkID;
    this.influencerID = influencerID;
    this.rating = rating;
    this.description = description;
    this.photo = photo;
  }
}

// Example usage:
const sampleReview = new Review(
  "R123",
  "D456",
  "I789",
  { stars: 4, maxStars: 5 },
  "A great drink! Highly recommended.",
  "https://example.com/review.jpg"
);

console.log(sampleReview);
