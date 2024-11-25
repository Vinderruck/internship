export const Authentication = (req, res, next) => {
    // Ensure the session exists and the User property is set
    if (req.session && req.session.User) {
        return next(); // Allow access to the protected route
    } else {
        return res.status(407).json({ message: 'Cookie authentication failed' });
    }
};
