const request = require("request");

// Forecast
// Goal: Find weather by using (latitude, longitude) for any address
const forecast = (latitude, longitude, callback) => {
  // Free Weather Api form https://weatherstack.com
  const url =
    "http://api.weatherstack.com/current?access_key=40a885eb7f466c498186ef8789127218&query=" +
    longitude +
    "," +
    latitude;

  // Start HTTP Request
  request({ url, json: true }, (error, response) => {
    if (error) {
      // Low-level error
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      // Invalid-input error
      callback("Unable to find location. Try valid location", undefined);
    } else {
      // in case things went well
      const {
        temperature,
        feelslike,
        weather_descriptions: weather,
        humidity,
      } = response.body.current;

      callback(
        undefined,
        `${weather}. It's currently ${temperature} degrees out.
        it's feels like ${feelslike} degrees out. The humidity is ${humidity}%.`
      );
    }
  }); // End request
}; // End forecast function

module.exports = forecast;
