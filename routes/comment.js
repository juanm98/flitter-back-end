const express = require('express')
const { createComment, getComments, deleteComment } = require('../controllers/comment')
const { deletePost } = require('../controllers/post')
const { decodeUserFromToken, checkAuth } = require('../middleware/auth')

const router = express.Router()

/*---------- Public Routes ----------*/
router.get('/', getComments)

/*---------- Protected Routes ----------*/
router.post('/', decodeUserFromToken, checkAuth, createComment)
router.delete('/:id', decodeUserFromToken, checkAuth, deleteComment)

module.exports = router
