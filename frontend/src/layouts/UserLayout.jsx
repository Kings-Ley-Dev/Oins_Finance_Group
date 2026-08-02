import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import { connectSocket, disconnectSocket } from "@/lib/socket";
import { useNotificationStore } from "@/store/notificationStore";

export default function UserLayout() {
  const loadNotifications = useNotificationStore((s) => s.load);

  useEffect(() => {
    loadNotifications();
    connectSocket();
    return () => disconnectSocket();
  }, []); // eslint-disable-line

  return (
    <div className="flex min-h-screen bg-ink">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 px-5 py-6 sm:px-7">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
