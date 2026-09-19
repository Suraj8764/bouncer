import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-margin text-center bg-surface relative overflow-hidden">
      {/* Tactical Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-sm flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center mb-6 text-primary shadow-xl">
          <span className="material-symbols-outlined text-[40px]">wifi_off</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest text-outline font-label-sm uppercase tracking-widest mb-3">
          <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
          <span>Offline State</span>
        </div>

        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-3">
          No Internet Connection
        </h1>

        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
          You are currently offline. An active internet connection is strictly required to check operative telemetry and submit a booking request. Offline booking submission is not permitted.
        </p>

        <div className="flex flex-col gap-3 w-full">
          <Link
            href="/"
            className="w-full h-[52px] rounded-xl bg-primary text-on-primary font-label-lg uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">refresh</span>
            <span>Try Again</span>
          </Link>

          <a
            href="tel:+919876543210"
            className="w-full h-[52px] rounded-xl bg-surface-container-high text-on-surface font-label-lg uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">phone_in_talk</span>
            <span>Emergency Phone Dispatch</span>
          </a>
        </div>
      </div>
    </main>
  );
}
