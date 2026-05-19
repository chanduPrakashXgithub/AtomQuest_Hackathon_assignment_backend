module.exports = (...roles) => {
    return (req, res, next) => {
        // If authMiddleware didn't set req.user, deny access
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        next();
    };
};