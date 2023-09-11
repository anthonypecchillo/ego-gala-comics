import AWS from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../db';
import Illustration from '../../../db/models/Illustration';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const s3 = new AWS.S3();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    await dbConnect();
    const { illustrationId } = req.body;

    // Retrieve the Illustration Details
    const illustration = await Illustration.findById(illustrationId);
    if (!illustration) {
      return res.status(404).json({ error: 'Illustration not found.' });
    }

    // Delete image from S3 Bucket
    const fileKey = illustration.url.split(
      `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`,
    )[1];

    if (!fileKey) {
      throw new Error('Failed to extract the file key from the provided image URL.');
    }

    if (!process.env.S3_BUCKET_NAME) {
      throw new Error('S3_BUCKET_NAME not set in environment.');
    }

    const deleteParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
    };

    await s3.deleteObject(deleteParams).promise();

    // Delete the Illustration from the Illustrations collection
    await illustration.deleteOne({ _id: illustrationId });

    return res.status(200).json({ message: 'Illustration deleted successfully.' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
