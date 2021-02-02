const {Router} = require("express");
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {JWT_SECRET} = require("../options/key");

const User = require("../models/user");

router = new Router();

router.get("/", (req, res) => {
    res.send("Hello from Auth!");
});

router.post(
    "/signup",
    [
        check("name", "Name is required").exists().notEmpty(),
        check("email", "Use a valid email").exists().isEmail(),
        check("password", "Must be at least 5 symbols")
            .exists()
            .isLength({min: 5}),
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {name, email, password} = req.body;

        try {
            let user = await User.findOne({email});

            if (user) {
                return res.status(400).json({message: "User already exist"});
            }

            user = new User({
                name,
                email,
                password,
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();
            res.json({message: "User successfully saved"});

        } catch (error) {
            return res.status(500).json({message: "Server error"});
        }
    }
);

router.post("/signin", [
    [
        check("email", "Email is required").exists().isEmail(),
        check("password", "Password is required").exists()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Incorrect password"});
        }
        const token = await jwt.sign({id: user._id}, JWT_SECRET);
        res.status(200).json({token});
    } catch (error) {
        return res.status(500).json({message: "Server error"});
    }

});

module.exports = router;
