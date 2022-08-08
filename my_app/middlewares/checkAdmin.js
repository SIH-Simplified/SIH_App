const checkAdmin = async (req, res, next) => {
    const authToken = req.headers["x-oauth-token"];
    try {
        const payload = JWT.verify(authToken, process.env.AUTH_SECRECT, {
            maxAge: process.env.AUTH_EXPIRATION_TIME
        });
        const adminId = payload.sub;
        const admin = await Admin.find({ _id: adminId });
        if (!admin) {
            res.redirect(401, "/login", { error: "Admin does not exist , please contact your admin to access this page" });
        }

        if (admin.isAdmin === 0) {
            res.redirect(403, "/login", { error: "Admin does not have right to access this route" });
        }
        next();
    } catch (error) {
        res.redirect("/login", { error });
        next(error);
    }
}

module.exports = checkAdmin;