'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installedSuccessfully, setInstalledSuccessfully] = useState(false);

  useEffect(() => {
    // Check if already in standalone (installed) mode
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
        document.referrer.includes('android-app://');
      setIsStandalone(Boolean(isStandaloneMode));
    };

    checkStandalone();

    // Check if dismissed recently
    const dismissedUntil = localStorage.getItem('bounce_pwa_dismissed_until');
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
      return;
    }

    // Check iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // If iOS and not standalone, show after a short delay
    if (isIosDevice && !window.matchMedia('(display-mode: standalone)').matches) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2500);
      return () => clearTimeout(timer);
    }

    // Android/Chrome/Edge beforeinstallprompt listener
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Reveal prompt shortly after page interaction
      setTimeout(() => {
        setShowPrompt(true);
      }, 1500);
    };

    // App installed listener
    const handleAppInstalled = () => {
      setInstalledSuccessfully(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      setTimeout(() => setInstalledSuccessfully(false), 5000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (!deferredPrompt) {
      // Fallback for browsers that don't support beforeinstallprompt
      alert("To install BOUNCE, open your browser menu (⋮) and tap 'Install App' or 'Add to Home screen'.");
      return;
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setShowPrompt(false);
        setInstalledSuccessfully(true);
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.error('PWA install prompt error:', err);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSGuide(false);
    // Dismiss for 3 days
    localStorage.setItem(
      'bounce_pwa_dismissed_until',
      (Date.now() + 3 * 24 * 60 * 60 * 1000).toString()
    );
  };

  // Don't render if already running in standalone PWA mode
  if (isStandalone) {
    return null;
  }

  return (
    <>
      {/* Toast Notification on successful installation */}
      {installedSuccessfully && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-surface-container-high/95 border border-primary/40 shadow-2xl backdrop-blur-xl animate-fade-in text-on-surface">
          <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
          <div>
            <p className="font-headline-sm text-sm font-bold text-primary">BOUNCE App Installed!</p>
            <p className="font-body-sm text-xs text-outline">You can now launch BOUNCE from your home screen anytime.</p>
          </div>
        </div>
      )}

      {/* Floating PWA Install Bar for Mobile & Desktop */}
      {showPrompt && (
        <div className="fixed bottom-20 md:bottom-8 left-4 right-4 max-w-md mx-auto z-40 animate-slide-up">
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-high/95 backdrop-blur-2xl border border-primary/30 p-3.5 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.85)] flex items-center justify-between gap-3">
            
            {/* Ambient gold glow highlight */}
            <div className="absolute -top-10 -left-10 w-28 h-28 bg-primary/15 rounded-full blur-2xl pointer-events-none" />

            {/* Left: App Logo & Info */}
            <div className="flex items-center gap-3 min-w-0 z-10">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(226,178,88,0.25)] border border-primary/40 shrink-0 bg-surface-container-lowest">
                <Image
                  src="/icons/icon-192x192.png"
                  alt="BOUNCE App Icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0 flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-sm sm:text-base font-bold text-on-surface tracking-tight uppercase truncate">
                    BOUNCE PWA
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-primary/20 text-primary border border-primary/30">
                    APP
                  </span>
                </div>
                <p className="font-label-sm text-[11px] text-outline truncate">
                  1-Tap Install • Offline-Ready Access
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 shrink-0 z-10">
              <button
                onClick={handleInstallClick}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline-sm text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
                aria-label="Install BOUNCE application"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Install</span>
              </button>

              <button
                onClick={handleDismiss}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-surface-container-highest/80 text-outline hover:text-on-surface hover:bg-surface-container active:scale-95 transition-all"
                aria-label="Close install prompt"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Install Instruction Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-surface-container-high border border-outline-variant/40 p-6 shadow-2xl flex flex-col items-center text-center">
            
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl border border-primary/40 mb-4 bg-surface-container-lowest">
              <Image
                src="/icons/icon-192x192.png"
                alt="BOUNCE App Icon"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="font-headline-sm text-lg font-bold text-on-surface uppercase mb-1">
              Install BOUNCE on iPhone
            </h3>
            <p className="font-body-sm text-xs text-outline mb-6">
              Install as a full-screen standalone application on your iOS device:
            </p>

            <div className="w-full space-y-3 text-left mb-6 font-body-sm text-xs text-on-surface/90">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-white/5">
                <div className="w-7 h-7 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 text-primary font-bold">
                  1
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span>Tap the</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container font-mono text-primary border border-white/10">
                    <span className="material-symbols-outlined text-[15px]">ios_share</span> Share
                  </span>
                  <span>icon in Safari</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-white/5">
                <div className="w-7 h-7 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 text-primary font-bold">
                  2
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span>Scroll and tap</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container font-bold text-on-surface border border-white/10">
                    <span className="material-symbols-outlined text-[15px]">add_box</span> Add to Home Screen
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-white/5">
                <div className="w-7 h-7 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 text-primary font-bold">
                  3
                </div>
                <div>
                  Tap <span className="font-bold text-primary">Add</span> in the top right to complete.
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-3 rounded-xl bg-primary text-on-primary font-headline-sm text-sm font-bold uppercase tracking-wider hover:brightness-110 active:scale-98 transition-all"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
}
