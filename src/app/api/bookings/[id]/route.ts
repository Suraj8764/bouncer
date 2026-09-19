import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import { Booking } from '@/models/Booking';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await props.params;

    let booking = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      booking = await Booking.findById(id);
    }
    if (!booking) {
      booking = await Booking.findOne({ bookingId: id.toUpperCase() });
    }

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error: unknown) {
    console.error('Error fetching booking:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await props.params;
    const body = await request.json();

    let booking = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      booking = await Booking.findByIdAndUpdate(id, body, { new: true });
    }
    if (!booking) {
      booking = await Booking.findOneAndUpdate(
        { bookingId: id.toUpperCase() },
        body,
        { new: true }
      );
    }

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error: unknown) {
    console.error('Error updating booking:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await props.params;

    let booking = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      booking = await Booking.findByIdAndDelete(id);
    }
    if (!booking) {
      booking = await Booking.findOneAndDelete({ bookingId: id.toUpperCase() });
    }

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Booking deleted' });
  } catch (error: unknown) {
    console.error('Error deleting booking:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
