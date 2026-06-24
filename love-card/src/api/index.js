import { CONFIG } from "../config";

const BASE = CONFIG.apiUrl;

// ─── helpers ─────────────────────────────────────────────────────────────────
async function req(method, path, body) {
    const opts = {
        method,
        headers: { "Content-Type": "application/json" },
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(`${BASE}${path}`, opts);
    if (!res.ok) throw new Error(`${method} ${path} → ${res.status}`);
    const text = await res.text();
    return text ? JSON.parse(text) : null;
}

async function upload(path, formData) {
    const res = await fetch(`${BASE}${path}`, { method: "POST", body: formData });
    if (!res.ok) throw new Error(`POST ${path} → ${res.status}`);
    return res.json();
}

// ─── Photos ──────────────────────────────────────────────────────────────────
// GET    /photos        → [{id, url, caption, createdAt}]
// POST   /photos        → multipart: file (File), caption (string)
// DELETE /photos/{id}   → 200

export const photosApi = {
    getAll: ()               => req("GET",    "/photos"),
    upload: (file, caption)  => upload("/photos", (() => {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("caption", caption || "");
        return fd;
    })()),
    remove: (id)             => req("DELETE", `/photos/${id}`),
};

// ─── Messages ────────────────────────────────────────────────────────────────
// GET  /messages      → [{id, text, mood, createdAt}]
// POST /messages      → {text, mood}  → 201

export const messagesApi = {
    getAll: ()            => req("GET",  "/messages"),
    send:   (text, mood)  => req("POST", "/messages", { text, mood }),
};

// ─── Settings ────────────────────────────────────────────────────────────────
// GET /settings       → {startDate, coupleNames}
// PUT /settings       → {startDate, coupleNames}  ← бэкенд использует PUT

export const settingsApi = {
    get:  ()      => req("GET", "/settings"),
    save: (data)  => req("PUT", "/settings", data),
};