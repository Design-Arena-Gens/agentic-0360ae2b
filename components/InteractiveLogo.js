'use client';

import { useMemo, useState } from 'react';

const palettes = [
  {
    name: 'Aurora Bloom',
    primary: '#58d0ff',
    secondary: '#006fff',
    accent: '#f7f089',
    background: '#0a1a2f'
  },
  {
    name: 'Lava Pulse',
    primary: '#ff7958',
    secondary: '#ff2d7a',
    accent: '#ffc46b',
    background: '#24111d'
  },
  {
    name: 'Neon Forest',
    primary: '#70ffba',
    secondary: '#1385ff',
    accent: '#caff5a',
    background: '#0b221d'
  }
];

export default function InteractiveLogo() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 35 });
  const [selectedPalette, setSelectedPalette] = useState(0);

  const palette = palettes[selectedPalette];

  const emblemGradient = useMemo(
    () => `linear-gradient(135deg, ${palette.primary}, ${palette.secondary} 60%, #020817)`,
    [palette]
  );

  const auraGradient = useMemo(
    () =>
      `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${palette.accent} 0%, transparent 65%)`,
    [palette, glowPosition]
  );

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;
    const offsetY = event.clientY - bounds.top;
    const rotateY = ((offsetX - bounds.width / 2) / bounds.width) * 18;
    const rotateX = ((offsetY - bounds.height / 2) / bounds.height) * -18;
    setRotation({ x: rotateX, y: rotateY });
    setGlowPosition({
      x: Math.min(80, Math.max(20, (offsetX / bounds.width) * 100)),
      y: Math.min(70, Math.max(15, (offsetY / bounds.height) * 100))
    });
  };

  const handlePointerLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlowPosition({ x: 50, y: 35 });
  };

  return (
    <section className="stage">
      <div className="hero-copy">
        <p className="eyebrow">Interactive Identity System</p>
        <h1>Craft a tactile logo that feels alive.</h1>
        <p className="blurb">
          A rich 3D badge with responsive light and depth, tailored for product teams building immersive
          interaction design systems.
        </p>
        <div className="palette-row">
          {palettes.map((option, index) => (
            <button
              key={option.name}
              className={`palette-chip${selectedPalette === index ? ' active' : ''}`}
              onClick={() => setSelectedPalette(index)}
              type="button"
              style={{
                background: `linear-gradient(120deg, ${option.primary}, ${option.secondary})`,
                boxShadow: selectedPalette === index ? `0 0 20px ${option.primary + '55'}` : 'none'
              }}
            >
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        className="logo-orbit"
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          background: palette.background
        }}
      >
        <div className="ambient-glow" style={{ backgroundImage: auraGradient }} />
        <div className="logo-shell">
          <div className="logo-emblem" style={{ backgroundImage: emblemGradient }}>
            <div className="logo-highlight" />
            <div className="logo-core">
              <span className="glyph">ID</span>
              <span className="tagline">interactive designs</span>
            </div>
          </div>
          <div className="logo-ring">
            <div className="inner-sheen" />
          </div>
        </div>
        <div className="reflection" />
      </div>

      <div className="floating-card">
        <p className="card-title">Why it works</p>
        <ul>
          <li>Soft specular highlights simulate real studio lighting.</li>
          <li>Color-driven rim light reacts to cursor orbit for presence.</li>
          <li>Layered glass ring adds parallax for interactive canvases.</li>
        </ul>
      </div>

      <style jsx>{`
        .stage {
          display: grid;
          gap: 3.5rem;
          align-items: center;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          position: relative;
          width: min(1200px, 92vw);
          margin: 0 auto;
          padding: 4.5rem 0 6rem;
        }

        .hero-copy {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 34rem;
        }

        .eyebrow {
          letter-spacing: 0.32em;
          text-transform: uppercase;
          font-weight: 500;
          font-size: 0.8rem;
          color: #9ea7ff;
        }

        h1 {
          font-family: 'Space Grotesk', 'Outfit', system-ui;
          font-size: clamp(2.6rem, 4vw, 3.5rem);
          margin: 0;
        }

        .blurb {
          color: #ccd0ff;
          font-size: 1rem;
          max-width: 28rem;
        }

        .palette-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .palette-chip {
          position: relative;
          border: none;
          border-radius: 999px;
          padding: 0.55rem 1.4rem;
          color: #04070f;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.35s ease, opacity 0.35s ease, box-shadow 0.45s ease;
          opacity: 0.78;
        }

        .palette-chip:hover {
          transform: translateY(-2px);
          opacity: 1;
        }

        .palette-chip.active {
          opacity: 1;
        }

        .palette-chip span {
          mix-blend-mode: screen;
        }

        .logo-orbit {
          position: relative;
          width: min(420px, 80vw);
          aspect-ratio: 1;
          margin: 0 auto;
          border-radius: 28px;
          padding: 2rem;
          display: grid;
          place-items: center;
          transition: transform 0.3s ease;
          box-shadow: inset 0 0 60px rgba(6, 7, 25, 0.65), 0 25px 55px rgba(3, 4, 10, 0.9);
          overflow: hidden;
          background: ${palettes[0].background};
        }

        .ambient-glow {
          position: absolute;
          inset: -40%;
          filter: blur(70px);
          opacity: 0.8;
        }

        .logo-shell {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          display: grid;
          place-items: center;
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.45));
        }

        .logo-emblem {
          position: relative;
          width: 82%;
          aspect-ratio: 1;
          border-radius: 28%;
          display: grid;
          place-items: center;
          overflow: hidden;
          box-shadow:
            inset 0 0 25px rgba(255, 255, 255, 0.2),
            inset 0 -30px 60px rgba(0, 0, 0, 0.45),
            0 12px 35px rgba(0, 8, 20, 0.75);
        }

        .logo-highlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.55), transparent 45%);
          mix-blend-mode: screen;
        }

        .logo-core {
          position: relative;
          width: 68%;
          aspect-ratio: 1;
          border-radius: 50%;
          display: grid;
          place-items: center;
          backdrop-filter: blur(8px);
          background: linear-gradient(145deg, rgba(2, 6, 15, 0.75), rgba(12, 18, 43, 0.2));
          border: 1px solid rgba(151, 189, 255, 0.45);
          box-shadow:
            inset 0 0 25px rgba(205, 227, 255, 0.35),
            0 0 35px rgba(203, 235, 255, 0.25);
          text-align: center;
        }

        .glyph {
          font-size: clamp(2.1rem, 4vw, 2.8rem);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .tagline {
          font-size: 0.75rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(222, 233, 255, 0.7);
          margin-top: 0.5rem;
        }

        .logo-ring {
          position: absolute;
          inset: -10%;
          border-radius: 40%;
          border: 6px solid rgba(233, 244, 255, 0.12);
          box-shadow: inset 0 0 35px rgba(255, 255, 255, 0.18);
          transform: translateZ(-60px);
        }

        .inner-sheen {
          position: absolute;
          inset: -2px;
          border-radius: 40%;
          border: 1px solid rgba(255, 255, 255, 0.25);
          opacity: 0.4;
        }

        .reflection {
          position: absolute;
          inset: auto 12% 8% 12%;
          height: 25%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.18), transparent 70%);
          filter: blur(8px);
          opacity: 0.3;
        }

        .floating-card {
          position: relative;
          backdrop-filter: blur(18px);
          background: linear-gradient(145deg, rgba(7, 12, 25, 0.75), rgba(12, 18, 43, 0.45));
          border: 1px solid rgba(124, 153, 255, 0.18);
          border-radius: 22px;
          padding: 1.75rem;
          max-width: 22rem;
          box-shadow: 0 35px 65px rgba(2, 8, 23, 0.55);
        }

        .card-title {
          text-transform: uppercase;
          letter-spacing: 0.28em;
          font-size: 0.75rem;
          color: rgba(166, 195, 255, 0.75);
          margin-bottom: 1rem;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.75rem;
        }

        li {
          font-size: 0.95rem;
          color: rgba(226, 233, 255, 0.8);
        }

        @media (max-width: 900px) {
          .stage {
            padding-top: 3rem;
            gap: 3rem;
          }

          .floating-card {
            margin: 0 auto;
            width: min(90%, 22rem);
          }
        }
      `}</style>
    </section>
  );
}
