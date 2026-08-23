import React, { useState, useEffect } from "react";
import { Navbar, NavTab } from "./components/Navbar";
import { ScannerView } from "./components/ScannerView";
import { DiagnosticResult as DiagnosticResultComponent } from "./components/DiagnosticResult";
import { TrackerView } from "./components/TrackerView";
import { EncyclopediaView } from "./components/EncyclopediaView";
import { AgronomistChatModal } from "./components/AgronomistChatModal";
import { DiagnosticResult, TrackedScan, TrackingState } from "./types";
import { INITIAL_TRACKED_SCANS } from "./data/initialData";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("scanner");
  
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
      batchOrLocation: "Scanned Specimen",
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
      vegetableName: "Crop Specimen",
      scientificName: "Plant Disease",
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

  return (
    <div className="min-h-screen bg-[#0F1410] text-slate-300 flex flex-col font-mono selection:bg-green-500 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div className="bg-[#151D16] border border-green-500/60 shadow-2xl px-4 py-2.5 flex items-center gap-2.5 text-xs text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            <span className="font-semibold tracking-wider uppercase">{toastMessage.title}</span>
          </div>
        </div>
      )}

      {/* Main Header / Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        trackedCount={trackedScans.length}
        onOpenNewScan={handleStartNewScan}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
          />
        )}

        {activeTab === "encyclopedia" && (
          <EncyclopediaView
            onAskAgronomistAboutDisease={handleAskAgronomistAboutDisease}
          />
        )}

        {activeTab === "advisor" && (
          <AgronomistChatModal
            diagnosisContext={currentDiagnosis?.diagnosis || null}
            isModal={false}
          />
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

      {/* Geometric Balance Footer */}
      <footer className="border-t border-white/10 bg-[#0F1410] py-3 text-[10px] uppercase tracking-widest text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-bold text-white tracking-[0.15em]">System Status: Nominal</span>
          </div>
          <div className="flex items-center gap-6 opacity-60">
            <div>Data Stream: Encrypted (AES-256)</div>
            <div>Ref: OC-9422</div>
            <div>Build: v4.1.0-stable</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
