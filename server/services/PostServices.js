const { FileManagementError, DatabaseError } = require("../utils/errorHandler");

class PostService {
  constructor({ photoModel, userModel, likeModel, commentModel, followModel, awsSDK, logger, configuration }) {
    this.photoModel = photoModel;
    this.userModel = userModel;
    this.likeModel = likeModel;
    this.commentModel = commentModel;
    this.followModel = followModel;
    this.awsSDK = awsSDK;
    this.logger = logger;
    this.config = configuration;
  }

  async CreatePost(userId, title, thumbnail) {
    try {
      const s3 = new this.awsSDK.S3({
        accessKeyId: this.config.aws.accessKey,
        secretAccessKey: this.config.aws.secretAccessKey
      });

      const s3Params = {
        Bucket: this.config.aws.bucket,
        Key: `${new Date().getTime()}${thumbnail.originalname}`,
        Body: thumbnail.buffer
      };

      const uploadedThumbnail = await s3.upload(s3Params).promise();
      if (!uploadedThumbnail) {
        this.logger.warn("An error occurred while trying to upload the file");
        throw new FileManagementError(406, "File uploading has failed, please try again later.", 'fail');
      }

      const createdPhotoObject = await this.photoModel.create({
        title,
        image_url: uploadedThumbnail.Location,
        UserId: userId
      }, {
        returning: true,
        include: [{ model: this.userModel, as: 'User' }]
      });
      if (!createdPhotoObject) {
        this.logger.error("An error occurred while trying to save a post.");
        throw new DatabaseError(500, "Failed to create the post, please try again.", "error");
      }

      const userData = await this.userModel.findByPk(createdPhotoObject.dataValues.UserId, { exlude: ['password', 'resetPasswordToken', 'resetPasswordTokenExpiration'] });

      return {
        owner: {
          userId: userData.id,
          userName: userData.userName,
          profileImage: userData.profileImage
        },
        postInfo: {
          id: createdPhotoObject.dataValues.id,
          title: createdPhotoObject.dataValues.title,
          image_url: createdPhotoObject.dataValues.image_url,
          createdAt: createdPhotoObject.dataValues.createdAt
        }
      };
    } catch (error) {
      throw error;
    }
  }

  async findAllFollowingPosts(userId) {
    try {
      const getUserFollowers = await this.userModel
        .findAll({ attributes: ['id'], include: [{ model: this.followModel, as: 'Follows', where: { FollowerId: userId } }] });

      if (!getUserFollowers) {
        throw new DatabaseError(500, 'Error while fetching follower data', 'error');
      }

      const getPhotoIds = await this.photoModel.findAll({
        include: [{
          model: this.userModel, as: 'User', where: { id: getUserFollowers.map(data => data.dataValues.id) }, attributes: ['id']
        }],
        attributes: ['id']
      });

      if (!getPhotoIds) {
        throw new DatabaseError(500, 'An error occurred while fetching.', 'error');
      }

      const getAllPostData = await this.photoModel.findAll({
        include: [{
          model: this.userModel, as: 'User', where: { id: getUserFollowers.map(data => data.dataValues.id) }, attributes: ['id', 'userName', 'profileImage']
        },
        {
          model: this.likeModel, as: 'Likes', where: { UserId: getUserFollowers.map(data => data.dataValues.id), PhotoId: getPhotoIds.map(data => data.dataValues.id) }, required: false
        },
        {
          model: this.commentModel, as: 'Comments', where: { UserId: getUserFollowers.map(data => data.dataValues.id), PhotoId: getPhotoIds.map(data => data.dataValues.id) }, required: false, attributes: ['id', 'comment_text']
        }
        ],
        order: [
          ['createdAt', 'DESC']
        ],
        attributes: { exclude: ['UserId'] }
      });

      if (!getAllPostData) {
        throw new DatabaseError(500, "Records werent found!", 'error');
      }

      const formatPosts = getAllPostData.map(data => {
        return {
          owner: data.dataValues.User.dataValues,
          postInfo: data.dataValues,
          likes: data.dataValues.Likes.length === 0 ? {} : data.dataValues.Likes.dataValues,
          comments: data.dataValues.Comments.length === 0 ? {} : data.dataValues.Comments.dataValues
        };
      });
      // Delete the extra User, Likes and Comments object from postInfo
      formatPosts.map(post => {
        delete post.postInfo.User;
        delete post.postInfo.Likes;
        delete post.postInfo.Comments;
      });

      return formatPosts;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PostService;