"use client";
import { useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { createClient } from "../../lib/supabase-browser";

/* ── Toolbar button ──────────────────────────────────── */
function Btn({ onClick, active, title, children, disabled }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 30, height: 30, borderRadius: 5, border: "none", cursor: disabled ? "default" : "pointer",
        background: active ? "#E8601A" : "transparent",
        color: active ? "white" : "#475569",
        fontSize: 13, fontWeight: 600,
        opacity: disabled ? 0.35 : 1,
        transition: "background 0.15s, color 0.15s",
      }}
      onMouseEnter={e => { if (!active && !disabled) e.currentTarget.style.background = "#f1f5f9"; }}
      onMouseLeave={e => { if (!active && !disabled) e.currentTarget.style.background = "transparent"; }}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div style={{ width: 1, height: 20, background: "#e2e8f0", margin: "0 4px" }} />;
}

/* ── Link popover ────────────────────────────────────── */
function LinkPopover({ editor, onClose }) {
  const existing = editor.getAttributes("link").href || "";
  const [url, setUrl] = useState(existing);

  function apply() {
    const trimmed = url.trim();
    if (!trimmed) { editor.chain().focus().unsetLink().run(); }
    else {
      const href = trimmed.startsWith("http") || trimmed.startsWith("/") ? trimmed : `https://${trimmed}`;
      editor.chain().focus().setLink({ href, rel: "noopener noreferrer" }).run();
    }
    onClose();
  }

  return (
    <div style={{
      position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 50,
      background: "white", border: "1px solid #e2e8f0", borderRadius: 8,
      padding: "12px 14px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", width: 300,
    }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>
        Insert Link
      </p>
      <input
        autoFocus
        type="text"
        value={url}
        onChange={e => setUrl(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); apply(); } if (e.key === "Escape") onClose(); }}
        placeholder="https://example.com or /internal-path"
        style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 6, padding: "8px 10px", fontSize: 13, outline: "none", boxSizing: "border-box", marginBottom: 10 }}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={apply}
          style={{ background: "#E8601A", color: "white", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Apply
        </button>
        {existing && (
          <button type="button" onClick={() => { editor.chain().focus().unsetLink().run(); onClose(); }}
            style={{ background: "none", border: "1px solid rgba(220,38,38,0.25)", borderRadius: 6, padding: "6px 12px", fontSize: 13, color: "#dc2626", cursor: "pointer" }}>
            Remove
          </button>
        )}
        <button type="button" onClick={onClose}
          style={{ background: "none", border: "1px solid #e2e8f0", borderRadius: 6, padding: "6px 12px", fontSize: 13, color: "#64748b", cursor: "pointer" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ── Image dialog ────────────────────────────────────── */
function ImageDialog({ editor, onClose }) {
  const [tab, setTab]         = useState("upload"); // "upload" | "url"
  const [url, setUrl]         = useState("");
  const [alt, setAlt]         = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState("");
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  function insert(src) {
    if (!src) return;
    editor.chain().focus().setImage({ src, alt: alt.trim() || undefined }).run();
    onClose();
  }

  async function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) {
      setUploadErr("Please select an image file.");
      return;
    }
    setUploadErr("");
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const supabase = createClient();
      const ext      = file.name.split(".").pop();
      const path     = `articles/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage
        .from("article-images")
        .upload(path, file, { cacheControl: "31536000", upsert: false });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage
        .from("article-images")
        .getPublicUrl(path);
      insert(publicUrl);
    } catch (err) {
      setUploadErr(err.message || "Upload failed. Make sure the article-images bucket exists.");
      setUploading(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  const tabStyle = (t) => ({
    padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
    background: tab === t ? "#E8601A" : "transparent",
    color: tab === t ? "white" : "#64748b",
  });

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "white", borderRadius: 12, padding: "22px 24px",
        width: 420, boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", margin: 0 }}>Insert Image</p>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, background: "#f1f5f9", borderRadius: 8, padding: 4, marginBottom: 16 }}>
          <button type="button" style={tabStyle("upload")} onClick={() => setTab("upload")}>Upload File</button>
          <button type="button" style={tabStyle("url")}    onClick={() => setTab("url")}>From URL</button>
        </div>

        {tab === "upload" && (
          <>
            {/* Drop zone */}
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              style={{
                border: "2px dashed #e2e8f0", borderRadius: 8,
                padding: "28px 20px", textAlign: "center",
                cursor: uploading ? "default" : "pointer",
                background: preview ? "#fef9f6" : "#fafafa",
                marginBottom: 14, transition: "border-color 0.15s",
              }}
              onMouseEnter={e => { if (!uploading) e.currentTarget.style.borderColor = "#E8601A"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; }}
            >
              {preview ? (
                <img src={preview} alt="preview" style={{ maxHeight: 140, maxWidth: "100%", borderRadius: 6, objectFit: "contain" }} />
              ) : (
                <>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 10px" }}>
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
                  </svg>
                  <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>
                    {uploading ? "Uploading…" : "Drop image here or click to browse"}
                  </p>
                  <p style={{ color: "#cbd5e1", fontSize: 11, margin: "4px 0 0" }}>PNG, JPG, GIF, WebP</p>
                </>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={e => { const f = e.target.files[0]; if (f) handleFile(f); }}
            />
            {uploadErr && <p style={{ color: "#dc2626", fontSize: 12, margin: "0 0 12px" }}>{uploadErr}</p>}
          </>
        )}

        {tab === "url" && (
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 6 }}>Image URL</label>
            <input
              autoFocus
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); insert(url.trim()); } }}
              placeholder="https://example.com/image.jpg"
              style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 6, padding: "9px 12px", fontSize: 13, outline: "none", boxSizing: "border-box" }}
            />
          </div>
        )}

        {/* Alt text */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 6 }}>
            Alt Text <span style={{ fontWeight: 400, color: "#94a3b8" }}>(recommended for SEO)</span>
          </label>
          <input
            type="text"
            value={alt}
            onChange={e => setAlt(e.target.value)}
            placeholder="Describe the image…"
            style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 6, padding: "9px 12px", fontSize: 13, outline: "none", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button type="button" onClick={onClose}
            style={{ border: "1px solid #e2e8f0", borderRadius: 6, padding: "8px 16px", fontSize: 13, color: "#64748b", cursor: "pointer", background: "none" }}>
            Cancel
          </button>
          {tab === "url" && (
            <button
              type="button"
              onClick={() => insert(url.trim())}
              disabled={!url.trim()}
              style={{ background: "#E8601A", color: "white", border: "none", borderRadius: 6, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: url.trim() ? "pointer" : "not-allowed", opacity: url.trim() ? 1 : 0.5 }}>
              Insert
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main editor ─────────────────────────────────────── */
export default function RichTextEditor({ value, onChange }) {
  const [showLink,  setShowLink]  = useState(false);
  const [showImage, setShowImage] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Placeholder.configure({ placeholder: "Start writing your article…" }),
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: { class: "rte-content" },
    },
  });

  const isLink = editor?.isActive("link");

  return (
    <>
      {showImage && <ImageDialog editor={editor} onClose={() => setShowImage(false)} />}

      <div style={{ border: "1px solid #e2e8f0", borderRadius: 10, overflow: "visible", background: "white" }}>
        <style>{`
          .rte-content { outline: none; min-height: 320px; padding: 16px 18px; font-size: 14px; color: #0f172a; line-height: 1.75; }
          .rte-content p { margin: 0 0 14px; }
          .rte-content p:last-child { margin-bottom: 0; }
          .rte-content h2 { font-size: 19px; font-weight: 700; color: #0f172a; margin: 28px 0 10px; line-height: 1.3; }
          .rte-content h3 { font-size: 16px; font-weight: 600; color: #0f172a; margin: 20px 0 8px; }
          .rte-content strong { font-weight: 700; }
          .rte-content em { font-style: italic; }
          .rte-content u { text-decoration: underline; }
          .rte-content a { color: #E8601A; text-decoration: underline; cursor: pointer; }
          .rte-content a:hover { opacity: 0.8; }
          .rte-content ul, .rte-content ol { padding-left: 22px; margin: 0 0 14px; }
          .rte-content li { margin-bottom: 5px; }
          .rte-content blockquote { border-left: 3px solid #E8601A; padding: 12px 16px; margin: 20px 0; color: #475569; font-style: italic; background: #fef9f6; border-radius: 0 6px 6px 0; }
          .rte-content blockquote p { margin: 0; }
          .rte-content hr { border: none; border-top: 1px solid #e2e8f0; margin: 24px 0; }
          .rte-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0; display: block; }
          .rte-content img.ProseMirror-selectednode { outline: 2px solid #E8601A; border-radius: 8px; }
          .rte-content .is-editor-empty:first-child::before { content: attr(data-placeholder); color: #94a3b8; pointer-events: none; float: left; height: 0; }
        `}</style>

        {/* Toolbar */}
        {editor && (
          <div style={{
            display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2,
            padding: "8px 10px", borderBottom: "1px solid #e2e8f0",
            background: "#fafafa", borderRadius: "10px 10px 0 0",
            position: "relative",
          }}>
            {/* Text style */}
            <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold (⌘B)"><b>B</b></Btn>
            <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic (⌘I)"><em>I</em></Btn>
            <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline (⌘U)"><u>U</u></Btn>

            <Sep />

            {/* Headings */}
            <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">H2</Btn>
            <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">H3</Btn>

            <Sep />

            {/* Lists */}
            <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
            </Btn>
            <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered List">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10H3M3 18h2v-3l-1 1"/></svg>
            </Btn>
            <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
            </Btn>

            <Sep />

            {/* Link */}
            <div style={{ position: "relative" }}>
              <Btn onClick={() => setShowLink(v => !v)} active={isLink || showLink} title="Insert Link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </Btn>
              {showLink && <LinkPopover editor={editor} onClose={() => setShowLink(false)} />}
            </div>

            {/* Image */}
            <Btn onClick={() => setShowImage(true)} active={false} title="Insert Image">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
              </svg>
            </Btn>

            <Sep />

            {/* Undo / Redo */}
            <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo (⌘Z)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
            </Btn>
            <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo (⌘⇧Z)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/></svg>
            </Btn>
          </div>
        )}

        {/* Editor area */}
        <EditorContent editor={editor} />
      </div>
    </>
  );
}
