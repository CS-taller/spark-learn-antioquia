/* ============ Perfil del estudiante ============ */
const ScreenStudent = ({ go }) => {
  return (
    <div style={{ minHeight: '100%' }}>
      <Topbar crumb={['Estudiantes', 'María Taborda']}>
        <button className="btn ghost sm"><Icon name="download" size={12} /> Reporte</button>
        <button className="btn sm" onClick={() => go('learning')}>Continuar aprendizaje <Icon name="arrow" size={12} /></button>
      </Topbar>

      <div style={{ padding: '28px 40px 60px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Hero strip */}
        <div className="card" style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center',
                                       background: 'linear-gradient(135deg, rgba(255,255,255,0.04), transparent 60%)' }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: 20,
                          background: 'linear-gradient(140deg, oklch(0.7 0.12 162), oklch(0.45 0.08 200))',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'white', fontSize: 26, fontWeight: 600, border: '1px solid var(--line-2)' }}>
              MT
            </div>
            <div>
              <div className="eyebrow">Grado 9° · I.E. José A. Galán · Rionegro</div>
              <h2 style={{ marginTop: 12 }}>María Taborda</h2>
              <div style={{ display: 'flex', gap: 16, marginTop: 12, color: 'var(--text-2)', fontSize: 12 }}>
                <span>📍 Oriente Antioqueño</span>
                <span>·</span>
                <span>Aprendiz visual + auditivo</span>
                <span>·</span>
                <span>Racha 14 días <span style={{ color: 'var(--accent)' }}>🔥</span></span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Donut value={72} label="Progreso" />
            <Donut value={88} label="Constancia" color="var(--ai)" />
          </div>
        </div>

        {/* Three columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 20 }}>
          {/* Trayectoria */}
          <div className="card" style={{ padding: 24 }}>
            <div className="spread" style={{ marginBottom: 18 }}>
              <div>
                <div className="card-title" style={{ margin: 0 }}>Trayectoria · últimas 12 semanas</div>
                <div style={{ fontSize: 22, fontWeight: 600, marginTop: 6, letterSpacing: '-0.02em' }} className="tnum">
                  +24<span style={{ fontSize: 14, color: 'var(--text-3)', fontWeight: 400 }}> puntos de comprensión</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className="chip muted">Semanal</span>
                <span className="chip"><span className="dot" />Mensual</span>
              </div>
            </div>
            <Spark data={[42, 48, 45, 52, 56, 51, 58, 62, 66, 64, 70, 72]} height={120} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 18 }}>
              {[
                ['Lengua', 78], ['Matemáticas', 62], ['Ciencias', 81], ['Sociales', 74]
              ].map(([l, v]) => (
                <div key={l}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6 }}>
                    <span style={{ color: 'var(--text-2)' }}>{l}</span>
                    <span className="tnum">{v}%</span>
                  </div>
                  <div className="bar"><i style={{ width: `${v}%` }} /></div>
                </div>
              ))}
            </div>
          </div>

          {/* Estilo de aprendizaje */}
          <div className="card" style={{ padding: 24 }}>
            <div className="card-title">Estilo de aprendizaje</div>
            <div style={{ position: 'relative', height: 180 }}>
              <svg width="100%" height="180" viewBox="0 0 200 180">
                <polygon points="100,16 184,70 152,164 48,164 16,70" fill="none" stroke="rgba(255,255,255,0.08)" />
                <polygon points="100,52 156,80 138,144 62,144 44,80" fill="none" stroke="rgba(255,255,255,0.08)" />
                <polygon points="100,88 128,90 124,124 76,124 72,90" fill="none" stroke="rgba(255,255,255,0.08)" />
                {/* student polygon */}
                <polygon points="100,28 170,75 142,150 58,160 30,72" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
                {[
                  { x: 100, y: 8, t: 'Visual' },
                  { x: 192, y: 70, t: 'Auditivo' },
                  { x: 160, y: 174, t: 'Kinético' },
                  { x: 40, y: 174, t: 'Social' },
                  { x: 8, y: 70, t: 'Lectura' }
                ].map((p, i) => (
                  <text key={i} x={p.x} y={p.y} fill="var(--text-2)" fontSize="9" textAnchor="middle">{p.t}</text>
                ))}
              </svg>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5, paddingTop: 8, borderTop: '1px solid var(--line)' }}>
              Predominantemente <strong style={{ color: 'var(--text-0)' }}>visual y auditiva</strong>. Recomendamos diagramas, videos cortos y narraciones.
            </div>
          </div>

          {/* IA Insights */}
          <div className="card" style={{ padding: 24,
                                          background: 'linear-gradient(180deg, oklch(0.72 0.13 240 / 0.06), transparent)',
                                          borderColor: 'oklch(0.72 0.13 240 / 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Icon name="sparkles" size={14} style={{ color: 'var(--ai)' }} />
              <div className="card-title" style={{ margin: 0, color: 'var(--ai)' }}>Insights del tutor IA</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { t: 'Comprende mejor con analogías concretas del entorno rural.', tag: 'Patrón' },
                { t: 'Reduce errores en operaciones con fracciones cuando hay apoyo visual.', tag: 'Refuerzo' },
                { t: 'Pierde atención en sesiones de más de 18 min.', tag: 'Ritmo' },
              ].map((x, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: 12, borderRadius: 10,
                                       background: 'rgba(255,255,255,0.03)', border: '1px solid var(--line)' }}>
                  <div style={{ width: 3, alignSelf: 'stretch', background: 'var(--ai)', borderRadius: 2 }} />
                  <div>
                    <div style={{ fontSize: 9, color: 'var(--ai)', letterSpacing: 0.08, textTransform: 'uppercase', marginBottom: 4 }}>{x.tag}</div>
                    <div style={{ fontSize: 12, lineHeight: 1.5 }}>{x.t}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: 10, fontSize: 11, color: 'var(--text-3)',
                          textAlign: 'center', borderTop: '1px solid var(--line)' }}>
              Supervisado por <strong style={{ color: 'var(--text-1)' }}>Daniela Pérez</strong> · Docente · Hace 2 días
            </div>
          </div>
        </div>

        {/* Modules + activity */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
          <div className="card" style={{ padding: 24 }}>
            <div className="spread" style={{ marginBottom: 18 }}>
              <div className="card-title" style={{ margin: 0 }}>Continúa donde lo dejaste</div>
              <button className="btn ghost sm">Ver todo <Icon name="chevron" size={12} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {[
                { t: 'Fotosíntesis y energía solar', s: 'Ciencias · Unidad 4', p: 65, icon: 'lightbulb' },
                { t: 'Ecuaciones de primer grado', s: 'Matemáticas · Unidad 6', p: 38, icon: 'activity' },
                { t: 'Mitos fundacionales antioqueños', s: 'Sociales · Unidad 3', p: 82, icon: 'book' },
                { t: 'Lectura crítica · ensayo', s: 'Lengua · Unidad 5', p: 14, icon: 'type' },
              ].map((m, i) => (
                <button key={i} className="card" onClick={() => go('learning')}
                        style={{ padding: 16, textAlign: 'left', cursor: 'pointer', transition: 'border-color 0.15s' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--accent-soft)',
                                  color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={m.icon} size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 4 }}>{m.t}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 10 }}>{m.s}</div>
                      <div className="bar" style={{ marginBottom: 4 }}><i style={{ width: `${m.p}%` }} /></div>
                      <div style={{ fontSize: 10, color: 'var(--text-3)' }} className="tnum">{m.p}% · ~{Math.round(20 * (1 - m.p/100))} min restantes</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <div className="card-title">Actividad reciente</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { t: 'Sesión socrática · Fotosíntesis', s: 'Hace 12 min', meta: '+8 min · 4 contrapreguntas', icon: 'chat', c: 'var(--ai)' },
                { t: 'Cuestionario adaptativo', s: 'Hoy 9:14', meta: '7/8 · subió a nivel 3', icon: 'target', c: 'var(--accent)' },
                { t: 'Recurso visualizado · video 4min', s: 'Ayer', meta: 'Recomendado por IA', icon: 'play', c: 'var(--text-2)' },
                { t: 'Tutoría humana · Daniela', s: 'Lun 14:00', meta: 'Acompañamiento', icon: 'user', c: 'var(--text-2)' },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: 14, borderBottom: i < 3 ? '1px solid var(--line)' : 'none' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, color: a.c,
                                background: 'rgba(255,255,255,0.04)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={a.icon} size={13} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{a.t}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{a.s} · {a.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.ScreenStudent = ScreenStudent;
