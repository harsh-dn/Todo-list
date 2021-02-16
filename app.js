const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let extras = ["Buy Food", "Cook Food", "Eat Food"];
let extraworks = [];

app.get("/", function(req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-IN", options);
  res.render("list", {
    whichDay: day,
    item: extras
  });
});

app.get("/work", function(req, res) {
  res.render("list", {
    whichDay: "Work list",
    item: extraworks
  });
});

app.post("/", function(req, res) {
  let extra = req.body.newItem;
  if (req.body.list === "Work") {
    extraworks.push(extra);
    res.redirect("/work");
  } else {
    extras.push(extra);
    res.redirect("/");
  }
});


app.listen(3000, function() {
  console.log("seerver running at port 3000")
});
