import React, { useState, useEffect } from 'react';
import { NotificationItem } from '../types';
import { CommodityBundle } from '../data/commoditiesData';
import { Bell } from 'lucide-react';

interface NotificationModalProps {
  commodity: CommodityBundle;
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onAddNotification: (notif: NotificationItem) => void;
  onMarkAsRead: (id: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  commodity,
  isOpen,
  onClose,
  notifications,
  onAddNotification,
  onMarkAsRead
}) => {
  const [schedules, setSchedules] = useState(commodity.dailySchedules);
  const [customTitle, setCustomTitle] = useState("");
  const [customTime, setCustomTime] = useState("06:30 WIB");

  useEffect(() => {
    setSchedules(commodity.dailySchedules);
  }, [commodity.id, commodity.dailySchedules]);

  if (!isOpen) return null;

  const handleTriggerTestPush = (title: string, message: string) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: "Baru saja",
      read: false,
      type: "jadwal"
    };
    onAddNotification(newNotif);

    // Browser Notification API if supported and granted
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body: message,
        icon: "/favicon.ico"
      });
    } else if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  };

  const handleAddCustomSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const newSch = {
      id: `sch-${Date.now()}`,
      time: customTime,
      title: customTitle,
      desc: `Pengingat jadwal kerja lapangan komoditas ${commodity.name} yang dibuat secara manual.`,
      jobId: 5,
      tag: "Kustom",
      active: true
    };
    setSchedules([newSch, ...schedules]);
    handleTriggerTestPush(`Pengingat: ${customTitle}`, `Jadwal lapangan diset untuk pukul ${customTime}`);
    setCustomTitle("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Notifikasi & Pengingat Jadwal {commodity.name}
              </h3>
              <p className="text-[11px] text-slate-500">
                Pemberitahuan otomatis untuk kegiatan kritis harian di kebun {commodity.name.toLowerCase()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        {/* Daily Pre-set Critical Schedules */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-900 dark:text-white block">
            Jadwal Operasional Harian Kritis ({commodity.name})
          </span>

          <div className="space-y-2.5">
            {schedules.map((sch) => (
              <div
                key={sch.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {sch.title}
                    </span>
                    <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {sch.time}
                    </span>
                    <span className="text-[9px] text-slate-400 border border-slate-200 dark:border-slate-700 px-1 rounded">
                      {sch.tag}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                    {sch.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleTriggerTestPush(sch.title, sch.desc)}
                  className="px-2.5 py-1.5 rounded-xl text-[11px] font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shrink-0 transition-colors shadow-xs"
                  title="Simulasikan Notifikasi Push ke HP"
                >
                  Bunyikan Alarm
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Add Custom Schedule */}
        <form onSubmit={handleAddCustomSchedule} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
            + Pasang Pengingat Jadwal Lapangan Baru
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Contoh: Pengocoran NPK 250ml per tanaman..."
              className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <input
              type="text"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="w-28 px-2 py-1.5 text-xs text-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
            />
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl"
            >
              Tambah
            </button>
          </div>
        </form>

        {/* Notification History Feed */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-900 dark:text-white block">
            Riwayat Notifikasi Terbaru
          </span>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onMarkAsRead(notif.id)}
                className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-3 transition-colors cursor-pointer ${
                  notif.read
                    ? 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    : 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                }`}
              >
                <div>
                  <div className="font-bold">{notif.title}</div>
                  <div className="text-[11px] mt-0.5 leading-snug">{notif.message}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{notif.time}</div>
                </div>

                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1" />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
