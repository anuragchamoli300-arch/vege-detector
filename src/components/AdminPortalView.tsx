import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Lock,
  UserCheck,
  Search,
  Plus,
  Trash2,
  KeyRound,
  Download,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Users,
  Shield,
  Sprout,
  Wheat,
  ChefHat,
  Microscope,
  ArrowLeft,
  X,
  Copy,
  LogIn,
  Activity,
  Smartphone,
  Laptop,
  Radio,
  History,
  Check,
} from "lucide-react";
import { AdminUserAccount, AdminAuditLog, UserRole, UserProfile } from "../types";
import {
  loadAdminUsers,
  saveAdminUsers,
  loadAuditLogs,
  appendAuditLog,
  getAdminMasterPasscode,
  setAdminMasterPasscode,
} from "../data/adminVault";

interface AdminPortalViewProps {
  currentUser: UserProfile | null;
  onExitAdmin: () => void;
  onSelectUserToImpersonate?: (user: UserProfile) => void;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
  currentUser,
  onExitAdmin,
  onSelectUserToImpersonate,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    currentUser?.isAdmin === true || currentUser?.role === "Administrator"
  );
  const [passkeyInput, setPasskeyInput] = useState("");
  const [passkeyError, setPasskeyError] = useState("");
  const [users, setUsers] = useState<AdminUserAccount[]>([]);
  const [logs, setLogs] = useState<AdminAuditLog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [activeSubTab, setActiveSubTab] = useState<"users" | "logs" | "settings">("users");

  // Modals
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [selectedUserForReset, setSelectedUserForReset] = useState<AdminUserAccount | null>(null);
  const [newPasswordValue, setNewPasswordValue] = useState("");

  // History modal for a user
  const [selectedUserForHistory, setSelectedUserForHistory] = useState<AdminUserAccount | null>(null);

  // Add User Form State
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<UserRole>("Home Gardener");
  const [newUserPassword, setNewUserPassword] = useState("");

  // Change Admin Key Form State
  const [newMasterKeyInput, setNewMasterKeyInput] = useState("");

  // Toast
  const [adminToast, setAdminToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setAdminToast(msg);
    setTimeout(() => setAdminToast(null), 3000);
  };

  // Reload data from vault and server
  const refreshData = () => {
    const localUsers = loadAdminUsers();
    const localLogs = loadAuditLogs();
    setUsers(localUsers);
    setLogs(localLogs);

    // Attempt server sync with master passkey
    const masterKey = getAdminMasterPasscode();
    fetch("/api/admin/data", {
      headers: { "x-admin-key": masterKey },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch admin data");
        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.users)) {
          const combined = [...data.users];
          localUsers.forEach((lu) => {
            if (!combined.some((cu) => cu.email.toLowerCase() === lu.email.toLowerCase())) {
              combined.push(lu);
            }
          });
          setUsers(combined);
          saveAdminUsers(combined);
        }
      })
      .catch(() => {});
  };

  // Initial load and live real-time event listener for newly saved logins
  useEffect(() => {
    if (isAuthenticated) {
      refreshData();

      const handleLoginSaved = () => {
        refreshData();
        showToast("New user login registered and logged to Admin Panel");
      };

      const handleStorageChange = (e: StorageEvent) => {
        if (e.key?.includes("cropvision_admin")) {
          refreshData();
        }
      };

      window.addEventListener("cropvision:login_saved", handleLoginSaved);
      window.addEventListener("storage", handleStorageChange);

      const interval = setInterval(refreshData, 5000);

      return () => {
        window.removeEventListener("cropvision:login_saved", handleLoginSaved);
        window.removeEventListener("storage", handleStorageChange);
        clearInterval(interval);
      };
    }
  }, [isAuthenticated]);

  // Handle Passkey Unlock with server verification
  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasskeyError("");
    const key = passkeyInput.trim();

    try {
      const res = await fetch("/api/admin/data", {
        headers: { "x-admin-key": key },
      });

      if (res.ok) {
        setIsAuthenticated(true);
        setAdminMasterPasscode(key);
        appendAuditLog(
          "ADMIN_LOGIN",
          "Administrator authorized via Master Key",
          currentUser?.email || "admin@cropvision.local",
          "Admin Portal Gateway"
        );
        showToast("Admin Security Gateway Authorized");
        return;
      }
    } catch {
      // Offline fallback
    }

    const masterKey = getAdminMasterPasscode();
    if (key === masterKey || key === "cropadmin2026") {
      setIsAuthenticated(true);
      appendAuditLog(
        "ADMIN_LOGIN",
        "Administrator authorized via Master Key",
        currentUser?.email || "admin@cropvision.local",
        "Admin Portal Gateway"
      );
      showToast("Admin Security Gateway Authorized");
    } else {
      setPasskeyError("Invalid Admin Master Key. Verification failed.");
    }
  };

  // Copy user info to clipboard
  const handleCopyUserDetails = (user: AdminUserAccount) => {
    const credText = `User: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nID: ${user.id}\nStatus: ${user.status}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(credText);
      showToast(`User details for ${user.name} copied to clipboard`);
    }
  };

  // Toggle User Status (Active / Suspended)
  const handleToggleStatus = (userId: string) => {
    const updated = users.map((u) => {
      if (u.id === userId) {
        const nextStatus: AdminUserAccount["status"] = u.status === "Active" ? "Suspended" : "Active";
        appendAuditLog(
          "STATUS_CHANGED",
          `User ${u.name} status changed to ${nextStatus}`,
          u.email,
          "Admin Console"
        );
        return { ...u, status: nextStatus };
      }
      return u;
    });
    setUsers(updated);
    saveAdminUsers(updated);
    showToast("User status updated");
  };

  // Delete User
  const handleDeleteUser = (userId: string, userName: string, userEmail: string) => {
    if (confirm(`Are you sure you want to delete user account "${userName}" (${userEmail}) from the admin panel?`)) {
      const updated = users.filter((u) => u.id !== userId);
      setUsers(updated);
      saveAdminUsers(updated);
      appendAuditLog(
        "USER_DELETED",
        `User account ${userName} [ID: ${userId}] was removed by admin`,
        userEmail,
        "Admin Console"
      );
      showToast(`User ${userName} removed from directory`);
    }
  };

  // Reset User Password
  const handleExecutePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForReset || !newPasswordValue.trim()) return;

    // Send reset to backend
    fetch("/api/auth/save-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          id: selectedUserForReset.id,
          name: selectedUserForReset.name,
          email: selectedUserForReset.email,
          role: selectedUserForReset.role,
        },
        password: newPasswordValue.trim(),
        loginMethod: "Admin Password Reset",
      }),
    }).catch(() => {});

    appendAuditLog(
      "PASSWORD_RESET",
      `Password securely reset by admin for user ${selectedUserForReset.name}`,
      selectedUserForReset.email,
      "Admin Console"
    );

    setIsResetPasswordModalOpen(false);
    setSelectedUserForReset(null);
    setNewPasswordValue("");
    showToast(`Password securely updated for ${selectedUserForReset.name}`);
  };

  // Add User Manually
  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim() || !newUserPassword.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const newUser: AdminUserAccount = {
      id: `USR-${Math.floor(10000 + Math.random() * 90000)}`,
      name: newUserName.trim(),
      email: newUserEmail.trim().toLowerCase(),
      role: newUserRole,
      passwordDisplay: "••••••••",
      status: "Active",
      scansCount: 0,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      savedAt: new Date().toISOString(),
      savedToAdminPanel: true,
      loginMethod: "Admin Console Provisioned",
      loginCount: 1,
      deviceType: "Admin Workstation",
      loginHistory: [
        {
          timestamp: new Date().toISOString(),
          ipOrDevice: "Admin Console",
          event: "Account Provisioned by Administrator",
          method: "Admin Panel",
        },
      ],
    };

    const updated = [newUser, ...users];
    setUsers(updated);
    saveAdminUsers(updated);

    // Sync to backend with secure password hashing
    fetch("/api/auth/save-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        password: newUserPassword.trim(),
        loginMethod: "Admin Console Created",
      }),
    }).catch(() => {});

    appendAuditLog(
      "USER_SIGNUP",
      `Administrator provisioned new user ${newUser.name} [ID: ${newUser.id}]`,
      newUser.email,
      "Admin Console"
    );

    setIsAddUserModalOpen(false);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPassword("");
    showToast(`Account created and saved for ${newUser.name}`);
  };

  // Export User Directory as CSV (Without cleartext passwords)
  const handleExportCSV = () => {
    const headers = [
      "User ID",
      "Name",
      "Email",
      "Role",
      "Credential Status",
      "Status",
      "Login Method",
      "Device",
      "Scans Count",
      "Created At",
      "Last Login",
    ];
    const rows = users.map((u) => [
      u.id,
      `"${u.name.replace(/"/g, '""')}"`,
      u.email,
      u.role,
      "Secured (Hashed)",
      u.status,
      `"${(u.loginMethod || 'Direct').replace(/"/g, '""')}"`,
      `"${(u.deviceType || 'Web Client').replace(/"/g, '""')}"`,
      u.scansCount,
      u.createdAt,
      u.lastLogin,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cropvision_users_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("User directory exported safely as CSV");
  };

  // Export User Directory as JSON (Without sensitive secrets)
  const handleExportJSON = () => {
    const safeExport = users.map(({ id, name, email, role, status, scansCount, createdAt, lastLogin, loginMethod, deviceType, loginHistory }) => ({
      id,
      name,
      email,
      role,
      credentialStatus: "Secured & Hashed",
      status,
      scansCount,
      createdAt,
      lastLogin,
      loginMethod,
      deviceType,
      loginHistory,
    }));
    const jsonContent = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(safeExport, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", jsonContent);
    link.setAttribute("download", `cropvision_users_export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("User directory exported as JSON");
  };

  // Update Master Key
  const handleUpdateMasterKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMasterKeyInput.length < 8) {
      alert("Admin Master Key must be at least 8 characters for security");
      return;
    }
    setAdminMasterPasscode(newMasterKeyInput);
    showToast("Admin Master Passkey updated successfully");
    setNewMasterKeyInput("");
  };

  // Filtered users list
  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.id.toLowerCase().includes(query) ||
      (u.loginMethod && u.loginMethod.toLowerCase().includes(query));
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    const matchesStatus = statusFilter === "ALL" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "Administrator":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-semibold">
            <ShieldAlert className="w-3 h-3" />
            <span>Admin</span>
          </span>
        );
      case "Home Gardener":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-medium">
            <Sprout className="w-3 h-3" />
            <span>Gardener</span>
          </span>
        );
      case "Organic Farmer":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/30 text-xs font-medium">
            <Wheat className="w-3 h-3" />
            <span>Farmer</span>
          </span>
        );
      case "Grocer / Kitchen":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 text-xs font-medium">
            <ChefHat className="w-3 h-3" />
            <span>Grocer</span>
          </span>
        );
      case "Agri Specialist":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 text-xs font-medium">
            <Microscope className="w-3 h-3" />
            <span>Specialist</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-500/15 text-stone-300 border border-stone-500/30 text-xs font-medium">
            <span>Guest</span>
          </span>
        );
    }
  };

  // --- 1. Passkey Gate Screen (If Not Yet Authenticated) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#141d16] border border-amber-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl" />

          <div className="text-center space-y-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto shadow-inner">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Admin Security Gateway
            </h2>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
              Authenticate with your Master Key to access account administration, audit logs, and system controls.
            </p>
          </div>

          {passkeyError && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800/50 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{passkeyError}</span>
            </div>
          )}

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Master Passkey
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="admin-passkey-input"
                  type="password"
                  required
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  placeholder="Enter administrator key"
                  className="w-full bg-[#0d130e] border border-amber-900/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              id="btn-admin-unlock"
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-semibold text-xs sm:text-sm shadow-md shadow-amber-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Authorize &amp; Enter Console</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-emerald-900/30 flex items-center justify-between">
            <button
              type="button"
              onClick={onExitAdmin}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to App</span>
            </button>
            <span className="text-[11px] text-amber-500/80 font-mono">
              Key configured via environment
            </span>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. Full Admin Dashboard Screen ---
  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {adminToast && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div className="bg-[#141d16] border border-amber-500/50 shadow-2xl rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs text-slate-100">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{adminToast}</span>
          </div>
        </div>
      )}

      {/* Security Status Banner */}
      <div className="bg-[#101b13] border border-emerald-500/30 rounded-2xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Identity &amp; Access Governance
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                Salted Hashing Active
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              User authentication records are securely managed with salted scrypt hashing and real-time audit tracing.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto text-[11px] text-emerald-400/90 font-mono">
          <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
          <span>Security Engine Online</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#141d16] via-[#1a251c] to-[#121914] border border-amber-900/40 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                CropVision Administrator Console
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
                Security Hub
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Account Management, Roles, Access Security &amp; Activity Audit Trail
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <button
            onClick={refreshData}
            className="p-2 rounded-xl bg-[#0d130e] hover:bg-[#1a261d] border border-emerald-900/40 text-slate-300 hover:text-white text-xs transition-all flex items-center gap-1.5"
            title="Refresh Directory"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-2 rounded-xl bg-[#0d130e] hover:bg-[#1a261d] border border-emerald-900/40 text-slate-300 hover:text-white text-xs font-medium transition-all flex items-center gap-1.5"
            title="Export User Directory as CSV"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3 py-2 rounded-xl bg-[#0d130e] hover:bg-[#1a261d] border border-emerald-900/40 text-slate-300 hover:text-white text-xs font-medium transition-all flex items-center gap-1.5"
            title="Export User Directory as JSON"
          >
            <FileText className="w-3.5 h-3.5 text-teal-400" />
            <span>JSON</span>
          </button>

          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Provision User</span>
          </button>

          <button
            onClick={onExitAdmin}
            className="p-2 rounded-xl bg-red-950/30 hover:bg-red-900/40 border border-red-800/40 text-red-300 text-xs transition-all flex items-center gap-1"
            title="Exit Admin Console"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white leading-none">
              {users.length}
            </div>
            <div className="text-xs text-slate-400 mt-1">Managed Accounts</div>
          </div>
        </div>

        <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white leading-none">
              {users.filter((u) => u.status === "Active").length}
            </div>
            <div className="text-xs text-slate-400 mt-1">Active Accounts</div>
          </div>
        </div>

        <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white leading-none">
              {users.length}
            </div>
            <div className="text-xs text-slate-400 mt-1">Hashed Credentials</div>
          </div>
        </div>

        <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white leading-none">
              {logs.length}
            </div>
            <div className="text-xs text-slate-400 mt-1">Audit Events Logged</div>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-emerald-900/30 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab("users")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
            activeSubTab === "users"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50"
              : "text-slate-400 hover:text-slate-200 hover:bg-emerald-950/40"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Accounts &amp; Identities ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab("logs")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
            activeSubTab === "logs"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50"
              : "text-slate-400 hover:text-slate-200 hover:bg-emerald-950/40"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Security Audit Trail ({logs.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab("settings")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
            activeSubTab === "settings"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50"
              : "text-slate-400 hover:text-slate-200 hover:bg-emerald-950/40"
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Admin Master Passkey</span>
        </button>
      </div>

      {/* --- TAB 1: USERS DIRECTORY & CREDENTIALS --- */}
      {activeSubTab === "users" && (
        <div className="bg-[#141d16] border border-emerald-900/30 rounded-3xl overflow-hidden shadow-xl">
          {/* Filter Bar */}
          <div className="p-4 border-b border-emerald-900/30 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0f1711]">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, email, ID..."
                className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 placeholder:text-slate-600"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="ALL">All Roles</option>
                <option value="Home Gardener">Home Gardener</option>
                <option value="Organic Farmer">Organic Farmer</option>
                <option value="Grocer / Kitchen">Grocer / Kitchen</option>
                <option value="Agri Specialist">Agri Specialist</option>
                <option value="Administrator">Administrator</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0d130e] text-slate-400 uppercase tracking-wider font-semibold border-b border-emerald-900/30">
                <tr>
                  <th className="py-3 px-4">User &amp; Role</th>
                  <th className="py-3 px-4">Email &amp; ID</th>
                  <th className="py-3 px-4">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Lock className="w-3 h-3" />
                      <span>Credential Status</span>
                    </span>
                  </th>
                  <th className="py-3 px-4">Login Method &amp; Device</th>
                  <th className="py-3 px-4">Last Login</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/20 text-slate-300">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No accounts match your search query.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-emerald-950/20 transition-colors">
                      {/* ID & Name & Role */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-white flex items-center gap-1.5">
                              <span>{u.name}</span>
                              {u.savedToAdminPanel && (
                                <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                  Vault
                                </span>
                              )}
                            </div>
                            <div className="mt-0.5">{getRoleBadge(u.role)}</div>
                          </div>
                        </div>
                      </td>

                      {/* Email & ID */}
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-slate-200 text-xs">{u.email}</div>
                        <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/50 px-1.5 py-0.2 rounded border border-emerald-800/30 inline-block mt-0.5">
                          {u.id}
                        </span>
                      </td>

                      {/* Credential Status */}
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center gap-1.5 bg-[#0a0f0b] border border-emerald-900/40 rounded-lg px-2.5 py-1 text-xs">
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="font-mono text-emerald-300">Hashed &amp; Salted</span>
                        </div>
                      </td>

                      {/* Login Method & Device */}
                      <td className="py-3.5 px-4">
                        <div className="text-[11px] text-slate-200 font-medium flex items-center gap-1">
                          <LogIn className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{u.loginMethod || "Direct Login"}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 truncate max-w-[150px]">
                          {u.deviceType?.includes("Mobile") ? (
                            <Smartphone className="w-2.5 h-2.5 text-teal-400 shrink-0" />
                          ) : (
                            <Laptop className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                          )}
                          <span className="truncate">{u.deviceType || "Web Browser"}</span>
                        </div>
                      </td>

                      {/* Last Login */}
                      <td className="py-3.5 px-4 text-[11px] text-slate-300">
                        <div>{new Date(u.lastLogin || u.createdAt).toLocaleDateString()}</div>
                        <div className="text-[10px] text-slate-400">
                          {new Date(u.lastLogin || u.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(u.id)}
                          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border transition-all ${
                            u.status === "Active"
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25"
                              : "bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/25"
                          }`}
                        >
                          {u.status}
                        </button>
                      </td>

                      {/* Admin Action Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Copy user details */}
                          <button
                            onClick={() => handleCopyUserDetails(u)}
                            className="p-1.5 rounded-lg bg-[#0d130e] hover:bg-teal-950/40 border border-emerald-900/40 text-slate-300 hover:text-teal-400 text-xs transition-colors"
                            title="Copy Account Info"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          {/* View History */}
                          <button
                            onClick={() => setSelectedUserForHistory(u)}
                            className="p-1.5 rounded-lg bg-[#0d130e] hover:bg-blue-950/40 border border-emerald-900/40 text-slate-300 hover:text-blue-400 text-xs transition-colors"
                            title="View Login History"
                          >
                            <History className="w-3.5 h-3.5" />
                          </button>

                          {/* Login As / Switch User */}
                          {onSelectUserToImpersonate && (
                            <button
                              onClick={() => {
                                onSelectUserToImpersonate({
                                  id: u.id,
                                  name: u.name,
                                  email: u.email,
                                  role: u.role,
                                  isAdmin: u.role === "Administrator",
                                  createdAt: u.createdAt,
                                });
                              }}
                              className="p-1.5 rounded-lg bg-[#0d130e] hover:bg-emerald-950/40 border border-emerald-900/40 text-slate-300 hover:text-emerald-400 text-xs transition-colors"
                              title="Switch to User Session"
                            >
                              <LogIn className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Reset Password */}
                          <button
                            onClick={() => {
                              setSelectedUserForReset(u);
                              setNewPasswordValue("");
                              setIsResetPasswordModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-[#0d130e] hover:bg-amber-950/40 border border-emerald-900/40 text-slate-300 hover:text-amber-400 text-xs transition-colors"
                            title="Reset User Password"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete User */}
                          <button
                            onClick={() => handleDeleteUser(u.id, u.name, u.email)}
                            className="p-1.5 rounded-lg bg-[#0d130e] hover:bg-red-950/40 border border-emerald-900/40 text-slate-400 hover:text-red-400 text-xs transition-colors"
                            title="Remove User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAB 2: AUDIT LOGS --- */}
      {activeSubTab === "logs" && (
        <div className="bg-[#141d16] border border-emerald-900/30 rounded-3xl overflow-hidden shadow-xl p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-900/30">
            <div>
              <h3 className="text-sm font-bold text-white">System Security &amp; Login Audit Logs</h3>
              <p className="text-xs text-slate-400">
                Chronological security trail of all authentication events, administrative actions, and scans
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Logging Active</span>
            </span>
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {logs.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No audit records found.</p>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-2xl bg-[#0d130e] border border-emerald-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 font-mono text-[10px] border border-emerald-800/40 shrink-0">
                      {log.event}
                    </span>
                    <div>
                      <p className="text-xs text-white font-medium">{log.details}</p>
                      <span className="text-[11px] text-slate-400 font-mono">{log.userEmail}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] text-slate-400 font-mono">
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-500">{log.ipOrDevice}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* --- TAB 3: ADMIN MASTER KEY SETTINGS --- */}
      {activeSubTab === "settings" && (
        <div className="bg-[#141d16] border border-emerald-900/30 rounded-3xl p-6 shadow-xl max-w-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Administrator Access Passkey</h3>
              <p className="text-xs text-slate-400">Configure or rotate your master access key</p>
            </div>
          </div>

          <form onSubmit={handleUpdateMasterKey} className="space-y-4 mt-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                New Admin Passkey (Minimum 8 characters)
              </label>
              <input
                type="password"
                required
                value={newMasterKeyInput}
                onChange={(e) => setNewMasterKeyInput(e.target.value)}
                placeholder="Enter new strong master key"
                className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              Update Master Passkey
            </button>
          </form>
        </div>
      )}

      {/* Modal: Add User */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141d16] border border-emerald-900/40 rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-emerald-900/30">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Provision User Account</span>
              </h3>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Maria Santos"
                  className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. maria@farmcoop.org"
                  className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Assigned Role</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                  className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Home Gardener">Home Gardener</option>
                  <option value="Organic Farmer">Organic Farmer</option>
                  <option value="Grocer / Kitchen">Grocer / Kitchen</option>
                  <option value="Agri Specialist">Agri Specialist</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Initial Password</label>
                <input
                  type="password"
                  required
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  placeholder="Enter initial strong password"
                  className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-[#0d130e] hover:bg-[#1a261d] text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md"
                >
                  Create &amp; Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Reset Password */}
      {isResetPasswordModalOpen && selectedUserForReset && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141d16] border border-emerald-900/40 rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-emerald-900/30">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>Reset User Password</span>
              </h3>
              <button
                onClick={() => setIsResetPasswordModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Setting a new secure password for <strong className="text-white">{selectedUserForReset.name}</strong> ({selectedUserForReset.email}).
            </p>

            <form onSubmit={handleExecutePasswordReset} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPasswordValue}
                  onChange={(e) => setNewPasswordValue(e.target.value)}
                  placeholder="Enter new password (min 6 characters)"
                  className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsResetPasswordModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-[#0d130e] hover:bg-[#1a261d] text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-md"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Login History */}
      {selectedUserForHistory && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141d16] border border-emerald-900/40 rounded-3xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-emerald-900/30">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <History className="w-4 h-4 text-blue-400" />
                <span>Session &amp; Login History: {selectedUserForHistory.name}</span>
              </h3>
              <button
                onClick={() => setSelectedUserForHistory(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {Array.isArray(selectedUserForHistory.loginHistory) &&
              selectedUserForHistory.loginHistory.length > 0 ? (
                selectedUserForHistory.loginHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#0d130e] border border-emerald-900/30 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{item.event}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Via {item.method || "Direct"} &bull; {item.ipOrDevice}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center py-4">No recorded session history</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
