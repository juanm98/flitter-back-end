const { Post, Profile, User } = require('../models')
const profile = require('../models/profile')
const saveImage = require('../config/saveImage')

async function createPost(req, res) {
  try {
    const imageFile = req.files.photo.path
    const {title, desc} = req.body
    const image = await saveImage(imageFile, title)
    const post = await Post.create({ title, desc, userId: req.user.id, photo: image})
    return res.status(201).json(post)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ err })
  }
}

async function getPost(req, res) {
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

async function updatePost(req, res) {
  try {
    const { id, title, desc, isImageUpdated } = req.body
    let image = req.body.image
    const post = await Post.findByPk(parseInt(id), {
      include: { model: User, as: 'user', attributes: ['id'] },
    })
    if (req.user.id !== post.user.dataValues.id) {
      return res.status(403).json({ message: 'You cannot edit this post ' })
    }
    if (isImageUpdated) {
      const imageFile = req.files.photo.path
      image = await saveImage(imageFile, title)
    }

    post.title = title
    post.desc = desc
    post.photo = image
    const updatePost = await post.save()
    return res.status(200).json({
      post: updatePost
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err })
  }
}

async function getPosts(req, res) {
  try {
    
  } catch (err) {
    
  }
}

module.exports = {
  getPost,
  createPost,
  updatePost,
  getPosts
}