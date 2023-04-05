import mongoose, { Schema, Document } from 'mongoose';

export interface IComic extends Document {
  title: string;
  description: string;
  publication_date: Date;
  panels: Array<string>;
}

const ComicSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  publication_date: { type: Date, required: true },
  panels: [{ type: Schema.Types.ObjectId, ref: 'Panel' }],
});

export default mongoose.model<IComic>('Comic', ComicSchema);
