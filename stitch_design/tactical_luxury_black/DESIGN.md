---
name: Tactical Luxury Black
colors:
  surface: '#121416'
  surface-dim: '#121416'
  surface-bright: '#38393c'
  surface-container-lowest: '#0c0e10'
  surface-container-low: '#1a1c1e'
  surface-container: '#1e2022'
  surface-container-high: '#282a2c'
  surface-container-highest: '#333537'
  on-surface: '#e2e2e5'
  on-surface-variant: '#d2c5b2'
  inverse-surface: '#e2e2e5'
  inverse-on-surface: '#2f3033'
  outline: '#9b8f7e'
  outline-variant: '#4f4537'
  surface-tint: '#f0bf63'
  primary: '#ffce74'
  on-primary: '#412d00'
  primary-container: '#e2b258'
  on-primary-container: '#624400'
  inverse-primary: '#7c5800'
  secondary: '#b9c8de'
  on-secondary: '#233143'
  secondary-container: '#39485a'
  on-secondary-container: '#a7b6cc'
  tertiary: '#c4d5ff'
  on-tertiary: '#002e6a'
  tertiary-container: '#99b9ff'
  on-tertiary-container: '#00469a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea8'
  primary-fixed-dim: '#f0bf63'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5e4200'
  secondary-fixed: '#d4e4fa'
  secondary-fixed-dim: '#b9c8de'
  on-secondary-fixed: '#0d1c2d'
  on-secondary-fixed-variant: '#39485a'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#121416'
  on-background: '#e2e2e5'
  surface-variant: '#333537'
typography:
  display-lg:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Syne
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Syne
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system defines an elite security dispatch and private protection interface. It balances VIP executive protection with tactical rigor: precise, impenetrable, discreet, and authoritative. 

The aesthetic is **Dark Tactical Luxury**—merging matte armor textures, carbon-toned layered surfaces, architectural precision borders, and micro-metallic accents. It avoids generic hospitality warmth in favor of calibrated vigilance and ultra-high reliability. Every surface feels physically milled and intentional, engineered for rapid executive decisions under demanding, night-time, or mobile conditions.

## Colors

The color palette establishes an uncompromising dark-mode baseline engineered for low-light legibility and tactical prestige.

- **Base Surfaces**: The foundational canvas rests on pure tactical obsidian (`#0B0D0F`), stepping up to container layers of deep matte charcoal (`#12151A`) and elevated cards (`#181C24`).
- **Primary Accent (`#E2B258`)**: An executive brushed-champagne amber. Used exclusively for high-tier commitments, primary CTAs, operational verification badges, and key rate indicators.
- **Secondary (`#94A3B8`)**: Cool slate supporting text, metadata dividers, and secondary actions.
- **Tertiary (`#3B82F6`)**: Cold tactical blue, utilized for live map vectors, radar telemetry, and geolocation telemetry.
- **Status Anchors**:
  - Operational / Ready: Vivid Emerald (`#10B981`) paired with dark emerald containers (`rgba(16, 185, 129, 0.12)`).
  - Deployed / Busy / Locked: Crimson Rose (`#F43F5E`) or Tactical Zinc (`#71717A`).
- **Border Gradients**: Structured borders utilize hairline white alpha (`rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.14)`), guaranteeing crisp definition without visual noise.

## Typography

The typographic hierarchy balances structural architecture with machine-grade utility.

- **Syne** commands primary headings, verification statements, personnel titles, and pricing hero tiers. Its structural, confident cuts inject an avant-garde, executive nightlife tone.
- **Inter** handles all dense telemetry, operator specifications, physical stats, licenses, body text, and interactive controls. Its clean optical rendering provides clarity on high-DPI mobile devices under extreme ambient glare or night conditions.
- **Labels & Micro-Tags**: High-importance statuses, tactical classifications (e.g., `EP-CLOSE PROTECTION`, `LICENSED ARMORED`), and counter stamps use uppercase `label-sm` or `label-md` with expanded letter spacing (+0.04em to +0.08em) for immediate scanning.

## Layout & Spacing

This design system uses a fluid layout framework calibrated primarily for single-hand mobile ergonomics, scaling cleanly up to desktop dispatch terminals.

- **Mobile (<768px)**: 4-column layout with 16px margins and 16px gutters. Key operational triggers and book bars are strictly anchored to the thumb-zone via sticky bottom actions (`64px` height baseline with safe area inset integration).
- **Tablet (768px - 1024px)**: 8-column layout with 32px margins and 24px gutters. Master-detail navigation split emerges for roster selection and tactical map positioning.
- **Desktop (>1024px)**: 12-column layout maxing out at 1280px container width with 48px margins and 32px gutters for high-density command center operations.
- **Vertical Spacing Cadence**: Multiples of 4px and 8px govern element spacing, preserving a consistent rhythm between personnel profile cards and technical credentials.

## Elevation & Depth

Visual hierarchy uses tonal surface stacking and crisp border definitions rather than diffuse drop shadows.

- **Layer 0 (Canvas)**: `#0B0D0F` (Base background).
- **Layer 1 (Card & Module Foundation)**: `#12151A` with a hairline stroke `rgba(255, 255, 255, 0.08)`.
- **Layer 2 (Floating Trays & Modals)**: `#181C24` framed by `rgba(255, 255, 255, 0.12)` accompanied by an ambient rim shadow: `0 8px 32px -4px rgba(0, 0, 0, 0.7)`.
- **Tactile Inner Glow**: Critical cards and active security details carry a razor-thin inner glow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.1)`.
- **Glass Shrouds**: Sticky action bars and sheet overlays utilize a backdrop blur (`backdrop-filter: blur(16px)`) over `#0B0D0F` at 85% opacity, preserving spatial continuity while maintaining high contrast.

## Shapes

The interface adheres to a **Soft Tactical (`1`)** shape language:
- Base elements, inputs, profile tiles, and operational chips utilize a controlled `0.25rem` (4px) or `0.5rem` (8px) radius.
- Large modals, bottom drawer sheets, and container cards cap out at `0.75rem` (12px).
- Status indicator pills and radar pings retain full circular rounding (`9999px`), providing geometric contrast against the structural, hard-edged card grid.

## Components

### Buttons
- **Primary Operational**: Solid metallic gold (`#E2B258`) background with deep contrast black (`#0B0D0F`) typography, font weight 600. Zero external shadow, 8px border radius, 48px minimum touch target height. Active state scales subtly down (`0.98`).
- **Tactical Secondary**: Deep matte surface (`#181C24`) bordered by `rgba(255, 255, 255, 0.14)` with crisp white text (`#FFFFFF`).
- **Destructive / Emergency**: Bordered container in rose crimson (`rgba(244, 63, 94, 0.2)`), rose typography (`#F43F5E`), and urgent red inner glow on hover/active.

### Cards & Personnel Tiles
- Built on `#12151A` with a 1px border `rgba(255, 255, 255, 0.08)`.
- Profile images leverage high-contrast, desaturated photography with subtle gold level-badges overlaid at the bottom corner.
- Metrics grid integrated inside cards (Height, Martial Arts, Armed/Unarmed, Clearance) separated by hairline divider rules (`rgba(255, 255, 255, 0.05)`).

### Badges & Status Chips
- **Status Badges**: Semi-translucent pill frames (e.g., `rgba(16, 185, 129, 0.15)`) featuring a live pulsing dot indicator (`6px` solid emerald) and bold uppercase micro-text.
- **Specification Chips**: Matte background (`#181C24`), muted border (`rgba(255, 255, 255, 0.06)`), 12px Inter medium text.

### Form Inputs & Selectors
- Matte surface `#0B0D0F` nested within `#12151A` cards.
- Border stroke transitions from `rgba(255, 255, 255, 0.1)` to solid primary gold (`#E2B258`) upon focus, with a subtle gold ambient focus ring (`0 0 0 1px #E2B258`).
- Labels sit outside inputs in uppercase `label-sm` with slate coloring (`#94A3B8`).

### Sticky Thumb Action Bar (PWA Anchor)
- Fixed to bottom viewport with `padding-bottom: env(safe-area-inset-bottom)`.
- Features rapid time-increment selectors, direct total pricing tally in Syne bold, and a full-width "REQUEST ESCORT / BOOK DETAIL" primary button.