import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
      <Header />

      <main className="w-full pt-24 sm:pt-28 bg-background min-h-screen pb-20 md:pb-0 lg:pb-0 overflow-x-hidden">
        <div className="flex flex-col w-full">
          
          {/* Top Tactical Status Bar */}
          <section className="w-full bg-surface-container-lowest px-margin py-2.5 border-b border-outline-variant/15">
            <div className="max-w-[1280px] mx-auto flex items-center justify-between font-label-sm text-label-sm uppercase tracking-wider text-outline">
              <div className="flex items-center gap-space-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-on-surface font-mono text-[11px] sm:text-xs">
                  RAPID DISPATCH READY: METRO BHADRAK, BHUBANESWAR, CUTTACK &amp; PAN-ODISHA
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-space-md text-on-surface-variant font-mono text-[11px]">
                <span className="text-emerald-400 font-semibold">AVG RESPONSE &lt; 15 MINS</span>
                <span className="text-outline-variant">•</span>
                <span className="text-primary font-semibold">100% BACKGROUND VERIFIED</span>
              </div>
            </div>
          </section>

          {/* Hero Section */}
          <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-lowest via-surface to-background px-margin pt-space-lg sm:pt-space-xl pb-space-xl cyber-grid-animated">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-primary/15 blur-[120px] animate-pulse-glow"></div>
              <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-secondary-container/30 blur-[100px]"></div>
            </div>

            <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-center relative z-10">
              
              {/* Hero Copy Column */}
              <div className="lg:col-span-7 flex flex-col items-start gap-space-md">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high/90 text-primary font-mono text-[11px] tracking-wider uppercase border border-primary/25 shadow-lg backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span>PSARA ACCREDITED • TIER-1 PROTOCOL</span>
                </div>

                <h1 className="font-display-lg text-on-surface tracking-tight max-w-2xl leading-[1.05]">
                  Professional Bouncers for <span className="text-primary underline decoration-primary/30 underline-offset-8">Your Event</span>
                </h1>

                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                  Reliable security professionals for weddings, parties, private events, and special occasions. Vetted physical presence, de-escalation mastery, and seamless crowd decorum.
                </p>

                {/* CTA Cluster */}
                <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm pt-space-xs">
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-xl shadow-primary/20 hover:bg-primary-fixed transition-all duration-200 active:scale-[0.98] vengeance-btn border border-primary/40"
                    aria-label="Book a bouncer for your event"
                  >
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      shield_person
                    </span>
                    <span>Book a Bouncer</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>

                  <Link
                    href="/bouncers"
                    className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md rounded-xl bg-surface-container-high/90 text-on-surface font-label-lg text-label-lg hover:bg-surface-container-highest transition-all border border-white/10 shadow-md vengeance-btn hover:border-primary/30"
                  >
                    <span className="material-symbols-outlined text-[18px]">badge</span>
                    <span>View Bouncers</span>
                  </Link>
                </div>

                {/* Micro Social Proof Metric */}
                <div className="flex items-center gap-space-lg pt-space-md sm:gap-space-xl overflow-x-auto w-full">
                  <div className="flex flex-col shrink-0">
                    <span className="font-headline-md text-headline-md text-primary font-bold">1,850+</span>
                    <span className="font-body-sm text-body-sm text-outline">Events Secured</span>
                  </div>
                  <div className="h-8 w-px bg-surface-container-highest hidden sm:block shrink-0"></div>
                  <div className="flex flex-col shrink-0">
                    <span className="font-headline-md text-headline-md text-primary font-bold">
                      4.98<span className="text-on-surface text-label-sm font-normal"> / 5.0</span>
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">Client Trust Rating</span>
                  </div>
                  <div className="h-8 w-px bg-surface-container-highest hidden sm:block shrink-0"></div>
                  <div className="flex flex-col shrink-0">
                    <span className="font-headline-md text-headline-md text-primary font-bold">100%</span>
                    <span className="font-body-sm text-body-sm text-outline">Arrival Guarantee</span>
                  </div>
                </div>
              </div>

              {/* Hero Visual Hero Card Column with Vengeance Laser Scan */}
              <div className="lg:col-span-5 relative w-full flex justify-center">
                <div className="relative w-full max-w-md bg-surface-container-low rounded-2xl overflow-hidden shadow-2xl p-space-xs border border-primary/20 hud-corner-tl hud-corner-br group">
                  
                  {/* Vengeance Laser Scanning Beam */}
                  <div className="laser-scan-line"></div>

                  {/* Portrait Container */}
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-surface-container-lowest">
                    <img
                      alt="Chief Marshal Vikram S. - Tactical Security Lead"
                      className="w-full h-full object-cover object-center filter grayscale-[15%] contrast-115 group-hover:scale-105 transition-transform duration-700"
                      src="/images/hero_bouncers.png"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent"></div>

                    {/* Live Tactical Tag with Radar sweep */}
                    <div className="absolute top-space-sm left-space-sm inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-primary tracking-wide uppercase border border-primary/30 shadow-lg">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      </span>
                      <span className="font-mono text-[10px] font-bold">ON STANDBY • DUTY READY</span>
                    </div>

                    {/* Certified Badge Overlay Bottom */}
                    <div className="absolute bottom-space-sm left-space-sm right-space-sm bg-surface-container-high/95 backdrop-blur-md p-space-sm rounded-xl shadow-xl border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-space-sm">
                          <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold shadow-md shadow-primary/20">
                            <span className="material-symbols-outlined text-[22px]">security</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-on-surface font-semibold">Chief Marshal Vikram S.</span>
                            <span className="font-body-sm text-[11px] text-primary font-mono uppercase tracking-wider">Verified Security Director</span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          verified_user
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Technical Spec Bar */}
                  <div className="grid grid-cols-3 gap-space-xs mt-space-xs text-center font-label-sm text-label-sm p-space-xs bg-surface-container-lowest rounded-xl border border-white/5">
                    <div className="flex flex-col py-space-xs">
                      <span className="text-outline uppercase text-[10px] font-mono">Height</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">6&apos;3&quot;</span>
                    </div>
                    <div className="flex flex-col py-space-xs bg-surface-container-low rounded-lg">
                      <span className="text-outline uppercase text-[10px] font-mono">Discipline</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Krav Maga</span>
                    </div>
                    <div className="flex flex-col py-space-xs">
                      <span className="text-outline uppercase text-[10px] font-mono">Experience</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">9+ Yrs</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Quick Trust Section: 3 Compact Trust Stat Badges */}
          <section className="w-full bg-surface-container-low py-space-xl px-margin border-y border-outline-variant/15">
            <div className="max-w-[1280px] mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs mb-space-lg">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Vetting Framework</span>
                <span className="font-body-sm text-body-sm text-outline">Industrial standard physical security compliance &amp; safety</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                {/* Trust Badge 1 */}
                <div className="vengeance-card hud-corner-tl flex items-start gap-space-md p-space-lg rounded-2xl bg-surface-container-high transition-all duration-300 shadow-md border border-white/10">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary border border-white/5">
                    <span className="material-symbols-outlined text-[26px]">military_tech</span>
                  </div>
                  <div className="flex flex-col gap-space-xs">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Trained Professionals</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Ex-forces &amp; elite verified personnel. Extensively certified in tactical restraint, CPR emergency response, and conflict neutralization.
                    </p>
                  </div>
                </div>

                {/* Trust Badge 2 */}
                <div className="vengeance-card hud-corner-tl flex items-start gap-space-md p-space-lg rounded-2xl bg-surface-container-high transition-all duration-300 shadow-md border border-white/10">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary border border-white/5">
                    <span className="material-symbols-outlined text-[26px]">schedule</span>
                  </div>
                  <div className="flex flex-col gap-space-xs">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Flexible Booking</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Hourly or full-day event rates tailored to your timeline. Instant extension options directly available from our dispatch command console.
                    </p>
                  </div>
                </div>

                {/* Trust Badge 3 */}
                <div className="vengeance-card hud-corner-tl flex items-start gap-space-md p-space-lg rounded-2xl bg-surface-container-high transition-all duration-300 shadow-md border border-white/10">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary border border-white/5">
                    <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                  <div className="flex flex-col gap-space-xs">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Reliable Service</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Guaranteed on-time physical deployment. 100% replacement contingency on standby with automated check-in monitoring protocols.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section: "Security for Every Occasion" */}
          <section className="w-full bg-background py-space-xl px-margin">
            <div className="max-w-[1280px] mx-auto flex flex-col gap-space-lg">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
                <div className="flex flex-col gap-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Deployments &amp; Scope</span>
                  <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold tracking-tight">
                    Security for Every Occasion
                  </h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                  Calibrated tactical presence customized to crowd demographics, venue architectural layout, and guest profiles.
                </p>
              </div>

              {/* 4 Compact Luxury Dark Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                
                {/* Service Card 1: Weddings */}
                <Link
                  href="/book?type=wedding"
                  className="vengeance-card hud-corner-tl group flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-low transition-all shadow-lg border border-white/10"
                >
                  <div className="flex flex-col gap-space-sm">
                    <div className="w-11 h-11 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all border border-white/5 shadow-inner">
                      <span className="material-symbols-outlined text-[22px]">celebration</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-semibold group-hover:text-primary transition-colors">Weddings</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      VIP entrance management, guest escort, gift protection, and high-elegance crowd decorum with dark tailored suit dress codes.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-sm flex items-center justify-between font-label-md text-label-md text-primary font-semibold border-t border-white/5">
                    <span>Red Carpet &amp; Banquets</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                  </div>
                </Link>

                {/* Service Card 2: Parties */}
                <Link
                  href="/book?type=party"
                  className="vengeance-card hud-corner-tl group flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-low transition-all shadow-lg border border-white/10"
                >
                  <div className="flex flex-col gap-space-sm">
                    <div className="w-11 h-11 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all border border-white/5 shadow-inner">
                      <span className="material-symbols-outlined text-[22px]">nightlife</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-semibold group-hover:text-primary transition-colors">Parties</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Club &amp; private bash access control, underage ID verification, intoxicated guest deterrence, and physical perimeter management.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-sm flex items-center justify-between font-label-md text-label-md text-primary font-semibold border-t border-white/5">
                    <span>Clubs &amp; Private Lounges</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                  </div>
                </Link>

                {/* Service Card 3: Corporate Events */}
                <Link
                  href="/book?type=corporate"
                  className="vengeance-card hud-corner-tl group flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-low transition-all shadow-lg border border-white/10"
                >
                  <div className="flex flex-col gap-space-sm">
                    <div className="w-11 h-11 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all border border-white/5 shadow-inner">
                      <span className="material-symbols-outlined text-[22px]">corporate_fare</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-semibold group-hover:text-primary transition-colors">Corporate Events</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      AGM security, executive safety corridors, credential check, press containment, and intellectual property showcase protection.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-sm flex items-center justify-between font-label-md text-label-md text-primary font-semibold border-t border-white/5">
                    <span>Summits &amp; AGMs</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                  </div>
                </Link>

                {/* Service Card 4: Private Events */}
                <Link
                  href="/book?type=vip"
                  className="vengeance-card hud-corner-tl group flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-low transition-all shadow-lg border border-white/10"
                >
                  <div className="flex flex-col gap-space-sm">
                    <div className="w-11 h-11 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all border border-white/5 shadow-inner">
                      <span className="material-symbols-outlined text-[22px]">villa</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-semibold group-hover:text-primary transition-colors">Private Events</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Exclusive estate gatherings, farmhouses, discreet personal bodyguards, privacy shielding, and venue perimeter surveillance.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-sm flex items-center justify-between font-label-md text-label-md text-primary font-semibold border-t border-white/5">
                    <span>Estates &amp; Farmhouses</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                  </div>
                </Link>

              </div>
            </div>
          </section>

          {/* How It Works Section: 3 Sequential Steps */}
          <section className="w-full bg-surface-container-lowest py-space-xl px-margin border-y border-outline-variant/15">
            <div className="max-w-[1280px] mx-auto flex flex-col gap-space-xl">
              <div className="text-center max-w-2xl mx-auto flex flex-col gap-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Seamless Protocol</span>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold tracking-tight">
                  How It Works
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Book verified private security in three rapid steps with full transparent rates and instantaneous confirmation.
                </p>
              </div>

              {/* Step Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg relative">
                {/* Step 1 */}
                <div className="vengeance-card hud-corner-tl relative flex flex-col p-space-lg rounded-2xl bg-surface-container-low border border-white/10">
                  <div className="flex items-center justify-between mb-space-md">
                    <span className="font-display-lg text-display-lg-mobile text-primary font-bold opacity-80">01</span>
                    <div className="w-11 h-11 rounded-xl bg-surface-container-high flex items-center justify-center text-primary border border-white/10 shadow-inner">
                      <span className="material-symbols-outlined text-[22px]">person_search</span>
                    </div>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-xs">Choose a Bouncer</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Browse verified profiles, government clearances, height, tactical background, and past client feedback ratings before choosing your team.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="vengeance-card hud-corner-tl relative flex flex-col p-space-lg rounded-2xl bg-surface-container-low border border-white/10">
                  <div className="flex items-center justify-between mb-space-md">
                    <span className="font-display-lg text-display-lg-mobile text-primary font-bold opacity-80">02</span>
                    <div className="w-11 h-11 rounded-xl bg-surface-container-high flex items-center justify-center text-primary border border-white/10 shadow-inner">
                      <span className="material-symbols-outlined text-[22px]">event_note</span>
                    </div>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-xs">Enter Event Details</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Specify the date, exact venue GPS location, expected headcount, duration, and required dress protocol (Black Suit, Tactical, or Casual).
                  </p>
                </div>

                {/* Step 3 */}
                <div className="vengeance-card hud-corner-tl relative flex flex-col p-space-lg rounded-2xl bg-surface-container-low border border-white/10">
                  <div className="flex items-center justify-between mb-space-md">
                    <span className="font-display-lg text-display-lg-mobile text-primary font-bold opacity-80">03</span>
                    <div className="w-11 h-11 rounded-xl bg-surface-container-high flex items-center justify-center text-primary border border-white/10 shadow-inner">
                      <span className="material-symbols-outlined text-[22px]">task_alt</span>
                    </div>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-xs">Get Confirmation</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Immediate operations team review, digital credentials issued via SMS, and confirmed officer dispatch straight to your location.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Dispatch / Operational Rates Simulation Strip */}
          <section className="w-full bg-surface-container-low py-space-xl px-margin">
            <div className="max-w-[1280px] mx-auto bg-surface-container p-space-lg md:p-space-xl rounded-2xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-space-lg border border-primary/20 hud-corner-tl">
              <div className="flex flex-col gap-space-xs max-w-lg">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Immediate Dispatch Estimator</span>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Standard Protective Detail Tariff</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Transparent rates. No covert agency surcharges. Guaranteed punctuality with live officer GPS check-in tracking.
                </p>
              </div>

              {/* Quick Interactive Estimator Badge Group */}
              <div className="w-full lg:w-auto flex flex-wrap sm:flex-nowrap items-center gap-space-md bg-surface-container-lowest p-space-md rounded-xl border border-white/10 shadow-inner">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-outline uppercase font-mono text-[10px]">Hourly Rate</span>
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">₹750<span className="font-body-sm text-body-sm text-outline font-normal"> / hr</span></span>
                  <span className="font-label-sm text-label-sm text-primary font-mono text-[11px]">Single Marshal</span>
                </div>
                <div className="h-10 w-px bg-surface-container-high hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-outline uppercase font-mono text-[10px]">Full Event (8 Hrs)</span>
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">₹5,200<span className="font-body-sm text-body-sm text-outline font-normal"> / shift</span></span>
                  <span className="font-label-sm text-label-sm text-primary font-mono text-[11px]">Includes Briefing</span>
                </div>
                <div className="h-10 w-px bg-surface-container-high hidden sm:block"></div>
                <Link
                  href="/book"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-space-lg py-space-sm bg-primary text-on-primary rounded-xl font-label-md text-label-md font-bold hover:bg-primary-fixed transition-all vengeance-btn shadow-lg shadow-primary/20 border border-primary/40"
                >
                  Instant Reserve
                </Link>
              </div>
            </div>
          </section>

          {/* Mobile App & PWA Installation Showcase Section */}
          <section className="relative w-full bg-surface-container-lowest py-space-xl px-margin border-t border-outline-variant/15 overflow-hidden">
            <div className="max-w-[1280px] mx-auto relative z-10">
              <div className="relative rounded-3xl bg-gradient-to-br from-surface-container-high/90 via-surface-container/70 to-surface-container-lowest p-space-lg sm:p-space-xl border border-primary/25 shadow-2xl overflow-hidden hud-corner-tl hud-corner-br">
                
                {/* Tactical ambient glow effects */}
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center relative z-10">
                  
                  {/* Left Column: App Icon Display & Badge */}
                  <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-space-md justify-center lg:justify-start">
                    <div className="relative group">
                      {/* Glow ring */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-primary to-amber-500 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-300"></div>
                      <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-2 border-primary/60 shadow-2xl bg-surface-container-lowest flex items-center justify-center">
                        <Image
                          src="/icons/icon-512x512.png"
                          alt="BOUNCE Official Mobile Application Logo"
                          width={144}
                          height={144}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          priority
                        />
                      </div>
                    </div>

                    <div className="flex flex-col text-center sm:text-left gap-1">
                      <span className="font-headline-md text-lg sm:text-xl font-bold text-on-surface uppercase tracking-tight">
                        BOUNCE Mobile App
                      </span>
                      <span className="font-label-sm text-xs text-primary font-mono tracking-wider">
                        PWA v1.0 • STANDALONE APP
                      </span>
                      <div className="flex items-center justify-center sm:justify-start gap-1 text-outline font-mono text-[11px] mt-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>OFFLINE READY • ZERO APP STORE NEEDED</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Features & Install Quick Guide */}
                  <div className="lg:col-span-7 flex flex-col gap-space-md">
                    <div className="flex flex-col gap-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-mono text-[10px] tracking-wider uppercase border border-primary/30 w-fit">
                        <span className="material-symbols-outlined text-[14px]">install_mobile</span>
                        <span>PROGRESSIVE WEB APPLICATION</span>
                      </div>
                      <h3 className="font-headline-lg text-xl sm:text-2xl font-bold text-on-surface tracking-tight mt-1">
                        Install BOUNCE Directly on Your Smartphone
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Add BOUNCE to your home screen for instantaneous access, offline viewing of your booked officer passes, live GPS tracking, and priority emergency dispatch hotline access.
                      </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-lowest/80 border border-white/5">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                          <span className="material-symbols-outlined text-[18px]">bolt</span>
                        </div>
                        <div>
                          <h4 className="font-headline-sm text-xs font-bold text-on-surface uppercase">Instant Launch</h4>
                          <p className="font-body-sm text-[11px] text-outline">Opens instantly from your home screen like any native iOS or Android app.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-lowest/80 border border-white/5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                          <span className="material-symbols-outlined text-[18px]">wifi_off</span>
                        </div>
                        <div>
                          <h4 className="font-headline-sm text-xs font-bold text-on-surface uppercase">Offline Ticket Access</h4>
                          <p className="font-body-sm text-[11px] text-outline">Access your confirmed security booking tickets even without cellular network.</p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Instruction Tabs */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-white/5">
                      <div className="text-xs text-outline flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">touch_app</span>
                        <span><strong>Android:</strong> Tap <em>&ldquo;Install&rdquo;</em> in the bottom prompt or browser menu.</span>
                      </div>
                      <div className="text-xs text-outline flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">ios_share</span>
                        <span><strong>iPhone:</strong> Tap <em>Share</em> &rarr; <em>&ldquo;Add to Home Screen&rdquo;</em>.</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Banner */}
          <section className="relative w-full bg-surface-container-lowest py-space-xl px-margin overflow-hidden border-t border-outline-variant/15">
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffce74_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="max-w-[1280px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-space-lg p-space-lg md:p-space-xl rounded-2xl bg-surface-container shadow-2xl border border-primary/25 hud-corner-tl hud-corner-br">
              <div className="flex flex-col gap-space-xs text-left">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Priority Booking Available Now</span>
                <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold tracking-tight">
                  Need Security for Your Event?
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                  Secure private bouncers, crowd marshals, or VIP protection teams within minutes. Dedicated operations manager assigned to every booking.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-space-sm w-full md:w-auto shrink-0">
                <Link
                  href="/bouncers"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-xl shadow-primary/20 hover:bg-primary-fixed transition-all duration-150 active:scale-95 vengeance-btn border border-primary/40"
                >
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    search_check
                  </span>
                  <span>Find a Bouncer</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
                <a
                  href="tel:91800268623"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg py-space-md rounded-xl bg-surface-container-highest text-on-surface font-label-lg text-label-lg hover:bg-surface-bright transition-all border border-white/10 vengeance-btn"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>Speak to Dispatch</span>
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
