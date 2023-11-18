import AWS from 'aws-sdk';
import { Buffer } from 'buffer';
import type { NextApiRequest, NextApiResponse } from 'next';
import getRawBody from 'raw-body';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const s3 = new AWS.S3();

const sanitizeTitleForS3 = (title: string): string => {
  const trimmedTitle = title.trim();
  const lowerCaseTitle = trimmedTitle.toLowerCase();
  const hyphenatedTitle = lowerCaseTitle.replace(/\s+/g, '-');
  const sanitizedTitle = hyphenatedTitle.replace(/[^a-z0-9-_]/g, '');
  return sanitizedTitle;
};

const getFileExtensionFromMimeType = (mimeType: string): string => {
  const mimeToExtensionMap: { [key: string]: string } = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/tiff': 'tif',
    // Add more MIME types as needed, but this should be good for now!
  };

  return mimeToExtensionMap[mimeType] || 'png'; // default to 'png' if MIME type is not found
};

const generateS3Key = (
  category: string,
  title: string,
  panelNumber: number,
  fileExtension: string,
): string => {
  const sanitizedTitle = sanitizeTitleForS3(title);
  const panelSuffix = String(panelNumber).padStart(3, '0');
  return `${category}/${sanitizedTitle}-${panelSuffix}.${fileExtension}`;
};

const uploadToS3 = async (
  fileBuffer: Buffer,
  mimeType: string,
  category: string,
  title: string,
  panelNumber: number,
): Promise<string> => {
  const fileExtension = getFileExtensionFromMimeType(mimeType);
  const s3Key = generateS3Key(category, title, panelNumber, fileExtension);

  if (!process.env.S3_BUCKET_NAME) {
    throw new Error('S3_BUCKET_NAME is not defined in environment variables.');
  }

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: s3Key,
    Body: fileBuffer,
    ContentType: fileExtension,
  };

  await s3.upload(params).promise();
  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const requestBody = await getRawBody(req, {
      length: req.headers['content-length'],
      limit: '4mb',
      encoding: 'utf8',
    });

    const bodyParsed = JSON.parse(requestBody);

    const { fileData, category, title, panelNumber } = bodyParsed;

    const base64ContentArray = fileData.split(',');
    const mimeType = base64ContentArray[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0];
    const base64Data = base64ContentArray[1];

    const imageBuffer = Buffer.from(base64Data, 'base64');

    const fileURL = await uploadToS3(imageBuffer, mimeType, category, title, panelNumber);
    return res.status(200).json({ fileURL });
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).type === 'entity.too.large') {
      console.error('Request body too large:', error);
      return res.status(413).json({ error: 'Payload too large' });
    }
    if (error instanceof Error) {
      console.error('Error uploading to S3:', error);
      return res.status(500).json({ error: error.message });
    }
    console.error('Unexpected error:', error);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
