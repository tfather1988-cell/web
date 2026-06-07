function timeAgo(ts) {
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 1) return "방금";
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  return `${Math.floor(h / 24)}일 전`;
}

export default function AnnouncementsTab({ announcements }) {
  const pinned = announcements.filter(a => a.pinned);
  const rest = announcements.filter(a => !a.pinned);

  return (
    <div className="p-4 space-y-4">
      {pinned.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">📌 고정 공지</p>
          {pinned.map(a => (
            <AnnouncementCard key={a.id} announcement={a} pinned />
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">공지</p>
          {rest.map(a => (
            <AnnouncementCard key={a.id} announcement={a} />
          ))}
        </div>
      )}

      {announcements.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-12">등록된 공지가 없습니다</p>
      )}
    </div>
  );
}

function AnnouncementCard({ announcement, pinned }) {
  return (
    <div className={`rounded-xl p-4 border ${pinned ? "bg-yellow-50 border-yellow-300" : "bg-white border-gray-200"}`}>
      {pinned && <span className="text-xs font-bold text-yellow-700 mb-1 block">📌 중요 공지</span>}
      <p className="text-sm text-gray-800 leading-relaxed">{announcement.body}</p>
      <p className="text-xs text-gray-400 mt-2">{timeAgo(announcement.created_at)}</p>
    </div>
  );
}
