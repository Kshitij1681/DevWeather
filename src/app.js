const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 5000;

// public static path
const utilityPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//here, for route "/", express will by default search "index.html" in public directory and server it if exists bcoz according to convention followed by many web servers and framweworks, "index.html" is used as default entry point or landing page for a website
app.use("/", express.static(utilityPath));

//setting view directory
app.set("views", viewPath);

// setting view engine
app.set("view engine", "hbs");

// registering partials
hbs.registerPartials(partialPath);

//routing
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.get("*", (req, res) => {
  res.render("error404", {
    errorMsg: "Oops! Page Not Found",
  });
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
