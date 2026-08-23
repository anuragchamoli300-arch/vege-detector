import React, { useState, useEffect } from "react";
import { Navbar, NavTab } from "./components/Navbar";
import { ScannerView } from "./components/ScannerView";
import { DiagnosticResult as DiagnosticResultComponent } from "./components/DiagnosticResult";
import { TrackerView } from "./components/TrackerView";
import { EncyclopediaView } from "./components/EncyclopediaView";
import { AgronomistChatModal } from "./components/AgronomistChatModal";
import { AuthView } from "./components/AuthView";
import { AdminPortalView } from "./components/AdminPortalView";
import { DiagnosticResult, TrackedScan, TrackingState, UserProfile } from "./types";
import { INITIAL_TRACKED_SCANS } from "./data/initialData";
import { CheckCircle2 } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("scanner");
  
  // User Authentication State
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const savedUser = localStorage.getItem("cropvision_user");
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error("Failed to load user session:", e);
    }
    return null;
  });

  // Explicit flag if user clicked "Switch Account" or "Sign In" from navbar
  const [showAuthScreen, setShowAuthScreen] = useState(false);

  // Scans history state persisted in localStorage
  const [trackedScans, setTrackedScans] = useState<TrackedScan[]>(() => {
    try {
      const stored = localStorage.getItem("cropvision_tracked_scans");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to load local scans:", e);
    }
    return INITIAL_TRACKED_SCANS;
  });

  // Active diagnostic result state
  const [currentDiagnosis, setCurrentDiagnosis] = useState<{
    diagnosis: DiagnosticResult;
    imagePreview: string;
    notes?: string;
    isSaved: boolean;
  } | null>(null);

  // Agronomist consultation modal state
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [chatDiagnosisContext, setChatDiagnosisContext] = useState<DiagnosticResult | null>(null);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<{ title: string; type: "success" | "info" } | null>(null);

  const showToast = (title: string, type: "success" | "info" = "success") => {
    setToastMessage({ title, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync scans with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cropvision_tracked_scans", JSON.stringify(trackedScans));
    } catch (e) {
      console.error("Failed to save scans to localStorage:", e);
    }
  }, [trackedScans]);

  // Handle Login / Sign up completion
  const handleLoginSuccess = (newUser: UserProfile) => {
    setUser(newUser);
    setShowAuthScreen(false);
    try {
      localStorage.setItem("cropvision_user", JSON.stringify(newUser));
    } catch (e) {
      console.error("Failed to save user session:", e);
    }
    if (newUser.isAdmin || newUser.role === "Administrator") {
      setActiveTab("admin");
      showToast(`Welcome Administrator ${newUser.name}!`, "success");
    } else {
      showToast(`Welcome to CropVision, ${newUser.name}!`, "success");
    }
  };

  // Handle Sign Out
  const handleSignOut = () => {
    setUser(null);
    try {
      localStorage.removeItem("cropvision_user");
    } catch (e) {
      console.error("Failed to clear user session:", e);
    }
    showToast("You have been signed out.", "info");
  };

  // Handle new diagnosis from scanner
  const handleDiagnosisComplete = (
    diagnosis: DiagnosticResult,
    imagePreview: string,
    notes: string
  ) => {
    setCurrentDiagnosis({
      diagnosis,
      imagePreview,
      notes,
      isSaved: false,
    });
    showToast(`Scan complete: ${diagnosis.primaryIssue} detected`, "success");
  };

  // Save diagnosis to problem tracker
  const handleSaveToTracker = (
    diagnosis: DiagnosticResult,
    imagePreview: string,
    notes?: string
  ) => {
    const newScan: TrackedScan = {
      id: `scan-${Date.now()}`,
      timestamp: new Date().toISOString(),
      imagePreview,
      vegetableName: diagnosis.vegetableName,
      primaryIssue: diagnosis.primaryIssue,
      healthStatus: diagnosis.healthStatus,
      severityLevel: diagnosis.severityLevel,
      trackingState: diagnosis.healthStatus === "HEALTHY" ? "Resolved" : "Investigating",
      userNotes: notes || "",
      batchOrLocation: user?.role === "Organic Farmer" ? "Field Block 1" : "Garden Patch",
      diagnosis,
    };

    setTrackedScans((prev) => [newScan, ...prev]);
    if (currentDiagnosis) {
      setCurrentDiagnosis({ ...currentDiagnosis, isSaved: true });
    }
    showToast("Added to Problem Tracker", "success");
  };

  // Update tracking state for an existing scan
  const handleUpdateScanState = (
    id: string,
    newState: TrackingState,
    batchOrLocation?: string,
    userNotes?: string
  ) => {
    setTrackedScans((prev) =>
      prev.map((scan) => {
        if (scan.id === id) {
          return {
            ...scan,
            trackingState: newState,
            batchOrLocation: batchOrLocation !== undefined ? batchOrLocation : scan.batchOrLocation,
            userNotes: userNotes !== undefined ? userNotes : scan.userNotes,
          };
        }
        return scan;
      })
    );
    showToast(`Status updated to ${newState}`, "info");
  };

  // Delete scan from tracker
  const handleDeleteScan = (id: string) => {
    setTrackedScans((prev) => prev.filter((s) => s.id !== id));
    showToast("Record removed from tracker", "info");
  };

  // View full detail from tracker
  const handleViewScanDetail = (scan: TrackedScan) => {
    setCurrentDiagnosis({
      diagnosis: scan.diagnosis,
      imagePreview: scan.imagePreview,
      notes: scan.userNotes,
      isSaved: true,
    });
    setActiveTab("scanner");
  };

  // Open Agronomist Chat with Context
  const handleAskAgronomist = (diagnosis: DiagnosticResult) => {
    setChatDiagnosisContext(diagnosis);
    setChatModalOpen(true);
  };

  // Ask Agronomist from Encyclopedia
  const handleAskAgronomistAboutDisease = (diseaseName: string) => {
    setChatDiagnosisContext({
      vegetableName: "Vegetable Sample",
      scientificName: "Plant Condition",
      plantPart: "Foliage / Bulb",
      healthStatus: "MODERATE_DISEASE",
      primaryIssue: diseaseName,
      pathogenType: "Fungal",
      confidenceScore: 100,
      severityLevel: "Medium",
      summary: `Inquiry regarding management, symptoms, and cure for ${diseaseName}.`,
      identifiedSymptoms: [],
      probableCauses: [],
      edibilitySafety: {
        isSafeToEat: true,
        rating: "Caution - Cook thoroughly",
        guidance: "General disease evaluation required.",
      },
      actionPlan: {
        immediateAction: "Inspect crops closely for signs.",
        organicRemedies: [],
        chemicalTreatments: [],
        storageAndPreservation: [],
        preventiveMeasures: [],
      },
      differentialDiagnoses: [],
      marketImpact: "Variable depending on infestation severity.",
    });
    setChatModalOpen(true);
  };

  // Trigger New Scan
  const handleStartNewScan = () => {
    setCurrentDiagnosis(null);
    setActiveTab("scanner");
  };

  // Determine if authentication screen should be presented at start
  const isAuthScreenVisible = (!user || showAuthScreen) && activeTab !== "admin";

  return (
    <div className="min-h-screen bg-[#0d130e] text-slate-200 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div className="bg-[#141d16] border border-emerald-500/50 shadow-2xl rounded-xl px-4 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm text-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{toastMessage.title}</span>
          </div>
        </div>
      )}

      {/* Main Header / Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setShowAuthScreen(false);
          setActiveTab(tab);
        }}
        trackedCount={trackedScans.length}
        onOpenNewScan={handleStartNewScan}
        user={user}
        onSignOut={handleSignOut}
        onOpenAuth={() => {
          setShowAuthScreen(true);
          setActiveTab("scanner");
        }}
        onOpenAdmin={() => {
          setShowAuthScreen(false);
          setActiveTab("admin");
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === "admin" ? (
          <AdminPortalView
            currentUser={user}
            onExitAdmin={() => setActiveTab("scanner")}
          />
        ) : isAuthScreenVisible ? (
          <AuthView
            onLoginSuccess={handleLoginSuccess}
            onOpenAdminPortal={() => {
              setShowAuthScreen(false);
              setActiveTab("admin");
            }}
          />
        ) : (
          <>
            {activeTab === "scanner" && (
              <div>
                {currentDiagnosis ? (
                  <DiagnosticResultComponent
                    diagnosis={currentDiagnosis.diagnosis}
                    imagePreview={currentDiagnosis.imagePreview}
                    userNotes={currentDiagnosis.notes}
                    onSaveToTracker={handleSaveToTracker}
                    isSaved={currentDiagnosis.isSaved}
                    onAskAgronomist={handleAskAgronomist}
                    onScanNew={handleStartNewScan}
                  />
                ) : (
                  <ScannerView onDiagnosisComplete={handleDiagnosisComplete} />
                )}
              </div>
            )}

            {activeTab === "tracker" && (
              <TrackerView
                scans={trackedScans}
                onUpdateScanState={handleUpdateScanState}
                onDeleteScan={handleDeleteScan}
                onViewScanDetail={handleViewScanDetail}
                onStartNewScan={handleStartNewScan}
                onAddManualScan={(newScan) => {
                  setTrackedScans((prev) => [newScan, ...prev]);
                  showToast(`Logged ${newScan.vegetableName} to Tracker`, "success");
                }}
              />
            )}

            {activeTab === "encyclopedia" && (
              <EncyclopediaView
                onAskAgronomistAboutDisease={handleAskAgronomistAboutDisease}
                onSelectCropForScanning={(cropName) => {
                  setActiveTab("scanner");
                  showToast(`Loaded ${cropName} in scanner`, "info");
                }}
              />
            )}

            {activeTab === "advisor" && (
              <AgronomistChatModal
                diagnosisContext={currentDiagnosis?.diagnosis || null}
                isModal={false}
              />
            )}
          </>
        )}
      </main>

      {/* Interactive Agronomist Modal (when triggered from a diagnosis result or guide) */}
      {chatModalOpen && (
        <AgronomistChatModal
          diagnosisContext={chatDiagnosisContext}
          onClose={() => setChatModalOpen(false)}
          isModal={true}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-emerald-900/30 bg-[#0a0f0b] py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="font-semibold text-slate-300">
              CropVision AI &bull; {user ? `Signed in as ${user.name}` : "Ready"}
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <button
              onClick={() => {
                setShowAuthScreen(false);
                setActiveTab("admin");
              }}
              className="text-amber-400/80 hover:text-amber-300 transition-colors"
            >
              Admin Security Vault
            </button>
            <span>&bull;</span>
            <span>Gemini Vision AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
