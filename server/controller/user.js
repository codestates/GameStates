
module.exports = {

    // API 문서 https://clout-tv.gitbook.io/api-docs-1/reference/api-reference/user-api
    getUserInfo: (req, res) => {
        res.end('getUserInfo');
    },

    modifyUserInfo: (req, res) => {
        res.end('modifyUserInfo');
    },

    deleteUserInfo: (req, res) => {
        res.end('deleteUserInfo');
    }
}