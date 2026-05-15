/* ============ App shell ============ */
const SCREENS = [
  { id: 'landing',    t: 'Inicio',                 icon: 'home',          group: 'Plataforma',  hint: '⌘ 1' },
  { id: 'tutor',      t: 'Tutor Socrático',        icon: 'sparkles',      group: 'Plataforma',  hint: '⌘ 2', badge: 'IA' },
  { id: 'learning',   t: 'Aprendizaje adaptativo', icon: 'target',        group: 'Plataforma',  hint: '⌘ 3' },
  { id: 'multimodal', t: 'Experiencia multimodal', icon: 'accessibility', group: 'Plataforma',  hint: '⌘ 4' },
  { id: 'offline',    t: 'Modo rural',             icon: 'cloudOff',      group: 'Plataforma',  hint: '⌘ 5' },

  { id: 'student',    t: 'Mi perfil',              icon: 'user',          group: 'Espacios' },
  { id: 'teacher',    t: 'Panel docente',          icon: 'teacher',       group: 'Espacios' },
  { id: 'gov',        t: 'Observatorio',           icon: 'gov',           group: 'Espacios' },

  { id: 'register',   t: 'Contexto territorial',   icon: 'map',           group: 'Cuenta' },
  { id: 'login',      t: 'Acceso',                 icon: 'login',         group: 'Cuenta' },
  { id: 'ethics',     t: 'Ética y privacidad',     icon: 'shield',        group: 'Cuenta' },
  { id: 'closing',    t: 'Manifiesto',             icon: 'star',          group: 'Cuenta' },
];

const SETTINGS_DATA = {
  idioma: 'Español (Colombia)',
  zona: 'Valle de Aburrá · Medellín',
  notificaciones: true,
  alertasPedagogicas: true,
  modoRural: false,
  tamanoTexto: '100%',
  altoContraste: false,
  lectorPantalla: false,
  compartirProgreso: true,
  compartirUbicacion: true,
  datosAnonimizados: true,
};

const App = () => {
  const [screen, setScreen] = useState('landing');
  const [role, setRole] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(SETTINGS_DATA);
  const [settingsToast, setSettingsToast] = useState(false);

  const go = (id) => {
    setScreen(id);
    const stage = document.querySelector('.stage');
    if (stage) stage.scrollTop = 0;
    setTimeout(() => {
      const active = document.querySelector(`.screen[data-id="${id}"]`);
      if (active) active.scrollTop = 0;
    }, 50);
  };

  // Expose go globally for search navigation
  useEffect(() => { window._sparkGo = go; }, []);

  // Keyboard nav for demo
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const i = SCREENS.findIndex(s => s.id === screen);
      if (e.key === ']') { e.preventDefault(); go(SCREENS[Math.min(i+1, SCREENS.length-1)].id); }
      if (e.key === '[') { e.preventDefault(); go(SCREENS[Math.max(i-1, 0)].id); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [screen]);

  const groups = [...new Set(SCREENS.map(s => s.group))];

  const saveSettings = () => {
    setSettingsToast(true);
    setTimeout(() => { setSettingsToast(false); setShowSettings(false); }, 1400);
  };

  const toggle = (k) => setSettings(s => ({ ...s, [k]: !s[k] }));

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="mark" />
          <div className="name">Spark Learn<span>EduAntioquia</span></div>
        </div>

        {groups.map(g => (
          <React.Fragment key={g}>
            <div className="nav-section">{g}</div>
            {SCREENS.filter(s => s.group === g).map(s => (
              <button key={s.id} data-screen-label={s.t}
                      onClick={() => go(s.id)}
                      className={`nav-item ${screen === s.id ? 'active' : ''}`}>
                <Icon name={s.icon} size={15} />
                <span className="label">{s.t}</span>
                {s.badge && <span className="badge">{s.badge}</span>}
                {s.hint && <span className="hint">{s.hint}</span>}
              </button>
            ))}
          </React.Fragment>
        ))}

        <div className="sidebar-foot">
          <span className="pulse" />
          <div style={{ flex: 1 }}>
            <div style={{ color: 'var(--text-1)', fontSize: 12 }}>Workspace · Antioquia</div>
            <div style={{ fontSize: 10, color: 'var(--text-3)' }}>v0.6.2 · actualizado hoy</div>
          </div>
          <button className="btn ghost sm" style={{ padding: 6 }} onClick={() => setShowSettings(true)}>
            <Icon name="settings" size={13} />
          </button>
        </div>
      </aside>

      <main className="stage">
        {SCREENS.map(s => (
          <section key={s.id} data-id={s.id} data-screen-label={`${s.num} ${s.t}`}
                   className={`screen ${screen === s.id ? 'active' : ''}`}>
            {screen === s.id && renderScreen(s.id, go, setRole)}
          </section>
        ))}
      </main>

      {/* Settings modal */}
      {showSettings && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 600, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}
             onClick={() => setShowSettings(false)}>
          <div className="card glass" style={{ width: 520, maxWidth: '95vw', padding: 0, overflow: 'hidden' }}
               onClick={e => e.stopPropagation()}>
            <div className="spread" style={{ padding: '22px 28px', borderBottom: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon name="settings" size={16} style={{ color: 'var(--accent)' }} />
                <h3 style={{ fontSize: 16 }}>Configuración del workspace</h3>
              </div>
              <button className="btn ghost sm" onClick={() => setShowSettings(false)}><Icon name="x" size={14} /></button>
            </div>
            <div style={{ padding: '0 28px', overflowY: 'auto', maxHeight: '70vh' }}>
              {[
                {
                  title: 'General', items: [
                    { label: 'Idioma', value: settings.idioma, type: 'select', opts: ['Español (Colombia)', 'Español (México)', 'English'] },
                    { label: 'Zona territorial', value: settings.zona, type: 'input' },
                  ]
                },
                {
                  title: 'Notificaciones', items: [
                    { label: 'Notificaciones activas', key: 'notificaciones', type: 'toggle' },
                    { label: 'Alertas pedagógicas en tiempo real', key: 'alertasPedagogicas', type: 'toggle' },
                    { label: 'Modo rural (baja conectividad)', key: 'modoRural', type: 'toggle' },
                  ]
                },
                {
                  title: 'Accesibilidad', items: [
                    { label: 'Alto contraste', key: 'altoContraste', type: 'toggle' },
                    { label: 'Lector de pantalla compatible', key: 'lectorPantalla', type: 'toggle' },
                  ]
                },
                {
                  title: 'Privacidad y datos', items: [
                    { label: 'Compartir mi progreso con docentes', key: 'compartirProgreso', type: 'toggle' },
                    { label: 'Compartir ubicación para modo rural', key: 'compartirUbicacion', type: 'toggle' },
                    { label: 'Datos anonimizados para mejorar el sistema', key: 'datosAnonimizados', type: 'toggle' },
                  ]
                },
              ].map((section, si) => (
                <div key={si} style={{ padding: '20px 0', borderBottom: '1px solid var(--line)' }}>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14, fontWeight: 500 }}>{section.title}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {section.items.map((item, ii) => (
                      <div key={ii} className="spread">
                        <span style={{ fontSize: 13, color: 'var(--text-1)' }}>{item.label}</span>
                        {item.type === 'toggle' ? (
                          <button onClick={() => toggle(item.key)}
                                  style={{ width: 36, height: 20, borderRadius: 10, cursor: 'pointer', position: 'relative',
                                           background: settings[item.key] ? 'var(--accent)' : 'rgba(255,255,255,0.08)',
                                           transition: 'background 0.2s', flexShrink: 0 }}>
                            <span style={{ position: 'absolute', top: 2, width: 16, height: 16, borderRadius: '50%', background: 'white',
                                           left: settings[item.key] ? 18 : 2, transition: 'left 0.2s' }} />
                          </button>
                        ) : item.type === 'select' ? (
                          <select defaultValue={item.value}
                                  style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid var(--line-2)',
                                           background: 'var(--bg-3)', color: 'var(--text-0)', fontSize: 12, outline: 'none' }}>
                            {item.opts.map(o => <option key={o}>{o}</option>)}
                          </select>
                        ) : (
                          <input defaultValue={item.value}
                                 style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid var(--line-2)',
                                          background: 'var(--bg-3)', color: 'var(--text-0)', fontSize: 12, outline: 'none', width: 200 }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '18px 28px', display: 'flex', gap: 10, alignItems: 'center' }}>
              <button className="btn primary" onClick={saveSettings}>
                {settingsToast ? <><Icon name="check" size={13} /> Guardado</> : 'Guardar cambios'}
              </button>
              <button className="btn" onClick={() => setShowSettings(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function renderScreen(id, go, setRole) {
  switch (id) {
    case 'landing': return <ScreenLanding go={go} />;
    case 'login': return <ScreenLogin go={go} setRole={setRole} />;
    case 'register': return <ScreenRegister go={go} />;
    case 'student': return <ScreenStudent go={go} />;
    case 'learning': return <ScreenLearning go={go} />;
    case 'tutor': return <ScreenTutor go={go} />;
    case 'teacher': return <ScreenTeacher go={go} />;
    case 'gov': return <ScreenGov go={go} />;
    case 'ethics': return <ScreenEthics go={go} />;
    case 'multimodal': return <ScreenMultimodal go={go} />;
    case 'offline': return <ScreenOffline go={go} />;
    case 'closing': return <ScreenClosing go={go} />;
    default: return null;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
