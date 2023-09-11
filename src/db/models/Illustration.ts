import mongoose, { Schema, Document } from 'mongoose';

export interface IIllustration extends Document {
  title: string;
  description: string;
  publication_date: Date;
  url: string;
  width: number;
  height: number;
}

const IllustrationSchema: Schema = new Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  publication_date: { type: Date, required: true },
  url: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
});

export default mongoose.models.Illustration ||
  mongoose.model<IIllustration>('Illustration', IllustrationSchema);
