import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../db';
import Illustration from '../../../db/models/Illustration';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    await dbConnect();
    const { title, description, publication_date, url, width, height } = req.body;
    const illustration = new Illustration({
      title,
      description,
      publication_date,
      url,
      width,
      height,
    });
    await illustration.save();
    return res.status(200).json({ message: 'Illustration created successfully!' });
  } catch (error) {
    console.error('Error saving illustration:', error);
    return res.status(500).json({ error: 'An error occurred while saving the illustration.' });
  }
}
