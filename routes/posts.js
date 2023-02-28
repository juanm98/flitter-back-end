const router = require('express').Router()
const postsCtrl = require('../controllers/posts.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/
router.get('/:id', postsCtrl.getPost)
router.get('/', postsCtrl.getPosts)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, postsCtrl.createPost)
router.put('/', checkAuth, postsCtrl.updatePost)
router.delete('/:id', checkAuth, postsCtrl.deletePost)

module.exports = router