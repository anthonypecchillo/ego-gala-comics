import { assert } from 'console';
import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../db';
import Comic, { IComic } from '../../../db/models/Comic';

const getComics = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    const { category, page = '1', limit = '10' } = req.query;

    // Ensure that the query parameters are of the correct type
    assert(typeof category === 'string', 'Category must be a string');
    assert(typeof page === 'string', 'Page must be a string');
    assert(typeof limit === 'string', 'Limit must be a string');

    const query = category ? { category } : {};
    const sortBy = category === 'diary' ? 'publication_date' : '-publication_date';

    const skip = (Number(page) - 1) * Number(limit);

    const comicsQuery = Comic.find(query)
      .populate('panels')
      .sort(sortBy)
      .skip(skip)
      .limit(Number(limit));

    const comics = (await comicsQuery) as IComic[];
    const count = await Comic.countDocuments(query);
    const totalPages = Math.ceil(count / Number(limit));

    res.json({ comics, totalPages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching comics.' });
  }
};

export default getComics;
