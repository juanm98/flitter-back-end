const router = require('express').Router()
const commentsCtrl = require('../controllers/comments')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/
router.get('/', commentsCtrl.getComment)

/*---------- Protected Routes ----------*/
router.post('/', checkAuth, commentsCtrl.createComment)
router.delete('/', checkAuth, commentsCtrl.deleteComment)

module.exports = router