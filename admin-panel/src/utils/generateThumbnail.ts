export const generateThumbnail = function (file: any) {
  const obj = JSON.parse(file);
  const imageFilename = obj.filename;
  const imageUrl = `http://localhost:3001/images/${imageFilename}`;
  return imageUrl;
};
