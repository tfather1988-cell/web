// 목업 데이터 — 백엔드 연결 전 UI 확인용
export const mockSnapshot = {
  total: 3842,
  zones: {
    "g1-1": 412,
    "g1-2": 380,
    "g1-3": 520,
    "g1-4": 290,
    "g1-5": 310,
    "g2-1": 450,
    "g2-2": 380,
    "g2-3": 410,
    "g2-4": 340,
    "g2-5": 250,
    "etc": 100,
  },
  supplies: [
    { id: "s1", item: "생수", note: "500ml 이상", zone: "g1-3", status: "needed", created_at: Date.now() - 600000 },
    { id: "s2", item: "우산", note: "접이식 가능", zone: "g2-1", status: "needed", created_at: Date.now() - 1200000 },
    { id: "s3", item: "핫팩", note: "소분 가능한 것", zone: "g1-1", status: "resolved", created_at: Date.now() - 3600000 },
    { id: "s4", item: "구급약", note: "반창고·진통제", zone: "g2-3", status: "needed", created_at: Date.now() - 300000 },
  ],
  alerts: [
    { id: "a1", zone: "g1-3", description: "출입구 앞 혼잡 심함, 우회 권장", thanks_count: 24, false_count: 1, hidden: false, created_at: Date.now() - 900000 },
    { id: "a2", zone: "g2-1", description: "미끄러운 바닥 주의 (빗물)", thanks_count: 15, false_count: 0, hidden: false, created_at: Date.now() - 1800000 },
  ],
  announcements: [
    { id: "n1", body: "오후 3시부터 본 행사가 시작됩니다. 각 출입구 앞 안전선을 지켜주세요.", pinned: true, created_at: Date.now() - 7200000 },
    { id: "n2", body: "우천 대비 우산을 준비해 주세요. 우비 배포는 1-3 출입구 앞에서 진행합니다.", pinned: false, created_at: Date.now() - 3600000 },
  ],
  updated_at: Date.now(),
};
