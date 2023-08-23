import { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';
import dbConnect from '../../../db';
import Comic from '../../../db/models/Comic';
import Panel from '../../../db/models/Panel';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const s3 = new AWS.S3();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
    return res.status(405).end();
  }

  // Step 1: Retrieve the Comic Details
  await dbConnect();

  const comicId = req.body.comicId;
  const comic = await Comic.findById(comicId).populate('panels');

  if (!comic) {
    return res.status(404).json({ error: 'Comic not found.' });
  }

  // Step 2: Delete Images from S3 Bucket
  const panelImageUrls = comic.panels.map((panel) => panel.image_url);
  for (let imageUrl of panelImageUrls) {
    const fileKey = imageUrl.split(
      `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`,
    )[1];

    if (!fileKey) {
      return res.status(400).json({
        error: 'Failed to extract the file key from the provided image URL.',
      });
    }

    const deleteParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
    };

    await s3.deleteObject(deleteParams).promise();
  }

  // Step 3: Delete the Comic's Panels from the Panels collection
  await Panel.deleteMany({ comicId: comic._id });

  // Step 4: Delete the Comic from the Comics collection
  await Comic.deleteOne({ _id: comic._id });

  return res
    .status(200)
    .json({ message: 'Comic and associated data deleted successfully.' });
}
