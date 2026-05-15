/* ============ Ética & Privacidad ============ */
const ScreenEthics = ({ go }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [consents, setConsents] = useState({
    estilo: true, municipio: true, respuestas: true, rendimiento: true, familia: false, identidad: false,
  });

  const toggleConsent = (k) => setConsents(c => ({ ...c, [k]: !c[k] }));

  const downloadData = () => {
    const data = {
      nombre: 'María Taborda',
      documento_id: '****8421',
      municipio: 'Medellín, Antioquia',
      subregion: 'Valle de Aburrá',
      estilo_aprendizaje: 'Visual-kinestésico',
      progreso_general: '72%',
      sesiones_tutor_ia: 12,
      temas_trabajados: ['Fotosíntesis · U4', 'Mitosis · U3', 'Ecosistemas · U5'],
      ultima_sesion: '2026-05-15T14:32:00Z',
      consentimientos_activos: consents,
      datos_ultima_sesion: {
        estilo_aprendizaje: { usado: consents.estilo, proposito: 'Adaptar recursos pedagógicos' },
        municipio_subregion: { usado: consents.municipio, proposito: 'Configurar modo conectividad' },
        ultimas_respuestas: { usado: consents.respuestas, proposito: 'Ajustar nivel de dificultad' },
        rendimiento_historico: { usado: consents.rendimiento, proposito: 'Personalización curricular' },
        nombre_completo: { usado: false, proposito: 'No relevante para la sesión de IA' },
        info_familiar: { usado: false, proposito: 'No solicitado' },
      },
      exportado_el: new Date().toISOString(),
      plataforma: 'EduAntioquia · Spark Learn Antioquia v0.6.2',
      marco_legal: 'Ley 1581 de 2012 · UNESCO IA Educación 2023 · GDPR Art. 20 · ISO 27001',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'mis-datos-eduantioquia.json'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
  <div style={{ minHeight: '100%' }}>
    {showConfig && (
      <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}
           onClick={() => setShowConfig(false)}>
        <div className="card glass" style={{ padding: 0, width: 500, maxWidth: '92vw', overflow: 'hidden' }}
             onClick={e => e.stopPropagation()}>
          <div className="spread" style={{ padding: '22px 28px', borderBottom: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="shield" size={16} style={{ color: 'var(--accent)' }} />
              <h3 style={{ fontSize: 16 }}>Configurar privacidad</h3>
            </div>
            <button className="btn ghost sm" onClick={() => setShowConfig(false)}><Icon name="x" size={14} /></button>
          </div>
          <div style={{ padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, margin: 0 }}>
              Controla exactamente qué información usa la IA para personalizar tu experiencia. Puedes cambiar esto en cualquier momento.
            </p>
            {[
              { k: 'estilo', l: 'Estilo de aprendizaje', d: 'Para adaptar cómo se presentan los contenidos' },
              { k: 'municipio', l: 'Municipio y subregión', d: 'Para configurar modo de conectividad' },
              { k: 'respuestas', l: 'Últimas respuestas (5)', d: 'Para ajustar el nivel de dificultad' },
              { k: 'rendimiento', l: 'Historial de rendimiento', d: 'Para personalización curricular' },
              { k: 'familia', l: 'Información familiar', d: 'Actualmente no se usa' },
              { k: 'identidad', l: 'Nombre completo y documento', d: 'Solo para reportes administrativos' },
            ].map(({ k, l, d }) => (
              <div key={k} className="spread" style={{ padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{l}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{d}</div>
                </div>
                <button onClick={() => toggleConsent(k)}
                        style={{ width: 36, height: 20, borderRadius: 10, cursor: 'pointer', position: 'relative', flexShrink: 0,
                                 background: consents[k] ? 'var(--accent)' : 'rgba(255,255,255,0.08)', transition: 'background 0.2s', border: 'none' }}>
                  <span style={{ position: 'absolute', top: 2, width: 16, height: 16, borderRadius: '50%', background: 'white',
                                 left: consents[k] ? 18 : 2, transition: 'left 0.2s' }} />
                </button>
              </div>
            ))}
          </div>
          <div style={{ padding: '18px 28px', display: 'flex', gap: 10 }}>
            <button className="btn primary" onClick={() => setShowConfig(false)}>Guardar preferencias</button>
            <button className="btn" onClick={() => setShowConfig(false)}>Cancelar</button>
          </div>
        </div>
      </div>
    )}
    <Topbar crumb={['Ética y privacidad']}>
      <span className="chip"><span className="dot" />Auditable</span>
    </Topbar>

    <div style={{ padding: '40px 60px 80px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', marginBottom: 56 }}>
        <div>
          <div className="eyebrow">Compromiso</div>
          <h1 style={{ fontSize: 44, marginTop: 16, marginBottom: 20, letterSpacing: '-0.03em' }}>
            La IA <span style={{ color: 'var(--accent)' }}>acompaña</span>,<br/>no reemplaza.
          </h1>
          <p className="lead">
            Cada decisión del sistema es supervisada, auditable y reversible. Cumplimos
            con la Ley 1581 de protección de datos, los lineamientos UNESCO de IA en
            educación y nuestro propio marco ético interno.
          </p>
        </div>
        <div style={{ position: 'relative', aspectRatio: '1/1', maxWidth: 380, marginLeft: 'auto' }}>
          {/* Shield with rings */}
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
            {[60, 75, 90].map((r, i) => (
              <circle key={i} cx="100" cy="100" r={r} fill="none" stroke="var(--accent)"
                      strokeWidth="0.6" opacity={0.15 + i * 0.1} strokeDasharray="2 4" />
            ))}
            <path d="M100 36 L60 56 L60 100 C60 130 80 155 100 164 C120 155 140 130 140 100 L140 56 Z"
                  fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
            <path d="M82 100 L96 114 L120 86" stroke="var(--accent)" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, var(--accent-soft), transparent 70%)',
                        filter: 'blur(30px)', zIndex: -1 }} />
        </div>
      </div>

      {/* Pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { t: 'Supervisión humana', d: 'Docentes y autoridades educativas revisan y pueden anular cualquier decisión del sistema.', s: '100% de sesiones revisables', icon: 'eye' },
          { t: 'Transparencia algorítmica', d: 'Visualizamos la cadena de razonamiento del tutor IA en cada interacción.', s: '4 modelos auditados públicamente', icon: 'layers' },
          { t: 'Protección de menores', d: 'Datos cifrados, consentimiento informado y minimización por defecto.', s: 'AES-256 · ISO 27001', icon: 'lock' },
          { t: 'No sustitución docente', d: 'El sistema sugiere; el docente decide. Nunca tomamos decisiones disciplinarias o de promoción.', s: 'Política firme', icon: 'teacher' },
          { t: 'Equidad y no discriminación', d: 'Modelos auditados por sesgos territoriales, socioeconómicos y de género.', s: 'Auditoría trimestral', icon: 'shield' },
          { t: 'Consentimiento granular', d: 'Familias y estudiantes deciden qué datos se comparten y con quién.', s: '6 controles configurables', icon: 'check' },
        ].map((p, i) => (
          <div key={i} className="card" style={{ padding: 22 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-soft)',
                          color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <Icon name={p.icon} size={15} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{p.t}</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.55, marginBottom: 14 }}>{p.d}</div>
            <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: 0.08, textTransform: 'uppercase', paddingTop: 10, borderTop: '1px solid var(--line)' }}>
              {p.s}
            </div>
          </div>
        ))}
      </div>

      {/* Transparency widget */}
      <div className="card" style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div>
          <div className="eyebrow">Panel de transparencia · en vivo</div>
          <h3 style={{ marginTop: 14, marginBottom: 14, fontSize: 22 }}>¿Qué datos tiene la plataforma sobre ti?</h3>
          <p style={{ color: 'var(--text-2)', fontSize: 13, lineHeight: 1.6, marginBottom: 22 }}>
            Visualizamos exactamente qué información usa la IA para personalizar tu experiencia.
            Puedes descargar, corregir o eliminar tus datos en cualquier momento.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn primary" onClick={downloadData}><Icon name="download" size={12} /> Descargar mis datos</button>
            <button className="btn" onClick={() => setShowConfig(true)}>Configurar</button>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: 0.08, textTransform: 'uppercase', marginBottom: 12 }}>
            Datos usados en la última sesión
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { l: 'Tu estilo de aprendizaje (auto-detectado)', v: 'Usado', purpose: 'Adaptar recursos' },
              { l: 'Tu municipio y subregión', v: 'Usado', purpose: 'Modo conectividad' },
              { l: 'Tus respuestas a las últimas 5 preguntas', v: 'Usado', purpose: 'Ajustar dificultad' },
              { l: 'Tu nombre completo', v: 'No usado', purpose: 'No relevante' },
              { l: 'Información familiar', v: 'No usado', purpose: 'No solicitado' },
            ].map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                     padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)',
                                     border: '1px solid var(--line)' }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{d.l}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{d.purpose}</div>
                </div>
                <span className="chip" style={{
                  borderColor: d.v === 'Usado' ? 'var(--accent)' : 'var(--line-2)',
                  color: d.v === 'Usado' ? 'var(--accent)' : 'var(--text-3)',
                  background: d.v === 'Usado' ? 'var(--accent-soft)' : 'transparent'
                }}>{d.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

window.ScreenEthics = ScreenEthics;
