import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Booking } from '@/models/Booking';
import { Bouncer } from '@/models/Bouncer';
import { ensureSeedData } from '@/lib/seedData';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    await ensureSeedData();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const bookingId = searchParams.get('bookingId');
    const phone = searchParams.get('phone');

    const query: Record<string, unknown> = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (bookingId) {
      query.bookingId = bookingId.trim().toUpperCase();
    }
    if (phone) {
      // Normalize phone match (last 10 digits)
      const cleanPhone = phone.replace(/\D/g, '');
      query.phone = { $regex: new RegExp(cleanPhone.slice(-10) + '$') };
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: bookings.length, data: bookings });
  } catch (error: unknown) {
    console.error('Error fetching bookings:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const {
      customerName,
      phone,
      eventType,
      eventDate,
      startTime,
      endTime,
      eventLocation,
      bouncersRequired,
      selectedBouncers,
      additionalRequirement,
    } = body;

    if (!customerName || !phone || !eventType || !eventDate || !startTime || !endTime || !eventLocation) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all mandatory event fields.' },
        { status: 400 }
      );
    }

    // Check if selected bouncers are available
    if (selectedBouncers && selectedBouncers.length > 0) {
      const bouncerAvailability = await Bouncer.findOne({
        bouncerId: selectedBouncers[0].toUpperCase(),
      });
      
      if (!bouncerAvailability) {
        return NextResponse.json(
          { success: false, error: 'Selected bouncer not found.' },
          { status: 400 }
        );
      }

      if (!bouncerAvailability.isAvailable) {
        return NextResponse.json(
          { success: false, error: 'The selected bouncer is currently unavailable. Please choose another bouncer.' },
          { status: 400 }
        );
      }
    }

    // Determine unit price
    let unitPrice = 1500;
    if (selectedBouncers && selectedBouncers.length > 0) {
      const primaryBouncer = await Bouncer.findOne({
        bouncerId: selectedBouncers[0].toUpperCase(),
      });
      if (primaryBouncer && primaryBouncer.price) {
        unitPrice = primaryBouncer.price;
      }
    }

    const count = Number(bouncersRequired) || 1;
    const totalAmount = unitPrice * count;

    // Generate unique sequential Booking ID
    const totalBookings = await Booking.countDocuments();
    const bookingId = `BKG-${String(10000 + totalBookings + 1)}`;

    const newBooking = await Booking.create({
      bookingId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      eventType,
      eventDate,
      startTime,
      endTime,
      eventLocation: eventLocation.trim(),
      bouncersRequired: count,
      selectedBouncers: selectedBouncers || [],
      additionalRequirement: additionalRequirement || '',
      totalAmount,
      status: 'Pending',
    });

    return NextResponse.json({ success: true, data: newBooking }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating booking:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
