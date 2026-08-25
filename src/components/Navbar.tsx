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
  Globe,
  Plus,
  X,
  Sparkles,
  Radio,
  ArrowRight,
  KeyRound,
  ExternalLink,
  Search,
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
  onOpenVegApi?: () => void;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
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
  onOpenVegApi,
  mobileMenuOpen = false,
  setMobileMenuOpen,
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

  const navItems = [
    {
      id: "nav-tab-scanner",
      tab: "scanner" as NavTab,
      label: "AI Crop Scanner",
      shortLabel: "Scanner",
      description: "Live Camera & Photo Diagnostic",
      icon: Scan,
      badge: null,
      color: "emerald",
    },
    {
      id: "nav-tab-tracker",
      tab: "tracker" as NavTab,
      label: "Problem Tracker",
      shortLabel: "Tracker",
      description: "Health Log & History",
      icon: ClipboardList,
      badge: trackedCount > 0 ? trackedCount : null,
      color: "emerald",
    },
    {
      id: "nav-tab-encyclopedia",
      tab: "encyclopedia" as NavTab,
      label: "Disease Guide",
      shortLabel: "Encyclopedia",
      description: "Vegetable Pathology Library",
      icon: BookOpen,
      badge: null,
      color: "emerald",
    },
    {
      id: "nav-tab-advisor",
      tab: "advisor" as NavTab,
      label: "Ask Dr. Flora",
      shortLabel: "AI Advisor",
      description: "AI Agronomist Consultation",
      icon: Bot,
      badge: "AI",
      color: "emerald",
    },
    {
      id: "nav-tab-admin",
      tab: "admin" as NavTab,
      label: "Admin Vault",
      shortLabel: "Admin",
      description: "Security & User Accounts",
      icon: Shield,
      badge: "Passkey",
      color: "amber",
      customAction: onOpenAdmin,
    },
  ];

  const handleTabClick = (item: typeof navItems[0]) => {
    if (item.customAction) {
      item.customAction();
    } else {
      setActiveTab(item.tab);
    }
    if (setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  // Reusable Vertical Navigation Content
  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-4 sm:p-5 text-slate-200 select-none">
      {/* Top section: Brand & User Profile */}
      <div className="space-y-4">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-900/30">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              onOpenNewScan();
              if (setMobileMenuOpen) setMobileMenuOpen(false);
            }}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-950/60 group-hover:scale-105 transition-transform shrink-0">
              <Scan className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base text-white tracking-tight uppercase">
                  VEGES TRACKER
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase tracking-wider">
                  AI SCANNER
                </span>
                <span className="text-[10px] text-slate-400">Right Nav Tool</span>
              </div>
            </div>
          </div>

          {/* Close button on mobile */}
          {setMobileMenuOpen && (
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-slate-400 hover:text-white lg:hidden"
              aria-label="Close navigation"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* User Account Card / Sign In */}
        <div className="relative" ref={dropdownRef}>
          {user ? (
            <div className="rounded-2xl bg-[#0e1610] border border-emerald-900/40 p-3 shadow-inner">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xl ${
                      isAdminUser ? "bg-amber-600" : "bg-emerald-600"
                    } text-white font-bold text-xs flex items-center justify-center shadow-md shrink-0`}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      {user.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                      {getRoleIcon(user.role)}
                      <span>{user.role}</span>
                    </div>
                  </div>
                </div>

                <button
                  id="btn-user-profile-menu"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="p-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/50 border border-emerald-800/40 text-slate-300 hover:text-white transition-colors shrink-0"
                  title="Account Menu"
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      profileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Profile Dropdown Popup (Positioned towards the left/bottom of card) */}
              {profileDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-[#141d16] border border-emerald-900/50 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-2 border-b border-emerald-900/30">
                    <div className="text-xs font-bold text-white truncate">{user.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono truncate">{user.email}</div>
                  </div>

                  <div className="py-1 space-y-1">
                    <button
                      id="btn-profile-admin-vault"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenAdmin();
                        if (setMobileMenuOpen) setMobileMenuOpen(false);
                      }}
                      className="w-full px-2.5 py-1.5 text-left text-xs text-amber-300 hover:bg-amber-950/40 rounded-xl flex items-center gap-2 transition-colors font-medium"
                    >
                      <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Admin Pass &amp; User Vault</span>
                    </button>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenAuth();
                        if (setMobileMenuOpen) setMobileMenuOpen(false);
                      }}
                      className="w-full px-2.5 py-1.5 text-left text-xs text-slate-300 hover:text-white hover:bg-emerald-950/40 rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Switch / Edit Account</span>
                    </button>

                    <button
                      id="btn-nav-signout"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full px-2.5 py-1.5 text-left text-xs text-red-400 hover:bg-red-950/40 rounded-xl flex items-center gap-2 transition-colors font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5 shrink-0" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              id="btn-nav-signin"
              onClick={() => {
                onOpenAuth();
                if (setMobileMenuOpen) setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-md shadow-emerald-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <UserIcon className="w-4 h-4" />
              <span>Sign In / Create Account</span>
            </button>
          )}
        </div>

        {/* Section Label */}
        <div className="px-1 pt-1 flex items-center justify-between text-[11px] font-bold text-slate-400 tracking-wider uppercase">
          <span>Navigation Menu</span>
          <span className="text-[10px] text-emerald-400/80 font-normal">Right Sidebar</span>
        </div>

        {/* Vertical Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            const isAmber = item.color === "amber";

            return (
              <button
                key={item.id}
                id={item.id}
                onClick={() => handleTabClick(item)}
                className={`w-full text-left p-2.5 sm:p-3 rounded-2xl transition-all flex items-center justify-between group cursor-pointer ${
                  isActive
                    ? isAmber
                      ? "bg-gradient-to-r from-amber-950/80 to-amber-900/50 border border-amber-500/40 text-white shadow-lg shadow-amber-950/40"
                      : "bg-gradient-to-r from-emerald-900/80 to-teal-900/50 border border-emerald-500/40 text-white shadow-lg shadow-emerald-950/40"
                    : "bg-[#0d140f] hover:bg-[#152118] border border-emerald-900/20 text-slate-300 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? isAmber
                          ? "bg-amber-500 text-slate-950 shadow-md"
                          : "bg-emerald-500 text-slate-950 shadow-md"
                        : isAmber
                        ? "bg-amber-950/50 text-amber-400 border border-amber-800/30 group-hover:border-amber-500/50"
                        : "bg-emerald-950/50 text-emerald-400 border border-emerald-800/30 group-hover:border-emerald-500/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-semibold truncate leading-tight flex items-center gap-1.5">
                      <span>{item.label}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </div>

                {/* Badges / Active indicator */}
                <div className="shrink-0 flex items-center gap-1.5 ml-2">
                  {item.badge !== null && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? isAmber
                            ? "bg-amber-400 text-slate-950 font-black"
                            : "bg-emerald-400 text-slate-950 font-black"
                          : isAmber
                          ? "bg-amber-950/80 text-amber-300 border border-amber-700/40"
                          : "bg-emerald-950/80 text-emerald-300 border border-emerald-700/40"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isActive
                        ? "text-emerald-400 translate-x-0.5"
                        : "text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Center/Bottom Tools: Quick Actions & Utilities */}
      <div className="space-y-3 pt-4 border-t border-emerald-900/30 mt-4">
        <div className="px-1 flex items-center justify-between text-[11px] font-bold text-slate-400 tracking-wider uppercase">
          <span>Quick Actions</span>
          <Sparkles className="w-3 h-3 text-emerald-400" />
        </div>

        {/* Start New Scan Action */}
        <button
          id="nav-btn-start-scan"
          onClick={() => {
            onOpenNewScan();
            if (setMobileMenuOpen) setMobileMenuOpen(false);
          }}
          className="w-full py-2.5 px-3 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 text-xs font-semibold flex items-center justify-between transition-all group shadow-sm cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Plus className="w-3.5 h-3.5" />
            </div>
            <span>Start Fresh Scan</span>
          </div>
          <span className="text-[10px] text-emerald-400/80 font-mono">Camera</span>
        </button>

        {/* Search & Google Live Data Modal Button */}
        {onOpenVegApi && (
          <button
            id="nav-btn-open-veg-api"
            onClick={() => {
              onOpenVegApi();
              if (setMobileMenuOpen) setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 px-3 rounded-2xl bg-[#0e1610] hover:bg-[#17231a] border border-teal-800/40 text-teal-300 hover:text-teal-100 text-xs font-semibold flex items-center justify-between transition-all group shadow-sm cursor-pointer"
            title="Open Search & Extension Intelligence Engine"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-400">
                <Search className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <div className="leading-tight">Search</div>
                <div className="text-[10px] text-teal-400/80 leading-tight font-normal">
                  Google &amp; Extension Data
                </div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-teal-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Status indicator badge */}
        <div className="p-2.5 rounded-2xl bg-[#0a0f0b] border border-emerald-900/30 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">Gemini 2.5 Vision</span>
          </div>
          <span className="font-mono text-[10px] text-emerald-400">Online</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Right-Hand Vertical Navigation Sidebar */}
      <aside
        id="right-vertical-navbar"
        className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:w-72 xl:w-80 shrink-0 border-l border-emerald-900/30 bg-[#121a14]/95 backdrop-blur-md flex-col z-30 overflow-y-auto"
      >
        {sidebarContent}
      </aside>

      {/* 2. Mobile Floating/Slide-in Right Vertical Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
          />

          {/* Sliding Right-Hand Drawer */}
          <aside
            id="mobile-right-vertical-navbar"
            className="relative w-80 max-w-[85vw] h-full bg-[#121a14] border-l border-emerald-900/40 shadow-2xl overflow-y-auto z-10 flex flex-col"
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
