const { FileManagementError, DatabaseError } = require("../utils/errorHandler");

class PostService {
  constructor({ photoModel, userModel, likeModel, commentModel, followModel, sequelize, awsSDK, logger, configuration }) {
    this.photoModel = photoModel;
    this.userModel = userModel;
    this.likeModel = likeModel;
    this.commentModel = commentModel;
    this.followModel = followModel;
    this.sequelize = sequelize;
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
        },
        likes: {},
        comments: {}
      };
    } catch (error) {
      throw error;
    }
  }

  async findAllFollowingPosts(userId) {
    try {
      const getUserFollowers = await this.userModel
        .findAll({
          attributes: ['id'],
          include: [{
            model: this.followModel, as: 'Follows',
            where: {
              [this.sequelize.Op.or]: [
                { FollowerId: userId },
                { FolloweeId: userId }
              ]
            }
          }]
        });

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

      // Add the user id at the end to get his own posts
      const getOnlyIdsFromUsers = getUserFollowers.map(data => data.dataValues.id);
      getOnlyIdsFromUsers.push(userId);

      const getAllPostData = await this.photoModel.findAll({
        include: [{
          model: this.userModel, as: 'User', where: { id: getOnlyIdsFromUsers }, attributes: ['id', 'userName', 'profileImage']
        },
        {
          model: this.likeModel, as: 'Likes', where: { UserId: getOnlyIdsFromUsers, PhotoId: getPhotoIds.map(data => data.dataValues.id) }, required: false, attributes: { include: ['UserId', [this.sequelize.fn('COUNT', this.sequelize.col('Likes.PhotoId')), 'total']] }
        },
        {
          model: this.commentModel, as: 'Comments', where: { UserId: getOnlyIdsFromUsers, PhotoId: getPhotoIds.map(data => data.dataValues.id) }, required: false, attributes: ['id', 'comment_text']
        }
        ],
        order: [
          ['createdAt', 'DESC']
        ],
        attributes: { exclude: ['UserId'] },
        group: ['Photo.id', 'User.id', 'Likes.PhotoId', 'Likes.UserId', 'Comments.UserId', 'Comments.PhotoId', 'Comments.id']
      });
      if (!getAllPostData) {
        throw new DatabaseError(500, "Records werent found!", 'error');
      }

      const getLikeTotal = await Promise.all(getAllPostData.map(el => {
        let photoId = el.dataValues.Likes[0]?.dataValues.PhotoId;
        if (photoId) {
          const fetchPhotoCount = this.likeModel.count({ where: { PhotoId: photoId }, attributes: ['PhotoId', 'UserId'], group: ['Like.PhotoId', 'Like.UserId'] })
            .then(data => data)
            .catch(err => err);
          // const test = [{ ...el.dataValues.Likes[0]?.dataValues, total: total }];
          return fetchPhotoCount;
        } else {
          return [];
        }
      }));
      // console.log("PRobando uno dos tres: ", getLikeTotal)

      const formatPosts = getAllPostData.map((data, index) => {
        const totals = getLikeTotal[index];
        console.log("totals: ", totals)
        return {
          owner: data.dataValues.User.dataValues,
          postInfo: data.dataValues,
          likes: totals.length <= 0 ? { total: 0, updated: false } : { total: totals.length, updated: totals.find(data => { if (data.UserId === userId) { return true } else { return false } }) ? true : false },
          comments: data.dataValues.Comments.length === 0 ? {} : data.dataValues.Comments.dataValues
        };
      });
      /* Delete the extra User, Likes and Comments object from postInfo 
      (P.D: Sequelize structure it like that) */
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