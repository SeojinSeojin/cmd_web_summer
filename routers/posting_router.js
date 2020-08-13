import express from "express";
import { isAuthenticated } from "../middleware";
import {
    postCreatePosting,
    getPostingDetail,
} from "../controllers/posting_controller";

const posting_router = express.Router();

posting_router.get("/create/", isAuthenticated, (req, res) =>
    res.render("posting_upload.ejs")
);

posting_router.post("/create/", isAuthenticated, postCreatePosting);

posting_router.get("/detail/:id", isAuthenticated, getPostingDetail);

module.exports = posting_router;