import UserModel from "../user";
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
        res.render("signup.html");
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
            res.redirect("/main");
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    }
};

export const postLogin = passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/main",
});

export const logout = (req, res) => {
    req.logout();
    res.redirect("/");
};