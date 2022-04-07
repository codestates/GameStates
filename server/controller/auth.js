const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const { user: User } = require('../models');

module.exports = {

    login: (req, res) => {
        res.end('login page');
    },

    logout: (req, res) => {
        res.end('logout page');
    },

    signup: (req, res) => {
        res.end('signup page');
    },

    email: (req, res) => {
        res.end('email page');
    },

    googleLogin: (req, res) => {
        // redirect to google login
        return res.redirect(
            `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&client_id=${process.env.GOOGLE_CLIENT_ID}`
        )
    },

    googleCallback: async (req, res) => {
        // authorization code
        const { code } = req.query;
        try {
            // Exchange authorization code for refresh tokens and access tokens
            const result = await axios.post(
                `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`
            );
            // Calling Google APIs with access token
            const userInfo = await axios.get(
                `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${result.data.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${result.data.access_token}`,
                    },
                }
            );
            const user = await User.findOrCreate({
                where: {
                    email: userInfo.data.email
                },
                defaults: {
                    email: userInfo.data.email,
                    role: 0,
                    password: '',
                    nickname: userInfo.data.name,
                }
            });

            console.log(user[0]);

            res.redirect('http://localhost:4000');

        } catch (error) {
            res.sendStatus(500);
        }
    },


}