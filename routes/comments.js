const router = require('express').Router()
const commentsCtrl = require('../controllers/comments')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

router.post('/', checkAuth, commentsCtrl.createComment)
router.get('/', commentsCtrl.getComments)

module.exports = router