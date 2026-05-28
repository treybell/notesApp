import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const pixelGridStyle = {
  backgroundColor: '#0c0c0e',
  backgroundImage: `
    repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255,255,255,0.03) 31px, rgba(255,255,255,0.03) 32px),
    repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(255,255,255,0.03) 31px, rgba(255,255,255,0.03) 32px)
  `,
}

const pixelButtonStyle = {
  boxShadow: `
    -4px 0 0 0 #00ff99,
    4px 0 0 0 #00ff99,
    0 -4px 0 0 #00ff99,
    0 4px 0 0 #00ff99
  `,
  borderRadius: 0,
}

const pixelButtonHoverStyle = {
  boxShadow: `
    -4px 0 0 0 #00ffbb,
    4px 0 0 0 #00ffbb,
    0 -4px 0 0 #00ffbb,
    0 4px 0 0 #00ffbb,
    0 0 16px 4px rgba(0,255,153,0.4)
  `,
  borderRadius: 0,
}

export default function HomePage() {
  const navigate = useNavigate();
  const [canvases, setCanvases] = useState([])
  const [btnHover, setBtnHover] = useState(false)

  //used to gather previous databases
  //querys our backend and then recieves the jsonstring
  useEffect(() => {
    fetch('http://localhost:3000/canvases')
      .then(res => res.json())
      .then(data => setCanvases(data))
  }, [])

  return (
    <div className="min-h-screen flex flex-col" style={pixelGridStyle}>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4 py-12">

        {/* Logo */}
        <div>
          <img src="/Gemini_Generated_Image_npiyebnpiyebnpiy-removebg-preview.png" alt="scrybl logo" style={{ width: 300, height: 200, imageRendering: 'pixelated', marginBottom: '-40px' }} />
        </div>

        <h1 style={{ fontFamily: "'Press Start 2P', monospace, serif", color: 'white', fontSize: '2.5rem', letterSpacing: '0.1em', textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
          scrybl
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '28rem', lineHeight: '1.8', fontFamily: 'monospace' }}>
          A real-time collaborative canvas for sketching ideas, taking visual notes, and working together — live.
        </p>

        <div className="flex gap-6 mt-2">
          <button
            onClick={() => navigate(`/canvas/${crypto.randomUUID()}`)}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              ...(btnHover ? pixelButtonHoverStyle : pixelButtonStyle),
              backgroundColor: 'transparent',
              color: 'white',
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '12px 28px',
              cursor: 'pointer',
              border: 'none',
              transition: 'box-shadow 0.15s ease',
              letterSpacing: '0.05em',
            }}
          >
            [ Open Canvas ]
          </button>
          <a
            href="#features"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', padding: '12px 20px', textDecoration: 'none', letterSpacing: '0.05em' }}
          >
            Learn more ↓
          </a>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="px-6 py-16 max-w-4xl mx-auto w-full">
        <h2 style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', textAlign: 'center', marginBottom: '2.5rem', letterSpacing: '0.1em' }}>
          // FEATURES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 000-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" />
              ),
              title: "Real-time Sync",
              desc: "See collaborators' work as they draw via live WebSocket updates.",
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.575 1.399a2.25 2.25 0 01-2.975 0L14.25 15M19.8 15l.9.8M5 14.5l-.9.8m0 0l-1.575 1.399a2.25 2.25 0 002.975 0L7.5 15.3M5 14.5l1.5 1.3" />
              ),
              title: "Freehand Drawing",
              desc: "Smooth pencil brush with adjustable size and full color control.",
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              ),
              title: "Eraser Tool",
              desc: "Quickly clean up mistakes with a dedicated eraser mode.",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '12px',
                padding: '24px',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(0,255,153,0.15)',
                borderRadius: 0,
              }}
            >
              <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,255,153,0.08)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 24, height: 24, color: '#00ff99' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  {icon}
                </svg>
              </div>
              <h3 style={{ color: 'white', fontFamily: 'monospace', fontWeight: 700 }}>{title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', fontFamily: 'monospace', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Previous Canvases */}
      <section className="px-6 py-8 max-w-4xl mx-auto w-full">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', letterSpacing: '0.1em', margin: 0 }}>
            // YOUR CANVASES
          </h2>
          <button
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,80,80,0.3)',
              color: 'rgba(255,80,80,0.6)',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              padding: '6px 14px',
              cursor: 'pointer',
              letterSpacing: '0.05em',
              borderRadius: 0,
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,80,80,0.7)'; e.currentTarget.style.color = 'rgba(255,80,80,1)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,80,80,0.3)'; e.currentTarget.style.color = 'rgba(255,80,80,0.6)' }}
          >
            [ clear all ]
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {canvases.map(canvas => (
            <div
              key={canvas.id}
              onClick={() => navigate(`/canvas/${canvas.id}`)}
              style={{
                padding: '12px 16px',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(0,255,153,0.15)',
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'monospace',
                cursor: 'pointer',
                borderRadius: 0,
                transition: 'border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#00ff99'; e.currentTarget.style.color = '#00ff99' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,255,153,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
            >
              {new Date(canvas.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-6 pb-16 max-w-4xl mx-auto w-full">
        <div style={{ border: '1px solid rgba(0,255,153,0.2)', padding: '32px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '16px', backgroundColor: 'rgba(0,255,153,0.03)', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ color: 'white', fontFamily: 'monospace', fontWeight: 700, fontSize: '1.1rem' }}>Ready to start sketching?</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', fontSize: '0.875rem', marginTop: 4 }}>Jump straight onto the canvas — no account needed.</p>
          </div>
          <button
            onClick={() => navigate(`/canvas/${crypto.randomUUID()}`)}
            style={{
              ...pixelButtonStyle,
              backgroundColor: 'transparent',
              color: 'white',
              fontFamily: 'monospace',
              fontWeight: 700,
              padding: '10px 24px',
              cursor: 'pointer',
              border: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Go to Canvas →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', fontSize: '0.75rem' }}>
        scrybl — collaborative drawing, together.
      </footer>
    </div>
  );
}
