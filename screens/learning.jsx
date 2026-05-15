/* ============ Módulo de aprendizaje adaptativo ============ */
const ScreenLearning = ({ go }) => {
  const [step, setStep] = useState(0); // 0 = question, 1 = wrong + adapt, 2 = retry+correct
  const [selected, setSelected] = useState(null);
  const [showAdapt, setShowAdapt] = useState(false);

  const options = [
    { id: 'a', t: 'Absorben la luz del sol con sus raíces.', correct: false },
    { id: 'b', t: 'Transforman la luz, el agua y el CO₂ en azúcar (glucosa).', correct: true },
    { id: 'c', t: 'Comen pequeños insectos por sus tallos.', correct: false },
    { id: 'd', t: 'Reciben alimento sólo del aire.', correct: false },
  ];

  const submit = () => {
    if (selected === 'b') {
      setStep(2);
    } else {
      setStep(1);
      setTimeout(() => setShowAdapt(true), 400);
    }
  };

  const retry = () => {
    setStep(0); setSelected(null); setShowAdapt(false);
  };

  return (
    <div style={{ minHeight: '100%' }}>
      <Topbar crumb={['Aprendizaje', 'Ciencias · U4', 'Fotosíntesis']}>
        <span className="chip"><span className="dot" />Nivel adaptativo 2</span>
        <button className="btn ghost sm"><Icon name="audio" size={12} /> Lectura</button>
      </Topbar>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 0, minHeight: 'calc(100vh - 56px)' }}>
        {/* Main quiz area */}
        <div style={{ padding: '40px 60px 60px', maxWidth: 900, width: '100%', margin: '0 auto' }}>
          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <span style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: 0.1, textTransform: 'uppercase' }}>Pregunta 3 de 8</span>
            <div style={{ flex: 1, display: 'flex', gap: 4 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ flex: 1, height: 3, borderRadius: 2,
                                       background: i < 2 ? 'var(--accent)' : i === 2 ? 'var(--text-1)' : 'rgba(255,255,255,0.06)' }} />
              ))}
            </div>
            <span className="chip muted"><Icon name="star" size={11} /> 240 pts</span>
          </div>

          <div className="eyebrow">Pregunta · razonamiento</div>
          <h2 style={{ marginTop: 16, marginBottom: 24, maxWidth: 720 }}>
            ¿Cómo hacen las plantas para alimentarse si no tienen boca?
          </h2>

          {/* visual diagram placeholder */}
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, marginBottom: 32,
                        padding: 20, border: '1px solid var(--line)', borderRadius: 'var(--radius)',
                        background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ width: 100, height: 100, borderRadius: 12,
                          background: 'radial-gradient(circle, oklch(0.78 0.14 162 / 0.3), oklch(0.5 0.1 162 / 0.05))',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <path d="M28 44 L28 24" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M28 30 C 18 24, 14 14, 20 6 C 24 14, 30 18, 28 30" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.2" />
                <path d="M28 26 C 38 22, 42 12, 36 4 C 32 10, 26 14, 28 26" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.2" />
                <circle cx="46" cy="10" r="4" fill="oklch(0.85 0.12 80)" />
              </svg>
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-1)' }}>
              Observa el diagrama: la planta recibe <strong style={{ color: 'oklch(0.85 0.12 80)' }}>luz solar</strong>,
              absorbe <strong style={{ color: 'var(--ai)' }}>agua</strong> por sus raíces y toma <strong style={{ color: 'var(--text-0)' }}>CO₂</strong> del aire.
              Selecciona la explicación correcta.
            </div>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {options.map((opt) => {
              const isSel = selected === opt.id;
              const showResult = step !== 0;
              let bg = 'rgba(255,255,255,0.02)';
              let border = 'var(--line-2)';
              let color = 'var(--text-0)';
              let icon = null;
              if (showResult && isSel && opt.correct) {
                bg = 'oklch(0.74 0.14 162 / 0.12)'; border = 'var(--accent)';
                icon = <Icon name="check" size={14} style={{ color: 'var(--accent)' }} />;
              } else if (showResult && isSel && !opt.correct) {
                bg = 'oklch(0.7 0.16 25 / 0.1)'; border = 'var(--danger)';
                icon = <Icon name="x" size={14} style={{ color: 'var(--danger)' }} />;
              } else if (showResult && opt.correct) {
                border = 'var(--accent)';
                icon = <Icon name="check" size={14} style={{ color: 'var(--accent)' }} />;
              } else if (isSel) {
                bg = 'rgba(255,255,255,0.04)'; border = 'var(--text-1)';
              }
              return (
                <button key={opt.id} onClick={() => step === 0 && setSelected(opt.id)}
                        disabled={step !== 0}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 16,
                          padding: '16px 20px', borderRadius: 12,
                          background: bg, border: `1px solid ${border}`,
                          color, textAlign: 'left', cursor: step === 0 ? 'pointer' : 'default',
                          transition: 'all 0.2s ease'
                        }}>
                  <span style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(255,255,255,0.06)',
                                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                                 fontSize: 11, fontWeight: 600, color: 'var(--text-2)', flexShrink: 0,
                                 fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>{opt.id}</span>
                  <span style={{ flex: 1, fontSize: 14 }}>{opt.t}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {/* Action row */}
          {step === 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn ghost"><Icon name="lightbulb" size={12} /> Pedir pista al tutor</button>
              <button className="btn primary" disabled={!selected} onClick={submit}
                      style={{ opacity: selected ? 1 : 0.4 }}>
                Comprobar <Icon name="arrow" size={14} />
              </button>
            </div>
          )}

          {/* Adaptive feedback panel */}
          {step === 1 && showAdapt && (
            <div className="card" style={{
              padding: 24, borderColor: 'oklch(0.72 0.13 240 / 0.3)',
              background: 'linear-gradient(180deg, oklch(0.72 0.13 240 / 0.06), transparent)',
              animation: 'fadeUp 0.4s ease both'
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 18 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--ai-soft)',
                              color: 'var(--ai)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="sparkles" size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: 'var(--ai)', letterSpacing: 0.1, textTransform: 'uppercase', fontWeight: 500, marginBottom: 6 }}>
                    Adaptación recomendada
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, marginBottom: 10 }}>
                    No te preocupes. Reformulemos el concepto con un recurso adaptado a tu estilo de aprendizaje visual.
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
                    Detectamos que aprendes mejor con <strong style={{ color: 'var(--text-0)' }}>analogías visuales y audio narrado</strong>.
                    Selecciona uno de los recursos para revisar antes de intentarlo de nuevo.
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
                {[
                  { icon: 'play', t: 'Video 2min', d: 'Animación de fotosíntesis', tag: 'Visual', primary: true },
                  { icon: 'audio', t: 'Audio narrado', d: 'Analogía con la cocina', tag: 'Auditivo' },
                  { icon: 'book', t: 'Explicación simple', d: 'Texto con imágenes', tag: 'Lectura' },
                ].map((r, i) => (
                  <button key={i} style={{
                    padding: 14, borderRadius: 10, textAlign: 'left',
                    background: r.primary ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${r.primary ? 'var(--ai)' : 'var(--line-2)'}`,
                    cursor: 'pointer', transition: 'border-color 0.15s'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6,
                                    background: r.primary ? 'var(--ai-soft)' : 'rgba(255,255,255,0.04)',
                                    color: r.primary ? 'var(--ai)' : 'var(--text-2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={r.icon} size={13} />
                      </div>
                      {r.primary && <span style={{ fontSize: 9, color: 'var(--ai)', letterSpacing: 0.08, textTransform: 'uppercase' }}>Recomendado</span>}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{r.t}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{r.d}</div>
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', alignItems: 'center',
                            paddingTop: 14, borderTop: '1px solid var(--line)' }}>
                <button className="btn ghost sm" onClick={() => go('tutor')}>
                  <Icon name="chat" size={12} /> Hablar con tu tutor IA
                </button>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn ghost" onClick={retry}>Intentar de nuevo</button>
                  <button className="btn primary" onClick={() => setStep(2)}>
                    Continuar <Icon name="arrow" size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="card" style={{ padding: 24, borderColor: 'oklch(0.74 0.14 162 / 0.4)',
                                            background: 'linear-gradient(180deg, oklch(0.74 0.14 162 / 0.08), transparent)' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-soft)',
                              color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="check" size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>¡Excelente razonamiento!</div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>
                    Identificaste correctamente el proceso. Subes a nivel <strong>3</strong>. <span style={{ color: 'var(--accent)' }}>+30 pts</span>
                  </div>
                </div>
                <button className="btn primary" onClick={() => go('tutor')}>
                  Siguiente pregunta <Icon name="arrow" size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right rail — adaptive engine view */}
        <div style={{ borderLeft: '1px solid var(--line)', padding: 24, background: 'rgba(255,255,255,0.012)',
                      display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <div className="card-title">Motor adaptativo</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="chip ai"><span className="dot" />Ajustando</span>
              <span style={{ fontSize: 11, color: 'var(--text-3)' }}>en vivo</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['Dificultad estimada', 'Media', 50],
              ['Comprensión actual', step === 2 ? '92%' : step === 1 ? '54%' : '68%', step === 2 ? 92 : step === 1 ? 54 : 68],
              ['Estilo dominante', 'Visual', 80],
              ['Atención', '14 / 18 min', 78],
            ].map(([l, v, p], i) => (
              <div key={i}>
                <div className="spread" style={{ marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{l}</span>
                  <span style={{ fontSize: 11, fontWeight: 500 }} className="tnum">{v}</span>
                </div>
                <div className="bar"><i style={{ width: `${p}%`, background: i === 1 && step === 1 ? 'var(--warn)' : undefined }} /></div>
              </div>
            ))}
          </div>

          <div style={{ padding: 14, borderRadius: 10, background: 'rgba(0,0,0,0.3)', border: '1px solid var(--line)' }}>
            <div style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: 0.08, textTransform: 'uppercase', marginBottom: 8 }}>Próximas decisiones</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { c: 'Cambiar a modo visual', a: true },
                { c: 'Reducir longitud de sesión', a: step === 1 },
                { c: 'Sugerir audio narrado', a: step === 1 },
                { c: 'Subir dificultad', a: step === 2 },
              ].map((x, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11,
                                      color: x.a ? 'var(--text-0)' : 'var(--text-3)' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%',
                                 background: x.a ? 'var(--ai)' : 'var(--text-3)' }} />
                  {x.c}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 'auto', padding: 14, borderRadius: 10, border: '1px solid var(--line)',
                        background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <Icon name="shield" size={14} style={{ color: 'var(--accent)', marginTop: 1 }} />
              <div style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.5 }}>
                Las decisiones del motor son auditables. Tu docente y tú pueden revisar cómo se ajustó el contenido.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.ScreenLearning = ScreenLearning;
