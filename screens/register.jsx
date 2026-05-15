/* ============ Registro territorial — geoespacial ============ */
const subregions = [
  { id: 'urabá', muni: ['Apartadó', 'Turbo', 'Necoclí', 'Chigorodó', 'Carepa'], conectividad: 38 },
  { id: 'occidente', muni: ['Santa Fe de Antioquia', 'Frontino', 'Sopetrán', 'Dabeiba'], conectividad: 52 },
  { id: 'norte', muni: ['Yarumal', 'Santa Rosa', 'Don Matías', 'Entrerríos'], conectividad: 68 },
  { id: 'bajocauca', muni: ['Caucasia', 'El Bagre', 'Nechí', 'Zaragoza'], conectividad: 31 },
  { id: 'nordeste', muni: ['Segovia', 'Amalfi', 'Vegachí', 'Yolombó'], conectividad: 44 },
  { id: 'magdalena', muni: ['Puerto Berrío', 'Puerto Nare', 'Yondó'], conectividad: 49 },
  { id: 'oriente', muni: ['Rionegro', 'La Ceja', 'Marinilla', 'El Carmen de Viboral', 'Guarne'], conectividad: 79 },
  { id: 'valle', muni: ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Sabaneta', 'Caldas'], conectividad: 94 },
  { id: 'suroeste', muni: ['Andes', 'Jericó', 'Ciudad Bolívar', 'Jardín'], conectividad: 61 },
];

const ScreenRegister = ({ go }) => {
  const [region, setRegion] = useState('oriente');
  const [muni, setMuni] = useState('Rionegro');
  const [grado, setGrado] = useState('9°');
  const [device, setDevice] = useState('shared');
  const [conn, setConn] = useState('intermitente');
  const [needs, setNeeds] = useState(['lectura-fluida']);

  const r = subregions.find(s => s.id === region);

  const toggle = (id) => setNeeds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div style={{ minHeight: '100%' }}>
      <Topbar crumb={['Registro territorial']}>
        <span className="chip"><span className="dot" />Paso 2 de 3</span>
      </Topbar>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 0, minHeight: 'calc(100vh - 56px)' }}>
        {/* Left: form */}
        <div style={{ padding: '36px 40px 60px', maxWidth: 700 }}>
          <div className="eyebrow">Contexto territorial</div>
          <h2 style={{ marginTop: 14, marginBottom: 10 }}>Personalicemos tu experiencia.</h2>
          <p className="lead" style={{ marginBottom: 30 }}>
            Esta información nos permite adaptar contenido, dificultad y modo de
            descarga al contexto real de tu territorio. Solo se comparte de forma
            agregada y anónima con autoridades educativas.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Subregion */}
            <Field label="Subregión" hint="Selecciona en el mapa o aquí">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {subregions.map(s => (
                  <button key={s.id} onClick={() => { setRegion(s.id); setMuni(s.muni[0]); }}
                          className="chip" style={{
                            borderColor: region === s.id ? 'var(--accent)' : 'var(--line-2)',
                            background: region === s.id ? 'var(--accent-soft)' : 'rgba(255,255,255,0.02)',
                            color: region === s.id ? 'var(--text-0)' : 'var(--text-1)',
                            cursor: 'pointer', padding: '6px 12px'
                          }}>
                    {s.id.charAt(0).toUpperCase() + s.id.slice(1).replace('cauca', ' Cauca').replace('valle', 'Valle de Aburrá').replace('magdalena', 'Magdalena Medio')}
                  </button>
                ))}
              </div>
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Municipio">
                <select value={muni} onChange={e => setMuni(e.target.value)} className="select">
                  {r.muni.map(m => <option key={m}>{m}</option>)}
                </select>
              </Field>
              <Field label="Institución educativa">
                <select className="select">
                  <option>I.E. José A. Galán</option>
                  <option>I.E. San José</option>
                  <option>I.E. Normal Superior</option>
                </select>
              </Field>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Grado escolar">
                <div style={{ display: 'flex', gap: 4 }}>
                  {['6°','7°','8°','9°','10°','11°'].map(g => (
                    <button key={g} onClick={() => setGrado(g)} className="seg" style={{
                      background: grado === g ? 'var(--accent-soft)' : 'transparent',
                      color: grado === g ? 'var(--text-0)' : 'var(--text-2)',
                      borderColor: grado === g ? 'var(--accent)' : 'var(--line-2)'
                    }}>{g}</button>
                  ))}
                </div>
              </Field>
              <Field label="Dispositivo disponible">
                <div style={{ display: 'flex', gap: 4 }}>
                  {[['own','Propio'],['shared','Compartido'],['lab','Sala IE']].map(([id, lbl]) => (
                    <button key={id} onClick={() => setDevice(id)} className="seg" style={{
                      background: device === id ? 'var(--accent-soft)' : 'transparent',
                      color: device === id ? 'var(--text-0)' : 'var(--text-2)',
                      borderColor: device === id ? 'var(--accent)' : 'var(--line-2)',
                      flex: 1
                    }}>{lbl}</button>
                  ))}
                </div>
              </Field>
            </div>

            <Field label="Conectividad a internet" hint={`Promedio subregión: ${r.conectividad}%`}>
              <div style={{ display: 'flex', gap: 4 }}>
                {[['estable','Estable'],['intermitente','Intermitente'],['ninguna','Sin conexión']].map(([id, lbl]) => (
                  <button key={id} onClick={() => setConn(id)} className="seg" style={{
                    background: conn === id ? 'var(--accent-soft)' : 'transparent',
                    color: conn === id ? 'var(--text-0)' : 'var(--text-2)',
                    borderColor: conn === id ? 'var(--accent)' : 'var(--line-2)',
                    flex: 1
                  }}>{lbl}</button>
                ))}
              </div>
            </Field>

            <Field label="Necesidades educativas" hint="Selecciona todas las que apliquen">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {[
                  ['lectura-fluida','Apoyo en lectura'],
                  ['atención','Dificultades de atención'],
                  ['visual','Apoyo visual'],
                  ['auditivo','Apoyo auditivo'],
                  ['matemáticas','Refuerzo en matemáticas'],
                  ['ninguna','Ninguna por ahora']
                ].map(([id, lbl]) => (
                  <button key={id} onClick={() => toggle(id)} className="chip" style={{
                    borderColor: needs.includes(id) ? 'var(--accent)' : 'var(--line-2)',
                    background: needs.includes(id) ? 'var(--accent-soft)' : 'rgba(255,255,255,0.02)',
                    color: needs.includes(id) ? 'var(--text-0)' : 'var(--text-1)',
                    cursor: 'pointer', padding: '6px 12px'
                  }}>
                    {needs.includes(id) && <Icon name="check" size={11} />}
                    {lbl}
                  </button>
                ))}
              </div>
            </Field>

            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button className="btn ghost" onClick={() => go('login')}>Atrás</button>
              <button className="btn primary" onClick={() => go('student')}>
                Continuar al perfil <Icon name="arrow" size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: map dashboard */}
        <div style={{ position: 'relative', borderLeft: '1px solid var(--line)',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.012), transparent)',
                      padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="spread">
            <div>
              <div className="eyebrow">Análisis territorial</div>
              <h3 style={{ marginTop: 10 }}>Antioquia · 9 subregiones</h3>
            </div>
            <span className="chip ai"><span className="dot" />Modelo geo-pedagógico</span>
          </div>

          <div style={{ flex: 1, position: 'relative', borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--line)',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.025), transparent)',
                        padding: 24, minHeight: 380 }}>
            <AntioquiaMap active={[region]} highlight={region} onPick={(id) => { setRegion(id); setMuni(subregions.find(s => s.id === id).muni[0]); }} />
          </div>

          {/* Contextual readout */}
          <div className="card glass" style={{ padding: 20 }}>
            <div className="spread" style={{ marginBottom: 14 }}>
              <div>
                <div className="card-title" style={{ margin: 0 }}>Detección contextual</div>
                <div style={{ marginTop: 6, fontWeight: 500, fontSize: 14 }}>{muni} · {region.charAt(0).toUpperCase() + region.slice(1)}</div>
              </div>
              <span className="chip"><span className="dot" />Activo</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              <Mini label="Conectividad" v={`${r.conectividad}%`} color={r.conectividad > 65 ? 'var(--accent)' : 'var(--warn)'} />
              <Mini label="Densidad IE" v="142" />
              <Mini label="Brecha" v={r.conectividad > 70 ? 'Baja' : r.conectividad > 50 ? 'Media' : 'Alta'} color={r.conectividad > 70 ? 'var(--accent)' : 'var(--warn)'} />
            </div>
            <div style={{ marginTop: 14, padding: 12, borderRadius: 10, background: 'rgba(0,0,0,0.3)', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <Icon name="sparkles" size={14} style={{ color: 'var(--ai)', marginTop: 2 }} />
                <div style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text-1)' }}>
                  Activaremos <strong>modo baja conectividad</strong> con contenidos pre-cargables
                  y resaltado en <strong>lectura fluida</strong> según tus selecciones.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .select {
          width: 100%; padding: 10px 14px; border-radius: 8px;
          background: rgba(255,255,255,0.03); border: 1px solid var(--line-2);
          color: var(--text-0); font-size: 13px; outline: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238b919c' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center;
        }
        .seg {
          padding: 8px 12px; border-radius: 8px;
          border: 1px solid var(--line-2); background: transparent;
          font-size: 12px; transition: all 0.15s ease;
        }
      `}</style>
    </div>
  );
};

const Field = ({ label, hint, children }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
      <label style={{ fontSize: 11, color: 'var(--text-2)', letterSpacing: 0.08, textTransform: 'uppercase', fontWeight: 500 }}>{label}</label>
      {hint && <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{hint}</span>}
    </div>
    {children}
  </div>
);

const Mini = ({ label, v, color }) => (
  <div>
    <div style={{ fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 0.1 }}>{label}</div>
    <div style={{ fontSize: 16, fontWeight: 600, color: color || 'var(--text-0)', marginTop: 4 }} className="tnum">{v}</div>
  </div>
);

window.ScreenRegister = ScreenRegister;
