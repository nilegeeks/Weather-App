const request = require("request");

// Geocode
// Goal: Converts address into the exact geographical coordinates(latitude,longitude)
const geocode = (address, callback) => {
  // Free APi From https://www.mapbox.com
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaHVzc2Vpbm1vaHUiLCJhIjoiY2ttanBnNzg5MHRsZzJ3czI1ODJ5MDJ1diJ9.oDssYDMwapH2opl0U8_qYg&limit=1";

  // Start HTTP Request
  request({ url, json: true }, (error, response) => {
    if (error) {
      // Low-level error
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      // Invalid-input error
      callback("Unable to find location. Try another search.", undefined);
    } else {
      // response if there is no error
      const { center, place_name: place } = response.body.features[0];
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place,
      });
    }
  }); // End HTTP Request
}; // End geocode function

module.exports = geocode;
