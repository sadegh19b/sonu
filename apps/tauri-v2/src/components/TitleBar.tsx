import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";

export default function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const appWindow = getCurrentWindow();

    const init = async () => {
      try {
        setIsMaximized(await appWindow.isMaximized());
      } catch {
        // ignore
      }
    };
    init();

    const unlisten = appWindow.onResized(async () => {
      try {
        setIsMaximized(await appWindow.isMaximized());
      } catch {
        // ignore
      }
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  const handleClose = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await getCurrentWindow().hide();
    } catch {
      // ignore
    }
  };

  const handleMinimize = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await getCurrentWindow().minimize();
    } catch {
      // ignore
    }
  };

  const handleMaximize = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await getCurrentWindow().toggleMaximize();
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex items-center h-9 shrink-0 bg-transparent">
      {/* App Name — draggable */}
      <div className="pl-4 flex items-center gap-2" data-tauri-drag-region>
        <span className="text-[11px] font-medium text-zinc-500 tracking-wider" data-tauri-drag-region>
          SONU
        </span>
      </div>

      {/* Spacer — draggable */}
      <div className="flex-1" data-tauri-drag-region />

      {/* Window Control Buttons — NOT draggable */}
      <div className="flex items-center h-full mr-1">
        {/* Minimize */}
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={handleMinimize}
          className="w-10 h-9 flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.06] transition-colors duration-150 rounded-sm"
          title="Minimize"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line
              x1="3"
              y1="7"
              x2="11"
              y2="7"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Maximize / Restore */}
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={handleMaximize}
          className="w-10 h-9 flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.06] transition-colors duration-150 rounded-sm"
          title={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect
                x="3.5"
                y="5"
                width="7"
                height="6"
                rx="1.2"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <path
                d="M5.5 5V4.2C5.5 3.65 5.95 3.2 6.5 3.2H10C10.55 3.2 11 3.65 11 4.2V7.5C11 8.05 10.55 8.5 10 8.5H9.2"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect
                x="3"
                y="3.5"
                width="8"
                height="7"
                rx="1.2"
                stroke="currentColor"
                strokeWidth="1.25"
              />
            </svg>
          )}
        </button>

        {/* Close */}
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={handleClose}
          className="w-10 h-9 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-red-500 transition-colors duration-150 rounded-sm"
          title="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M4 4L10 10M10 4L4 10"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
