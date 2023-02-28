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

async function getComments(req, res) {
  const postId = req.body.postId;
  if (!postId) return res.status(400).json({ message: 'Please provide post id' })
  try {
      const { count, rows } = await Comment.findAndCountAll({
          where: {
              postId,
          },
          include: {
              model: User,
              as: 'user',
              attributes: ['name', 'email', 'id'],
              include: {
                  model: Profile,
                  as: 'profile',
                  attributes: ['photo'],
              },
          },
      })
      return res.status(200).json({ totalComments: count, comments: rows })
  } catch (err) {
      console.log(err)
      res.status(500).json(err)
  }
}

module.exports = {
  createComment,
  getComments
}