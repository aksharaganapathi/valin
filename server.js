/*jshint esversion: 6 */

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

let currentYear = new Date().getFullYear();

app.use(express.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("list", {final: "", currency: "", secondCurrency: "", input: "", equal: "", year: currentYear});
});

app.get("/converter.css", function(req, res) {
  res.sendFile(__dirname + "/" + "converter.css");
});

app.get('/default.png', function(req, res) {
  res.sendFile(__dirname + "/" + "default.png");
});

app.get('/favicon.ico', function(req, res) {
  res.sendFile(__dirname + "/" + "favicon.ico");
});

app.get('/converter.js', function(req, res) {
  res.sendFile(__dirname + "/" + "converter.js");
});

app.post("/", function(req, res) {
  let firstCurrency = req.body.firstInput;
  let secondCurrency = req.body.secondInput;
  let combine = firstCurrency + "_" + secondCurrency;
  let url = "https://free.currconv.com/api/v7/convert?q=" + combine + "&apiKey=7da432c8c2149df20638";
  let input = req.body.input;

  https.get(url, function(response) {
    console.log(response.statusCode);
    if(response.statusCode > 299 || response.statusCode < 200)
      {
          res.render("error", {year: currentYear});
          return;
      }

    response.on("data", function(data) {
      const currencyData = JSON.parse(data);
      const exchangeRate = currencyData.results[combine].val;
      let convertedValue = input * exchangeRate;
      let roundedValue = convertedValue.toFixed(2);
      res.render("list", {final: roundedValue, currency: firstCurrency, secondCurrency: secondCurrency, input: input, equal: "is equal to", error: false, year: currentYear});
    });
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started");
});
