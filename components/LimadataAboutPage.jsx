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

const VALUE_ICONS = [
  <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
  <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
];

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#E8601A,#FF7030)",
  "linear-gradient(135deg,#0068c9,#3da1ff)",
  "linear-gradient(135deg,#1d6e36,#2dbd5a)",
  "linear-gradient(135deg,#5b21b6,#a78bfa)",
  "linear-gradient(135deg,#991b1b,#f87171)",
  "linear-gradient(135deg,#7a3b10,#d4813a)",
];

export default function AboutPage({ about }) {
  const stats      = Array.isArray(about.stats)       ? about.stats       : [];
  const valuesList = Array.isArray(about.values_list) ? about.values_list : [];
  const team       = Array.isArray(about.team)        ? about.team        : [];

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
            src="/logo-limadata.png"
            alt="Limadata"
            style={{ height: 28, filter: "brightness(0) invert(1)" }}
          />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link href="/" style={{ color: B.dim, fontSize: 13, fontWeight: 500, textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.color = B.white}
            onMouseLeave={e => e.currentTarget.style.color = B.dim}>
            Home
          </Link>
          <Link href="/#articles" style={{ color: B.dim, fontSize: 13, fontWeight: 500, textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.color = B.white}
            onMouseLeave={e => e.currentTarget.style.color = B.dim}>
            Articles
          </Link>
          <a href="/#cta" style={{ background: B.orange, color: B.white, fontSize: 13, fontWeight: 600, padding: "9px 20px", borderRadius: 999, textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            Free Audit
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header style={{
        padding: "148px max(24px, calc((100vw - 860px) / 2)) 80px",
        position: "relative", overflow: "hidden", textAlign: "center",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(200,65,8,0.22) 0%, transparent 65%)",
        }} />
        {/* Dot grid */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto" }}>
          <motion.p {...rev(0)} style={{ color: B.orange, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 20 }}>
            {about.hero_tagline || "Who We Are"}
          </motion.p>
          <motion.h1
            {...rev(0.07)}
            style={{ color: B.white, fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.025em", marginBottom: 24 }}
          >
            {about.hero_title || "We help Indonesian businesses grow"}
          </motion.h1>
          <motion.p {...rev(0.14)} style={{ color: B.dim, fontSize: 17, lineHeight: 1.8, maxWidth: 680, margin: "0 auto 40px" }}>
            {about.hero_description}
          </motion.p>
          <motion.div {...rev(0.2)} style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="/#cta" style={{ background: B.orange, color: B.white, fontWeight: 600, fontSize: 14, padding: "13px 30px", borderRadius: 999, textDecoration: "none", boxShadow: `0 0 48px rgba(232,96,26,0.45)` }}>
              Work With Us
            </a>
            <Link href="/#case-studies" style={{ border: `1px solid ${B.border}`, color: B.dim, fontWeight: 600, fontSize: 14, padding: "13px 30px", borderRadius: 999, textDecoration: "none" }}>
              See Case Studies
            </Link>
          </motion.div>
        </div>
      </header>

      {/* ── Stats ── */}
      {stats.length > 0 && (
        <section style={{ padding: "0 max(24px, calc((100vw - 1080px) / 2)) 80px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
            gap: 1, background: B.border, border: `1px solid ${B.border}`, borderRadius: 16, overflow: "hidden",
          }}>
            {stats.map((s, i) => (
              <motion.div
                key={i}
                {...rev(0.1 + i * 0.07)}
                style={{ background: B.card, padding: "32px 28px", textAlign: "center" }}
              >
                <p style={{ color: B.orange, fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 800, lineHeight: 1, marginBottom: 8 }}>
                  {s.value}
                </p>
                <p style={{ color: B.muted, fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Mission & Vision ── */}
      {(about.mission || about.vision) && (
        <section style={{ padding: "0 max(24px, calc((100vw - 1080px) / 2)) 80px" }}>
          <motion.div {...rev(0.1)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {about.mission && (
              <div style={{
                background: B.card, border: `1px solid ${B.border}`,
                borderTop: `2px solid ${B.orange}`, borderRadius: 14, padding: "32px 30px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(232,96,26,0.12)", border: "1px solid rgba(232,96,26,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: B.orange }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l2.5 2.5L16 9"/></svg>
                  </div>
                  <p style={{ color: B.white, fontSize: 15, fontWeight: 700, margin: 0 }}>Our Mission</p>
                </div>
                <p style={{ color: B.dim, fontSize: 15, lineHeight: 1.8, margin: 0 }}>{about.mission}</p>
              </div>
            )}
            {about.vision && (
              <div style={{
                background: B.card, border: `1px solid ${B.border}`,
                borderTop: "2px solid rgba(61,161,255,0.7)", borderRadius: 14, padding: "32px 30px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(61,161,255,0.1)", border: "1px solid rgba(61,161,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#3da1ff" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </div>
                  <p style={{ color: B.white, fontSize: 15, fontWeight: 700, margin: 0 }}>Our Vision</p>
                </div>
                <p style={{ color: B.dim, fontSize: 15, lineHeight: 1.8, margin: 0 }}>{about.vision}</p>
              </div>
            )}
          </motion.div>
        </section>
      )}

      {/* ── Values ── */}
      {valuesList.length > 0 && (
        <section style={{ padding: "0 max(24px, calc((100vw - 1080px) / 2)) 80px" }}>
          <motion.div {...rev(0.05)} style={{ marginBottom: 40, textAlign: "center" }}>
            <p style={{ color: B.orange, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>What Drives Us</p>
            <h2 style={{ color: B.white, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, lineHeight: 1.2 }}>Our Values</h2>
          </motion.div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
          }}>
            {valuesList.map((v, i) => (
              <motion.div
                key={i}
                {...rev(0.1 + i * 0.07)}
                style={{
                  background: B.card, border: `1px solid ${B.border}`,
                  borderRadius: 14, padding: "26px 24px",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = B.borderO}
                onMouseLeave={e => e.currentTarget.style.borderColor = B.border}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 11,
                  background: "rgba(232,96,26,0.1)", border: "1px solid rgba(232,96,26,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: B.orange, marginBottom: 16,
                }}>
                  {VALUE_ICONS[i % VALUE_ICONS.length]}
                </div>
                <p style={{ color: B.white, fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{v.title}</p>
                <p style={{ color: B.dim, fontSize: 13, lineHeight: 1.7, margin: 0 }}>{v.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Team ── */}
      {team.length > 0 && (
        <section style={{ padding: "0 max(24px, calc((100vw - 1080px) / 2)) 80px" }}>
          <motion.div {...rev(0.05)} style={{ marginBottom: 40, textAlign: "center" }}>
            <p style={{ color: B.orange, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>The People Behind It</p>
            <h2 style={{ color: B.white, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, lineHeight: 1.2 }}>Meet the Team</h2>
          </motion.div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
          }}>
            {team.map((member, i) => (
              <motion.div
                key={i}
                {...rev(0.1 + i * 0.07)}
                style={{
                  background: B.card, border: `1px solid ${B.border}`,
                  borderRadius: 14, padding: "28px 24px", textAlign: "center",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = B.borderO; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = B.border; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {/* Avatar */}
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length],
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, fontWeight: 800, color: B.white,
                  margin: "0 auto 16px",
                  boxShadow: `0 0 32px ${B.orange}33`,
                }}>
                  {member.initials || member.name?.slice(0,2).toUpperCase()}
                </div>
                <p style={{ color: B.white, fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{member.name}</p>
                <p style={{ color: B.orange, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>{member.role}</p>
                {member.bio && (
                  <p style={{ color: B.muted, fontSize: 13, lineHeight: 1.65, margin: 0 }}>{member.bio}</p>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, color: "#3da1ff", fontSize: 12, fontWeight: 600, textDecoration: "none" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    LinkedIn
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Rich content body ── */}
      {about.content_html && (
        <section style={{ padding: "0 max(24px, calc((100vw - 760px) / 2)) 80px" }}>
          <motion.div {...rev(0.1)}>
            <div
              className="article-html"
              dangerouslySetInnerHTML={{ __html: about.content_html }}
              style={{ color: B.dim, fontSize: 17, lineHeight: 1.85 }}
            />
          </motion.div>
        </section>
      )}

      {/* ── CTA ── */}
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
            <a href="mailto:hello@limadata.co.id" style={{ background: B.orange, color: B.white, fontWeight: 600, fontSize: 14, padding: "14px 32px", borderRadius: 999, textDecoration: "none", boxShadow: `0 0 60px rgba(232,96,26,0.5)` }}>
              Request Free Audit
            </a>
            <Link href="/" style={{ border: `1px solid ${B.border}`, color: B.dim, fontWeight: 600, fontSize: 14, padding: "14px 32px", borderRadius: 999, textDecoration: "none" }}>
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
          <img src="/logo-limadata.png" alt="Limadata" style={{ height: 22, filter: "brightness(0) invert(1)", opacity: 0.5 }} />
        </Link>
        <p style={{ color: B.muted, fontSize: 12 }}>© {new Date().getFullYear()} PT Lima Data Digital. All rights reserved.</p>
      </footer>

    </div>
  );
}
