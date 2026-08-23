import React, { useState, useRef, useEffect } from "react";
import {
  Scan,
  ClipboardList,
  BookOpen,
  Bot,
  LogOut,
  User as UserIcon,
  ChevronDown,
  Sprout,
  Wheat,
  ChefHat,
  Microscope,
  ShieldAlert,
  Shield,
} from "lucide-react";
import { UserProfile } from "../types";

export type NavTab = "scanner" | "tracker" | "encyclopedia" | "advisor" | "admin";

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  trackedCount: number;
  onOpenNewScan: () => void;
  user: UserProfile | null;
  onSignOut: () => void;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  trackedCount,
  onOpenNewScan,
  user,
  onSignOut,
  onOpenAuth,
  onOpenAdmin,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getRoleIcon = (role?: UserProfile["role"]) => {
    switch (role) {
      case "Administrator":
        return <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />;
      case "Home Gardener":
        return <Sprout className="w-3.5 h-3.5 text-emerald-400" />;
      case "Organic Farmer":
        return <Wheat className="w-3.5 h-3.5 text-teal-400" />;
      case "Grocer / Kitchen":
        return <ChefHat className="w-3.5 h-3.5 text-amber-400" />;
      case "Agri Specialist":
        return <Microscope className="w-3.5 h-3.5 text-cyan-400" />;
      default:
        return <UserIcon className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const isAdminUser = user?.isAdmin === true || user?.role === "Administrator";

  return (
    <header className="sticky top-0 z-40 bg-[#141d16]/95 backdrop-blur border-b border-emerald-900/30 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <div
          className="flex items-center space-x-3 cursor-pointer select-none shrink-0"
          onClick={onOpenNewScan}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-950/40">
            <Scan className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg text-white tracking-tight">
                CropVision
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-medium hidden sm:inline-block">
                AI Scanner
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden md:block">
              Vegetable Disease &amp; Health Checker
            </p>
          </div>
        </div>

        {/* Center / Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto">
          <button
            id="nav-tab-scanner"
            onClick={() => setActiveTab("scanner")}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === "scanner"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40 font-semibold"
                : "text-slate-300 hover:text-white hover:bg-emerald-950/40"
            }`}
          >
            <Scan className="w-4 h-4" />
            <span className="hidden xs:inline">Scan</span>
          </button>

          <button
            id="nav-tab-tracker"
            onClick={() => setActiveTab("tracker")}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all relative ${
              activeTab === "tracker"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40 font-semibold"
                : "text-slate-300 hover:text-white hover:bg-emerald-950/40"
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span className="hidden sm:inline">My Tracker</span>
            <span className="sm:hidden">Tracker</span>
            {trackedCount > 0 && (
              <span
                className={`ml-1 px-1.5 py-0.2 rounded-full text-xs font-bold ${
                  activeTab === "tracker"
                    ? "bg-white text-emerald-900"
                    : "bg-emerald-500 text-slate-950"
                }`}
              >
                {trackedCount}
              </span>
            )}
          </button>

          <button
            id="nav-tab-encyclopedia"
            onClick={() => setActiveTab("encyclopedia")}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === "encyclopedia"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40 font-semibold"
                : "text-slate-300 hover:text-white hover:bg-emerald-950/40"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Disease Guide</span>
            <span className="sm:hidden">Guide</span>
          </button>

          <button
            id="nav-tab-advisor"
            onClick={() => setActiveTab("advisor")}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === "advisor"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40 font-semibold"
                : "text-slate-300 hover:text-white hover:bg-emerald-950/40"
            }`}
          >
            <Bot className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Ask Dr. Flora</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Admin Navigation Tab */}
          <button
            id="nav-tab-admin"
            onClick={onOpenAdmin}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === "admin"
                ? "bg-amber-600 text-white shadow-md shadow-amber-950/50 font-semibold"
                : "text-amber-300/80 hover:text-amber-200 hover:bg-amber-950/30"
            }`}
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Admin Vault</span>
            <span className="md:hidden">Admin</span>
          </button>
        </nav>

        {/* Right / User Profile or Sign In */}
        <div className="flex items-center space-x-2 shrink-0">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                id="btn-user-profile-menu"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  isAdminUser
                    ? "bg-[#161a12] hover:bg-[#202719] border-amber-800/50"
                    : "bg-[#0d130e] hover:bg-[#1a261d] border-emerald-900/40"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg ${
                    isAdminUser ? "bg-amber-600" : "bg-emerald-600"
                  } text-white font-bold text-xs flex items-center justify-center shadow-inner`}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-xs font-semibold text-white leading-tight">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">
                    {user.role}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-[#141d16] border border-emerald-900/40 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in">
                  <div className="p-2.5 border-b border-emerald-900/30">
                    <div className="font-semibold text-xs text-white">
                      {user.name}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {user.email}
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 w-fit">
                      {getRoleIcon(user.role)}
                      <span>{user.role}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      id="btn-profile-admin-vault"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenAdmin();
                      }}
                      className="w-full px-3 py-2 text-left text-xs text-amber-300 hover:bg-amber-950/40 rounded-lg flex items-center gap-2 transition-colors font-medium"
                    >
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                      <span>Admin Pass &amp; User Vault</span>
                    </button>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenAuth();
                      }}
                      className="w-full px-3 py-2 text-left text-xs text-slate-300 hover:text-white hover:bg-emerald-950/40 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>Switch / Edit Account</span>
                    </button>

                    <button
                      id="btn-nav-signout"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full px-3 py-2 text-left text-xs text-red-400 hover:bg-red-950/40 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              id="btn-nav-signin"
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-950/40 transition-all flex items-center gap-1.5"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
