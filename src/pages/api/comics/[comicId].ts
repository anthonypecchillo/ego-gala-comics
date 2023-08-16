import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../db';
import Comic, { IComic } from '../../../db/models/Comic';

const getComicById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('getComicById')
    await dbConnect();

    const { comicId } = req.query;
    const comic = (await Comic.findById(comicId).populate(
      'panels',
    )) as IComic | null;

    if (comic) {
      res.json(comic);
    } else {
      res.status(404).json({ error: 'Comic not found.' });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the comic.' });
  }
};

export default getComicById;
