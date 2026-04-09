import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-black/10 border border-black/20 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4.5 1.5 1.5-4.5L16.862 3.487z" />
          </svg>
        </div>

        <h1 className="text-5xl tracking-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#000000' }}>
          scrybl

        </h1>

        <p className="max-w-md text-lg text-black/60 leading-relaxed">
          A real-time collaborative canvas for sketching ideas, taking visual notes, and working together — live.
        </p>

        <div className="flex gap-4 mt-2">
          <button
            onClick={() => navigate(`/canvas/${crypto.randomUUID()}`)}
            className="px-6 py-3 rounded-xl bg-black hover:bg-black/80 text-white font-semibold transition-colors"
          >
            Open Canvas
          </button>
          <a
            href="#features"
            className="px-6 py-3 rounded-xl border border-black/20 hover:border-black/60 text-black/70 hover:text-black font-semibold transition-colors"
          >
            Learn more
          </a>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="px-6 py-16 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-semibold text-center mb-10 text-black/80" style ={{color: '#000000'}}>Everything you need to create</h2>
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
              className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-black/5 border border-black/10 hover:border-black/30 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-black/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  {icon}
                </svg>
              </div>
              <h3 className="font-semibold text-black">{title}</h3>
              <p className="text-sm text-black/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-6 pb-16 max-w-4xl mx-auto w-full">
        <div className="rounded-2xl bg-black/5 border border-black/15 p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg">Ready to start sketching?</h3>
            <p className="text-black/50 text-sm mt-1">Jump straight onto the canvas — no account needed.</p>
          </div>
          <button
            onClick={() => navigate(`/canvas/${crypto.randomUUID()}`)}
            className="shrink-0 px-6 py-3 rounded-xl bg-black hover:bg-black/80 text-white font-semibold transition-colors"
          >
            Go to Canvas →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-6 text-center text-black/30 text-sm">
        NotesApp — collaborative drawing, together.
      </footer>
    </div>
  );
}
