'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { BouncerData } from '@/components/BouncerCard';

interface BookingItem {
  _id?: string;
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
  status: 'Pending' | 'Confirmed' | 'Assigned' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [bouncers, setBouncers] = useState<BouncerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBookingForAssign, setActiveBookingForAssign] = useState<BookingItem | null>(null);
  const [selectedBouncerIds, setSelectedBouncerIds] = useState<string[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const [bookingsRes, bouncersRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/bouncers'),
      ]);

      const bookingsJson = await bookingsRes.json();
      const bouncersJson = await bouncersRes.json();

      if (bookingsJson.success) setBookings(bookingsJson.data);
      if (bouncersJson.success) setBouncers(bouncersJson.data);
    } catch (e) {
      console.error('Failed to load dispatch data:', e);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateStatus = async (bookingId: string, newStatus: string, assignedBouncers?: string[]) => {
    try {
      setActionLoading(bookingId);
      const payload: Record<string, unknown> = { status: newStatus };
      if (assignedBouncers) {
        payload.selectedBouncers = assignedBouncers;
      }

      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b.bookingId === bookingId
              ? {
                  ...b,
                  status: newStatus as BookingItem['status'],
                  selectedBouncers: assignedBouncers || b.selectedBouncers,
                }
              : b
          )
        );
        
        // If assigned, refresh bouncers list to update availability
        if (newStatus === 'Assigned' && assignedBouncers) {
          const bouncersRes = await fetch('/api/bouncers');
          const bouncersJson = await bouncersRes.json();
          if (bouncersJson.success) {
            setBouncers(bouncersJson.data);
          }
        }
      }
    } catch (e) {
      console.error('Failed to update status:', e);
    } finally {
      setActionLoading(null);
    }
  };

  const openAssignModal = (booking: BookingItem) => {
    setActiveBookingForAssign(booking);
    setSelectedBouncerIds(booking.selectedBouncers || []);
  };

  const handleToggleBouncerSelection = (bouncerId: string) => {
    if (selectedBouncerIds.includes(bouncerId)) {
      setSelectedBouncerIds(selectedBouncerIds.filter((id) => id !== bouncerId));
    } else {
      setSelectedBouncerIds([...selectedBouncerIds, bouncerId]);
    }
  };

  const handleConfirmAssignment = async () => {
    if (!activeBookingForAssign) return;
    
    // Validate that the number of selected bouncers matches the required count
    if (selectedBouncerIds.length < activeBookingForAssign.bouncersRequired) {
      alert(`Please select ${activeBookingForAssign.bouncersRequired} operative(s) for this assignment.`);
      return;
    }

    // Check if selected bouncers are available
    const unavailableBouncers = selectedBouncerIds.filter(bid => {
      const bouncer = bouncers.find(b => b.bouncerId === bid);
      return !bouncer || !bouncer.isAvailable;
    });

    if (unavailableBouncers.length > 0) {
      alert('Some selected operatives are currently unavailable. Please choose different operatives.');
      return;
    }

    await handleUpdateStatus(activeBookingForAssign.bookingId, 'Assigned', selectedBouncerIds);
    setActiveBookingForAssign(null);
  };

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus !== 'all' && b.status.toLowerCase() !== filterStatus.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.bookingId.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.eventLocation.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const assignedCount = bookings.filter((b) => b.status === 'Assigned').length;
  const completedCount = bookings.filter((b) => b.status === 'Completed').length;
  const totalValue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  return (
    <AdminLayout activeNav="bookings">
      <div className="flex flex-col gap-space-lg">
        
        {/* Top Header Area */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-wider">
              <span className="hover:text-primary transition-colors cursor-pointer">Operations</span>
              <span className="material-symbols-outlined text-[12px] text-outline">chevron_right</span>
              <span className="text-primary font-semibold">Requisitions &amp; Dispatch Queue</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight uppercase">
              Booking Requisitions <span className="text-primary">&amp;</span> Dispatch Management
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-space-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>Live tactical deployment queue</span>
              <span className="text-outline">/</span>
              <span className="text-on-surface font-semibold">{bookings.length} Total Records</span>
              <span className="text-outline">/</span>
              <span className="text-primary font-semibold">{pendingCount} Actions Required</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <button
              onClick={() => window.print()}
              className="h-12 px-space-md rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-all flex items-center gap-space-xs shadow-md border border-white/5"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">file_download</span>
              <span>Export Manifest</span>
            </button>
            <Link
              href="/book"
              className="h-12 px-space-lg rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md font-semibold transition-all transform active:scale-95 flex items-center gap-space-xs shadow-xl"
            >
              <span className="material-symbols-outlined text-on-primary text-[20px]">add_moderator</span>
              <span>Manual Requisition (+)</span>
            </Link>
          </div>
        </div>

        {/* Top 3 KPI Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between shadow-md border border-white/5">
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Active Squads Deployed</span>
              <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-none font-bold">
                {assignedCount + confirmedCount}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Operatives across 4 regional sectors</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary shadow-inner border border-white/5">
              <span className="material-symbols-outlined text-[26px]">shield</span>
            </div>
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between shadow-md border border-white/5 relative overflow-hidden">
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">Pending Triage</span>
              <div className="flex items-baseline gap-space-xs">
                <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-none font-bold">
                  {pendingCount.toString().padStart(2, '0')}
                </span>
                {pendingCount > 0 && (
                  <span className="font-label-sm text-label-sm text-rose-400 uppercase font-semibold">Triage Alert</span>
                )}
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Immediate deployment dispatch required</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20">
              <span className="material-symbols-outlined text-[26px] animate-pulse">crisis_alert</span>
            </div>
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between shadow-md border border-white/5">
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Gross Booked Value</span>
              <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-none font-bold">
                ₹{totalValue.toLocaleString('en-IN')}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Escrow &amp; retainers locked</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary shadow-inner border border-white/5">
              <span className="material-symbols-outlined text-[26px]">payments</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Module */}
        <div className="flex flex-col gap-space-sm p-space-md rounded-xl bg-surface-container-low shadow-md border border-white/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-xs bg-surface-container-lowest p-space-xs rounded-lg shadow-inner border border-white/5 overflow-x-auto">
              {[
                { id: 'all', label: `All Bookings (${bookings.length})` },
                { id: 'pending', label: `Pending Triage (${pendingCount})`, ping: pendingCount > 0 },
                { id: 'confirmed', label: `Confirmed (${confirmedCount})` },
                { id: 'assigned', label: `Assigned (${assignedCount})` },
                { id: 'completed', label: `Completed (${completedCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id)}
                  className={`px-space-md py-space-xs rounded font-label-md text-label-md transition-colors flex items-center gap-space-xs whitespace-nowrap ${
                    filterStatus === tab.id
                      ? 'bg-primary text-on-primary font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {tab.ping && <span className="w-1.5 h-1.5 rounded-full bg-on-primary animate-ping" />}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-wider shrink-0">
              <span className="material-symbols-outlined text-[16px] text-primary">sync</span>
              <span>Auto-sync: Live</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm pt-space-xs">
            <div className="md:col-span-12 relative">
              <span className="material-symbols-outlined text-[20px] text-outline absolute left-space-md top-1/2 -translate-y-1/2">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Requisition ID (e.g. #BKG-10025), Client Name, or Venue..."
                className="w-full h-12 pl-12 pr-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline/50 focus:outline-none focus:ring-1 focus:ring-primary shadow-inner border border-white/5"
              />
            </div>
          </div>
        </div>

        {/* Bookings Manifest List */}
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Operational Tactical Manifest</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Showing {filteredBookings.length} requisitions
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center bg-surface-container-low rounded-xl border border-white/5">
              <span className="material-symbols-outlined text-primary text-[36px] animate-spin">progress_activity</span>
              <p className="font-label-md uppercase tracking-widest text-outline mt-2">Loading Requisitions...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-low rounded-xl border border-white/5">
              <span className="material-symbols-outlined text-outline text-[40px] mb-2">inbox</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">No Requisitions Found</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                No booking records match the selected status filter.
              </p>
            </div>
          ) : (
            filteredBookings.map((b) => {
              const isUrgent = b.status === 'Pending';
              const isConfirmed = b.status === 'Confirmed';
              const isAssigned = b.status === 'Assigned';

              return (
                <div
                  key={b.bookingId}
                  className={`p-space-md rounded-xl bg-surface-container shadow-xl transition-all relative overflow-hidden border ${
                    isUrgent ? 'border-primary/40 ring-1 ring-primary/20' : 'border-white/5'
                  }`}
                >
                  <div className="flex flex-col gap-space-sm">
                    {/* Top Row: Ref ID + Status + Tariff */}
                    <div className="flex flex-wrap items-center justify-between gap-space-xs pb-space-xs border-b border-white/5">
                      <div className="flex items-center gap-space-xs">
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-label-sm font-bold">
                          #{b.bookingId}
                        </span>
                        {isUrgent ? (
                          <span className="px-space-xs py-0.5 rounded-full bg-primary/20 text-primary font-label-sm text-label-sm font-bold flex items-center gap-1 border border-primary/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                            URGENT TRIAGE
                          </span>
                        ) : (
                          <span
                            className={`px-space-xs py-0.5 rounded-full font-label-sm text-label-sm font-bold uppercase ${
                              isConfirmed
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : isAssigned
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : 'bg-surface-container-highest text-outline'
                            }`}
                          >
                            {b.status}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-space-xs">
                        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Tariff:</span>
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">
                          ₹{b.totalAmount?.toLocaleString('en-IN')}
                        </span>
                        <span className="font-label-sm text-label-sm text-secondary">
                          (₹{Math.round((b.totalAmount || 0) * 0.4).toLocaleString('en-IN')} Escrow)
                        </span>
                      </div>
                    </div>

                    {/* Middle Row: Client info & Venue */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-space-xs">
                          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                            {b.customerName}
                          </span>
                          <span className="px-space-xs py-0.5 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold">
                            VIP Tier-1
                          </span>
                        </div>
                        <div className="font-body-sm text-body-sm text-outline flex items-center gap-space-xs mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">phone_enabled</span>
                          <span>+91 {b.phone}</span>
                          <span>•</span>
                          <span>{b.eventType}</span>
                        </div>
                      </div>

                      <div className="flex flex-col md:text-right">
                        <span className="font-label-md text-label-md text-on-surface flex items-center md:justify-end gap-1">
                          <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                          {b.eventLocation}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {b.eventDate} • {b.startTime} - {b.endTime} IST
                        </span>
                      </div>
                    </div>

                    {/* Force Requirement Breakdown & Action Controls */}
                    <div className="p-space-sm rounded-lg bg-surface-container-lowest flex flex-col md:flex-row md:items-center justify-between gap-space-sm border border-white/5">
                      <div className="flex flex-wrap items-center gap-space-md">
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm text-outline uppercase">Force Requirement</span>
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            {b.bouncersRequired} Tactical Officers
                          </span>
                        </div>

                        <div className="h-6 w-px bg-surface-container-highest hidden sm:block"></div>

                        <div className="flex flex-wrap items-center gap-space-xs">
                          {b.selectedBouncers && b.selectedBouncers.length > 0 ? (
                            b.selectedBouncers.map((bid) => (
                              <div
                                key={bid}
                                className="flex items-center gap-1 px-space-xs py-1 rounded bg-surface-container text-on-surface font-body-sm text-body-sm border border-white/5"
                              >
                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                <span>Operative: {bid}</span>
                              </div>
                            ))
                          ) : (
                            <div className="flex items-center gap-1 px-space-xs py-1 rounded bg-primary/10 text-primary font-body-sm text-body-sm font-semibold border border-primary/20">
                              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                              <span>Operatives: Unassigned</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Triggers */}
                      <div className="flex flex-wrap items-center gap-space-xs">
                        <a
                          href={`tel:${b.phone}`}
                          className="h-9 px-space-sm rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1 border border-white/5"
                        >
                          <span className="material-symbols-outlined text-[16px] text-outline">call</span>
                          <span>Call Client</span>
                        </a>

                        {b.status === 'Pending' && (
                          <button
                            onClick={() => handleUpdateStatus(b.bookingId, 'Confirmed')}
                            disabled={actionLoading === b.bookingId}
                            className="h-9 px-space-sm rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-label-md text-label-md font-semibold transition-colors flex items-center gap-1 border border-emerald-500/30"
                          >
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            <span>Confirm Booking</span>
                          </button>
                        )}

                        <button
                          onClick={() => openAssignModal(b)}
                          className="h-9 px-space-md rounded bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md font-semibold transition-all flex items-center gap-1 shadow-md"
                        >
                          <span className="material-symbols-outlined text-[16px]">person_add</span>
                          <span>Assign Operatives</span>
                        </button>

                        {b.status !== 'Completed' && b.status !== 'Cancelled' && (
                          <button
                            onClick={() => handleUpdateStatus(b.bookingId, 'Completed')}
                            disabled={actionLoading === b.bookingId}
                            className="h-9 px-space-sm rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1 border border-white/5"
                            title="Mark Mission Completed"
                          >
                            <span className="material-symbols-outlined text-[16px]">task_alt</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Assign Operative Drawer Modal */}
        {activeBookingForAssign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-xl bg-surface-container-low rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="p-space-md bg-surface-container flex items-center justify-between border-b border-white/10">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">
                    Dispatch Assignment Modal
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Requisition #{activeBookingForAssign.bookingId}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveBookingForAssign(null)}
                  className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-outline hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-space-md flex flex-col gap-space-md overflow-y-auto">
                <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-lowest border border-white/5">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Required Force: <strong className="text-primary">{activeBookingForAssign.bouncersRequired} Officers</strong>
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">
                    Selected: <strong className="text-on-surface">{selectedBouncerIds.length}</strong>
                  </span>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Available Operatives Roster
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
                    {bouncers.filter(b => b.isAvailable).map((bouncer) => {
                      const isSelected = selectedBouncerIds.includes(bouncer.bouncerId);

                      return (
                        <div
                          key={bouncer.bouncerId}
                          onClick={() => handleToggleBouncerSelection(bouncer.bouncerId)}
                          className={`p-space-sm rounded-xl cursor-pointer transition-all flex items-center justify-between border ${
                            isSelected
                              ? 'bg-primary/10 border-primary shadow-sm'
                              : 'bg-surface-container hover:bg-surface-container-high border-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-space-xs">
                            <img
                              alt={bouncer.name}
                              className="w-10 h-10 rounded-lg object-cover filter grayscale"
                              src={bouncer.image || '/images/raj_kumar.png'}
                            />
                            <div className="flex flex-col">
                              <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">
                                {bouncer.name}
                              </span>
                              <span className="font-label-sm text-[11px] text-primary">
                                {bouncer.bouncerId} • {bouncer.height}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`material-symbols-outlined text-[20px] ${
                              isSelected ? 'text-primary' : 'text-outline'
                            }`}
                          >
                            {isSelected ? 'check_box' : 'check_box_outline_blank'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {bouncers.filter(b => b.isAvailable).length === 0 && (
                    <div className="p-space-sm text-center text-outline font-body-sm">
                      No available operatives at this time.
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-space-md bg-surface-container flex items-center justify-end gap-space-sm border-t border-white/10">
                <button
                  onClick={() => setActiveBookingForAssign(null)}
                  className="px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAssignment}
                  className="px-space-lg py-space-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md hover:bg-primary-fixed transition-all"
                >
                  Confirm Assignment
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
