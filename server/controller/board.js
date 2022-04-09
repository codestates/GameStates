const { board, comment, user } = require('../models');

module.exports = {

    getPost: async (req, res) => {
        const a = await user.findOne({
            where: { id: 2 },
            include: [
                {
                    model: comment,
                    include: [
                        { model: board }
                    ]
                }
            ]
        })
        console.log(a);
        res.send(a);
    },

    writePost: (req, res) => {
        res.end('write post page');
    },

    modifyPost: (req, res) => {
        res.end('modify post page');
    },

    deletePost: (req, res) => {
        res.end('delete post page');
    }
}