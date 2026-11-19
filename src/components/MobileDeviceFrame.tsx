import React from 'react';
import { Wifi, BatteryMedium, Signal, ChevronLeft } from 'lucide-react';

interface MobileDeviceFrameProps {
  isMobileDeviceView: boolean;
  isOffline: boolean;
  children: React.ReactNode;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({
  isMobileDeviceView,
  isOffline,
  children
}) => {
  const [currentTime, setCurrentTime] = React.useState("07:15");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isMobileDeviceView) {
    return <div className="min-h-[calc(100vh-4rem)] w-full">{children}</div>;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full py-6 px-4 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-950 transition-colors">
      <div className="text-center mb-3">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          Mode Simulasi HP Android Lahan Praktik (Kivy / BeeWare Viewport)
        </span>
      </div>

      {/* Android Device Mockup Chassis */}
      <div className="relative w-full max-w-[410px] h-[844px] bg-slate-900 rounded-[48px] p-3 shadow-2xl ring-1 ring-slate-800 shadow-emerald-950/20 flex flex-col overflow-hidden">
        
        {/* Top Punch-Hole Camera & Speaker */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full flex items-center justify-center z-50">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900/90 ring-1 ring-slate-800"></div>
        </div>

        {/* Inner Screen Container */}
        <div className="relative w-full h-full bg-slate-50 dark:bg-slate-900 rounded-[38px] overflow-hidden flex flex-col">
          
          {/* Android Status Bar */}
          <div className="h-9 px-6 pt-1 flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300 select-none shrink-0 bg-transparent z-40">
            <span>{currentTime}</span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5" />
              {isOffline ? (
                <span className="text-[9px] font-bold text-amber-500 uppercase">OFFLINE</span>
              ) : (
                <Wifi className="w-3.5 h-3.5" />
              )}
              <BatteryMedium className="w-4 h-4" />
            </div>
          </div>

          {/* Screen Content Viewport with scrolling */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
            {children}
          </div>

          {/* Android Gesture Bar */}
          <div className="h-5 flex items-center justify-center bg-transparent shrink-0">
            <div className="w-32 h-1 bg-slate-400 dark:bg-slate-600 rounded-full"></div>
          </div>

        </div>

      </div>
    </div>
  );
};
