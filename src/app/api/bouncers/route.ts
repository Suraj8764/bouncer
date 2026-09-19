import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Bouncer } from '@/models/Bouncer';
import { ensureSeedData } from '@/lib/seedData';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    await ensureSeedData();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const availableOnly = searchParams.get('available');

    const query: Record<string, unknown> = {};
    if (location && location !== 'all') {
      query.location = { $regex: new RegExp(location, 'i') };
    }
    if (availableOnly === 'true') {
      query.isAvailable = true;
    }

    const bouncers = await Bouncer.find(query).sort({ isAvailable: -1, createdAt: -1 });
    return NextResponse.json({ success: true, count: bouncers.length, data: bouncers });
  } catch (error: unknown) {
    console.error('Error fetching bouncers:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.name || !body.price || !body.location) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (name, price, location)' },
        { status: 400 }
      );
    }

    // Auto-generate bouncer ID if not provided
    if (!body.bouncerId) {
      const count = await Bouncer.countDocuments();
      body.bouncerId = `BNC-${String(count + 1).padStart(3, '0')}`;
    }

    // Default image if not provided
    if (!body.image) {
      body.image = '/images/raj_kumar.png';
    }

    const newBouncer = await Bouncer.create(body);
    return NextResponse.json({ success: true, data: newBouncer }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating bouncer:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
