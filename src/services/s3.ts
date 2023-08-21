import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const s3 = new AWS.S3();

const sanitizeTitleForS3 = (title: string): string => {
  // Convert title to lowercase
  const lowerCaseTitle = title.toLowerCase();

  // Replace spaces with hyphens
  const hyphenatedTitle = lowerCaseTitle.replace(/\s+/g, '-');

  // Remove unwanted characters. Only allow alphanumeric, hyphens and underscores
  const sanitizedTitle = hyphenatedTitle.replace(/[^a-z0-9-_]/g, '');

  return sanitizedTitle;
};

const generateS3Key = (
  category: string,
  title: string,
  panelNumber: number,
  fileExtension: string,
): string => {
  const sanitizedTitle = sanitizeTitleForS3(title);

  // Convert 1 to 001, 12 to 012, etc.
  const panelSuffix = String(panelNumber).padStart(3, '0');

  return `${category}/${sanitizedTitle}-${panelSuffix}.${fileExtension}`;
};

export const uploadToS3 = async (
  file: File,
  category: string,
  title: string,
  panelNumber: number,
): Promise<string> => {
  const fileExtension = file.name.split('.').pop() || 'jpg';
  const s3Key = generateS3Key(category, title, panelNumber, fileExtension);

  const params = {
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: s3Key,
    Body: file,
    ACL: 'public-read',
    ContentType: file.type,
  };

  try {
    await s3.upload(params).promise();
    const fileURL = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`;
    return fileURL;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload to S3');
  }
};
