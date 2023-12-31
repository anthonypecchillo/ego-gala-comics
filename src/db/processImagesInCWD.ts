import { promises as fs } from 'fs';
import sharp from 'sharp';

// Define the output image width
const OUTPUT_WIDTH = 1664;

// Function to process the image
const processImage = async (inputPath: string, outputWidth: number): Promise<void> => {
  try {
    const outputFilename = inputPath.replace(/\.\w+$/, '.webp');

    await sharp(inputPath)
      .resize({ width: outputWidth })
      .toFormat('webp', { quality: 60 })
      .toFile(outputFilename);

    // eslint-disable-next-line no-console
    console.log(`Processed image saved as ${outputFilename}`);
  } catch (error) {
    console.error('Error processing image:', error);
  }
};

// Function to process all images in the current directory
const processAllImages = async () => {
  try {
    const files = await fs.readdir(process.cwd());

    // Use Promise.all to process all images concurrently
    await Promise.all(
      files.map((file) => {
        if (/\.(jpe?g|png|tiff?)$/i.test(file)) {
          return processImage(file, OUTPUT_WIDTH);
        }
        return Promise.resolve();
      }),
    );
  } catch (error) {
    console.error('Error reading directory:', error);
  }
};

// Execute the processing function for all images
processAllImages();
