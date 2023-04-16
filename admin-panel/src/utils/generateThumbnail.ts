export const generateThumbnail = function (file: any) {
  let obj;
  let imageFilename;
  if (isJSON(file)) {
    obj = JSON.parse(file);
    imageFilename = obj.filename;
  } else {
    imageFilename = file.filename;
  }
  const imageUrl = `http://localhost:3001/uploads/thumbnails/${imageFilename}`;
  return imageUrl;
};

const isJSON = function (file: any) {
  try {
    JSON.parse(file);
    return true;
  } catch (error) {
    return false;
  }
};
