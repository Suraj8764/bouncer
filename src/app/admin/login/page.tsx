'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/admin';

  const [officerId, setOfficerId] = useState('admin@bounce.sec');
  const [password, setPassword] = useState('bounce2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberTerminal, setRememberTerminal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [btnText, setBtnText] = useState('Sign In to Command Portal');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);
    setBtnText('VERIFYING CRYPTOGRAPHIC TOKEN...');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: officerId, password }),
      });

      const data = await res.json();
      if (data.success) {
        setBtnText('CLEARANCE CONFIRMED. REDIRECTING...');
        localStorage.setItem('bounce_admin_logged_in', 'true');
        // document.cookie is already set by HTTP response, but we also ensure localStorage
        setTimeout(() => {
          router.push(redirectTarget);
        }, 500);
      } else {
        setBtnText('Sign In to Command Portal');
        setErrorMessage(data.error || 'Invalid clearance credentials. Access denied.');
        setLoading(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Telemetry failure';
      setErrorMessage(msg);
      setBtnText('Sign In to Command Portal');
      setLoading(false);
    }
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.8)]">
        <div className="h-20 w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-space-md">
          <Link href="/" className="flex items-center gap-space-sm shrink-0">
            <svg className="h-8 w-auto object-contain text-primary" viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8L28 8C36 8 40 12 40 18C40 22 37 24.5 33 26C38 27.5 42 30.5 42 36C42 42 36 46 27 46L12 46L12 8Z" stroke="#E2B258" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M12 26L26 26" stroke="#E2B258" strokeWidth="3" strokeLinecap="round"/>
              <polygon points="21,15 25,18 21,21" fill="#E2B258"/>
              <polygon points="21,33 25,36 21,39" fill="#E2B258"/>
              <text x="54" y="32" fontFamily="var(--font-syne), system-ui, sans-serif" fontWeight="800" fontSize="22" letterSpacing="4.5" fill="#FFFFFF">BOUNCE</text>
              <circle cx="150" cy="27" r="3" fill="#E2B258"/>
            </svg>
            <div className="hidden sm:flex flex-col">
              <span className="font-headline-md text-headline-md text-primary tracking-tight leading-none uppercase">
                BOUNCE
              </span>
              <span className="font-label-sm text-label-sm text-outline tracking-widest uppercase">
                Command Console
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-space-md shrink-0">
            <div className="hidden sm:flex items-center gap-space-xs px-space-md py-space-xs rounded-xl bg-surface-container-low border border-outline-variant/40 shadow-inner">
              <span className="material-symbols-outlined text-primary text-[18px]">shield</span>
              <div className="flex flex-col text-right">
                <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">
                  24/7 Hotline
                </span>
                <a
                  className="font-label-md text-label-md text-on-surface hover:text-primary font-semibold tracking-tight transition-colors"
                  href="tel:91800268623"
                >
                  +91 800-BOUNCE
                </a>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface font-label-md hover:bg-surface-container-highest transition-all border border-white/5"
            >
              <span className="material-symbols-outlined mr-space-xs text-[18px]">arrow_back</span>
              Client Site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Login Screen */}
      <main className="w-full pt-20 bg-background min-h-screen flex-1 flex flex-col justify-center">
        <div className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 md:px-8 py-space-xl overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -left-32 w-[540px] h-[540px] bg-primary/5 rounded-full blur-[140px]" />
            <div className="absolute -bottom-32 -right-32 w-[540px] h-[540px] bg-secondary-container/20 rounded-full blur-[140px]" />
          </div>

          <div className="w-full max-w-md relative z-10 flex flex-col gap-space-lg">
            {/* Card Container */}
            <div className="p-space-lg md:p-space-xl rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.85)] flex flex-col gap-space-lg relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

              {/* Login Title & Shield */}
              <div className="flex flex-col items-center text-center gap-space-xs">
                <div className="w-14 h-14 rounded-2xl bg-surface-container-high border border-primary/30 shadow-inner flex items-center justify-center text-primary mb-space-xs">
                  <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    admin_panel_settings
                  </span>
                </div>
                <h1 className="font-display-lg text-[28px] text-on-surface tracking-tight uppercase">
                  Command Access
                </h1>
                <p className="font-body-sm text-body-sm text-outline max-w-xs">
                  Restricted to authorized dispatch officers and field commanders.
                </p>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-space-md rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 font-label-md text-label-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">error</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="flex flex-col gap-space-md">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold" htmlFor="officerId">
                    Officer Clearance ID
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                      badge
                    </span>
                    <input
                      id="officerId"
                      type="text"
                      required
                      value={officerId}
                      onChange={(e) => setOfficerId(e.target.value)}
                      placeholder="admin@bounce.sec"
                      className="w-full h-12 bg-surface-container-lowest text-on-surface pl-10 pr-space-md rounded-lg font-body-md text-body-md placeholder:text-outline/50 focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-inner transition-all border border-white/5"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold" htmlFor="pass">
                      Command Passkey
                    </label>
                    <span className="font-label-sm text-[11px] text-primary">SEC-DEFCON-2</span>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                      key
                    </span>
                    <input
                      id="pass"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-12 bg-surface-container-lowest text-on-surface pl-10 pr-10 rounded-lg font-body-md text-body-md focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-inner transition-all border border-white/5"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberTerminal}
                      onChange={(e) => setRememberTerminal(e.target.checked)}
                      className="w-4 h-4 rounded bg-surface-container-lowest border-outline-variant text-primary focus:ring-primary"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Remember Terminal</span>
                  </label>
                  <span className="font-label-sm text-[11px] text-outline font-mono">Demo: bounce2026</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary-fixed active:scale-[0.98] transition-all shadow-lg disabled:opacity-50 mt-space-xs"
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                      <span>{btnText}</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        lock_open
                      </span>
                      <span>{btnText}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Demo Credentials Box */}
              <div className="p-space-sm rounded-lg bg-surface-container-lowest border border-white/5 flex flex-col gap-1 text-outline font-body-sm text-[11px]">
                <div className="flex items-center justify-between text-on-surface font-semibold">
                  <span>Quick Demo Access:</span>
                  <span className="text-emerald-400">Ready</span>
                </div>
                <div>Clearance: <strong className="text-primary font-mono">admin@bounce.sec</strong></div>
                <div>Passkey: <strong className="text-primary font-mono">bounce2026</strong></div>
              </div>
            </div>

            <div className="text-center font-label-sm text-label-sm text-outline uppercase tracking-widest">
              Encrypted Operational Sentinel // 2026
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-on-surface">
          <span className="material-symbols-outlined text-primary text-[36px] animate-spin">progress_activity</span>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
