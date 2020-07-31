import express from "express";

const user_router = express.Router();

user_router.get("/profile/change/", (req, res) =>
    res.render("change_profile.html")
);
user_router.get("/profile/", (req, res) => res.render("user_profile.html"));
user_router.get("/signup/", (req, res) => res.render("signup.html"));

module.exports = user_router;