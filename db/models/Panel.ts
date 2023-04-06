import mongoose, { Schema, Document } from 'mongoose';

export interface IPanel extends Document {
  comic_id: Schema.Types.ObjectId;
  panel_number: number;
  image_url: string;
  transcription: string;
}

const PanelSchema: Schema = new Schema({
  comic_id: { type: Schema.Types.ObjectId, ref: 'Comic', required: true },
  panel_number: { type: Number, required: true },
  image_url: { type: String, required: true },
  transcription: { type: String, required: true },
});

export default mongoose.model<IPanel>('Panel', PanelSchema);
