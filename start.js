const express = require("express");

const app = express();
const db = require("./db.js");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
db();
app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("index.html"));
app.get("/main/", (req, res) => res.render("main.html"));
app.get("/user/profile/change/", (req, res) =>
    res.render("change_profile.html")
);
app.get("/user/profile/", (req, res) => res.render("user_profile.html"));
app.get("/user/signup/", (req, res) => res.render("signup.html"));

const PORT = 3000;
app.listen(PORT, function() {
    console.log(`Server is listening on ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
});