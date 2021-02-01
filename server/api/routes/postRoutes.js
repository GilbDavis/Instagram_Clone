const express = require("express");
const route = express.Router();
const { multerUpload } = require('../../utils/multerHelper');

const validation = require('../../validation/validation');
const { CreatePostController, getAllPostsController, getAllLikesController } = require('../controllers/PostController');

const isAuthenticated = require('../middlewares/isAuthenticated');

// Crea un post y envia la imagen a AWS S3 /api/p/upload --POST
route.post("/upload", isAuthenticated, multerUpload.single('thumbnail'), CreatePostController);

route.get('/posts', isAuthenticated, getAllPostsController);

module.exports = route;