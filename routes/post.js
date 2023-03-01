const express = require('express')
const { getPost, createPost, updatePost, getPosts, deletePost } = require('../controllers/post')
const { checkAuth, decodeUserFromToken } = require('../middleware/auth')

const router = express.Router()

/*---------- Public Routes ----------*/
router.get('/:id', getPost)
router.get('/', getPosts)

/*---------- Protected Routes ----------*/
router.post('/', decodeUserFromToken, checkAuth, createPost)
router.put('/', decodeUserFromToken, checkAuth, updatePost)
router.delete('/:id', decodeUserFromToken, checkAuth, deletePost)

module.exports = router