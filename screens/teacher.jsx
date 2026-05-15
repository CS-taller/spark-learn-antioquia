/* ============ Panel Docente ============ */
const ScreenTeacher = ({ go }) => {
  const [filter, setFilter] = useState('todos');
  const [showActivity, setShowActivity] = useState(false);
  const [toast, setToast] = useState(null);

  const showMsg = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3500); };

  const students = [
    { n: 'María Taborda', p: 78, risk: 'low', t: 'al día', last: '12 min', s: [60,62,65,68,70,72,74,78] },
    { n: 'Andrés Quintero', p: 42, risk: 'high', t: 'requiere apoyo', last: '2 días', s: [55,50,48,46,44,42,40,42] },
    { n: 'Laura Hincapié', p: 88, risk: 'low', t: 'avanzada', last: '1 h', s: [70,72,75,78,82,84,86,88] },
    { n: 'Daniel Restrepo', p: 51, risk: 'med', t: 'irregular', last: '3 h', s: [45,52,48,55,50,53,49,51] },
    { n: 'Valentina Cano', p: 73, risk: 'low', t: 'al día', last: '20 min', s: [60,63,66,68,69,71,72,73] },
    { n: 'Felipe Sánchez', p: 36, risk: 'high', t: 'requiere apoyo', last: '5 días', s: [48,46,44,42,40,38,37,36] },
    { n: 'Sara Mejía', p: 67, risk: 'med', t: 'al día', last: '8 h', s: [55,58,60,62,64,65,66,67] },
    { n: 'Juan Pablo Echeverri', p: 92, risk: 'low', t: 'avanzada', last: '35 min', s: [72,76,80,84,86,88,90,92] },
  ];

  const riskColor = { low: 'var(--accent)', med: 'var(--warn)', high: 'var(--danger)' };

  const downloadReport = () => {
    const header = 'Nombre,Progreso (%),Estado,Última actividad,Riesgo\n';
    const rows = students.map(s =>
      `"${s.n}",${s.p},"${s.t}","${s.last}","${{ low: 'Bajo', med: 'Medio', high: 'Alto' }[s.risk]}"`
    ).join('\n');
    const blob = new Blob(['\ufeff' + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'reporte-9A-semanal.csv'; a.click();
    URL.revokeObjectURL(url);
    showMsg('Reporte descargado · reporte-9A-semanal.csv');
  };

  const filtered = filter === 'todos' ? students
    : filter === 'apoyo' ? students.filter(s => s.risk === 'high')
    : students.filter(s => s.risk === 'low');

  return (
    <div style={{ minHeight: '100%', position: 'relative' }}>
      {toast && (
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 999, display: 'flex', alignItems: 'center', gap: 10,
                      padding: '12px 18px', borderRadius: 12, background: 'var(--bg-3)', border: '1px solid var(--line-2)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)', fontSize: 13, color: 'var(--text-0)' }}>
          <Icon name="check" size={13} style={{ color: 'var(--accent)' }} />{toast}
        </div>
      )}
      {showActivity && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
             onClick={() => setShowActivity(false)}>
          <div className="card glass" style={{ padding: 32, width: 480, maxWidth: '90vw' }}
               onClick={e => e.stopPropagation()}>
            <div className="spread" style={{ marginBottom: 22 }}>
              <h3>Nueva actividad</h3>
              <button className="btn ghost sm" onClick={() => setShowActivity(false)}><Icon name="x" size={14} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              {[['Tipo', 'Quiz adaptativo'], ['Tema', 'Fotosíntesis — Unidad 4'], ['Asignado a', '9° A · 32 estudiantes'], ['Fecha límite', '2026-05-22']].map(([l, v], i) => (
                <div key={i}>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 0.1, marginBottom: 6 }}>{l}</div>
                  <input defaultValue={v} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--line-2)',
                                                    background: 'rgba(255,255,255,0.04)', color: 'var(--text-0)', fontSize: 13, outline: 'none' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn primary" onClick={() => { setShowActivity(false); showMsg('Actividad "Quiz · Fotosíntesis U4" asignada a 9° A'); }}>
                Crear actividad
              </button>
              <button className="btn" onClick={() => setShowActivity(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      <Topbar crumb={['Panel docente', '9° A · I.E. José A. Galán']} role="Docente" name="Daniela P.">
        <button className="btn ghost sm" onClick={downloadReport}><Icon name="download" size={12} /> Reporte semanal</button>
        <button className="btn sm" onClick={() => setShowActivity(true)}><Icon name="plus" size={12} /> Nueva actividad</button>
      </Topbar>

      <div style={{ padding: '28px 40px 60px', display: 'flex', flexDirection: 'column', gap: 22 }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          <Stat label="Estudiantes" value="32" delta="+2 este mes" />
          <Stat label="Comprensión media" value="68%" delta="+6.4%" />
          <Stat label="Sesiones IA · semana" value="248" />
          <Stat label="Requieren apoyo" value="4" accent="var(--warn)" />
          <Stat label="Sin actividad 7d" value="2" accent="var(--danger)" />
        </div>

        {/* Two col */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
          {/* Class roster */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="spread" style={{ padding: '18px 20px', borderBottom: '1px solid var(--line)' }}>
              <div>
                <div className="card-title" style={{ margin: 0 }}>Estudiantes · 9° A</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[['todos', 'Todos'], ['apoyo', 'Apoyo'], ['avanzados', 'Avanzados']].map(([f, lbl]) => (
                  <button key={f} onClick={() => setFilter(f)}
                          className={`chip ${filter === f ? '' : 'muted'}`} style={{ cursor: 'pointer' }}>
                    {filter === f && <span className="dot" />}{lbl}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ padding: '8px 0' }}>
              {filtered.map((s, i) => (
                <button key={i} onClick={() => go('student')}
                        style={{ display: 'grid', gridTemplateColumns: '32px 1.2fr 80px 1fr 80px 120px 60px',
                                  alignItems: 'center', gap: 14,
                                  padding: '10px 20px', width: '100%', textAlign: 'left', cursor: 'pointer',
                                  borderBottom: i < students.length - 1 ? '1px solid var(--line)' : 'none' }}>
                  <span className="avatar" style={{ width: 28, height: 28, fontSize: 11 }}>
                    {s.n.split(' ').map(x => x[0]).slice(0,2).join('')}
                  </span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{s.n}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-3)' }}>Última actividad · {s.last}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: riskColor[s.risk] }} />
                    <span style={{ fontSize: 11, color: riskColor[s.risk] }}>{s.t}</span>
                  </div>
                  <div>
                    <div className="bar"><i style={{ width: `${s.p}%`, background: riskColor[s.risk] }} /></div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 500 }} className="tnum">{s.p}%</div>
                  <div style={{ opacity: 0.6 }}>
                    <Spark data={s.s} color={riskColor[s.risk]} height={20} fill={false} />
                  </div>
                  <Icon name="chevron" size={12} style={{ color: 'var(--text-3)' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="card" style={{ padding: 22, borderColor: 'oklch(0.78 0.13 70 / 0.3)' }}>
              <div className="spread" style={{ marginBottom: 16 }}>
                <div className="card-title" style={{ margin: 0, color: 'var(--warn)' }}>Alertas pedagógicas</div>
                <span className="chip" style={{ borderColor: 'var(--warn)', color: 'var(--warn)' }}>4 nuevas</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { n: 'Felipe Sánchez', m: 'Sin actividad por 5 días. Considera contacto familiar.', tag: 'Inactividad', color: 'var(--danger)' },
                  { n: 'Andrés Quintero', m: 'Comprensión cayendo en matemáticas. Sugerimos sesión 1:1.', tag: 'Riesgo', color: 'var(--danger)' },
                  { n: 'Grupo 9°A', m: '5 estudiantes coinciden en errores con ecuaciones lineales.', tag: 'Patrón grupal', color: 'var(--warn)' },
                  { n: 'Daniel R.', m: 'Patrón de respuestas erráticas — posible fatiga cognitiva.', tag: 'Atención', color: 'var(--warn)' },
                ].map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: 12, borderRadius: 10,
                                         background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)' }}>
                    <div style={{ width: 3, background: a.color, borderRadius: 2, alignSelf: 'stretch' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 500 }}>{a.n}</span>
                        <span style={{ fontSize: 9, color: a.color, letterSpacing: 0.08, textTransform: 'uppercase' }}>{a.tag}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.45 }}>{a.m}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 22 }}>
              <div className="card-title">Mapa de comprensión · 9° A</div>
              <Heatmap />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 10, color: 'var(--text-3)' }}>
                <span>Bajo</span>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[0.1, 0.25, 0.4, 0.6, 0.85].map((o, i) => (
                    <span key={i} style={{ width: 14, height: 8, borderRadius: 2, background: `oklch(0.74 0.14 162 / ${o})` }} />
                  ))}
                </div>
                <span>Alto</span>
              </div>
            </div>
          </div>
        </div>

        {/* IA insights for class */}
        <div className="card" style={{ padding: 24,
                                        background: 'linear-gradient(180deg, oklch(0.72 0.13 240 / 0.04), transparent)',
                                        borderColor: 'oklch(0.72 0.13 240 / 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <Icon name="sparkles" size={14} style={{ color: 'var(--ai)' }} />
            <div className="card-title" style={{ margin: 0, color: 'var(--ai)' }}>Insights de la IA para tu clase</div>
            <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-3)' }}>Generado hace 14 min · revisable</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { t: '5 estudiantes confunden mitosis con meiosis', d: 'Recomendamos un mini-video de 90s con animación comparativa antes de la próxima clase.', a: 'Generar recurso' },
              { t: 'Pico de comprensión los martes 9-11am', d: 'Tu grupo aprende mejor en este horario. Programa los temas más difíciles aquí.', a: 'Ajustar calendario' },
              { t: 'Ana y Sebastián podrían formar pareja de estudio', d: 'Estilos complementarios y horarios coincidentes en la plataforma.', a: 'Sugerir colaboración' },
            ].map((x, i) => (
              <div key={i} style={{ padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--line)' }}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, lineHeight: 1.4 }}>{x.t}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 14 }}>{x.d}</div>
                <button className="btn ghost sm" style={{ padding: '4px 0', color: 'var(--ai)' }}
                        onClick={() => showMsg(`IA: "${x.a}" iniciada — ${x.t}`)}>{x.a} <Icon name="arrow" size={11} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Heatmap = () => {
  // 8 students x 6 topics
  const seed = (i, j) => {
    const s = Math.sin((i + 1) * 12.9898 + (j + 1) * 78.233) * 43758.5453;
    return s - Math.floor(s);
  };
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(6, 1fr)', gap: 4, marginBottom: 6 }}>
        <div></div>
        {['Foto', 'Mit', 'Cel', 'Eco', 'Gen', 'Evo'].map((t, j) => (
          <div key={j} style={{ fontSize: 9, color: 'var(--text-3)', textAlign: 'center', letterSpacing: 0.05, textTransform: 'uppercase' }}>{t}</div>
        ))}
      </div>
      {['Maria', 'Andrés', 'Laura', 'Daniel', 'Valen', 'Felipe', 'Sara', 'Juan P.'].map((n, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px repeat(6, 1fr)', gap: 4, marginBottom: 4 }}>
          <div style={{ fontSize: 10, color: 'var(--text-2)' }}>{n}</div>
          {Array.from({ length: 6 }).map((_, j) => {
            const v = seed(i, j);
            return (
              <div key={j} style={{ height: 14, borderRadius: 3,
                                     background: `oklch(0.74 0.14 162 / ${0.1 + v * 0.8})` }} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

window.ScreenTeacher = ScreenTeacher;
