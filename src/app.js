const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Start app
const app = express();
const port = process.env.PORT || 3000;

// define paths to Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location and partials location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Hussein Mohamed",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Hussein Mohamed",
    age: 24,
    job: "Software Engineer",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Hussein Mohamed",
    helpText: "This is some helpful text.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      }); // End forecast
    }
  ); // End geocode
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404. Not Found.",
    name: "Hussein Mohamed",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404. Not Found.",
    name: "Hussein Mohamed",
    errorMessage: "Sorry, we can’t seem to find the page you are looking for.",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
