import dotenv from 'dotenv';
import mongoose, { Mongoose } from 'mongoose';

import Panel from './models/Panel';

dotenv.config();

// Don't delete this!
// We must reference Panel so that it is registered with Mongoose
// eslint-disable-next-line no-console
console.log(Panel);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ego_gala_comics';

declare let global: NodeJS.Global & {
  mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose | null> | null;
  };
};

let cached = global.mongoose;

if (!cached) {
  // eslint-disable-next-line no-multi-assign
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
