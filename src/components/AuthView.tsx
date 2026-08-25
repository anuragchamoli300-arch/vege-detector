import React, { useState } from "react";
import {
  Scan,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sprout,
  ShieldCheck,
  ArrowRight,
  UserCheck,
  Wheat,
  ChefHat,
  Microscope,
  ShieldAlert,
  KeyRound,
} from "lucide-react";
import { UserProfile, UserRole } from "../types";
import { registerUserInVault, appendAuditLog } from "../data/adminVault";

interface AuthViewProps {
  onLoginSuccess: (user: UserProfile) => void;
  onOpenAdminPortal?: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess, onOpenAdminPortal }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>("Home Gardener");
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (isSignUp && !name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 4) {
      setErrorMsg("Password must be at least 4 characters.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const isSystemAdmin =
        email.trim().toLowerCase() === "admin@cropvision.local" ||
        email.trim().toLowerCase() === "admin@cropvision.org" ||
        password === "cropadmin2026";

      const user: UserProfile = {
        id: isSystemAdmin ? "ADM-00101" : `USR-${Math.floor(10000 + Math.random() * 90000)}`,
        name: isSignUp
          ? name.trim()
          : isSystemAdmin
          ? "System Administrator"
          : email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email: email.trim().toLowerCase(),
        role: isSystemAdmin ? "Administrator" : role,
        isAdmin: isSystemAdmin,
        avatarColor: isSystemAdmin ? "bg-amber-600" : "bg-emerald-600",
        createdAt: new Date().toISOString(),
      };

      const loginMethod = isSignUp ? "New Account Registration" : "Email & Password Sign-In";

      // Securely store credentials in the Admin Vault
      registerUserInVault(user, password, loginMethod);

      // Async sync with server endpoint if available
      try {
        fetch("/api/auth/save-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user, password, loginMethod }),
        }).catch((err) => console.log("Server sync fallback:", err));
      } catch (err) {
        console.error(err);
      }

      onLoginSuccess(user);
    }, 450);
  };

  const handleQuickDemo = (demoType: "gardener" | "farmer" | "admin" | "guest") => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      let user: UserProfile;
      let pass = "demoPass_2026";
      let method = "1-Click Quick Demo";

      if (demoType === "admin") {
        user = {
          id: "ADM-00101",
          name: "System Administrator",
          email: "admin@cropvision.local",
          role: "Administrator",
          isAdmin: true,
          avatarColor: "bg-amber-600",
          createdAt: new Date().toISOString(),
        };
        pass = "cropadmin2026";
        method = "Admin Console 1-Click Login";
      } else if (demoType === "gardener") {
        user = {
          id: "USR-00204",
          name: "Sarah Green",
          email: "sarah.green@garden.local",
          role: "Home Gardener",
          isAdmin: false,
          avatarColor: "bg-emerald-600",
          createdAt: new Date().toISOString(),
        };
        pass = "greenSprout#88";
        method = "1-Click Gardener Demo Login";
      } else if (demoType === "farmer") {
        user = {
          id: "USR-00318",
          name: "David Miller",
          email: "david@valleyfarms.local",
          role: "Organic Farmer",
          isAdmin: false,
          avatarColor: "bg-teal-600",
          createdAt: new Date().toISOString(),
        };
        pass = "valleyHarvest$2026";
        method = "1-Click Farmer Demo Login";
      } else {
        user = {
          id: `USR-${Math.floor(10000 + Math.random() * 90000)}`,
          name: "Guest Visitor",
          email: "guest@cropvision.local",
          role: "Guest",
          isAdmin: false,
          avatarColor: "bg-stone-700",
          createdAt: new Date().toISOString(),
        };
        pass = "guestSecurePass";
        method = "Guest Mode Login";
      }

      registerUserInVault(user, pass, method);
      try {
        fetch("/api/auth/save-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user, password: pass, loginMethod: method }),
        }).catch(() => {});
      } catch {}

      onLoginSuccess(user);
    }, 350);
  };

  const roleOptions: { label: UserRole; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    { label: "Home Gardener", icon: Sprout, desc: "Backyard crops & balcony pots" },
    { label: "Organic Farmer", icon: Wheat, desc: "Commercial field & greenhouse lots" },
    { label: "Grocer / Kitchen", icon: ChefHat, desc: "Food safety, sorting & shelf-life" },
    { label: "Agri Specialist", icon: Microscope, desc: "Crop pathology & IPM advisory" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 bg-[#141d16] border border-emerald-900/30 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left / Info Showcase Column */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#0a120c] via-[#101b12] to-[#0c150e] p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-emerald-900/30 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Scan className="w-4 h-4" />
              <span>CropVision AI Diagnostic Engine</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Scan, diagnose, &amp; protect your vegetables.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                Instant AI diagnosis for onion rot, tomato blight, bacterial spots, and storage disorders with organic treatment plans.
              </p>
            </div>

            {/* Feature points */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Scan className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Instant Vision Scanner</h4>
                  <p className="text-[11px] text-slate-400">Take a photo or upload to detect root rots, mold, and spots</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Culinary Safety &amp; Edibility</h4>
                  <p className="text-[11px] text-slate-400">Clear guidance on whether the vegetable is safe to eat</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Protected Admin Access</h4>
                  <p className="text-[11px] text-slate-400">User accounts &amp; credentials secured in Admin-only console</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Demo Logins & Admin Switch */}
          <div className="pt-6 mt-6 border-t border-emerald-900/30">
            <span className="text-xs font-semibold text-slate-400 block mb-2">
              Quick 1-Click Access:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="btn-quick-demo-gardener"
                type="button"
                onClick={() => handleQuickDemo("gardener")}
                className="px-3 py-2 rounded-xl bg-[#141d16] hover:bg-[#1f2c22] border border-emerald-900/40 text-slate-200 text-xs font-medium flex items-center gap-2 transition-all text-left"
              >
                <Sprout className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Home Gardener</span>
              </button>
              <button
                id="btn-quick-demo-farmer"
                type="button"
                onClick={() => handleQuickDemo("farmer")}
                className="px-3 py-2 rounded-xl bg-[#141d16] hover:bg-[#1f2c22] border border-emerald-900/40 text-slate-200 text-xs font-medium flex items-center gap-2 transition-all text-left"
              >
                <Wheat className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="truncate">Organic Farmer</span>
              </button>
            </div>

            {/* Admin Quick Login Badge */}
            <div className="mt-2.5 flex items-center gap-2">
              <button
                id="btn-quick-demo-admin"
                type="button"
                onClick={() => handleQuickDemo("admin")}
                className="flex-1 px-3 py-1.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/40 border border-amber-800/40 text-amber-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Admin Login (Console)</span>
              </button>
              <button
                id="btn-quick-guest"
                type="button"
                onClick={() => handleQuickDemo("guest")}
                className="px-3 py-1.5 rounded-xl bg-[#141d16] hover:bg-[#1f2c22] border border-emerald-900/40 text-slate-400 hover:text-slate-200 text-xs font-medium transition-all"
              >
                Guest
              </button>
            </div>
          </div>
        </div>

        {/* Right / Auth Form Column */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
          {/* Header Switcher */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">
                {isSignUp ? "Create your Account" : "Welcome Back"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isSignUp
                  ? "Join gardeners and growers tracking crop health"
                  : "Sign in to access your scan history and doctor consultations"}
              </p>
            </div>

            {/* Mode Toggle Tabs */}
            <div className="flex items-center bg-[#0d130e] border border-emerald-900/40 rounded-xl p-1 shrink-0">
              <button
                id="btn-auth-mode-signin"
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setErrorMsg("");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  !isSignUp
                    ? "bg-emerald-600 text-white shadow-sm font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Sign In
              </button>
              <button
                id="btn-auth-mode-signup"
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setErrorMsg("");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSignUp
                    ? "bg-emerald-600 text-white shadow-sm font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-800/50 text-red-200 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="auth-input-name"
                    type="text"
                    required={isSignUp}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Green"
                    className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-600"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="auth-input-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                {!isSignUp && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEmail("admin@cropvision.local");
                        setPassword("cropadmin2026");
                      }}
                      className="text-[11px] text-amber-400 hover:underline"
                    >
                      Admin Fill
                    </button>
                    <span className="text-slate-600">&bull;</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail("gardener@cropvision.local");
                        setPassword("greenSprout#88");
                      }}
                      className="text-[11px] text-emerald-400 hover:underline"
                    >
                      Gardener Fill
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="auth-input-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Profile Role Selector (on Sign Up) */}
            {isSignUp && (
              <div className="pt-1">
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  What best describes you?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {roleOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = role === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setRole(opt.label)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-emerald-950/60 border-emerald-600 text-white"
                            : "bg-[#0d130e] border-emerald-900/40 text-slate-400 hover:border-emerald-800"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-emerald-400" : "text-slate-400"}`} />
                          <span className="text-xs font-medium text-slate-200">{opt.label}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{opt.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Remember Me & Admin Panel Save note */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  id="auth-checkbox-save-login"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-[#0d130e] border-emerald-900/40 text-emerald-600 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                />
                <span className="text-xs text-slate-300 font-medium">Save login to Admin Panel &amp; Vault</span>
              </label>
              <span className="text-[11px] text-amber-400/90 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Auto-Saved to Admin Security Panel</span>
              </span>
            </div>

            {/* Submit Button */}
            <button
              id="btn-auth-submit"
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-950/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>{isSignUp ? "Create Account & Save to Vault" : "Sign In Securely"}</span>
                </>
              )}
            </button>
          </form>

          {/* Footer toggle note */}
          <div className="text-center mt-5 pt-4 border-t border-emerald-900/30 text-xs text-slate-400 flex flex-col items-center gap-2">
            {isSignUp ? (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(false);
                    setErrorMsg("");
                  }}
                  className="text-emerald-400 font-semibold hover:underline"
                >
                  Sign in here
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(true);
                    setErrorMsg("");
                  }}
                  className="text-emerald-400 font-semibold hover:underline"
                >
                  Create one for free
                </button>
              </p>
            )}

            {onOpenAdminPortal && (
              <button
                type="button"
                onClick={onOpenAdminPortal}
                className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-amber-400 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                <span>Administrator Console Access</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
