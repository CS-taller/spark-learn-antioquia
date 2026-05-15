/* ============ Multimodal & Offline & Closing ============ */

const ScreenMultimodal = ({ go }) => {
  const [mode, setMode] = useState('visual');
  const [size, setSize] = useState(100);
  const [contrast, setContrast] = useState(false);

  return (
    <div style={{ minHeight: '100%' }}>
      <Topbar crumb={['Experiencia multimodal']}>
        <span className="chip"><Icon name="accessibility" size={11} /> WCAG 2.2 AA</span>
      </Topbar>

      <div style={{ padding: '32px 40px 80px', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 28, maxWidth: 1400, margin: '0 auto' }}>
        {/* Left: controls */}
        <div>
          <div className="eyebrow">Inclusión por diseño</div>
          <h2 style={{ marginTop: 14, marginBottom: 16 }}>Una sola lección. Muchas formas de aprender.</h2>
          <p className="lead" style={{ marginBottom: 28 }}>
            Cada contenido en EduAntioquia se entrega en cuatro modalidades sincronizadas:
            visual, audio, lectura asistida y braille digital. Ajusta lo que necesites — la
            IA recordará tus preferencias.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Panel title="Modalidad activa">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {[
                  ['visual', 'Visual', 'eye'],
                  ['audio', 'Audio narrado', 'audio'],
                  ['texto', 'Texto + braille', 'type'],
                  ['sign', 'Lengua de señas', 'accessibility'],
                ].map(([id, lbl, ic]) => (
                  <button key={id} onClick={() => setMode(id)} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: 12, borderRadius: 10,
                    border: `1px solid ${mode === id ? 'var(--accent)' : 'var(--line-2)'}`,
                    background: mode === id ? 'var(--accent-soft)' : 'rgba(255,255,255,0.02)',
                    color: mode === id ? 'var(--text-0)' : 'var(--text-1)',
                    textAlign: 'left', cursor: 'pointer', fontSize: 12, fontWeight: 500
                  }}>
                    <Icon name={ic} size={14} />
                    {lbl}
                  </button>
                ))}
              </div>
            </Panel>

            <Panel title="Tamaño del texto">
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <input type="range" min="80" max="160" value={size} onChange={e => setSize(+e.target.value)}
                       style={{ flex: 1, accentColor: 'var(--accent)' }} />
                <span style={{ fontSize: 12, color: 'var(--text-1)', minWidth: 50, textAlign: 'right' }} className="tnum">{size}%</span>
              </div>
            </Panel>

            <Panel title="Alto contraste">
              <button onClick={() => setContrast(c => !c)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 6, cursor: 'pointer' }}>
                <span style={{ width: 32, height: 18, borderRadius: 10,
                                background: contrast ? 'var(--accent)' : 'rgba(255,255,255,0.08)',
                                position: 'relative', transition: 'all 0.2s' }}>
                  <span style={{ position: 'absolute', top: 2, [contrast ? 'right' : 'left']: 2,
                                  width: 14, height: 14, borderRadius: '50%', background: 'white' }} />
                </span>
                <span style={{ fontSize: 12 }}>{contrast ? 'Activado' : 'Desactivado'}</span>
              </button>
            </Panel>

            <Panel title="Velocidad de lectura">
              <div style={{ display: 'flex', gap: 4 }}>
                {['0.75x', '1.0x', '1.25x', '1.5x'].map((s, i) => (
                  <button key={s} style={{
                    flex: 1, padding: '8px 0', borderRadius: 8, fontSize: 12,
                    border: `1px solid ${i === 1 ? 'var(--accent)' : 'var(--line-2)'}`,
                    background: i === 1 ? 'var(--accent-soft)' : 'transparent',
                    color: i === 1 ? 'var(--text-0)' : 'var(--text-2)'
                  }}>{s}</button>
                ))}
              </div>
            </Panel>
          </div>
        </div>

        {/* Right: preview */}
        <div className="card" style={{ padding: 28, position: 'relative', minHeight: 600,
                                        filter: contrast ? 'contrast(1.3) saturate(0.6)' : 'none',
                                        fontSize: `${size}%` }}>
          <div className="spread" style={{ marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: 0.08, textTransform: 'uppercase' }}>Ciencias · U4</div>
              <h3 style={{ marginTop: 6 }}>La fotosíntesis</h3>
            </div>
            <span className="chip ai"><span className="dot" />{
              mode === 'visual' ? 'Modo visual' :
              mode === 'audio' ? 'Audio activo' :
              mode === 'texto' ? 'Lectura asistida' : 'Señas habilitado'
            }</span>
          </div>

          {/* Visual */}
          {mode === 'visual' && (
            <div>
              <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--line)', marginBottom: 20,
                            background: 'radial-gradient(circle at 30% 20%, oklch(0.85 0.12 80 / 0.15), transparent 60%)' }}>
                <div className="img-ph" style={{ aspectRatio: '16/9', borderRadius: 0, border: 'none' }}>
                  [ animación · planta + luz solar + agua ]
                </div>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-1)' }}>
                Las plantas son <strong style={{ color: 'var(--accent)' }}>cocinas solares vivas</strong>.
                Con luz, agua y dióxido de carbono fabrican su propio alimento — azúcar.
              </p>
            </div>
          )}

          {/* Audio */}
          {mode === 'audio' && (
            <div style={{ padding: 20, borderRadius: 12, border: '1px solid var(--line)',
                          background: 'rgba(255,255,255,0.02)', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <button className="btn primary" style={{ width: 44, height: 44, padding: 0, borderRadius: '50%' }}>
                  <Icon name="play" size={14} />
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Narración · La fotosíntesis</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Voz cálida ES-CO · 2:14</div>
                </div>
              </div>
              {/* waveform */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 48, marginBottom: 12 }}>
                {Array.from({ length: 80 }).map((_, i) => (
                  <div key={i} style={{ flex: 1, height: `${20 + Math.abs(Math.sin(i * 0.3) * 28)}%`,
                                         background: i < 36 ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                                         borderRadius: 1 }} />
                ))}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-2)', fontStyle: 'italic', lineHeight: 1.6 }}>
                "Imagina una planta como una pequeña cocina solar. Con luz, agua y un poco
                de aire fabrica su propio alimento..."
              </p>
            </div>
          )}

          {/* Lectura asistida */}
          {mode === 'texto' && (
            <div style={{ padding: 22, borderRadius: 12, border: '1px solid var(--line)',
                          background: 'rgba(255,255,255,0.02)', lineHeight: 2, fontSize: 16 }}>
              <span style={{ background: 'var(--accent-soft)', padding: '2px 4px', borderRadius: 3 }}>Las plantas</span>{' '}
              son organismos extraordinarios.{' '}
              <span style={{ background: 'oklch(0.72 0.13 240 / 0.2)', padding: '2px 4px', borderRadius: 3 }}>No tienen boca</span>,
              pero pueden alimentarse{' '}
              <span style={{ borderBottom: '2px dotted var(--accent)' }}>fabricando su propio azúcar</span> a
              partir de luz solar, agua y dióxido de carbono.
              <div style={{ marginTop: 18, padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.03)',
                            fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-2)' }}>
                ⠠⠇⠁⠎⠀⠏⠇⠁⠝⠞⠁⠎⠀⠓⠁⠉⠑⠝⠀⠋⠕⠞⠕⠎⠊⠝⠞⠑⠎⠊⠎ — versión braille digital
              </div>
            </div>
          )}

          {/* Señas */}
          {mode === 'sign' && (
            <div>
              <div className="img-ph" style={{ aspectRatio: '16/9', borderRadius: 12, marginBottom: 16 }}>
                [ video LSC · intérprete narrando la lección ]
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
                Cada contenido cuenta con interpretación en <strong style={{ color: 'var(--text-0)' }}>Lengua de Señas Colombiana (LSC)</strong>,
                sincronizada con subtítulos y descripción auditiva.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Panel = ({ title, children }) => (
  <div className="card" style={{ padding: 18 }}>
    <div className="card-title" style={{ marginBottom: 14 }}>{title}</div>
    {children}
  </div>
);

window.ScreenMultimodal = ScreenMultimodal;

/* ============ Modo baja conectividad ============ */
const ScreenOffline = ({ go }) => {
  const [downloading, setDownloading] = useState(2);
  const items = [
    { t: 'Ciencias · U4 Fotosíntesis', s: 14, p: 100 },
    { t: 'Matemáticas · U6 Ecuaciones', s: 22, p: 100 },
    { t: 'Sociales · U3 Mitos', s: 18, p: 64 },
    { t: 'Lengua · U5 Lectura crítica', s: 26, p: 12 },
    { t: 'Cuestionarios sin conexión', s: 4, p: 100 },
    { t: 'Tutor IA offline (modelo ligero)', s: 38, p: 100 },
  ];

  return (
    <div style={{ minHeight: '100%' }}>
      <Topbar crumb={['Modo rural · baja conectividad']}>
        <span className="chip" style={{ borderColor: 'var(--warn)', color: 'var(--warn)' }}>
          <Icon name="cloudOff" size={11} /> Modo Rural Activo
        </span>
      </Topbar>

      <div style={{ padding: '36px 40px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 32, alignItems: 'center' }}>
          <div>
            <div className="eyebrow">Diseñado para 125 municipios</div>
            <h2 style={{ marginTop: 14, marginBottom: 14 }}>Aprender no debería depender del ancho de banda.</h2>
            <p className="lead">
              Pre-cargamos contenidos, una versión liviana del tutor IA y cuestionarios
              completos. Cuando vuelva la conexión, sincronizamos tu progreso en segundo plano.
            </p>
            <div style={{ display: 'flex', gap: 24, marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
              {[
                ['Tamaño total', '122 MB'],
                ['Funciona sin internet', 'Sí'],
                ['Modelo IA local', '~85 MB']
              ].map(([l, v], i) => (
                <div key={i}>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: 0.08, textTransform: 'uppercase' }}>{l}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <div className="spread" style={{ marginBottom: 16 }}>
              <div className="card-title" style={{ margin: 0 }}>Estado de sincronización</div>
              <span className="chip"><span className="dot" style={{ background: 'var(--warn)' }} />Pendiente · 4 ítems</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16,
                          borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)',
                          marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-2)' }}>Próxima sincronización</div>
                <div style={{ fontSize: 22, fontWeight: 600, marginTop: 4, letterSpacing: '-0.02em' }} className="tnum">Cuando haya señal</div>
              </div>
              <div style={{ width: 56, height: 56, borderRadius: '50%',
                            background: 'rgba(255,255,255,0.04)', border: '1px solid var(--line-2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="refresh" size={20} style={{ color: 'var(--text-1)' }} />
              </div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.5 }}>
              Última sincronización exitosa <strong style={{ color: 'var(--text-0)' }}>hace 2 días</strong> · 3 respuestas, 1 sesión socrática y 6 progreso de módulos pendientes.
            </div>
          </div>
        </div>

        {/* Download list */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="spread" style={{ padding: '18px 20px', borderBottom: '1px solid var(--line)' }}>
            <div className="card-title" style={{ margin: 0 }}>Paquete educativo descargado</div>
            <span style={{ fontSize: 11, color: 'var(--text-2)' }}>4 de 6 listos · 84 MB usados</span>
          </div>
          {items.map((it, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1.4fr 1.2fr 80px 100px',
                                   alignItems: 'center', gap: 16,
                                   padding: '14px 20px', borderBottom: i < items.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: 6,
                            background: it.p === 100 ? 'var(--accent-soft)' : 'rgba(255,255,255,0.04)',
                            color: it.p === 100 ? 'var(--accent)' : 'var(--text-2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={it.p === 100 ? 'check' : 'download'} size={13} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{it.t}</div>
                <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{it.p === 100 ? 'Disponible offline' : 'Descargando…'} · {it.s} MB</div>
              </div>
              <div className="bar"><i style={{ width: `${it.p}%` }} /></div>
              <div style={{ fontSize: 11, fontWeight: 500 }} className="tnum">{it.p}%</div>
              <div style={{ textAlign: 'right' }}>
                {it.p === 100 ? <span className="chip"><Icon name="check" size={10} /> Listo</span> :
                  <span style={{ fontSize: 10, color: 'var(--text-3)' }}>Esperando WiFi</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.ScreenOffline = ScreenOffline;

/* ============ Closing — cinematic ============ */
const ScreenClosing = ({ go }) => {
  const [t, setT] = useState(0);
  useEffect(() => {
    let id = setInterval(() => setT(t => Math.min(t + 1, 100)), 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden',
                  background: 'radial-gradient(ellipse at 50% 60%, rgba(80, 180, 140, 0.10), transparent 60%), var(--bg-0)' }}>
      {/* glowing antioquia */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <svg viewBox="0 0 100 80" style={{ width: '100%', height: '100%', opacity: 0.3 + (t / 100) * 0.4 }}>
          {[[12,30],[28,48],[42,22],[58,14],[70,30],[80,50],[60,56],[46,50],[32,70]].map(([x,y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="0.6" fill="var(--accent)" opacity={t > i * 11 ? 1 : 0} />
              <circle cx={x} cy={y} r="2" fill="var(--accent)" opacity="0.1" />
            </g>
          ))}
          {[['12,30','28,48'],['28,48','46,50'],['42,22','46,50'],['46,50','32,70'],
            ['42,22','58,14'],['58,14','70,30'],['70,30','80,50'],['46,50','60,56'],
            ['60,56','80,50'],['60,56','32,70']].map(([a, b], i) => {
            const [ax, ay] = a.split(',');
            const [bx, by] = b.split(',');
            return (
              <line key={i} x1={ax} y1={ay} x2={bx} y2={by}
                    stroke="var(--accent)" strokeWidth="0.15"
                    opacity={t > i * 8 ? 0.5 : 0}
                    style={{ filter: 'drop-shadow(0 0 1px var(--accent))', transition: 'opacity 0.6s' }} />
            );
          })}
        </svg>
      </div>

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', padding: 60, textAlign: 'center' }}>
        <div className="eyebrow" style={{ opacity: t > 10 ? 1 : 0, transition: 'opacity 1s' }}>
          Spark Learn Antioquia · 2026
        </div>
        <h1 style={{
          fontSize: 64, marginTop: 28, marginBottom: 22, maxWidth: 900, letterSpacing: '-0.035em',
          lineHeight: 1.05, opacity: t > 20 ? 1 : 0, transition: 'opacity 1s'
        }}>
          No buscamos reemplazar<br/>la educación humana.<br/>
          <span style={{
            background: 'linear-gradient(90deg, oklch(0.92 0.05 162), oklch(0.74 0.14 162), oklch(0.72 0.13 240))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>Buscamos potenciarla.</span>
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 620, lineHeight: 1.6,
                    opacity: t > 40 ? 1 : 0, transition: 'opacity 1s' }}>
          Spark Learn Antioquia — tecnología con sentido humano para los 125 municipios del departamento.
        </p>

        <div style={{ display: 'flex', gap: 12, marginTop: 50, opacity: t > 60 ? 1 : 0, transition: 'opacity 1s' }}>
          <button className="btn primary" onClick={() => go('landing')}>
            Iniciar recorrido <Icon name="arrow" size={14} />
          </button>
          <button className="btn" onClick={() => go('ethics')}>
            Ver nuestro compromiso ético
          </button>
        </div>

        <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0,
                      display: 'flex', justifyContent: 'center', gap: 32,
                      color: 'var(--text-3)', fontSize: 11, letterSpacing: 0.1, textTransform: 'uppercase',
                      opacity: t > 80 ? 1 : 0, transition: 'opacity 1s' }}>
          <span>Pilar Territorio Educado</span>
          <span>·</span>
          <span>Agenda Antioquia 2040</span>
          <span>·</span>
          <span>Equipo 8 · Universidad EAFIT</span>
        </div>
      </div>
    </div>
  );
};

window.ScreenClosing = ScreenClosing;
