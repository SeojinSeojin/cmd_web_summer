import express from "express";
import helmet from "helmet";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import user_router from "./routers/user_router";
import home_router from "./routers/home_router";
import { localMiddleware } from "./middleware";
import "./passport";

const app = express();
const CookieStore = MongoStore(session);

const db = require("./db.js");
const bodyParser = require("body-parser");
const express_sanitizer = require("express-sanitizer");
const flash = require("connect-flash");

app.use(helmet());
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express_sanitizer());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
db();
app.engine("html", require("ejs").renderFile);
app.use(
    session({
        secret: "tjwls@#@",
        resave: true,
        saveUninitialized: false,
        store: new CookieStore({ mongooseConnection: mongoose.connection }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware);

app.use("/", home_router);
app.use("/user", user_router);

export default app;