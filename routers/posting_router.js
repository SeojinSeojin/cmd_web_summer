import express from "express";
import { isAuthenticated } from "../middleware";
import PostingModel from "../db/posting";
import UserModel from "../db/user";

const posting_router = express.Router();

posting_router.get("/create/", isAuthenticated, (req, res) =>
    res.render("posting_upload.ejs")
);

posting_router.post("/create/", isAuthenticated, (req, res) => {
    const posting = new PostingModel({
        title: req.body.title,
        content: req.body.content,
        creator: req.user._id,
        ifAnonymous: req.ifAnonymous ? true : false,
    });

    posting.save(function(err) {
        if (err) {
            console.log(err);
            res.render("posting_upload.ejs");
        } else {
            res.redirect(`/posting/detail/${posting._id}`);
        }
    });
});

posting_router.get("/detail/:id", (req, res) => {
    PostingModel.findOne({ _id: req.params.id }).exec(function(
        err,
        postingmodel
    ) {
        if (err) {
            console.log(err);
        } else {
            console.log(postingmodel);
            UserModel.findOne({
                _id: postingmodel.creator,
            }).exec(function(err, post_creator) {
                if (err) {
                    console.log(err);
                } else {
                    const post_creator_name = post_creator.name;
                    console.log(post_creator_name);
                    res.render("posting_detail.ejs", {
                        post: postingmodel,
                        creator: post_creator_name,
                    });
                }
            });
        }
    });
});

module.exports = posting_router;