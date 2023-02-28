const { Post, Profile } = require('../models')
const profile = require('../models/profile')

async function show(req, res) {
  const id = req.params.id
  try {
    const post = await Post.findByPk(id, {
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'name'],
        include: { model: Profile, as: 'profile', attributes: ['photo'] },
      }
    })
    if (post) {
      return res.status(200).json(post)
    } else {
      return res.status(404).json({ err: 'Post not found' })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err })
  }
}

module.exports = {
  show,
  create
}