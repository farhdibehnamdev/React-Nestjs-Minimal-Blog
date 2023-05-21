import * as sharp from 'sharp';
import * as path from 'path';
export const createThumbnail = async function (
  fullImagePath: string,
  thumbnailImagepath: string,
) {
  const thumbnailWidth = 100;

  const fullPath = path.join(process.cwd(), fullImagePath);

  const image = sharp(fullPath);

  const metadata = await image.metadata();

  const thumbnailHeight = Math.round(
    (thumbnailWidth / metadata.width) * metadata.height,
  );

  await image
    .resize(thumbnailWidth, thumbnailHeight)
    .toFile(thumbnailImagepath);
};
