import { useState, useEffect } from "react";
import { COLORS, CONFIG } from "../config";
import { messagesApi } from "../api";
import { PageTitle, Card, PrimaryBtn, GhostBtn, GlowOrb, Divider } from "./UI";

const MOODS = [
    { id: "love",   emoji: "", label: "Любовь"    },
    { id: "miss",   emoji: "", label: "Скучаю"    },
    { id: "angry",  emoji: "", label: "Обида"     },
    { id: "happy",  emoji: "", label: "Счастье"   },
    { id: "sorry",  emoji: "", label: "Прощение"  },
    { id: "secret", emoji: "", label: "Секрет"    },
];

function MessageCard({ msg, index }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), index * 100);
        return () => clearTimeout(t);
    }, [index]);

    const mood = MOODS.find(m => m.id === msg.mood) || MOODS[0];
    const date = new Date(msg.createdAt);
    const dateStr = date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });

    return (
        <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: `all 0.5s ease ${index * 0.08}s`,
            background: "rgba(255,255,255,0.025)",
            border: `1px solid rgba(255,255,255,0.07)`,
            borderRadius: 16, padding: "20px 22px",
            position: "relative",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{
            fontSize: 22,
            background: `${COLORS.primary}22`,
            border: `1px solid ${COLORS.primary}44`,
            borderRadius: 10, padding: "4px 10px",
        }}>{mood.emoji}</span>
                <span style={{
                    fontFamily: "'Cormorant Infant', serif",
                    color: COLORS.primary, fontSize: 14,
                    fontStyle: "italic",
                }}>{mood.label}</span>
                <span style={{
                    marginLeft: "auto",
                    fontFamily: "'Cormorant Infant', serif",
                    color: COLORS.textMuted, fontSize: 13,
                }}>{dateStr}</span>
            </div>
            <p style={{
                fontFamily: "'Cormorant Infant', serif",
                fontSize: "clamp(15px,2vw,17px)",
                color: COLORS.text, lineHeight: 1.8,
                margin: 0, fontStyle: "italic",
                whiteSpace: "pre-wrap",
            }}>{msg.text}</p>
        </div>
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function LetterPage() {
    const [text, setText]       = useState("");
    const [mood, setMood]       = useState("love");
    const [sending, setSending] = useState(false);
    const [sent, setSent]       = useState(false);
    const [error, setError]     = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingMsgs, setLoadingMsgs] = useState(true);
    const [showInbox, setShowInbox] = useState(false);

    useEffect(() => {
        messagesApi.getAll()
            .then(setMessages)
            .catch(() => {})
            .finally(() => setLoadingMsgs(false));
    }, []);

    const send = async () => {
        if (!text.trim()) return;
        setSending(true); setError(null);
        try {
            const msg = await messagesApi.send(text.trim(), mood);
            setMessages(prev => [msg, ...prev]);
            setText(""); setSent(true);
            setTimeout(() => setSent(false), 3500);
        } catch {
            setError("Не удалось отправить. Убедись что бэкенд запущен.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div style={{
            minHeight: "calc(100vh - 73px)",
            padding: "56px 24px 80px",
            display: "flex", flexDirection: "column", alignItems: "center",
            position: "relative",
        }}>
            <GlowOrb top="5%" right="10%" color={COLORS.secondary} size={300} />
            <GlowOrb bottom="10%" left="5%" color={COLORS.primaryD}  size={240} />

            <div style={{ maxWidth: 640, width: "100%", position: "relative", zIndex: 1 }}>
                <PageTitle sub={`напиши мне, ${CONFIG.name}`}>Твоё Письмо</PageTitle>

                <div style={{ marginBottom: 36 }}>
                    <Divider symbol="" color={COLORS.secondary} />
                </div>

                <Card>
                    <p style={{
                        fontFamily: "'Great Vibes', cursive",
                        fontSize: "clamp(18px,3vw,22px)",
                        color: `${COLORS.secondary}99`,
                        textAlign: "center", marginBottom: 28, letterSpacing: "0.05em",
                    }}>
                        Напиши что чувствуешь — я прочитаю
                    </p>

                    {/* Mood selector */}
                    <p style={{
                        fontFamily: "'Cormorant Infant', serif",
                        color: COLORS.textMuted, fontSize: 12,
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        marginBottom: 10,
                    }}>Настроение</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
                        {MOODS.map(m => (
                            <button key={m.id} onClick={() => setMood(m.id)} style={{
                                padding: "8px 16px", borderRadius: 999,
                                border: `1px solid ${mood === m.id ? COLORS.primary + "88" : "rgba(255,255,255,0.1)"}`,
                                background: mood === m.id ? `${COLORS.primary}20` : "rgba(255,255,255,0.03)",
                                color: mood === m.id ? COLORS.primary : COLORS.textMuted,
                                fontFamily: "'Cormorant Infant', serif",
                                fontSize: 13, cursor: "pointer",
                                display: "flex", alignItems: "center", gap: 6,
                                transition: "all 0.2s",
                            }}>
                                {m.emoji} {m.label}
                            </button>
                        ))}
                    </div>

                    {/* Text area */}
                    <p style={{
                        fontFamily: "'Cormorant Infant', serif",
                        color: COLORS.textMuted, fontSize: 12,
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        marginBottom: 10,
                    }}>Твоё сообщение</p>
                    <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder={`Дорогой...`}
                        rows={6}
                        style={{
                            width: "100%", padding: "14px 18px",
                            borderRadius: 14,
                            border: `1px solid ${text ? COLORS.border : "rgba(255,255,255,0.08)"}`,
                            background: "rgba(255,255,255,0.04)",
                            color: COLORS.text,
                            fontFamily: "'Cormorant Infant', serif",
                            fontSize: 17, lineHeight: 1.8,
                            resize: "vertical", outline: "none",
                            boxSizing: "border-box",
                            fontStyle: "italic",
                            transition: "border-color 0.2s",
                        }}
                    />

                    {error && (
                        <p style={{
                            color: "#ff8080", fontFamily: "'Cormorant Infant', serif",
                            fontSize: 14, marginTop: 10, fontStyle: "italic",
                        }}>{error}</p>
                    )}

                    {/* Success message */}
                    {sent && (
                        <div style={{
                            marginTop: 14, padding: "12px 18px",
                            background: "rgba(168,230,163,0.08)",
                            border: "1px solid rgba(168,230,163,0.2)",
                            borderRadius: 12, textAlign: "center",
                        }}>
                            <p style={{
                                fontFamily: "'Great Vibes', cursive",
                                color: "#a8e6a3", fontSize: 22,
                            }}>Письмо отправлено ❤️</p>
                        </div>
                    )}

                    <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                        <PrimaryBtn
                            onClick={send}
                            disabled={!text.trim() || sending}
                            style={{ flex: 1 }}
                        >
                            {sending ? "Отправляю..." : "Отправить письмо"}
                        </PrimaryBtn>
                    </div>
                </Card>

                {/* Inbox toggle */}
                <div style={{ marginTop: 32, textAlign: "center" }}>
                    <GhostBtn onClick={() => setShowInbox(v => !v)}>
                        {showInbox ? "Скрыть письма" : `Все письма ${messages.length > 0 ? `(${messages.length})` : ""}`}
                    </GhostBtn>
                </div>

                {/* Messages list */}
                {showInbox && (
                    <div style={{ marginTop: 24 }}>
                        {loadingMsgs && (
                            <p style={{
                                fontFamily: "'Cormorant Infant', serif",
                                color: COLORS.textMuted, textAlign: "center", fontStyle: "italic",
                            }}>загружаю письма...</p>
                        )}
                        {!loadingMsgs && messages.length === 0 && (
                            <p style={{
                                fontFamily: "'Cormorant Infant', serif",
                                color: COLORS.textMuted, textAlign: "center",
                                fontStyle: "italic", fontSize: 16,
                            }}>Писем пока нет — жду первого ❤️</p>
                        )}
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {messages.map((m, i) => (
                                <MessageCard key={m.id} msg={m} index={i} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
