// This file contains the reverse geocoding function using OpenRouteService API
async function reverseGeocode(lat, lng) {
    try {
      const response = await axios.get(
        `https://api.openrouteservice.org/geocode/reverse`,
        {
          params: {
            api_key: process.env.ORS_API_KEY,
            'point.lat': lat,
            'point.lon': lng
          }
        }
      );
  
      return response.data.features[0].properties.label;
    } catch (error) {
      console.error("ORS Reverse Geocoding error:", error.message);
      return null;
    }
  }
  