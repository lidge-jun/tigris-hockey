import { useState, useEffect } from 'react'
import { STATS, SCHEDULE, TIMELINE, POSITIONS, SOCIAL } from './data'
import { useReveal, useCountUp, useMousePosition, useDragScroll } from './hooks'

/* Global UI */

function ScrollProgress() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const h = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setW(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return <div className="scroll-bar" style={{ width: `${w}%` }} />
}

function CursorGlow() {
  const { x, y } = useMousePosition()
  if (!x && !y) return null
  return <div className="cursor-glow" style={{ left: x, top: y }} />
}

/* Nav */

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="nav-brand" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <strong>TIGRIS</strong>
          <span className="nav-sub">KU Ice Hockey</span>
        </a>
        <button className={`nav-burger${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
        <ul className={`nav-menu${open ? ' open' : ''}`}>
          {['about', 'schedule', 'formation', 'history', 'join'].map(s => (
            <li key={s}><a href={`#${s}`} onClick={() => setOpen(false)}>{s}</a></li>
          ))}
          <li><a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="nav-ig">@kutigris</a></li>
        </ul>
      </div>
    </nav>
  )
}

/* Hero */

function Stat({ value, suffix, label }) {
  const [ref, count] = useCountUp(value)
  return (
    <div className="stat" ref={ref}>
      <span className="stat-val">{count}<span className="stat-sfx">{suffix}</span></span>
      <span className="stat-lbl">{label}</span>
    </div>
  )
}

const TICKER_TEXT = '\uc0c1\uc2dc \ubd80\uc6d0 \ubaa8\uc9d1 \uc911 \u00b7 @kutigris \u00b7 \ud6c8\ub828: \ud654 22:00 / \uc77c 22:30 \u00b7 \uace0\ub824\ub300\ud559\uad50 \uc544\uc774\uc2a4\ub9c1\ud06c \u00b7 \uc7a5\ube44 \ub300\uc5ec \uac00\ub2a5 \u00b7 '

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1, 2, 3].map(i => (
            <span key={i}>{TICKER_TEXT}</span>
          ))}
        </div>
      </div>
      <div className="hero-content">
        <p className="hero-kicker">{'\uace0\ub824\ub300\ud559\uad50 \uc544\uc774\uc2a4\ud558\ud0a4 \ub3d9\uc544\ub9ac'}</p>
        <h1 className="hero-title">TIGRIS</h1>
        <p className="hero-desc">
          {'2003\ub144 \ucc3d\ub2e8. \ube59\ud310 \uc704\uc5d0\uc11c \ud638\ub791\uc774\uc758 \uc815\uc2e0\uc73c\ub85c \uc9c8\uc8fc\ud569\ub2c8\ub2e4.'}
          <br />{'\uc544\ub9c8\ucd94\uc5b4 \uace0\uc5f0\uc804 2017\ub144 \uc774\ud6c4 \ubb34\ud328.'}
        </p>
        <div className="hero-actions">
          <a href="#join" className="btn-primary"><span>{'\ubd80\uc6d0 \ubaa8\uc9d1 \u2192'}</span></a>
          <a href={SOCIAL.instagram} className="btn-outline" target="_blank" rel="noopener noreferrer">
            <span>@kutigris</span>
          </a>
        </div>
      </div>
      <div className="hero-stats">
        {STATS.map(s => <Stat key={s.label} {...s} />)}
      </div>
    </section>
  )
}

/* About */

function About() {
  const ref = useReveal()
  return (
    <section className="about" id="about">
      <div className="about-inner reveal" ref={ref}>
        <div className="about-left">
          <span className="label">About</span>
          <h2>{'\ube59\ud310 \uc704\uc758'}<br />{'\ud638\ub791\uc774\ub4e4'}</h2>
        </div>
        <div className="about-right">
          <p>
            <strong>TIGRIS</strong>{'\ub294 2003\ub144 \ucc3d\ub2e8\ub41c \uace0\ub824\ub300\ud559\uad50 \uc720\uc77c\uc758 \uc544\ub9c8\ucd94\uc5b4 \uc544\uc774\uc2a4\ud558\ud0a4 \ub3d9\uc544\ub9ac\uc785\ub2c8\ub2e4. \ucd08\ubcf4\uc790\ubd80\ud130 \uacbd\ub825\uc790\uae4c\uc9c0, \uc544\uc774\uc2a4\ud558\ud0a4\ub97c \uc0ac\ub791\ud558\ub294 \ubaa8\ub4e0 \uace0\ub300\uc778\uc774 \ud568\uaed8\ud569\ub2c8\ub2e4.'}
          </p>
          <p>
            {'\ub9e4\uc8fc \ud654\uc694\uc77c\uacfc \uc77c\uc694\uc77c, \uace0\ub824\ub300\ud559\uad50 \uc544\uc774\uc2a4\ub9c1\ud06c\uc5d0\uc11c \uac10\ub3c5\u00b7\ucf54\uce58\uc9c4 \uc9c0\ub3c4 \ud558\uc5d0 \uccb4\uacc4\uc801 \ud6c8\ub828\uc744 \uc9c4\ud589\ud569\ub2c8\ub2e4. \uc2a4\ucf00\uc774\ud305\uc774 \ucc98\uc74c\uc774\uc5b4\ub3c4 \uac71\uc815 \uc5c6\uc2b5\ub2c8\ub2e4\u2014\uc7a5\ube44 \ub300\uc5ec\ubd80\ud130 \uae30\ucd08 \uad50\uc721\uae4c\uc9c0 \uc9c0\uc6d0\ud569\ub2c8\ub2e4.'}
          </p>
          <p>
            {'\uc544\ub9c8\ucd94\uc5b4 \uace0\uc5f0\uc804\uc5d0\uc11c '}<strong>{'2017\ub144 \uc774\ud6c4 \ubb34\ud328'}</strong>{' \uc804\uc801\uc744 \uae30\ub85d \uc911\uc774\uba70, 2023\ub144\uc5d0\ub294 \uc5f0\uc138\ub300 \ud0c0\uc774\ud0c4\uc2a4\ub97c '}<strong>{'10\u20131\ub85c \ub300\ud30c'}</strong>{'\ud588\uc2b5\ub2c8\ub2e4. \ube59\ud310 \uc704\uc5d0\uc11c \ub9cc\ub4e0 \ub3d9\ub8cc\ub294 \uc878\uc5c5 \ud6c4\uc5d0\ub3c4 \ud3c9\uc0dd\uc758 \ub3d9\uc9c0\uc785\ub2c8\ub2e4.'}
          </p>
        </div>
      </div>
    </section>
  )
}

/* Schedule */

function Schedule() {
  const ref = useReveal()
  return (
    <section className="schedule" id="schedule">
      <div className="section-head reveal" ref={ref}>
        <span className="label">Weekly Program</span>
        <h2>{'\ud6c8\ub828 \uc77c\uc815'}</h2>
      </div>
      <div className="sched-grid">
        {SCHEDULE.map((s, i) => (
          <div className={`sched-card${s.primary ? ' primary' : ''}${s.highlight ? ' highlight' : ''}`} key={i}>
            <div className="sched-day">{s.day}</div>
            <div className="sched-title">{s.title}</div>
            <div className="sched-time">{s.time}</div>
            <div className="sched-loc">{s.location}</div>
            <p className="sched-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* Formation - Interactive SVG Ice Rink */

function Formation() {
  const ref = useReveal()
  const [active, setActive] = useState(null)

  return (
    <section className="formation" id="formation">
      <div className="section-head reveal" ref={ref}>
        <span className="label">Team Formation</span>
        <h2>{'\ud3ec\uba54\uc774\uc158'}</h2>
        <p className="section-desc">{'40\uba85 \uc774\uc0c1\uc758 \ubd80\uc6d0\uc774 \ud3ec\uc9c0\uc158\ubcc4\ub85c \ud6c8\ub828\ud569\ub2c8\ub2e4'}</p>
      </div>
      <div className="rink-wrap">
        <svg viewBox="0 0 1000 500" className="rink" role="img" aria-label="Ice rink formation diagram">
          <rect x="10" y="10" width="980" height="480" rx="120"
            fill="none" stroke="rgba(200,223,240,0.1)" strokeWidth="2" />
          <line x1="500" y1="10" x2="500" y2="490" stroke="rgba(139,0,41,0.25)" strokeWidth="3" />
          <line x1="320" y1="10" x2="320" y2="490" stroke="rgba(200,223,240,0.12)" strokeWidth="2.5" />
          <line x1="680" y1="10" x2="680" y2="490" stroke="rgba(200,223,240,0.12)" strokeWidth="2.5" />
          <circle cx="500" cy="250" r="70" fill="none" stroke="rgba(139,0,41,0.15)" strokeWidth="1.5" />
          <circle cx="500" cy="250" r="4" fill="rgba(139,0,41,0.3)" />
          <path d="M 55,200 Q 100,250 55,300" fill="none" stroke="rgba(200,223,240,0.15)" strokeWidth="1.5" />
          <path d="M 945,200 Q 900,250 945,300" fill="none" stroke="rgba(200,223,240,0.15)" strokeWidth="1.5" />
          {[[200, 140], [200, 360], [800, 140], [800, 360]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="45" fill="none" stroke="rgba(200,223,240,0.06)" strokeWidth="1" />
          ))}
          {POSITIONS.map(p => (
            <g key={p.id}
              onMouseEnter={() => setActive(p.id)} onMouseLeave={() => setActive(null)}
              onTouchStart={() => setActive(a => a === p.id ? null : p.id)}
              style={{ cursor: 'pointer' }}>
              <circle cx={p.x} cy={p.y} r={active === p.id ? 32 : 28} fill={p.color}
                opacity={active === p.id ? 0.22 : 0.08}>
                {active !== p.id && (
                  <animate attributeName="r" values="26;33;26" dur="3s" repeatCount="indefinite" />
                )}
              </circle>
              <circle cx={p.x} cy={p.y} r="10" fill={p.color} opacity="0.85" />
              <circle cx={p.x} cy={p.y} r="4" fill="#fff" opacity="0.9" />
              {active === p.id && (
                <g>
                  <rect x={p.x - 62} y={p.y - 52} width="124" height="32" rx="4"
                    fill="#131720" stroke={p.color} strokeWidth="1" opacity="0.95" />
                  <text x={p.x} y={p.y - 31} textAnchor="middle" fill="#e2e5ea"
                    fontSize="12" fontFamily="Outfit, sans-serif">{p.labelKr + ' \u00b7 ' + p.count + '\uba85'}</text>
                </g>
              )}
            </g>
          ))}
        </svg>
      </div>
      <div className="pos-legend">
        {POSITIONS.map(p => (
          <button key={p.id} className={`legend-item${active === p.id ? ' active' : ''}`}
            onMouseEnter={() => setActive(p.id)} onMouseLeave={() => setActive(null)}>
            <span className="legend-dot" style={{ background: p.color }} />
            <span>{p.labelKr}</span>
            <span className="legend-ct">{p.count}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

/* Timeline - Drag-scrollable */

function Timeline() {
  const ref = useReveal()
  const { ref: trackRef, onPointerDown, onPointerMove, dragging } = useDragScroll()

  return (
    <section className="tl-section" id="history">
      <div className="section-head reveal" ref={ref}>
        <span className="label">Since 2003</span>
        <h2>{'\uac78\uc5b4\uc628 \uae38'}</h2>
      </div>
      <p className="tl-hint">{'\u2190 \ub4dc\ub798\uadf8\ud558\uc5ec \uc2a4\ud06c\ub864 \u2192'}</p>
      <div className={`tl-track${dragging ? ' dragging' : ''}`}
        ref={trackRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove}>
        {TIMELINE.map(t => (
          <div className="tl-card" key={t.year}>
            <div className="tl-year">{t.year}</div>
            <div className="tl-title">{t.title}</div>
            <p className="tl-desc">{t.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* Join CTA */

function Join() {
  const ref = useReveal()
  const joinDetails = [
    { icon: '\ud83d\udccd', title: '\ud6c8\ub828 \uc7a5\uc18c', l1: '\uace0\ub824\ub300\ud559\uad50 \uc544\uc774\uc2a4\ub9c1\ud06c', l2: '\uc548\uc554\ub85c 145, \uc131\ubd81\uad6c' },
    { icon: '\u23f0', title: '\ud6c8\ub828 \uc2dc\uac04', l1: '\ud654 22:00 \u2013 23:30', l2: '\uc77c 22:30 \u2013 24:00' },
    { icon: '\ud83c\udfd2', title: '\uc7a5\ube44', l1: '\uac1c\uc778 \uc7a5\ube44 \uc5c6\uc5b4\ub3c4', l2: '\ub3d9\uc544\ub9ac \ub300\uc5ec \uac00\ub2a5' },
    { icon: '\ud83c\udfaf', title: '\uc790\uaca9', l1: '\uace0\ub824\ub300 \uc7ac\ud559\uc0dd', l2: '\uacbd\ud5d8 \ubb34\uad00 \u00b7 \uc0c1\uc2dc \ubaa8\uc9d1' },
  ]
  return (
    <section className="join" id="join">
      <div className="join-inner reveal" ref={ref}>
        <div className="join-text">
          <h2>{'\ud568\uaed8 \ube59\ud310\uc744'}<br /><span className="crimson">{'\ub2ec\ub824\ubcfc \uc900\ube44 \ub410\ub098\uc694?'}</span></h2>
          <p>
            {'\uc544\uc774\uc2a4\ud558\ud0a4 \uacbd\ud5d8\uc774 \uc5c6\uc5b4\ub3c4 \uad1c\ucc2e\uc2b5\ub2c8\ub2e4. \uc2a4\ucf00\uc774\ud2b8\ub97c \ucc98\uc74c \ud0c0\ub294 \uac83\ubd80\ud130 \uc2dc\uc791\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc7ac\ud559\uc0dd\u00b7\ud734\ud559\uc0dd\u00b7\uc878\uc5c5\uc0dd\u00b7\ub300\ud559\uc6d0\uc0dd \ub204\uad6c\ub098 \ud658\uc601\ud569\ub2c8\ub2e4.'}
            <strong>{' \uace8\ud150\ub354 \uc9c0\uc6d0\uc790\ub294 \ud3c9\uc0dd \ud68c\ube44 \uba74\uc81c.'}</strong>
          </p>
          <a href={SOCIAL.instagram} className="btn-primary" target="_blank" rel="noopener noreferrer">
            <span>{'Instagram DM\uc73c\ub85c \uc9c0\uc6d0 \u2192'}</span>
          </a>
        </div>
        <div className="join-grid">
          {joinDetails.map(d => (
            <div className="join-card" key={d.title}>
              <span className="join-icon" aria-hidden="true">{d.icon}</span>
              <h4>{d.title}</h4>
              <p>{d.l1}<br />{d.l2}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Footer */

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div><strong>TIGRIS</strong>{' \u00b7 \uace0\ub824\ub300\ud559\uad50 \uc544\uc774\uc2a4\ud558\ud0a4 \ub3d9\uc544\ub9ac \u00b7 Est. 2003'}</div>
        <div className="footer-links">
          <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="mailto:kutigris@korea.ac.kr">Email</a>
        </div>
      </div>
    </footer>
  )
}

/* App */

export default function App() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <Hero />
      <About />
      <Schedule />
      <Formation />
      <Timeline />
      <Join />
      <Footer />
    </>
  )
}
