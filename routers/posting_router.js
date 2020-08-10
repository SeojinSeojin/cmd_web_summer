import express from "express";
import { isAuthenticated } from "../controllers/user_controller";
import PostingModel from "../db/posting";

const posting_router = express.Router();

posting_router.get("/create/", isAuthenticated, (req, res) =>
    res.render("posting_upload.html")
);

posting_router.post("/create/", isAuthenticated, (req, res) => {
    const posting = new PostingModel({
        title: req.body.title,
        content: req.body.content,
        creator: req.user.id,
        ifAnonymous: req.ifAnonymous ? true : false,
    });

    posting.save(function(err) {
        if (err) {
            console.log(err);
            res.render("posting_upload.html");
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
            if (postingmodel.isAnonymous)
                res.render("posting_detail.html", { post: postingmodel });
        }
    });
});

module.exports = posting_router;