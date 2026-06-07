import { useState } from "react";
import { ZONES } from "../config/zones";

function timeAgo(ts) {
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 1) return "방금";
  if (m < 60) return `${m}분 전`;
  return `${Math.floor(m / 60)}시간 전`;
}

export default function SuppliesTab({ supplies, onAdd, onToggleStatus }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ item: "", note: "", zone: "" });

  const needed = supplies.filter(s => s.status === "needed");
  const resolved = supplies.filter(s => s.status === "resolved");

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.item.trim() || !form.zone) return;
    onAdd({ ...form, id: Date.now().toString(), status: "needed", created_at: Date.now() });
    setForm({ item: "", note: "", zone: "" });
    setShowForm(false);
  }

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm"
      >
        + 물자 등록
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 border border-gray-200 space-y-3">
          <p className="text-sm font-semibold text-gray-700">필요 물자 등록</p>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
            placeholder="물자명 (예: 생수, 우산)"
            maxLength={30}
            value={form.item}
            onChange={e => setForm(f => ({ ...f, item: e.target.value }))}
          />
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
            placeholder="메모 (선택)"
            maxLength={50}
            value={form.note}
            onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
          />
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
            value={form.zone}
            onChange={e => setForm(f => ({ ...f, zone: e.target.value }))}
          >
            <option value="">구역 선택</option>
            {ZONES.map(z => (
              <option key={z.id} value={z.id}>{z.label}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold">등록</button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm">취소</button>
          </div>
        </form>
      )}

      {/* 필요 목록 */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">필요 ({needed.length})</p>
        {needed.length === 0 && <p className="text-sm text-gray-400 text-center py-4">등록된 물자가 없습니다</p>}
        {needed.map(s => (
          <SupplyCard key={s.id} supply={s} onToggle={onToggleStatus} />
        ))}
      </div>

      {/* 해결 목록 */}
      {resolved.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">해결됨 ({resolved.length})</p>
          {resolved.map(s => (
            <SupplyCard key={s.id} supply={s} onToggle={onToggleStatus} resolved />
          ))}
        </div>
      )}
    </div>
  );
}

function SupplyCard({ supply, onToggle, resolved }) {
  const zone = ZONES.find(z => z.id === supply.zone);
  function timeAgo(ts) {
    const m = Math.floor((Date.now() - ts) / 60000);
    if (m < 1) return "방금";
    if (m < 60) return `${m}분 전`;
    return `${Math.floor(m / 60)}시간 전`;
  }

  return (
    <div className={`bg-white rounded-xl p-3.5 border flex items-start gap-3 ${resolved ? "opacity-60 border-gray-100" : "border-gray-200"}`}>
      <button
        onClick={() => onToggle(supply.id)}
        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
          resolved ? "bg-green-500 border-green-500 text-white" : "border-gray-300"
        }`}
      >
        {resolved && <span className="text-xs">✓</span>}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${resolved ? "line-through text-gray-400" : "text-gray-800"}`}>{supply.item}</p>
        {supply.note && <p className="text-xs text-gray-500 mt-0.5">{supply.note}</p>}
        <p className="text-xs text-gray-400 mt-1">{zone?.label} · {timeAgo(supply.created_at)}</p>
      </div>
    </div>
  );
}
