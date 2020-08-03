const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    school: String,
    undergrad_in: Number,
    major: String,
    name: String,
    email: { type: String, required: true, unique: true, lowercase: true },
});
UserSchema.plugin(passportLocalMongoose, { usernameField: "name" });
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;