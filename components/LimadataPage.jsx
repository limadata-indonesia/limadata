"use client";
import React from "react";
import Link from "next/link";
import {
  LazyMotion, domAnimation, m,
  useMotionValue, useTransform, useSpring,
  AnimatePresence,
} from "framer-motion";

/* ── Brand tokens ─────────────────────────────────────── */
const B = {
  orange:   "#E8601A",
  hot:      "#FF7030",
  dark:     "#080808",
  surface:  "#0E0E0E",
  card:     "#141414",
  border:   "rgba(255,255,255,0.07)",
  borderO:  "rgba(232,96,26,0.3)",
  muted:    "rgba(255,255,255,0.38)",
  dim:      "rgba(255,255,255,0.62)",
  white:    "#FFFFFF",
  glow:     "rgba(232,96,26,0.35)",
};

const EASE = [0.16, 1, 0.3, 1];

/* ── Reveal helper ────────────────────────────────────── */
const reveal = (delay = 0, y = 44) => ({
  initial:      { opacity: 0, y, filter: "blur(6px)" },
  whileInView:  { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport:     { once: true, margin: "-60px" },
  transition:   { duration: 1.0, delay, ease: EASE },
});

/* ── Tilt card ────────────────────────────────────────── */
function TiltCard({ children, className, style }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-60, 60], [10, -10]), { stiffness: 180, damping: 20 });
  const ry = useSpring(useTransform(mx, [-60, 60], [-10, 10]), { stiffness: 180, damping: 20 });
  const sc = useSpring(1, { stiffness: 200, damping: 20 });
  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top  - r.height / 2);
  }
  return (
    <m.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, scale: sc, transformStyle: "preserve-3d", ...style }}
      onMouseMove={onMove}
      onMouseEnter={() => sc.set(1.04)}
      onMouseLeave={() => { mx.set(0); my.set(0); sc.set(1); }}
    >
      {children}
    </m.div>
  );
}

/* ── Section divider line ─────────────────────────────── */
function Divider() {
  return (
    <m.div
      {...reveal()}
      style={{
        height: 1,
        background: `linear-gradient(to right, transparent, ${B.borderO}, transparent)`,
        margin: "0 auto",
        maxWidth: 640,
      }}
    />
  );
}

/* ── Nav mega-menu data ───────────────────────────────── */
const MEGA = [
  {
    heading: "All-in-One Digital Services",
    items: [
      {
        title: "All-in-One Digital Services",
        body:  "Get all services, from digital marketing & web app development, in one place.",
        href:  "#services",
      },
    ],
    seeAll: null,
  },
  {
    heading: "Digital Marketing",
    items: [
      {
        title: "SEO Services",
        body:  "Make websites rank #1 organically on Google and get cited in the AI Overview.",
        href:  "/services/seo",
      },
      {
        title: "Writing Services",
        body:  "Write SEO-friendly articles and copywriting to improve search visibility.",
        href:  "/services/writing",
      },
      {
        title: "SEM Service",
        body:  "Run targeted ads on Google to optimise your campaigns and get leads.",
        href:  "/services/sem",
      },
    ],
    seeAll: "#services",
  },
  {
    heading: "Web & App Development",
    items: [
      {
        title: "Website Development Services",
        body:  "Build fast, safe, and scalable websites to welcome your customers.",
        href:  "/services/web-development",
      },
      {
        title: "App Development Services",
        body:  "Launch a digital app that supports business conversions.",
        href:  "/services/app-development",
      },
      {
        title: "UI/UX Design Services",
        body:  "Design app/website with better styles for a more satisfying experience.",
        href:  "/services/ui-ux-design",
      },
    ],
    seeAll: "#services",
  },
];

/* ── Nav ──────────────────────────────────────────────── */
function Nav() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [megaOpen,   setMegaOpen]   = React.useState(false);
  const [scrolled,   setScrolled]   = React.useState(false);
  const closeTimer = React.useRef(null);
  const mobileRef  = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    function onKey(e) { if (e.key === "Escape") { setMobileOpen(false); setMegaOpen(false); } }
    function onOut(e) { if (!mobileRef.current?.contains(e.target)) setMobileOpen(false); }
    if (mobileOpen) {
      document.addEventListener("keydown", onKey);
      document.addEventListener("click", onOut);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onOut);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function openMega()  { clearTimeout(closeTimer.current); setMegaOpen(true);  }
  function closeMega() { closeTimer.current = setTimeout(() => setMegaOpen(false), 140); }

  const otherLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Case Studies", href: "#case-studies"  },
    { label: "FAQ",          href: "#faq"           },
  ];

  const navBg = scrolled || megaOpen
    ? "rgba(8,8,8,0.95)"
    : "transparent";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 py-5 transition-all duration-300"
        style={{
          background: navBg,
          backdropFilter: (scrolled || megaOpen) ? "blur(24px) saturate(1.8)" : "none",
          borderBottom: (scrolled || megaOpen) ? `1px solid ${B.border}` : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <a href="/" aria-label="Limadata home">
          <img
            src="https://limadata.co.id/wp-content/uploads/2026/06/LOGO-LIMADATA-scaled-200x55.png"
            alt="Limadata — Jasa SEO Indonesia"
            style={{ height: 32, filter: "brightness(0) invert(1)" }}
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {/* Services trigger */}
          <div onMouseEnter={openMega} onMouseLeave={closeMega} style={{ position: "relative" }}>
            <button
              className="flex items-center gap-1 transition-colors duration-200"
              style={{ color: megaOpen ? B.orange : B.dim }}
              aria-expanded={megaOpen}
              aria-haspopup="true"
            >
              Services
              <m.svg
                animate={{ rotate: megaOpen ? 180 : 0 }}
                transition={{ duration: 0.22 }}
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              >
                <path d="M6 9l6 6 6-6" />
              </m.svg>
            </button>
          </div>

          {otherLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors duration-200 hover:text-white"
              style={{ color: B.dim }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <a
            href="#cta"
            className="text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200 hover:scale-105 hover:opacity-90"
            style={{ background: B.orange, color: B.white, boxShadow: `0 0 24px rgba(232,96,26,0.35)` }}
          >
            Get a Free Audit
          </a>
        </div>

        {/* Hamburger */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            ref={mobileRef}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto py-20 px-8 gap-6"
            style={{ background: B.dark }}
          >
            <button className="absolute top-5 right-6 p-2" onClick={() => setMobileOpen(false)} aria-label="Close">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <p className="text-xs uppercase tracking-[0.18em] font-semibold" style={{ color: B.orange }}>Services</p>
            {MEGA.slice(1).map(col => col.items.map(({ title, href }) => (
              <a key={title} href={href} onClick={() => setMobileOpen(false)}
                className="text-base font-medium hover:text-white transition-colors" style={{ color: B.dim }}>
                {title}
              </a>
            )))}

            <div style={{ height: 1, background: B.border, margin: "8px 0" }} />

            {otherLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="text-base font-medium hover:text-white transition-colors" style={{ color: B.dim }}>
                {l.label}
              </a>
            ))}

            <a
              href="#cta"
              onClick={() => setMobileOpen(false)}
              className="mt-4 text-center px-8 py-3.5 rounded-full text-white font-semibold"
              style={{ background: B.orange }}
            >
              Get a Free Audit
            </a>
          </div>
        )}
      </nav>

      {/* ── Mega-menu panel ─────────────────────────────── */}
      <AnimatePresence>
        {megaOpen && (
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            style={{
              position: "fixed",
              top: 68,
              left: 0, right: 0,
              zIndex: 49,
              background: "rgba(8,8,8,0.98)",
              backdropFilter: "blur(28px) saturate(1.8)",
              borderBottom: `1px solid ${B.border}`,
            }}
          >
            {/* Orange top rule */}
            <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${B.orange}, transparent)` }} />

            {/* Columns */}
            <div
              style={{
                maxWidth: 1152,
                margin: "0 auto",
                padding: "40px max(24px, calc((100vw - 1152px) / 2)) 32px",
                display: "grid",
                gridTemplateColumns: "0.85fr 1fr 1fr",
                gap: "0 0",
              }}
            >
              {MEGA.map(({ heading, items, seeAll }, ci) => (
                <div
                  key={heading}
                  style={{
                    paddingRight: 40,
                    paddingLeft: ci > 0 ? 40 : 0,
                    borderLeft: ci > 0 ? `1px solid ${B.border}` : "none",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Column heading */}
                  <p style={{
                    color: B.orange,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 24,
                  }}>
                    {heading}
                  </p>

                  {/* Items */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 28, flex: 1 }}>
                    {items.map(({ title, body, href }) => (
                      <a
                        key={title}
                        href={href}
                        onClick={() => setMegaOpen(false)}
                        style={{ textDecoration: "none", display: "block", cursor: "pointer" }}
                        onMouseEnter={e => e.currentTarget.querySelector(".mt").style.color = B.orange}
                        onMouseLeave={e => e.currentTarget.querySelector(".mt").style.color = B.white}
                      >
                        <p className="mt" style={{ color: B.white, fontSize: 15, fontWeight: 700, marginBottom: 6, lineHeight: 1.3, transition: "color 0.15s" }}>
                          {title}
                        </p>
                        <p style={{ color: B.muted, fontSize: 12, lineHeight: 1.65, maxWidth: 240 }}>{body}</p>
                      </a>
                    ))}
                  </div>

                  {/* See all */}
                  {seeAll && (
                    <a
                      href={seeAll}
                      onClick={() => setMegaOpen(false)}
                      style={{ display: "inline-flex", alignItems: "center", gap: 5, color: B.orange, fontSize: 13, fontWeight: 600, textDecoration: "none", marginTop: 28 }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >
                      See all
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom divider + See All Services CTA */}
            <div style={{ borderTop: `1px solid ${B.border}`, padding: "20px max(24px, calc((100vw - 1152px) / 2))", display: "flex", justifyContent: "center" }}>
              <a
                href="#services"
                onClick={() => setMegaOpen(false)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: B.orange, color: B.white,
                  fontSize: 14, fontWeight: 600,
                  padding: "12px 28px", borderRadius: 999,
                  textDecoration: "none",
                  boxShadow: `0 0 32px rgba(232,96,26,0.3)`,
                  transition: "opacity 0.18s, transform 0.18s",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.transform = "scale(1)";    }}
              >
                See All Services
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Hero chart ──────────────────────────────────────── */
const HC_DATA   = [1200, 1380, 1290, 1620, 1980, 1850, 2240, 2680, 2510, 3100, 3650, 4200];
const HC_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function HeroChart() {
  const VW = 520, VH = 220;
  const PL = 48, PR = 16, PT = 16, PB = 34;
  const CW = VW - PL - PR;
  const CH = VH - PT - PB;
  const MIN_V = 900, MAX_V = 4600;

  function px(i) { return PL + (i / (HC_DATA.length - 1)) * CW; }
  function py(v) { return PT + CH - ((v - MIN_V) / (MAX_V - MIN_V)) * CH; }

  const pts = HC_DATA.map((v, i) => ({ x: px(i), y: py(v) }));

  function smoothPath(points) {
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  }

  const linePath  = smoothPath(pts);
  const last      = pts[pts.length - 1];
  const areaPath  = `${linePath} L ${last.x.toFixed(1)} ${(PT + CH).toFixed(1)} L ${PL} ${(PT + CH).toFixed(1)} Z`;
  const yTicks    = [1200, 2000, 3000, 4200];

  return (
    <m.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
      style={{
        background: "rgba(14,14,14,0.9)",
        border: `1px solid ${B.border}`,
        borderRadius: 20,
        padding: "22px 22px 16px",
        boxShadow: `0 0 60px rgba(232,96,26,0.07), inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      {/* Card header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <p style={{ color: B.muted, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 5 }}>
            Organic Traffic
          </p>
          <p style={{ color: B.white, fontSize: 24, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em" }}>
            4,200 <span style={{ fontSize: 13, fontWeight: 400, color: B.muted }}>visits / mo</span>
          </p>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 5,
          background: "rgba(45,189,90,0.1)", border: "1px solid rgba(45,189,90,0.2)",
          borderRadius: 20, padding: "5px 11px",
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2dbd5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M7 7h10v10"/>
          </svg>
          <span style={{ color: "#2dbd5a", fontSize: 12, fontWeight: 700 }}>+350% YoY</span>
        </div>
      </div>

      {/* SVG chart */}
      <svg viewBox={`0 0 ${VW} ${VH}`} style={{ width: "100%", display: "block", overflow: "visible" }}>
        <defs>
          <linearGradient id="hcArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={B.orange} stopOpacity="0.3"/>
            <stop offset="100%" stopColor={B.orange} stopOpacity="0"/>
          </linearGradient>
          <filter id="hcGlow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Grid */}
        {yTicks.map(v => (
          <line key={v} x1={PL} y1={py(v)} x2={VW - PR} y2={py(v)}
            stroke="rgba(255,255,255,0.055)" strokeWidth="1"/>
        ))}

        {/* Y labels */}
        {yTicks.map(v => (
          <text key={v} x={PL - 8} y={py(v) + 4} textAnchor="end"
            fontSize="9" fill="rgba(255,255,255,0.32)" fontFamily="sans-serif">
            {v >= 1000 ? `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}K` : v}
          </text>
        ))}

        {/* X labels — every other month */}
        {HC_MONTHS.map((lbl, i) => i % 2 === 0 && (
          <text key={lbl} x={px(i)} y={VH - 4} textAnchor="middle"
            fontSize="9" fill="rgba(255,255,255,0.3)" fontFamily="sans-serif">
            {lbl}
          </text>
        ))}

        {/* Area fill */}
        <m.path d={areaPath} fill="url(#hcArea)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}/>

        {/* Line draw */}
        <m.path d={linePath} fill="none"
          stroke={B.orange} strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          filter="url(#hcGlow)"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.5, ease: "easeInOut" }}/>

        {/* End dot */}
        <m.circle cx={last.x} cy={last.y} r={5} fill={B.orange}
          filter="url(#hcGlow)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.3 }}/>

        {/* Pulse rings */}
        <m.circle cx={last.x} cy={last.y} r={12} fill="none"
          stroke={B.orange} strokeWidth="1.5"
          animate={{ opacity: [0.65, 0] }}
          transition={{ delay: 2.8, duration: 1.6, repeat: Infinity, ease: "easeOut" }}/>
        <m.circle cx={last.x} cy={last.y} r={20} fill="none"
          stroke={B.orange} strokeWidth="0.8"
          animate={{ opacity: [0.35, 0] }}
          transition={{ delay: 3.0, duration: 1.8, repeat: Infinity, ease: "easeOut" }}/>

        {/* Callout bubble */}
        <m.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.65, duration: 0.4 }}>
          <rect x={last.x - 46} y={last.y - 42} width={92} height={26} rx={6} fill={B.orange}/>
          <text x={last.x} y={last.y - 25} textAnchor="middle"
            fontSize="11" fontWeight="700" fill="white" fontFamily="sans-serif">
            4,200 / mo
          </text>
          <polygon
            points={`${last.x - 6},${last.y - 16} ${last.x + 6},${last.y - 16} ${last.x},${last.y - 8}`}
            fill={B.orange}/>
        </m.g>
      </svg>

      {/* Bottom stats */}
      <div style={{ display: "flex", marginTop: 14, paddingTop: 14, borderTop: `1px solid ${B.border}` }}>
        {[
          { label: "Baseline",    val: "1,200/mo" },
          { label: "After 12 mo", val: "4,200/mo" },
          { label: "Avg MoM",     val: "+14.8%"   },
        ].map(({ label, val }) => (
          <div key={label} style={{ flex: 1, textAlign: "center" }}>
            <p style={{ color: B.white, fontSize: 13, fontWeight: 700, lineHeight: 1 }}>{val}</p>
            <p style={{ color: B.muted, fontSize: 10, marginTop: 4 }}>{label}</p>
          </div>
        ))}
      </div>
    </m.div>
  );
}

/* ── Hero ─────────────────────────────────────────────── */
const HERO_STATS = [
  { val: "+340%", label: "Organic Growth",   sub: "Tokopedia" },
  { val: "+180%", label: "AI Visibility",    sub: "Traveloka" },
  { val: "+425%", label: "Traffic Increase", sub: "Kopi Kenangan" },
];

const HERO_AVATARS = [
  { abbr: "TK", bg: "linear-gradient(135deg,#1d6e36,#0a3018)" },
  { abbr: "TV", bg: "linear-gradient(135deg,#0068c9,#003060)" },
  { abbr: "GJ", bg: "linear-gradient(135deg,#2db55d,#0e4424)" },
  { abbr: "HD", bg: "linear-gradient(135deg,#006e3c,#002a18)" },
];

function Hero() {
  return (
    <section
      id="results"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        background: B.dark,
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          #hero-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding-top: 100px !important;
            padding-bottom: 60px !important;
            gap: 36px !important;
          }
          #hero-copy  { width: 100% !important; }
          #hero-chart { width: 100% !important; }
        }
      `}</style>

      {/* ── Backgrounds ── */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 60% at 62% 50%, rgba(232,96,26,0.055) 0%, transparent 68%)",
      }}/>
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 48% 52% at 4% 98%, rgba(200,65,8,0.3) 0%, transparent 62%)",
      }}/>
      {/* Dot grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.04,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}/>

      {/* ── Content row ── */}
      <div
        id="hero-inner"
        style={{
          position: "relative", zIndex: 2,
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 48px",
          display: "flex",
          alignItems: "center",
          gap: 80,
        }}
      >
        {/* ── Left copy ── */}
        <div id="hero-copy" style={{ flex: "0 0 auto", width: "min(480px, 46%)" }}>
          <m.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ color: B.orange, fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 22 }}
          >
            Rank. Grow. Dominate.
          </m.p>

          <m.h1
            initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
            style={{ color: B.white, fontSize: "clamp(2.2rem, 4.2vw, 3.8rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.025em", marginBottom: 22 }}
          >
            Indonesia's #1<br />
            SEO &amp; GEO<br />
            <em style={{ color: B.orange, fontStyle: "italic", fontWeight: 800 }}>Agency.</em>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease: EASE }}
            style={{ color: B.dim, fontSize: 15, lineHeight: 1.72, marginBottom: 36, maxWidth: 390 }}
          >
            Limadata helps Indonesian businesses rank higher on Google, appear in AI Overviews,
            ChatGPT &amp; Gemini — and turn organic traffic into loyal customers.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 44, flexWrap: "wrap" }}
          >
            <a
              href="#cta"
              style={{
                display: "inline-flex", alignItems: "center", gap: 9,
                background: B.orange, color: B.white,
                fontWeight: 700, fontSize: 14,
                padding: "13px 26px", borderRadius: 999,
                textDecoration: "none",
                boxShadow: `0 0 42px rgba(232,96,26,0.45)`,
                transition: "opacity 0.18s, transform 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.transform = "scale(1)"; }}
            >
              Get a Free Audit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            <a
              href="#case-studies"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                color: B.dim, fontWeight: 600, fontSize: 14,
                textDecoration: "none", transition: "color 0.18s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = B.white}
              onMouseLeave={e => e.currentTarget.style.color = B.dim}
            >
              <span style={{
                width: 38, height: 38, borderRadius: "50%",
                border: `1px solid rgba(255,255,255,0.18)`,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, transition: "border-color 0.18s",
              }}>▶</span>
              View Case Studies
            </a>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58, ease: EASE }}
            style={{ display: "flex", alignItems: "center", gap: 14 }}
          >
            <div style={{ display: "flex" }}>
              {HERO_AVATARS.map(({ abbr, bg }, i) => (
                <div key={abbr} style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: bg, border: "2px solid #080808",
                  marginLeft: i > 0 ? -10 : 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.85)",
                  position: "relative", zIndex: 4 - i,
                }}>
                  {abbr}
                </div>
              ))}
            </div>
            <div>
              <p style={{ color: B.white, fontSize: 13, fontWeight: 600, lineHeight: 1.35 }}>
                Trusted by 50+ Indonesian brands
              </p>
              <p style={{ color: B.muted, fontSize: 11, marginTop: 2 }}>
                Tokopedia, Traveloka, Halodoc &amp; more
              </p>
            </div>
          </m.div>
        </div>

        {/* ── Right chart ── */}
        <div id="hero-chart" style={{ flex: 1, minWidth: 0 }}>
          <HeroChart />
        </div>
      </div>
    </section>
  );
}

/* ── Services ─────────────────────────────────────────── */
const SERVICE_CATS = [
  {
    heading: "All-in-One Digital Services",
    description: "Get all services — from digital marketing to web & app development — managed by one team with one unified strategy.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
    ),
    items: [
      { name: "SEO Services",        href: "/services/seo"             },
      { name: "Writing Services",    href: "/services/writing"         },
      { name: "SEM Service",         href: "/services/sem"             },
      { name: "Website Development", href: "/services/web-development" },
      { name: "App Development",     href: "/services/app-development" },
      { name: "UI/UX Design",        href: "/services/ui-ux-design"    },
    ],
    listOnly: true,
    cta: "#cta",
  },
  {
    heading: "Digital Marketing",
    description: "Data-driven strategies that grow your organic traffic, paid visibility, and AI search presence across every modern channel.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    items: [
      { name: "SEO Services",     desc: "Make websites rank #1 organically on Google and get cited in the AI Overview.", href: "/services/seo"     },
      { name: "Writing Services", desc: "Write SEO-friendly articles and copywriting to improve search visibility.",      href: "/services/writing" },
      { name: "SEM Service",      desc: "Run targeted ads on Google to optimise your campaigns and get leads.",           href: "/services/sem"     },
    ],
    listOnly: false,
    cta: "/services/seo",
  },
  {
    heading: "Web & App Development",
    description: "Build the digital infrastructure your business needs — from fast marketing sites to full-stack applications and great UX.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    items: [
      { name: "Website Development Services", desc: "Build fast, safe, and scalable websites to welcome your customers.",         href: "/services/web-development" },
      { name: "App Development Services",     desc: "Launch a digital app that supports business conversions.",                   href: "/services/app-development" },
      { name: "UI/UX Design Services",        desc: "Design app/website with better styles for a more satisfying experience.",    href: "/services/ui-ux-design"    },
    ],
    listOnly: false,
    cta: "/services/web-development",
  },
];

function Services() {
  return (
    <section id="services" className="py-28 px-6 md:px-16 lg:px-24 relative" style={{ background: B.surface }}>
      <div aria-hidden="true" style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(to right,transparent,${B.borderO},transparent)` }} />

      <m.div {...reveal()} className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.2em] mb-4 font-semibold" style={{ color: B.orange }}>
          What we do
        </p>
        <h2 className="font-bold leading-tight" style={{ color: B.white, fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)" }}>
          SEO &amp; Digital Services{" "}
          <span style={{ color: B.muted }}>for Indonesia</span>
        </h2>
        <p className="mt-5 text-sm max-w-lg mx-auto leading-relaxed" style={{ color: B.muted }}>
          From search rankings and paid ads to web development and UX design — a complete digital agency built for Indonesian businesses competing globally.
        </p>
      </m.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto" style={{ perspective: 1200 }}>
        {SERVICE_CATS.map(({ heading, description, icon, items, listOnly, cta }, i) => (
          <TiltCard key={heading}>
            <m.div
              {...reveal(i * 0.08)}
              className="h-full rounded-2xl flex flex-col cursor-default transition-all duration-300"
              style={{ background: B.card, border: `1px solid ${B.border}` }}
              whileHover={{ borderColor: B.borderO }}
            >
              {/* Card header */}
              <div style={{ padding: "28px 28px 24px" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(232,96,26,0.1)", color: B.orange }}>
                  {icon}
                </div>
                <h3 className="font-bold text-base mb-3" style={{ color: B.orange }}>{heading}</h3>
                <p className="text-sm leading-relaxed" style={{ color: B.muted }}>{description}</p>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: B.border, margin: "0 28px" }} />

              {/* Service list */}
              <div style={{ padding: "20px 28px 28px", display: "flex", flexDirection: "column", gap: listOnly ? 10 : 18, flex: 1 }}>
                {listOnly
                  ? items.map(({ name, href }) => (
                      <a key={name} href={href} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
                        onMouseEnter={e => e.currentTarget.querySelector("span").style.color = B.orange}
                        onMouseLeave={e => e.currentTarget.querySelector("span").style.color = B.white}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={B.orange} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                        <span style={{ color: B.white, fontSize: 13, fontWeight: 500, transition: "color 0.18s" }}>{name}</span>
                      </a>
                    ))
                  : items.map(({ name, desc, href }) => (
                      <a key={name} href={href} style={{ textDecoration: "none" }}
                        onMouseEnter={e => e.currentTarget.querySelector("p").style.color = B.orange}
                        onMouseLeave={e => e.currentTarget.querySelector("p").style.color = B.white}
                      >
                        <p style={{ color: B.white, fontSize: 14, fontWeight: 700, marginBottom: 4, transition: "color 0.18s" }}>{name}</p>
                        <p style={{ color: B.muted, fontSize: 12, lineHeight: 1.6 }}>{desc}</p>
                      </a>
                    ))
                }
              </div>

              {/* Card footer */}
              <div style={{ padding: "0 28px 24px" }}>
                <a
                  href={cta}
                  style={{ display: "inline-flex", alignItems: "center", gap: 5, color: B.orange, fontSize: 13, fontWeight: 600, textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  {listOnly ? "Get started" : "Learn more"}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M7 7h10v10"/>
                  </svg>
                </a>
              </div>
            </m.div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

/* ── How it works ─────────────────────────────────────── */
/* ── Case Studies (injected as props from server) ─────── */

function CaseStudies({ cases }) {
  const CASES = cases;
  return (
    <section id="case-studies" className="py-24 relative overflow-hidden" style={{ background: B.dark }}>
      <div aria-hidden="true" style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(to right,transparent,${B.borderO},transparent)` }} />

      {/* Heading */}
      <m.div
        {...reveal()}
        className="mb-12 px-6 md:px-16 lg:px-24"
      >
        <p className="text-xs uppercase tracking-[0.2em] mb-3 font-semibold" style={{ color: B.orange }}>
          Case Studies
        </p>
        <h2 className="font-bold leading-tight" style={{ color: B.white, fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)" }}>
          How Indonesian businesses{" "}
          <span style={{ color: B.orange }}>grew with Limadata</span>
        </h2>
      </m.div>

      {/* Scrollable track */}
      <div
        style={{
          overflowX: "auto",
          paddingLeft: "max(24px, calc((100vw - 1152px) / 2))",
          paddingRight: 48,
          paddingBottom: 12,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`.cs-track::-webkit-scrollbar{display:none}`}</style>
        <div className="cs-track" style={{ display:"flex", gap:16, width:"max-content", alignItems:"stretch" }}>
          {CASES.map(({ company, abbr, description, change, service, bg, dot, slug }, i) => {
            const textTop = i % 2 === 0;
            const href    = slug ? `/case-studies/${slug}` : null;

            const TextBlock = (
              <div style={{
                padding: "26px 24px 22px",
                display: "flex", flexDirection: "column", flex: 1,
              }}>
                <h3 style={{ color: B.white, fontWeight: 700, fontSize: 17, marginBottom: 10, lineHeight: 1.3 }}>
                  {company}
                </h3>
                <p style={{ color: B.muted, fontSize: 13, lineHeight: 1.68, flex: 1, marginBottom: 18 }}>
                  {description}
                </p>
                <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap: 8 }}>
                  <div style={{ display:"flex", gap:20, alignItems:"flex-start" }}>
                    <div>
                      <p style={{ color: dot, fontWeight: 800, fontSize: 22, lineHeight: 1 }}>{change}</p>
                      <p style={{ color: B.muted, fontSize: 10, marginTop: 3, textTransform:"uppercase", letterSpacing:"0.06em" }}>Organic Growth</p>
                    </div>
                    <div>
                      <p style={{ color: B.white, fontWeight: 600, fontSize: 12, lineHeight: 1.3 }}>{service}</p>
                      <p style={{ color: B.muted, fontSize: 10, marginTop: 3, textTransform:"uppercase", letterSpacing:"0.06em" }}>Services Taken</p>
                    </div>
                  </div>
                  <div
                    onClick={href ? () => window.location.href = href : undefined}
                    style={{
                      width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                      background: dot,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      cursor: href ? "pointer" : "default",
                      boxShadow: `0 0 16px ${dot}55`,
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>
                </div>
              </div>
            );

            const ImageBlock = (
              <div style={{
                height: 196, flexShrink: 0,
                background: bg,
                display:"flex", alignItems:"center", justifyContent:"center",
                position:"relative", overflow:"hidden",
              }}>
                {/* Decorative circles */}
                <div style={{ position:"absolute", width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.06)", top:-50, right:-30 }} />
                <div style={{ position:"absolute", width:90,  height:90,  borderRadius:"50%", background:"rgba(255,255,255,0.04)", bottom:-20, left:10 }} />
                <div style={{ position:"absolute", width:60,  height:60,  borderRadius:"50%", background:"rgba(255,255,255,0.06)", top:20, left:30 }} />
                {/* Logo mark */}
                <div style={{
                  width: 68, height: 68, borderRadius: 14,
                  background: "rgba(255,255,255,0.14)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize: 22, fontWeight: 800, color: "white",
                  letterSpacing: "-0.02em",
                  position: "relative", zIndex: 1,
                }}>
                  {abbr}
                </div>
              </div>
            );

            const card = (
              <m.div
                {...reveal(i * 0.07)}
                style={{
                  width: 292, flexShrink: 0,
                  background: B.card,
                  border: `1px solid ${B.border}`,
                  borderRadius: 16,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
                whileHover={{ borderColor: B.borderO, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                {textTop ? <>{TextBlock}{ImageBlock}</> : <>{ImageBlock}{TextBlock}</>}
              </m.div>
            );

            return href
              ? <Link key={company} href={href} style={{ textDecoration:"none" }}>{card}</Link>
              : <React.Fragment key={company}>{card}</React.Fragment>;
          })}
        </div>
      </div>

      {/* Scroll hint fade on right */}
      <div aria-hidden="true" style={{
        position:"absolute", right:0, top:0, bottom:0, width:80,
        background:`linear-gradient(to left,${B.dark},transparent)`,
        pointerEvents:"none",
      }} />
    </section>
  );
}

/* ── Scroll-driven frame animation ───────────────────── */
function ScrollFrameAnimation() {
  const wrapRef   = React.useRef(null);
  const canvasRef = React.useRef(null);
  const imgs      = React.useRef([]);        // Image[] — 120 frames
  const curFrame  = React.useRef(0);         // current visible frame index
  const rafId     = React.useRef(0);

  // ── Paint one frame onto the canvas ──────────────────
  const paint = React.useRef((n) => {
    const canvas = canvasRef.current;
    const img    = imgs.current[n];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    // Size the canvas to fill its CSS box (only when dimensions change)
    const W = canvas.offsetWidth  || window.innerWidth;
    const H = canvas.offsetHeight || window.innerHeight;
    if (canvas.width !== W || canvas.height !== H) {
      canvas.width  = W;
      canvas.height = H;
    }

    // Cover-fit the frame
    const ctx    = canvas.getContext("2d");
    const scale  = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    const dx     = (W - img.naturalWidth  * scale) / 2;
    const dy     = (H - img.naturalHeight * scale) / 2;
    ctx.drawImage(img, dx, dy, img.naturalWidth * scale, img.naturalHeight * scale);
  });

  // ── Preload all 120 frames ────────────────────────────
  React.useEffect(() => {
    for (let i = 0; i < 120; i++) {
      const img = new Image();
      img.src   = `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;
      img.onload = () => {
        if (i === curFrame.current) paint.current(i);
      };
      imgs.current[i] = img;
    }
  }, []);

  // ── Scroll → frame index → paint ─────────────────────
  React.useEffect(() => {
    function update() {
      const wrap = wrapRef.current;
      if (!wrap) return;

      const { top, height } = wrap.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      if (scrollable <= 0) return;

      const t = Math.max(0, Math.min(1, -top / scrollable));
      const n = Math.min(119, Math.floor(t * 120));

      curFrame.current = n;
      paint.current(n);

      // Drive text overlays directly — no state, no re-render
      const textEl = document.getElementById("sfx-text");
      const subEl  = document.getElementById("sfx-sub");
      const barEl  = document.getElementById("sfx-bar");
      if (barEl) barEl.style.width = `${t * 100}%`;

      if (textEl && subEl) {
        const STAGES = [
          { from: 0,    to: 0.3,  label: "Indonesia's search landscape", sub: "is changing fast" },
          { from: 0.35, to: 0.65, label: "AI is rewriting the rules",    sub: "of who gets found" },
          { from: 0.7,  to: 1,    label: "Limadata keeps you ahead",     sub: "on Google & AI search" },
        ];
        const FADE  = 0.08;
        const stage = STAGES.find(s => t >= s.from && t <= s.to);
        if (stage) {
          const rel = (t - stage.from) / (stage.to - stage.from);
          const op  = rel < FADE ? rel / FADE : rel > 1 - FADE ? (1 - rel) / FADE : 1;
          textEl.textContent   = stage.label;
          subEl.textContent    = stage.sub;
          textEl.style.opacity = op;
          subEl.style.opacity  = op * 0.7;
        } else {
          textEl.style.opacity = 0;
          subEl.style.opacity  = 0;
        }
      }
    }

    function onScroll() {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount so frame 0 is visible without any scroll
    requestAnimationFrame(update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ height: "400vh", position: "relative", background: B.dark }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Canvas — receives all frame paints */}
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />

        {/* Edge vignette */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: [
            "linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, transparent 14%, transparent 80%, rgba(8,8,8,0.8) 100%)",
          ].join(","),
        }} />

        {/* Text overlay — driven by direct DOM writes in update() */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "flex-end",
          paddingBottom: "10vh", textAlign: "center",
        }}>
          <p id="sfx-text" style={{
            color: B.white, fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
            fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2,
            opacity: 0, margin: 0,
            textShadow: "0 2px 40px rgba(0,0,0,0.9)",
          }} />
          <p id="sfx-sub" style={{
            color: B.orange, fontSize: "clamp(0.85rem, 1.8vw, 1.1rem)",
            fontWeight: 600, marginTop: 10, letterSpacing: "0.05em",
            opacity: 0,
            textShadow: "0 2px 20px rgba(0,0,0,0.9)",
          }} />
        </div>

        {/* Progress bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.07)" }}>
          <div id="sfx-bar" style={{
            height: "100%", width: "0%",
            background: `linear-gradient(to right, ${B.orange}, ${B.hot})`,
          }} />
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: 20, right: 32,
          color: "rgba(255,255,255,0.28)", fontSize: 10,
          fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          Scroll
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Social proof / client logos ──────────────────────── */
const CLIENTS = [
  { name: "Tokopedia",    abbr: "Tk" },
  { name: "Traveloka",    abbr: "Tv" },
  { name: "Gojek",        abbr: "Gj" },
  { name: "Bukalapak",    abbr: "Bl" },
  { name: "OVO",          abbr: "OV" },
  { name: "Shopee ID",    abbr: "Sh" },
  { name: "Telkom",       abbr: "Tm" },
  { name: "BCA Digital",  abbr: "BC" },
  { name: "Grab ID",      abbr: "Gr" },
  { name: "DANA",         abbr: "Da" },
  { name: "Blibli",       abbr: "Bb" },
  { name: "Kopi Kenangan",abbr: "KK" },
];

function SocialProof() {
  const doubled = [...CLIENTS, ...CLIENTS];
  return (
    <section className="py-10 relative overflow-hidden" style={{ background: B.dark }}>
      <div aria-hidden="true" style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(to right, transparent, ${B.border}, transparent)` }} />
      <div aria-hidden="true" style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:`linear-gradient(to right, transparent, ${B.border}, transparent)` }} />

      {/* Marquee track */}
      <div style={{ position:"relative", overflow:"hidden" }}>
        {/* Edge fades */}
        <div aria-hidden="true" style={{ position:"absolute", left:0, top:0, bottom:0, width:180, background:`linear-gradient(to right, ${B.surface}, transparent)`, zIndex:2, pointerEvents:"none" }} />
        <div aria-hidden="true" style={{ position:"absolute", right:0, top:0, bottom:0, width:180, background:`linear-gradient(to left, ${B.surface}, transparent)`, zIndex:2, pointerEvents:"none" }} />

        <style>{`
          @keyframes logo-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .logo-track { animation: logo-scroll 32s linear infinite; }
          .logo-track:hover { animation-play-state: paused; }
        `}</style>

        <div className="logo-track" style={{ display:"flex", width:"max-content" }}>
          {doubled.map(({ name, abbr }, i) => (
            <div
              key={i}
              style={{
                display:"flex", alignItems:"center", gap:10,
                margin:"0 28px", opacity:0.45, transition:"opacity 0.25s",
                cursor:"default", whiteSpace:"nowrap",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.45}
            >
              {/* Logo mark */}
              <div style={{
                width:38, height:38, borderRadius:9, flexShrink:0,
                background:"rgba(255,255,255,0.06)",
                border:`1px solid ${B.border}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:12, fontWeight:700, color:B.white, letterSpacing:"0.03em",
              }}>
                {abbr}
              </div>
              {/* Name */}
              <span style={{ fontSize:15, fontWeight:600, color:B.white, letterSpacing:"-0.01em" }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Articles (injected as props from server) ─────────── */

const CAT_COLORS = {
  "GEO":              { bg: "rgba(232,96,26,0.12)",  text: B.orange },
  "SEO":              { bg: "rgba(61,180,100,0.12)",  text: "#3db464" },
  "Technical SEO":    { bg: "rgba(61,130,220,0.12)",  text: "#4d9fe0" },
  "Link Building":    { bg: "rgba(160,100,220,0.12)", text: "#b07de0" },
  "Digital Marketing":{ bg: "rgba(220,180,40,0.12)",  text: "#d4b430" },
};

function Articles({ articles: ARTICLES }) {
  if (!ARTICLES.length) return null;
  const [featured, ...rest] = ARTICLES;
  const fc = CAT_COLORS[featured.category] ?? { bg: "rgba(255,255,255,0.06)", text: B.dim };

  return (
    <section id="articles" style={{ background: B.surface, padding: "96px 24px", position: "relative" }}>
      <style>{`
        .art-feat { transition: opacity 0.18s; }
        .art-feat:hover { opacity: 0.88; }
        .art-small { transition: opacity 0.15s, transform 0.18s; }
        .art-small:hover { opacity: 0.82; transform: translateY(-2px); }
        .art-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (max-width: 900px) { .art-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 580px) { .art-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${B.borderO}, transparent)` }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Header ─────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <m.div {...reveal()}>
            <p style={{ color: B.orange, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 10px" }}>
              Insights
            </p>
            <h2 style={{ color: B.white, fontWeight: 800, fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", lineHeight: 1.15, margin: 0 }}>
              Latest articles
            </h2>
          </m.div>
          <m.a {...reveal(0.1)} href="/articles"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: B.orange, fontSize: 13, fontWeight: 600, textDecoration: "none", opacity: 0.8 }}>
            View all
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </m.a>
        </div>

        {/* ── Featured article ────────────────────────────── */}
        <m.a {...reveal(0.05)} href={featured.href || "#"} className="art-feat"
          style={{ display: "block", textDecoration: "none", marginBottom: 12 }}>
          <div style={{
            position: "relative", overflow: "hidden",
            borderRadius: 20,
            background: B.card,
            border: `1px solid ${B.border}`,
            borderLeft: `3px solid ${fc.text}`,
            padding: "44px 52px",
          }}>
            {/* Radial glow behind content */}
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0,
              background: `radial-gradient(ellipse at 15% 50%, ${fc.bg} 0%, transparent 65%)`,
              pointerEvents: "none",
            }} />

            {/* Watermark number */}
            <div aria-hidden="true" style={{
              position: "absolute", right: 44, top: "50%", transform: "translateY(-50%)",
              fontSize: "clamp(7rem, 13vw, 10rem)", fontWeight: 900,
              color: "rgba(255,255,255,0.03)", lineHeight: 1, userSelect: "none", letterSpacing: "-0.04em",
            }}>01</div>

            {/* Content */}
            <div style={{ position: "relative", maxWidth: 640, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ background: fc.bg, color: fc.text, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 999 }}>
                  {featured.category}
                </span>
                <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Featured</span>
              </div>

              <h3 style={{ color: B.white, fontWeight: 800, fontSize: "clamp(1.1rem, 2vw, 1.5rem)", lineHeight: 1.35, margin: 0 }}>
                {featured.title}
              </h3>

              <p style={{ color: B.dim, fontSize: 13, lineHeight: 1.8, margin: 0 }}>
                {featured.excerpt}
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: B.muted, fontSize: 12 }}>{featured.date}</span>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: B.muted, display: "inline-block" }} />
                  <span style={{ color: B.muted, fontSize: 12 }}>{featured.readTime}</span>
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: fc.text, fontSize: 12, fontWeight: 600 }}>
                  Read article
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M7 7h10v10"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </m.a>

        {/* ── Remaining articles grid ─────────────────────── */}
        <div className="art-grid">
          {rest.map(({ category, title, excerpt, date, readTime, href }, i) => {
            const c = CAT_COLORS[category] ?? { bg: "rgba(255,255,255,0.06)", text: B.dim };
            const num = String(i + 2).padStart(2, "0");
            return (
              <m.a key={title} {...reveal((i + 1) * 0.07)} href={href || "#"} className="art-small"
                style={{ display: "block", textDecoration: "none" }}>
                <div style={{
                  height: "100%", borderRadius: 16,
                  background: B.card,
                  border: `1px solid ${B.border}`,
                  borderTop: `2px solid ${c.text}`,
                  padding: "22px 22px 18px",
                  display: "flex", flexDirection: "column", gap: 12,
                  position: "relative", overflow: "hidden",
                }}>
                  {/* Watermark number */}
                  <div aria-hidden="true" style={{
                    position: "absolute", right: 14, top: 10,
                    fontSize: 40, fontWeight: 900, color: "rgba(255,255,255,0.04)",
                    lineHeight: 1, userSelect: "none", letterSpacing: "-0.04em",
                  }}>{num}</div>

                  {/* Category badge */}
                  <span style={{ display: "inline-block", alignSelf: "flex-start", background: c.bg, color: c.text, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "2px 9px", borderRadius: 999 }}>
                    {category}
                  </span>

                  {/* Title */}
                  <h3 style={{ color: B.white, fontWeight: 700, fontSize: 14, lineHeight: 1.45, margin: 0 }}>
                    {title}
                  </h3>

                  {/* Excerpt — 3 lines max */}
                  <p style={{
                    color: B.muted, fontSize: 12, lineHeight: 1.72, margin: 0, flex: 1,
                    display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>
                    {excerpt}
                  </p>

                  {/* Footer */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: `1px solid ${B.border}`, marginTop: "auto" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ color: B.muted, fontSize: 11 }}>{date}</span>
                      <span style={{ width: 2, height: 2, borderRadius: "50%", background: B.muted, display: "inline-block" }} />
                      <span style={{ color: B.muted, fontSize: 11 }}>{readTime}</span>
                    </div>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.55 }}>
                      <path d="M7 17L17 7M7 7h10v10"/>
                    </svg>
                  </div>
                </div>
              </m.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────── */
const FAQS = [
  { q: "What is GEO and why does my Indonesian business need it?", a: "GEO (Generative Engine Optimization) is the practice of optimising your content to appear in AI-generated answers from tools like ChatGPT, Google AI Overviews, Gemini, and Perplexity. As more Indonesian consumers start their search journey with AI tools, being cited in those answers is increasingly important — especially for considered purchases like software, B2B services, and high-value products." },
  { q: "How is Limadata different from a standard SEO agency?", a: "Most SEO agencies focus exclusively on Google rankings. Limadata covers the full modern search landscape — Google, Bing, and AI platforms — using data from your actual Search Console, competitor gap analysis, and proprietary AI citation tracking. We also specialise in the Indonesian market, including Bahasa Indonesia keyword research and local link-building." },
  { q: "How long does SEO take to show results in Indonesia?", a: "For technical SEO and on-page fixes, you'll typically see measurable ranking improvements within 4–8 weeks. Content and link-building programmes build momentum over 3–6 months. Clients typically achieve a 2–3× organic traffic increase within 6 months of a full engagement." },
  { q: "Do you work with businesses targeting both Indonesian and international audiences?", a: "Yes. We handle bilingual strategies (Bahasa Indonesia + English), hreflang implementation, market-specific keyword research, and separate action plans for each target audience. Many of our clients rank in both the Indonesian and global search results." },
  { q: "What does the free audit include?", a: "The free audit covers your current Google Search Console data (if you share access), a site health check, top keyword opportunities, a GEO presence assessment (whether your brand appears in AI answers), and a competitor gap analysis. You receive a written report with prioritised recommendations." },
];

function FAQ() {
  const [open, setOpen] = React.useState(null);
  return (
    <section id="faq" className="py-28 px-6 md:px-16 lg:px-24 relative" style={{ background: B.dark }}>
      <m.div {...reveal()} className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.2em] mb-4 font-semibold" style={{ color: B.orange }}>Questions</p>
        <h2 className="font-bold leading-tight" style={{ color: B.white, fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)" }}>
          Frequently asked about{" "}
          <span style={{ color: B.orange }}>SEO Indonesia</span>
        </h2>
      </m.div>

      <div className="max-w-3xl mx-auto" style={{ borderTop: `1px solid ${B.border}` }}>
        {FAQS.map(({ q, a }, i) => (
          <m.div key={i} {...reveal(i * 0.05)} style={{ borderBottom: `1px solid ${B.border}` }}>
            <button
              className="w-full flex items-start justify-between gap-4 py-6 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-sm md:text-base font-semibold leading-snug" style={{ color: B.white }}>{q}</span>
              <m.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.22 }}
                className="shrink-0 mt-0.5"
                style={{ color: B.orange }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </m.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: EASE }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="text-sm leading-relaxed pb-6" style={{ color: B.muted }}>{a}</p>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        ))}
      </div>
    </section>
  );
}

/* ── CTA ──────────────────────────────────────────────── */
function CTA() {
  return (
    <section id="cta" className="py-32 px-6 text-center relative overflow-hidden" style={{ background: "#060606" }}>
      {/* Dramatic centre glow */}
      <div aria-hidden="true" style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at 50% 60%, rgba(232,96,26,0.18) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute",
        top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(to right, transparent, ${B.orange}, transparent)`,
      }} />

      <div className="relative z-10 max-w-2xl mx-auto">
        <m.p
          {...reveal()}
          className="text-xs uppercase tracking-[0.2em] mb-4 font-semibold"
          style={{ color: B.orange }}
        >
          Ready to grow?
        </m.p>
        <m.h2
          {...reveal(0.08)}
          className="font-bold leading-tight mb-6"
          style={{ color: B.white, fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)" }}
        >
          Get your free SEO &amp; GEO audit
        </m.h2>
        <m.p
          {...reveal(0.16)}
          className="text-sm leading-relaxed mb-10 max-w-md mx-auto"
          style={{ color: B.muted }}
        >
          We'll analyse your Google rankings, site health, and AI search presence — then send you a
          prioritised report, free of charge, within 48 hours.
        </m.p>
        <m.div
          {...reveal(0.24)}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="mailto:hello@limadata.co.id"
            className="font-semibold px-10 py-4 rounded-full text-sm transition-all duration-200 hover:scale-105"
            style={{
              background: B.orange,
              color: B.white,
              boxShadow: `0 0 70px rgba(232,96,26,0.55), 0 4px 24px rgba(0,0,0,0.5)`,
            }}
          >
            Request Free Audit
          </a>
          <a
            href="https://limadata.co.id"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold px-10 py-4 rounded-full text-sm transition-all duration-200 hover:border-white/25"
            style={{ border: `1px solid ${B.border}`, color: B.dim }}
          >
            Visit limadata.co.id
          </a>
        </m.div>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────── */
const FOOTER_SERVICES = [
  { label: "SEO Services",        href: "/services/seo"              },
  { label: "Writing Services",    href: "/services/writing"          },
  { label: "SEM Service",         href: "/services/sem"              },
  { label: "Website Development", href: "/services/web-development"  },
  { label: "App Development",     href: "/services/app-development"  },
  { label: "UI/UX Design",        href: "/services/ui-ux-design"     },
];

const FOOTER_COMPANY = [
  { label: "How It Works",   href: "#how-it-works"  },
  { label: "Case Studies",   href: "#case-studies"  },
  { label: "Results",        href: "#results"        },
  { label: "FAQ",            href: "#faq"            },
  { label: "Free Audit",     href: "#cta"            },
  { label: "limadata.co.id", href: "https://limadata.co.id", external: true },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/limadata",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/limadata",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://twitter.com/limadata",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@limadata",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#080808"/>
      </svg>
    ),
  },
];

function Footer() {
  const year = new Date().getFullYear();
  const col  = { display: "flex", flexDirection: "column", gap: 12 };
  const link = { color: B.muted, fontSize: 13, textDecoration: "none", lineHeight: 1.5, transition: "color 0.18s" };

  return (
    <footer style={{ background: "#060606", borderTop: `1px solid ${B.border}` }}>
      {/* Top gradient rule */}
      <div aria-hidden="true" style={{ height: 1, background: `linear-gradient(to right, transparent, ${B.borderO}, transparent)` }} />

      {/* Main grid */}
      <div
        className="px-6 md:px-16 lg:px-24 pt-16 pb-12"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "48px 40px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Brand column */}
        <div style={{ ...col, gap: 20, gridColumn: "span 1" }}>
          <a href="/" aria-label="Limadata home">
            <img
              src="https://limadata.co.id/wp-content/uploads/2026/06/LOGO-LIMADATA-scaled-200x55.png"
              alt="Limadata — Jasa SEO Indonesia Terpercaya"
              style={{ height: 28, filter: "brightness(0) invert(1)" }}
            />
          </a>
          <p style={{ color: B.muted, fontSize: 13, lineHeight: 1.7, maxWidth: 240 }}>
            Data-driven SEO &amp; GEO agency helping Indonesian businesses grow visibility
            across Google and AI search.
          </p>
          {/* Social icons */}
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            {SOCIALS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${B.border}`,
                  color: B.muted,
                  transition: "background 0.2s, color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(232,96,26,0.12)";
                  e.currentTarget.style.color = B.orange;
                  e.currentTarget.style.borderColor = B.borderO;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = B.muted;
                  e.currentTarget.style.borderColor = B.border;
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Services column */}
        <div style={col}>
          <p style={{ color: B.white, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
            Services
          </p>
          {FOOTER_SERVICES.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={link}
              onMouseEnter={e => e.currentTarget.style.color = B.white}
              onMouseLeave={e => e.currentTarget.style.color = B.muted}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Company column */}
        <div style={col}>
          <p style={{ color: B.white, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
            Company
          </p>
          {FOOTER_COMPANY.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              style={link}
              onMouseEnter={e => e.currentTarget.style.color = B.white}
              onMouseLeave={e => e.currentTarget.style.color = B.muted}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Contact column */}
        <div style={col}>
          <p style={{ color: B.white, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
            Contact
          </p>

          {/* Address */}
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={B.orange} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <address style={{ ...link, fontStyle: "normal", color: B.muted }}>
              Jl. Jend. Sudirman Kav. 52–53<br />
              Senayan, Kebayoran Baru<br />
              Jakarta Selatan 12190<br />
              Indonesia
            </address>
          </div>

          {/* Email */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={B.orange} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <a
              href="mailto:hello@limadata.co.id"
              style={link}
              onMouseEnter={e => e.currentTarget.style.color = B.orange}
              onMouseLeave={e => e.currentTarget.style.color = B.muted}
            >
              hello@limadata.co.id
            </a>
          </div>

          {/* Phone */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={B.orange} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.1 6.1l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.92 16.92z"/>
            </svg>
            <a
              href="tel:+6221501234"
              style={link}
              onMouseEnter={e => e.currentTarget.style.color = B.white}
              onMouseLeave={e => e.currentTarget.style.color = B.muted}
            >
              +62 21 5012 3456
            </a>
          </div>

          {/* WhatsApp */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={B.orange} style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              style={link}
              onMouseEnter={e => e.currentTarget.style.color = B.white}
              onMouseLeave={e => e.currentTarget.style.color = B.muted}
            >
              +62 812 3456 7890
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="px-6 md:px-16 lg:px-24 py-5"
        style={{
          borderTop: `1px solid ${B.border}`,
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <p style={{ color: B.muted, fontSize: 12 }}>
          © {year} Limadata · PT Lima Data Digital · All rights reserved
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Sitemap", href: "/sitemap.xml" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{ color: B.muted, fontSize: 12, textDecoration: "none", transition: "color 0.18s" }}
              onMouseEnter={e => e.currentTarget.style.color = B.white}
              onMouseLeave={e => e.currentTarget.style.color = B.muted}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ── Page ─────────────────────────────────────────────── */
export default function LimadataPage({ articles: rawArticles = [], caseStudies: CASES = [] }) {
  const ARTICLES = rawArticles.map(({ slug, category, title, excerpt, date, read_time }) => ({
    category, title, excerpt, date, readTime: read_time, href: `/articles/${slug}`,
  }));
  return (
    <LazyMotion features={domAnimation}>
      <div style={{ background: B.dark, minHeight: "100vh" }}>
        <Nav />
        <Hero />
        <SocialProof />
        <Services />
        <CaseStudies cases={CASES} />
        <Articles articles={ARTICLES} />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </LazyMotion>
  );
}
