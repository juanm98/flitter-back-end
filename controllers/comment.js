const { Comment, User, Profile } = require('../models')
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

async function deleteComment(req, res) {
    try {
        const id = req.params.id

        if (!id) return res.status(400).json({ message: 'Provide comment id' })
        console.log(id)
        const comment = await Comment.findByPk(id, {
            include: { model: User, as: 'user', attributes: ['id'] },
        })
        if (!comment) return res.status(404).json({ message: 'No comment found' })
        if (req.user.id !== comment.user.dataValues.id) {
            return res.status(403).json({ message: 'You cannot delete this comment' })
        }

        await Comment.destroy({
            where: {
                id,
            },
        })
        return res.status(200).json({ message: 'comment deleted' })
    } catch (err) {
        return res.status(500).json({ err })
    }
}

async function getComments(req, res) {
    const postId = req.query.postId
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
    deleteComment, 
    getComments 
}
