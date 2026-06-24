import { useState, useCallback } from "react";
import { COLORS } from "../config";
import { PageTitle, GlowOrb, PrimaryBtn, GhostBtn } from "./UI";

const MONTHS    = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const DAYS_SHORT = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

export const MARK_TYPES = [
    { id: "heart", emoji: "", label: "Любовь",      color: "#e879a0" },
    { id: "star",  emoji: "", label: "Особый день", color: "#f5c518" },
    { id: "note",  emoji: "", label: "Заметка",     color: "#7ec8e3" },
    { id: "smile", emoji: "", label: "Радость",     color: "#a8e6a3" },
    { id: "date",  emoji: "", label: "Свидание",    color: "#d4a0ff" },
];

function loadMarks() {
    try { return JSON.parse(localStorage.getItem("loveCalendarMarks") || "{}"); }
    catch { return {}; }
}

export default function CalendarPage() {
    const today = new Date();
    const [year, setYear]       = useState(today.getFullYear());
    const [month, setMonth]     = useState(today.getMonth());
    const [marks, setMarks]     = useState(loadMarks);
    const [selected, setSelected] = useState(null);
    const [activeMark, setActiveMark] = useState("heart");
    const [noteText, setNoteText]     = useState("");
    const [showModal, setShowModal]   = useState(false);

    const saveMarks = useCallback(m => {
        setMarks(m);
        try { localStorage.setItem("loveCalendarMarks", JSON.stringify(m)); } catch {}
    }, []);

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay    = (() => { const d = new Date(year, month, 1).getDay(); return d === 0 ? 6 : d - 1; })();
    const cells       = Array.from({ length: firstDay + daysInMonth }, (_, i) => i < firstDay ? null : i - firstDay + 1);

    const dateKey  = d => `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const isToday  = d => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    const openModal = d => {
        const key = dateKey(d);
        setSelected({ d, key });
        setNoteText(marks[key]?.note || "");
        setActiveMark(marks[key]?.type || "heart");
        setShowModal(true);
    };

    const applyMark = () => {
        const nm = { ...marks };
        nm[selected.key] = { type: activeMark, note: noteText };
        saveMarks(nm);
        setShowModal(false);
    };

    const removeMark = () => {
        const nm = { ...marks };
        delete nm[selected.key];
        saveMarks(nm);
        setShowModal(false);
    };

    const prev = () => { if (month === 0) { setMonth(11); setYear(y=>y-1); } else setMonth(m=>m-1); };
    const next = () => { if (month === 11) { setMonth(0); setYear(y=>y+1); } else setMonth(m=>m+1); };

    // Count marks summary
    const monthMarks = Object.entries(marks).filter(([k]) => k.startsWith(`${year}-${String(month+1).padStart(2,"0")}`));

    return (
        <div style={{
            minHeight: "calc(100vh - 73px)",
            padding: "56px 24px 80px",
            display: "flex", flexDirection: "column", alignItems: "center",
            position: "relative",
        }}>
            <GlowOrb top="5%" left="5%"  color={COLORS.primaryD}  size={280} />
            <GlowOrb bottom="5%" right="5%" color={COLORS.secondary} size={220} />

            <div style={{ maxWidth: 640, width: "100%", position: "relative", zIndex: 1 }}>
                <PageTitle sub="особые моменты">Наш Календарь</PageTitle>

                {/* Mark type selector */}
                <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
                    {MARK_TYPES.map(mt => (
                        <button key={mt.id} onClick={() => setActiveMark(mt.id)} style={{
                            padding: "8px 16px", borderRadius: 999,
                            border: `1px solid ${activeMark === mt.id ? mt.color : "rgba(255,255,255,0.1)"}`,
                            background: activeMark === mt.id ? `${mt.color}20` : "rgba(255,255,255,0.03)",
                            color: activeMark === mt.id ? mt.color : COLORS.textMuted,
                            cursor: "pointer", fontSize: 13,
                            fontFamily: "'Cormorant Infant', serif",
                            display: "flex", alignItems: "center", gap: 6,
                            transition: "all 0.2s",
                        }}>
                            {mt.emoji} {mt.label}
                        </button>
                    ))}
                </div>

                {/* Calendar card */}
                <div style={{
                    background: COLORS.bgCard,
                    border: `1px solid rgba(255,255,255,0.07)`,
                    borderRadius: 22, padding: "28px 20px",
                    boxShadow: "0 4px 48px rgba(0,0,0,0.35)",
                }}>
                    {/* Month nav */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                        <button onClick={prev} style={{
                            background: "rgba(255,255,255,0.05)", border: "none",
                            borderRadius: 10, width: 38, height: 38,
                            color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 20,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "background 0.2s",
                        }}>‹</button>
                        <h3 style={{
                            fontFamily: "'Cormorant Infant', serif", fontSize: 22,
                            color: "#fff", fontWeight: 500, letterSpacing: "0.06em", margin: 0,
                        }}>{MONTHS[month]} {year}</h3>
                        <button onClick={next} style={{
                            background: "rgba(255,255,255,0.05)", border: "none",
                            borderRadius: 10, width: 38, height: 38,
                            color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 20,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "background 0.2s",
                        }}>›</button>
                    </div>

                    {/* Day headers */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
                        {DAYS_SHORT.map(d => (
                            <div key={d} style={{
                                textAlign: "center", fontSize: 11,
                                color: COLORS.textMuted,
                                fontFamily: "'Cormorant Infant', serif",
                                letterSpacing: "0.05em", padding: "4px 0",
                            }}>{d}</div>
                        ))}
                    </div>

                    {/* Days */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                        {cells.map((d, i) => {
                            if (!d) return <div key={`e${i}`} />;
                            const key     = dateKey(d);
                            const mark    = marks[key];
                            const mt      = mark ? MARK_TYPES.find(m => m.id === mark.type) : null;
                            const tod     = isToday(d);

                            return (
                                <button key={key} onClick={() => openModal(d)} style={{
                                    aspectRatio: "1", borderRadius: 12,
                                    display: "flex", flexDirection: "column",
                                    alignItems: "center", justifyContent: "center",
                                    gap: 2, cursor: "pointer",
                                    background: tod
                                        ? "linear-gradient(135deg, rgba(194,24,91,0.4), rgba(232,121,160,0.2))"
                                        : mark ? `${mt.color}18` : "rgba(255,255,255,0.03)",
                                    border: tod
                                        ? `1px solid ${COLORS.primary}66`
                                        : mark ? `1px solid ${mt.color}44` : "1px solid transparent",
                                    boxShadow: tod ? `0 0 14px ${COLORS.primary}28` : "none",
                                    transition: "all 0.18s ease",
                                }}>
                  <span style={{
                      fontSize: 13,
                      fontFamily: "'Cormorant Infant', serif",
                      color: tod ? COLORS.primary : mark ? mt.color : "rgba(255,255,255,0.6)",
                      fontWeight: tod ? 700 : 400, lineHeight: 1,
                  }}>{d}</span>
                                    {mark && <span style={{ fontSize: 10, lineHeight: 1 }}>{mt.emoji}</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Month summary */}
                {monthMarks.length > 0 && (
                    <div style={{
                        marginTop: 20,
                        background: COLORS.bgCard,
                        border: `1px solid rgba(255,255,255,0.06)`,
                        borderRadius: 16, padding: "18px 22px",
                    }}>
                        <p style={{
                            fontFamily: "'Cormorant Infant', serif",
                            color: COLORS.textMuted, fontSize: 13,
                            letterSpacing: "0.06em", textTransform: "uppercase",
                            marginBottom: 12,
                        }}>Отметки в этом месяце</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {monthMarks.map(([key, val]) => {
                                const mt = MARK_TYPES.find(m => m.id === val.type);
                                const day = key.split("-")[2];
                                return (
                                    <div key={key} style={{
                                        padding: "5px 12px", borderRadius: 999,
                                        background: `${mt.color}18`,
                                        border: `1px solid ${mt.color}33`,
                                        display: "flex", alignItems: "center", gap: 6,
                                        fontSize: 13, fontFamily: "'Cormorant Infant', serif",
                                        color: mt.color,
                                    }}>
                                        {mt.emoji} {day} {val.note ? `— ${val.note.slice(0, 20)}${val.note.length > 20 ? "…" : ""}` : mt.label}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <p style={{
                    marginTop: 16, textAlign: "center",
                    fontFamily: "'Cormorant Infant', serif",
                    color: COLORS.textMuted, fontSize: 13, fontStyle: "italic",
                }}>нажми на любой день чтобы отметить</p>
            </div>

            {/* Modal */}
            {showModal && selected && (
                <div
                    onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
                    style={{
                        position: "fixed", inset: 0, zIndex: 200,
                        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)",
                        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
                    }}
                >
                    <div style={{
                        background: "#120d1e",
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 20, padding: 32, maxWidth: 360, width: "100%",
                        boxShadow: "0 20px 80px rgba(0,0,0,0.6)",
                    }}>
                        <h3 style={{
                            fontFamily: "'Great Vibes', cursive", fontSize: 34,
                            color: COLORS.primary, margin: "0 0 22px", textAlign: "center",
                        }}>
                            {String(selected.d).padStart(2,"0")} {MONTHS[month]}
                        </h3>

                        <p style={{ fontFamily:"'Cormorant Infant', serif", color: COLORS.textMuted, fontSize: 12, marginBottom: 10, letterSpacing:"0.06em", textTransform:"uppercase" }}>
                            Тип отметки
                        </p>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                            {MARK_TYPES.map(mt => (
                                <button key={mt.id} onClick={() => setActiveMark(mt.id)} style={{
                                    padding: "6px 12px", borderRadius: 999,
                                    border: `1px solid ${activeMark === mt.id ? mt.color : "rgba(255,255,255,0.1)"}`,
                                    background: activeMark === mt.id ? `${mt.color}22` : "transparent",
                                    color: activeMark === mt.id ? mt.color : COLORS.textMuted,
                                    fontSize: 12, fontFamily: "'Cormorant Infant', serif",
                                    cursor: "pointer", transition: "all 0.15s",
                                }}>
                                    {mt.emoji} {mt.label}
                                </button>
                            ))}
                        </div>

                        <p style={{ fontFamily:"'Cormorant Infant', serif", color: COLORS.textMuted, fontSize: 12, marginBottom: 8, letterSpacing:"0.06em", textTransform:"uppercase" }}>
                            Заметка
                        </p>
                        <textarea
                            value={noteText}
                            onChange={e => setNoteText(e.target.value)}
                            placeholder="Что особенного в этот день?"
                            rows={3}
                            style={{
                                width: "100%", padding: "10px 14px", borderRadius: 12,
                                border: "1px solid rgba(255,255,255,0.1)",
                                background: "rgba(255,255,255,0.04)",
                                color: COLORS.text, fontFamily: "'Cormorant Infant', serif",
                                fontSize: 15, resize: "vertical", outline: "none",
                                boxSizing: "border-box", lineHeight: 1.6,
                            }}
                        />

                        <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                            <PrimaryBtn onClick={applyMark} style={{ flex: 1 }}>Отметить</PrimaryBtn>
                            {marks[selected.key] && (
                                <GhostBtn onClick={removeMark}>Убрать</GhostBtn>
                            )}
                            <GhostBtn onClick={() => setShowModal(false)}>✕</GhostBtn>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}