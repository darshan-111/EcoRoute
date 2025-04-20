const axios = require('axios');
const ORS_API_KEY = process.env.ORS_API_KEY;
// function to get route data from OpenRouteService (ORS)
async function getORSRoute(start, end, profile = 'driving-car') {
  try {
    const response = await axios.post(
      `https://api.openrouteservice.org/v2/directions/${profile}/geojson`,
      {
        coordinates: [
          [start.lng, start.lat],
          [end.lng, end.lat]
        ]
      },
      {
        headers: {
          Authorization: process.env.ORS_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    const summary = response.data.features[0].properties.summary;
    return {
      distanceKm: summary.distance / 1000, // meters to km
      durationMin: summary.duration / 60   // seconds to minutes
    };
  } catch (error) {
    console.error("ORS Route error:", error.message);
    throw new Error("Failed to fetch route from ORS");
  }
}

module.exports = { getORSRoute };
