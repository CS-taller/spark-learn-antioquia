/* ============ Login — role select ============ */
const ScreenLogin = ({ go, setRole }) => {
  const [picked, setPicked] = useState(null);
  const roles = [
    { id: 'estudiante', t: 'Estudiante', d: 'Aprende con tu tutor IA y avanza a tu ritmo.', icon: 'user', go: 'register' },
    { id: 'docente',    t: 'Docente',    d: 'Visualiza el progreso de tu grupo y recibe alertas.', icon: 'teacher', go: 'teacher' },
    { id: 'institución', t: 'Institución', d: 'Administra cursos, sedes y reportes pedagógicos.', icon: 'grad', go: 'teacher' },
    { id: 'gobierno',   t: 'Gobierno',   d: 'Analítica territorial y brechas educativas.', icon: 'gov', go: 'gov' },
  ];

  return (
    <div style={{ minHeight: '100%', display: 'grid', gridTemplateColumns: '1.05fr 1fr', position: 'relative' }}>
      {/* Left: form */}
      <div style={{ padding: '64px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 720 }}>
        <button className="btn ghost sm" onClick={() => go('landing')} style={{ alignSelf: 'flex-start', marginBottom: 32 }}>
          <Icon name="arrowLeft" size={12} /> Volver
        </button>
        <div className="eyebrow">Acceso</div>
        <h2 style={{ marginTop: 16, marginBottom: 12 }}>Bienvenidos a EduAntioquia.</h2>
        <p className="lead" style={{ marginBottom: 40 }}>
          Selecciona el tipo de cuenta. Tu experiencia se adaptará a tu rol, contexto y necesidades.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {roles.map(r => (
            <button key={r.id} className="card"
                    onClick={() => setPicked(r.id)}
                    style={{
                      textAlign: 'left', padding: 20, cursor: 'pointer',
                      borderColor: picked === r.id ? 'var(--accent)' : 'var(--line)',
                      boxShadow: picked === r.id ? '0 0 0 1px var(--accent), 0 0 30px var(--accent-soft)' : 'none',
                      transition: 'all 0.2s ease'
                    }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8,
                              background: picked === r.id ? 'var(--accent-soft)' : 'rgba(255,255,255,0.04)',
                              color: picked === r.id ? 'var(--accent)' : 'var(--text-1)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={r.icon} size={16} />
                </div>
                {picked === r.id && <Icon name="check" size={14} style={{ color: 'var(--accent)' }} />}
              </div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{r.t}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{r.d}</div>
            </button>
          ))}
        </div>

        {/* Credentials (mock) */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: 'var(--text-3)', letterSpacing: 0.08, textTransform: 'uppercase', marginBottom: 6 }}>
                Correo institucional
              </label>
              <input defaultValue="maria.taborda@ie-jose-acevedo.edu.co" style={{
                width: '100%', padding: '10px 14px', borderRadius: 8,
                background: 'rgba(255,255,255,0.03)', border: '1px solid var(--line-2)', color: 'var(--text-0)',
                fontSize: 13, outline: 'none'
              }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: 'var(--text-3)', letterSpacing: 0.08, textTransform: 'uppercase', marginBottom: 6 }}>
                Contraseña
              </label>
              <input type="password" defaultValue="••••••••••" style={{
                width: '100%', padding: '10px 14px', borderRadius: 8,
                background: 'rgba(255,255,255,0.03)', border: '1px solid var(--line-2)', color: 'var(--text-0)',
                fontSize: 13, outline: 'none'
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-2)' }}>
                <input type="checkbox" defaultChecked /> Mantener sesión segura
              </label>
              <a style={{ fontSize: 12, color: 'var(--text-1)' }}>¿Olvidaste tu contraseña?</a>
            </div>
            <button className="btn primary" disabled={!picked}
                    onClick={() => {
                      const r = roles.find(x => x.id === picked);
                      setRole(picked);
                      go(r.go);
                    }}
                    style={{ marginTop: 8, width: '100%', justifyContent: 'center', opacity: picked ? 1 : 0.4 }}>
              Continuar como {picked ? roles.find(x => x.id === picked).t : '...'} <Icon name="arrow" size={14} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-3)', fontSize: 11, justifyContent: 'center' }}>
              <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
              <span>o continuar con</span>
              <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button className="btn">Cuenta del Estado</button>
              <button className="btn">SaberDigital</button>
            </div>
          </div>
        </div>
      </div>

      {/* Right: ambient */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(180deg, #0d1015, #07090c)',
        borderLeft: '1px solid var(--line)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
                      width: 400, height: 400, borderRadius: '50%',
                      background: 'radial-gradient(circle, var(--accent-soft), transparent 60%)',
                      filter: 'blur(40px)' }} />
        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 380, padding: 40 }}>
          <div style={{ display: 'inline-flex', padding: 24, borderRadius: 24,
                        border: '1px solid var(--line-2)', background: 'rgba(255,255,255,0.02)',
                        marginBottom: 32, backdropFilter: 'blur(20px)' }}>
            <Icon name="sparkles" size={28} style={{ color: 'var(--accent)' }} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: 16 }}>
            "El proyecto no busca reemplazar la educación humana. Busca potenciarla."
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', letterSpacing: 0.06, textTransform: 'uppercase' }}>
            Manifiesto · Equipo Spark Learn
          </div>
        </div>

        {/* fine grid lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.4 }} viewBox="0 0 400 600">
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={i} x1="0" y1={i*20} x2="400" y2={i*20} stroke="rgba(255,255,255,0.025)" />
          ))}
        </svg>
      </div>
    </div>
  );
};

window.ScreenLogin = ScreenLogin;
