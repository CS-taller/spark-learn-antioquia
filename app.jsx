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

const App = () => {
  const [screen, setScreen] = useState('landing');
  const [role, setRole] = useState(null);

  const go = (id) => {
    setScreen(id);
    const stage = document.querySelector('.stage');
    if (stage) stage.scrollTop = 0;
    // also scroll the active screen content to top
    setTimeout(() => {
      const active = document.querySelector(`.screen[data-id="${id}"]`);
      if (active) active.scrollTop = 0;
    }, 50);
  };

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
          <button className="btn ghost sm" style={{ padding: 6 }}><Icon name="settings" size={13} /></button>
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
