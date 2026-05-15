/* ============ Landing — cinematic hero ============ */
const ScreenLanding = ({ go }) => {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf;
    const tick = () => { setT(p => p + 1); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="screen-landing" style={{ minHeight: '100%', position: 'relative' }}>
      {/* Ambient gradients */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '60%', top: '-10%', width: 800, height: 800,
                      background: 'radial-gradient(circle, oklch(0.74 0.14 162 / 0.16), transparent 60%)',
                      filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', left: '-10%', top: '40%', width: 700, height: 700,
                      background: 'radial-gradient(circle, oklch(0.72 0.13 240 / 0.12), transparent 60%)',
                      filter: 'blur(40px)' }} />
      </div>

      {/* nav */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '22px 48px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="brand"><div className="mark" /></div>
          <div className="name" style={{ fontSize: 13, fontWeight: 600 }}>Spark Learn Antioquia
            <span style={{ display: 'block', color: 'var(--text-3)', fontWeight: 400, fontSize: 10, letterSpacing: 0.12, textTransform: 'uppercase' }}>EduAntioquia</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', fontSize: 13, color: 'var(--text-2)' }}>
          <a style={{ color: 'inherit' }}>Plataforma</a>
          <a style={{ color: 'inherit' }}>Para docentes</a>
          <a style={{ color: 'inherit' }}>Para gobierno</a>
          <a style={{ color: 'inherit' }}>Ética IA</a>
          <a style={{ color: 'inherit' }}>Investigación</a>
          <button className="btn sm" onClick={() => go('login')}>Iniciar sesión</button>
        </div>
      </div>

      {/* HERO */}
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 64,
                    padding: '90px 80px 60px', alignItems: 'center', maxWidth: 1480, margin: '0 auto' }}>
        <div>
          <div className="eyebrow">Pilar Territorio Educado · Agenda Antioquia 2040</div>
          <h1 style={{ marginTop: 24, marginBottom: 22 }}>
            Una <span style={{
              background: 'linear-gradient(90deg, oklch(0.92 0.05 162), oklch(0.74 0.14 162))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>Antiquia</span> más educada<br/>comienza aquí.
          </h1>
          <p className="lead" style={{ marginBottom: 36 }}>
            Inteligencia artificial como herramienta de inclusión, aprendizaje socrático y
            equidad territorial — diseñada para los 125 municipios del departamento.
          </p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 36 }}>
            <button className="btn primary" onClick={() => go('login')}>
              Comenzar experiencia <Icon name="arrow" size={14} />
            </button>
            <button className="btn" onClick={() => go('tutor')}>
              <Icon name="play" size={12} /> Explorar demo
            </button>
          </div>
          <div style={{ display: 'flex', gap: 24, color: 'var(--text-3)', fontSize: 11, letterSpacing: 0.06, textTransform: 'uppercase' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="shield" size={12} /> IA ética supervisada</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="accessibility" size={12} /> WCAG 2.2 AA</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="wifi" size={12} /> Modo baja conectividad</span>
          </div>
        </div>

        {/* Hero map visualization */}
        <div style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--line)',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
                      padding: 32, overflow: 'hidden' }}>
          {/* subtle topo grid */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100">
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={'h'+i} x1="0" y1={i*10} x2="100" y2={i*10} stroke="rgba(255,255,255,0.03)" strokeWidth="0.1" />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={'v'+i} x1={i*10} y1="0" x2={i*10} y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.1" />
            ))}
          </svg>
          <AntioquiaMap active={['urabá','norte','valle','oriente','suroeste','bajocauca','nordeste','occidente','magdalena']} />
          {/* floating signal dot */}
          <div style={{ position: 'absolute', top: 24, right: 24, display: 'flex', alignItems: 'center', gap: 8,
                        padding: '6px 12px', borderRadius: 999, background: 'rgba(0,0,0,0.4)',
                        border: '1px solid var(--line-2)', backdropFilter: 'blur(10px)', fontSize: 10, letterSpacing: 0.1 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)' }} />
            <span className="mono">9 SUBREGIONES · EN VIVO</span>
          </div>

          <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24,
                        display: 'flex', gap: 12, justifyContent: 'space-between',
                        padding: 16, borderRadius: 12, background: 'rgba(0,0,0,0.35)',
                        border: '1px solid var(--line)', backdropFilter: 'blur(10px)' }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: 0.1, textTransform: 'uppercase' }}>Estudiantes activos</div>
              <div style={{ fontSize: 18, fontWeight: 600 }} className="tnum">142,308</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: 0.1, textTransform: 'uppercase' }}>Docentes</div>
              <div style={{ fontSize: 18, fontWeight: 600 }} className="tnum">8,940</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: 0.1, textTransform: 'uppercase' }}>Municipios</div>
              <div style={{ fontSize: 18, fontWeight: 600 }} className="tnum">125 / 125</div>
            </div>
          </div>
        </div>
      </div>

      {/* Principles row */}
      <div style={{ padding: '40px 80px 100px', maxWidth: 1480, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {[
            { icon: 'chat', t: 'Tutor Socrático', d: 'La IA hace contrapreguntas, no entrega respuestas. Estimula el razonamiento.' },
            { icon: 'map', t: 'Equidad Territorial', d: 'Reconoce municipio, subregión, conectividad y contexto rural.' },
            { icon: 'accessibility', t: 'Inclusión Multimodal', d: 'Audio, lectura automática, subtítulos y contenido adaptativo.' },
            { icon: 'shield', t: 'IA Ética', d: 'Transparencia algorítmica, supervisión humana y protección de menores.' },
          ].map((p, i) => (
            <div key={i} className="card" style={{ padding: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-soft)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--accent)', marginBottom: 16 }}>
                <Icon name={p.icon} size={16} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{p.t}</div>
              <div style={{ color: 'var(--text-2)', fontSize: 13, lineHeight: 1.5 }}>{p.d}</div>
            </div>
          ))}
        </div>

        {/* Quote bar */}
        <div style={{ marginTop: 60, padding: '36px 40px', borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--line)',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32 }}>
          <div>
            <div className="eyebrow">Premisa</div>
            <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em', marginTop: 12, maxWidth: 760, lineHeight: 1.25 }}>
              La inteligencia artificial no reemplaza al docente. Acompaña, pregunta, guía y
              estimula el pensamiento crítico de cada estudiante en cada territorio.
            </div>
          </div>
          <button className="btn" onClick={() => go('ethics')}>Ver compromiso ético <Icon name="arrow" size={12} /></button>
        </div>
      </div>
    </div>
  );
};

window.ScreenLanding = ScreenLanding;
