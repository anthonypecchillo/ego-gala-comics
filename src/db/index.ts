import dotenv from 'dotenv';
import mongoose, { Mongoose } from 'mongoose';
import Panel from './models/Panel';

dotenv.config();

console.log(Panel);

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/ego_gala_comics';

declare var global: NodeJS.Global & {
  mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose | null> | null;
  };
};

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  console.log(MONGODB_URI);
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
