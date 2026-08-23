import React from "react";
import { Scan, ClipboardList, BookOpen, Bot } from "lucide-react";

export type NavTab = "scanner" | "tracker" | "encyclopedia" | "advisor";

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  trackedCount: number;
  onOpenNewScan: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  trackedCount,
  onOpenNewScan,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#151D16] border-b border-white/10 text-slate-300 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Telemetry */}
        <div
          className="flex items-center space-x-4 cursor-pointer select-none"
          onClick={onOpenNewScan}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm tracking-[0.2em] font-bold text-white uppercase">
                ONION-C // DIAGNOSTIC SYSTEM
              </span>
              <span className="text-[9px] tracking-widest text-emerald-400/70 uppercase">
                Botanical Pathology &amp; Spoilage Detection
              </span>
            </div>
          </div>
        </div>

        {/* Telemetry Status (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 text-[10px] tracking-widest uppercase opacity-60 font-mono">
          <div>Ref: OC-9422</div>
          <div>Sensor: <span className="text-green-400 font-semibold">Active</span></div>
          <div>Mode: Multi-Spectrum</div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1.5 sm:space-x-2">
          <button
            id="nav-tab-scanner"
            onClick={() => setActiveTab("scanner")}
            className={`flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors border ${
              activeTab === "scanner"
                ? "bg-green-500 text-black border-green-500 font-bold"
                : "border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Scan className="w-3.5 h-3.5" />
            <span>Scan</span>
          </button>

          <button
            id="nav-tab-tracker"
            onClick={() => setActiveTab("tracker")}
            className={`flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors border ${
              activeTab === "tracker"
                ? "bg-green-500 text-black border-green-500 font-bold"
                : "border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tracker</span>
            <span className="sm:hidden">Log</span>
            {trackedCount > 0 && (
              <span
                className={`ml-1 px-1.5 py-0.2 text-[10px] font-bold ${
                  activeTab === "tracker" ? "bg-black text-green-400" : "bg-yellow-400 text-black"
                }`}
              >
                {trackedCount}
              </span>
            )}
          </button>

          <button
            id="nav-tab-encyclopedia"
            onClick={() => setActiveTab("encyclopedia")}
            className={`flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors border ${
              activeTab === "encyclopedia"
                ? "bg-green-500 text-black border-green-500 font-bold"
                : "border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Disease Guide</span>
            <span className="sm:hidden">Guide</span>
          </button>

          <button
            id="nav-tab-advisor"
            onClick={() => setActiveTab("advisor")}
            className={`flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors border ${
              activeTab === "advisor"
                ? "bg-green-500 text-black border-green-500 font-bold"
                : "border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-green-400" />
            <span className="hidden sm:inline">Dr. Flora AI</span>
            <span className="sm:hidden">AI</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

