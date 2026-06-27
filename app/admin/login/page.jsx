"use client";
import { useState } from "react";
import { createClient } from "../../../lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) { setError(authError.message); setLoading(false); return; }
      window.location.href = "/admin";
    } catch {
      setError("Connection error — check your network and try again.");
      setLoading(false);
    }
  }

  const field = {
    width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8, padding: "11px 14px", color: "white", fontSize: 14,
    outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#1e293b", borderRadius: 16, padding: "40px 36px", width: "100%", maxWidth: 400, border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img
            src="https://limadata.co.id/wp-content/uploads/2026/06/LOGO-LIMADATA-scaled-200x55.png"
            alt="Limadata"
            style={{ height: 30, filter: "brightness(0) invert(1)", marginBottom: 16 }}
          />
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0 }}>Sign in to Content Manager</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={field} placeholder="you@limadata.co.id" />
          </div>
          <div style={{ marginBottom: 22 }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={field} />
          </div>

          {error && (
            <div style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.25)", borderRadius: 8, padding: "10px 14px", color: "#f87171", fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: "100%", background: "#E8601A", color: "white", border: "none",
            borderRadius: 8, padding: "12px", fontSize: 14, fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
          }}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
