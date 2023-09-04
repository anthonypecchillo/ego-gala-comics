import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../db';
import Comic, { IComic } from '../../../db/models/Comic';

const getEarliestDiaryId = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    const diaryComic: IComic[] = await Comic.find({ category: 'diary' })
      .sort({ publication_date: 1 })
      .limit(1);

    if (diaryComic && diaryComic.length > 0) {
      res.json({ id: diaryComic[0]._id });
    } else {
      res.status(404).json({ error: 'Diary comic not found.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'An error occurred while fetching the earliest diary comic ID.',
    });
  }
};

export default getEarliestDiaryId;
