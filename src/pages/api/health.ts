import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../db';

const healthCheck = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    // Here we try to use the Mongoose connection to access the 'admin' database
    // and run the 'ping' command, a no-op that should always succeed if the
    // database is up and we can connect to it.
    const { ping } = await mongoose.connection.db.admin().ping();

    if (ping === 1) {
      // If the ping command succeeded, it means MongoDB is up and we can connect to it,
      // so we send a successful response.
      res.status(200).json({ status: 'OK', mongoDbStatus: 'Connected' });
    } else {
      throw new Error('Failed to connect to MongoDB');
    }
  } catch (err: any) {
    // If something throws an error (e.g. MongoDB is down), this catch block will run
    res.status(500).json({
      status: 'Error',
      mongoDbStatus: 'Disconnected',
      error: err.message,
    });
  }
};

export default healthCheck;
