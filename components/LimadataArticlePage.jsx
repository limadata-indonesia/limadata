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

const CAT_COLORS = {
  "GEO":               { bg: "rgba(232,96,26,0.12)",  text: B.orange },
  "SEO":               { bg: "rgba(61,180,100,0.12)",  text: "#3db464" },
  "Technical SEO":     { bg: "rgba(61,130,220,0.12)",  text: "#4d9fe0" },
  "Link Building":     { bg: "rgba(160,100,220,0.12)", text: "#b07de0" },
  "Digital Marketing": { bg: "rgba(220,180,40,0.12)",  text: "#d4b430" },
};

function ContentBlock({ block }) {
  const proseP  = { color: B.dim,   fontSize: 17, lineHeight: 1.85, marginBottom: 20 };
  const proseH2 = { color: B.white, fontSize: 22, fontWeight: 700, lineHeight: 1.3, margin: "44px 0 16px", paddingLeft: 16, borderLeft: `3px solid ${B.orange}` };
  const proseUl = { color: B.dim,   fontSize: 16, lineHeight: 1.8, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 };
  const proseOl = { color: B.dim,   fontSize: 16, lineHeight: 1.8, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 20, counterReset: "ol-counter" };

  if (block.type === "p") {
    return <p style={proseP}>{block.text}</p>;
  }
  if (block.type === "h2") {
    return <h2 style={proseH2}>{block.text}</h2>;
  }
  if (block.type === "blockquote") {
    return (
      <blockquote style={{
        borderLeft: `3px solid ${B.orange}`,
        paddingLeft: 20,
        margin: "32px 0",
        fontStyle: "italic",
        color: B.white,
        fontSize: 19,
        lineHeight: 1.6,
        background: "rgba(232,96,26,0.05)",
        padding: "18px 20px",
        borderRadius: "0 8px 8px 0",
      }}>
        "{block.text}"
      </blockquote>
    );
  }
  if (block.type === "ul") {
    return (
      <ul style={proseUl}>
        {block.items.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={B.orange} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 5 }}>
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "ol") {
    return (
      <ol style={proseOl}>
        {block.items.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{
              flexShrink: 0,
              width: 26, height: 26,
              borderRadius: "50%",
              background: "rgba(232,96,26,0.12)",
              border: `1px solid ${B.borderO}`,
              color: B.orange,
              fontSize: 12, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {i + 1}
            </span>
            <span style={{ paddingTop: 3 }}>{item}</span>
          </li>
        ))}
      </ol>
    );
  }
  return null;
}

export default function ArticlePage({ article }) {
  const cat = CAT_COLORS[article.category] ?? { bg: "rgba(255,255,255,0.08)", text: B.dim };

  return (
    <div style={{ background: B.dark, minHeight: "100vh" }}>
      <style>{`
        .article-html { color: rgba(255,255,255,0.62); font-size: 17px; line-height: 1.85; }
        .article-html h1,.article-html h2,.article-html h3,.article-html h4,.article-html h5 {
          color: #fff; font-weight: 700; line-height: 1.3; margin: 44px 0 16px;
        }
        .article-html h2 { font-size: 22px; padding-left: 16px; border-left: 3px solid #E8601A; }
        .article-html h3 { font-size: 18px; }
        .article-html h4 { font-size: 16px; }
        .article-html h5 { font-size: 14px; }
        .article-html p  { margin: 0 0 20px; }
        .article-html a  { color: #E8601A; text-decoration: underline; text-underline-offset: 3px; transition: opacity 0.15s; }
        .article-html a:hover { opacity: 0.75; }
        .article-html strong,.article-html b { color: #fff; font-weight: 600; }
        .article-html em,.article-html i { font-style: italic; }
        .article-html ul,.article-html ol { padding-left: 24px; margin: 0 0 24px; display: flex; flex-direction: column; gap: 8px; }
        .article-html li { color: rgba(255,255,255,0.62); line-height: 1.75; }
        .article-html blockquote {
          border-left: 3px solid #E8601A; margin: 36px 0;
          padding: 18px 22px; background: rgba(232,96,26,0.05);
          border-radius: 0 10px 10px 0; font-size: 19px; font-style: italic; color: #fff;
        }
        .article-html img { max-width: 100%; height: auto; border-radius: 10px; margin: 28px 0; display: block; }
        .article-html code {
          font-family: ui-monospace, monospace;
          background: rgba(255,255,255,0.06); padding: 2px 7px;
          border-radius: 4px; font-size: 0.88em; color: #E8601A;
        }
        .article-html pre {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 24px; overflow-x: auto; margin: 28px 0;
        }
        .article-html pre code { background: none; padding: 0; color: rgba(255,255,255,0.7); font-size: 14px; }
        .article-html hr { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 48px 0; }
        /* ── Tables ── */
        .article-html table {
          width: 100%; border-collapse: collapse; margin: 36px 0; font-size: 14px;
          border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden;
          background: rgba(255,255,255,0.02);
        }
        .article-html thead { background: rgba(232,96,26,0.12); }
        .article-html th {
          color: #fff; font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          padding: 13px 16px; text-align: left;
          border-right: 1px solid rgba(232,96,26,0.2);
          border-bottom: 2px solid rgba(232,96,26,0.35);
        }
        .article-html th:last-child { border-right: none; }
        .article-html td {
          color: rgba(255,255,255,0.7); padding: 12px 16px;
          border-right: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          vertical-align: top; line-height: 1.6;
          background: rgba(255,255,255,0.01);
        }
        .article-html td:last-child { border-right: none; }
        .article-html tr:last-child td { border-bottom: none; }
        .article-html tbody tr:nth-child(even) td { background: rgba(255,255,255,0.03); }
        .article-html tbody tr:hover td { background: rgba(232,96,26,0.05) !important; transition: background 0.12s; }
      `}</style>

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
            alt="Limadata — Jasa SEO Indonesia"
            style={{ height: 28, filter: "brightness(0) invert(1)" }}
          />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link
            href="/#articles"
            style={{
              display: "flex", alignItems: "center", gap: 6,
              color: B.dim, fontSize: 13, fontWeight: 500,
              textDecoration: "none", transition: "color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = B.white}
            onMouseLeave={e => e.currentTarget.style.color = B.dim}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            All Articles
          </Link>
          <a
            href="/#cta"
            style={{
              background: B.orange, color: B.white,
              fontSize: 13, fontWeight: 600,
              padding: "9px 20px", borderRadius: 999,
              textDecoration: "none", transition: "opacity 0.18s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Free Audit
          </a>
        </div>
      </nav>

      {/* ── Article header ── */}
      <header
        style={{
          paddingTop: 128,
          paddingBottom: 64,
          padding: "128px max(24px, calc((100vw - 760px) / 2)) 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Warm glow */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(200,65,8,0.2) 0%, transparent 65%)",
        }} />

        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Category + read time row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}
          >
            <span style={{
              background: cat.bg, color: cat.text,
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "4px 12px", borderRadius: 999,
            }}>
              {article.category}
            </span>
            <span style={{ color: B.muted, fontSize: 13 }}>{article.readTime}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: B.muted, display: "inline-block" }} />
            <span style={{ color: B.muted, fontSize: 13 }}>{article.date}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.0, delay: 0.08, ease: EASE }}
            style={{
              color: B.white,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: 32,
            }}
          >
            {article.title}
          </motion.h1>

          {/* Author row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: `linear-gradient(135deg, ${B.hot}, ${B.orange})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700, color: B.white, flexShrink: 0,
            }}>
              {article.author.initials}
            </div>
            <div>
              <p style={{ color: B.white, fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>
                {article.author.name}
              </p>
              <p style={{ color: B.muted, fontSize: 12 }}>{article.author.role}</p>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            style={{
              height: 1, marginTop: 40,
              background: `linear-gradient(to right, ${B.orange}, transparent)`,
              transformOrigin: "left",
            }}
          />
        </div>
      </header>

      {/* ── Article body ── */}
      <main style={{
        padding: "0 max(24px, calc((100vw - 760px) / 2)) 96px",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          style={{ maxWidth: 760, margin: "0 auto" }}
        >
          {article.content_html
            ? <div
                className="article-html"
                dangerouslySetInnerHTML={{ __html: article.content_html }}
                style={{ color: B.dim, fontSize: 17, lineHeight: 1.85 }}
              />
            : article.content?.map((block, i) => (
                <ContentBlock key={i} block={block} />
              ))
          }
        </motion.div>
      </main>

      {/* ── Bottom CTA ── */}
      <section style={{
        background: "#060606",
        borderTop: `1px solid ${B.border}`,
        padding: "80px max(24px, calc((100vw - 760px) / 2))",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 60%, rgba(232,96,26,0.14) 0%, transparent 65%)",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(to right, transparent, ${B.orange}, transparent)`,
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 520, margin: "0 auto" }}>
          <p style={{ color: B.orange, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
            Ready to grow?
          </p>
          <h2 style={{ color: B.white, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            Get your free SEO &amp; GEO audit
          </h2>
          <p style={{ color: B.muted, fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>
            We'll analyse your Google rankings, site health, and AI search presence — then send you a prioritised report within 48 hours, free of charge.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a
              href="mailto:hello@limadata.co.id"
              style={{
                background: B.orange, color: B.white,
                fontWeight: 600, fontSize: 14,
                padding: "14px 32px", borderRadius: 999,
                textDecoration: "none",
                boxShadow: `0 0 60px rgba(232,96,26,0.5)`,
                transition: "opacity 0.18s, transform 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.transform = "scale(1)"; }}
            >
              Request Free Audit
            </a>
            <Link
              href="/"
              style={{
                border: `1px solid ${B.border}`, color: B.dim,
                fontWeight: 600, fontSize: 14,
                padding: "14px 32px", borderRadius: 999,
                textDecoration: "none",
                transition: "border-color 0.18s, color 0.18s",
              }}
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
            alt="Limadata — Jasa SEO Indonesia Terpercaya"
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
