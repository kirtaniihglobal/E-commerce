const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log(authHeader, "Auth Header");
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token, "Token");
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
function generateJWTToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
}

module.exports = {
    verifyToken,
    generateJWTToken
};