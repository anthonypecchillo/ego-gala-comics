import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../../db';
import Comic, { IComic } from '../../../../db/models/Comic';

const getNextComicId = async (req: NextApiRequest, res: NextApiResponse) => {
  const { comicId } = req.query;
  try {
    await dbConnect();

    const currDiaryComic: IComic | null = await Comic.findById(comicId);

    if (!currDiaryComic) {
      res.status(404).json({ error: 'Current diary comic not found.' });
      return;
    }

    const nextDiaryComic: IComic | null = await Comic.findOne({
      category: 'diary',
      publication_date: { $gt: currDiaryComic.publication_date },
    })
      .sort({ publication_date: 1 })
      .limit(1);

    if (nextDiaryComic) {
      res.json({ id: nextDiaryComic._id });
    } else {
      res.status(404).json({ error: 'Next diary comic not found.' });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the previous diary comic ID.' });
  }
};

export default getNextComicId;
