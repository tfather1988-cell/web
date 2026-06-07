import { ZONES } from "../config/zones";

export default function StatusTab({ snapshot, checkedIn, onCheckin }) {
  const { total, zones } = snapshot;
  const maxCount = Math.max(...Object.values(zones));

  const grouped = ZONES.reduce((acc, z) => {
    if (!acc[z.group]) acc[z.group] = [];
    acc[z.group].push(z);
    return acc;
  }, {});

  return (
    <div className="p-4 space-y-5">
      {/* 전체 현황 */}
      <div className="bg-blue-600 text-white rounded-2xl p-5 text-center">
        <p className="text-sm text-blue-200 mb-1">현재 추정 참여 인원</p>
        <p className="text-5xl font-bold">{total.toLocaleString()}</p>
        <p className="text-xs text-blue-300 mt-2">※ GPS 집계 추정치입니다</p>
      </div>

      {/* 체크인 */}
      {!checkedIn ? (
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">내 위치 체크인</p>
          <p className="text-xs text-gray-500 mb-3">출입구를 선택해 인원 집계에 참여하세요</p>
          <div className="space-y-3">
            {Object.entries(grouped).map(([group, zoneList]) => (
              <div key={group}>
                <p className="text-xs text-gray-400 mb-1.5">{group}</p>
                <div className="grid grid-cols-3 gap-2">
                  {zoneList.map((z) => (
                    <button
                      key={z.id}
                      onClick={() => onCheckin(z.id)}
                      className="py-2.5 text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-lg font-medium transition-colors"
                    >
                      {z.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
          <p className="text-green-700 font-semibold text-sm">✅ 체크인 완료</p>
          <p className="text-green-600 text-xs mt-1">{ZONES.find(z => z.id === checkedIn)?.label}</p>
          <button onClick={() => onCheckin(null)} className="mt-2 text-xs text-gray-400 underline">
            변경하기
          </button>
        </div>
      )}

      {/* 구역별 분포 */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200">
        <p className="text-sm font-semibold text-gray-700 mb-3">구역별 분포</p>
        <div className="space-y-2">
          {ZONES.filter(z => z.id !== "etc").map((z) => {
            const count = zones[z.id] || 0;
            const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
            return (
              <div key={z.id} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-16 shrink-0">{z.label}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-400 h-2 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 w-10 text-right">{count.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
