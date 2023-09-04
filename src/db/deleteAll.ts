/* eslint-disable no-console */
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Comic from './models/Comic';
import Panel from './models/Panel';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ego_gala_comics';

mongoose.connect(MONGODB_URI);

const deleteAllRecords = async () => {
  try {
    await Panel.deleteMany({});
    console.log('All Panel records deleted.');

    await Comic.deleteMany({});
    console.log('All Comic records deleted.');
  } catch (error) {
    console.error('Error deleting records:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

deleteAllRecords();
