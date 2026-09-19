import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBouncer extends Document {
  name: string;
  bouncerId: string;
  image: string;
  height: string;
  experience: string;
  location: string;
  price: number;
  description: string;
  isAvailable: boolean;
  rating?: number;
  missionsCount?: number;
  specializations?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BouncerSchema = new Schema<IBouncer>(
  {
    name: { type: String, required: true, trim: true },
    bouncerId: { type: String, required: true, unique: true, uppercase: true, trim: true },
    image: { type: String, required: true },
    height: { type: String, required: true },
    experience: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 4.9 },
    missionsCount: { type: Number, default: 42 },
    specializations: { type: [String], default: ['VIP Protection', 'Crowd Management', 'Night Events'] },
  },
  {
    timestamps: true,
  }
);

export const Bouncer: Model<IBouncer> =
  mongoose.models.Bouncer || mongoose.model<IBouncer>('Bouncer', BouncerSchema);

export default Bouncer;
