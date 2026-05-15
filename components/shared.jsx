/* ============ Shared components & icons ============ */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// Icons (16x16 stroke based)
const Icon = ({ name, size = 16, ...rest }) => {
  const paths = {
    sparkles: <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />,
    home: <path d="M3 11l9-8 9 8M5 10v10h14V10" />,
    login: <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />,
    map: <path d="M9 3l-6 3v15l6-3 6 3 6-3V3l-6 3-6-3zM9 3v15M15 6v15" />,
    user: <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />,
    book: <path d="M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5v14zM4 19.5A2.5 2.5 0 006.5 22H20v-5" />,
    chat: <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />,
    teacher: <path d="M22 10v6M2 10l10-5 10 5-10 5L2 10zM6 12v5c0 1 4 3 6 3s6-2 6-3v-5" />,
    gov: <path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6M9 10h.01M15 10h.01M12 7h.01" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4" />,
    accessibility: <circle cx="12" cy="4" r="2" />,
    wifi: <path d="M5 12.55a11 11 0 0114 0M8.5 16.05a6 6 0 017 0M2 8.82a15 15 0 0120 0M12 20h.01" />,
    play: <path d="M5 3l14 9-14 9V3z" />,
    arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
    arrowLeft: <path d="M19 12H5M12 5l-7 7 7 7" />,
    plus: <path d="M12 5v14M5 12h14" />,
    check: <path d="M20 6L9 17l-5-5" />,
    x: <path d="M18 6L6 18M6 6l12 12" />,
    chevron: <path d="M9 18l6-6-6-6" />,
    settings: <path d="M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51h0a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />,
    search: <path d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />,
    bell: <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />,
    star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
    flag: <path d="M4 22V3M4 14h12l2-6H4" />,
    eye: <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z" />,
    lightbulb: <path d="M9 18h6M10 22h4M12 2a7 7 0 014 12.7c-1 .9-1.5 1.9-1.5 3.3h-5c0-1.4-.5-2.4-1.5-3.3A7 7 0 0112 2z" />,
    download: <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />,
    cloud: <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />,
    cloudOff: <path d="M22.61 16.95A5 5 0 0018 10h-1.26a8 8 0 00-7.05-6M5 5a8 8 0 004 15h9a5 5 0 001.7-.3M1 1l22 22" />,
    audio: <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />,
    type: <path d="M4 7V4h16v3M9 20h6M12 4v16" />,
    sparkle: <path d="M12 3l1.5 5L18 9.5 13.5 11 12 16l-1.5-5L6 9.5 10.5 8 12 3z" />,
    refresh: <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />,
    lock: <path d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4" />,
    activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    target: <circle cx="12" cy="12" r="10" />,
    grad: <path d="M22 10L12 5 2 10l10 5 10-5zM6 12v5c3 3 9 3 12 0v-5" />,
    layers: <path d="M12 2l10 6-10 6L2 8l10-6zM2 16l10 6 10-6M2 12l10 6 10-6" />,
  };
  // for icons that are paths only
  const content = paths[name] || paths.sparkles;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {content}
    </svg>
  );
};

// Antioquia abstract map (used in landing + register + gov)
const AntioquiaMap = ({ active = [], onPick, highlight, dimGrid = false }) => {
  // Approximate cluster of regions/municipios (relative coords)
  const regions = [
    { id: 'urabá',     name: 'Urabá',           x: 12,  y: 30, n: 9 },
    { id: 'occidente', name: 'Occidente',       x: 28,  y: 48, n: 7 },
    { id: 'norte',     name: 'Norte',           x: 42,  y: 22, n: 6 },
    { id: 'bajocauca', name: 'Bajo Cauca',      x: 58,  y: 14, n: 5 },
    { id: 'nordeste',  name: 'Nordeste',        x: 70,  y: 30, n: 4 },
    { id: 'magdalena', name: 'Magdalena Medio', x: 80,  y: 50, n: 4 },
    { id: 'oriente',   name: 'Oriente',         x: 60,  y: 56, n: 8 },
    { id: 'valle',     name: 'Valle de Aburrá', x: 46,  y: 50, n: 10 },
    { id: 'suroeste',  name: 'Suroeste',        x: 32,  y: 70, n: 7 },
  ];
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
      <svg viewBox="0 0 100 80" className="map-svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* connecting lines */}
        <path d="M12 30 L28 48 L46 50 L32 70" />
        <path d="M28 48 L42 22 L58 14 L70 30 L80 50 L60 56 L46 50" />
        <path d="M42 22 L46 50" />
        <path d="M70 30 L60 56" />
        <path d="M46 50 L60 56 L32 70" />
        {/* glow paths between selected nodes */}
        {regions.map(r => active.includes(r.id) && (
          <circle key={r.id+'g'} cx={r.x} cy={r.y} r="3" fill="none" stroke="currentColor" style={{ color: 'var(--accent)', opacity: 0.3 }} />
        ))}
      </svg>
      {regions.map(r => {
        const isActive = active.includes(r.id);
        const isHi = highlight === r.id;
        return (
          <button key={r.id}
                  onClick={() => onPick && onPick(r.id)}
                  className="map-node"
                  style={{ position: 'absolute', left: `${r.x}%`, top: `${r.y}%`, transform: 'translate(-50%, -50%)',
                           display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                           cursor: onPick ? 'pointer' : 'default' }}>
            <span className={`node ${isActive ? '' : 'dim'}`} style={{
              position: 'relative', width: isHi ? 12 : (isActive ? 10 : 6), height: isHi ? 12 : (isActive ? 10 : 6),
              background: isActive ? 'var(--accent)' : 'var(--text-3)',
              boxShadow: isActive ? '0 0 0 4px var(--accent-soft), 0 0 18px var(--accent-glow)' : '0 0 0 3px rgba(255,255,255,0.04)',
              transition: 'all 0.2s ease',
            }} />
            <span style={{ fontSize: 9, color: isActive ? 'var(--text-0)' : 'var(--text-3)', letterSpacing: 0.04, whiteSpace: 'nowrap', fontWeight: isActive ? 500 : 400 }}>
              {r.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// Tiny stat card
const Stat = ({ label, value, delta, accent }) => (
  <div className="card" style={{ padding: 16 }}>
    <div style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
      <span style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', color: accent || 'var(--text-0)' }} className="tnum">{value}</span>
      {delta && <span style={{ fontSize: 11, color: 'var(--accent)' }} className="tnum">{delta}</span>}
    </div>
  </div>
);

// Spark line for trend visualizations (deterministic)
const Spark = ({ data, color = 'var(--accent)', height = 36, fill = true }) => {
  const w = 120;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((d, i) => [(i / (data.length - 1)) * w, height - ((d - min) / (max - min || 1)) * (height - 4) - 2]);
  const d = 'M' + pts.map(p => p.join(',')).join(' L');
  const area = d + ` L${w},${height} L0,${height} Z`;
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none">
      {fill && <path d={area} fill={color} opacity="0.12" />}
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

// Donut
const Donut = ({ value, label, size = 92, color = 'var(--accent)' }) => {
  const r = size / 2 - 8, c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
                strokeDasharray={c} strokeDashoffset={c * (1 - value/100)}
                transform={`rotate(-90 ${size/2} ${size/2})`} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em' }} className="tnum">{value}%</div>
        {label && <div style={{ fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 0.1 }}>{label}</div>}
      </div>
    </div>
  );
};

// Top bar
const Topbar = ({ crumb, role = 'Estudiante', name = 'Maria T.', children }) => (
  <div className="topbar">
    <div className="crumb">
      <Icon name="sparkles" size={12} />
      <span>EduAntioquia</span>
      <span className="sep">/</span>
      {crumb.map((c, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="sep">/</span>}
          {i === crumb.length - 1 ? <strong>{c}</strong> : <span>{c}</span>}
        </React.Fragment>
      ))}
    </div>
    <div className="tools">
      {children}
      <button className="btn ghost sm" title="Buscar"><Icon name="search" size={14} /><span className="kbd">⌘K</span></button>
      <button className="btn ghost sm"><Icon name="bell" size={14} /></button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 8, borderLeft: '1px solid var(--line)', marginLeft: 4 }}>
        <span className="avatar">MT</span>
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontSize: 12, fontWeight: 500 }}>{name}</div>
          <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{role}</div>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, { Icon, AntioquiaMap, Stat, Spark, Donut, Topbar });
