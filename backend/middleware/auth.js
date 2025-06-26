const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log(authHeader, "Auth Header");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ status: 401, msg: "Token not Found" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ status: 403, msg: "Error in  Token Verify" });
        if (!user || user.isBlocked) {
            return res.status(500).json({ status: false, msg: "User is Blocked" })
        }
        req.user = user;
        next();
    });
}
function generateJWTToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
}
module.exports = {
    verifyToken,
    generateJWTToken
};