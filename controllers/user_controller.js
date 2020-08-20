import UserModel from "../db/user";
import passport from "passport";

export const postAddUser = async(req, res, next) => {
    const school = req.sanitize(req.body.school);
    const undergrad_in = req.sanitize(req.body.undergrad_in);
    const major = req.sanitize(req.body.major);
    const name = req.sanitize(req.body.name);
    const email = req.sanitize(req.body.email);
    const password = req.sanitize(req.body.password);
    const password2 = req.sanitize(req.body.password2);

    if (password !== password2) {
        res.render("signup.ejs");
    } else {
        try {
            const user = await UserModel({
                school,
                undergrad_in,
                major,
                name,
                email,
            });
            await UserModel.register(user, password);
            next();
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    }
};

export const postLogin = passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/main",
});

export const logout = (req, res) => {
    req.logout();
    res.redirect("/");
};

export const postChangeProfile = (req, res) => {
    UserModel.findById(req.user._id, (err, user) => {
        if (!user) {
            console.log("no user");
            return logout(req, res);
        }
        console.log(user);
        const name = req.sanitize(req.body.name);
        const password = req.sanitize(req.body.password);
        /*
            user.checkPassword(password, function(err, isMatch) {
                if (err) {
                    console.log(err);
                    res.redirect("/");
                }
                if (isMatch) {*/
        user.name = name;
        user.save(function(err) {
            if (err) {
                console.log(err);
                res.redirect("/");
            }
            res.redirect("/user/profile/");
        });
        /*
                   } else {
                       res.redirect("/user/profile/change");
                   }
               });*/
    });
};