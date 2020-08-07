import passport from "passport";
import UserModel from "./user";

passport.use(UserModel.createStrategy());

const LocalStrategy = require("passport-local").Strategy;

passport.use(
    "login",
    new LocalStrategy(function(email, password, done) {
        UserModel.findOne({ email: email }, function(err, user) {
            if (err) {
                console.log(err);
            }
            if (!user) {
                return done(null, false, { message: "Wrong Email!" });
            }
            user.checkPassword(password, function(err, isMatch) {
                if (err) {
                    return done(err);
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Wrong PW!" });
                }
            });
        });
    })
);

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());