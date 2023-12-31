import dotenv from 'dotenv';
import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';

import Comic, { IComic } from './models/Comic';
import Illustration, { IIllustration } from './models/Illustration';
import Panel, { IPanel } from './models/Panel';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ego_gala_comics';

mongoose.connect(MONGODB_URI);

const seedComicDataPath = path.join(__dirname, 'seedComicData.json');
const seedComicDataRaw = fs.readFileSync(seedComicDataPath, 'utf-8');
const seedComicData = JSON.parse(seedComicDataRaw);

const seedIllustrationDataPath = path.join(__dirname, 'seedIllustrationData.json');
const seedIllustrationDataRaw = fs.readFileSync(seedIllustrationDataPath, 'utf-8');
const seedIllustrationData = JSON.parse(seedIllustrationDataRaw);

const seedComics = async () => {
  // Order of operations matters here, so we've intentionally avoided concurrency here.
  /* eslint-disable no-restricted-syntax, no-await-in-loop */
  for (const comicData of seedComicData) {
    const comic: IComic = new Comic({
      title: comicData.title,
      category: comicData.category,
      description: comicData.description,
      publication_date: new Date(comicData.publication_date),
      thumbnail_url: comicData.thumbnail_url,
      panels: [] as IPanel[],
    });

    for (const panelData of comicData.panels) {
      const panel: IPanel = new Panel({
        comic_id: comic._id,
        panel_number: panelData.panel_number,
        image_url: panelData.image_url,
        transcription: panelData.transcription,
      });

      await panel.save();
      comic.panels.push(panel._id);
    }
    /* eslint-disable no-restricted-syntax, no-await-in-loop */

    // Save the Comic instance with the associated Panel instances
    await comic.save();
  }
};

const seedIllustrations = async () => {
  for (const illustrationData of seedIllustrationData) {
    const illustration: IIllustration = new Illustration({
      title: illustrationData.title,
      description: illustrationData.description,
      publication_date: new Date(illustrationData.publication_date),
      url: illustrationData.url,
      width: illustrationData.width,
      height: illustrationData.height,
    });

    await illustration.save();
  }
};

const seedDatabase = async () => {
  await seedComics();
  await seedIllustrations();
  // eslint-disable-next-line no-console
  console.log('Database seeding completed.');
  await mongoose.disconnect();
};

seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});

// seedComics()
//   .then(() => {
//     // eslint-disable-next-line no-console
//     console.log('Database seeding completed.');
//     return mongoose.disconnect();
//   })
//   .catch((error) => {
//     console.error('Error seeding database:', error);
//     process.exit(1);
//   });
