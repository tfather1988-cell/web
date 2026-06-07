import { useState } from "react";

const TABS = ["공지 작성", "코드 관리", "피드백 열람"];

export default function AdminPage() {
  const [code, setCode] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState(0);

  // 목업 — 실제론 Edge Function 호출
  function handleAuth(e) {
    e.preventDefault();
    if (code.trim()) setAuthed(true);
  }

  if (!authed) {
    return (
      <div className="max-w-lg mx-auto min-h-svh bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
          <div className="text-center">
            <p className="text-2xl mb-1">🔐</p>
            <h1 className="text-base font-bold text-gray-800">관리자 / 운영자</h1>
            <p className="text-xs text-gray-500 mt-1">코드를 입력하세요</p>
          </div>
          <form onSubmit={handleAuth} className="space-y-3">
            <input
              type="password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm tracking-widest"
              placeholder="코드 입력"
              value={code}
              onChange={e => setCode(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm"
            >
              확인
            </button>
          </form>
          <a href="/" className="block text-center text-xs text-gray-400 underline">
            메인으로 돌아가기
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto min-h-svh bg-gray-50 flex flex-col">
      <header className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
        <h1 className="text-sm font-bold">관리자 패널</h1>
        <a href="/" className="text-xs text-gray-400">메인 →</a>
      </header>

      <nav className="flex border-b border-gray-200 bg-white">
        {TABS.map((t, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            className={`flex-1 py-3 text-xs font-medium transition-colors ${
              tab === i ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" : "text-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      <main className="flex-1 p-4">
        {tab === 0 && <AnnouncePanel />}
        {tab === 1 && <CodePanel />}
        {tab === 2 && <FeedbackPanel />}
      </main>
    </div>
  );
}

function AnnouncePanel() {
  const [body, setBody] = useState("");
  const [pinned, setPinned] = useState(false);

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-gray-700">공지 작성</p>
      <textarea
        className="w-full border border-gray-300 rounded-xl px-3 py-3 text-sm resize-none"
        placeholder="공지 내용"
        rows={4}
        maxLength={500}
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" checked={pinned} onChange={e => setPinned(e.target.checked)} />
        상단 고정 (중요 공지)
      </label>
      <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm">
        게시하기
      </button>
    </div>
  );
}

function CodePanel() {
  const [newLabel, setNewLabel] = useState("");
  const [codes] = useState([
    { id: "c1", label: "운영자1", revoked: false },
    { id: "c2", label: "운영자2", revoked: true },
  ]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-700">게시 코드 발급</p>
        <input
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
          placeholder="라벨 (예: 운영자3)"
          value={newLabel}
          onChange={e => setNewLabel(e.target.value)}
        />
        <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold">
          코드 발급
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-700">발급된 코드</p>
        {codes.map(c => (
          <div key={c.id} className={`flex items-center justify-between bg-white border rounded-lg px-3 py-2.5 ${c.revoked ? "opacity-50" : "border-gray-200"}`}>
            <div>
              <p className="text-sm font-medium text-gray-800">{c.label}</p>
              <p className="text-xs text-gray-400">{c.revoked ? "폐기됨" : "활성"}</p>
            </div>
            {!c.revoked && (
              <button className="text-xs text-red-500 border border-red-200 px-2.5 py-1 rounded-lg">
                폐기
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeedbackPanel() {
  const feedbacks = [
    { id: "f1", body: "1-3 출입구 쪽 안내판이 잘 안 보여요", handled: false, created_at: Date.now() - 3600000 },
    { id: "f2", body: "물자 등록 기능이 유용합니다. 감사해요!", handled: true, created_at: Date.now() - 7200000 },
  ];

  function timeAgo(ts) {
    const m = Math.floor((Date.now() - ts) / 60000);
    if (m < 60) return `${m}분 전`;
    return `${Math.floor(m / 60)}시간 전`;
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-gray-700">수신된 피드백</p>
      {feedbacks.map(f => (
        <div key={f.id} className={`bg-white border rounded-xl p-3.5 ${f.handled ? "opacity-60" : "border-gray-200"}`}>
          <p className="text-sm text-gray-800">{f.body}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-400">{timeAgo(f.created_at)}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full ${f.handled ? "bg-gray-100 text-gray-400" : "bg-blue-100 text-blue-600"}`}>
              {f.handled ? "처리됨" : "미처리"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
