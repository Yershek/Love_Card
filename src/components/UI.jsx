import { COLORS } from "../config";

// ─── Glow orb decoration ─────────────────────────────────────────────────────
export function GlowOrb({ top, left, bottom, right, color = COLORS.primaryD, size = 300 }) {
    return (
        <div style={{
            position: "absolute", top, left, bottom, right,
            width: size, height: size,
            background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
            borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none",
        }} />
    );
}

// ─── Divider with optional symbol ────────────────────────────────────────────
export function Divider({ symbol = "♥", color = COLORS.secondary }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center" }}>
            <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, transparent, ${color}44)` }} />
            <span style={{ color: `${color}88`, fontSize: 16 }}>{symbol}</span>
            <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, ${color}44, transparent)` }} />
        </div>
    );
}

// ─── Section title in Great Vibes ────────────────────────────────────────────
export function PageTitle({ children, sub }) {
    return (
        <div style={{ textAlign: "center", marginBottom: 32 }}>
            {sub && (
                <p style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: "clamp(16px,3vw,20px)",
                    color: `${COLORS.primary}88`,
                    letterSpacing: "0.08em", marginBottom: 4,
                }}>{sub}</p>
            )}
            <h2 style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(38px,7vw,56px)",
                background: `linear-gradient(135deg, #f8bbd0, ${COLORS.primary}, ${COLORS.secondary})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                lineHeight: 1.15, margin: 0,
            }}>{children}</h2>
        </div>
    );
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────
export function Card({ children, style = {} }) {
    return (
        <div style={{
            background: COLORS.bgCard,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 20, padding: "36px 32px",
            boxShadow: "0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
            position: "relative", overflow: "hidden",
            ...style,
        }}>
            {/* top glow line */}
            <div style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: 200, height: 1,
                background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`,
            }} />
            {children}
        </div>
    );
}

// ─── Primary button ───────────────────────────────────────────────────────────
export function PrimaryBtn({ children, onClick, disabled, style = {} }) {
    return (
        <button onClick={onClick} disabled={disabled} style={{
            padding: "12px 28px", borderRadius: 12, border: "none", cursor: disabled ? "not-allowed" : "pointer",
            background: disabled
                ? "rgba(255,255,255,0.08)"
                : `linear-gradient(135deg, ${COLORS.primaryD}, ${COLORS.primary})`,
            color: disabled ? COLORS.textMuted : "#fff",
            fontFamily: "'Cormorant Infant', serif", fontSize: 16, fontWeight: 600,
            letterSpacing: "0.03em", transition: "all 0.2s",
            boxShadow: disabled ? "none" : `0 4px 20px ${COLORS.primary}44`,
            ...style,
        }}>{children}</button>
    );
}

// ─── Ghost button ─────────────────────────────────────────────────────────────
export function GhostBtn({ children, onClick, style = {} }) {
    return (
        <button onClick={onClick} style={{
            padding: "10px 20px", borderRadius: 12, cursor: "pointer",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            color: COLORS.textMuted,
            fontFamily: "'Cormorant Infant', serif", fontSize: 15,
            transition: "all 0.2s", ...style,
        }}>{children}</button>
    );
}

// ─── Tab navigation ───────────────────────────────────────────────────────────
const TABS = [
    { id: "home",     label: "Главная"   },
    { id: "sorry",    label: "Извинения" },
    { id: "reasons",  label: "Причины"   },
    { id: "gallery",  label: "Моменты"   },
    { id: "calendar", label: "Календарь" },
    { id: "letter",   label: "Письмо"    },
];

export function TabBar({ active, onChange }) {
    return (
        <nav style={{
            display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap",
            padding: "14px 20px", position: "sticky", top: 0, zIndex: 100,
            background: "rgba(10,8,18,0.88)", backdropFilter: "blur(18px)",
            borderBottom: `1px solid ${COLORS.border}`,
        }}>
            {TABS.map(t => (
                <button key={t.id} onClick={() => onChange(t.id)} style={{
                    padding: "9px 18px", borderRadius: 999, border: "none",
                    cursor: "pointer", fontSize: 13,
                    fontFamily: "'Cormorant Infant', serif", fontWeight: 500, letterSpacing: "0.04em",
                    transition: "all 0.22s ease",
                    background: active === t.id
                        ? `linear-gradient(135deg, ${COLORS.primaryD}, ${COLORS.primary})`
                        : "rgba(255,255,255,0.05)",
                    color: active === t.id ? "#fff" : COLORS.textMuted,
                    boxShadow: active === t.id ? `0 0 18px ${COLORS.primary}44` : "none",
                }}>{t.label}</button>
            ))}
        </nav>
    );
}

// ─── Rare floating particles (subtle) ────────────────────────────────────────
export function FloatingParticles() {
    const particles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: 10 + i * 16,
        delay: i * 3.5,
        dur: 18 + i * 4,
        size: 8 + i * 2,
    }));

    return (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
            {particles.map(p => (
                <div key={p.id} style={{
                    position: "absolute",
                    left: `${p.x}%`,
                    bottom: "-30px",
                    fontSize: p.size,
                    opacity: 0.12,
                    animation: `floatUp ${p.dur}s ${p.delay}s ease-in-out infinite`,
                }}>✦</div>
            ))}
        </div>
    );
}