/* Real TIGRIS data — sourced from official channels, 고대신문, STN Sports */

export const STATS = [
  { value: 2003, suffix: '', label: 'Founded' },
  { value: 40, suffix: '+', label: 'Members' },
  { value: 10, suffix: '–1', label: "'23 고연전" },
  { value: 2, suffix: '×', label: 'Weekly' },
]

export const SCHEDULE = [
  {
    day: '화요일',
    time: '22:00 – 23:30',
    title: '정규 빙상 훈련',
    location: '고려대학교 아이스링크',
    desc: '코칭진 지도 하에 스케이팅 기초부터 팀 전술까지. 초보자도 환영합니다.',
    primary: true,
  },
  {
    day: '일요일',
    time: '22:30 – 24:00',
    title: '주말 훈련',
    location: '고려대학교 아이스링크',
    desc: '실전 스크리매지 중심의 경기 감각 훈련.',
    primary: true,
  },
  {
    day: '비정기',
    time: 'TBD',
    title: '친선 경기',
    location: '다양한 링크',
    desc: '타 대학 및 사회인 팀과의 교류전.',
  },
  {
    day: '매년 9–10월',
    time: '고연전 시즌',
    title: '고연전 오프닝',
    location: '목동 실내빙상장',
    desc: '정기 고연전 빙구 오프닝 게임. 연세대 타이탄스와의 숙명의 대결.',
    highlight: true,
  },
]

export const TIMELINE = [
  { year: 2003, title: '동아리 창단', desc: '고려대학교 유일의 아마추어 아이스하키 동아리로 출발.' },
  { year: 2005, title: '아마추어 고연전 첫 출전', desc: '연세대 타이탄스와의 첫 아마추어 정기전 개최.' },
  { year: 2017, title: '무패 행진 시작', desc: '이후 타이탄스에게 단 한 번도 패하지 않는 전승 기록 시작.' },
  { year: 2023, title: '10–1 대승', desc: '아마추어 고연전에서 역대 최대 점수차 승리 기록.' },
  { year: 2024, title: '정기전 오프닝 출전', desc: '정기 고연전 아이스하키 오프닝 게임에서 승리.' },
  { year: 2025, title: '티그리스컵 · 언론 보도', desc: '자체 리그 개최. 고대신문·스포츠KU 등 학내 매체 보도.' },
]

export const POSITIONS = [
  { id: 'gk', label: 'Goaltender', labelKr: '골텐더', x: 80, y: 250, count: 2, color: '#eab308' },
  { id: 'ld', label: 'Left Defense', labelKr: '좌측 수비', x: 240, y: 145, count: 4, color: '#3b82f6' },
  { id: 'rd', label: 'Right Defense', labelKr: '우측 수비', x: 240, y: 355, count: 4, color: '#3b82f6' },
  { id: 'lw', label: 'Left Wing', labelKr: '좌측 윙', x: 400, y: 95, count: 5, color: '#c4003f' },
  { id: 'c', label: 'Center', labelKr: '센터', x: 430, y: 250, count: 4, color: '#c4003f' },
  { id: 'rw', label: 'Right Wing', labelKr: '우측 윙', x: 400, y: 405, count: 5, color: '#c4003f' },
]

export const SOCIAL = {
  instagram: 'https://instagram.com/kutigris',
  facebook: 'https://facebook.com/kutigris',
}
