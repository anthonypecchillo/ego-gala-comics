import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../../db';
import Comic, { IComic } from '../../../../db/models/Comic';

const getPrevComicId = async (req: NextApiRequest, res: NextApiResponse) => {
  const { comicId } = req.query;
  try {
    await dbConnect();

    const currDiaryComic: IComic | null = await Comic.findById(comicId);

    if (!currDiaryComic) {
      res.status(404).json({ error: 'Current diary comic not found.' });
      return;
    }

    const prevDiaryComic: IComic | null = await Comic.findOne({
      category: 'diary',
      publication_date: { $lt: currDiaryComic.publication_date },
    })
      .sort({ publication_date: -1 })
      .limit(1);

    if (prevDiaryComic) {
      res.json({ id: prevDiaryComic._id });
    } else {
      res.status(404).json({ error: 'Previous diary comic not found.' });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the previous diary comic ID.' });
  }
};

export default getPrevComicId;
