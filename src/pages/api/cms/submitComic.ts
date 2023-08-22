import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../db';
import Comic from '../../../db/models/Comic';
import Panel from '../../../db/models/Panel';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  await dbConnect();

  const { title, category, description, publication_date, panels } = req.body;

  console.log(JSON.stringify(req.body, null, 2));
  console.log(title);
  console.log(category);
  console.log(description);
  console.log(publication_date);
  console.log(JSON.stringify(panels, null, 2));

  try {
    // Create and save comic document
    const comic = new Comic({
      title,
      category,
      description,
      publication_date,
    });
    await comic.save();

    // Create, save, and link panel documents
    for (let panelData of panels) {
      const panel = new Panel({
        comic_id: comic._id,
        ...panelData,
      });
      await panel.save();
      comic.panels.push(panel._id);
    }

    // Update comic document with panels
    await comic.save();

    res.status(200).json({ message: 'Comic and Panels successfully saved!' });
  } catch (error) {
    console.error('Error saving comic or panels:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while saving the comic or panels' });
  }
}
