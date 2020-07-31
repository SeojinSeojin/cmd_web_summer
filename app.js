import express from "express";
import user_router from "./routers/user_router";
const helmet = require("helmet");
const db = require("./db.js");

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
db();
app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + "/public"));
app.use(helmet());

app.get("/", (req, res) => res.render("index.html"));
app.get("/main/", (req, res) => res.render("main.html"));

app.use("/user", user_router);

export default app;