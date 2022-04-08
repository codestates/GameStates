
module.exports = {

    writeComment : (req, res) => {
        res.end('write comment')
    },

    modifyComment : (req, res) => {
        res.end('modify comment');
    },

    deleteComment : (req, res) =>{
        res.end('delete comment');
    }
}