const { Post } = require('../models')

async function create(req, res) {
  try {
		req.body.posterId = req.user.profile.id
    const post = await Post.create(req.body)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

module.exports = {
  create
}