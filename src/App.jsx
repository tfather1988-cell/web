import { useState } from "react";
import Header from "./components/Header";
import TabBar from "./components/TabBar";
import FeedbackModal from "./components/FeedbackModal";
import StatusTab from "./pages/StatusTab";
import SuppliesTab from "./pages/SuppliesTab";
import AlertsTab from "./pages/AlertsTab";
import AnnouncementsTab from "./pages/AnnouncementsTab";
import AdminPage from "./pages/AdminPage";
import { mockSnapshot } from "./mock/snapshot";

export default function App() {
  const isAdmin = window.location.pathname === "/admin";
  if (isAdmin) return <AdminPage />;

  const [tab, setTab] = useState("status");
  const [showFeedback, setShowFeedback] = useState(false);
  const [checkedIn, setCheckedIn] = useState(null);
  const [snapshot, setSnapshot] = useState(mockSnapshot);

  const pinned = snapshot.announcements.find(a => a.pinned);

  function handleCheckin(zoneId) {
    setCheckedIn(zoneId);
    if (zoneId) {
      setSnapshot(s => ({
        ...s,
        total: s.total + 1,
        zones: { ...s.zones, [zoneId]: (s.zones[zoneId] || 0) + 1 },
      }));
    }
  }

  function handleAddSupply(item) {
    setSnapshot(s => ({ ...s, supplies: [item, ...s.supplies] }));
  }

  function handleToggleSupply(id) {
    setSnapshot(s => ({
      ...s,
      supplies: s.supplies.map(item =>
        item.id === id
          ? { ...item, status: item.status === "needed" ? "resolved" : "needed" }
          : item
      ),
    }));
  }

  function handleAddAlert(alert) {
    setSnapshot(s => ({ ...s, alerts: [alert, ...s.alerts] }));
  }

  function handleVote(id, type) {
    setSnapshot(s => ({
      ...s,
      alerts: s.alerts.map(a =>
        a.id === id ? { ...a, [`${type}_count`]: a[`${type}_count`] + 1 } : a
      ),
    }));
  }

  return (
    <div className="max-w-lg mx-auto bg-gray-50 min-h-svh flex flex-col">
      <Header pinnedAnnouncement={pinned} onFeedback={() => setShowFeedback(true)} />
      <TabBar active={tab} onChange={setTab} />

      <main className="flex-1 overflow-auto pb-6">
        {tab === "status" && (
          <StatusTab snapshot={snapshot} checkedIn={checkedIn} onCheckin={handleCheckin} />
        )}
        {tab === "supplies" && (
          <SuppliesTab supplies={snapshot.supplies} onAdd={handleAddSupply} onToggleStatus={handleToggleSupply} />
        )}
        {tab === "alerts" && (
          <AlertsTab alerts={snapshot.alerts} onAdd={handleAddAlert} onVote={handleVote} />
        )}
        {tab === "announcements" && (
          <AnnouncementsTab announcements={snapshot.announcements} />
        )}
      </main>

      <footer className="text-center text-xs text-gray-400 py-3 border-t border-gray-200 bg-white">
        개인정보를 수집하지 않습니다 · 위치는 격자 추정치
      </footer>

      {showFeedback && (
        <FeedbackModal
          onClose={() => setShowFeedback(false)}
          onSubmit={(body) => console.log("피드백:", body)}
        />
      )}
    </div>
  );
}
