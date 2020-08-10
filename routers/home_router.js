import express from "express";
import { isAuthenticated } from "../controllers/user_controller";

const home_router = express.Router();

home_router.get("/", (req, res) => res.render("index.ejs"));
home_router.get("/main/", isAuthenticated, (req, res) =>
    res.render("main.ejs", { req: req })
);

module.exports = home_router;