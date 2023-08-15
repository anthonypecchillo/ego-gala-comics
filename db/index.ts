import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Panel from './models/Panel';

dotenv.config();

console.log(Panel);

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/ego_gala_comics';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const conn = {};
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      conn['mongoose'] = mongoose;
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

// import dotenv from 'dotenv';
// import mongoose from 'mongoose';

// dotenv.config();

// const MONGODB_URI =
//   process.env.MONGODB_URI || 'mongodb://localhost/ego_gala_comics';

// mongoose.connect(MONGODB_URI);

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// export default db;
