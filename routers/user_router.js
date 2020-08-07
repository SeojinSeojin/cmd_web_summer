import express from "express";
import {
    postAddUser,
    postLogin,
    logout,
    isAuthenticated,
    isNotAuthenticated,
} from "../controllers/user_controller";

const user_router = express.Router();

user_router.get("/profile/change/", isAuthenticated, (req, res) =>
    res.render("change_profile.html")
);
user_router.get("/profile/", isAuthenticated, (req, res) =>
    res.render("user_profile.html")
);

user_router.get("/signup/", isNotAuthenticated, (req, res) =>
    res.render("signup.html")
);
user_router.post("/signup/addUser", isNotAuthenticated, postAddUser, postLogin);

user_router.post("/login", isNotAuthenticated, postLogin);

user_router.get("/logout", isAuthenticated, logout);

module.exports = user_router;