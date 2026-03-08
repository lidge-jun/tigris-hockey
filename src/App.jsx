import { useState, useEffect, useRef, useCallback } from 'react'

/* ═══ Data ═══ */
const ROSTER = [
  { number: '01', name: 'Kim Dohyun', nameKr: '김도현', position: 'Goaltender', meta: '경영학과 21학번' },
  { number: '07', name: 'Park Junwoo', nameKr: '박준우', position: 'Left Wing', meta: '체육교육과 22학번' },
  { number: '11', name: 'Lee Seungmin', nameKr: '이승민', position: 'Center', meta: '경제학과 20학번 · Captain' },
  { number: '15', name: 'Choi Yeongjae', nameKr: '최영재', position: 'Right Wing', meta: '컴퓨터학과 23학번' },
  { number: '22', name: 'Jang Hyunwoo', nameKr: '장현우', position: 'Defenseman', meta: '정치외교학과 21학번' },
  { number: '27', name: 'Shin Taehyuk', nameKr: '신태혁', position: 'Defenseman', meta: '의예과 22학번' },
  { number: '33', name: 'Yoon Kijun', nameKr: '윤기준', position: 'Center', meta: '생명과학부 20학번' },
  { number: '44', name: 'Han Jiseok', nameKr: '한지석', position: 'Left Wing', meta: '화학과 23학번' },
  { number: '55', name: 'Kwon Minsu', nameKr: '권민수', position: 'Goaltender', meta: '행정학과 24학번' },
  { number: '88', name: 'Seo Dongwon', nameKr: '서동원', position: 'Right Wing', meta: '미디어학부 22학번' },
]

const TIMELINE = [
  { year: '1985', title: '동아리 창단', desc: '고려대학교 아이스하키 동아리 TIGRIS 창단. 첫 시즌 12명의 창단 멤버로 출발.' },
  { year: '1992', title: '연고전 첫 승리', desc: '역대 최초로 연고전 아이스하키 부문 우승. 안암을 뜨겁게 달군 역사적인 밤.' },
  { year: '2005', title: 'KUHL 리그 출범', desc: '대학 아이스하키 리그 KUHL 창설에 핵심 역할. 초대 우승팀으로 이름을 올림.' },
  { year: '2015', title: '창단 30주년', desc: '30주년 기념 OB-YB 경기 및 갈라 개최. 역대 선수 150명 이상 참석.' },
  { year: '2023', title: '전국대회 준우승', desc: '전국 대학 아이스하키 대회 결승 진출. 역대 최고 성적 달성.' },
  { year: '2026', title: '새 시즌 개막', desc: '40명 이상의 부원과 함께하는 역대 최대 규모. 연고전 4연패를 향한 도전.' },
]

const SCHEDULE = [
  { day: '화 · 목', title: '정규 훈련', time: '21:00 - 23:00', desc: '목동 아이스링크에서 진행하는 주 2회 정규 빙상 훈련. 스케이팅 기초부터 전술 훈련까지.', featured: true },
  { day: '토', title: '주말 스크리매지', time: '14:00 - 16:00', desc: '팀 내 연습 경기. 실전 감각 향상.' },
  { day: '월 · 수', title: '체력 훈련', time: '19:00 - 20:30', desc: '교내 체육관 웨이트 및 컨디셔닝.' },
  { day: '매월 셋째 주', title: '친선 경기', time: 'TBD', desc: '타 대학 및 사회인 팀과의 정기 교류전.' },
]

/* ═══ Intersection Observer Hook ═══ */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function RevealBlock({ children, className = '', ...props }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`} {...props}>{children}</div>
}

/* ═══ Nav ═══ */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = useCallback(() => setOpen(false), [])

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#" className="nav-logo">
          <div>
            <div className="nav-logo-text">Tigris</div>
            <div className="nav-logo-sub">Korea Univ. Ice Hockey</div>
          </div>
        </a>
        <button className="nav-toggle" onClick={() => setOpen(o => !o)} aria-label="메뉴 열기">
          <span /><span /><span />
        </button>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {['About', 'Schedule', 'Roster', 'History', 'Join'].map(s => (
            <li key={s}><a href={`#${s.toLowerCase()}`} onClick={handleClick}>{s}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

/* ═══ Hero ═══ */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">Since 1985</span>
        <h1 className="hero-title">
          <span className="accent">TIGRIS</span>
          Ice Hockey
        </h1>
        <p className="hero-desc">
          고려대학교를 대표하는 아이스하키 동아리.
          빙판 위에서 호랑이의 정신으로 40년째 질주하고 있습니다.
        </p>
        <div className="hero-cta">
          <a href="#join" className="btn-primary">부원 모집 신청 →</a>
          <a href="#schedule" className="btn-ghost">훈련 일정 보기</a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-visual-inner">
          <div className="hero-tiger" aria-hidden="true">T</div>
          <div className="hero-stats">
            {[
              { n: '40+', l: 'Years of History' },
              { n: '45', l: 'Active Members' },
              { n: '4', l: 'Yonko Wins' },
              { n: '2', l: 'Weekly Practices' },
            ].map(({ n, l }) => (
              <div className="stat-card" key={l}>
                <div className="stat-number">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══ About ═══ */
function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <RevealBlock>
          <div className="about-grid">
            <div>
              <div className="about-label">About the Club</div>
              <h2 className="about-heading">
                빙판 위의<br />
                호랑이들
              </h2>
            </div>
            <div className="about-body">
              <p>
                <strong>TIGRIS</strong>는 1985년 창단 이래 고려대학교의 아이스하키 전통을 이어온 동아리입니다.
                초보자부터 유소년 출신 경력자까지, 하키를 사랑하는 모든 고대인이 함께합니다.
              </p>
              <div className="about-divider" />
              <p>
                매주 화·목 목동 아이스링크에서 정규 훈련을 진행하며,
                연고전 아이스하키 부문과 전국 대학 리그에 출전하고 있습니다.
                빙판 위에서 만나는 동료는 졸업 후에도 평생의 동지가 됩니다.
              </p>
              <p>
                단순한 스포츠를 넘어, <strong>팀워크와 끈기, 그리고 고려대의 자부심</strong>을
                빙판 위에서 체현하는 것이 TIGRIS의 정신입니다.
              </p>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  )
}

/* ═══ Schedule ═══ */
function Schedule() {
  return (
    <section className="schedule" id="schedule">
      <div className="container">
        <RevealBlock>
          <div className="section-header">
            <div>
              <div className="section-subtitle">Weekly Program</div>
              <h2 className="section-title">훈련 일정</h2>
            </div>
          </div>
        </RevealBlock>
        <RevealBlock>
          <div className="schedule-grid">
            {SCHEDULE.map((s, i) => (
              <div className={`schedule-card ${s.featured ? 'featured' : ''}`} key={i}>
                <div className="schedule-day">{s.day}</div>
                <div className="schedule-title">{s.title}</div>
                <div className="schedule-time">{s.time}</div>
                <div className="schedule-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </RevealBlock>
      </div>
    </section>
  )
}

/* ═══ Roster ═══ */
function Roster() {
  return (
    <section className="roster" id="roster">
      <div className="container">
        <RevealBlock>
          <div className="section-header">
            <div>
              <div className="section-subtitle">2026 Season</div>
              <h2 className="section-title">선수 명단</h2>
            </div>
          </div>
        </RevealBlock>
        <RevealBlock>
          <div className="roster-scroll">
            {ROSTER.map((p) => (
              <div className="roster-card" key={p.number}>
                <div className="roster-number">#{p.number}</div>
                <div className="roster-name">{p.name}</div>
                <div className="roster-name-kr">{p.nameKr}</div>
                <div className="roster-position">{p.position}</div>
                <div className="roster-meta">{p.meta}</div>
              </div>
            ))}
          </div>
        </RevealBlock>
      </div>
    </section>
  )
}

/* ═══ History ═══ */
function History() {
  return (
    <section className="history" id="history">
      <div className="container">
        <RevealBlock>
          <div className="section-header">
            <div>
              <div className="section-subtitle">Club History</div>
              <h2 className="section-title">걸어온 길</h2>
            </div>
          </div>
        </RevealBlock>
        <div className="timeline">
          {TIMELINE.map((t, i) => (
            <div className="timeline-item" key={t.year} style={{ '--i': i }}>
              <div className="timeline-year">{t.year}</div>
              <div className="timeline-title">{t.title}</div>
              <div className="timeline-desc">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ Join CTA ═══ */
function Join() {
  return (
    <section className="join" id="join">
      <div className="container">
        <RevealBlock>
          <div className="join-inner">
            <div>
              <h2 className="join-title">
                함께 빙판을<br />
                <span className="crimson">달려볼 준비 됐나요?</span>
              </h2>
              <p className="join-desc">
                아이스하키 경험이 없어도 괜찮습니다. 스케이트를 처음 타는 것부터
                시작할 수 있습니다. 매 학기 신입 부원을 모집하고 있으며,
                누구나 환영합니다.
              </p>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
                지원하기 →
              </a>
            </div>
            <div className="join-details">
              {[
                { icon: '⏰', title: '모집 시기', desc: '매 학기 초 (3월, 9월)' },
                { icon: '📍', title: '훈련 장소', desc: '목동 아이스링크' },
                { icon: '💰', title: '동아리비', desc: '학기당 15만원 (장비 대여 포함)' },
                { icon: '📋', title: '자격 요건', desc: '고려대학교 재학생 (경험 무관)' },
              ].map(d => (
                <div className="join-detail" key={d.title}>
                  <div className="join-detail-icon" aria-hidden="true">{d.icon}</div>
                  <div className="join-detail-text">
                    <h4>{d.title}</h4>
                    <p>{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  )
}

/* ═══ Footer ═══ */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-text">
          TIGRIS Ice Hockey Club · Korea University · Est. 1985
        </div>
        <div className="footer-links">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="mailto:tigris@korea.ac.kr">Contact</a>
        </div>
      </div>
    </footer>
  )
}

/* ═══ App ═══ */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Schedule />
      <Roster />
      <History />
      <Join />
      <Footer />
    </>
  )
}
