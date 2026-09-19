'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { BouncerData } from '@/components/BouncerCard';

function BookingFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryBouncerId = searchParams.get('bouncerId') || 'BNC-001';
  const queryEventType = searchParams.get('type') || 'Wedding';

  const [bouncer, setBouncer] = useState<BouncerData | null>(null);
  const [loadingBouncer, setLoadingBouncer] = useState(true);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState(
    queryEventType === 'wedding' ? 'Wedding' :
    queryEventType === 'party' ? 'Party' :
    queryEventType === 'corporate' ? 'Corporate' :
    queryEventType === 'vip' ? 'Concert' : 'Wedding'
  );
  const [eventDate, setEventDate] = useState(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [startTime, setStartTime] = useState('18:00');
  const [endTime, setEndTime] = useState('23:30');
  const [location, setLocation] = useState('Royal Palace Grounds, Aradi Road, Bhadrak');
  const [bouncersCount, setBouncersCount] = useState(2);
  const [requirements, setRequirements] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch bouncer details
  useEffect(() => {
    async function fetchBouncer() {
      try {
        setLoadingBouncer(true);
        const res = await fetch(`/api/bouncers/${queryBouncerId}`);
        const json = await res.json();
        if (json.success && json.data) {
          setBouncer(json.data);
        }
      } catch (e) {
        console.error('Failed to load bouncer for booking:', e);
      } finally {
        setLoadingBouncer(false);
      }
    }
    fetchBouncer();
  }, [queryBouncerId]);

  const baseRate = bouncer?.price || 1500;
  const totalCost = baseRate * bouncersCount;
  const depositLock = Math.round(totalCost * 0.4);

  const handleOperativeChange = (delta: number) => {
    const next = bouncersCount + delta;
    if (next >= 1 && next <= 12) {
      setBouncersCount(next);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    // Validation
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      setSubmitting(false);
      return;
    }

    if (!phone.trim() || phone.length < 10) {
      setErrorMessage('Please enter a valid mobile number (10 digits).');
      setSubmitting(false);
      return;
    }

    if (!eventDate) {
      setErrorMessage('Please select an event date.');
      setSubmitting(false);
      return;
    }

    // Check if date is in the past
    const selectedDate = new Date(eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setErrorMessage('Event date cannot be in the past.');
      setSubmitting(false);
      return;
    }

    if (!startTime || !endTime) {
      setErrorMessage('Please select both start and end times.');
      setSubmitting(false);
      return;
    }

    // Validate time range
    if (startTime >= endTime) {
      setErrorMessage('End time must be after start time.');
      setSubmitting(false);
      return;
    }

    if (!location.trim()) {
      setErrorMessage('Please enter the event location.');
      setSubmitting(false);
      return;
    }

    if (bouncersCount < 1) {
      setErrorMessage('At least 1 bouncer is required.');
      setSubmitting(false);
      return;
    }

    // Check if bouncer is available
    if (bouncer && !bouncer.isAvailable) {
      setErrorMessage('The selected bouncer is currently unavailable. Please choose another bouncer.');
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        customerName: fullName.trim(),
        phone: phone.trim(),
        eventType,
        eventDate,
        startTime,
        endTime,
        eventLocation: location.trim(),
        bouncersRequired: bouncersCount,
        selectedBouncers: bouncer ? [bouncer.bouncerId] : ['BNC-001'],
        additionalRequirement: requirements,
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.data?.bookingId) {
        router.push(`/booking-success/${data.data.bookingId}`);
      } else {
        setErrorMessage(data.error || 'Failed to dispatch booking request. Please check inputs.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network failure occurred';
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
      <Header showBack backHref={bouncer ? `/bouncers/${bouncer.bouncerId}` : '/bouncers'} title="Book a Bouncer" />

      <main className="w-full pt-24 sm:pt-28 bg-background min-h-screen pb-24 lg:pb-16 overflow-x-hidden">
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-primary-container/10 blur-[120px] pointer-events-none"></div>
          <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-secondary-container/20 blur-[100px] pointer-events-none"></div>

          <div className="w-full max-w-[1280px] mx-auto px-margin py-space-lg lg:py-space-xl">
            
            {/* Header Title Block */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-xl">
              <div className="max-w-2xl">
                <div className="flex items-center gap-space-xs mb-space-xs text-primary">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary font-semibold">Priority Personnel Requisition</span>
                </div>
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight uppercase">
                  Book a <span className="text-primary underline decoration-primary/30 underline-offset-8">Bouncer</span>
                </h1>
                <p className="mt-space-sm font-body-lg text-body-lg text-on-surface-variant">
                  Secure professional security for your upcoming event. Fully vetted, discreet VIP close-protection personnel deployed on demand.
                </p>
              </div>
              <div className="flex items-center gap-space-sm self-start lg:self-auto bg-surface-container-low px-space-md py-space-xs rounded-xl shadow-md border border-white/10 vengeance-card">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                <span className="font-mono text-[11px] text-on-surface font-semibold tracking-wide">Express Dispatch: 15-Min Response</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-start w-full min-w-0 max-w-full">
              
              {/* Form Input Area (8 Cols) */}
              <div className="lg:col-span-8 flex flex-col gap-space-lg min-w-0">
                
                {/* Selected Lead Officer Card Preview */}
                <div className="vengeance-card hud-corner-tl relative overflow-hidden rounded-2xl bg-surface-container-low shadow-xl border border-white/10">
                  <div className="p-space-md md:p-space-lg flex flex-col sm:flex-row items-center sm:items-start gap-space-md md:gap-space-lg">
                    <div className="relative shrink-0">
                      <img
                        alt={bouncer?.name || 'Selected Lead Operative'}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shadow-lg filter grayscale contrast-110"
                        src={bouncer?.image || '/images/raj_kumar.png'}
                      />
                      <span className="absolute -bottom-2 -right-2 bg-surface-container-lowest text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-lg shadow-md font-bold border border-white/10">
                        TIER-1
                      </span>
                    </div>

                    <div className="flex-1 w-full text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-xs">
                        <div>
                          <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">Lead Executive</span>
                          <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
                            {bouncer?.name || 'Raj Kumar'}
                          </h2>
                        </div>
                        <div className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-space-sm py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 self-center sm:self-auto border border-emerald-500/20">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">Available Now</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-space-md gap-y-1 text-on-surface-variant font-body-sm text-body-sm mb-space-md">
                        <span className="font-mono text-outline">ID: {bouncer?.bouncerId || 'BNC-001'}</span>
                        <span>•</span>
                        <span>{bouncer?.height || "6'2\" Height"}</span>
                        <span>•</span>
                        <span>{bouncer?.experience || '5 Yrs Exp'}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-on-surface">
                          <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                          {bouncer?.location || 'Bhadrak Central'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-space-sm bg-surface-container/60 -mx-space-md -mb-space-md sm:-mx-space-lg sm:-mb-space-lg px-space-md sm:px-space-lg py-space-sm mt-auto border-t border-white/5">
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Base Rate</span>
                          <span className="font-headline-sm text-headline-sm text-primary font-bold">
                            ₹{baseRate.toLocaleString('en-IN')} <span className="font-body-sm text-body-sm text-on-surface font-normal">/ Event</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-[16px]">verified</span>
                          <span>Classified Background Passed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-space-md rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 font-label-md text-label-md flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">error</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Section 01: Client Identification */}
                <div className="bg-surface-container-low rounded-xl p-space-md md:p-space-lg shadow-xl flex flex-col gap-space-md border border-white/5">
                  <div className="flex items-center justify-between pb-space-xs border-b border-white/5">
                    <div className="flex items-center gap-space-sm">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-surface-container-high text-primary font-label-md font-bold">01</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Client Identification</h3>
                    </div>
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Confidential Form</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold" htmlFor="fullName">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">badge</span>
                        <input
                          id="fullName"
                          required
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Vikramaditya Rath"
                          className="w-full h-12 bg-surface-container-lowest text-on-surface pl-10 pr-space-md rounded-lg font-body-md text-body-md placeholder:text-outline/50 focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-inner transition-all border border-white/5"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold" htmlFor="mobileNumber">
                        Mobile Contact <span className="text-primary">*</span>
                      </label>
                      <div className="flex h-12 rounded-lg overflow-hidden bg-surface-container-lowest focus-within:ring-1 focus-within:ring-primary shadow-inner border border-white/5 transition-all">
                        <span className="flex items-center justify-center px-3 bg-surface-container-high text-primary font-label-md text-label-md font-bold select-none border-r border-white/5 shrink-0">
                          +91
                        </span>
                        <input
                          id="mobileNumber"
                          required
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="98765 43210"
                          maxLength={10}
                          className="w-full bg-transparent text-on-surface px-space-md font-body-md text-body-md placeholder:text-outline/50 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 02: Event Parameters */}
                <div className="bg-surface-container-low rounded-xl p-space-md md:p-space-lg shadow-xl flex flex-col gap-space-md border border-white/5">
                  <div className="flex items-center justify-between pb-space-xs border-b border-white/5">
                    <div className="flex items-center gap-space-sm">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-surface-container-high text-primary font-label-md font-bold">02</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Event Parameters</h3>
                    </div>
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Tactical Plan</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold" htmlFor="eventType">
                        Event Classification <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">event</span>
                        <select
                          id="eventType"
                          value={eventType}
                          onChange={(e) => setEventType(e.target.value)}
                          className="w-full h-12 bg-surface-container-lowest text-on-surface pl-10 pr-8 rounded-lg font-body-md text-body-md focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-inner appearance-none transition-all cursor-pointer border border-white/5"
                        >
                          <option value="Wedding">Wedding Ceremony / Reception</option>
                          <option value="Party">Birthday / Private Party</option>
                          <option value="Corporate">Corporate Function &amp; AGM</option>
                          <option value="Concert">Concert / Live Festival</option>
                          <option value="VIP Escort">VIP Personal Escort &amp; Convoy</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[18px]">arrow_drop_down</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold" htmlFor="eventDate">
                        Deployment Date <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">calendar_today</span>
                        <input
                          id="eventDate"
                          required
                          type="date"
                          value={eventDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full h-12 bg-surface-container-lowest text-on-surface pl-10 pr-space-md rounded-lg font-body-md text-body-md focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-inner transition-all border border-white/5"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold" htmlFor="startTime">
                        Operational Window (Start - End) <span className="text-primary">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          id="startTime"
                          required
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="h-12 bg-surface-container-lowest text-on-surface px-3 rounded-lg font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-inner border border-white/5"
                        />
                        <input
                          id="endTime"
                          required
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="h-12 bg-surface-container-lowest text-on-surface px-3 rounded-lg font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-inner border border-white/5"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold" htmlFor="location">
                        Venue GPS / Exact Address <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">pin_drop</span>
                        <input
                          id="location"
                          required
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Royal Palace Grounds, Bhadrak"
                          className="w-full h-12 bg-surface-container-lowest text-on-surface pl-10 pr-space-md rounded-lg font-body-md text-body-md placeholder:text-outline/50 focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-inner transition-all border border-white/5"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 03: Security Requisition Configuration */}
                <div className="bg-surface-container-low rounded-xl p-space-md md:p-space-lg shadow-xl flex flex-col gap-space-md border border-white/5">
                  <div className="flex items-center justify-between pb-space-xs border-b border-white/5">
                    <div className="flex items-center gap-space-sm">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-surface-container-high text-primary font-label-md font-bold">03</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Force Configuration</h3>
                    </div>
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Tactical Force</span>
                  </div>

                  <div className="flex flex-col gap-space-md">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm p-space-md rounded-xl bg-surface-container-lowest border border-white/5">
                      <div className="flex flex-col">
                        <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Total Force Required</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Recommended: 1 Guard per 50 Guests</span>
                      </div>
                      <div className="flex items-center gap-space-sm bg-surface-container-high p-1 rounded-xl border border-white/10">
                        <button
                          type="button"
                          onClick={() => handleOperativeChange(-1)}
                          disabled={bouncersCount <= 1}
                          className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface hover:text-primary active:scale-95 disabled:opacity-40 transition-all"
                        >
                          <span className="material-symbols-outlined text-[18px]">remove</span>
                        </button>
                        <span className="w-12 text-center font-display-lg text-[24px] text-primary font-bold">
                          {bouncersCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleOperativeChange(1)}
                          disabled={bouncersCount >= 12}
                          className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface hover:text-primary active:scale-95 disabled:opacity-40 transition-all"
                        >
                          <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold" htmlFor="requirements">
                        Additional Directives &amp; Protocol Requirements (Optional)
                      </label>
                      <textarea
                        id="requirements"
                        rows={3}
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        placeholder="e.g. Black Suit Dress Code required. VIP gate check with biometric list."
                        className="w-full bg-surface-container-lowest text-on-surface p-space-md rounded-lg font-body-md text-body-md placeholder:text-outline/50 focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-inner border border-white/5"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Summary & Checkout Panel (4 Cols) */}
              <div className="lg:col-span-4 flex flex-col gap-space-md lg:sticky lg:top-24">
                <div className="bg-surface-container p-space-lg rounded-2xl shadow-2xl border border-white/10 flex flex-col gap-space-md">
                  <div className="flex items-center justify-between pb-space-xs border-b border-white/10">
                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">
                      Requisition Summary
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">TIER-1 DISPATCH</span>
                  </div>

                  <div className="flex flex-col gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                    <div className="flex justify-between py-1">
                      <span>Lead Officer</span>
                      <span className="text-on-surface font-semibold">{bouncer?.name || 'Raj Kumar'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Total Operatives</span>
                      <span className="text-on-surface font-semibold">{bouncersCount} Officers</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Base Rate per Guard</span>
                      <span className="text-on-surface font-semibold">₹{baseRate.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Dispatch Contingency</span>
                      <span className="text-emerald-400 font-semibold">Covered (Free)</span>
                    </div>
                  </div>

                  <div className="pt-space-sm border-t border-white/10 flex flex-col gap-1">
                    <div className="flex items-baseline justify-between">
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Estimated Total Tariff</span>
                      <div className="text-right">
                        <span className="font-display-lg text-display-lg text-primary font-bold">
                          ₹{totalCost.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                    <span className="font-label-sm text-[11px] text-outline text-right">
                      Deposit Locked: ₹{depositLock.toLocaleString('en-IN')} (Settled on completion)
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-space-md px-space-lg rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary-fixed active:scale-[0.98] transition-all shadow-xl shadow-primary/20 disabled:opacity-50 mt-space-xs vengeance-btn border border-primary/40"
                  >
                    {submitting ? (
                      <>
                        <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                        <span>Dispatching Requisition...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          task_alt
                        </span>
                        <span>Confirm &amp; Dispatch Requisition</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-space-xs text-outline font-label-sm text-label-sm pt-space-xs">
                    <span className="material-symbols-outlined text-[14px]">lock</span>
                    <span>Classified Requisition • PSARA Certified</span>
                  </div>
                </div>
              </div>

            </form>

          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col bg-background font-body-md text-on-surface items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[36px] animate-spin">progress_activity</span>
          <p className="font-label-md uppercase tracking-widest text-outline mt-3">Initialising Dispatch Requisition...</p>
        </div>
      }
    >
      <BookingFormContent />
    </Suspense>
  );
}
