export default function Header({ pinnedAnnouncement, onFeedback }) {
  return (
    <header className="bg-blue-600 text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <h1 className="text-base font-bold leading-tight">집회 현황판</h1>
          <p className="text-xs text-blue-200">SK올림픽핸드볼경기장</p>
        </div>
        <button
          onClick={onFeedback}
          className="text-xs bg-blue-500 hover:bg-blue-400 px-3 py-1.5 rounded-full"
        >
          건의하기
        </button>
      </div>

      {pinnedAnnouncement && (
        <div className="bg-yellow-400 text-yellow-900 px-4 py-2 text-sm font-medium">
          📢 {pinnedAnnouncement.body}
        </div>
      )}
    </header>
  );
}
