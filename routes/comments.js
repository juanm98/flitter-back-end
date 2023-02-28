const router = require('express').Router()
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

