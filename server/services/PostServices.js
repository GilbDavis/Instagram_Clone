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
        likes: { total: 0, updated: false },
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

      // Add the user id at the end to get his own posts
      const getOnlyIdsFromUsers = getUserFollowers.map(data => data.dataValues.id);
      getOnlyIdsFromUsers.push(userId);

      const getPhotoIds = await this.photoModel.findAll({
        include: [{
          model: this.userModel, as: 'User', where: { id: getOnlyIdsFromUsers }, attributes: ['id']
        }],
        attributes: ['id']
      });

      if (!getPhotoIds) {
        throw new DatabaseError(500, 'An error occurred while fetching.', 'error');
      }

      const getCommentsIds = await this.commentModel.findAll({
        include: [{
          model: this.userModel, as: "User", where: { id: getOnlyIdsFromUsers }, attributes: ['id', 'userName']
        }],
        attributes: ['id']
      });

      if (!getCommentsIds) {
        throw new DatabaseError(500, "An error occurred while fetching the posts, please try again", 'fail');
      }

      const getAllPostData = await this.photoModel.findAll({
        include: [{
          model: this.userModel, as: 'User', where: { id: getOnlyIdsFromUsers }, attributes: ['id', 'userName', 'profileImage']
        },
        {
          model: this.likeModel, as: 'Likes', where: { PhotoId: getPhotoIds.map(data => data.dataValues.id) }, required: false, attributes: { include: ['UserId', [this.sequelize.fn('COUNT', this.sequelize.col('Likes.PhotoId')), 'total']] }
        },
        {
          model: this.commentModel, as: 'Comments', where: { id: getCommentsIds.map(data => data.dataValues.id) }, required: false, attributes: ['id', 'comment_text', 'UserId'], order: ['createdAt', 'DESC']
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
          const fetchPhotoCount = this.likeModel.count({
            where: { PhotoId: photoId },
            attributes: ['PhotoId', 'UserId'],
            group: ['Like.PhotoId', 'Like.UserId']
          })
            .then(data => data)
            .catch(err => err);
          return fetchPhotoCount;
        } else {
          return [];
        }
      }));

      const getPostsCommentsData = await Promise.all(getAllPostData.map(data => {
        let userId = data.dataValues.Comments.map(comment => comment.UserId);
        let commentId = data.dataValues.Comments.map(comment => comment.id);
        if (userId) {
          const fetchUserName = this.userModel.findAll({
            where: { id: userId },
            raw: true,
            attributes: ['id', 'userName'],
            include: [{ model: this.commentModel, as: 'Comments', required: false, where: { id: commentId }, order: ['createdAt', 'DESC'] }]
          })
            .then(data => data)
            .catch(err => new DatabaseError(500, "An error occurred while fetching posts, please try again", 'fail'));
          return fetchUserName
        } else {
          return [];
        }
      }));


      const formatPosts = getAllPostData.map((data, index) => {
        const totals = getLikeTotal[index];
        const comments = getPostsCommentsData[index];
        return {
          owner: data.dataValues.User.dataValues,
          postInfo: data.dataValues,
          likes: totals.length <= 0 ? { total: 0, updated: false } : { total: totals.length, updated: totals.find(data => { if (data.UserId === userId) { return true } else { return false } }) ? true : false },
          comments: comments.length <= 0 ? [] : comments.map(data => ({ commentId: data['Comments.id'], commentText: data['Comments.comment_text'], owner: data.userName }))
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

  async setLikeOrUnlike(photoId, userId) {
    try {
      const findLike = await this.likeModel.findOne({ where: { PhotoId: photoId, UserId: userId } });

      if (!findLike) {
        const createLike = await this.likeModel.create({
          UserId: userId,
          PhotoId: photoId
        });

        if (!createLike) {
          throw new DatabaseError(500, "A database error occurred, please try again", 'fail');
        }
        return { exists: true, likePhotoId: photoId };
      }

      const deleteLike = await this.likeModel.destroy({ where: { UserId: userId, PhotoId: photoId } });

      if (!deleteLike) {
        throw new DatabaseError(500, "A database error occurred, please try again", 'fail');
      }

      return { exists: false, likePhotoId: photoId };
    } catch (error) {
      throw error;
    }
  }

  async addComment(photoId, userId, comment) {
    try {
      const createdComment = await this.commentModel.create({
        comment_text: comment,
        UserId: userId,
        PhotoId: photoId
      });
      if (!createdComment) {
        throw new DatabaseError(500, "Unable to create the comment, please try again", 'error');
      }

      const findCommentOwner = await this.userModel.findByPk(userId, { attributes: ['userName'] });
      if (!findCommentOwner) {
        throw new DatabaseError(500, "Unable to find comment owner, please try again", 'error');
      }

      return {
        commentId: createdComment.id,
        commentText: createdComment.comment_text,
        owner: findCommentOwner.userName,
        photoId: createdComment.PhotoId
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllExplorePosts(userId) {
    try {
      const getUserFollowers = await this.userModel
        .findAll({
          where: {
            id: {
              [this.sequelize.Op.not]: userId
            }
          },
          attributes: ['id']
        });

      if (!getUserFollowers) {
        throw new DatabaseError(500, 'Error while fetching follower data', 'error');
      }

      // Add the user id at the end to get his own posts
      const getOnlyIdsFromUsers = getUserFollowers.map(data => data.dataValues.id);
      // Add the userId to not discard likes and comments from the excluded user
      const getIdsForLikesAndComments = getUserFollowers.map(data => data.dataValues.id);
      getIdsForLikesAndComments.push(userId);

      const getPhotoIds = await this.photoModel.findAll({
        include: [{
          model: this.userModel, as: 'User', where: { id: getIdsForLikesAndComments }, attributes: ['id']
        }],
        attributes: ['id']
      });

      if (!getPhotoIds) {
        throw new DatabaseError(500, 'An error occurred while fetching.', 'error');
      }

      const getCommentsIds = await this.commentModel.findAll({
        include: [{
          model: this.userModel, as: "User", where: { id: getIdsForLikesAndComments }, attributes: ['id', 'userName']
        }],
        attributes: ['id']
      });

      if (!getCommentsIds) {
        throw new DatabaseError(500, "An error occurred while fetching the posts, please try again", 'fail');
      }

      const getAllPostData = await this.photoModel.findAll({
        include: [{
          model: this.userModel, as: 'User', where: { id: getOnlyIdsFromUsers }, attributes: ['id', 'userName', 'profileImage']
        },
        {
          model: this.likeModel, as: 'Likes', where: { PhotoId: getPhotoIds.map(data => data.dataValues.id) }, required: false, attributes: { include: ['UserId', [this.sequelize.fn('COUNT', this.sequelize.col('Likes.PhotoId')), 'total']] }
        },
        {
          model: this.commentModel, as: 'Comments', where: { id: getCommentsIds.map(data => data.dataValues.id) }, required: false, attributes: ['id', 'comment_text', 'UserId'], order: ['createdAt', 'DESC']
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
          const fetchPhotoCount = this.likeModel.count({
            where: { PhotoId: photoId },
            attributes: ['PhotoId', 'UserId'],
            group: ['Like.PhotoId', 'Like.UserId']
          })
            .then(data => data)
            .catch(err => err);
          return fetchPhotoCount;
        } else {
          return [];
        }
      }));

      const getPostsCommentsData = await Promise.all(getAllPostData.map(data => {
        let userId = data.dataValues.Comments.map(comment => comment.UserId);
        let commentId = data.dataValues.Comments.map(comment => comment.id);
        if (userId) {
          const fetchUserName = this.userModel.findAll({
            where: { id: userId },
            raw: true,
            attributes: ['id', 'userName'],
            include: [{ model: this.commentModel, as: 'Comments', required: false, where: { id: commentId }, order: ['createdAt', 'DESC'] }]
          })
            .then(data => data)
            .catch(err => new DatabaseError(500, "An error occurred while fetching posts, please try again", 'fail'));
          return fetchUserName
        } else {
          return [];
        }
      }));


      const formatPosts = getAllPostData.map((data, index) => {
        const totals = getLikeTotal[index];
        const comments = getPostsCommentsData[index];
        return {
          owner: data.dataValues.User.dataValues,
          postInfo: data.dataValues,
          likes: totals.length <= 0 ? { total: 0, updated: false } : { total: totals.length, updated: totals.find(data => { if (data.UserId === userId) { return true } else { return false } }) ? true : false },
          comments: comments.length <= 0 ? [] : comments.map(data => ({ commentId: data['Comments.id'], commentText: data['Comments.comment_text'], owner: data.userName }))
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

  async getSinglePost(postId, userId) {
    try {
      const getPhotoData = await this.photoModel.findOne({ where: { id: postId } });

      if (!getPhotoData) {
        throw DatabaseError(500, 'Unable to fetch data. Please try again', 'error');
      }

      const getAllPostData = await this.photoModel.findOne({
        where: { id: postId },
        include: [{
          model: this.userModel, as: 'User', where: { id: getPhotoData.dataValues.UserId }, attributes: ['id', 'userName', 'profileImage']
        },
        {
          model: this.likeModel, as: 'Likes', where: { PhotoId: getPhotoData.dataValues.id }, required: false, attributes: { include: ['UserId', [this.sequelize.fn('COUNT', this.sequelize.col('Likes.PhotoId')), 'total']] }
        },
        {
          model: this.commentModel, as: 'Comments', where: { PhotoId: getPhotoData.dataValues.id }, required: false, attributes: ['id', 'comment_text', 'UserId'], order: ['createdAt', 'DESC']
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

      const getPostsCommentsData = await Promise.all(getAllPostData.dataValues.Comments.map(data => {
        let userId = data.dataValues.UserId;
        let commentId = data.dataValues.id;
        if (userId) {
          const fetchUserName = this.userModel.findAll({
            where: { id: userId },
            raw: true,
            attributes: ['id', 'userName'],
            include: [{ model: this.commentModel, as: 'Comments', required: false, where: { id: commentId }, order: ['createdAt', 'DESC'] }]
          })
            .then(data => data)
            .catch(err => new DatabaseError(500, "An error occurred while fetching posts, please try again", 'fail'));
          return fetchUserName
        } else {
          return [];
        }
      }));

      const formatPosts = () => {
        return {
          owner: getAllPostData.dataValues.User.dataValues,
          postInfo: {
            id: getAllPostData.dataValues.id,
            title: getAllPostData.dataValues.title,
            image_url: getAllPostData.dataValues.image_url
          },
          likes: getAllPostData.dataValues.Likes.length <= 0 ? { total: 0, updated: false } : { total: getAllPostData.dataValues.Likes.length, updated: getAllPostData.dataValues.Likes.find(data => { if (data.UserId === userId) { return true } else { return false } }) ? true : false },
          comments: getPostsCommentsData.length <= 0 ? [] : getPostsCommentsData.map(data => ({ commentId: data[0]['Comments.id'], commentText: data[0]['Comments.comment_text'], owner: data[0].userName }))
        };
      };

      return formatPosts();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PostService;