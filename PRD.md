# PRD — Maha Prayag 2.0 (2026) Landing Page

| | |
|---|---|
| **Event** | Maha Prayag 2.0 — Maharashtra Regional Conclave |
| **Organiser** | The Forum of Business By Brahmins — Trust® (BBB Trust) |
| **Date & time** | Saturday, 24 October 2026 · 2 PM – 10 PM · registration from 1 PM · lamp lighting 2:15 PM |
| **Venue** | Lavender Bough, 90 Feet Road, next to BAPS Swaminarayan Sanskar Kendra, Garodia Nagar, Ghatkopar East, Mumbai |
| **Entry** | ₹1,699 per head · registration closes 10 Oct 2026 · sponsorship lucky draw closes 30 Sep 2026 |
| **Content source** | https://maha-prayag-2-2026.priasuple.chatgpt.site — used for **facts and copy only**, not for design |
| **Status** | v2.0 · 21 Sep 2026 · for approval before build |

---

## 1. Objectives

1. **Convert.** Get chapter members to register (₹1,699, closes 10 Oct) and businesses to enter the sponsorship lucky draw (closes 30 Sep). Every screen has a path to one of these two actions.
2. **Answer the five questions without scrolling:** what, when, where, how much, how to register.
3. **Feel like a premium invitation, not a notice.** The site should look like a designed keepsake for a flagship gathering: crafted typography, ceremonial warmth, and the supplied lotus and Hanuman art used as the visual signature.
4. **Own its look.** The reference site is a dark, red-smoke, gold-bordered template. This page must be recognisably different: an ivory-and-ember editorial design (see §6). Same facts, new identity.
5. **Stay light.** Animated, but first meaningful paint under ~1.5 s on a mid-range phone on 4G. No framework, no build, no heavy libraries.
6. **Be hand-over friendly.** One HTML, one CSS, one JS, one assets folder; registration links, speaker names and photos drop in later without touching layout.

**Success metrics:** CTA click-through to registration · first CTA visible < 1 s · zero console errors · zero horizontal overflow at 390 px · Lighthouse Performance ≥ 90, Accessibility ≥ 95 · WhatsApp preview shows the event name, date and emblem.

## 2. Target audience

| Audience | Needs | Device |
|---|---|---|
| BBB chapter members across Maharashtra (business owners, professionals) | Date, venue, fee, agenda, how to register, deadline | 70 %+ mobile; link arrives on WhatsApp |
| Prospective sponsors and exhibitors | Tier prices, slots, lucky-draw rules, deadline | Mobile and desktop |
| Chapter coordinators | One authoritative link with everything, easy to forward | Desktop |
| Guests and first-time attendees | What the event is, who is behind it, why attend | Mobile |

Design implications: mobile-first hierarchy, thumb-reachable CTAs, a persistent register affordance on phones, share-ready Open Graph card, copy that scans in headings and numbers.

## 3. Brand and assets

### 3.1 Supplied assets and how each is used

| Source file | Optimised copy (`assets/`) | Role in the design |
|---|---|---|
| `logo.png` — gold and red lotus emblem with scroll flourishes, transparent | `logo.webp` (1200 px), `logo-sm.webp` (480 px), `favicon.png` | The brand mark. Hero centrepiece straddling the ivory/ember seam; header mark; faded watermark behind the speakers section; footer. Its flourishes are the source of the page's ornament language (§6.4). |
| `Hanuman.png` — silhouette with red glow and sun disc | `hanuman-glow.webp` (1400 px tall), `-sm` (700 px) | Lives **only on ember (dark) surfaces**: the hero's art panel and the registration section. |
| `Hanuman 1.png` — flat black silhouette with orange sun disc | `hanuman-flat.webp` (1400 px tall), `-sm` (700 px) | Lives **on ivory surfaces**: the gallery's feature tile and the schedule's sun-path motif (the sun disc is the timeline marker, §4.6). |
| `Backgrounds.jpg.jpeg` — red smoke on black | `smoke.webp` (portrait), `smoke-wide.webp` (landscape, seams clamped to black) | Ember surfaces only, 25–40 % opacity, `mix-blend-mode: screen`, slow drift. Never behind body text on ivory. |

All copies are WebP, cropped to their alpha bounds, largest 115 KB. Originals stay untouched in the project root.

### 3.2 Colour system — "Ivory & Ember"

The reference is black everywhere. This design is **ivory by default, ember for emphasis**: the warm paper of a printed invitation, with two dark, smoke-lit moments (hero art panel, registration) that carry the Hanuman art.

| Token | Value | Role |
|---|---|---|
| `--ivory` | `#F6EFE3` | Page background (with a 3 % paper-grain overlay) |
| `--ivory-2` | `#EFE4D2` | Alternate section band, ticket stub |
| `--ink` | `#1B1412` | Body text, headings on ivory |
| `--ink-soft` | `#5E514B` | Secondary text |
| `--vermilion` | `#B7261A` (hover `#D2352A`) | Primary CTA, key numerals, sun-path highlight; sampled from the emblem's red petals |
| `--gold` | `#C9962E` (light `#E4B85C`) | Rules, ornaments, labels; sampled from the emblem's outer petals |
| `--ember` | `#120606` | Dark surfaces (hero art panel, registration, footer) |
| `--ember-2` | `#2A0B0B` | Cards on ember |
| `--cream` | `#F3E7D6` | Text on ember |
| `--line` | `rgba(201,150,46,.35)` on ivory · `rgba(228,184,92,.3)` on ember | Hairlines |

Contrast: ink on ivory 14:1; vermilion on ivory 6.2:1; gold labels on ivory used at ≥ 14 px bold only (4.1:1) or paired with ink; cream on ember 15:1.

### 3.3 Typography

| Role | Face | Notes |
|---|---|---|
| Display | **Fraunces** (variable: weight 300–700, optical size, "WONK" axis on for the H1 only) | Soft, high-contrast serif with character. Headlines, large numerals, the motto, the italic "2.0". Distinct from the reference's Georgia. |
| UI / body | **DM Sans** (400 / 500 / 700) | Nav, labels, body, buttons, ticket details. Overlines in 700, 0.22 em tracking, uppercase. |
| Devanagari accent | **Tiro Devanagari Sanskrit** | For the motto rendered once in Devanagari, संघे शक्तिः कलौ युगे, as an ornament above its transliteration. *Organiser to confirm spelling.* |

Scale (fluid): H1 `clamp(3.6rem, 9vw, 9rem)`, leading 0.9 · section H2 `clamp(2.2rem, 4.6vw, 4.4rem)`, leading 1.02 · H3 `1.35rem` · body `1rem / 1.7` · labels `0.75–0.8rem`. Google Fonts, `display=swap`, preconnected, ~140 KB total.

### 3.4 Copy (fixed strings)

- Name: **MAHA PRAYAG 2.0** · Subtitle: **Maharashtra Regional Conclave**
- Tagline: *The ultimate confluence of minds, networks and growth.*
- Motto: **Sanghe Shaktihi Kalau Yuge — Together in strength, together in growth.**
- Organiser line: The Forum of Business by Brahmins — Trust

## 4. Page structure and content

Single page, anchor-linked. Content per section is fixed; layouts below are the new design, not the reference's. Sections marked **[placeholder]** have no supplied data and ship with honest "to be announced" content the organiser can replace.

### 4.1 Header
- Transparent over the ivory hero: lotus mark (`logo-sm.webp`, 40 px) + wordmark "MAHA PRAYAG 2.0" left; nav (Highlights · Speakers · Schedule · Sponsorship · Register · Venue) centre; "Register" vermilion pill right.
- After 80 px of scroll the bar **condenses into a floating pill** (centred, ivory glass, hairline gold, 56 px tall) containing the mark, the nav and the CTA. This is the page's signature nav behaviour and unlike the reference's full-width fixed bar.
- ≤ 900 px: mark + CTA + hamburger; the menu opens as a full-screen ivory sheet with large Fraunces links and the event date at the bottom.

### 4.2 Hero — "The Seam"
- **Split composition**: left ~55 % ivory, right ~45 % ember. The lotus emblem sits on the seam, overlapping both, at `min(420px, 34vw)` wide.
- **Ivory side (text):** overline "The Forum of Business by Brahmins — Trust" · H1 "MAHA PRAYAG" with "2.0" set as a huge italic Fraunces numeral in vermilion, offset below-right · subtitle "Maharashtra Regional Conclave" · tagline in italic · two CTAs: "Register for the Event" (vermilion pill) and "Sponsor & Exhibit" (ink outline pill) · below them a **vertical details rail**: WHEN 24 Oct 2026, Saturday · TIME 2 PM – 10 PM, registration from 1 PM · WHERE Lavender Bough, Ghatkopar East, Mumbai.
- **Ember side (art):** `hanuman-glow.webp` anchored bottom, ~85 % of panel height, two smoke layers drifting slowly behind, a vermilion radial glow. A small live countdown to 24 Oct 2026 14:00 IST sits at the panel's top ("33 days · 07 hrs · 12 min"); reads "Today" on the day, hidden after.
- **Phone (< 600 px):** the ember panel becomes a 46 vh top band (emblem centred, Hanuman at reduced scale on the right, countdown in the band's corner); the ivory text block follows with the H1 at 3.6 rem, CTAs full-width, details rail as a compact 3-row list. Art never sits behind text.

### 4.3 Highlights and key information (`#highlights`)
- Section label (left margin column, rotated): "01 — Highlights".
- **The Ticket**: a wide ticket component on ivory-2 with a perforated stub. Body: DATE 24th Oct 2026 · Saturday | TIMING 2 PM – 10 PM · doors open 1 PM | VENUE Lavender Bough · Ghatkopar East | OPENING 2:15 PM · lamp lighting. Stub: ENTRY FEE **₹1,699** per head, barcode-style gold lines, "Admit one". Hover: the stub lifts 3 px as if being torn.
- Motto block: Devanagari line, then "SANGHE SHAKTIHI KALAU YUGE", then "Together in strength, together in growth." with gold scroll ornaments either side.
- "What awaits you": five highlight cards derived from the agenda — Speaker Sessions · KYT Conclave (CCT) · High Tea & Networking · Awards & Entertainment · Dinner. Each: a petal-shaped number badge, title, one-line description. Desktop 5-across; tablet 3+2; phone a horizontal scroll-snap rail with peeking next card.

### 4.4 Speakers and guests (`#speakers`) **[placeholder]**
- Label "02 — Speakers & Guests". H2 "Voices of the Conclave".
- The lotus emblem as a large, 6 %-opacity watermark behind the grid.
- Four **staggered portrait cards** (2nd and 4th offset 48 px down on desktop): 1:1 portrait with a gold ring, name in Fraunces, role in small caps. Shipped content: a soft lotus-silhouette avatar, "To be announced", roles "Keynote", "Speaker Session", "Guest of Honour", "KYT Conclave". Line under the grid: "The speaker line-up will be announced closer to the event." Cards are a copy-paste template.

### 4.5 Schedule (`#schedule`)
- Label "03 — Schedule". H2 "The Day Unfolds". Lead: "From lamp lighting to dinner: an evening of ideas, connection and celebration."
- **Sun-path timeline (desktop/tablet):** a shallow gold arc spans the section; seven markers sit along it from 1:00 PM (left, low) through 5:30 PM (apex) to 9:00 PM (right, low). The orange **sun disc from the Hanuman art** travels along the arc as the section scrolls; markers light up as it passes. Each marker: time in Fraunces, item in DM Sans.
  1:00 PM Registration Starts · 2:15 PM Lamp Lighting · 2:30 – 4:30 PM Speaker Sessions · 4:30 – 5:30 PM High Tea & Networking · 5:30 – 7:00 PM KYT Conclave (CCT tag) · 7:00 – 9:00 PM Awards & Entertainment · 9:00 PM Dinner.
- **Phone:** a vertical list with a left gold rail and the sun disc as the moving marker; same seven entries.

### 4.6 Sponsorship (`#sponsorship`)
- Label "04 — Sponsorship". H2 "Be Part of the Conclave". Lead: "Limited slots across three tiers, winners chosen by lucky draw."
- **Three horizontal tier bands** (not cards): tier name left in Fraunces, one-line benefit centre, price and slots right in large numerals. Platinum is a full-bleed **vermilion band** with cream text and a "1 OVERALL" tag; Gold and Stall are ivory-2 bands with gold rules.
  - PLATINUM SPONSOR · Top-tier visibility across the event · ₹25,000 · 1 overall
  - GOLD SPONSOR · Prominent chapter-level branding · ₹8,000 · 1 per chapter
  - STALL · Showcase your business on-site · ₹3,000 · 3 per chapter
- "How the lucky draw works" as three numbered steps: 1 Share your Name, Mobile Number, Chapter and Sponsorship Type · 2 Entries close 30th September 2026 · 3 Winners drawn; stalls go to lucky-draw winners and the Platinum Sponsor. Note line: "All sponsors are selected by lucky draw."
- CTA "Enter the lucky draw" → sponsorship dialog (§5).
- Bordered slot "Sponsor benefits artwork to follow" kept, styled as a ticket-stub outline, not a dashed box.

### 4.7 Registration (`#register`) — ember section
- The page's second dark moment: ember background, smoke drift, `hanuman-glow.webp` faint at the far right edge.
- Label "05 — Register". H2 "Reserve Your Seat". Lead: "Two ways to be part of Maha Prayag: as a delegate, or as a sponsor."
- Two **pass-style cards** side by side (stacked on phone):
  - **Delegate Pass** — ₹1,699 / per head · fields: Name, Mobile Number, Chapter, Top 2 preferences for KYT Conclave CCT · "Last date to register: 10th October 2026" · button "Register for Event".
  - **Sponsor Entry** — Lucky draw entry · fields: Name, Mobile Number, Chapter, Type of Sponsorship · "Last date to enter: 30th September 2026" · button "Register Interest".
- A **deadline countdown** strip above the cards: "Registration closes in 19 days" (computed to 10 Oct 2026 23:59 IST) and "Lucky draw closes in 9 days" (30 Sep 2026); each hides after its date.
- "CCT for KYT Conclave" explainer slot: circular KYT badge, "The final CCT artwork will be added here."
- Phone: a slim bottom-fixed bar "₹1,699 · Closes 10 Oct — Register" appears after the hero leaves the viewport and hides while this section or the footer is visible.

### 4.8 Gallery / media (`#gallery`) **[placeholder photos]**
- Label "06 — Glimpses". H2 "The Maha Prayag Spirit".
- **Mosaic** of six tiles on ivory: (1) tall feature tile with `hanuman-flat.webp` on ivory-2, (2) the Devanagari motto tile in vermilion, (3) emblem tile, (4–6) photo slots labelled "Maha Prayag 1.0 highlights, coming soon" with a fine gold lattice pattern. Tiles keep photo-ready aspect ratios (3:4, 1:1, 4:3). Hover: slow 1.04 zoom and a caption slides up.

### 4.9 Venue (`#venue`)
- Label "07 — Venue". H2 "Where We Gather".
- **Full-width map** (Google Maps embed, `loading="lazy"`, sepia-tinted via CSS filter to sit on ivory, full colour on hover) with an **ivory address card floating over its left third**: "Lavender Bough", full address, "24th October 2026 · 2 PM – 10 PM", button "Open in Google Maps" (reference directions link, new tab). Phone: map 280 px tall, card below it.

### 4.10 Contact and footer (`#contact`) — ember
- Closing line in Fraunces at display size: "See you at Maha Prayag." with the emblem above it.
- Footer columns: organiser ("The Forum of Business By Brahmins — Trust®"), event line ("Maharashtra Regional Conclave · 24th October 2026 · Ghatkopar East, Mumbai"), anchor nav, and "For queries, contact your chapter coordinator." No phone or email is published by the reference and none is invented; a `data-contact` slot is left for one.
- Bottom: motto in small caps · © 2026 BBB Trust.

## 5. Functionality

| Feature | Behaviour |
|---|---|
| Anchor navigation | `scroll-behavior: smooth`; `scroll-margin-top` on sections; active link underline moves via IntersectionObserver. |
| Condensing nav | Adds `.is-condensed` after 80 px scroll; pill nav animates width/opacity with transforms only. |
| Mobile menu | Button with `aria-expanded` and `aria-controls`; full-screen sheet; closes on link, Esc, outside tap; body scroll locked; focus returns to the button. |
| Countdowns | Event: `2026-10-24T14:00:00+05:30`. Deadlines: `2026-10-10T23:59:59+05:30`, `2026-09-30T23:59:59+05:30`. Tick every second; hide when passed. |
| Registration dialogs | Native `<dialog>`, labelled by heading; close on ✕, Esc, backdrop click. Each card carries `data-register-url` / `data-sponsor-url`; when non-empty the button becomes a direct link (new tab), otherwise the dialog shows "Registration link coming soon" / "Lucky-draw entry link coming soon" with fee and deadline. |
| Sun-path timeline | Sun position = section scroll progress (0–1) mapped to arc length via a precomputed SVG path; markers gain `.is-past`. On phones the same progress drives a vertical rail. |
| Highlights rail (phone) | CSS `scroll-snap-type: x mandatory`; no JS. |
| Map | Lazy iframe; "Open in Google Maps" link always present as the fallback. |
| Sticky mobile CTA | Shown when hero is 70 % out of view; hidden when `#register` or footer intersects. |
| Analytics hooks | Every CTA has `data-cta="hero-register"` etc. for a tag manager later. |

No forms submit from this page. No cookies, no storage.

## 6. Design direction — "Ivory & Ember"

### 6.1 Concept
A printed invitation that catches fire at its edges. The page reads as warm ivory paper with ink and gold, and twice the paper gives way to ember: dark, smoke-lit surfaces where the Hanuman art lives. The lotus emblem sits on the seam between the two worlds in the hero, which is the image the whole page is built around.

### 6.2 How it differs from the reference

| | Reference site | This design |
|---|---|---|
| Surface | Black everywhere, smoke behind every section | Ivory paper by default; ember only in the hero panel, registration and footer |
| Hero | Centred text, Hanuman bottom-left, facts grid below | Split seam: ivory type left, ember art right, emblem straddling the seam, vertical details rail |
| Type | Georgia / Arial | Fraunces (variable, optical size) + DM Sans + a Devanagari accent |
| Key info | 5-cell bordered grid | A perforated "ticket" with a tear-off fee stub |
| Schedule | Bordered table with time column | Sun-path arc with the sun disc travelling as you scroll |
| Sponsorship | Three bordered cards | Three horizontal bands; Platinum as a vermilion full-bleed |
| Registration | Two bordered cards | Ember section with pass-style cards and deadline countdowns |
| Navigation | Fixed full-width bar | Transparent bar that condenses into a floating pill |
| Ornament | Hairline boxes, ✦ marquee | Scroll flourishes derived from the emblem, petal badges, paper grain, section numbers in a margin column |
| Motion | None | Line-mask headline reveals, clip-path wipes, sun travel, ticket tear, smoke drift |

### 6.3 Layout system
- 12-column grid, 1320 px max, 24 px gutters; a persistent **left margin column** (desktop only) carries the rotated section number and label ("03 — Schedule").
- Sections alternate ivory / ivory-2 bands; ember sections are full-bleed and bleed their smoke 80 px into the neighbouring ivory band via a torn-edge SVG mask.
- Vertical rhythm `clamp(88px, 10vw, 152px)` between sections; components use an 8 px spacing scale.

### 6.4 Ornament and components
- **Flourish rules:** thin gold scroll lines traced from the emblem's outer flourishes (inline SVG), used as section dividers and the ticket's perforation ends.
- **Petal badge:** a lotus-petal outline containing a number, used for highlights and lucky-draw steps.
- **Paper grain:** a 3 % noise overlay on ivory surfaces (CSS `background-image` with a tiny SVG turbulence, no image request).
- **Cards on ivory:** no borders; ivory-2 fill, 2 px gold underline on hover. **Cards on ember:** ember-2 fill, gold hairline, cream text.
- **Buttons:** pills, 52 px tall, DM Sans 500. Primary vermilion with cream text; secondary ink outline on ivory / cream outline on ember. Hover: 2 % scale and a warm shadow; press: 0.98.
- Hierarchy check: at any scroll position one element dominates: the H1 in the hero, ₹1,699 on the ticket stub, the sun on the arc, the Platinum band, the pass prices, the closing line.

## 7. Animation spec

Transform, opacity and clip-path only; everything GPU-composited; under `prefers-reduced-motion: reduce` elements render in their final state and the smoke and sun stand still.

| Moment | Motion | Timing |
|---|---|---|
| Hero load | Ivory side: headline lines rise from behind line masks (each line clipped, translateY 110 % → 0), then subtitle, tagline, CTAs, details rail fade-up with 90 ms stagger. Ember side: smoke layers fade in, Hanuman rises 40 px with its glow brightening (opacity 0 → 1), emblem scales 0.9 → 1 with a soft gold halo. | 0.9–1.1 s, `cubic-bezier(.2,.7,.1,1)` |
| Nav condense | Bar → pill: width and background transition, items re-flow with a 0.3 s crossfade | 0.35 s |
| Section reveal | Headings use line masks; cards and tiles use a `clip-path: inset(0 0 100% 0)` → `inset(0)` wipe with 80 ms stagger; IntersectionObserver `threshold .2`, once. Elements start hidden under the class `reveal`. | 0.7 s |
| Ticket | On reveal the stub slides in from the right and "docks"; on hover it lifts 3 px and rotates 0.5° | 0.3 s |
| Sun path | Sun disc translates along the arc via `offset-path` (fallback: precomputed points) as the section scrolls; markers scale 1 → 1.15 and turn vermilion when passed | scroll-linked, rAF-throttled |
| Smoke drift | Two layers translate ±3 % and scale 1.02 on a 40 s / 55 s loop | linear, infinite |
| Countdown | Changed digits slide up and crossfade | 0.35 s |
| Platinum band | A gold light sweep crosses once when revealed | 1.2 s |
| Gallery tiles | Hover zoom 1.04, caption slides up | 0.5 s |
| Buttons | Hover scale 1.02 + shadow; press 0.98; desktop-only 6 px magnetic pull toward the cursor | 0.2 s |
| Map | Sepia → colour on hover | 0.6 s |

Performance budget: ≤ 4 ms per frame on a mid-range phone; no layout-triggering properties in transitions; scroll handlers throttled to one rAF; no scroll-jacking and no smooth-scroll library.

## 8. Responsive behaviour

| Breakpoint | Layout |
|---|---|
| ≥ 1200 px (desktop, verified at 1440×900) | Split hero 55/45; margin column visible; ticket full width; highlights 5-across; speakers staggered 4-across; sun-path arc; tier bands; passes side by side; 3-column mosaic; floating address card over the map. |
| 900–1199 px (tablet landscape) | Hero 50/50; margin column hidden, section labels move above H2; highlights 3+2; speakers 2×2; arc kept; mosaic 2 columns. |
| 600–899 px (tablet portrait, verified at 768×1024) | Hamburger; hero stacks with the ember band on top (52 vh); ticket wraps to two rows, stub below; highlights rail; speakers 2×2; schedule becomes the vertical rail; tier bands wrap price under benefit; passes stacked; mosaic 2 columns; map card below map. |
| < 600 px (phone, verified at 390×700) | Ember band 46 vh; H1 3.6 rem; CTAs full width; details rail compact; every grid single column; sticky bottom CTA; tap targets ≥ 44 px; 16 px gutters; `-sm` Hanuman variants via `srcset`; smoke at 20 % to keep text legible. |

Rules: no horizontal scroll at any width, fixed at the source (the seam, the arc SVG and the rail are the likely offenders); `overflow-x` never set on `html`; only the header, mobile sheet and bottom bar are fixed; every image has `width`/`height` or `aspect-ratio`; text never narrower than 16 px gutters.

## 9. Accessibility

- Landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`); exactly one `h1`; skip link to main.
- Contrast per §3.2; gold never used for body text.
- Visible focus rings (2 px vermilion outline with 2 px ivory offset; cream on ember) on all interactive elements.
- Menu button and dialogs fully keyboard-operable; focus returns to the trigger.
- Decorative art, smoke, sun, ornaments and the map's tint layer `aria-hidden`; meaningful images have alt text; the sun-path timeline is also a plain ordered list for screen readers.
- Reduced-motion support per §7; the horizontal highlights rail is also navigable by keyboard.

## 10. Technical requirements

- **Stack:** `index.html`, `css/styles.css`, `js/main.js`, `assets/`. Vanilla HTML5 / CSS3 / ES2020. No build, no dependencies, no CDN scripts. Google Fonts is the only external stylesheet; the map iframe is the only other third-party request.
- **Performance budget:** total transfer ≤ 750 KB (fonts ≈ 140 KB, images ≈ 330 KB); hero emblem and Hanuman preloaded; below-fold images lazy; CSS ≤ 45 KB; JS ≤ 14 KB; no inline base64 images larger than 2 KB (grain SVG only).
- **SEO / sharing:** title "Maha Prayag 2.0 | Maharashtra Regional Conclave · 24 Oct 2026, Mumbai"; meta description; Open Graph and Twitter tags with a 1200×630 `assets/og.jpg` composed in the ivory-and-ember style; `Event` JSON-LD (name, startDate, endDate, location with address, offers ₹1,699 INR, organizer).
- **Browser support:** last 2 versions of Chrome, Safari, Firefox, Edge; iOS 15+; Android Chrome. `offset-path` has a JS fallback for the sun; `<dialog>` is native in all targets.
- **No-JS:** all content visible, anchors work, dialogs become inline notes, countdowns show static dates.
- **Hosting:** any static host; relative paths only.
- **Definition of done:** at 1440×900, 768×1024 and 390×700 in real Chrome: zero console errors, zero failed requests, `scrollWidth === clientWidth`, no broken images, one `h1`, tap targets ≥ 24 px (44 px on phone); full-page screenshots reviewed by eye; content cross-checked line-by-line against §4; every §7 motion observed once.

## 11. Open items (need organiser input)

| Item | Ships as | Replace by |
|---|---|---|
| Speaker names, photos, bios | Four "To be announced" template cards | Editing the card markup |
| Event photographs | Three lattice tiles "Maha Prayag 1.0 highlights, coming soon" | Dropping images into the tiles |
| Registration / sponsorship links | "Link coming soon" dialogs | Setting `data-register-url` / `data-sponsor-url` |
| Sponsor benefits and CCT artwork | Outlined slots | Adding the images |
| Contact phone / email | "Contact your chapter coordinator" | Filling the `data-contact` slot |
| Devanagari motto spelling | संघे शक्तिः कलौ युगे | Organiser confirmation |
| Marathi / Hindi copy | Not included | Future phase |

## 12. Alternative directions considered

Kept for the record; §6 is the recommendation.

| Direction | Summary | Why not chosen |
|---|---|---|
| **Vermilion Monolith** | Bold vermilion base, black type, gold ornaments, Hanuman as a giant duotone | Very loud on mobile; long sections in red tire the eye |
| **Midnight Gold** | Deep navy instead of black, gold type, smoke recoloured amber | Closer to the reference in feel; recolouring the supplied smoke loses its character |
