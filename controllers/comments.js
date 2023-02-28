const { Comment } = require('../models')

async function createComment(req, res) {
  try {
    const { comment, postId } = req.body
    const userId = req.user.id
    const createdComment = await Comment.create({ content: comment, postId, userId })
    res.status(201).json({
      comment: createdComment,
    })
    if (!comment) return res.status(400).json({ message: 'please provide comment' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

module.exports = {
  createComment
}