import { useState, useEffect } from "react";
import { CONFIG, COLORS } from "../config";
import { GlowOrb, Divider, PageTitle } from "./UI";

// Live timer hook
function useTimer(startDate) {
    const [elapsed, setElapsed] = useState(Date.now() - startDate);
    useEffect(() => {
        const t = setInterval(() => setElapsed(Date.now() - startDate), 1000);
        return () => clearInterval(t);
    }, [startDate]);

    const totalSec = Math.floor(elapsed / 1000);
    const days    = Math.floor(totalSec / 86400);
    const hours   = Math.floor((totalSec % 86400) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return { days, hours, minutes, seconds };
}

function TimerBox({ value, label }) {
    return (
        <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            minWidth: 72,
        }}>
            <div style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 14, padding: "14px 18px",
                fontFamily: "'Cormorant Infant', serif",
                fontSize: "clamp(28px,5vw,40px)", fontWeight: 600,
                color: COLORS.primary, lineHeight: 1,
                minWidth: 64, textAlign: "center",
                boxShadow: `0 0 20px ${COLORS.primary}18`,
                letterSpacing: "0.02em",
            }}>
                {String(value).padStart(2, "0")}
            </div>
            <span style={{
                marginTop: 6, fontSize: 11, color: COLORS.textMuted,
                fontFamily: "'Cormorant Infant', serif", letterSpacing: "0.1em",
                textTransform: "uppercase",
            }}>{label}</span>
        </div>
    );
}

export default function HomePage() {
    const [visible, setVisible] = useState(false);
    useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);
    const { days, hours, minutes, seconds } = useTimer(CONFIG.startDate.getTime());

    return (
        <div style={{
            minHeight: "calc(100vh - 73px)", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "60px 24px", textAlign: "center", position: "relative",
        }}>
            <GlowOrb top="8%"  left="10%" color={COLORS.primaryD} size={320} />
            <GlowOrb bottom="10%" right="8%" color={COLORS.secondary} size={260} />

            <div style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
                maxWidth: 700, position: "relative", zIndex: 1,
            }}>
                {/* top ornament */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", marginBottom: 28 }}>
                    <div style={{ height: 1, width: 50, background: `linear-gradient(90deg, transparent, ${COLORS.primary}66)` }} />
                    <span style={{ color: COLORS.primary, fontSize: 18, letterSpacing: 10 }}>✦ ✦ ✦</span>
                    <div style={{ height: 1, width: 50, background: `linear-gradient(90deg, ${COLORS.primary}66, transparent)` }} />
                </div>

                <p style={{
                    fontFamily: "'Great Vibes', cursive", fontSize: "clamp(18px,3.5vw,22px)",
                    color: `${COLORS.primary}99`, letterSpacing: "0.08em", marginBottom: 6,
                }}>для самой особенной</p>

                <h1 style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: "clamp(52px,11vw,92px)",
                    background: `linear-gradient(135deg, #f8bbd0, ${COLORS.primary}, ${COLORS.primaryD}, ${COLORS.secondary})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    lineHeight: 1.1, letterSpacing: "0.02em",
                    filter: `drop-shadow(0 0 28px ${COLORS.primary}44)`,
                    marginBottom: 0,
                }}>
                    Привет, {CONFIG.name}
                </h1>

                <div style={{ margin: "20px 0 36px" }}>
                    <Divider symbol="♥" color={COLORS.secondary} />
                </div>

                <p style={{
                    fontFamily: "'Cormorant Infant', serif",
                    fontSize: "clamp(17px,2.4vw,21px)",
                    color: COLORS.text, lineHeight: 1.9,
                    letterSpacing: "0.025em", fontStyle: "italic",
                    maxWidth: 560, margin: "0 auto 52px",
                }}>
                    «{CONFIG.loveMessage}»
                </p>

                {/* ── Timer ── */}
                <div style={{ marginBottom: 48 }}>
                    <p style={{
                        fontFamily: "'Great Vibes', cursive", fontSize: "clamp(20px,3.5vw,26px)",
                        color: `${COLORS.secondary}bb`, marginBottom: 20, letterSpacing: "0.05em",
                    }}>
                        Мы вместе уже
                    </p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <TimerBox value={days}    label="дней"    />
                        <div style={{ display:"flex", alignItems:"center", paddingBottom:24, color:`${COLORS.primary}66`, fontSize:28 }}>:</div>
                        <TimerBox value={hours}   label="часов"   />
                        <div style={{ display:"flex", alignItems:"center", paddingBottom:24, color:`${COLORS.primary}66`, fontSize:28 }}>:</div>
                        <TimerBox value={minutes} label="минут"   />
                        <div style={{ display:"flex", alignItems:"center", paddingBottom:24, color:`${COLORS.primary}66`, fontSize:28 }}>:</div>
                        <TimerBox value={seconds} label="секунд"  />
                    </div>
                </div>

                <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${COLORS.border}, transparent)`, marginBottom: 28 }} />

                <p style={{
                    fontFamily: "'Cormorant Infant', serif", fontStyle: "italic",
                    color: COLORS.textMuted, fontSize: 15, letterSpacing: "0.05em",
                }}>
                    каждая секунда — это подарок рядом с тобой
                </p>
            </div>
        </div>
    );
}
