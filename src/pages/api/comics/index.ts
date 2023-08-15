import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../db';
import Comic, { IComic } from '../../../db/models/Comic';

const getComics = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    const { category, page, limit } = req.query;
    const query = category ? { category } : {};

    let comics: IComic[];
    let totalPages = 1;

    if (page && limit) {
      const skip = (Number(page) - 1) * Number(limit);
      comics = (await Comic.find(query)
        .populate('panels')
        .skip(skip)
        .limit(Number(limit))) as IComic[];

      const count = await Comic.countDocuments(query);
      totalPages = Math.ceil(count / Number(limit));
    } else {
      comics = await Comic.find(query).populate('panels');
    }

    res.json({ comics, totalPages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching comics.' });
  }
};

export default getComics;
