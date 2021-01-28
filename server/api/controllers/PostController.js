const PostService = require('../../services/PostServices');
const { Photo } = require('../../models');
const AWS = require('aws-sdk');
const logger = require('../../utils/logger');
const config = require("../../config/configuration");

const CreatePostController = async (request, response, next) => {
  const thumbnail = request.file;
  const postTitle = request.body.title;
  const userId = request.user.id;

  try {
    const PostServiceInstance = new PostService({
      photoModel: Photo,
      awsSDK: AWS,
      logger: logger,
      configuration: config
    });

    const { title, image_url, createdAt } = await PostServiceInstance.CreatePost(userId, postTitle, thumbnail);

    return response.status(201).json({ status: 'success', post: { title, image_url, createdAt } });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  CreatePostController
};