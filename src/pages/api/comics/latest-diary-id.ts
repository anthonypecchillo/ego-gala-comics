import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../db';
import Comic, { IComic } from '../../../db/models/Comic';

const getLatestDiaryId = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    const diaryComic: IComic[] = await Comic.find({ category: 'diary' })
      .sort({ publication_date: -1 }) // Sort in descending order to get the latest comic
      .limit(1);

    if (diaryComic && diaryComic.length > 0) {
      res.json({ id: diaryComic[0]._id });
    } else {
      res.status(404).json({ error: 'Diary comic not found.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'An error occurred while fetching the latest diary comic ID.',
    });
  }
};

export default getLatestDiaryId;
