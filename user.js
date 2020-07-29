const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    school: String,
    undergrad_in: Number,
    major: String,
    name: String,
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, trim: true },
});
module.exports = mongoose.model("User", userSchema);