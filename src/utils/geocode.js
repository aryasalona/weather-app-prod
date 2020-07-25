const request = require("request");
const geocode = (address, callback) => {
  if (!address) {
    return callback("Invalid Address", undefined);
  }
  console.log("illegal");
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoic2FuamF5YXBpIiwiYSI6ImNrY3UxdjM5ejB5OHcycHA0NDgyNDk4MXAifQ._IUsQMVij3ocm53X7A6caw";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("could not connect, check url", undefined);
    } else if (body.features.length === 0) {
      callback("Please input a proper address", undefined);
    } else {
      const latitude = body.features[0].center[0];
      const longitude = body.features[0].center[1];

      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        placename: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
