const TABS = [
  { id: "status", label: "현황", icon: "📊" },
  { id: "supplies", label: "물자", icon: "📦" },
  { id: "alerts", label: "경고", icon: "⚠️" },
  { id: "announcements", label: "공지", icon: "📢" },
];

export default function TabBar({ active, onChange }) {
  return (
    <nav className="flex border-b border-gray-200 bg-white sticky top-0 z-10">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 py-3 text-xs font-medium flex flex-col items-center gap-0.5 transition-colors
            ${active === tab.id
              ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
              : "text-gray-500"
            }`}
        >
          <span className="text-lg leading-none">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
