"use client";
import React from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";

/* ── Brand tokens ─────────────────────────────────────── */
const B = {
  orange:  "#E8601A",
  dark:    "#080808",
  surface: "#0E0E0E",
  card:    "#141414",
  border:  "rgba(255,255,255,0.07)",
  borderO: "rgba(232,96,26,0.3)",
  muted:   "rgba(255,255,255,0.38)",
  dim:     "rgba(255,255,255,0.62)",
  white:   "#FFFFFF",
};
const EASE = [0.16, 1, 0.3, 1];

const reveal = (delay = 0) => ({
  initial:     { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration: 0.85, delay, ease: EASE },
});

/* ── Nav ──────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Services",    href: "/#services"      },
  { label: "Case Studies",href: "/#case-studies"  },
  { label: "How It Works",href: "/#how-it-works"  },
  { label: "FAQ",         href: "/#faq"           },
];

const ALL_SERVICES = [
  { title: "SEO Services",              href: "/services/seo"              },
  { title: "Writing Services",          href: "/services/writing"          },
  { title: "SEM Service",               href: "/services/sem"              },
  { title: "Website Development",       href: "/services/web-development"  },
  { title: "App Development",           href: "/services/app-development"  },
  { title: "UI/UX Design",              href: "/services/ui-ux-design"     },
];

function Nav({ currentSlug }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [megaOpen,   setMegaOpen]   = React.useState(false);
  const [scrolled,   setScrolled]   = React.useState(false);
  const closeTimer = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function openMega()  { clearTimeout(closeTimer.current); setMegaOpen(true);  }
  function closeMega() { closeTimer.current = setTimeout(() => setMegaOpen(false), 140); }

  const navBg = scrolled || megaOpen ? "rgba(8,8,8,0.95)" : "transparent";

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
        <a href="/" aria-label="Limadata home">
          <img
            src="/logo-limadata.png"
            alt="Limadata"
            style={{ height: 32, filter: "brightness(0) invert(1)" }}
          />
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {/* Services mega trigger */}
          <div onMouseEnter={openMega} onMouseLeave={closeMega} style={{ position: "relative" }}>
            <button
              className="flex items-center gap-1 transition-colors duration-200"
              style={{ color: megaOpen ? B.orange : B.dim }}
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

          {NAV_LINKS.slice(1).map(l => (
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

        <div className="hidden md:flex">
          <a
            href="/#cta"
            className="text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200 hover:scale-105 hover:opacity-90"
            style={{ background: B.orange, color: B.white, boxShadow: `0 0 24px rgba(232,96,26,0.35)` }}
          >
            Get a Free Audit
          </a>
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto py-20 px-8 gap-5" style={{ background: B.dark }}>
            <button className="absolute top-5 right-6 p-2" onClick={() => setMobileOpen(false)} aria-label="Close">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <p className="text-xs uppercase tracking-[0.18em] font-semibold" style={{ color: B.orange }}>Services</p>
            {ALL_SERVICES.map(({ title, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium hover:text-white transition-colors"
                style={{ color: href.includes(currentSlug) ? B.white : B.dim }}
              >
                {title}
              </a>
            ))}
            <div style={{ height: 1, background: B.border, margin: "4px 0" }} />
            {NAV_LINKS.slice(1).map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium hover:text-white transition-colors"
                style={{ color: B.dim }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/#cta"
              onClick={() => setMobileOpen(false)}
              className="mt-4 text-center px-8 py-3.5 rounded-full text-white font-semibold"
              style={{ background: B.orange }}
            >
              Get a Free Audit
            </a>
          </div>
        )}
      </nav>

      {/* Services mega panel */}
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
              position: "fixed", top: 68, left: 0, right: 0, zIndex: 49,
              background: "rgba(8,8,8,0.98)",
              backdropFilter: "blur(28px) saturate(1.8)",
              borderBottom: `1px solid ${B.border}`,
            }}
          >
            <div style={{ height: 1, background: `linear-gradient(to right,transparent,${B.orange},transparent)` }} />
            <div
              style={{
                maxWidth: 860,
                margin: "0 auto",
                padding: "32px max(24px, calc((100vw - 860px) / 2)) 28px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px 32px",
              }}
            >
              {ALL_SERVICES.map(({ title, href }) => {
                const active = href.includes(currentSlug);
                return (
                  <a
                    key={href}
                    href={href}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 14px", borderRadius: 8,
                      color: active ? B.orange : B.dim,
                      fontSize: 14, fontWeight: active ? 600 : 500,
                      textDecoration: "none",
                      background: active ? "rgba(232,96,26,0.08)" : "transparent",
                      transition: "background 0.18s, color 0.18s",
                    }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = B.white; } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = B.dim; } }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={active ? B.orange : "currentColor"} strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    {title}
                  </a>
                );
              })}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Footer ───────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  const col  = { display: "flex", flexDirection: "column", gap: 12 };
  const lnk  = { color: B.muted, fontSize: 13, textDecoration: "none", lineHeight: 1.5, transition: "color 0.18s" };

  return (
    <footer style={{ background: "#060606", borderTop: `1px solid ${B.border}` }}>
      <div aria-hidden="true" style={{ height: 1, background: `linear-gradient(to right,transparent,${B.borderO},transparent)` }} />
      <div
        className="px-6 md:px-16 lg:px-24 pt-14 pb-10"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "40px 40px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div style={{ ...col, gap: 16 }}>
          <a href="/">
            <img
              src="/logo-limadata.png"
              alt="Limadata"
              style={{ height: 26, filter: "brightness(0) invert(1)" }}
            />
          </a>
          <p style={{ color: B.muted, fontSize: 13, lineHeight: 1.7, maxWidth: 220 }}>
            Data-driven SEO &amp; GEO agency helping Indonesian businesses grow visibility across Google and AI search.
          </p>
        </div>

        <div style={col}>
          <p style={{ color: B.white, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Services</p>
          {ALL_SERVICES.map(({ title, href }) => (
            <a key={href} href={href} style={lnk}
              onMouseEnter={e => e.currentTarget.style.color = B.white}
              onMouseLeave={e => e.currentTarget.style.color = B.muted}
            >{title}</a>
          ))}
        </div>

        <div style={col}>
          <p style={{ color: B.white, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Company</p>
          {[
            { label: "Case Studies",    href: "/#case-studies" },
            { label: "Results",         href: "/#results"      },
            { label: "FAQ",             href: "/#faq"          },
            { label: "Free SEO Audit",  href: "/#cta"          },
            { label: "limadata.co.id",  href: "https://limadata.co.id", external: true },
          ].map(({ label, href, external }) => (
            <a key={label} href={href} style={lnk}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onMouseEnter={e => e.currentTarget.style.color = B.white}
              onMouseLeave={e => e.currentTarget.style.color = B.muted}
            >{label}</a>
          ))}
        </div>

        <div style={col}>
          <p style={{ color: B.white, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Contact</p>
          <a href="mailto:hello@limadata.co.id" style={{ ...lnk, color: B.orange }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >hello@limadata.co.id</a>
          <address style={{ ...lnk, fontStyle: "normal" }}>
            Jl. Jend. Sudirman Kav. 52–53<br />
            Jakarta Selatan 12190<br />
            Indonesia
          </address>
        </div>
      </div>

      <div
        className="px-6 md:px-16 lg:px-24 py-6"
        style={{ borderTop: `1px solid ${B.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, maxWidth: 1200, margin: "0 auto" }}
      >
        <p style={{ color: B.muted, fontSize: 12 }}>© {year} Limadata. All rights reserved.</p>
        <p style={{ color: B.muted, fontSize: 12 }}>PT Lima Data Digital — Jakarta, Indonesia</p>
      </div>
    </footer>
  );
}

/* ── Hero ─────────────────────────────────────────────── */
function Hero({ service }) {
  const pad = "max(24px, calc((100vw - 1152px) / 2))";
  return (
    <section
      style={{
        paddingTop: 140,
        paddingBottom: 96,
        paddingLeft: pad,
        paddingRight: pad,
        background: B.dark,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(232,96,26,0.12) 0%, transparent 70%)",
      }} />

      {/* Breadcrumb */}
      <m.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}
      >
        <a href="/" style={{ color: B.muted, textDecoration: "none", transition: "color 0.18s" }}
          onMouseEnter={e => e.currentTarget.style.color = B.white}
          onMouseLeave={e => e.currentTarget.style.color = B.muted}
        >Home</a>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={B.muted} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
        <a href="/#services" style={{ color: B.muted, textDecoration: "none", transition: "color 0.18s" }}
          onMouseEnter={e => e.currentTarget.style.color = B.white}
          onMouseLeave={e => e.currentTarget.style.color = B.muted}
        >Services</a>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={B.muted} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
        <span style={{ color: B.dim }}>{service.category}</span>
      </m.div>

      <div style={{ maxWidth: 760 }}>
        <m.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ color: B.orange, fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 20 }}
        >
          {service.category}
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.0, delay: 0.08, ease: EASE }}
          style={{ color: B.white, fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.025em", marginBottom: 24 }}
        >
          {service.headline}<br />
          <em style={{ color: B.orange, fontStyle: "italic" }}>{service.headlineAccent}</em>
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.22, ease: EASE }}
          style={{ color: B.dim, fontSize: 17, lineHeight: 1.75, marginBottom: 44, maxWidth: 620 }}
        >
          {service.description}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.36, ease: EASE }}
          style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 64 }}
        >
          <a
            href="/#cta"
            style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              background: B.orange, color: B.white,
              fontWeight: 700, fontSize: 15,
              padding: "14px 28px", borderRadius: 999,
              textDecoration: "none",
              boxShadow: `0 0 42px rgba(232,96,26,0.45)`,
              transition: "opacity 0.18s, transform 0.18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            Get a Free Audit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a
            href="/#case-studies"
            style={{ color: B.dim, fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "color 0.18s" }}
            onMouseEnter={e => e.currentTarget.style.color = B.white}
            onMouseLeave={e => e.currentTarget.style.color = B.dim}
          >
            See Client Results →
          </a>
        </m.div>

        {/* Stats row */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          style={{ display: "flex", gap: "40px 56px", flexWrap: "wrap" }}
        >
          {service.stats.map(({ value, label }) => (
            <div key={label}>
              <p style={{ color: B.orange, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
                {value}
              </p>
              <p style={{ color: B.muted, fontSize: 13, marginTop: 6 }}>{label}</p>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
}

/* ── Features grid ────────────────────────────────────── */
function Features({ service }) {
  return (
    <section style={{ background: B.surface, padding: "88px max(24px, calc((100vw - 1152px) / 2))", position: "relative" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right,transparent,${B.borderO},transparent)` }} />

      <m.div {...reveal()} style={{ marginBottom: 56 }}>
        <p style={{ color: B.orange, fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 16 }}>
          What&apos;s Included
        </p>
        <h2 style={{ color: B.white, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
          Everything you need to{" "}
          <span style={{ color: B.orange }}>grow</span>
        </h2>
      </m.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, maxWidth: 1104 }}>
        {service.features.map(({ title, desc }, i) => (
          <m.div
            key={title}
            {...reveal(i * 0.06)}
            style={{
              background: B.card,
              border: `1px solid ${B.border}`,
              borderRadius: 16,
              padding: "28px 28px 32px",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = B.borderO}
            onMouseLeave={e => e.currentTarget.style.borderColor = B.border}
          >
            <div
              style={{
                width: 40, height: 40, borderRadius: 10,
                background: "rgba(232,96,26,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 18, color: B.orange,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <h3 style={{ color: B.white, fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
            <p style={{ color: B.muted, fontSize: 13, lineHeight: 1.7 }}>{desc}</p>
          </m.div>
        ))}
      </div>
    </section>
  );
}

/* ── Process ──────────────────────────────────────────── */
function Process({ service }) {
  return (
    <section style={{ background: B.dark, padding: "88px max(24px, calc((100vw - 1152px) / 2))", position: "relative" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right,transparent,${B.borderO},transparent)` }} />

      <m.div {...reveal()} style={{ marginBottom: 56 }}>
        <p style={{ color: B.orange, fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 16 }}>
          How We Work
        </p>
        <h2 style={{ color: B.white, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
          From kickoff to{" "}
          <span style={{ color: B.orange }}>results</span>
        </h2>
      </m.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2, maxWidth: 1104 }}>
        {service.process.map(({ step, title, desc }, i) => (
          <m.div
            key={step}
            {...reveal(i * 0.1)}
            style={{
              background: B.card,
              border: `1px solid ${B.border}`,
              borderRadius: 16,
              padding: "32px 28px",
              position: "relative",
            }}
          >
            <p style={{ color: "rgba(232,96,26,0.22)", fontSize: "3.5rem", fontWeight: 900, lineHeight: 1, marginBottom: 20, letterSpacing: "-0.04em" }}>
              {step}
            </p>
            <h3 style={{ color: B.white, fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{title}</h3>
            <p style={{ color: B.muted, fontSize: 13, lineHeight: 1.7 }}>{desc}</p>
          </m.div>
        ))}
      </div>
    </section>
  );
}

/* ── CTA ──────────────────────────────────────────────── */
function CTA({ service }) {
  const [email, setEmail] = React.useState("");
  const [sent,  setSent]  = React.useState(false);

  function submit(e) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
  }

  return (
    <section id="cta" style={{ background: B.surface, padding: "96px max(24px, calc((100vw - 1152px) / 2))", position: "relative" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right,transparent,${B.borderO},transparent)` }} />
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(232,96,26,0.1) 0%, transparent 70%)",
      }} />

      <m.div {...reveal()} style={{ textAlign: "center", maxWidth: 560, margin: "0 auto", position: "relative" }}>
        <p style={{ color: B.orange, fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 20 }}>
          Get Started
        </p>
        <h2 style={{ color: B.white, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.025em", marginBottom: 20 }}>
          Ready to grow your<br />
          <em style={{ color: B.orange, fontStyle: "italic" }}>search visibility?</em>
        </h2>
        <p style={{ color: B.dim, fontSize: 15, lineHeight: 1.72, marginBottom: 40 }}>
          Get a free {service.category} audit delivered within 48 hours — no commitment, no sales pressure.
        </p>

        {sent ? (
          <div style={{ background: "rgba(232,96,26,0.1)", border: `1px solid ${B.borderO}`, borderRadius: 12, padding: "18px 28px", color: B.orange, fontWeight: 600, fontSize: 15 }}>
            Thanks! We&apos;ll be in touch within 48 hours.
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: "1 1 240px", maxWidth: 300,
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${B.border}`,
                borderRadius: 999, padding: "13px 22px",
                color: B.white, fontSize: 14, outline: "none",
                fontFamily: "inherit",
              }}
              onFocus={e => e.target.style.borderColor = B.borderO}
              onBlur={e => e.target.style.borderColor = B.border}
            />
            <button
              type="submit"
              style={{
                background: B.orange, color: B.white,
                fontWeight: 700, fontSize: 14,
                padding: "13px 28px", borderRadius: 999,
                border: "none", cursor: "pointer",
                boxShadow: `0 0 32px rgba(232,96,26,0.4)`,
                transition: "opacity 0.18s, transform 0.18s",
                fontFamily: "inherit",
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              Get Free Audit
            </button>
          </form>
        )}
      </m.div>
    </section>
  );
}

/* ── Main export ──────────────────────────────────────── */
export default function ServicePage({ service }) {
  return (
    <LazyMotion features={domAnimation}>
      <div style={{ background: B.dark, minHeight: "100vh" }}>
        <Nav currentSlug={service.slug} />
        <Hero service={service} />
        <Features service={service} />
        <Process service={service} />
        <CTA service={service} />
        <Footer />
      </div>
    </LazyMotion>
  );
}
