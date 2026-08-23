import React, { useState } from "react";
import {
  ClipboardList,
  Search,
  Trash2,
  ExternalLink,
  Edit3,
  FileSpreadsheet,
  FileJson,
  Check,
  X,
  Scan,
  Plus,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Apple,
  ShieldCheck,
  MapPin,
  Calendar,
} from "lucide-react";
import { TrackedScan, TrackingState, HealthStatus, SeverityLevel } from "../types";
import { ENCYCLOPEDIA_DISEASES } from "../data/vegetableEncyclopedia";
import { SAMPLE_VEGETABLES } from "../data/sampleImages";

interface TrackerViewProps {
  scans: TrackedScan[];
  onUpdateScanState: (id: string, newState: TrackingState, batchOrLocation?: string, userNotes?: string) => void;
  onDeleteScan: (id: string) => void;
  onViewScanDetail: (scan: TrackedScan) => void;
  onStartNewScan: () => void;
  onAddManualScan?: (newScan: TrackedScan) => void;
}

const STATE_OPTIONS: TrackingState[] = [
  "Investigating",
  "Treating",
  "Quarantined",
  "Resolved",
  "Discarded",
];

const CROPS_LIST = [
  "Onion (Allium cepa)",
  "Tomato (Solanum lycopersicum)",
  "Potato (Solanum tuberosum)",
  "Apple (Malus domestica)",
  "Banana (Musa acuminata)",
  "Orange / Citrus (Citrus sinensis)",
  "Strawberry (Fragaria × ananassa)",
  "Bell Pepper (Capsicum annuum)",
  "Cabbage (Brassica oleracea)",
  "Carrot (Daucus carota)",
  "Grapes (Vitis vinifera)",
  "Cucumber (Cucumis sativus)",
];

export const TrackerView: React.FC<TrackerViewProps> = ({
  scans,
  onUpdateScanState,
  onDeleteScan,
  onViewScanDetail,
  onStartNewScan,
  onAddManualScan,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCrop, setFilterCrop] = useState<string>("All");
  const [filterCategory, setFilterCategory] = useState<"All" | "Vegetables" | "Fruits">("All");
  const [filterState, setFilterState] = useState<string>("All");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBatch, setEditBatch] = useState("");
  const [editNotes, setEditNotes] = useState("");

  // Manual Quick Log Modal State
  const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);
  const [newCropName, setNewCropName] = useState(CROPS_LIST[0]);
  const [newDiseaseIssue, setNewDiseaseIssue] = useState("Black Mold (Aspergillus niger)");
  const [newSeverity, setNewSeverity] = useState<SeverityLevel>("High");
  const [newTrackingState, setNewTrackingState] = useState<TrackingState>("Treating");
  const [newBatchLocation, setNewBatchLocation] = useState("");
  const [newUserNotes, setNewUserNotes] = useState("");

  // Statistics calculation
  const totalScans = scans.length;
  const healthyCount = scans.filter((s) => s.healthStatus === "HEALTHY").length;
  const activeIssuesCount = scans.filter(
    (s) => s.healthStatus !== "HEALTHY" && s.trackingState !== "Resolved" && s.trackingState !== "Discarded"
  ).length;
  const treatingCount = scans.filter((s) => s.trackingState === "Treating").length;
  const resolvedCount = scans.filter((s) => s.trackingState === "Resolved").length;

  // Extract unique crops tracked
  const uniqueCropNames = Array.from(new Set(scans.map((s) => s.vegetableName.split("(")[0].trim())));

  // Filtered scans
  const filteredScans = scans.filter((scan) => {
    const isFruit =
      scan.vegetableName.toLowerCase().includes("apple") ||
      scan.vegetableName.toLowerCase().includes("banana") ||
      scan.vegetableName.toLowerCase().includes("orange") ||
      scan.vegetableName.toLowerCase().includes("citrus") ||
      scan.vegetableName.toLowerCase().includes("strawberry") ||
      scan.vegetableName.toLowerCase().includes("grape");

    const matchesCategory =
      filterCategory === "All" ||
      (filterCategory === "Fruits" && isFruit) ||
      (filterCategory === "Vegetables" && !isFruit);

    const matchesSearch =
      scan.vegetableName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.primaryIssue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (scan.batchOrLocation && scan.batchOrLocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (scan.userNotes && scan.userNotes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCrop =
      filterCrop === "All" ||
      scan.vegetableName.toLowerCase().includes(filterCrop.toLowerCase());

    const matchesState = filterState === "All" || scan.trackingState === filterState;

    return matchesCategory && matchesSearch && matchesCrop && matchesState;
  });

  const startEdit = (scan: TrackedScan) => {
    setEditingId(scan.id);
    setEditBatch(scan.batchOrLocation || "");
    setEditNotes(scan.userNotes || "");
  };

  const saveEdit = (scan: TrackedScan) => {
    onUpdateScanState(scan.id, scan.trackingState, editBatch, editNotes);
    setEditingId(null);
  };

  const handleCreateQuickLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onAddManualScan) return;

    // Find matching encyclopedia entry or sample preview
    const matchingEncyclopedia = ENCYCLOPEDIA_DISEASES.find(
      (d) => d.vegetableType.toLowerCase().includes(newCropName.split(" ")[0].toLowerCase())
    );

    const matchingSample = SAMPLE_VEGETABLES.find(
      (s) => s.vegetable.toLowerCase().includes(newCropName.split(" ")[0].toLowerCase())
    );

    const imagePreview = matchingSample?.imageData || SAMPLE_VEGETABLES[0].imageData;

    const newScanRecord: TrackedScan = {
      id: `scan-${newCropName.split(" ")[0].toLowerCase()}-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      imagePreview,
      vegetableName: newCropName,
      primaryIssue: newDiseaseIssue,
      healthStatus: newSeverity === "Healthy" ? "HEALTHY" : newSeverity === "Critical" ? "SPOILED_UNFIT" : "SEVERE_DAMAGE",
      severityLevel: newSeverity,
      trackingState: newTrackingState,
      batchOrLocation: newBatchLocation || "Storage / Field Area #1",
      userNotes: newUserNotes || "Logged for ongoing treatment tracking and monitoring.",
      diagnosis: {
        vegetableName: newCropName,
        scientificName: matchingEncyclopedia?.scientificAgent || "Botanical Specimen",
        plantPart: "Fruit / Vegetable Specimen",
        healthStatus: newSeverity === "Healthy" ? "HEALTHY" : "SEVERE_DAMAGE",
        primaryIssue: newDiseaseIssue,
        pathogenType: matchingEncyclopedia?.category || "Fungal",
        confidenceScore: 95,
        severityLevel: newSeverity,
        summary: `Tracked diagnosis for ${newCropName} showing ${newDiseaseIssue}.`,
        identifiedSymptoms: matchingEncyclopedia?.typicalSymptoms.slice(0, 3) || ["Visual blemish / decay symptoms noted"],
        probableCauses: matchingEncyclopedia?.favorableConditions.slice(0, 2) || ["Storage humidity or field environmental stress"],
        edibilitySafety: {
          isSafeToEat: matchingEncyclopedia?.edibilityRisk.includes("safe") || false,
          rating: matchingEncyclopedia?.edibilityRisk.includes("safe") ? "Edible with Trim (Peel affected outer layer)" : "Do Not Consume / Discard",
          guidance: matchingEncyclopedia?.edibilityRisk || "Inspect flesh thoroughly before preparation.",
        },
        actionPlan: {
          immediateAction: matchingEncyclopedia?.organicCure[0] || "Isolate affected batch to prevent cross-contamination.",
          organicRemedies: matchingEncyclopedia?.organicCure || ["Bio-fungicide application"],
          chemicalTreatments: matchingEncyclopedia?.chemicalCure || ["Apply suitable IPM treatment"],
          storageAndPreservation: matchingEncyclopedia?.prevention || ["Maintain recommended cool dry storage"],
          preventiveMeasures: matchingEncyclopedia?.prevention || ["Sanitize crates and maintain airflow"],
        },
        differentialDiagnoses: [],
        marketImpact: "Tracked for quality preservation and treatment progress.",
      },
    };

    onAddManualScan(newScanRecord);
    setIsQuickLogOpen(false);
    setNewBatchLocation("");
    setNewUserNotes("");
  };

  // CSV Export
  const exportCsv = () => {
    if (scans.length === 0) return;
    const headers = [
      "ID",
      "Date",
      "Crop / Vegetable / Fruit",
      "Primary Issue",
      "Health Status",
      "Severity",
      "Tracking State",
      "Batch / Location",
      "Confidence %",
      "Edibility Rating",
      "Notes",
    ];
    const rows = scans.map((s) => [
      s.id,
      new Date(s.timestamp).toLocaleString(),
      `"${s.vegetableName}"`,
      `"${s.primaryIssue}"`,
      s.healthStatus,
      s.severityLevel,
      s.trackingState,
      `"${s.batchOrLocation || ""}"`,
      s.diagnosis.confidenceScore,
      `"${s.diagnosis.edibilitySafety.rating}"`,
      `"${(s.userNotes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `crop_health_tracker_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // JSON Export
  const exportJson = () => {
    if (scans.length === 0) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(scans, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `crop_health_records_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStateColor = (state: TrackingState) => {
    switch (state) {
      case "Investigating":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      case "Treating":
        return "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
      case "Quarantined":
        return "bg-purple-500/15 text-purple-300 border-purple-500/30";
      case "Resolved":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      case "Discarded":
      default:
        return "bg-stone-800 text-stone-400 border-stone-700";
    }
  };

  const getSeverityBadge = (level: SeverityLevel) => {
    switch (level) {
      case "Critical":
      case "High":
        return "bg-rose-500/15 text-rose-300 border-rose-500/30";
      case "Medium":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      case "Low":
        return "bg-blue-500/15 text-blue-300 border-blue-500/30";
      case "Healthy":
      default:
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner & Metrics */}
      <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ClipboardList className="w-3.5 h-3.5" /> 10+ Crop Multi-Batch Health Tracker
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-2">
              Vegetable &amp; Fruit Disease Tracker
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Track treatment regimens, quarantine alerts, curing progress, and storage locations across 10+ vegetables and fruits in real time.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {onAddManualScan && (
              <button
                id="tracker-quick-log-btn"
                onClick={() => setIsQuickLogOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Log Crop Issue
              </button>
            )}
            <button
              onClick={onStartNewScan}
              className="px-3.5 py-2 rounded-xl bg-[#0d130e] hover:bg-[#1a261d] text-emerald-300 border border-emerald-900/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Scan className="w-3.5 h-3.5" /> Scan New Crop
            </button>
            <button
              onClick={exportCsv}
              disabled={scans.length === 0}
              className="px-3 py-2 rounded-xl bg-[#0d130e] hover:bg-[#1a261d] disabled:opacity-40 text-slate-300 border border-emerald-900/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Export CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button
              onClick={exportJson}
              disabled={scans.length === 0}
              className="px-3 py-2 rounded-xl bg-[#0d130e] hover:bg-[#1a261d] disabled:opacity-40 text-slate-300 border border-emerald-900/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Export JSON"
            >
              <FileJson className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Real-time KPI Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-5 border-t border-emerald-900/40">
          <div className="bg-[#0d130e] p-3.5 rounded-xl border border-emerald-900/30">
            <span className="text-slate-400 text-xs font-medium block">Total Tracked</span>
            <span className="text-xl font-bold text-white mt-1 block">{totalScans}</span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">{uniqueCropNames.length} distinct crops</span>
          </div>
          <div className="bg-[#0d130e] p-3.5 rounded-xl border border-emerald-900/30">
            <span className="text-cyan-400 text-xs font-medium block">Under Treatment</span>
            <span className="text-xl font-bold text-cyan-300 mt-1 block">{treatingCount}</span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Active action plans</span>
          </div>
          <div className="bg-[#0d130e] p-3.5 rounded-xl border border-emerald-900/30">
            <span className="text-amber-400 text-xs font-medium block">Active Outbreaks</span>
            <span className="text-xl font-bold text-amber-300 mt-1 block">{activeIssuesCount}</span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Needs monitoring</span>
          </div>
          <div className="bg-[#0d130e] p-3.5 rounded-xl border border-emerald-900/30">
            <span className="text-emerald-400 text-xs font-medium block">Resolved Batches</span>
            <span className="text-xl font-bold text-emerald-300 mt-1 block">{resolvedCount}</span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Successfully treated</span>
          </div>
          <div className="bg-[#0d130e] p-3.5 rounded-xl border border-emerald-900/30 col-span-2 sm:col-span-1">
            <span className="text-emerald-400 text-xs font-medium block">Healthy (Grade A)</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">{healthyCount}</span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Export quality</span>
          </div>
        </div>
      </div>

      {/* Filter Controls & Search */}
      <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
        {/* Category & Crop Chips */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Filter by Crop (10+ Fruits &amp; Vegetables):
            </label>
            <div className="flex items-center gap-1.5">
              {(["All", "Vegetables", "Fruits"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilterCategory(cat);
                    setFilterCrop("All");
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    filterCategory === cat
                      ? "bg-emerald-600 text-white font-semibold"
                      : "bg-[#0d130e] text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {["All", "Onion", "Tomato", "Potato", "Apple", "Banana", "Orange", "Strawberry", "Pepper", "Cabbage", "Carrot", "Grapes"].map((crop) => (
              <button
                key={crop}
                onClick={() => setFilterCrop(crop)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  filterCrop === crop
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/40"
                    : "bg-[#0d130e] hover:bg-[#1a261d] text-slate-300 border border-emerald-900/40"
                }`}
              >
                {crop === "All" ? "🌱 All Crops" : crop}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar & State Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-emerald-900/30">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="tracker-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search batches, issues, notes (e.g., Black Mold, Bin #3B, Late Blight)..."
              className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 whitespace-nowrap">Status:</label>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All States</option>
              {STATE_OPTIONS.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tracked Scans List */}
      <div className="space-y-3">
        {filteredScans.length === 0 ? (
          <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 mx-auto flex items-center justify-center text-emerald-400">
              <ClipboardList className="w-6 h-6" />
            </div>
            <p className="text-white font-semibold">No crop tracking records found</p>
            <p className="text-xs text-slate-400">
              Scan a fruit/vegetable or click "Log Crop Issue" to track treatment regimens and lot conditions.
            </p>
          </div>
        ) : (
          filteredScans.map((scan) => {
            const isEditing = editingId === scan.id;
            return (
              <div
                key={scan.id}
                id={`scan-record-${scan.id}`}
                className="bg-[#141d16] border border-emerald-900/30 hover:border-emerald-800/50 rounded-2xl p-4 sm:p-5 transition-all shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Image & Main Info */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#0d130e] border border-emerald-900/40 shrink-0 relative group">
                      <img
                        src={scan.imagePreview}
                        alt={scan.vegetableName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-white truncate">
                          {scan.vegetableName}
                        </h3>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${getSeverityBadge(scan.severityLevel)}`}>
                          {scan.severityLevel}
                        </span>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${getStateColor(scan.trackingState)}`}>
                          {scan.trackingState}
                        </span>
                      </div>

                      <p className="text-xs text-amber-300 font-medium">
                        Primary Issue: {scan.primaryIssue}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {new Date(scan.timestamp).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {scan.batchOrLocation && (
                          <span className="flex items-center gap-1 text-slate-300 bg-[#0d130e] px-2 py-0.5 rounded-md border border-emerald-900/30">
                            <MapPin className="w-3 h-3 text-emerald-400" />
                            {scan.batchOrLocation}
                          </span>
                        )}
                        <span className="text-slate-400">
                          AI Confidence: <strong className="text-emerald-400">{scan.diagnosis.confidenceScore}%</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-emerald-900/30">
                    <div className="flex items-center gap-2">
                      <select
                        value={scan.trackingState}
                        onChange={(e) => onUpdateScanState(scan.id, e.target.value as TrackingState, scan.batchOrLocation, scan.userNotes)}
                        className={`text-xs font-semibold rounded-xl px-2.5 py-1.5 border focus:outline-none cursor-pointer ${getStateColor(scan.trackingState)}`}
                      >
                        {STATE_OPTIONS.map((st) => (
                          <option key={st} value={st} className="bg-[#141d16] text-white">
                            {st}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => onViewScanDetail(scan)}
                        className="p-2 rounded-xl bg-[#0d130e] hover:bg-[#1a261d] text-emerald-300 border border-emerald-900/40 transition-colors"
                        title="View Full Diagnosis"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => startEdit(scan)}
                        className="p-2 rounded-xl bg-[#0d130e] hover:bg-[#1a261d] text-slate-300 border border-emerald-900/40 transition-colors"
                        title="Edit Batch / Notes"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteScan(scan.id)}
                        className="p-2 rounded-xl bg-[#0d130e] hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-emerald-900/40 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Inline Editing Form for Notes & Location */}
                {isEditing ? (
                  <div className="bg-[#0d130e] border border-emerald-800/50 rounded-xl p-3.5 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                          Batch ID / Storage Location:
                        </label>
                        <input
                          type="text"
                          value={editBatch}
                          onChange={(e) => setEditBatch(e.target.value)}
                          placeholder="e.g., Storage Bin #4A, Cold Room, Greenhouse 2"
                          className="w-full bg-[#141d16] border border-emerald-900/50 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                          Treatment &amp; Action Notes:
                        </label>
                        <input
                          type="text"
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="e.g., Culled infected fruit, applied copper spray"
                          className="w-full bg-[#141d16] border border-emerald-900/50 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveEdit(scan)}
                        className="px-3 py-1 rounded-lg text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  scan.userNotes && (
                    <div className="bg-[#0d130e]/60 rounded-xl p-3 border border-emerald-900/20 text-xs text-slate-300 flex items-start gap-2">
                      <span className="font-semibold text-emerald-400 shrink-0">Treatment Log:</span>
                      <span className="leading-relaxed">{scan.userNotes}</span>
                    </div>
                  )
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Manual Quick Log Modal */}
      {isQuickLogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141d16] border border-emerald-800/60 rounded-2xl p-5 sm:p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base font-bold text-white">Log Crop Health Record</h2>
              </div>
              <button
                onClick={() => setIsQuickLogOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuickLog} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Vegetable or Fruit Crop:</label>
                <select
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  className="w-full bg-[#0d130e] border border-emerald-900/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  {CROPS_LIST.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Primary Issue / Disease:</label>
                  <input
                    type="text"
                    required
                    value={newDiseaseIssue}
                    onChange={(e) => setNewDiseaseIssue(e.target.value)}
                    placeholder="e.g. Black Mold, Scab, Late Blight"
                    className="w-full bg-[#0d130e] border border-emerald-900/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Severity Level:</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as SeverityLevel)}
                    className="w-full bg-[#0d130e] border border-emerald-900/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Healthy">Healthy (Grade A)</option>
                    <option value="Low">Low / Minor Blemish</option>
                    <option value="Medium">Medium / Moderate</option>
                    <option value="High">High / Severe Damage</option>
                    <option value="Critical">Critical / Spoiled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Tracking State:</label>
                  <select
                    value={newTrackingState}
                    onChange={(e) => setNewTrackingState(e.target.value as TrackingState)}
                    className="w-full bg-[#0d130e] border border-emerald-900/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    {STATE_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Batch / Location / Bin:</label>
                  <input
                    type="text"
                    value={newBatchLocation}
                    onChange={(e) => setNewBatchLocation(e.target.value)}
                    placeholder="e.g. Storage Bin #2, Orchard Bed 3"
                    className="w-full bg-[#0d130e] border border-emerald-900/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Observation Notes &amp; Action Plan:</label>
                <textarea
                  rows={3}
                  value={newUserNotes}
                  onChange={(e) => setNewUserNotes(e.target.value)}
                  placeholder="Record symptoms observed, treatments applied, curing progress, or temperature/humidity adjustments..."
                  className="w-full bg-[#0d130e] border border-emerald-900/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 placeholder:text-slate-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-emerald-900/40">
                <button
                  type="button"
                  onClick={() => setIsQuickLogOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-300 hover:text-white bg-[#0d130e]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                >
                  Create Tracking Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
