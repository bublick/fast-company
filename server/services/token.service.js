const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/Token");

class TokenService {
    // generate tokens and complete output
    generate(payload) {
        const accessToken = jwt.sign(payload, config.get("accessSecret"), {
            expiresIn: "1h"
        });

        const refreshToken = jwt.sign(payload, config.get("refreshSecret"), {
            expiresIn: "1h"
        });

        return {
            accessToken,
            refreshToken,
            expiresIn: 3600
        };
    }

    // save refresh token for user
    async save(user, refreshToken) {
        const data = await Token.findOne({ user });
        if (data) {
            data.refreshToken = refreshToken;
            return data.save();
        }

        const token = await Token.create({ user, refreshToken });
        return token;
    }

    // validate token refresh
    validateRefresh(refreshToken) {
        try {
            return jwt.verify(refreshToken, config.get("refreshSecret"));
        } catch (error) {
            return null;
        }
    }

    async findToken(refreshToken) {
        try {
            return await Token.findOne({ refreshToken });
        } catch (error) {
            return null;
        }
    }
}

module.exports = new TokenService();
