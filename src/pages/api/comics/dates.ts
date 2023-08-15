import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../db';
import Comic from '../../../../db/models/Comic';
import mongoose from 'mongoose';

const getComicDates = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const comics = await Comic.find(
      { category: 'diary' },
      'publication_date _id',
    );
    const dateIdMapping = comics.reduce<{
      [date: string]: mongoose.Types.ObjectId;
    }>((acc, comic) => {
      const date = new Date(comic.publication_date).toISOString().split('T')[0];
      acc[date] = comic._id;
      return acc;
    }, {});

    res.json(dateIdMapping);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching comic dates.' });
  }
};

export default getComicDates;
