import { useState } from "react";
import { TabBar, FloatingParticles } from "./components/UI";
import HomePage     from "./components/HomePage.jsx";
import ApologyPage  from "./components/ApologyPage.jsx";
import ReasonsPage  from "./components/ReasonsPage.jsx";
import GalleryPage  from "./components/GalleryPage.jsx";
import CalendarPage from "./components/CalendarPage.jsx";
import LetterPage   from "./components/LetterPage.jsx";

export default function App() {
  const [tab, setTab] = useState("home");

  return (
      <>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Great+Vibes&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0a0812; color: #fff; -webkit-font-smoothing: antialiased; }

        @keyframes floatUp {
          0%   { transform: translateY(0)      scale(1);   opacity: 0.12; }
          100% { transform: translateY(-100vh) scale(0.4); opacity: 0;    }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.18); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        button { font-family: inherit; }
        button:hover { opacity: 0.88; }

        ::-webkit-scrollbar       { width: 5px; }
        ::-webkit-scrollbar-track { background: #0a0812; }
        ::-webkit-scrollbar-thumb { background: rgba(232,121,160,0.28); border-radius: 4px; }

        textarea::placeholder,
        input::placeholder { color: rgba(255,255,255,0.2); }
        textarea, input { font-family: "'Cormorant Infant', serif"; }
      `}</style>

        <div style={{ minHeight: "100vh", background: "#0a0812", position: "relative" }}>
          <FloatingParticles />

          <div style={{ position: "relative", zIndex: 1 }}>
            <TabBar active={tab} onChange={setTab} />

            <div style={{ animation: "fadeIn 0.4s ease" }} key={tab}>
              {tab === "home"     && <HomePage     />}
              {tab === "sorry"    && <ApologyPage  />}
              {tab === "reasons"  && <ReasonsPage  />}
              {tab === "gallery"  && <GalleryPage  />}
              {tab === "calendar" && <CalendarPage />}
              {tab === "letter"   && <LetterPage   />}
            </div>
          </div>
        </div>
      </>
  );
}