"use client";
import React from "react";

const BLOCK_TYPES = [
  { value: "p", label: "Paragraph" },
  { value: "h2", label: "Heading" },
  { value: "blockquote", label: "Quote" },
  { value: "ul", label: "Bullet List" },
  { value: "ol", label: "Numbered List" },
];

const inputStyle = {
  width: "100%", border: "1px solid #e2e8f0", borderRadius: 8,
  padding: "10px 14px", fontSize: 14, color: "#0f172a",
  outline: "none", background: "white", boxSizing: "border-box",
  resize: "vertical", fontFamily: "inherit",
};

function BlockWrapper({ typeLabel, children, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) {
  const btnBase = {
    background: "none", border: "1px solid #e2e8f0", borderRadius: 4,
    padding: "2px 7px", cursor: "pointer", color: "#94a3b8", fontSize: 12,
  };
  return (
    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 16, marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {typeLabel}
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          <button type="button" onClick={onMoveUp} disabled={isFirst} style={{ ...btnBase, opacity: isFirst ? 0.3 : 1 }}>↑</button>
          <button type="button" onClick={onMoveDown} disabled={isLast} style={{ ...btnBase, opacity: isLast ? 0.3 : 1 }}>↓</button>
          <button type="button" onClick={onRemove} style={{ ...btnBase, borderColor: "rgba(220,38,38,0.25)", color: "#dc2626", fontWeight: 700, fontSize: 14 }}>×</button>
        </div>
      </div>
      {children}
    </div>
  );
}

function TextBlock({ block, onChange, ...rest }) {
  const typeLabel = BLOCK_TYPES.find(t => t.value === block.type)?.label;
  const placeholder = block.type === "h2" ? "Heading text…" : block.type === "blockquote" ? "Quote text…" : "Paragraph text…";
  return (
    <BlockWrapper typeLabel={typeLabel} {...rest}>
      <textarea
        value={block.text}
        onChange={e => onChange({ ...block, text: e.target.value })}
        rows={block.type === "h2" ? 1 : 3}
        placeholder={placeholder}
        style={{ ...inputStyle, fontWeight: block.type === "h2" ? 700 : 400, fontSize: block.type === "h2" ? 15 : 14 }}
      />
    </BlockWrapper>
  );
}

function ListBlock({ block, onChange, ...rest }) {
  const typeLabel = BLOCK_TYPES.find(t => t.value === block.type)?.label;

  function updateItem(i, val) {
    const items = [...block.items];
    items[i] = val;
    onChange({ ...block, items });
  }
  function addItem() { onChange({ ...block, items: [...block.items, ""] }); }
  function removeItem(i) {
    if (block.items.length === 1) return;
    onChange({ ...block, items: block.items.filter((_, idx) => idx !== i) });
  }

  return (
    <BlockWrapper typeLabel={typeLabel} {...rest}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {block.items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <span style={{ color: "#E8601A", fontSize: 13, fontWeight: 700, marginTop: 10, minWidth: 22, textAlign: "right" }}>
              {block.type === "ol" ? `${i + 1}.` : "•"}
            </span>
            <textarea
              value={item}
              onChange={e => updateItem(i, e.target.value)}
              rows={2}
              placeholder={`Item ${i + 1}…`}
              style={{ ...inputStyle, flex: 1 }}
            />
            {block.items.length > 1 && (
              <button type="button" onClick={() => removeItem(i)}
                style={{ color: "#dc2626", background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: "6px 2px", lineHeight: 1 }}>
                ×
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addItem} style={{
          background: "none", border: "1px dashed #cbd5e1", borderRadius: 6,
          padding: "6px 12px", cursor: "pointer", fontSize: 13, color: "#64748b",
        }}>
          + Add item
        </button>
      </div>
    </BlockWrapper>
  );
}

export default function BlockEditor({ blocks, onChange }) {
  function addBlock(type) {
    const block = ["ul", "ol"].includes(type) ? { type, items: [""] } : { type, text: "" };
    onChange([...blocks, block]);
  }
  function updateBlock(i, updated) {
    const next = [...blocks];
    next[i] = updated;
    onChange(next);
  }
  function removeBlock(i) { onChange(blocks.filter((_, idx) => idx !== i)); }
  function moveBlock(i, dir) {
    const t = i + dir;
    if (t < 0 || t >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[t]] = [next[t], next[i]];
    onChange(next);
  }

  const sharedProps = (i) => ({
    onChange: (u) => updateBlock(i, u),
    onRemove: () => removeBlock(i),
    onMoveUp: () => moveBlock(i, -1),
    onMoveDown: () => moveBlock(i, 1),
    isFirst: i === 0,
    isLast: i === blocks.length - 1,
  });

  return (
    <div>
      {blocks.length === 0 && (
        <div style={{
          border: "2px dashed #e2e8f0", borderRadius: 10, padding: "32px 24px",
          textAlign: "center", color: "#94a3b8", fontSize: 14, marginBottom: 12,
        }}>
          No content blocks yet. Use the buttons below to add content.
        </div>
      )}

      {blocks.map((block, i) =>
        ["ul", "ol"].includes(block.type)
          ? <ListBlock key={i} block={block} {...sharedProps(i)} />
          : <TextBlock key={i} block={block} {...sharedProps(i)} />
      )}

      <div style={{
        display: "flex", gap: 8, flexWrap: "wrap",
        padding: "14px 16px", background: "#f1f5f9",
        borderRadius: 10, border: "1px solid #e2e8f0",
      }}>
        <p style={{ fontSize: 11, color: "#94a3b8", width: "100%", margin: "0 0 6px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Add block
        </p>
        {BLOCK_TYPES.map(({ value, label }) => (
          <button key={value} type="button" onClick={() => addBlock(value)} style={{
            background: "white", border: "1px solid #e2e8f0", borderRadius: 6,
            padding: "6px 14px", cursor: "pointer", fontSize: 13, color: "#475569", fontWeight: 500,
          }}>
            + {label}
          </button>
        ))}
      </div>
    </div>
  );
}
