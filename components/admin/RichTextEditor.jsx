"use client";
import { useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

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

/* ── Main editor ─────────────────────────────────────── */
export default function RichTextEditor({ value, onChange }) {
  const [showLink, setShowLink] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Placeholder.configure({ placeholder: "Start writing your article…" }),
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
  );
}
