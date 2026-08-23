export type UserRole = 
  | "Home Gardener" 
  | "Organic Farmer" 
  | "Grocer / Kitchen" 
  | "Agri Specialist" 
  | "Guest" 
  | "Administrator";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAdmin?: boolean;
  avatarColor?: string;
  createdAt: string;
}

export interface AdminUserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  passwordDisplay: string;
  status: "Active" | "Suspended" | "Pending Review";
  scansCount: number;
  createdAt: string;
  lastLogin: string;
  deviceType?: string;
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  event: 
    | "USER_SIGNUP" 
    | "USER_LOGIN" 
    | "SCAN_DIAGNOSIS" 
    | "STATUS_CHANGED" 
    | "PASSWORD_RESET" 
    | "USER_DELETED" 
    | "ADMIN_LOGIN";
  details: string;
  userEmail: string;
  ipOrDevice: string;
}

export type HealthStatus = 
  | "HEALTHY" 
  | "MILD_ISSUE" 
  | "MODERATE_DISEASE" 
  | "SEVERE_DAMAGE" 
  | "SPOILED_UNFIT";

export type SeverityLevel = "Healthy" | "Low" | "Medium" | "High" | "Critical";

export type PathogenCategory = 
  | "Fungal" 
  | "Bacterial" 
  | "Viral" 
  | "Insect/Pest" 
  | "Physiological/Abiotic" 
  | "Storage Disorder" 
  | "None/Healthy";

export type CropCategory = "Vegetable" | "Fruit";

export type VegetableFamily = 
  | "Allium (Onion, Garlic, Leek)" 
  | "Solanaceae (Tomato, Potato, Pepper)" 
  | "Rosaceae Fruits (Apple, Strawberry, Peach)"
  | "Citrus & Tropical (Orange, Banana, Lemon)"
  | "Vitaceae (Grapes & Berries)"
  | "Brassica (Cabbage, Broccoli, Cauliflower)" 
  | "Cucurbit (Cucumber, Zucchini, Melon)" 
  | "Root & Tuber (Carrot, Radish, Beet)" 
  | "Other Fruits & Vegetables";

export interface EdibilitySafety {
  isSafeToEat: boolean;
  rating: "Safe & Fresh" | "Edible with Trim (Peel affected outer layer)" | "Caution - Cook thoroughly" | "Do Not Consume / Discard";
  guidance: string;
}

export interface ActionPlan {
  immediateAction: string;
  organicRemedies: string[];
  chemicalTreatments: string[];
  storageAndPreservation: string[];
  preventiveMeasures: string[];
}

export interface DifferentialDiagnosis {
  condition: string;
  likelihood: string;
  distinction: string;
}

export interface DiagnosticResult {
  vegetableName: string;
  scientificName: string;
  plantPart: string;
  healthStatus: HealthStatus;
  primaryIssue: string;
  pathogenType: PathogenCategory;
  confidenceScore: number;
  severityLevel: SeverityLevel;
  summary: string;
  identifiedSymptoms: string[];
  probableCauses: string[];
  edibilitySafety: EdibilitySafety;
  actionPlan: ActionPlan;
  differentialDiagnoses: DifferentialDiagnosis[];
  marketImpact: string;
}

export type TrackingState = "Investigating" | "Treating" | "Quarantined" | "Resolved" | "Discarded";

export interface TrackedScan {
  id: string;
  timestamp: string;
  imagePreview: string; // base64 or sample URL
  vegetableName: string;
  primaryIssue: string;
  healthStatus: HealthStatus;
  severityLevel: SeverityLevel;
  trackingState: TrackingState;
  batchOrLocation?: string;
  userNotes?: string;
  diagnosis: DiagnosticResult;
}

export interface EncyclopediaDisease {
  id: string;
  name: string;
  scientificAgent: string;
  vegetableType: string;
  family: VegetableFamily;
  category: PathogenCategory;
  typicalSymptoms: string[];
  favorableConditions: string[];
  organicCure: string[];
  chemicalCure: string[];
  prevention: string[];
  edibilityRisk: string;
  keyVisualSign: string;
}

export interface SamplePreset {
  id: string;
  title: string;
  vegetable: string;
  conditionName: string;
  expectedHealth: HealthStatus;
  description: string;
  imageData: string;
  notes: string;
}
