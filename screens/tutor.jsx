/* ============ Tutor Socrático IA — escena central ============ */
const SOCRATIC_THREAD = [
  { role: 'user',
    text: '¿Cómo hacen las plantas para comer si no tienen boca?' },
  { role: 'ai',
    reasoning: ['Detectar nivel del estudiante: 9°', 'Evitar respuesta directa', 'Recurrir a analogía visible', 'Hacer contrapregunta socrática'],
    text: 'Buena pregunta, María. Antes de responderte, hagamos algo juntos: ¿alguna vez has visto una planta volverse amarilla cuando no recibe suficiente sol?',
    chips: ['Sí, en mi casa', 'No realmente', 'Cuéntame más'] },
  { role: 'user',
    text: 'Sí, una vez mi mamá tenía una mata en la sala y se puso amarilla.' },
  { role: 'ai',
    reasoning: ['Confirmar observación', 'Conectar con concepto: necesidad de luz', 'Introducir analogía con cocinar'],
    text: '¡Exacto! Lo que viste es muy importante. Las plantas necesitan luz como nosotros necesitamos comida. Ahora, una segunda pregunta: si las plantas no van al mercado, ¿de dónde crees que sacan sus ingredientes para "cocinar" su propio alimento?',
    diagram: 'sun-water-co2' },
  { role: 'user',
    text: 'Mmm... ¿del agua y del aire?' },
  { role: 'ai',
    reasoning: ['Reforzar acierto', 'Nombrar el proceso', 'Cerrar con síntesis', 'Ofrecer profundizar'],
    text: 'Vas muy bien. Las plantas son como pequeñas cocinas solares: con agua de la tierra, dióxido de carbono del aire y energía del sol, fabrican su propio azúcar. A ese proceso lo llamamos fotosíntesis. ¿Quieres que veamos juntos un diagrama o lo conectamos con un experimento que puedes hacer en casa?',
    chips: ['Ver diagrama', 'Hacer un experimento', 'Otra pregunta'] },
];

const ScreenTutor = ({ go }) => {
  const [shown, setShown] = useState(2);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [showReasoning, setShowReasoning] = useState(true);
  const [pedagogy, setPedagogy] = useState([
    ['Socrático', true], ['Analogías concretas', true], ['Contrapreguntas', true],
    ['Respuesta directa', false], ['Memorización', false],
  ]);
  const scrollRef = useRef(null);

  const speakLast = () => {
    const last = SOCRATIC_THREAD.slice(0, shown).filter(m => m.role === 'ai').at(-1);
    if (!last) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(last.text);
    u.lang = 'es-CO'; u.rate = 0.88; u.pitch = 1.05;
    window.speechSynthesis.speak(u);
  };

  const handleResource = (r) => {
    if (r.icon === 'audio') {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance('Las plantas son cocinas solares vivas. Con luz, agua y dióxido de carbono fabrican su propio alimento, el azúcar. A este proceso lo llamamos fotosíntesis. Sin las plantas, casi ninguna forma de vida podría existir en nuestro planeta.');
      u.lang = 'es-CO'; u.rate = 0.88;
      window.speechSynthesis.speak(u);
    } else if (r.icon === 'book') {
      const txt = 'RESUMEN · La fotosíntesis\n\nConcepto: Las plantas son cocinas solares vivas.\n\nIngredientes:\n  • Luz solar\n  • Agua (H₂O) desde la tierra\n  • Dióxido de carbono (CO₂) del aire\n\nProducto: Glucosa (C₆H₁₂O₆) + Oxígeno (O₂)\n\nEcuación:\n  6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂\n\nMnemónica: "Luz + Agua + Aire = Azúcar"\n\nGenerado por EduAntioquia · Tutor Socrático IA\nSesión: María T. · 2026-05-15';
      const blob = new Blob([txt], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'resumen-fotosintesis.txt'; a.click();
      URL.revokeObjectURL(url);
    } else if (r.icon === 'play') {
      const el = document.querySelector('svg[viewBox="0 0 320 120"]');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [shown, typing]);

  const advance = () => {
    if (shown >= SOCRATIC_THREAD.length) return;
    const next = SOCRATIC_THREAD[shown];
    if (next.role === 'user') {
      setShown(s => s + 1);
    } else {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setShown(s => s + 1);
      }, 1400);
    }
  };

  const handleChip = (c) => {
    // simulate user reply, then ai
    setInput('');
    advance(); // pushes the prepared user reply
    setTimeout(advance, 400); // then ai
  };

  const handleSend = () => {
    if (shown >= SOCRATIC_THREAD.length) return;
    setInput('');
    advance();
    setTimeout(advance, 400);
  };

  return (
    <div style={{ minHeight: '100%', display: 'grid', gridTemplateColumns: '1fr 320px', gridTemplateRows: 'auto 1fr',
                  height: '100vh' }}>
      {/* Top spanning full width */}
      <div style={{ gridColumn: '1 / -1' }}>
        <Topbar crumb={['Tutor IA', 'Sesión socrática · Fotosíntesis']}>
          <span className="chip ai"><span className="dot" />Modo socrático</span>
          <button className="btn ghost sm" onClick={() => setShowReasoning(s => !s)}>
            <Icon name="eye" size={12} /> {showReasoning ? 'Ocultar' : 'Ver'} razonamiento
          </button>
          <button className="btn ghost sm" onClick={speakLast}><Icon name="audio" size={12} /> Voz</button>
        </Topbar>
      </div>

      {/* Conversation */}
      <div ref={scrollRef} style={{ overflow: 'auto', padding: '32px 80px 24px',
                                     background: 'radial-gradient(800px 600px at 50% -10%, rgba(70, 130, 200, 0.05), transparent)'  }}>
        <div style={{ maxWidth: 740, margin: '0 auto' }}>
          {/* Header card */}
          <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: 24, marginBottom: 32,
                        borderRadius: 'var(--radius-lg)', border: '1px solid var(--line)',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.025), transparent)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, position: 'relative',
                          background: 'radial-gradient(circle at 30% 30%, oklch(0.78 0.13 240), oklch(0.45 0.1 240))',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 0 30px oklch(0.72 0.13 240 / 0.3)' }}>
              <Icon name="sparkles" size={20} style={{ color: 'white' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>EduAntioquia · Tutor Socrático</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
                Hago contrapreguntas, uso analogías y construyo el aprendizaje contigo paso a paso.
                Nunca entrego respuestas directas — te acompaño a descubrirlas.
              </div>
            </div>
            <span className="chip"><Icon name="shield" size={11} /> Supervisado</span>
          </div>

          {/* Messages */}
          {SOCRATIC_THREAD.slice(0, shown).map((m, i) => <Message key={i} m={m} showReasoning={showReasoning} />)}

          {typing && <TypingBubble />}

          {!typing && shown < SOCRATIC_THREAD.length && SOCRATIC_THREAD[shown - 1]?.role === 'ai' && SOCRATIC_THREAD[shown - 1]?.chips && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginLeft: 52, marginBottom: 24 }}>
              {SOCRATIC_THREAD[shown - 1].chips.map((c, i) => (
                <button key={i} onClick={() => handleChip(c)} className="chip"
                        style={{ cursor: 'pointer', padding: '8px 14px', fontSize: 12, borderColor: 'var(--ai)',
                                 background: 'oklch(0.72 0.13 240 / 0.08)' }}>
                  {c}
                </button>
              ))}
            </div>
          )}

          {shown >= SOCRATIC_THREAD.length && (
            <div style={{ marginLeft: 52, padding: 16, borderRadius: 12, border: '1px solid var(--line)',
                          background: 'rgba(255,255,255,0.02)', marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: 0.1, textTransform: 'uppercase', marginBottom: 6 }}>
                Sesión completa
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.5 }}>
                María recorrió 4 contrapreguntas y construyó el concepto desde una observación cotidiana.
                Comprensión estimada: <strong style={{ color: 'var(--accent)' }}>92%</strong>.
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button className="btn sm" onClick={() => go('learning')}>Volver al cuestionario</button>
                <button className="btn sm" onClick={() => go('student')}>Ver mi progreso</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Composer */}
      <div style={{ gridColumn: '1 / 2', borderTop: '1px solid var(--line)', padding: '16px 80px',
                    background: 'linear-gradient(0deg, var(--bg-0), transparent)' }}>
        <div style={{ maxWidth: 740, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 8,
                        borderRadius: 16, border: '1px solid var(--line-2)', background: 'rgba(255,255,255,0.03)' }}>
            <button className="btn ghost sm"><Icon name="plus" size={14} /></button>
            <input value={input} onChange={e => setInput(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && handleSend()}
                   placeholder={shown >= SOCRATIC_THREAD.length ? 'Empezar nueva sesión...' : 'Responde o pregunta lo que quieras...'}
                   style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                            color: 'var(--text-0)', fontSize: 14, padding: '8px 4px' }} />
            <button className="btn ghost sm"><Icon name="audio" size={14} /></button>
            <button className="btn primary sm" onClick={handleSend} disabled={shown >= SOCRATIC_THREAD.length}>
              <Icon name="arrow" size={14} />
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: 'var(--text-3)' }}>
            <span>El tutor te acompañará con preguntas, no con respuestas directas.</span>
            <span><span className="kbd">Enter</span> enviar · <span className="kbd">⇧</span><span className="kbd">↵</span> nueva línea</span>
          </div>
        </div>
      </div>

      {/* Right rail — reasoning trace + tools */}
      <div style={{ gridColumn: '2 / 3', gridRow: '2 / 4', borderLeft: '1px solid var(--line)',
                    padding: 24, overflowY: 'auto', background: 'rgba(255,255,255,0.012)',
                    display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div>
          <div className="card-title">Cadena de razonamiento</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(SOCRATIC_THREAD[Math.min(shown, SOCRATIC_THREAD.length) - 1]?.reasoning || [
              'Esperando respuesta del estudiante...'
            ]).map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 11, lineHeight: 1.45,
                                     color: 'var(--text-2)' }}>
                <span style={{ color: 'var(--ai)', marginTop: 1, fontFamily: 'var(--mono)', fontSize: 10 }}>0{i+1}</span>
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card-title">Marco pedagógico</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pedagogy.map(([l, on], i) => (
              <button key={i} onClick={() => setPedagogy(p => p.map((it, j) => j === i ? [it[0], !it[1]] : it))}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, cursor: 'pointer', width: '100%',
                               color: on ? 'var(--text-0)' : 'var(--text-3)', background: 'none', border: 'none', padding: '2px 0' }}>
                <span style={{ width: 24, height: 14, borderRadius: 7, background: on ? 'var(--accent)' : 'rgba(255,255,255,0.06)',
                               position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
                  <span style={{ position: 'absolute', top: 2, width: 10, height: 10, borderRadius: '50%', background: 'white',
                                 left: on ? 12 : 2, transition: 'left 0.2s' }} />
                </span>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="card-title">Recursos generados</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: 'play', t: 'Diagrama animado · fotosíntesis', d: 'Generado · 0:48' },
              { icon: 'audio', t: 'Audio narrado · 1:12', d: 'Voz cálida · ES-CO' },
              { icon: 'book', t: 'Resumen para tu cuaderno', d: 'TXT · 1 página' },
            ].map((r, i) => (
              <button key={i} className="card" onClick={() => handleResource(r)}
                      style={{ padding: 10, textAlign: 'left', display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }}>
                <span style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--ai-soft)',
                               color: 'var(--ai)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={r.icon} size={12} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.t}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{r.d}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'auto', padding: 12, borderRadius: 10, border: '1px solid var(--line)',
                      background: 'rgba(0,0,0,0.3)', fontSize: 11, color: 'var(--text-2)', lineHeight: 1.5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, color: 'var(--text-0)', fontWeight: 500 }}>
            <Icon name="shield" size={12} style={{ color: 'var(--accent)' }} />
            Esta sesión está siendo supervisada
          </div>
          La docente <strong style={{ color: 'var(--text-0)' }}>Daniela P.</strong> puede revisar las preguntas y la conversación.
        </div>
      </div>
    </div>
  );
};

const Message = ({ m, showReasoning }) => {
  if (m.role === 'user') {
    return (
      <div style={{ display: 'flex', gap: 14, marginBottom: 24, justifyContent: 'flex-end' }}>
        <div style={{ maxWidth: '78%', padding: '14px 18px', borderRadius: '18px 18px 4px 18px',
                      background: 'rgba(255,255,255,0.05)', border: '1px solid var(--line-2)',
                      fontSize: 14, lineHeight: 1.55 }}>
          {m.text}
        </div>
        <span className="avatar" style={{ background: 'linear-gradient(140deg, oklch(0.7 0.12 162), oklch(0.45 0.08 200))' }}>MT</span>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: 'radial-gradient(circle at 30% 30%, oklch(0.78 0.13 240), oklch(0.45 0.1 240))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 18px oklch(0.72 0.13 240 / 0.3)' }}>
        <Icon name="sparkles" size={14} style={{ color: 'white' }} />
      </div>
      <div style={{ flex: 1, maxWidth: '78%' }}>
        {showReasoning && m.reasoning && (
          <div style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: 0.04, marginBottom: 6,
                        fontFamily: 'var(--mono)', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {m.reasoning.map((r, i) => (
              <span key={i} style={{ padding: '2px 7px', borderRadius: 4, background: 'rgba(70, 130, 200, 0.06)',
                                      border: '1px solid rgba(70, 130, 200, 0.16)' }}>{r}</span>
            ))}
          </div>
        )}
        <div style={{ padding: '14px 18px', borderRadius: '4px 18px 18px 18px',
                      background: 'linear-gradient(180deg, rgba(70, 130, 200, 0.06), rgba(70, 130, 200, 0.02))',
                      border: '1px solid oklch(0.72 0.13 240 / 0.18)',
                      fontSize: 14, lineHeight: 1.55 }}>
          {m.text}
          {m.diagram && (
            <div style={{ marginTop: 14, padding: 18, borderRadius: 10,
                          background: 'rgba(0,0,0,0.3)', border: '1px solid var(--line)' }}>
              <svg viewBox="0 0 320 120" width="100%" style={{ maxHeight: 140 }}>
                {/* sun */}
                <circle cx="40" cy="30" r="14" fill="oklch(0.85 0.13 80)" />
                {Array.from({ length: 8 }).map((_, i) => {
                  const a = (i * Math.PI * 2) / 8;
                  return <line key={i} x1={40 + Math.cos(a) * 18} y1={30 + Math.sin(a) * 18} x2={40 + Math.cos(a) * 24} y2={30 + Math.sin(a) * 24} stroke="oklch(0.85 0.13 80)" strokeWidth="1.5" />;
                })}
                {/* arrows to plant */}
                <path d="M 60 36 Q 110 50 150 60" stroke="oklch(0.85 0.13 80)" strokeWidth="1.2" strokeDasharray="2 3" fill="none" />
                {/* plant */}
                <path d="M 160 100 L 160 70" stroke="var(--accent)" strokeWidth="2" />
                <path d="M 160 78 C 145 70, 138 56, 144 44 C 152 54, 162 62, 160 78" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.2" />
                <path d="M 160 70 C 175 64, 184 50, 180 38 C 170 48, 158 56, 160 70" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.2" />
                {/* water arrow */}
                <path d="M 160 110 L 160 102" stroke="oklch(0.72 0.13 240)" strokeWidth="1.5" />
                <text x="160" y="118" textAnchor="middle" fontSize="9" fill="oklch(0.72 0.13 240)">H₂O</text>
                {/* CO2 */}
                <text x="240" y="60" fontSize="10" fill="var(--text-2)">CO₂</text>
                <path d="M 230 56 L 175 60" stroke="var(--text-2)" strokeWidth="1.2" strokeDasharray="2 3" fill="none" />
                {/* glucose out */}
                <text x="240" y="92" fontSize="10" fill="var(--accent)">C₆H₁₂O₆ (energía)</text>
                <path d="M 175 86 L 230 92" stroke="var(--accent)" strokeWidth="1.2" />
                {/* labels */}
                <text x="40" y="60" textAnchor="middle" fontSize="9" fill="var(--text-2)">Sol</text>
                <text x="160" y="14" textAnchor="middle" fontSize="9" fill="var(--text-3)">FOTOSÍNTESIS</text>
              </svg>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 6, fontSize: 11, color: 'var(--text-3)' }}>
          <button className="btn ghost sm" style={{ padding: '2px 8px', fontSize: 10 }}
                  onClick={() => { window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(m.text); u.lang = 'es-CO'; u.rate = 0.88; window.speechSynthesis.speak(u); }}>
            <Icon name="audio" size={10} /> Escuchar
          </button>
          <button className="btn ghost sm" style={{ padding: '2px 8px', fontSize: 10 }}
                  onClick={() => { window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance('Déjame reformularlo de otra manera. ' + m.text); u.lang = 'es-CO'; u.rate = 0.88; window.speechSynthesis.speak(u); }}>
            <Icon name="refresh" size={10} /> Reformular
          </button>
        </div>
      </div>
    </div>
  );
};

const TypingBubble = () => (
  <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
    <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'radial-gradient(circle at 30% 30%, oklch(0.78 0.13 240), oklch(0.45 0.1 240))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon name="sparkles" size={14} style={{ color: 'white' }} />
    </div>
    <div style={{ padding: '16px 18px', borderRadius: '4px 18px 18px 18px',
                  background: 'rgba(70, 130, 200, 0.04)', border: '1px solid oklch(0.72 0.13 240 / 0.18)' }}>
      <span style={{ display: 'inline-flex', gap: 4 }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ai)',
                                  animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </span>
    </div>
  </div>
);

window.ScreenTutor = ScreenTutor;
