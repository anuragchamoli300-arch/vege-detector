import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Leaf,
  FlaskConical,
  Warehouse,
  RotateCcw,
  BookmarkPlus,
  Bot,
  Layers,
  Info,
  Check,
  ChevronRight,
  TrendingDown,
  Sparkles,
} from "lucide-react";
import { DiagnosticResult as DiagnosticResultType, HealthStatus, SeverityLevel } from "../types";

interface DiagnosticResultProps {
  diagnosis: DiagnosticResultType;
  imagePreview: string;
  userNotes?: string;
  onSaveToTracker: (diagnosis: DiagnosticResultType, imagePreview: string, notes?: string) => void;
  isSaved?: boolean;
  onAskAgronomist: (diagnosis: DiagnosticResultType) => void;
  onScanNew: () => void;
}

export const DiagnosticResult: React.FC<DiagnosticResultProps> = ({
  diagnosis,
  imagePreview,
  userNotes,
  onSaveToTracker,
  isSaved = false,
  onAskAgronomist,
  onScanNew,
}) => {
  const [activeActionTab, setActiveActionTab] = useState<"immediate" | "organic" | "chemical" | "storage" | "prevention">("immediate");
  const [saveSuccess, setSaveSuccess] = useState(isSaved);

  const getStatusBadge = (status: HealthStatus) => {
    switch (status) {
      case "HEALTHY":
        return {
          bg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
          label: "Healthy Specimen",
        };
      case "MILD_ISSUE":
        return {
          bg: "bg-sky-500/15 text-sky-400 border-sky-500/30",
          icon: <Info className="w-4 h-4 text-sky-400" />,
          label: "Mild Condition / Cosmetic",
        };
      case "MODERATE_DISEASE":
        return {
          bg: "bg-amber-500/15 text-amber-400 border-amber-500/30",
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
          label: "Moderate Disease - Action Needed",
        };
      case "SEVERE_DAMAGE":
        return {
          bg: "bg-orange-500/15 text-orange-400 border-orange-500/30",
          icon: <Flame className="w-4 h-4 text-orange-400" />,
          label: "Severe Pathogen Infection",
        };
      case "SPOILED_UNFIT":
      default:
        return {
          bg: "bg-rose-500/15 text-rose-400 border-rose-500/30",
          icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
          label: "Critical Spoilage / Rotten",
        };
    }
  };

  const getEdibilityColor = (isSafe: boolean, rating: string) => {
    if (rating.includes("Safe") || rating.includes("Fresh")) {
      return {
        cardBg: "bg-emerald-950/30 border-emerald-500/30 text-emerald-300",
        badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      };
    }
    if (rating.includes("Trim") || rating.includes("Peel") || rating.includes("Caution")) {
      return {
        cardBg: "bg-amber-950/30 border-amber-500/30 text-amber-300",
        badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      };
    }
    return {
      cardBg: "bg-rose-950/30 border-rose-500/30 text-rose-300",
      badge: "bg-rose-500/20 text-rose-400 border-rose-500/30",
      icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
    };
  };

  const statusInfo = getStatusBadge(diagnosis.healthStatus);
  const edibilityStyle = getEdibilityColor(
    diagnosis.edibilitySafety.isSafeToEat,
    diagnosis.edibilitySafety.rating
  );

  const handleSave = () => {
    onSaveToTracker(diagnosis, imagePreview, userNotes);
    setSaveSuccess(true);
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Top Header Card */}
      <div className="bg-[#151D16] border border-white/10 p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border ${statusInfo.bg}`}>
                {statusInfo.icon}
                <span>{statusInfo.label}</span>
              </span>

              <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/5 text-slate-300 border border-white/10">
                {diagnosis.pathogenType} Classification
              </span>

              <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/30">
                {diagnosis.confidenceScore}% AI Confidence
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
              {diagnosis.primaryIssue}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Specimen: <strong className="text-slate-200 uppercase">{diagnosis.vegetableName}</strong> (
              <em className="text-slate-400">{diagnosis.scientificName}</em>) &bull; Part:{" "}
              <span className="text-slate-300 uppercase">{diagnosis.plantPart}</span>
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              id="btn-save-to-tracker"
              onClick={handleSave}
              disabled={saveSuccess}
              className={`px-3.5 py-2 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 border ${
                saveSuccess
                  ? "bg-green-500/20 text-green-300 border-green-500/50 cursor-default"
                  : "bg-white/5 hover:bg-white/10 text-slate-200 border-white/10"
              }`}
            >
              {saveSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span>Saved in Log</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Track Problem</span>
                </>
              )}
            </button>

            <button
              id="btn-ask-agronomist-direct"
              onClick={() => onAskAgronomist(diagnosis)}
              className="px-3.5 py-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask Dr. Flora</span>
            </button>

            <button
              id="btn-scan-another"
              onClick={onScanNew}
              className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Scan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Specimen Overview & Clinical Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image, Edibility & Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Specimen Photo Card */}
          <div className="bg-[#121813] border border-white/10 overflow-hidden">
            <div className="relative aspect-[4/3] bg-[#0F1410] flex items-center justify-center p-3">
              <img
                src={imagePreview}
                alt="Diagnosed vegetable specimen"
                className="max-h-full max-w-full object-contain"
              />
              <div className="absolute bottom-3 left-3 bg-[#0F1410]/90 border border-white/10 text-[9px] font-mono text-slate-300 px-2 py-0.5 uppercase tracking-widest">
                Optical Telemetry Verified
              </div>
            </div>

            <div className="p-4 border-t border-white/10 bg-[#151D16]">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
                Diagnostic Summary
              </div>
              <p className="text-xs leading-relaxed text-slate-300">{diagnosis.summary}</p>
            </div>
          </div>

          {/* Edibility & Culinary Safety Card */}
          <div className={`border p-4 space-y-3 ${edibilityStyle.cardBg}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {edibilityStyle.icon}
                <div className="text-xs font-bold uppercase tracking-wider text-white">Edibility &amp; Safety Rating</div>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${edibilityStyle.badge}`}>
                {diagnosis.edibilitySafety.rating}
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-300">
              {diagnosis.edibilitySafety.guidance}
            </p>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span className="uppercase tracking-wider">Human Consumption:</span>
              <span className={`font-bold uppercase tracking-wider ${diagnosis.edibilitySafety.isSafeToEat ? "text-green-400" : "text-rose-400"}`}>
                {diagnosis.edibilitySafety.isSafeToEat ? "Permissible (Check Guidelines)" : "Unsafe / Discard"}
              </span>
            </div>
          </div>

          {/* Market & Commercial Value Impact */}
          <div className="bg-[#121813] border border-white/10 p-4 space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
              <TrendingDown className="w-3.5 h-3.5 text-yellow-400" />
              <span>Storage Life &amp; Economic Impact</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {diagnosis.marketImpact}
            </p>
          </div>
        </div>

        {/* Right Column: Symptoms, Action Plan & Differential Diagnosis (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Identified Visual Symptoms & Causes Card */}
          <div className="bg-[#121813] border border-white/10 p-5 space-y-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2.5 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Key Observed Visual Symptoms
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {diagnosis.identifiedSymptoms.map((symp, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-[#0F1410] border border-white/10 text-xs text-slate-300 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-green-400 mt-1.5 shrink-0" />
                    <span>{symp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" /> Probable Underlying Causes
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-5">
                {diagnosis.probableCauses.map((cause, idx) => (
                  <li key={idx}>{cause}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action & Treatment Plan System */}
          <div className="bg-[#121813] border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-green-400" /> Action &amp; Treatment Protocol
              </div>
              <span className="text-[9px] uppercase tracking-widest text-slate-400">Integrated IPM</span>
            </div>

            {/* Tabs for Action Subsections */}
            <div className="flex flex-wrap gap-1 bg-[#0F1410] p-1 border border-white/10">
              <button
                id="action-tab-immediate"
                onClick={() => setActiveActionTab("immediate")}
                className={`px-3 py-1.5 text-[10px] uppercase font-semibold tracking-wider transition-colors flex items-center gap-1.5 ${
                  activeActionTab === "immediate"
                    ? "bg-yellow-400 text-black font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Flame className="w-3 h-3" /> Immediate
              </button>

              <button
                id="action-tab-organic"
                onClick={() => setActiveActionTab("organic")}
                className={`px-3 py-1.5 text-[10px] uppercase font-semibold tracking-wider transition-colors flex items-center gap-1.5 ${
                  activeActionTab === "organic"
                    ? "bg-green-500 text-black font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Leaf className="w-3 h-3" /> Organic Bio
              </button>

              <button
                id="action-tab-chemical"
                onClick={() => setActiveActionTab("chemical")}
                className={`px-3 py-1.5 text-[10px] uppercase font-semibold tracking-wider transition-colors flex items-center gap-1.5 ${
                  activeActionTab === "chemical"
                    ? "bg-cyan-500 text-black font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <FlaskConical className="w-3 h-3" /> Fungicide
              </button>

              <button
                id="action-tab-storage"
                onClick={() => setActiveActionTab("storage")}
                className={`px-3 py-1.5 text-[10px] uppercase font-semibold tracking-wider transition-colors flex items-center gap-1.5 ${
                  activeActionTab === "storage"
                    ? "bg-purple-400 text-black font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Warehouse className="w-3 h-3" /> Storage
              </button>

              <button
                id="action-tab-prevention"
                onClick={() => setActiveActionTab("prevention")}
                className={`px-3 py-1.5 text-[10px] uppercase font-semibold tracking-wider transition-colors flex items-center gap-1.5 ${
                  activeActionTab === "prevention"
                    ? "bg-white text-black font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ShieldCheck className="w-3 h-3" /> Prevention
              </button>
            </div>

            {/* Tab Contents */}
            <div className="bg-[#0F1410] border border-white/10 p-4 min-h-[140px]">
              {activeActionTab === "immediate" && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5" /> Urgent Intervention Step
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed bg-yellow-400/5 p-3 border border-yellow-400/20">
                    {diagnosis.actionPlan.immediateAction}
                  </p>
                </div>
              )}

              {activeActionTab === "organic" && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-green-400 uppercase tracking-wider">
                    Organic, Bio-Control &amp; Natural Treatments
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {diagnosis.actionPlan.organicRemedies.map((remedy, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Leaf className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                        <span>{remedy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeActionTab === "chemical" && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Targeted Agricultural Spray &amp; Fungicides
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {diagnosis.actionPlan.chemicalTreatments.map((treatment, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FlaskConical className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{treatment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeActionTab === "storage" && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                    Relative Humidity, Curing &amp; Ventilation Protocol
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {diagnosis.actionPlan.storageAndPreservation.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Warehouse className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeActionTab === "prevention" && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Field Crop Rotation &amp; Soil Cultivation Strategy
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {diagnosis.actionPlan.preventiveMeasures.map((prev, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{prev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Differential Diagnoses Card */}
          {diagnosis.differentialDiagnoses && diagnosis.differentialDiagnoses.length > 0 && (
            <div className="bg-[#121813] border border-white/10 p-5 space-y-3">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-green-400" /> Differential Diagnosis (Lookalike Conditions)
              </div>
              <div className="space-y-2">
                {diagnosis.differentialDiagnoses.map((diff, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#0F1410] border border-white/10 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 uppercase">{diff.condition}</span>
                      <span className="text-[9px] px-2 py-0.5 bg-white/5 border border-white/10 text-slate-400 uppercase tracking-wider">
                        {diff.likelihood} Likelihood
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      <strong className="text-slate-300">Distinction:</strong> {diff.distinction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
