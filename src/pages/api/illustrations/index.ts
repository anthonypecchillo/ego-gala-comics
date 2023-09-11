import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../db';
import Illustration, { IIllustration } from '../../../db/models/Illustration';

const getIllustrations = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const illustrations: IIllustration[] = await Illustration.find();
    res.json({ illustrations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching illustrations.' });
  }
};

export default getIllustrations;
