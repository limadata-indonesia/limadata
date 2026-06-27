"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const B = {
  orange:  "#E8601A",
  hot:     "#FF7030",
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
const rev  = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

/* ── Metric card ───────────────────────────────────── */
function MetricCard({ label, value, sublabel, dot, i }) {
  return (
    <motion.div
      {...rev(0.1 + i * 0.08)}
      style={{
        flex: "1 1 0", minWidth: 160,
        background: B.card,
        border: `1px solid ${B.border}`,
        borderTop: `2px solid ${dot || B.orange}`,
        borderRadius: 12,
        padding: "20px 22px",
      }}
    >
      <p style={{ color: dot || B.orange, fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 800, lineHeight: 1, marginBottom: 6 }}>
        {value}
      </p>
      <p style={{ color: B.white, fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{label}</p>
      {sublabel && <p style={{ color: B.muted, fontSize: 12 }}>{sublabel}</p>}
    </motion.div>
  );
}

/* ── Timeline ──────────────────────────────────────── */
function Timeline({ items, dot }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {items.map((step, i) => (
        <div key={i} style={{ display: "flex", gap: 16, position: "relative" }}>
          {/* Line + dot */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: `linear-gradient(135deg, ${dot || B.orange}, ${B.hot})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 800, color: B.white, flexShrink: 0,
              boxShadow: `0 0 16px ${dot || B.orange}44`,
            }}>
              {i + 1}
            </div>
            {i < items.length - 1 && (
              <div style={{ width: 1, flex: 1, background: `linear-gradient(to bottom, ${dot || B.orange}66, transparent)`, margin: "4px 0" }} />
            )}
          </div>
          {/* Content */}
          <div style={{ paddingBottom: i < items.length - 1 ? 28 : 0, flex: 1 }}>
            <p style={{ color: B.muted, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>
              {step.date}
            </p>
            <p style={{ color: B.white, fontSize: 14, fontWeight: 700, marginBottom: 5 }}>{step.title}</p>
            {step.description && (
              <p style={{ color: B.dim, fontSize: 13, lineHeight: 1.65 }}>{step.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Section with icon ─────────────────────────────── */
function Section({ icon, label, color, children }) {
  return (
    <div style={{
      background: B.card,
      border: `1px solid ${B.border}`,
      borderRadius: 14,
      padding: "28px 30px",
      marginBottom: 20,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: `${color || B.orange}1a`,
          border: `1px solid ${color || B.orange}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: color || B.orange, flexShrink: 0,
        }}>
          {icon}
        </div>
        <p style={{ color: B.white, fontSize: 16, fontWeight: 700, margin: 0 }}>{label}</p>
      </div>
      {children}
    </div>
  );
}

/* ── Main page ─────────────────────────────────────── */
export default function CaseStudyPage({ cs }) {
  const metrics      = Array.isArray(cs.metrics)      ? cs.metrics      : [];
  const servicesList = Array.isArray(cs.services_list) ? cs.services_list : [];
  const timeline     = Array.isArray(cs.timeline)     ? cs.timeline     : [];

  return (
    <div style={{ background: B.dark, minHeight: "100vh" }}>

      {/* ── Nav ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px max(24px, calc((100vw - 1152px) / 2))",
        background: "rgba(8,8,8,0.92)",
        backdropFilter: "blur(20px) saturate(1.6)",
        borderBottom: `1px solid ${B.border}`,
      }}>
        <Link href="/">
          <img
            src="https://limadata.co.id/wp-content/uploads/2026/06/LOGO-LIMADATA-scaled-200x55.png"
            alt="Limadata"
            style={{ height: 28, filter: "brightness(0) invert(1)" }}
          />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link
            href="/#case-studies"
            style={{ display: "flex", alignItems: "center", gap: 6, color: B.dim, fontSize: 13, fontWeight: 500, textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.color = B.white}
            onMouseLeave={e => e.currentTarget.style.color = B.dim}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Case Studies
          </Link>
          <a
            href="/#cta"
            style={{ background: B.orange, color: B.white, fontSize: 13, fontWeight: 600, padding: "9px 20px", borderRadius: 999, textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Free Audit
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header style={{ paddingTop: 72, position: "relative", overflow: "hidden" }}>
        {/* Gradient bg */}
        <div style={{
          background: cs.bg || `linear-gradient(135deg, #1d1d1d, #080808)`,
          padding: "80px max(24px, calc((100vw - 1152px) / 2)) 64px",
          position: "relative",
        }}>
          {/* Decorative circles */}
          <div aria-hidden="true" style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", background: "rgba(255,255,255,0.04)", top: -80, right: "8%", pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.03)", bottom: -40, left: "12%", pointerEvents: "none" }} />

          <div style={{ maxWidth: 1152, margin: "0 auto", position: "relative", zIndex: 1 }}>
            {/* Breadcrumb */}
            <motion.div {...rev(0)} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
              <Link href="/" style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none" }}>Home</Link>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>/</span>
              <Link href="/#case-studies" style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none" }}>Case Studies</Link>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>/</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{cs.company}</span>
            </motion.div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 32, flexWrap: "wrap" }}>
              {/* Logo mark */}
              <motion.div
                {...rev(0.05)}
                style={{
                  width: 80, height: 80, borderRadius: 18, flexShrink: 0,
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, fontWeight: 800, color: B.white, letterSpacing: "-0.02em",
                }}
              >
                {cs.abbr}
              </motion.div>

              <div style={{ flex: 1, minWidth: 260 }}>
                <motion.p {...rev(0.08)} style={{ color: cs.dot || B.orange, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 10 }}>
                  Case Study
                </motion.p>
                <motion.h1
                  {...rev(0.1)}
                  style={{ color: B.white, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 16 }}
                >
                  {cs.company}
                </motion.h1>
                <motion.p {...rev(0.14)} style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.7, maxWidth: 560, marginBottom: 28 }}>
                  {cs.description}
                </motion.p>
                {/* Stat */}
                <motion.div {...rev(0.18)} style={{ display: "inline-flex", alignItems: "baseline", gap: 10, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)", border: `1px solid ${cs.dot || B.orange}44`, borderRadius: 12, padding: "14px 22px" }}>
                  <span style={{ color: cs.dot || B.orange, fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1 }}>
                    {cs.change}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 600 }}>Organic Growth</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div aria-hidden="true" style={{ height: 48, background: `linear-gradient(to bottom, transparent, ${B.dark})` }} />
      </header>

      {/* ── Metrics ── */}
      {metrics.length > 0 && (
        <section style={{ padding: "0 max(24px, calc((100vw - 1152px) / 2)) 56px" }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {metrics.map((m, i) => (
              <MetricCard key={i} {...m} dot={cs.dot} i={i} />
            ))}
          </div>
        </section>
      )}

      {/* ── Body ── */}
      <main style={{ padding: "0 max(24px, calc((100vw - 760px) / 2)) 96px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          {/* About the Client */}
          {cs.client_about && (
            <motion.div {...rev(0.2)}>
              <Section
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>}
                label="About the Client"
                color={cs.dot}
              >
                <p style={{ color: B.dim, fontSize: 15, lineHeight: 1.8, margin: 0 }}>{cs.client_about}</p>
              </Section>
            </motion.div>
          )}

          {/* Services Taken */}
          {servicesList.length > 0 && (
            <motion.div {...rev(0.24)}>
              <Section
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
                label="Services Taken"
                color={cs.dot}
              >
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {servicesList.map((s, i) => (
                    <span key={i} style={{
                      background: `${cs.dot || B.orange}18`,
                      border: `1px solid ${cs.dot || B.orange}44`,
                      color: cs.dot || B.orange,
                      fontSize: 13, fontWeight: 600,
                      padding: "6px 14px", borderRadius: 999,
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </Section>
            </motion.div>
          )}

          {/* Timeline */}
          {timeline.length > 0 && (
            <motion.div {...rev(0.28)}>
              <Section
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>}
                label="Timeline"
                color={cs.dot}
              >
                <Timeline items={timeline} dot={cs.dot} />
              </Section>
            </motion.div>
          )}

          {/* Challenge */}
          {cs.challenge && (
            <motion.div {...rev(0.32)}>
              <Section
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
                label="The Challenge"
                color="#f59e0b"
              >
                <p style={{ color: B.dim, fontSize: 15, lineHeight: 1.8, margin: 0 }}>{cs.challenge}</p>
              </Section>
            </motion.div>
          )}

          {/* Solution */}
          {cs.solution && (
            <motion.div {...rev(0.36)}>
              <Section
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
                label="Our Solution"
                color="#22c55e"
              >
                <p style={{ color: B.dim, fontSize: 15, lineHeight: 1.8, margin: 0 }}>{cs.solution}</p>
              </Section>
            </motion.div>
          )}

          {/* Rich content body */}
          {cs.content_html && (
            <motion.div {...rev(0.4)}>
              <div
                className="article-html"
                dangerouslySetInnerHTML={{ __html: cs.content_html }}
                style={{ color: B.dim, fontSize: 17, lineHeight: 1.85, marginTop: 32 }}
              />
            </motion.div>
          )}
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section style={{
        background: "#060606",
        borderTop: `1px solid ${B.border}`,
        padding: "80px max(24px, calc((100vw - 760px) / 2))",
        position: "relative", overflow: "hidden", textAlign: "center",
      }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 60%, rgba(232,96,26,0.14) 0%, transparent 65%)" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${B.orange}, transparent)` }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 520, margin: "0 auto" }}>
          <p style={{ color: B.orange, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Ready to grow?</p>
          <h2 style={{ color: B.white, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            Get your free SEO &amp; GEO audit
          </h2>
          <p style={{ color: B.muted, fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>
            We'll analyse your Google rankings, site health, and AI search presence — then send you a prioritised report within 48 hours, free of charge.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a
              href="mailto:hello@limadata.co.id"
              style={{ background: B.orange, color: B.white, fontWeight: 600, fontSize: 14, padding: "14px 32px", borderRadius: 999, textDecoration: "none", boxShadow: `0 0 60px rgba(232,96,26,0.5)` }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              Request Free Audit
            </a>
            <Link
              href="/"
              style={{ border: `1px solid ${B.border}`, color: B.dim, fontWeight: 600, fontSize: 14, padding: "14px 32px", borderRadius: 999, textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = B.white; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = B.border; e.currentTarget.style.color = B.dim; }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        background: "#060606",
        borderTop: `1px solid ${B.border}`,
        padding: "28px max(24px, calc((100vw - 1152px) / 2))",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12,
      }}>
        <Link href="/">
          <img
            src="https://limadata.co.id/wp-content/uploads/2026/06/LOGO-LIMADATA-scaled-200x55.png"
            alt="Limadata"
            style={{ height: 22, filter: "brightness(0) invert(1)", opacity: 0.5 }}
          />
        </Link>
        <p style={{ color: B.muted, fontSize: 12 }}>
          © {new Date().getFullYear()} PT Lima Data Digital. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
