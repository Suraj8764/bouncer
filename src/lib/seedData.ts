import { Bouncer } from '@/models/Bouncer';
import { Booking } from '@/models/Booking';
import { connectToDatabase } from '@/lib/mongodb';

export const initialBouncers = [
  {
    bouncerId: 'BNC-001',
    name: 'Raj Kumar',
    image: '/images/raj_kumar.png',
    height: "6'2\"",
    experience: '5 Yrs Exp',
    location: 'Bhadrak',
    price: 1500,
    description:
      'Experienced professional security personnel suitable for weddings, parties, and private VIP events. Rigorously certified in high-capacity crowd control, psychological conflict de-escalation, and tactical close-protection escort protocols.',
    isAvailable: true,
    rating: 4.9,
    missionsCount: 84,
    specializations: [
      'VIP Protection',
      'Crowd Management',
      'Night Events',
      'Physical Fitness Certified',
      'De-escalation Master',
    ],
  },
  {
    bouncerId: 'BNC-004',
    name: 'Vikram Singh',
    image: '/images/vikram_singh.png',
    height: "6'3\"",
    experience: '7 Yrs Exp',
    location: 'Bhadrak',
    price: 1800,
    description:
      'Senior close-protection operative specialized in high-risk private escort, perimeter breach defense, and executive motorcade protection.',
    isAvailable: false,
    rating: 4.95,
    missionsCount: 112,
    specializations: [
      'Close Protection',
      'Armed Response',
      'Tactical Escort',
      'Perimeter Defense',
    ],
  },
  {
    bouncerId: 'BNC-009',
    name: 'Amit Samal',
    image: '/images/amit_samal.png',
    height: "6'1\"",
    experience: '4 Yrs Exp',
    location: 'Bhadrak',
    price: 1400,
    description:
      'Senior VIP bodyguard with calm authority in fitted executive blazer and acoustic earpiece. Certified in dispute mediation and VIP gatekeeping.',
    isAvailable: true,
    rating: 4.88,
    missionsCount: 65,
    specializations: [
      'VIP Gatekeeper',
      'Guestlist Control',
      'CPR & First Aid',
      'Crowd Flow',
    ],
  },
  {
    bouncerId: 'BNC-012',
    name: 'Marcus Vance',
    image: '/images/hero_bouncers.png',
    height: "6'4\"",
    experience: '8 Yrs Exp',
    location: 'Bhubaneswar',
    price: 2200,
    description:
      'Lead Security Specialist with extensive background in international summit details, luxury venue protocol, and tactical squad coordination.',
    isAvailable: true,
    rating: 4.98,
    missionsCount: 140,
    specializations: [
      'Lead Sec',
      'Tactical Squad',
      'Executive Discretion',
      'Event Barricade',
    ],
  },
];

export const initialBookings = [
  {
    bookingId: 'BKG-10025',
    customerName: 'Ramesh Mohanty',
    phone: '9876543210',
    eventType: 'Wedding',
    eventDate: '2026-09-25',
    startTime: '18:00',
    endTime: '23:30',
    eventLocation: 'Grand Palace Hall, Bhadrak',
    bouncersRequired: 2,
    selectedBouncers: ['BNC-001', 'BNC-004'],
    additionalRequirement:
      'VIP guestlist check at entrance and perimeter guarding around the stage.',
    totalAmount: 3000,
    status: 'Pending',
  },
];

export async function ensureSeedData() {
  await connectToDatabase();
  const bouncerCount = await Bouncer.countDocuments();
  if (bouncerCount === 0) {
    await Bouncer.insertMany(initialBouncers);
    console.log('Seed: Created initial bouncers.');
  }

  const bookingCount = await Booking.countDocuments();
  if (bookingCount === 0) {
    await Booking.insertMany(initialBookings);
    console.log('Seed: Created initial booking.');
  }
}
