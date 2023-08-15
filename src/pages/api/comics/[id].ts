import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../db';
import Comic, { IComic } from '../../../../db/models/Comic';

const getComicById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const comic: IComic | null = await Comic.findById(id).populate('panels');

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
