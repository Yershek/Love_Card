import { useState, useEffect, useRef } from "react";
import { COLORS, CONFIG } from "../config";
import { photosApi } from "../api";
import { PageTitle, PrimaryBtn, GhostBtn, GlowOrb, Divider } from "./UI";

// ─── Single photo card ────────────────────────────────────────────────────────
function PhotoCard({ photo, onDelete, index }) {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [enlarged, setEnlarged] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), index * 80);
        return () => clearTimeout(t);
    }, [index]);

    const url = photo.url.startsWith("http")
        ? photo.url
        : `${CONFIG.apiUrl.replace("/api", "")}${photo.url}`;

    return (
        <>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => setEnlarged(true)}
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "scale(1)" : "scale(0.92)",
                    transition: `all 0.45s ease ${index * 0.06}s`,
                    borderRadius: 16,
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    aspectRatio: "1",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${hovered ? COLORS.primary + "55" : "rgba(255,255,255,0.07)"}`,
                    boxShadow: hovered ? `0 8px 32px rgba(0,0,0,0.5)` : "0 2px 12px rgba(0,0,0,0.3)",
                    transition: "all 0.28s ease",
                }}
            >
                <img
                    src={url}
                    alt={photo.caption || "moment"}
                    style={{
                        width: "100%", height: "100%", objectFit: "cover",
                        transform: hovered ? "scale(1.05)" : "scale(1)",
                        transition: "transform 0.4s ease",
                        display: "block",
                    }}
                />
                {/* Overlay */}
                <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(to top, rgba(10,8,18,0.85) 0%, transparent 50%)`,
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.3s",
                    display: "flex", flexDirection: "column",
                    justifyContent: "flex-end", padding: 14,
                }}>
                    {photo.caption && (
                        <p style={{
                            fontFamily: "'Cormorant Infant', serif",
                            color: "#fff", fontSize: 14, fontStyle: "italic",
                            margin: "0 0 8px", lineHeight: 1.4,
                        }}>{photo.caption}</p>
                    )}
                    <div style={{ display: "flex", gap: 6 }}>
                        <button
                            onClick={e => { e.stopPropagation(); onDelete(photo.id); }}
                            style={{
                                padding: "4px 10px", borderRadius: 8, border: "none",
                                background: "rgba(220,50,50,0.7)", color: "#fff",
                                fontSize: 12, cursor: "pointer",
                                fontFamily: "'Cormorant Infant', serif",
                            }}
                        >удалить</button>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {enlarged && (
                <div
                    onClick={() => setEnlarged(false)}
                    style={{
                        position: "fixed", inset: 0, zIndex: 500,
                        background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        padding: 24,
                    }}
                >
                    <div onClick={e => e.stopPropagation()} style={{ maxWidth: 800, width: "100%", position: "relative" }}>
                        <img
                            src={url}
                            alt={photo.caption || "moment"}
                            style={{ width: "100%", borderRadius: 16, boxShadow: "0 20px 80px rgba(0,0,0,0.6)" }}
                        />
                        {photo.caption && (
                            <p style={{
                                fontFamily: "'Great Vibes', cursive",
                                fontSize: "clamp(20px,3vw,28px)",
                                color: COLORS.primary, textAlign: "center",
                                marginTop: 16, letterSpacing: "0.04em",
                            }}>{photo.caption}</p>
                        )}
                        <button
                            onClick={() => setEnlarged(false)}
                            style={{
                                position: "absolute", top: -16, right: -16,
                                width: 36, height: 36, borderRadius: "50%",
                                border: "none", background: "rgba(255,255,255,0.1)",
                                color: "#fff", fontSize: 18, cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                        >×</button>
                    </div>
                </div>
            )}
        </>
    );
}

// ─── Upload modal ─────────────────────────────────────────────────────────────
function UploadModal({ onClose, onUploaded }) {
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const inputRef = useRef();

    const handleFile = (f) => {
        if (!f) return;
        setFile(f);
        setPreview(URL.createObjectURL(f));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const f = e.dataTransfer.files[0];
        if (f && f.type.startsWith("image/")) handleFile(f);
    };

    const submit = async () => {
        if (!file) return;
        setLoading(true); setError(null);
        try {
            const photo = await photosApi.upload(file, caption);
            onUploaded(photo);
            onClose();
        } catch (e) {
            setError("Не удалось загрузить. Проверь что бэкенд запущен.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
            style={{
                position: "fixed", inset: 0, zIndex: 300,
                background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
                display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
            }}
        >
            <div style={{
                background: "#120d1e",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 20, padding: 32, maxWidth: 420, width: "100%",
                boxShadow: "0 20px 80px rgba(0,0,0,0.6)",
            }}>
                <h3 style={{
                    fontFamily: "'Great Vibes', cursive", fontSize: 34,
                    color: COLORS.primary, margin: "0 0 24px", textAlign: "center",
                }}>Добавить момент</h3>

                {/* Drop zone */}
                <div
                    onDrop={handleDrop}
                    onDragOver={e => e.preventDefault()}
                    onClick={() => inputRef.current?.click()}
                    style={{
                        border: `2px dashed ${preview ? COLORS.primary + "66" : "rgba(255,255,255,0.12)"}`,
                        borderRadius: 14, padding: 24, textAlign: "center",
                        cursor: "pointer", marginBottom: 18,
                        background: preview ? "transparent" : "rgba(255,255,255,0.02)",
                        minHeight: 140,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        overflow: "hidden", position: "relative",
                        transition: "border-color 0.2s",
                    }}
                >
                    {preview ? (
                        <img src={preview} alt="preview" style={{
                            maxHeight: 200, maxWidth: "100%", borderRadius: 8, objectFit: "contain",
                        }} />
                    ) : (
                        <div>
                            <div style={{ fontSize: 36, marginBottom: 8 }}></div>
                            <p style={{
                                fontFamily: "'Cormorant Infant', serif",
                                color: COLORS.textMuted, fontSize: 15, margin: 0,
                            }}>Перетащи фото или нажми сюда</p>
                        </div>
                    )}
                    <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }}
                           onChange={e => handleFile(e.target.files[0])} />
                </div>

                {/* Caption */}
                <input
                    value={caption}
                    onChange={e => setCaption(e.target.value)}
                    placeholder="Подпись к фото..."
                    style={{
                        width: "100%", padding: "11px 16px", borderRadius: 12,
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.05)",
                        color: COLORS.text, fontFamily: "'Cormorant Infant', serif",
                        fontSize: 15, outline: "none", boxSizing: "border-box",
                        marginBottom: 20,
                    }}
                />

                {error && (
                    <p style={{
                        color: "#ff6b6b", fontFamily: "'Cormorant Infant', serif",
                        fontSize: 14, marginBottom: 14, textAlign: "center",
                    }}>{error}</p>
                )}

                <div style={{ display: "flex", gap: 10 }}>
                    <PrimaryBtn onClick={submit} disabled={!file || loading} style={{ flex: 1 }}>
                        {loading ? "Загружаю..." : "Добавить"}
                    </PrimaryBtn>
                    <GhostBtn onClick={onClose}>Закрыть</GhostBtn>
                </div>
            </div>
        </div>
    );
}

// ─── Gallery page ─────────────────────────────────────────────────────────────
export default function GalleryPage() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showUpload, setShowUpload] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        photosApi.getAll()
            .then(setPhotos)
            .catch(() => setError("Бэкенд недоступен. Запусти Spring Boot сервер."))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        try {
            await photosApi.remove(id);
            setPhotos(prev => prev.filter(p => p.id !== id));
        } catch {
            alert("Не удалось удалить");
        }
    };

    return (
        <div style={{
            minHeight: "calc(100vh - 73px)",
            padding: "56px 24px 80px",
            position: "relative",
            display: "flex", flexDirection: "column", alignItems: "center",
        }}>
            <GlowOrb top="0" right="10%" color={COLORS.secondary} size={300} />
            <GlowOrb bottom="10%" left="5%" color={COLORS.primaryD} size={250} />

            <div style={{ maxWidth: 800, width: "100%", position: "relative", zIndex: 1 }}>
                <PageTitle sub="наши воспоминания">Моменты</PageTitle>

                <div style={{ marginBottom: 32 }}>
                    <Divider symbol="" color={COLORS.secondary} />
                </div>

                {/* Controls */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 28 }}>
                    <PrimaryBtn onClick={() => setShowUpload(true)}>
                        + Добавить фото
                    </PrimaryBtn>
                </div>

                {/* States */}
                {loading && (
                    <div style={{ textAlign: "center", padding: 60 }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: "50%",
                            border: `3px solid ${COLORS.border}`,
                            borderTopColor: COLORS.primary,
                            animation: "spin 0.8s linear infinite",
                            margin: "0 auto 16px",
                        }} />
                        <p style={{ fontFamily: "'Cormorant Infant', serif", color: COLORS.textMuted, fontStyle: "italic" }}>
                            загружаю воспоминания...
                        </p>
                    </div>
                )}

                {error && !loading && (
                    <div style={{
                        textAlign: "center", padding: 48,
                        background: "rgba(255,100,100,0.05)",
                        border: "1px solid rgba(255,100,100,0.15)",
                        borderRadius: 16,
                    }}>
                        <p style={{ fontSize: 32, marginBottom: 12 }}></p>
                        <p style={{
                            fontFamily: "'Cormorant Infant', serif",
                            color: "rgba(255,150,150,0.8)", fontSize: 16, fontStyle: "italic",
                        }}>{error}</p>
                    </div>
                )}

                {!loading && !error && photos.length === 0 && (
                    <div style={{
                        textAlign: "center", padding: 64,
                        border: "1px dashed rgba(255,255,255,0.08)",
                        borderRadius: 20,
                    }}>
                        <p style={{ fontSize: 48, marginBottom: 16 }}></p>
                        <p style={{
                            fontFamily: "'Great Vibes', cursive",
                            fontSize: 28, color: `${COLORS.primary}88`,
                        }}>Здесь пока пусто</p>
                        <p style={{
                            fontFamily: "'Cormorant Infant', serif",
                            color: COLORS.textMuted, fontStyle: "italic", marginTop: 8,
                        }}>Добавь первый совместный момент</p>
                    </div>
                )}

                {!loading && photos.length > 0 && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                        gap: 14,
                    }}>
                        {photos.map((p, i) => (
                            <PhotoCard key={p.id} photo={p} index={i} onDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </div>

            {showUpload && (
                <UploadModal
                    onClose={() => setShowUpload(false)}
                    onUploaded={photo => setPhotos(prev => [photo, ...prev])}
                />
            )}
        </div>
    );
}