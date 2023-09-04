import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../db';

const healthCheck = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const { ping } = await mongoose.connection.db.admin().ping();

    if (ping === 1) {
      res.status(200).json({ status: 'OK', mongoDbStatus: 'Connected' });
    } else {
      throw new Error('Failed to connect to MongoDB');
    }
  } catch (err: unknown) {
    // Check if err is an instance of Error before accessing err.message
    const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';

    res.status(500).json({
      status: 'Error',
      mongoDbStatus: 'Disconnected',
      error: errorMessage,
    });
  }
};

export default healthCheck;
