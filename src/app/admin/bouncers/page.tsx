'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { BouncerData } from '@/components/BouncerCard';

export default function AdminBouncersPage() {
  const [bouncers, setBouncers] = useState<BouncerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterChip, setFilterChip] = useState<'all' | 'available' | 'mission'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBouncer, setEditingBouncer] = useState<BouncerData | null>(null);
  const [viewingDossier, setViewingDossier] = useState<BouncerData | null>(null);

  // Form states for Add/Edit
  const [formData, setFormData] = useState({
    name: '',
    bouncerId: '',
    image: '/images/raj_kumar.png',
    height: "6'2\"",
    experience: '5 Yrs Exp',
    location: 'Bhadrak Central',
    price: 1500,
    description: '',
    isAvailable: true,
  });

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchBouncers();
  }, []);

  async function fetchBouncers() {
    try {
      setLoading(true);
      const res = await fetch('/api/bouncers');
      const data = await res.json();
      if (data.success) {
        setBouncers(data.data);
      }
    } catch (e) {
      console.error('Failed to load bouncers:', e);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingBouncer(null);
    setFormData({
      name: '',
      bouncerId: `BNC-${String(bouncers.length + 1).padStart(3, '0')}`,
      image: '/images/raj_kumar.png',
      height: "6'2\"",
      experience: '5 Yrs Exp',
      location: 'Bhadrak Central',
      price: 1500,
      description: 'Experienced close-protection operative certified in crowd control and VIP escort protocols.',
      isAvailable: true,
    });
    setFeedback(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (b: BouncerData) => {
    setEditingBouncer(b);
    setFormData({
      name: b.name,
      bouncerId: b.bouncerId,
      image: b.image || '/images/raj_kumar.png',
      height: b.height,
      experience: b.experience,
      location: b.location,
      price: b.price,
      description: b.description,
      isAvailable: b.isAvailable,
    });
    setFeedback(null);
    setModalOpen(true);
  };

  const handleToggleAvailability = async (bouncer: BouncerData) => {
    const updatedStatus = !bouncer.isAvailable;
    try {
      setBouncers((prev) =>
        prev.map((b) => (b.bouncerId === bouncer.bouncerId ? { ...b, isAvailable: updatedStatus } : b))
      );

      const res = await fetch(`/api/bouncers/${bouncer.bouncerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: updatedStatus }),
      });
      const data = await res.json();
      if (!data.success) fetchBouncers();
    } catch (e) {
      console.error('Toggle error:', e);
      fetchBouncers();
    }
  };

  const handleDelete = async (bouncerId: string) => {
    if (!confirm(`Confirm decommissioning operative unit ${bouncerId}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/bouncers/${bouncerId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setBouncers((prev) => prev.filter((b) => b.bouncerId !== bouncerId));
      } else {
        alert(data.error || 'Failed to delete bouncer.');
      }
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  const handleSaveBouncer = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      if (editingBouncer) {
        const res = await fetch(`/api/bouncers/${editingBouncer.bouncerId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
          setFeedback({ type: 'success', text: 'Operative credentials updated successfully.' });
          fetchBouncers();
          setTimeout(() => setModalOpen(false), 800);
        } else {
          setFeedback({ type: 'error', text: data.error || 'Failed to update operative.' });
        }
      } else {
        const res = await fetch('/api/bouncers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
          setFeedback({ type: 'success', text: 'New operative added to roster.' });
          fetchBouncers();
          setTimeout(() => setModalOpen(false), 800);
        } else {
          setFeedback({ type: 'error', text: data.error || 'Failed to register operative.' });
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setFeedback({ type: 'error', text: msg });
    } finally {
      setSaving(false);
    }
  };

  const availableCount = bouncers.filter((b) => b.isAvailable).length;
  const onMissionCount = bouncers.filter((b) => !b.isAvailable).length;

  const filtered = bouncers.filter((b) => {
    if (filterChip === 'available' && !b.isAvailable) return false;
    if (filterChip === 'mission' && b.isAvailable) return false;

    return (
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bouncerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <AdminLayout activeNav="bouncers">
      <div className="flex flex-col gap-space-lg">
        
        {/* Top Header Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-widest">
              <span>Command Ops</span>
              <span className="text-primary font-bold">•</span>
              <span className="text-primary">Personnel Master Grid</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight uppercase">
              Tactical Bouncer Roster
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Manage authorized close-protection operatives, verify clearance credentials, and toggle standby duty.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <button
              onClick={handleOpenAdd}
              className="px-space-lg py-space-sm rounded-xl bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md font-bold transition-all shadow-lg active:scale-95 flex items-center gap-space-xs"
            >
              <span className="material-symbols-outlined text-[20px]">person_add</span>
              <span>+ Register New Bouncer</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
          <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between border border-white/5">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase">Active Force</span>
              <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-bold">
                {bouncers.length}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[26px]">groups</span>
            </div>
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between border border-white/5">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-emerald-400 uppercase font-bold">Available for Dispatch</span>
              <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-emerald-400 font-bold">
                {availableCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <span className="material-symbols-outlined text-[26px] animate-pulse">check_circle</span>
            </div>
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between border border-white/5">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-rose-400 uppercase font-bold">On Active Mission</span>
              <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-rose-400 font-bold">
                {onMissionCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
              <span className="material-symbols-outlined text-[26px]">shield_lock</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Ribbon */}
        <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md border border-white/5">
          <div className="flex items-center gap-space-xs bg-surface-container-lowest p-space-xs rounded-lg border border-white/5 overflow-x-auto">
            <button
              onClick={() => setFilterChip('all')}
              className={`px-space-md py-space-xs rounded font-label-md text-label-md transition-all whitespace-nowrap ${
                filterChip === 'all'
                  ? 'bg-primary text-on-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All Operatives ({bouncers.length})
            </button>
            <button
              onClick={() => setFilterChip('available')}
              className={`px-space-md py-space-xs rounded font-label-md text-label-md transition-all flex items-center gap-1 whitespace-nowrap ${
                filterChip === 'available'
                  ? 'bg-primary text-on-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Available ({availableCount})
            </button>
            <button
              onClick={() => setFilterChip('mission')}
              className={`px-space-md py-space-xs rounded font-label-md text-label-md transition-all whitespace-nowrap ${
                filterChip === 'mission'
                  ? 'bg-primary text-on-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Busy ({onMissionCount})
            </button>
          </div>

          <div className="relative flex-1 max-w-md min-w-0">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Operative ID, Name, or Sector..."
              className="w-full h-11 pl-10 pr-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline/50 focus:outline-none focus:ring-1 focus:ring-primary border border-white/5"
            />
          </div>
        </div>

        {/* Bouncers Grid */}
        {loading ? (
          <div className="p-12 text-center bg-surface-container-low rounded-xl border border-white/5">
            <span className="material-symbols-outlined text-primary text-[36px] animate-spin">progress_activity</span>
            <p className="font-label-md uppercase tracking-widest text-outline mt-2">Accessing Operative Files...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center bg-surface-container-low rounded-xl border border-white/5">
            <span className="material-symbols-outlined text-outline text-[40px] mb-2">person_off</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">No Operatives Match Search</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-lg">
            {filtered.map((b) => (
              <div
                key={b.bouncerId}
                className="bg-surface-container rounded-xl overflow-hidden shadow-xl border border-white/5 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="p-space-md flex items-start gap-space-md border-b border-white/5">
                    <img
                      alt={b.name}
                      className="w-20 h-24 rounded-lg object-cover filter grayscale contrast-110"
                      src={b.image || '/images/raj_kumar.png'}
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-label-sm font-bold">
                          {b.bouncerId}
                        </span>
                        <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm font-bold">
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          {b.rating || '4.9'}
                        </div>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold truncate mt-1">
                        {b.name}
                      </h3>
                      <p className="font-body-sm text-body-sm text-outline truncate">
                        {b.location} • {b.experience}
                      </p>
                      <span className="font-label-md text-label-md text-primary font-bold mt-1">
                        ₹{b.price?.toLocaleString('en-IN')} <span className="text-outline font-normal text-[11px]">/ event</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-space-md flex items-center justify-between font-label-sm text-label-sm">
                    <span className="text-outline uppercase">Duty Standby Status:</span>
                    <button
                      onClick={() => handleToggleAvailability(b)}
                      className={`px-space-sm py-1 rounded-full font-bold uppercase transition-all flex items-center gap-1 ${
                        b.isAvailable
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${b.isAvailable ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                      <span>{b.isAvailable ? 'Available' : 'On Mission'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-space-md bg-surface-container-lowest flex items-center justify-between gap-space-xs border-t border-white/5">
                  <button
                    onClick={() => handleOpenEdit(b)}
                    className="flex-1 py-space-xs rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-1 border border-white/5"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => handleDelete(b.bouncerId)}
                    className="p-2 rounded bg-surface-container-high hover:bg-rose-500/20 hover:text-rose-400 text-outline transition-colors"
                    title="Decommission Operative"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-lg bg-surface-container-low rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-space-md bg-surface-container flex items-center justify-between border-b border-white/10">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  {editingBouncer ? `Edit Operative // ${editingBouncer.bouncerId}` : 'Register New Operative'}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <form onSubmit={handleSaveBouncer} className="p-space-md flex flex-col gap-space-md overflow-y-auto">
                {feedback && (
                  <div
                    className={`p-space-md rounded-xl text-label-md font-label-md flex items-center gap-2 ${
                      feedback.type === 'success'
                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {feedback.type === 'success' ? 'check_circle' : 'error'}
                    </span>
                    <span>{feedback.text}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-outline uppercase">Operative Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Raj Kumar"
                      className="h-11 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md border border-white/5"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-outline uppercase">Unit ID</label>
                    <input
                      type="text"
                      required
                      value={formData.bouncerId}
                      onChange={(e) => setFormData({ ...formData, bouncerId: e.target.value })}
                      placeholder="BNC-001"
                      className="h-11 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md border border-white/5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-space-sm">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-outline uppercase">Height</label>
                    <input
                      type="text"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      placeholder="6'2 (188 cm)"
                      className="h-11 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md border border-white/5"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-outline uppercase">Experience</label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="5 Yrs Exp"
                      className="h-11 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md border border-white/5"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-outline uppercase">Tariff (₹)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      placeholder="1500"
                      className="h-11 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md border border-white/5"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-outline uppercase">Operational Station / Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Bhadrak Central"
                    className="h-11 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md border border-white/5"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-outline uppercase">Description &amp; Clearance Background</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="p-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md border border-white/5"
                  />
                </div>

                <div className="flex items-center justify-end gap-space-sm pt-space-xs border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface font-label-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-space-lg py-space-sm rounded-lg bg-primary text-on-primary font-label-md font-bold hover:bg-primary-fixed transition-all"
                  >
                    {saving ? 'Saving...' : 'Save Operative'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
