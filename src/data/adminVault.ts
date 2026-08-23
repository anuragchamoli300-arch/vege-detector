import { AdminUserAccount, AdminAuditLog, UserProfile, UserRole } from "../types";

export const INITIAL_ADMIN_USERS: AdminUserAccount[] = [
  {
    id: "ADM-00101",
    name: "System Administrator",
    email: "admin@cropvision.local",
    role: "Administrator",
    passwordDisplay: "cropadmin2026",
    status: "Active",
    scansCount: 42,
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    lastLogin: new Date(Date.now() - 3600000 * 2).toISOString(),
    deviceType: "Admin Workstation / Chrome",
  },
  {
    id: "USR-00204",
    name: "Sarah Green",
    email: "sarah.green@garden.local",
    role: "Home Gardener",
    passwordDisplay: "greenSprout#88",
    status: "Active",
    scansCount: 14,
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    lastLogin: new Date(Date.now() - 3600000 * 5).toISOString(),
    deviceType: "Mobile iOS / Safari",
  },
  {
    id: "USR-00318",
    name: "David Miller",
    email: "david@valleyfarms.local",
    role: "Organic Farmer",
    passwordDisplay: "valleyHarvest$2026",
    status: "Active",
    scansCount: 38,
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    lastLogin: new Date(Date.now() - 3600000 * 24).toISOString(),
    deviceType: "Desktop Linux / Firefox",
  },
  {
    id: "USR-00445",
    name: "Elena Rostova",
    email: "elena@producekitchen.org",
    role: "Grocer / Kitchen",
    passwordDisplay: "safeStorage!99",
    status: "Active",
    scansCount: 7,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    lastLogin: new Date(Date.now() - 3600000 * 48).toISOString(),
    deviceType: "Tablet iPadOS / Chrome",
  },
];

export const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: "LOG-9001",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    event: "ADMIN_LOGIN",
    details: "Administrator session authenticated from secure admin portal",
    userEmail: "admin@cropvision.local",
    ipOrDevice: "192.168.1.104 (Local Secure Gateway)",
  },
  {
    id: "LOG-9002",
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    event: "USER_LOGIN",
    details: "User Sarah Green signed in with verified credentials",
    userEmail: "sarah.green@garden.local",
    ipOrDevice: "Mobile Device / iOS Safari",
  },
  {
    id: "LOG-9003",
    timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
    event: "SCAN_DIAGNOSIS",
    details: "Vegetable scan initiated: Yellow Onion (Black Mold detection)",
    userEmail: "sarah.green@garden.local",
    ipOrDevice: "Mobile Device / iOS Safari",
  },
  {
    id: "LOG-9004",
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    event: "USER_SIGNUP",
    details: "New grower registered with Organic Farmer profile",
    userEmail: "david@valleyfarms.local",
    ipOrDevice: "Desktop Workstation / Chrome",
  },
];

const ADMIN_STORAGE_KEY = "cropvision_admin_user_vault_v1";
const AUDIT_STORAGE_KEY = "cropvision_admin_audit_logs_v1";
const ADMIN_MASTER_KEY = "cropvision_admin_master_passcode";

export const getAdminMasterPasscode = (): string => {
  try {
    const customKey = localStorage.getItem(ADMIN_MASTER_KEY);
    if (customKey) return customKey;
  } catch (e) {
    console.error(e);
  }
  return "cropadmin2026";
};

export const setAdminMasterPasscode = (newPass: string): void => {
  try {
    localStorage.setItem(ADMIN_MASTER_KEY, newPass);
  } catch (e) {
    console.error(e);
  }
};

export const loadAdminUsers = (): AdminUserAccount[] => {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to load admin user vault:", e);
  }
  return INITIAL_ADMIN_USERS;
};

export const saveAdminUsers = (users: AdminUserAccount[]): void => {
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error("Failed to save admin user vault:", e);
  }
};

export const loadAuditLogs = (): AdminAuditLog[] => {
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to load audit logs:", e);
  }
  return INITIAL_AUDIT_LOGS;
};

export const appendAuditLog = (
  event: AdminAuditLog["event"],
  details: string,
  userEmail: string,
  ipOrDevice = "Browser Client"
): void => {
  try {
    const currentLogs = loadAuditLogs();
    const newLog: AdminAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      event,
      details,
      userEmail,
      ipOrDevice,
    };
    const updated = [newLog, ...currentLogs.slice(0, 99)];
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to append audit log:", e);
  }
};

export const registerUserInVault = (
  user: UserProfile,
  rawPassword?: string
): void => {
  try {
    const users = loadAdminUsers();
    const existingIndex = users.findIndex(
      (u) => u.email.toLowerCase() === user.email.toLowerCase()
    );

    const now = new Date().toISOString();
    const passwordToStore = rawPassword || "SecureUserPass_auto";

    if (existingIndex >= 0) {
      // Update existing record
      users[existingIndex] = {
        ...users[existingIndex],
        name: user.name,
        role: user.role,
        lastLogin: now,
        passwordDisplay: rawPassword || users[existingIndex].passwordDisplay,
      };
      appendAuditLog(
        "USER_LOGIN",
        `User ${user.name} logged into system`,
        user.email
      );
    } else {
      // Create new record
      const newAdminUser: AdminUserAccount = {
        id: `USR-${Math.floor(10000 + Math.random() * 90000)}`,
        name: user.name,
        email: user.email,
        role: user.role,
        passwordDisplay: passwordToStore,
        status: "Active",
        scansCount: 0,
        createdAt: now,
        lastLogin: now,
        deviceType: navigator.userAgent.includes("Mobile")
          ? "Mobile Device"
          : "Desktop Browser",
      };
      users.unshift(newAdminUser);
      appendAuditLog(
        "USER_SIGNUP",
        `New account registered [ID: ${newAdminUser.id}] with role ${user.role}`,
        user.email
      );
    }
    saveAdminUsers(users);
  } catch (e) {
    console.error("Failed to register in vault:", e);
  }
};
