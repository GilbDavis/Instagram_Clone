const { FileManagementError, DatabaseError } = require("../utils/errorHandler");

class PostService {
  constructor({ photoModel, awsSDK, logger, configuration }) {
    this.photoModel = photoModel;
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
      console.log("thumbnail subido: ", uploadedThumbnail)

      const createdPhotoObject = await this.photoModel.create({
        title,
        image_url: uploadedThumbnail.Location,
        UserId: userId
      });
      if (!createdPhotoObject) {
        this.logger.error("An error occurred while trying to save a post.");
        throw new DatabaseError(500, "Failed to create the post, please try again.", "error");
      }

      console.log(`Lo que retorna el servicio es esto: ${createdPhotoObject}`);

      return createdPhotoObject;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PostService;