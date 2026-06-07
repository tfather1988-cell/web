import { useState } from "react";

export default function FeedbackModal({ onClose, onSubmit }) {
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!body.trim()) return;
    onSubmit(body);
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">문의 / 건의</h2>
          <button onClick={onClose} className="text-gray-400 text-xl leading-none">✕</button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-xs text-orange-600 bg-orange-50 rounded-lg p-2.5">
              ⚠️ 민감한 개인정보는 적지 마세요. 내용은 운영자만 확인합니다.
            </p>
            <textarea
              className="w-full border border-gray-300 rounded-xl px-3 py-3 text-sm resize-none"
              placeholder="건의 또는 문의 내용을 입력하세요"
              rows={4}
              maxLength={500}
              value={body}
              onChange={e => setBody(e.target.value)}
              autoFocus
            />
            <p className="text-xs text-gray-400 text-right">{body.length}/500</p>
            <button
              type="submit"
              disabled={!body.trim()}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm disabled:opacity-40"
            >
              보내기
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-2">
            <p className="text-3xl">✅</p>
            <p className="text-sm font-semibold text-gray-800">전달됐습니다</p>
            <p className="text-xs text-gray-500">소중한 의견 감사합니다</p>
            <button onClick={onClose} className="mt-3 w-full py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium">
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
