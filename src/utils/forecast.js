const request = require("request");

const forecast = (logitude, latitude, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=53bbce1b42910ef191d66476ebd2d1b2&query=" + "latitude" + "," + "longitude";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Could not connect to API", undedined);
    } else if (body.error) {
      console.log("Provide the location to get weather details");
      callback("Provide the correct latitude and longitude to get weather details", undedined);
    } else {
      //data = response.body;
      const { temperature, feelslike } = body.current;
      //console.log(response.body.current.temperature);
      console.log("temperature ", temperature);
      callback(undefined, { temperature, feelslike });
    }
  });
};

module.exports = forecast;
