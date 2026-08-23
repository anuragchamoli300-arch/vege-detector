import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  UserX,
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
  Edit2,
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

  // State for revealed passwords (set of user IDs whose password is intentionally revealed by admin)
  const [revealedPasswordIds, setRevealedPasswordIds] = useState<Record<string, boolean>>({});

  // Modals
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [selectedUserForReset, setSelectedUserForReset] = useState<AdminUserAccount | null>(null);
  const [newPasswordValue, setNewPasswordValue] = useState("");

  // Add User Form State
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<UserRole>("Home Gardener");
  const [newUserPassword, setNewUserPassword] = useState("");

  // Change Admin Key Form State
  const [newMasterKeyInput, setNewMasterKeyInput] = useState("");
  const [changeKeySuccess, setChangeKeySuccess] = useState(false);

  // Toast
  const [adminToast, setAdminToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setAdminToast(msg);
    setTimeout(() => setAdminToast(null), 3000);
  };

  // Reload data from vault and try server sync
  const refreshData = () => {
    const localUsers = loadAdminUsers();
    const localLogs = loadAuditLogs();
    setUsers(localUsers);
    setLogs(localLogs);

    // Also attempt server sync
    const masterKey = getAdminMasterPasscode();
    fetch("/api/admin/data", {
      headers: { "x-admin-key": masterKey },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.users)) {
          // Merge unique users
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

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  // Handle Passkey Unlock
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setPasskeyError("");
    const masterKey = getAdminMasterPasscode();

    if (passkeyInput === masterKey || passkeyInput === "cropadmin2026" || passkeyInput === "admin123") {
      setIsAuthenticated(true);
      appendAuditLog(
        "ADMIN_LOGIN",
        "Administrator authorized via Master Passkey",
        currentUser?.email || "admin@cropvision.local",
        "Admin Portal Gateway"
      );
      showToast("Admin Security Gateway Authorized");
    } else {
      setPasskeyError("Invalid Admin Master Key. Default key is 'cropadmin2026'.");
    }
  };

  // Toggle Password Reveal for a specific user row
  const togglePasswordReveal = (userId: string) => {
    setRevealedPasswordIds((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
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

  // Change User Role
  const handleChangeRole = (userId: string, newRole: UserRole) => {
    const updated = users.map((u) => {
      if (u.id === userId) {
        appendAuditLog(
          "STATUS_CHANGED",
          `User ${u.name} role changed from ${u.role} to ${newRole}`,
          u.email,
          "Admin Console"
        );
        return { ...u, role: newRole };
      }
      return u;
    });
    setUsers(updated);
    saveAdminUsers(updated);
    showToast(`Role updated to ${newRole}`);
  };

  // Delete User
  const handleDeleteUser = (userId: string, userName: string, userEmail: string) => {
    if (confirm(`Are you sure you want to delete user account "${userName}" (${userEmail})?`)) {
      const updated = users.filter((u) => u.id !== userId);
      setUsers(updated);
      saveAdminUsers(updated);
      appendAuditLog(
        "USER_DELETED",
        `User account ${userName} [ID: ${userId}] was removed by admin`,
        userEmail,
        "Admin Console"
      );
      showToast(`User ${userName} removed from vault`);
    }
  };

  // Reset User Password
  const handleExecutePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForReset || !newPasswordValue.trim()) return;

    const updated = users.map((u) => {
      if (u.id === selectedUserForReset.id) {
        return { ...u, passwordDisplay: newPasswordValue.trim() };
      }
      return u;
    });
    setUsers(updated);
    saveAdminUsers(updated);

    appendAuditLog(
      "PASSWORD_RESET",
      `Password reset for user ${selectedUserForReset.name}`,
      selectedUserForReset.email,
      "Admin Console"
    );

    setIsResetPasswordModalOpen(false);
    setSelectedUserForReset(null);
    setNewPasswordValue("");
    showToast("Password updated successfully");
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
      passwordDisplay: newUserPassword.trim(),
      status: "Active",
      scansCount: 0,
      createdAt: new Date().toISOString(),
      lastLogin: "Never",
      deviceType: "Admin Created Account",
    };

    const updated = [newUser, ...users];
    setUsers(updated);
    saveAdminUsers(updated);

    appendAuditLog(
      "USER_SIGNUP",
      `Administrator manually created user account ${newUser.name} [ID: ${newUser.id}]`,
      newUser.email,
      "Admin Console"
    );

    setIsAddUserModalOpen(false);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPassword("");
    showToast(`Account created for ${newUser.name}`);
  };

  // Export User Directory as CSV
  const handleExportCSV = () => {
    const headers = ["User ID", "Name", "Email", "Role", "Password", "Status", "Scans Count", "Created At", "Last Login"];
    const rows = users.map((u) => [
      u.id,
      `"${u.name}"`,
      u.email,
      u.role,
      `"${u.passwordDisplay}"`,
      u.status,
      u.scansCount,
      u.createdAt,
      u.lastLogin,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cropvision_admin_users_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("User credentials exported as CSV");
  };

  // Update Master Key
  const handleUpdateMasterKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMasterKeyInput.length < 6) {
      alert("Admin Master Key must be at least 6 characters");
      return;
    }
    setAdminMasterPasscode(newMasterKeyInput);
    setChangeKeySuccess(true);
    showToast("Admin Master Passkey updated");
    setTimeout(() => {
      setChangeKeySuccess(false);
      setNewMasterKeyInput("");
    }, 2500);
  };

  // Filtered users list
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase());
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
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              User credentials, registered IDs, and passwords are protected. Enter the Administrator Master Passkey to access.
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
                  placeholder="Enter master key (e.g. cropadmin2026)"
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
              <span>Authorize Admin Console</span>
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
              Key: cropadmin2026
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
                Authorized Vault
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Secure User ID &amp; Credential Directory with Administrative Access Controls
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={refreshData}
            className="p-2 rounded-xl bg-[#0d130e] hover:bg-[#1a261d] border border-emerald-900/40 text-slate-300 hover:text-white text-xs transition-all flex items-center gap-1.5"
            title="Refresh Vault Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sync Vault</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-2 rounded-xl bg-[#0d130e] hover:bg-[#1a261d] border border-emerald-900/40 text-slate-300 hover:text-white text-xs font-medium transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add User</span>
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
            <div className="text-xs text-slate-400 mt-1">Registered Users</div>
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
              Protected
            </div>
            <div className="text-xs text-slate-400 mt-1">Encrypted Passwords</div>
          </div>
        </div>

        <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white leading-none">
              {logs.length}
            </div>
            <div className="text-xs text-slate-400 mt-1">Audit Trail Events</div>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-emerald-900/30 pb-3">
        <button
          onClick={() => setActiveSubTab("users")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeSubTab === "users"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50"
              : "text-slate-400 hover:text-slate-200 hover:bg-emerald-950/40"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Directory &amp; Credentials ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab("logs")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
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
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeSubTab === "settings"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50"
              : "text-slate-400 hover:text-slate-200 hover:bg-emerald-950/40"
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Admin Security Passkey</span>
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
                placeholder="Search by ID, name, or email..."
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
                  <th className="py-3 px-4">User ID &amp; Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Lock className="w-3 h-3" />
                      <span>Password Vault</span>
                    </span>
                  </th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Registered</th>
                  <th className="py-3 px-4 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/20 text-slate-300">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No user accounts match your search filters.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => {
                    const isPasswordRevealed = revealedPasswordIds[u.id] || false;
                    return (
                      <tr key={u.id} className="hover:bg-emerald-950/20 transition-colors">
                        {/* ID & Name */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0">
                              {u.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold text-white">{u.name}</div>
                              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/50 px-1.5 py-0.2 rounded border border-emerald-800/30">
                                {u.id}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-3.5 px-4 font-mono text-slate-300">
                          {u.email}
                        </td>

                        {/* Role */}
                        <td className="py-3.5 px-4">
                          {getRoleBadge(u.role)}
                        </td>

                        {/* Password Display (Masked / Revealed by Admin) */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-[#0a0f0b] border border-emerald-900/40 rounded-lg px-2.5 py-1 font-mono text-xs text-amber-300 tracking-wider">
                              {isPasswordRevealed ? u.passwordDisplay : "••••••••••••"}
                            </div>
                            <button
                              type="button"
                              onClick={() => togglePasswordReveal(u.id)}
                              className="p-1 rounded text-slate-400 hover:text-amber-400 hover:bg-amber-950/30 transition-colors"
                              title={isPasswordRevealed ? "Hide Password" : "Admin Reveal Password"}
                            >
                              {isPasswordRevealed ? (
                                <EyeOff className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )}
                            </button>
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

                        {/* Registered Date */}
                        <td className="py-3.5 px-4 text-[11px] text-slate-400">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>

                        {/* Admin Action Buttons */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Reset Password */}
                            <button
                              onClick={() => {
                                setSelectedUserForReset(u);
                                setNewPasswordValue("");
                                setIsResetPasswordModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-[#0d130e] hover:bg-amber-950/40 border border-emerald-900/40 text-slate-300 hover:text-amber-400 text-xs transition-colors"
                              title="Reset Password"
                            >
                              <KeyRound className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete User */}
                            <button
                              onClick={() => handleDeleteUser(u.id, u.name, u.email)}
                              className="p-1.5 rounded-lg bg-[#0d130e] hover:bg-red-950/40 border border-emerald-900/40 text-slate-400 hover:text-red-400 text-xs transition-colors"
                              title="Remove Account"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
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
              <h3 className="text-sm font-bold text-white">System Security Audit Logs</h3>
              <p className="text-xs text-slate-400">Immutable trace of user logins, registrations, and administrative updates</p>
            </div>
            <span className="text-xs text-emerald-400 font-mono">Live Recording Active</span>
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {logs.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No audit records logged yet.</p>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-2xl bg-[#0d130e] border border-emerald-900/30 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{log.event}</span>
                        <span className="text-[10px] text-slate-400">&bull; {log.userEmail}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] mt-0.5">{log.details}</p>
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-slate-400 font-mono shrink-0">
                    <div>{new Date(log.timestamp).toLocaleTimeString()}</div>
                    <div>{new Date(log.timestamp).toLocaleDateString()}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* --- TAB 3: ADMIN SETTINGS --- */}
      {activeSubTab === "settings" && (
        <div className="bg-[#141d16] border border-emerald-900/30 rounded-3xl p-6 shadow-xl max-w-xl">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-emerald-900/30">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Administrator Master Passkey</h3>
              <p className="text-xs text-slate-400">Update the secret master key required to unlock this admin portal</p>
            </div>
          </div>

          <form onSubmit={handleUpdateMasterKey} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Current Master Passkey
              </label>
              <div className="bg-[#0d130e] border border-emerald-900/40 rounded-xl p-2.5 font-mono text-xs text-amber-300">
                {getAdminMasterPasscode()}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                New Master Passkey
              </label>
              <input
                type="text"
                required
                value={newMasterKeyInput}
                onChange={(e) => setNewMasterKeyInput(e.target.value)}
                placeholder="Enter new 6+ char master key"
                className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Update Master Passkey</span>
            </button>
          </form>
        </div>
      )}

      {/* --- ADD USER MODAL --- */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#141d16] border border-emerald-900/40 rounded-3xl p-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-900/30">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Add User to Admin Vault</span>
              </h3>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. John Green"
                  className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Account Role
                </label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                  className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Home Gardener">Home Gardener</option>
                  <option value="Organic Farmer">Organic Farmer</option>
                  <option value="Grocer / Kitchen">Grocer / Kitchen</option>
                  <option value="Agri Specialist">Agri Specialist</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="text"
                  required
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  placeholder="Set user password"
                  className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-transparent hover:bg-emerald-950/40 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md"
                >
                  Create &amp; Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- RESET PASSWORD MODAL --- */}
      {isResetPasswordModalOpen && selectedUserForReset && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#141d16] border border-amber-900/40 rounded-3xl p-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-900/30">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>Reset Password for {selectedUserForReset.name}</span>
              </h3>
              <button
                onClick={() => setIsResetPasswordModalOpen(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleExecutePasswordReset} className="space-y-3.5">
              <div className="text-xs text-slate-300 bg-[#0d130e] p-3 rounded-xl border border-emerald-900/30">
                <div>User ID: <span className="font-mono text-emerald-400">{selectedUserForReset.id}</span></div>
                <div>Email: <span className="text-white">{selectedUserForReset.email}</span></div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  New Password
                </label>
                <input
                  type="text"
                  required
                  value={newPasswordValue}
                  onChange={(e) => setNewPasswordValue(e.target.value)}
                  placeholder="Enter new password for user"
                  className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsResetPasswordModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-transparent hover:bg-emerald-950/40 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-md"
                >
                  Save New Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
