module.exports = {

    login : (req,res) => {
        res.status(200).send('login page');
    },

    logout : (req,res) => {
        res.status(200).send('logout page');
    },

    googleLogin : (req,res) => {

    }
}