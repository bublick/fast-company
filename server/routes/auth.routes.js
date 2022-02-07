const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const { generateUserData } = require("../utils/helpers");
const tokenService = require("../services/token.service");
const Token = require("../models/Token");

router.post("/signUp", [
    check("email", "INVALID EMAIL ADDRESS").isEmail(),
    check("password", "MINIMAL PASSWORD LENGHT 8 SYMBOLS").isLength({ min: 8 }),
    async (req, res) => {
        try {
            // check errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400
                        //errors: errors.array()
                    }
                });
            }

            const { email, password } = req.body;

            // check existing user
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL_EXISTS",
                        code: 400
                    }
                });
            }

            // generate new user data
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = await User.create({
                ...generateUserData(),
                ...req.body,
                password: hashedPassword
            });
            const tokens = tokenService.generate({
                _id: newUser._id
            });

            // save it to db and return response
            await tokenService.save(newUser._id, tokens.refreshToken);
            return res.status(201).send({ ...tokens, userId: newUser._id });
        } catch (error) {
            res.status(500).json({
                message: "Server-side error"
            });
        }
    }
]);

router.post("/signInWithPassword", [
    check("email", "INVALID EMAIL").normalizeEmail().isEmail(),
    check("password", "INVALID PASSWORD").exists(),
    async (req, res) => {
        try {
            // validate
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400
                    }
                });
            }

            // find user
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email: email });

            if (!existingUser) {
                return res.status(400).send({
                    error: {
                        message: "EMAIL_NOT_FOUND.",
                        code: 400
                    }
                });
            }

            // comparing passwords
            const isPasswordEqual = bcrypt.compare(
                password,
                existingUser.password
            );
            if (!isPasswordEqual) {
                return res.status(400).send({
                    error: {
                        message: "INVALID_PASSWORD",
                        code: 400
                    }
                });
            }

            // generating tokens
            const tokens = tokenService.generate({ _id: existingUser._id });
            await tokenService.save(existingUser._id, tokens.refreshToken);

            return res
                .status(200)
                .send({ ...tokens, userId: existingUser._id });
        } catch (error) {
            res.status(500).json({
                message: "Server-side error"
            });
        }
    }
]);

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data._id !== dbToken.user?.toString();
}

router.post("/token", async (req, res) => {
    try {
        const { refresh_token: refreshToken } = req.body;
        const data = tokenService.validateRefresh(refreshToken);
        const dbToken = await tokenService.findToken(refreshToken);

        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const tokens = await tokenService.generate({
            _id: dbToken.user.toString()
        });
        await tokenService.save(data._id, tokens.refreshToken);

        return res.status(200).json({ ...tokens, userId: data._id });
    } catch (error) {
        res.status(500).json({
            message: "Server-side error"
        });
    }
});

module.exports = router;
