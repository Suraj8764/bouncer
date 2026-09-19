'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { BouncerData } from '@/components/BouncerCard';

interface BookingData {
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
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Assigned' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [bouncers, setBouncers] = useState<BouncerData[]>([]);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState<'all' | 'pending' | 'confirmed' | 'assigned'>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      const [bouncersRes, bookingsRes] = await Promise.all([
        fetch('/api/bouncers'),
        fetch('/api/bookings'),
      ]);

      const bouncersJson = await bouncersRes.json();
      const bookingsJson = await bookingsRes.json();

      if (bouncersJson.success) setBouncers(bouncersJson.data);
      if (bookingsJson.success) setBookings(bookingsJson.data);
    } catch (e) {
      console.error('Failed to load dashboard:', e);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateStatus = async (bookingId: string, newStatus: string) => {
    try {
      setActionLoading(bookingId);
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.bookingId === bookingId ? { ...b, status: newStatus as BookingData['status'] } : b))
        );
      }
    } catch (e) {
      console.error('Failed to update status:', e);
    } finally {
      setActionLoading(null);
    }
  };

  // Metrics
  const totalBouncers = bouncers.length || 28;
  const availableBouncers = bouncers.filter((b) => b.isAvailable).length;
  const pendingBookings = bookings.filter((b) => b.status === 'Pending').length;
  const confirmedBookings = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Assigned').length;

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    if (filterTab === 'pending') return b.status === 'Pending';
    if (filterTab === 'confirmed') return b.status === 'Confirmed';
    if (filterTab === 'assigned') return b.status === 'Assigned';
    return true;
  });

  return (
    <AdminLayout activeNav="dashboard">
      <div className="flex flex-col gap-space-lg">
        
        {/* Top Action Bar & Executive Salutation */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-widest">
              <span>Executive Command Center</span>
              <span className="text-primary font-bold">•</span>
              <span className="text-primary">Clearance Level IV [DEF-02]</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight font-bold">
              Welcome back, <span className="text-primary">Chief Dispatcher</span>
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Armed escort grid synced across 14 VIP perimeters in Bhadrak &amp; Odisha.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm shrink-0">
            <Link
              href="/admin/bouncers"
              className="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-high hover:bg-surface-variant text-on-surface rounded-lg font-label-md text-label-md transition-all active:scale-95 shadow-sm border border-white/5"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">badge</span>
              <span>Manage Operatives</span>
            </Link>

            <Link
              href="/admin/bookings"
              className="flex items-center gap-space-xs px-space-lg py-space-sm bg-primary hover:bg-primary-fixed text-on-primary rounded-lg font-label-md text-label-md font-semibold transition-all active:scale-95 shadow-md shadow-primary-container/10"
            >
              <span className="material-symbols-outlined text-[18px]">add_moderator</span>
              <span>+ Dispatch Queue</span>
            </Link>
          </div>
        </div>

        {/* Priority Urgent Dispatch Alert Strip */}
        {pendingBookings > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-space-md bg-surface-container-low rounded-xl gap-space-sm shadow-sm border border-primary/20">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/30">
                <span className="material-symbols-outlined text-primary text-[20px]">notification_important</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">
                  Priority Triage Required ({pendingBookings})
                </span>
                <p className="font-body-sm text-body-sm text-on-surface">
                  Immediate force allocation required for incoming booking requisitions.
                </p>
              </div>
            </div>
            <Link
              href="/admin/bookings"
              className="px-space-md py-1.5 bg-primary text-on-primary font-label-sm text-label-sm font-bold uppercase tracking-wider rounded transition-all hover:bg-primary-fixed active:scale-95 shrink-0"
            >
              Resolve Allocation
            </Link>
          </div>
        )}

        {/* 4 High Authority Tactical Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden group hover:bg-surface-container transition-colors border border-white/5">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Total Bouncers</span>
                <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-bold mt-1">
                  {totalBouncers}
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform border border-white/5">
                <span className="material-symbols-outlined text-[22px]">badge</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-space-md pt-space-xs border-t border-white/5">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">Active Operatives</span>
              <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-surface-container-high text-primary font-bold">
                100% Vetted
              </span>
            </div>
          </div>

          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden group hover:bg-surface-container transition-colors border border-white/5">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Available Now</span>
                <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-emerald-400 font-bold mt-1">
                  {availableBouncers}
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform border border-emerald-500/20">
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified_user
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-space-md pt-space-xs border-t border-white/5">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">Duty Standby</span>
              <span className="font-label-sm text-label-sm text-emerald-400 font-mono font-bold">READY</span>
            </div>
          </div>

          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden group hover:bg-surface-container transition-colors border border-white/5">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Pending Bookings</span>
                <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary font-bold mt-1">
                  {pendingBookings.toString().padStart(2, '0')}
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform border border-primary/20">
                <span className="material-symbols-outlined text-[22px]">pending_actions</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-space-md pt-space-xs border-t border-white/5">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">Needs Action</span>
              <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-primary/20 text-primary font-bold">
                Triage
              </span>
            </div>
          </div>

          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden group hover:bg-surface-container transition-colors border border-white/5">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Active Missions</span>
                <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-bold mt-1">
                  {confirmedBookings}
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary group-hover:scale-105 transition-transform border border-white/5">
                <span className="material-symbols-outlined text-[22px]">task_alt</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-space-md pt-space-xs border-t border-white/5">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">Secured Today</span>
              <span className="font-label-sm text-label-sm text-secondary font-mono font-bold">ON-SITE</span>
            </div>
          </div>
        </div>

        {/* Live Requisition Queue Bento */}
        <div className="bg-surface-container-low p-space-lg rounded-2xl border border-white/5 shadow-xl flex flex-col gap-space-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md pb-space-xs border-b border-white/5">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">
                Recent Requisitions
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                Operations Dispatch Feed
              </h2>
            </div>

            <div className="flex items-center gap-space-xs bg-surface-container-lowest p-1 rounded-lg border border-white/5">
              {[
                { id: 'all', label: 'All' },
                { id: 'pending', label: `Pending (${pendingBookings})` },
                { id: 'confirmed', label: 'Confirmed' },
                { id: 'assigned', label: 'Assigned' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterTab(tab.id as 'all' | 'pending' | 'confirmed' | 'assigned')}
                  className={`px-space-md py-1 rounded font-label-md text-label-md transition-colors ${
                    filterTab === tab.id
                      ? 'bg-primary text-on-primary font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-outline">
              <span className="material-symbols-outlined text-primary text-[32px] animate-spin">progress_activity</span>
              <p className="font-label-md uppercase tracking-widest text-outline mt-2">Loading Requisitions...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-8 text-center text-outline">
              <span className="material-symbols-outlined text-[36px] mb-1">inbox</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">No Requisitions Found</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                No booking records match the selected status filter.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-space-sm">
              {filteredBookings.map((b) => (
                <div
                  key={b.bookingId}
                  className="p-space-md rounded-xl bg-surface-container flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md border border-white/5 hover:border-primary/20 transition-all"
                >
                  <div className="flex items-start gap-space-md">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary font-bold font-mono shrink-0">
                      <span className="material-symbols-outlined text-[20px]">badge</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-space-xs">
                        <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          {b.customerName}
                        </span>
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-lowest text-primary font-mono text-[11px] font-bold">
                          #{b.bookingId}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-outline mt-0.5">
                        {b.eventType} • {b.eventLocation} • Tel: +91 {b.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-space-md self-end md:self-auto">
                    <div className="text-right">
                      <span className="font-headline-sm text-headline-sm text-primary font-bold block">
                        ₹{b.totalAmount?.toLocaleString('en-IN')}
                      </span>
                      <span className="font-label-sm text-[11px] text-outline">
                        {b.bouncersRequired} Officers ({b.eventDate})
                      </span>
                    </div>

                    <div className="flex items-center gap-space-xs">
                      {b.status === 'Pending' && (
                        <button
                          onClick={() => handleUpdateStatus(b.bookingId, 'Confirmed')}
                          disabled={actionLoading === b.bookingId}
                          className="px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-bold uppercase hover:bg-primary-fixed transition-all"
                        >
                          Confirm
                        </button>
                      )}
                      <Link
                        href="/admin/bookings"
                        className="p-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors"
                        title="Manage Dispatch"
                      >
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
