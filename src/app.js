const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { response } = require("express");

const geocode = require("../src/utils/geocode");
const forecast = require("../src/utils/forecast");

const app = express();

const pathDirectory = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");
console.log(viewsPath);
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

app.use(express.static(pathDirectory));

//app.use(express.static(homeDirectory));

app.set("view engine", "hbs");
//app.set("view engine", "hbs");
//app.use(express.static(homeDirectory));
// home page

app.get("/", (req, res) => {
  res.render("index", {
    author: "Sanjay",
    title: "Home"
  });
});

app.get("/aboutus", (req, res) => {
  res.render("aboutus", {
    author: "Sanjay",
    title: "About US"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    author: "Sanjay",
    message: "We will help you built cloud solutions",
    title: "Help"
  });
});
// weather page
app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({ error: "Address is mandatory" });
  }

  geocode(address, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    const { latitude, longitude } = data;
    console.log("data ", data);

    forecast(latitude, longitude, (error, result) => {
      if (error) {
        return res.send({ error: " forcast data not available for this address" });
      }
      res.send({
        address: address,
        title: "Weather",
        forecast: "Sunny",
        temperature: result.temperature,
        feelslike: result.feelslike
      });
    });
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "please mention the location" });
  }
  res.send({ city: "mumbai", title: "Weather" });
});

app.get("/help/*", (req, res) => {
  res.send("Help page not found");
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error page",
    author: "Sanjay",
    message: " You have reached the error page"
  });
});
app.listen(3000, () => {
  console.log("starting the server");
});
