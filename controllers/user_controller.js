import UserModel from "../user";

export const postAddUser = async(req, res) => {
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
            res.redirect("/main");
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    }
};