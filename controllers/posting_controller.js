import PostingModel from "../db/posting";
import UserModel from "../db/user";

export const postCreatePosting = (req, res) => {
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
};

export const getPostingDetail = (req, res) => {
    PostingModel.findOne({ _id: req.params.id }).exec(function(
        err,
        postingmodel
    ) {
        if (err) {
            console.log(err);
        } else {
            UserModel.findOne({
                _id: postingmodel.creator,
            }).exec(function(err, post_creator) {
                if (err) {
                    console.log(err);
                } else {
                    if (!post_creator) {
                        res.render("posting_detail.ejs", {
                            post: postingmodel,
                            creator: "알수없음",
                        });
                    } else {
                        const post_creator_name = post_creator.name;
                        res.render("posting_detail.ejs", {
                            post: postingmodel,
                            creator: post_creator_name,
                        });
                    }
                }
            });
        }
    });
};

export const getPostingList = (req, res) => {
    PostingModel.find({}, (err, postings) => {
        res.render("postings.ejs", { postings: postings });
    });
};