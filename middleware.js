export const localMiddleware = (req, res, next) => {
    res.locals.user = req.user || null;
    console.log(req.user);
    next();
};

export const isAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/");
};

export const isNotAuthenticated = (req, res, next) => {
    if (req.user) {
        res.redirect("/");
    }
    next();
};