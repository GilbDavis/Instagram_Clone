const PostService = require('../../services/PostServices');
const { Photo, User, Follow, Comment, Like } = require('../../models');
const AWS = require('aws-sdk');
const logger = require('../../utils/logger');
const config = require("../../config/configuration");
const sequelize = require('sequelize');

const CreatePostController = async (request, response, next) => {
  const thumbnail = request.file;
  const postTitle = request.body.title;
  const userId = request.user.id;

  try {
    const PostServiceInstance = new PostService({
      photoModel: Photo,
      userModel: User,
      awsSDK: AWS,
      logger: logger,
      configuration: config
    });

    const post = await PostServiceInstance.CreatePost(userId, postTitle, thumbnail);

    return response.status(201).json({ status: 'success', post });
  } catch (error) {
    return next(error);
  }
};

const getAllPostsController = async (request, response, next) => {
  try {
    const PostServiceInstance = new PostService({
      userModel: User,
      followModel: Follow,
      likeModel: Like,
      commentModel: Comment,
      photoModel: Photo,
      sequelize: sequelize,
      logger: logger
    });

    const posts = await PostServiceInstance.findAllFollowingPosts(request.user.id);

    return response.status(200).json({ status: 'success', posts });
  } catch (error) {
    return next(error);
  }
};

const handleSetLikeAndUnlike = async (request, response, next) => {

  const { photoId } = request.params;
  const userId = request.user.id;

  try {
    const PostServiceInstance = new PostService({
      likeModel: Like,
    });

    const { exists, likePhotoId } = await PostServiceInstance.setLikeOrUnlike(photoId, userId);

    return response.status(200).json({ status: 'success', exists, likePhotoId: parseInt(likePhotoId) })
  } catch (error) {

  }
};

module.exports = {
  CreatePostController,
  getAllPostsController,
  handleSetLikeAndUnlike
};