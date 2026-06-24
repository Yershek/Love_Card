import { useState, useEffect } from "react";
import { CONFIG, COLORS } from "../config";
import { PageTitle, GlowOrb, Divider } from "./UI";

function ReasonCard({ emoji, text, index }) {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80 + index * 120);
        return () => clearTimeout(t);
    }, [index]);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible
                    ? hovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)"
                    : "translateY(20px)",
                transition: visible
                    ? "opacity 0.55s ease, transform 0.3s ease"
                    : `opacity 0.55s ease ${index * 0.12}s, transform 0.55s ease ${index * 0.12}s`,
                background: hovered
                    ? "rgba(232,121,160,0.06)"
                    : "rgba(255,255,255,0.025)",
                border: `1px solid ${hovered ? COLORS.primary + "44" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 18,
                padding: "22px 24px",
                display: "flex", alignItems: "flex-start", gap: 16,
                cursor: "default",
                boxShadow: hovered ? `0 8px 32px ${COLORS.primary}18` : "none",
            }}
        >
      <span style={{
          fontSize: 32, lineHeight: 1, flexShrink: 0,
          filter: hovered ? "drop-shadow(0 0 8px rgba(232,121,160,0.5))" : "none",
          transition: "filter 0.3s",
      }}>{emoji}</span>
            <p style={{
                fontFamily: "'Cormorant Infant', serif",
                fontSize: "clamp(16px,2vw,18px)",
                color: hovered ? COLORS.text : "rgba(255,255,255,0.65)",
                lineHeight: 1.75, margin: 0,
                letterSpacing: "0.02em",
                fontStyle: "italic",
                transition: "color 0.3s",
            }}>
                {text}
            </p>
        </div>
    );
}

export default function ReasonsPage() {
    return (
        <div style={{
            minHeight: "calc(100vh - 73px)",
            padding: "56px 24px 80px",
            position: "relative",
            display: "flex", flexDirection: "column", alignItems: "center",
        }}>
            <GlowOrb top="0" left="20%" color={COLORS.primaryD} size={350} />
            <GlowOrb bottom="5%" right="10%" color={COLORS.secondary} size={250} />

            <div style={{ maxWidth: 680, width: "100%", position: "relative", zIndex: 1 }}>
                <PageTitle sub="за что я люблю тебя">Причины</PageTitle>

                <div style={{ marginBottom: 40 }}>
                    <Divider symbol="💛" color="#f5c518" />
                </div>

                <p style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: "clamp(20px,3.5vw,26px)",
                    color: "rgba(245,197,24,0.6)",
                    textAlign: "center",
                    marginBottom: 40,
                    letterSpacing: "0.05em",
                }}>
                    Причин бесконечно много, но вот некоторые из них...
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {CONFIG.reasons.map((r, i) => (
                        <ReasonCard key={i} emoji={r.emoji} text={r.text} index={i} />
                    ))}
                </div>

                <div style={{
                    marginTop: 48, textAlign: "center",
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: "clamp(24px,4vw,32px)",
                    background: `linear-gradient(135deg, #f8bbd0, ${COLORS.primary})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}>
                    ...и ещё миллион причин, которые я не могу описать словами ❤️
                </div>
            </div>
        </div>
    );
}
