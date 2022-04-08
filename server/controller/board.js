const {user:User,comment:Comment, board:Board} = require('../models');
 
module.exports = {

    getPost : async (req, res) => {
        const a = await User.findOne({
            where:{id:2},
            include:[
                {
                    model:Comment
                }
            ],
        });

        console.log(a);
        res.send(a);
    },

    writePost : (req, res) => {
        res.end('write post page');
    },

    modifyPost : (req, res) => {
        res.end('modify post page');
    },

    deletePost : (req, res) => {
        res.end('delete post page');
    }
}