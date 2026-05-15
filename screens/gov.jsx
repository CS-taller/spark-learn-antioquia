/* ============ Panel Gubernamental — Antioquia ============ */
const ScreenGov = ({ go }) => {
  const [subregion, setSubregion] = useState('valle');
  const sub = {
    urabá:     { conn: 38, comp: 54, brecha: 'Alta', estudiantes: '24,820', tendencia: 'mejora', d: [42,44,45,48,50,51,53,54] },
    occidente: { conn: 52, comp: 61, brecha: 'Media', estudiantes: '11,402', tendencia: 'estable', d: [58,59,60,60,61,61,61,61] },
    norte:     { conn: 68, comp: 67, brecha: 'Media', estudiantes: '14,680', tendencia: 'mejora', d: [60,61,62,64,65,66,67,67] },
    bajocauca: { conn: 31, comp: 47, brecha: 'Alta', estudiantes: '9,540', tendencia: 'mejora', d: [38,40,42,43,44,45,46,47] },
    nordeste:  { conn: 44, comp: 56, brecha: 'Alta', estudiantes: '8,260', tendencia: 'mejora', d: [48,50,52,53,54,55,55,56] },
    magdalena: { conn: 49, comp: 60, brecha: 'Media', estudiantes: '6,890', tendencia: 'estable', d: [58,59,60,60,60,60,60,60] },
    oriente:   { conn: 79, comp: 72, brecha: 'Baja', estudiantes: '22,500', tendencia: 'mejora', d: [65,66,68,69,70,71,72,72] },
    valle:     { conn: 94, comp: 81, brecha: 'Baja', estudiantes: '38,100', tendencia: 'mejora', d: [72,74,76,77,78,79,80,81] },
    suroeste:  { conn: 61, comp: 64, brecha: 'Media', estudiantes: '12,720', tendencia: 'estable', d: [60,61,62,63,63,64,64,64] },
  }[subregion];

  return (
    <div style={{ minHeight: '100%' }}>
      <Topbar crumb={['Antioquia', 'Observatorio Territorio Educado']} role="Gobierno" name="S. Educación">
        <span className="chip"><span className="dot" />Datos en vivo · 14 may 2026</span>
        <button className="btn ghost sm"><Icon name="download" size={12} /> Exportar</button>
      </Topbar>

      <div style={{ padding: '28px 40px 60px', display: 'flex', flexDirection: 'column', gap: 22 }}>
        {/* Header KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
          <Stat label="Estudiantes activos" value="148,920" delta="+3.2% mes" />
          <Stat label="Cobertura municipios" value="125/125" />
          <Stat label="Comprensión promedio" value="64.2%" delta="+8.1 vs 2025" />
          <Stat label="Brecha urbano-rural" value="-14 pts" accent="var(--accent)" delta="↓ 6 pts" />
          <Stat label="Modo baja conectividad" value="38%" delta="del uso total" />
          <Stat label="Docentes activos" value="9,140" />
        </div>

        {/* Map + side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
          <div className="card" style={{ padding: 24, position: 'relative' }}>
            <div className="spread" style={{ marginBottom: 18 }}>
              <div>
                <div className="card-title" style={{ margin: 0 }}>Brechas educativas · subregiones</div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>
                  Clic en una subregión para ver el detalle territorial.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[
                  ['Comprensión', true],
                  ['Conectividad'],
                  ['Acceso']
                ].map(([l, a], i) => (
                  <span key={i} className="chip" style={{
                    borderColor: a ? 'var(--accent)' : 'var(--line-2)',
                    background: a ? 'var(--accent-soft)' : 'transparent',
                    color: a ? 'var(--text-0)' : 'var(--text-2)'
                  }}>
                    {a && <span className="dot" />}{l}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', minHeight: 380 }}>
              <AntioquiaMap active={[subregion]} highlight={subregion} onPick={setSubregion} />
            </div>
            {/* legend */}
            <div style={{ display: 'flex', gap: 14, padding: 12, borderTop: '1px solid var(--line)', marginTop: 14,
                          fontSize: 10, color: 'var(--text-3)', letterSpacing: 0.06, textTransform: 'uppercase' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)' }} />
                Activa
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--text-3)' }} />
                Otras subregiones
              </span>
              <span style={{ marginLeft: 'auto' }}>Fuente: SEDUCA · agregado · anonimizado</span>
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <div className="card-title">Detalle · {subregion === 'valle' ? 'Valle de Aburrá' : subregion === 'magdalena' ? 'Magdalena Medio' : subregion === 'bajocauca' ? 'Bajo Cauca' : subregion.charAt(0).toUpperCase() + subregion.slice(1)}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 18 }}>
              <Mini2 label="Estudiantes" v={sub.estudiantes} />
              <Mini2 label="Conectividad" v={`${sub.conn}%`} color={sub.conn > 70 ? 'var(--accent)' : sub.conn > 45 ? 'var(--warn)' : 'var(--danger)'} />
              <Mini2 label="Comprensión" v={`${sub.comp}%`} />
              <Mini2 label="Brecha" v={sub.brecha} color={sub.brecha === 'Alta' ? 'var(--danger)' : sub.brecha === 'Media' ? 'var(--warn)' : 'var(--accent)'} />
              <Mini2 label="Tendencia 8 sem" v={sub.tendencia === 'mejora' ? '↑ mejora' : '~ estable'} color={sub.tendencia === 'mejora' ? 'var(--accent)' : 'var(--text-1)'} />
              <Mini2 label="Modo offline" v={sub.conn < 50 ? '64%' : '22%'} />
            </div>
            <div style={{ paddingTop: 14, borderTop: '1px solid var(--line)' }}>
              <div style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: 0.08, textTransform: 'uppercase', marginBottom: 8 }}>Comprensión · evolución</div>
              <Spark data={sub.d} height={48} />
            </div>
          </div>
        </div>

        {/* Bottom: comparative + actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
          <div className="card" style={{ padding: 24 }}>
            <div className="spread" style={{ marginBottom: 18 }}>
              <div className="card-title" style={{ margin: 0 }}>Comparativa subregional · comprensión vs conectividad</div>
              <span style={{ fontSize: 10, color: 'var(--text-3)' }}>Cada barra = 1 subregión</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 200, padding: '0 4px' }}>
              {Object.entries({
                'Urabá': 54, 'Bajo Cauca': 47, 'Nordeste': 56, 'Magd. Medio': 60,
                'Occidente': 61, 'Suroeste': 64, 'Norte': 67, 'Oriente': 72, 'Valle Ab.': 81
              }).map(([n, v], i) => (
                <div key={n} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ position: 'relative', width: '100%', height: 160, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <div style={{ width: '60%', height: `${v}%`,
                                   background: v > 70 ? 'var(--accent)' : v > 55 ? 'oklch(0.78 0.13 70)' : 'oklch(0.7 0.16 25)',
                                   opacity: 0.85, borderRadius: '4px 4px 0 0',
                                   boxShadow: v > 70 ? '0 0 20px var(--accent-glow)' : 'none' }} />
                    <span style={{ position: 'absolute', top: `${100 - v - 6}%`, fontSize: 10, fontWeight: 600 }} className="tnum">{v}%</span>
                  </div>
                  <span style={{ fontSize: 9, color: 'var(--text-3)', letterSpacing: 0.04, textAlign: 'center' }}>{n}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 24, background: 'linear-gradient(180deg, oklch(0.74 0.14 162 / 0.04), transparent)',
                                          borderColor: 'oklch(0.74 0.14 162 / 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Icon name="sparkles" size={14} style={{ color: 'var(--accent)' }} />
              <div className="card-title" style={{ margin: 0, color: 'var(--accent)' }}>Recomendaciones de política pública</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { t: 'Bajo Cauca · Conectividad crítica', d: 'Priorizar despliegue offline y dotación de tablets en 18 IE rurales.', prio: 'Alta' },
                { t: 'Urabá · Brecha en lectoescritura', d: 'Refuerzo de programas multimodales en grados 6–8.', prio: 'Alta' },
                { t: 'Nordeste · Mejora sostenida', d: 'Replicar modelo de tutoría híbrida en Yolombó hacia Segovia.', prio: 'Media' },
                { t: 'Valle de Aburrá · Optimización', d: 'Migrar estudiantes avanzados a módulos de pensamiento crítico.', prio: 'Baja' },
              ].map((r, i) => (
                <div key={i} style={{ padding: 12, borderRadius: 10, background: 'rgba(255,255,255,0.025)',
                                       border: '1px solid var(--line)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 500 }}>{r.t}</span>
                    <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 999,
                                    color: r.prio === 'Alta' ? 'var(--danger)' : r.prio === 'Media' ? 'var(--warn)' : 'var(--text-3)',
                                    background: r.prio === 'Alta' ? 'oklch(0.7 0.16 25 / 0.1)' : r.prio === 'Media' ? 'oklch(0.78 0.13 70 / 0.1)' : 'rgba(255,255,255,0.04)',
                                    letterSpacing: 0.06, textTransform: 'uppercase' }}>{r.prio}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.5 }}>{r.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Mini2 = ({ label, v, color }) => (
  <div>
    <div style={{ fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 0.1 }}>{label}</div>
    <div style={{ fontSize: 18, fontWeight: 600, color: color || 'var(--text-0)', marginTop: 4, letterSpacing: '-0.02em' }} className="tnum">{v}</div>
  </div>
);

window.ScreenGov = ScreenGov;
