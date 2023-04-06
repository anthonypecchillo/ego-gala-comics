import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Comic, { IComic } from './models/Comic';
import Panel, { IPanel } from './models/Panel';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ego_gala_comics';

mongoose.connect(MONGODB_URI);

const seedDataPath = path.join(__dirname, 'seedData.json');
const seedDataRaw = fs.readFileSync(seedDataPath, 'utf-8');
const seedData = JSON.parse(seedDataRaw);

async function seedComics() {
  for (const comicData of seedData) {
    const comic: IComic = new Comic({
      title: comicData.title,
      category: comicData.category,
      description: comicData.description,
      publication_date: new Date(comicData.publication_date),
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

    // Save the Comic instance with the associated Panel instances
    await comic.save();
  }
}

seedComics()
  .then(() => {
    console.log('Database seeding completed.');
    return mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  });
