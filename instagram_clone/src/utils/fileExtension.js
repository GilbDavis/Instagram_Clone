export const isImage = fileExtension => {
  if (/(gif|jpeg|jpg|png|pjpeg|jfif|tiff?|png|webp|bmp)$/i.test(fileExtension)) {
    return true;
  }

  return false;
};

export const isVideo = fileExtension => {
  if (/(mp4|mov|m4v)$/i.test(fileExtension)) {
    return true;
  }

  return false;
};