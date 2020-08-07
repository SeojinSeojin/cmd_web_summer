const mongoose = require("mongoose");

const PostingSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId },
});

const PostingModel = mongoose.model("Posting", PostingSchema);
export default PostingModel;