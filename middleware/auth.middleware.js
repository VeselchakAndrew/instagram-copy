const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../options/key");


module.exports = (req, res, next) => {

    console.log(req.headers);

    //Get token from header
    const {authorization} = req.headers;

    //Check if not token
    if (!authorization) {
        return res.status(401).json({msg: "No token, authorization denied"});
    }

    try {
        const token = authorization.slice(7);
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        console.log("Decoded", decoded);
        console.log(req.user);
        next();

    } catch (err) {
        res.status(401).json({msg: "Token is not valid"});
    }
};