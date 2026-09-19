import mongoose, { Schema, Document, Model } from 'mongoose';

export type BookingStatus = 'Pending' | 'Confirmed' | 'Assigned' | 'Completed' | 'Cancelled';

export interface IBooking extends Document {
  bookingId: string;
  customerName: string;
  phone: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  eventLocation: string;
  bouncersRequired: number;
  selectedBouncers: string[];
  additionalRequirement?: string;
  totalAmount: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingId: { type: String, required: true, unique: true, uppercase: true, trim: true },
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    eventType: { type: String, required: true },
    eventDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    eventLocation: { type: String, required: true, trim: true },
    bouncersRequired: { type: Number, required: true, min: 1, default: 1 },
    selectedBouncers: { type: [String], default: [] },
    additionalRequirement: { type: String, default: '' },
    totalAmount: { type: Number, required: true, default: 1500 },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Assigned', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
