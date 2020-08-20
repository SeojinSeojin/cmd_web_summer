import express from "express";
import {
    postAddUser,
    postLogin,
    logout,
    postChangeProfile,
} from "../controllers/user_controller";
import { isAuthenticated, isNotAuthenticated } from "../middleware";

const user_router = express.Router();

user_router.get("/profile/change/", isAuthenticated, (req, res) =>
    res.render("change_profile.ejs", { req: req, p: 3 })
);
user_router.post("/profile/change/", isAuthenticated, postChangeProfile);

user_router.get("/profile/", isAuthenticated, (req, res) =>
    res.render("user_profile.ejs", { req: req, p: 1 })
);

user_router.get("/signup/", isNotAuthenticated, (req, res) =>
    res.render("signup.ejs")
);
user_router.post("/signup/addUser", isNotAuthenticated, postAddUser, postLogin);

user_router.post("/login", isNotAuthenticated, postLogin);

user_router.get("/logout", isAuthenticated, logout);

module.exports = user_router;