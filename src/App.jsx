import { useState } from "react";

const BASE_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function App() {
  const [data, setData] = useState(BASE_DATA);
  const [isDoubled, setIsDoubled] = useState(false);
  const [animatingIdx, setAnimatingIdx] = useState(null);
  const [justReset, setJustReset] = useState(false);

  const displayData = isDoubled ? data.map((n) => n * 2) : data;

  const handleAdd = () => {
    const last = data.length ? data[data.length - 1] : 0;
    const newData = [...data, last + 1];
    setData(newData);
    setAnimatingIdx(newData.length - 1);
    setTimeout(() => setAnimatingIdx(null), 400);
  };

  const handleToggle = () => setIsDoubled((p) => !p);

  const handleReset = () => {
    setJustReset(true);
    setData(BASE_DATA);
    setIsDoubled(false);
    setTimeout(() => setJustReset(false), 500);
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <p style={styles.eyebrow}>Data Visualizer</p>
            <h1 style={styles.title}>Interactive Array</h1>
          </div>
          <div style={styles.badge}>
            <span style={styles.dot} />
            <span style={styles.badgeText}>{displayData.length} items</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={styles.main}>
        {/* Controls */}
        <div style={styles.controls}>
          <button
            style={{ ...styles.btn, ...styles.btnAdd }}
            onClick={handleAdd}
          >
            <span style={styles.btnIcon}>+</span>
            <span>Tambah</span>
          </button>
          <button
            style={{
              ...styles.btn,
              ...(isDoubled ? styles.btnToggleActive : styles.btnToggle),
            }}
            onClick={handleToggle}
          >
            <span style={styles.btnIcon}>×2</span>
            <span>{isDoubled ? "Batal" : "Kali 2"}</span>
          </button>
          <button
            style={{ ...styles.btn, ...styles.btnReset }}
            onClick={handleReset}
          >
            <span style={styles.btnIcon}>↺</span>
            <span>Reset</span>
          </button>
        </div>

        {/* Status strip */}
        <div style={styles.statusStrip}>
          <span style={styles.statusText}>
            {isDoubled
              ? "Mode ×2 aktif — semua nilai dikalikan 2"
              : "Menampilkan nilai asli"}
          </span>
          {isDoubled && <span style={styles.statusPill}>×2</span>}
        </div>

        {/* Grid */}
        <div style={{ ...styles.grid, ...(justReset ? styles.gridReset : {}) }}>
          {displayData.map((num, idx) => (
            <div
              key={idx}
              style={{
                ...styles.card,
                ...(idx === animatingIdx ? styles.cardNew : {}),
              }}
            >
              <span style={styles.cardIndex}>{idx + 1}</span>
              <span style={styles.cardValue}>{num}</span>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div style={styles.footer}>
          <div style={styles.footerStat}>
            <span style={styles.footerLabel}>Total</span>
            <span style={styles.footerValue}>
              {displayData.reduce((a, b) => a + b, 0)}
            </span>
          </div>
          <div style={styles.footerDivider} />
          <div style={styles.footerStat}>
            <span style={styles.footerLabel}>Rata-rata</span>
            <span style={styles.footerValue}>
              {(
                displayData.reduce((a, b) => a + b, 0) / displayData.length
              ).toFixed(1)}
            </span>
          </div>
          <div style={styles.footerDivider} />
          <div style={styles.footerStat}>
            <span style={styles.footerLabel}>Maks</span>
            <span style={styles.footerValue}>{Math.max(...displayData)}</span>
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0a;
          min-height: 100vh;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(12px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          70%  { box-shadow: 0 0 0 10px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }

        @keyframes resetFlash {
          0%   { opacity: 0.4; }
          100% { opacity: 1; }
        }

        .card-new { animation: slideIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards, pulse 0.6s ease 0.1s; }
        .grid-reset .card-item { animation: fadeIn 0.3s ease forwards; }
        .grid-reset .card-item:nth-child(1)  { animation-delay: 0ms; }
        .grid-reset .card-item:nth-child(2)  { animation-delay: 30ms; }
        .grid-reset .card-item:nth-child(3)  { animation-delay: 60ms; }
        .grid-reset .card-item:nth-child(4)  { animation-delay: 90ms; }
        .grid-reset .card-item:nth-child(5)  { animation-delay: 120ms; }
        .grid-reset .card-item:nth-child(6)  { animation-delay: 150ms; }
        .grid-reset .card-item:nth-child(7)  { animation-delay: 180ms; }
        .grid-reset .card-item:nth-child(8)  { animation-delay: 210ms; }
        .grid-reset .card-item:nth-child(9)  { animation-delay: 240ms; }

        .btn-hover:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-hover:active { transform: scale(0.97); }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
  },
  header: {
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    background: "rgba(255,255,255,0.02)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    padding: "20px 20px",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  headerInner: {
    maxWidth: 640,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.35)",
    marginBottom: 4,
  },
  title: {
    fontSize: "clamp(20px, 5vw, 26px)",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    color: "#fff",
    lineHeight: 1.1,
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 100,
    padding: "6px 12px",
    flexShrink: 0,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow: "0 0 6px #22c55e",
  },
  badgeText: {
    fontSize: 13,
    fontWeight: 500,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "'DM Mono', monospace",
  },
  main: {
    maxWidth: 640,
    margin: "0 auto",
    padding: "24px 16px 48px",
  },
  controls: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
    marginBottom: 14,
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "12px 8px",
    borderRadius: 12,
    border: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "clamp(13px, 3.5vw, 15px)",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s ease",
    minHeight: 48,
    WebkitTapHighlightColor: "transparent",
  },
  btnAdd: {
    background: "#22c55e",
    color: "#052e16",
  },
  btnToggle: {
    background: "rgba(255,255,255,0.07)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  btnToggleActive: {
    background: "#3b82f6",
    color: "#fff",
  },
  btnReset: {
    background: "rgba(239,68,68,0.12)",
    color: "#f87171",
    border: "1px solid rgba(239,68,68,0.2)",
  },
  btnIcon: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1,
  },
  statusStrip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 14px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 10,
    marginBottom: 16,
    gap: 8,
  },
  statusText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    letterSpacing: "0.01em",
  },
  statusPill: {
    fontSize: 11,
    fontWeight: 700,
    fontFamily: "'DM Mono', monospace",
    background: "#3b82f6",
    color: "#fff",
    padding: "2px 8px",
    borderRadius: 100,
    flexShrink: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(min(72px, 100%), 1fr))",
    gap: 10,
    marginBottom: 20,
  },
  card: {
    position: "relative",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: "16px 8px 12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    cursor: "default",
    transition: "background 0.2s, border-color 0.2s, transform 0.2s",
    minHeight: 72,
  },
  cardNew: {
    borderColor: "rgba(34,197,94,0.4)",
    background: "rgba(34,197,94,0.07)",
  },
  cardIndex: {
    fontSize: 10,
    fontWeight: 500,
    fontFamily: "'DM Mono', monospace",
    color: "rgba(255,255,255,0.22)",
    letterSpacing: "0.05em",
    lineHeight: 1,
  },
  cardValue: {
    fontSize: "clamp(18px, 4vw, 22px)",
    fontWeight: 600,
    fontFamily: "'DM Mono', monospace",
    color: "#fff",
    lineHeight: 1,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 14,
    padding: "16px 20px",
  },
  footerStat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  footerLabel: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)",
  },
  footerValue: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: "'DM Mono', monospace",
    color: "#fff",
    letterSpacing: "-0.02em",
  },
  footerDivider: {
    width: 1,
    height: 32,
    background: "rgba(255,255,255,0.08)",
  },
};
