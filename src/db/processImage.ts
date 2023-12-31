import { program } from 'commander';
import sharp from 'sharp';

// Define command-line arguments
program
  .requiredOption('-i, --input <type>', 'Input image file')
  .requiredOption('-w, --width <type>', 'Output image width', parseInt);

program.parse(process.argv);

const options = program.opts();

// Function to process the image
// Function expression to process the image
const processImage = async (inputPath: string, outputWidth: number): Promise<void> => {
  try {
    // Create a new filename for the output image
    const outputFilename = inputPath.replace(/\.\w+$/, '.webp');

    // Read, resize, convert, and optimize the image
    await sharp(inputPath)
      .resize({ width: outputWidth })
      .toFormat('webp', { quality: 80 }) // Adjust quality for optimization
      .toFile(outputFilename);

    // eslint-disable-next-line no-console
    console.log(`Processed image saved as ${outputFilename}`);
  } catch (error) {
    console.error('Error processing image:', error);
  }
};

// Execute the image processing function with CLI arguments
processImage(options.input, options.width);
