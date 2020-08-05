import express from "express";

const home_router = express.Router();

home_router.get("/", (req, res) => res.render("index.html"));
home_router.get("/main/", (req, res) => res.render("main.html"));

module.exports = home_router;