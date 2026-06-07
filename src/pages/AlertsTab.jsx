import { useState } from "react";
import { ZONES } from "../config/zones";

// 자정 임계값 (완충 장치)
const HIDE_FALSE_MIN = 5;
const HIDE_RATIO = 3; // false_count >= thanks_count * HIDE_RATIO
const MIN_DISPLAY_MS = 10 * 60 * 1000; // 10분

function shouldHide(alert) {
  const tooNew = Date.now() - alert.created_at < MIN_DISPLAY_MS;
  if (tooNew) return false;
  return alert.false_count >= HIDE_FALSE_MIN && alert.false_count >= alert.thanks_count * HIDE_RATIO;
}

function timeAgo(ts) {
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 1) return "방금";
  if (m < 60) return `${m}분 전`;
  return `${Math.floor(m / 60)}시간 전`;
}

export default function AlertsTab({ alerts, onAdd, onVote }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ zone: "", description: "" });

  const visible = alerts.filter(a => !shouldHide(a));

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.zone || !form.description.trim()) return;
    onAdd({ ...form, id: Date.now().toString(), thanks_count: 0, false_count: 0, hidden: false, created_at: Date.now() });
    setForm({ zone: "", description: "" });
    setShowForm(false);
  }

  return (
    <div className="p-4 space-y-4">
      {/* 주의사항 안내 */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-xs text-orange-700 leading-relaxed">
        ⚠️ <strong>위험 시 운영팀 및 공식 채널로 신고하세요.</strong> 개인 특정·직접 대응 금지. 상황·위치·시각만 기록하세요.
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold text-sm"
      >
        + 경고 등록
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 border border-gray-200 space-y-3">
          <p className="text-sm font-semibold text-gray-700">안전 경고 등록</p>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
            value={form.zone}
            onChange={e => setForm(f => ({ ...f, zone: e.target.value }))}
          >
            <option value="">구역 선택</option>
            {ZONES.map(z => <option key={z.id} value={z.id}>{z.label}</option>)}
          </select>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm resize-none"
            placeholder="상황 설명 (사진·이름 금지, 상황·위치·시각만)"
            rows={3}
            maxLength={150}
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold">등록</button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm">취소</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {visible.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">현재 등록된 경고가 없습니다</p>
        )}
        {visible.map(alert => (
          <AlertCard key={alert.id} alert={alert} onVote={onVote} />
        ))}
      </div>
    </div>
  );
}

function AlertCard({ alert, onVote }) {
  const zone = ZONES.find(z => z.id === alert.zone);
  const dimmed = alert.false_count > 0 && alert.false_count >= alert.thanks_count;

  function timeAgo(ts) {
    const m = Math.floor((Date.now() - ts) / 60000);
    if (m < 1) return "방금";
    if (m < 60) return `${m}분 전`;
    return `${Math.floor(m / 60)}시간 전`;
  }

  return (
    <div className={`bg-white rounded-xl border p-4 transition-opacity ${dimmed ? "opacity-50 border-gray-100" : "border-orange-200"}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="text-xs font-semibold text-orange-600 mb-1">{zone?.label}</p>
          <p className="text-sm text-gray-800 leading-relaxed">{alert.description}</p>
          <p className="text-xs text-gray-400 mt-2">{timeAgo(alert.created_at)}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onVote(alert.id, "thanks")}
          className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium"
        >
          👍 고마워요 {alert.thanks_count}
        </button>
        <button
          onClick={() => onVote(alert.id, "false")}
          className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-xs font-medium"
        >
          ❌ 허위에요 {alert.false_count}
        </button>
      </div>
    </div>
  );
}
