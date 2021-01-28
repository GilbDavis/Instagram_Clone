import {
  CREATEPOST_ERROR,
  CREATEPOST_SUCCESS,
  CREATEPOST_START,
  CREATEPOST_UPLOAD_PROGRESS
} from '../../types/index';
import axios from '../../config/axios';

export function getAllPosts() {
  return async dispatch => {

  };
}

export function createPost(formData) {
  return async dispatch => {
    dispatch(createPost_START());

    try {

      const { title, file } = formData;
      const sendData = new FormData();
      sendData.append('title', title);
      sendData.append('thumbnail', file);
      const postData = await axios.post("/api/p/upload", sendData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: ProgressEvent => {
          const { loaded, total } = ProgressEvent;
          let percent = Math.floor((loaded * 100) / total);
          dispatch(uploadingProgress(percent));
        }
      });

      dispatch(createPost_Success(postData.data.post));
    } catch (error) {
      console.log("Ocurrio un error en el post upload: ", error);
      dispatch(createPost_Error());
    }
  };
};

const createPost_START = () => ({
  type: CREATEPOST_START,
  payload: true
});

const createPost_Success = postData => ({
  type: CREATEPOST_SUCCESS,
  payload: postData
});

const uploadingProgress = progress => ({
  type: CREATEPOST_UPLOAD_PROGRESS,
  payload: progress
});

const createPost_Error = () => ({
  type: CREATEPOST_ERROR
});