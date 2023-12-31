const { Influencer } = require("../models/influencer.model");
const { Creator } = require("../models/creator.model");
const axios = require("axios");

const mapQuestApiKey = process.env.W91DavtCELfljdRpvhWfjwqptodf5zHx;

async function findCreatorsNearInfluencer(influencerCityLocation) {
  const geocodingRequest = {
    key: mapQuestApiKey,
    q: influencerCityLocation,
  };

  const geocodingResponse = await axios.get(
    `https://www.mapquestapi.com/geocoding/v1/address`,
    {
      params: geocodingRequest,
    }
  );

  const influencerCoordinates = geocodingResponse.data.locations[0].latLng;

  const creatorsNearInfluencer = await Creator.find({
    location: {
      $near: influencerCoordinates,
      $maxDistance: 10000, // 10 km
    },
  }).sort({
    location: {
      $geoWithin: {
        $centerSphere: [
          [influencerCoordinates[0], influencerCoordinates[1]],
          10000 / 6371,
        ], // 10 km radius
      },
    },
  });

  return creatorsNearInfluencer;
}

app.get("/influencers/find-creators-nearby", async (req, res) => {
  const influencerCityLocation = req.query.influencerCityLocation;

  const creatorsNearInfluencer = await findCreatorsNearInfluencer(
    influencerCityLocation
  );

  res.json(creatorsNearInfluencer);
});

module.exports = findCreatorsNearInfluencer
