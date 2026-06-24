import { useState, useEffect } from "react";
import { CONFIG, COLORS } from "../config";
import { Card, PageTitle, Divider, GlowOrb } from "./UI";

export default function ApologyPage() {
    const [visible, setVisible] = useState(false);
    useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

    const paragraphs = CONFIG.apologyText.split("\n\n").filter(Boolean);

    return (
        <div style={{
            minHeight: "calc(100vh - 73px)", display: "flex",
            alignItems: "center", justifyContent: "center",
            padding: "60px 24px", position: "relative",
        }}>
            <GlowOrb top="5%" left="5%" color={COLORS.primaryD} size={280} />
            <GlowOrb bottom="5%" right="5%" color={COLORS.secondary} size={220} />

            <div style={{
                maxWidth: 640, width: "100%",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.75s cubic-bezier(0.16,1,0.3,1)",
                position: "relative", zIndex: 1,
            }}>
                <PageTitle sub="от сердца">Прости меня</PageTitle>

                <div style={{ marginBottom: 32 }}>
                    <Divider symbol="" color={COLORS.primary} />
                </div>

                <Card>
                    <div style={{ textAlign: "center", marginBottom: 28 }}>
                        <span style={{ fontSize: 52 }}></span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                        {paragraphs.map((p, i) => (
                            <p key={i} style={{
                                fontFamily: "'Cormorant Infant', serif",
                                fontSize: "clamp(16px,2vw,19px)",
                                color: i === paragraphs.length - 1 ? `${COLORS.primary}cc` : COLORS.text,
                                lineHeight: 1.9, letterSpacing: "0.025em",
                                fontStyle: i === 0 ? "normal" : "italic",
                                margin: 0,
                                opacity: visible ? 1 : 0,
                                transform: visible ? "none" : "translateY(10px)",
                                transition: `all 0.6s ease ${0.25 + i * 0.18}s`,
                            }}>
                                {p}
                            </p>
                        ))}
                    </div>

                    <div style={{ marginTop: 32 }}>
                        <Divider symbol="❤️" color={COLORS.primary} />
                    </div>
                </Card>
            </div>
        </div>
    );
}
