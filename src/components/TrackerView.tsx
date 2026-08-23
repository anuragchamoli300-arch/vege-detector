import React, { useState } from "react";
import {
  ClipboardList,
  Search,
  Filter,
  Download,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ShieldAlert,
  Edit3,
  Calendar,
  Layers,
  ArrowUpDown,
  FileSpreadsheet,
  FileJson,
  Check,
  X,
  Scan,
} from "lucide-react";
import { TrackedScan, TrackingState, HealthStatus } from "../types";

interface TrackerViewProps {
  scans: TrackedScan[];
  onUpdateScanState: (id: string, newState: TrackingState, batchOrLocation?: string, userNotes?: string) => void;
  onDeleteScan: (id: string) => void;
  onViewScanDetail: (scan: TrackedScan) => void;
  onStartNewScan: () => void;
}

const STATE_OPTIONS: TrackingState[] = [
  "Investigating",
  "Treating",
  "Quarantined",
  "Resolved",
  "Discarded",
];

export const TrackerView: React.FC<TrackerViewProps> = ({
  scans,
  onUpdateScanState,
  onDeleteScan,
  onViewScanDetail,
  onStartNewScan,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterVegetable, setFilterVegetable] = useState<string>("All");
  const [filterState, setFilterState] = useState<string>("All");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBatch, setEditBatch] = useState("");
  const [editNotes, setEditNotes] = useState("");

  // Statistics calculation
  const totalScans = scans.length;
  const healthyCount = scans.filter((s) => s.healthStatus === "HEALTHY").length;
  const activeIssuesCount = scans.filter(
    (s) => s.healthStatus !== "HEALTHY" && s.trackingState !== "Resolved" && s.trackingState !== "Discarded"
  ).length;
  const resolvedCount = scans.filter((s) => s.trackingState === "Resolved").length;

  // Extract unique vegetable types
  const uniqueVegetables = ["All", ...Array.from(new Set(scans.map((s) => s.vegetableName)))];

  // Filtered scans
  const filteredScans = scans.filter((scan) => {
    const matchesSearch =
      scan.vegetableName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.primaryIssue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (scan.batchOrLocation && scan.batchOrLocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (scan.userNotes && scan.userNotes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesVeg = filterVegetable === "All" || scan.vegetableName === filterVegetable;
    const matchesState = filterState === "All" || scan.trackingState === filterState;

    return matchesSearch && matchesVeg && matchesState;
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

  // CSV Export
  const exportCsv = () => {
    if (scans.length === 0) return;
    const headers = [
      "ID",
      "Date",
      "Vegetable",
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
    link.setAttribute("download", `vegetable_problem_tracker_${new Date().toISOString().slice(0, 10)}.csv`);
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
    link.setAttribute("download", `vegetable_health_records_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStateColor = (state: TrackingState) => {
    switch (state) {
      case "Investigating":
        return "bg-yellow-400/10 text-yellow-300 border-yellow-400/40";
      case "Treating":
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/40";
      case "Quarantined":
        return "bg-purple-500/10 text-purple-300 border-purple-500/40";
      case "Resolved":
        return "bg-green-500/10 text-green-300 border-green-500/40";
      case "Discarded":
      default:
        return "bg-white/5 text-slate-400 border-white/10";
    }
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#121813] border border-white/10 p-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block">Total Specimen Scans</span>
          <div className="text-2xl font-bold text-white mt-1">{totalScans}</div>
          <span className="text-[9px] uppercase tracking-widest text-slate-400">Database Index</span>
        </div>

        <div className="bg-[#121813] border border-white/10 p-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400 block">Active Pathologies</span>
          <div className="text-2xl font-bold text-yellow-300 mt-1">{activeIssuesCount}</div>
          <span className="text-[9px] uppercase tracking-widest text-slate-400">Quarantine / Treatment</span>
        </div>

        <div className="bg-[#121813] border border-white/10 p-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-400 block">Specimen Clean</span>
          <div className="text-2xl font-bold text-green-300 mt-1">{healthyCount}</div>
          <span className="text-[9px] uppercase tracking-widest text-slate-400">Grade-A Quality</span>
        </div>

        <div className="bg-[#121813] border border-white/10 p-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 block">Resolved Cases</span>
          <div className="text-2xl font-bold text-cyan-300 mt-1">{resolvedCount}</div>
          <span className="text-[9px] uppercase tracking-widest text-slate-400">IPM Cured</span>
        </div>
      </div>

      {/* Control Bar: Search, Filters & Export */}
      <div className="bg-[#151D16] border border-white/10 p-4 sm:p-5 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="tracker-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by vegetable, disease name, lot number or note..."
              className="w-full bg-[#0F1410] border border-white/10 pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-green-500 transition-colors placeholder:text-slate-600 font-mono"
            />
          </div>

          {/* Filters & Export Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              id="tracker-filter-vegetable"
              value={filterVegetable}
              onChange={(e) => setFilterVegetable(e.target.value)}
              className="bg-[#0F1410] border border-white/10 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-green-500 uppercase tracking-wider font-mono"
            >
              {uniqueVegetables.map((v) => (
                <option key={v} value={v} className="bg-[#0F1410] text-slate-200">
                  {v === "All" ? "All Vegetables" : v}
                </option>
              ))}
            </select>

            <select
              id="tracker-filter-state"
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="bg-[#0F1410] border border-white/10 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-green-500 uppercase tracking-wider font-mono"
            >
              <option value="All" className="bg-[#0F1410]">All Tracking States</option>
              {STATE_OPTIONS.map((st) => (
                <option key={st} value={st} className="bg-[#0F1410]">
                  {st}
                </option>
              ))}
            </select>

            <button
              id="tracker-export-csv"
              onClick={exportCsv}
              disabled={scans.length === 0}
              className="px-3 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-40 text-slate-200 text-[10px] uppercase tracking-wider font-bold flex items-center gap-1.5 border border-white/10 transition-colors"
              title="Export to CSV Spreadsheet"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-green-400" />
              <span>CSV</span>
            </button>

            <button
              id="tracker-export-json"
              onClick={exportJson}
              disabled={scans.length === 0}
              className="px-3 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-40 text-slate-200 text-[10px] uppercase tracking-wider font-bold flex items-center gap-1.5 border border-white/10 transition-colors"
              title="Export to JSON"
            >
              <FileJson className="w-3.5 h-3.5 text-cyan-400" />
              <span>JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scans List / Table */}
      {filteredScans.length === 0 ? (
        <div className="bg-[#121813] border border-white/10 p-10 text-center space-y-4">
          <div className="w-12 h-12 border border-white/10 bg-white/5 flex items-center justify-center mx-auto text-slate-400">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-white">No Tracked Records Found</div>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {scans.length === 0
                ? "Execute a diagnostic scan to start tracking symptoms and treatment progress."
                : "No records match active search query or filter parameters."}
            </p>
          </div>
          {scans.length === 0 && (
            <button
              id="tracker-empty-start-scan"
              onClick={onStartNewScan}
              className="px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 transition-colors"
            >
              <Scan className="w-3.5 h-3.5" />
              <span>Scan First Vegetable</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredScans.map((scan) => {
            const isEditing = editingId === scan.id;
            return (
              <div
                key={scan.id}
                className="bg-[#121813] border border-white/10 hover:border-white/20 p-4 sm:p-5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Thumbnail & Core Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div
                    onClick={() => onViewScanDetail(scan)}
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-[#0F1410] shrink-0 border border-white/10 cursor-pointer group relative flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={scan.imagePreview}
                      alt={scan.vegetableName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <ExternalLink className="w-4 h-4 text-green-400" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="font-bold text-sm text-white uppercase hover:text-green-400 cursor-pointer tracking-wider"
                        onClick={() => onViewScanDetail(scan)}
                      >
                        {scan.vegetableName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        &bull; {new Date(scan.timestamp).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-yellow-300">
                        {scan.primaryIssue}
                      </span>
                      <span className="text-[9px] px-2 py-0.5 uppercase tracking-wider bg-white/5 text-slate-300 border border-white/10">
                        {scan.severityLevel} Severity
                      </span>
                      <span className="text-[9px] px-2 py-0.5 uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/30">
                        {scan.diagnosis.confidenceScore}% Confidence
                      </span>
                    </div>

                    {isEditing ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        <input
                          type="text"
                          value={editBatch}
                          onChange={(e) => setEditBatch(e.target.value)}
                          placeholder="Batch / Bin / Storage Location"
                          className="bg-[#0F1410] border border-white/20 px-2.5 py-1 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="Treatment / tracking note..."
                          className="bg-[#0F1410] border border-white/20 px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 space-y-0.5">
                        {scan.batchOrLocation && (
                          <p>
                            <strong className="text-slate-300 uppercase text-[10px]">Location/Lot:</strong> {scan.batchOrLocation}
                          </p>
                        )}
                        {scan.userNotes && (
                          <p className="line-clamp-1 italic text-slate-400 text-[11px]">
                            "{scan.userNotes}"
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* State Dropdown & Actions */}
                <div className="flex items-center flex-wrap md:flex-col lg:flex-row gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-white/10 shrink-0">
                  {/* Tracking State Selector */}
                  <select
                    value={scan.trackingState}
                    onChange={(e) =>
                      onUpdateScanState(
                        scan.id,
                        e.target.value as TrackingState,
                        scan.batchOrLocation,
                        scan.userNotes
                      )
                    }
                    className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1.5 border focus:outline-none cursor-pointer ${getStateColor(
                      scan.trackingState
                    )}`}
                  >
                    {STATE_OPTIONS.map((st) => (
                      <option key={st} value={st} className="bg-[#0F1410] text-slate-200">
                        {st}
                      </option>
                    ))}
                  </select>

                  {/* Inline edit toggle */}
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => saveEdit(scan)}
                        className="p-1.5 bg-green-500 hover:bg-green-400 text-black text-xs font-bold"
                        title="Save Changes"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1.5 bg-white/10 hover:bg-white/20 text-slate-300 text-xs"
                        title="Cancel"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(scan)}
                      className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors text-xs"
                      title="Edit Lot / Notes"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* View Full Report */}
                  <button
                    onClick={() => onViewScanDetail(scan)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-[10px] uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>View Plan</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => onDeleteScan(scan.id)}
                    className="p-1.5 bg-white/5 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-white/10 transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
