'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';

interface BookingDetail {
  bookingId: string;
  customerName: string;
  phone: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  eventLocation: string;
  bouncersRequired: number;
  totalAmount: number;
  status: string;
  selectedBouncers?: string[];
}

export default function BookingSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = (params?.id as string)?.toUpperCase();

  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchBooking() {
      if (!bookingId) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/bookings/${bookingId}`);
        const data = await res.json();
        if (data.success && data.data) {
          setBooking(data.data);
        }
      } catch (e) {
        console.error('Failed to fetch booking:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, [bookingId]);

  const copyBookingId = () => {
    if (!bookingId) return;
    navigator.clipboard.writeText(bookingId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const depositLocked = booking ? Math.round(booking.totalAmount * 0.4) : 1500;

  return (
    <div className="bg-background text-on-surface font-body-md text-body-md min-h-screen flex flex-col antialiased selection:bg-primary selection:text-on-primary">
      <Header />

      <main className="w-full pt-24 sm:pt-28 bg-background min-h-screen pb-24 lg:pb-16 overflow-x-hidden">
        <div className="relative w-full overflow-hidden py-space-lg md:py-space-xl px-margin">
          
          {/* Tactical Grid & Radar Glow Decorators */}
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-30">
            <div className="h-[580px] w-[580px] rounded-full bg-radial from-primary/15 via-surface-tint/5 to-transparent blur-3xl animate-pulse-glow"></div>
          </div>
          <div className="pointer-events-none absolute -top-24 right-1/4 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[90px]"></div>

          {/* Central Container */}
          <div className="mx-auto w-full max-w-[1080px] flex flex-col items-center">
            
            {/* Top Status Announcement */}
            <div className="flex flex-col items-center text-center max-w-2xl mb-space-lg md:mb-space-xl">
              <div className="relative mb-space-md">
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-primary/30 to-emerald-500/30 blur-md opacity-70 animate-pulse"></div>
                <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-surface-container-high shadow-2xl text-primary border border-white/10">
                  <svg className="w-12 h-12 stroke-[1.8] text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4L7 11V22C7 33.2 14.3 43.6 24 46C33.7 43.6 41 33.2 41 22V11L24 4Z" fill="#1e2022" stroke="currentColor"></path>
                    <path d="M16 23.5L21.5 29L32 18.5" stroke="#ffce74" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                  </svg>
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                  </span>
                </div>
              </div>

              {/* Dynamic Status Tag */}
              <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-primary/10 text-primary mb-space-sm shadow-md border border-primary/25 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest font-bold">
                  STATUS: {booking?.status?.toUpperCase() || 'PENDING VERIFICATION'}
                </span>
                <span className="text-outline-variant">•</span>
                <span className="font-mono text-[11px] text-on-surface-variant font-medium">Submitted Just Now</span>
                <span className="text-outline-variant">•</span>
                <span className="font-mono text-[11px] text-primary-fixed-dim font-bold tracking-wider">
                  REF: {bookingId || 'BKG-10025'}
                </span>
              </div>

              {/* Prominent Headline */}
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight uppercase mb-space-xs">
                Booking Request Submitted
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                We’ve received your operational requisition. Operations Command is triaging officer telemetry and will patch through via secure phone within <span className="text-primary font-semibold">15 minutes</span>.
              </p>
            </div>

            {/* MAIN REQUISITION PASS (Tactical Voucher Ticket) */}
            <div className="w-full relative rounded-2xl bg-surface-container-low shadow-[0_24px_50px_-12px_rgba(0,0,0,0.85)] overflow-hidden mb-space-lg border border-white/5">
              
              {/* Upper Ticket Bar */}
              <div className="relative bg-surface-container px-space-md md:px-space-lg py-space-sm flex flex-wrap items-center justify-between gap-space-sm border-b border-white/5">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified_user
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm tracking-widest uppercase text-on-surface font-bold">
                      TACTICAL MISSION PASS
                    </span>
                    <span className="font-label-sm text-label-sm text-outline tracking-wider">
                      AUTHORITY LEVEL: EXECUTIVE ESCORT TIER-1
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-space-md">
                  <button
                    onClick={copyBookingId}
                    className="flex items-center gap-1.5 px-space-sm py-1 rounded bg-surface-container-highest hover:bg-surface-container-high transition-colors text-primary font-label-md text-label-md font-bold tracking-widest border border-white/5"
                  >
                    <span>#{bookingId || 'BKG-10025'}</span>
                    <span className="material-symbols-outlined text-[16px]">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Ticket Body Details Bento */}
              <div className="p-space-md md:p-space-lg lg:p-space-xl grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
                
                {/* Left Specs Column (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-space-md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    
                    {/* Event Classification */}
                    <div className="flex flex-col p-space-md rounded-xl bg-surface-container-high/80 border border-white/5">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">event_available</span> Event Classification
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        {booking?.eventType || 'Wedding Ceremony / Reception'}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">High-Visibility VIP Escort</span>
                    </div>

                    {/* Personnel Count */}
                    <div className="flex flex-col p-space-md rounded-xl bg-surface-container-high/80 border border-white/5">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">badge</span> Headcount Deployment
                      </span>
                      <span className="font-headline-sm text-headline-sm text-primary font-semibold">
                        {booking?.bouncersRequired || 2} Security Officers
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">1 Lead Escort + {Math.max(0, (booking?.bouncersRequired || 2) - 1)} Tactical Support</span>
                    </div>

                    {/* Deployment Window */}
                    <div className="flex flex-col p-space-md rounded-xl bg-surface-container-high/80 border border-white/5">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">schedule</span> Deployment Window
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        {booking?.eventDate || '25 September 2026'}
                      </span>
                      <span className="font-body-sm text-body-sm text-primary-fixed-dim mt-0.5">
                        {booking?.startTime || '18:00'} – {booking?.endTime || '23:30'} IST
                      </span>
                    </div>

                    {/* Estimated Tariff */}
                    <div className="flex flex-col p-space-md rounded-xl bg-surface-container-high/80 border border-white/5">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">payments</span> Reserved Rate Tariff
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display-lg-mobile text-display-lg-mobile text-primary font-bold tracking-tight">
                          ₹{booking?.totalAmount ? booking.totalAmount.toLocaleString('en-IN') : '3,000'}
                        </span>
                        <span className="font-label-sm text-label-sm text-outline uppercase">Total</span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Deposit Lock: ₹{depositLocked.toLocaleString('en-IN')}</span>
                    </div>

                  </div>

                  {/* Location Coordinates */}
                  <div className="flex items-start gap-space-sm p-space-md rounded-xl bg-surface-container-high/80 border border-white/5">
                    <span className="material-symbols-outlined text-primary text-[24px] mt-0.5 shrink-0">pin_drop</span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Target Tactical Zone / Venue Address</span>
                      <span className="font-body-lg text-body-lg font-semibold text-on-surface">
                        {booking?.eventLocation || 'Royal Palace Grounds, Bhadrak, Odisha'}
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        Client: {booking?.customerName || 'Vikramaditya Rath'} • Tel: +91 {booking?.phone || '98400-XXXXX'}
                      </span>
                    </div>
                  </div>

                  {/* Quick Barcode Digital Stamp */}
                  <div className="flex items-center justify-between pt-space-xs px-space-xs text-outline border-t border-white/5">
                    <div className="flex items-center gap-space-xs font-label-sm text-label-sm tracking-widest uppercase">
                      <span className="material-symbols-outlined text-[16px] text-emerald-400">lock</span>
                      <span>SHA-256 Encrypted Requisition</span>
                    </div>
                    <div className="font-label-sm text-label-sm tracking-widest text-right font-mono">
                      SEC-ID: {bookingId || 'BKG-10025'}
                    </div>
                  </div>
                </div>

                {/* Right Assigned Personnel Preview (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-surface-container-highest/60 rounded-xl p-space-md border border-white/5">
                  <div>
                    <div className="flex items-center justify-between mb-space-sm">
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Command Roster Assignment</span>
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Lead Assigned
                      </span>
                    </div>

                    {/* Officer Card Component */}
                    <div className="flex items-center gap-space-md p-space-sm rounded-lg bg-surface-container-low mb-space-md border border-white/5">
                      <div className="relative shrink-0">
                        <img
                          alt="Raj Kumar - Assigned Lead"
                          className="w-16 h-16 rounded-lg object-cover filter grayscale contrast-110"
                          src="/images/raj_kumar.png"
                        />
                        <span className="absolute bottom-0 right-0 p-0.5 rounded bg-surface-container-lowest text-primary text-[10px] font-bold">
                          L1
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">Raj Kumar</span>
                        <span className="font-body-sm text-body-sm text-primary">Chief Executive Guard • Krav Maga</span>
                        <span className="font-body-sm text-body-sm text-outline">PSARA ID: #PS-OD-2025-001</span>
                      </div>
                    </div>

                    {/* Live Operations Telemetry */}
                    <div className="flex flex-col gap-space-xs p-space-sm rounded-lg bg-surface-container-lowest border border-white/5">
                      <div className="flex items-center justify-between font-label-sm text-label-sm text-outline uppercase">
                        <span>Dispatch Protocol</span>
                        <span className="text-emerald-400 font-semibold">ACTIVE QUEUE</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Officers placed on standby alert. Direct dispatch corridor will mobilize 60 minutes prior to event start time.
                      </p>
                    </div>
                  </div>

                  {/* Actions inside Right Panel */}
                  <div className="flex flex-col gap-space-xs mt-space-md pt-space-sm border-t border-white/5">
                    <Link
                      href={`/status?id=${bookingId || 'BKG-10025'}`}
                      className="w-full py-space-sm px-space-md bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md font-bold rounded-xl flex items-center justify-center gap-space-xs transition-all shadow-lg shadow-primary/20 vengeance-btn border border-primary/40"
                    >
                      <span className="material-symbols-outlined text-[18px]">travel_explore</span>
                      <span>Track Mission Status</span>
                    </Link>
                    <a
                      href="tel:91800268623"
                      className="w-full py-space-sm px-space-md bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md rounded-xl flex items-center justify-center gap-space-xs transition-all border border-white/10 vengeance-btn"
                    >
                      <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                      <span>Speak to Shift Commander</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-wrap items-center justify-center gap-space-md pt-space-sm">
              <Link
                href="/bouncers"
                className="px-space-lg py-space-sm rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-all border border-white/10 vengeance-btn"
              >
                Return to Command Roster
              </Link>
              <Link
                href={`/status?id=${bookingId || 'BKG-10025'}`}
                className="px-space-lg py-space-sm rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-xl shadow-primary/20 hover:bg-primary-fixed transition-all vengeance-btn border border-primary/40"
              >
                Live Mission Tracker
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
