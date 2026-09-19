import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import { Bouncer } from '@/models/Bouncer';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await props.params;

    let bouncer = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      bouncer = await Bouncer.findById(id);
    }
    if (!bouncer) {
      bouncer = await Bouncer.findOne({ bouncerId: id.toUpperCase() });
    }

    if (!bouncer) {
      return NextResponse.json(
        { success: false, error: 'Bouncer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: bouncer });
  } catch (error: unknown) {
    console.error('Error fetching bouncer:', error);
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

    let bouncer = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      bouncer = await Bouncer.findByIdAndUpdate(id, body, { new: true });
    }
    if (!bouncer) {
      bouncer = await Bouncer.findOneAndUpdate(
        { bouncerId: id.toUpperCase() },
        body,
        { new: true }
      );
    }

    if (!bouncer) {
      return NextResponse.json(
        { success: false, error: 'Bouncer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: bouncer });
  } catch (error: unknown) {
    console.error('Error updating bouncer:', error);
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

    // First, find the bouncer to get their bouncerId
    let bouncer = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      bouncer = await Bouncer.findById(id);
    }
    if (!bouncer) {
      bouncer = await Bouncer.findOne({ bouncerId: id.toUpperCase() });
    }

    if (!bouncer) {
      return NextResponse.json(
        { success: false, error: 'Bouncer not found' },
        { status: 404 }
      );
    }

    // Check if bouncer has any active bookings
    const { Booking } = await import('@/models/Booking');
    const activeBookings = await Booking.find({
      selectedBouncers: bouncer.bouncerId,
      status: { $in: ['Pending', 'Confirmed', 'Assigned'] }
    });
    
    if (activeBookings.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete bouncer with active bookings. Complete or cancel bookings first.' },
        { status: 400 }
      );
    }

    // Now delete the bouncer
    let deletedBouncer = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      deletedBouncer = await Bouncer.findByIdAndDelete(id);
    }
    if (!deletedBouncer) {
      deletedBouncer = await Bouncer.findOneAndDelete({ bouncerId: id.toUpperCase() });
    }

    if (!deletedBouncer) {
      return NextResponse.json(
        { success: false, error: 'Bouncer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deletedBouncer });
  } catch (error: unknown) {
    console.error('Error deleting bouncer:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
