import express from "express";
import { postAddUser } from "../controllers/user_controller";

const user_router = express.Router();

user_router.get("/profile/change/", (req, res) =>
    res.render("change_profile.html")
);
user_router.get("/profile/", (req, res) => res.render("user_profile.html"));
user_router.get("/signup/", (req, res) => res.render("signup.html"));
user_router.post("/signup/addUser", postAddUser);

module.exports = user_router;