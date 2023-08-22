import AWS from 'aws-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteFileFromS3 } from '../../../services/s3';

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

  if (!process.env.S3_BUCKET_NAME) {
    console.error('S3_BUCKET_NAME is not set in environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const { imageUrl } = req.body;
    console.log('imageUrl:', imageUrl);

    // Extract the file key from the full URL
    const fileKey = imageUrl.split(
      `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`,
    )[1];
    console.log('Extracted fileKey:', fileKey);

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
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting from S3:', error);
      res.status(500).json({ error: error.message });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}
