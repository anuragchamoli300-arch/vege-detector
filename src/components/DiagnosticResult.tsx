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
  TrendingDown,
  Sparkles,
} from "lucide-react";
import { DiagnosticResult as DiagnosticResultType, HealthStatus } from "../types";

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
          label: "Healthy Vegetable",
        };
      case "MILD_ISSUE":
        return {
          bg: "bg-sky-500/15 text-sky-400 border-sky-500/30",
          icon: <Info className="w-4 h-4 text-sky-400" />,
          label: "Mild Condition",
        };
      case "MODERATE_DISEASE":
        return {
          bg: "bg-amber-500/15 text-amber-400 border-amber-500/30",
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
          label: "Moderate Issue",
        };
      case "SEVERE_DAMAGE":
        return {
          bg: "bg-orange-500/15 text-orange-400 border-orange-500/30",
          icon: <Flame className="w-4 h-4 text-orange-400" />,
          label: "Severe Infection",
        };
      case "SPOILED_UNFIT":
      default:
        return {
          bg: "bg-rose-500/15 text-rose-400 border-rose-500/30",
          icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
          label: "Spoiled / Rotten",
        };
    }
  };

  const getEdibilityColor = (isSafe: boolean, rating: string) => {
    if (rating.includes("Safe") || rating.includes("Fresh")) {
      return {
        cardBg: "bg-emerald-950/20 border-emerald-500/30 text-emerald-300",
        badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      };
    }
    if (rating.includes("Trim") || rating.includes("Peel") || rating.includes("Caution")) {
      return {
        cardBg: "bg-amber-950/20 border-amber-500/30 text-amber-300",
        badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      };
    }
    return {
      cardBg: "bg-rose-950/20 border-rose-500/30 text-rose-300",
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
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusInfo.bg}`}>
                {statusInfo.icon}
                <span>{statusInfo.label}</span>
              </span>

              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/40 text-slate-300 border border-emerald-900/40">
                {diagnosis.pathogenType}
              </span>

              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {diagnosis.confidenceScore}% Confidence
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {diagnosis.primaryIssue}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Vegetable: <strong className="text-slate-200">{diagnosis.vegetableName}</strong> ({diagnosis.scientificName}) &bull; Part: {diagnosis.plantPart}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center flex-wrap gap-2.5">
            <button
              id="btn-save-to-tracker"
              onClick={handleSave}
              disabled={saveSuccess}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                saveSuccess
                  ? "bg-emerald-900/30 text-emerald-300 border-emerald-500/40 cursor-default"
                  : "bg-[#0d130e] hover:bg-[#1a261d] text-slate-200 border-emerald-900/40 shadow-sm"
              }`}
            >
              {saveSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saved to Tracker</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Save to Tracker</span>
                </>
              )}
            </button>

            <button
              id="btn-ask-agronomist-direct"
              onClick={() => onAskAgronomist(diagnosis)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-md shadow-emerald-950/40"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask Dr. Flora</span>
            </button>

            <button
              id="btn-scan-another"
              onClick={onScanNew}
              className="px-4 py-2 rounded-xl bg-[#0d130e] hover:bg-[#1a261d] text-slate-300 border border-emerald-900/40 text-xs font-medium transition-all flex items-center gap-1.5"
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
          <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl overflow-hidden shadow-sm">
            <div className="relative aspect-[4/3] bg-[#0d130e] flex items-center justify-center p-3">
              <img
                src={imagePreview}
                alt="Diagnosed vegetable specimen"
                className="max-h-full max-w-full object-contain rounded-xl"
              />
            </div>

            <div className="p-4 border-t border-emerald-900/30 bg-[#141d16]">
              <div className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-400" /> Summary
              </div>
              <p className="text-xs leading-relaxed text-slate-300">{diagnosis.summary}</p>
            </div>
          </div>

          {/* Edibility & Culinary Safety Card */}
          <div className={`rounded-2xl border p-5 space-y-3 ${edibilityStyle.cardBg}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {edibilityStyle.icon}
                <div className="text-sm font-bold text-white">Is it safe to eat?</div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${edibilityStyle.badge}`}>
                {diagnosis.edibilitySafety.rating}
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-200">
              {diagnosis.edibilitySafety.guidance}
            </p>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span>Safety Advice:</span>
              <span className={`font-bold ${diagnosis.edibilitySafety.isSafeToEat ? "text-emerald-400" : "text-rose-400"}`}>
                {diagnosis.edibilitySafety.isSafeToEat ? "Safe with Preparation" : "Unsafe - Discard"}
              </span>
            </div>
          </div>

          {/* Market & Storage Impact */}
          <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
              <span>Storage & Shelf Life</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {diagnosis.marketImpact}
            </p>
          </div>
        </div>

        {/* Right Column: Symptoms & Action Plan (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Identified Visual Symptoms & Causes Card */}
          <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-5 space-y-4 shadow-sm">
            <div>
              <div className="text-xs font-bold text-slate-300 mb-2.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Observed Symptoms
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {diagnosis.identifiedSymptoms.map((symp, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-[#0d130e] border border-emerald-900/30 rounded-xl text-xs text-slate-300 flex items-start gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                    <span>{symp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-900/30">
              <div className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Probable Causes
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-5">
                {diagnosis.probableCauses.map((cause, idx) => (
                  <li key={idx}>{cause}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action & Treatment Plan */}
          <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Recommended Actions
              </div>
            </div>

            {/* Action Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-[#0d130e] p-1.5 rounded-xl border border-emerald-900/30">
              <button
                id="action-tab-immediate"
                onClick={() => setActiveActionTab("immediate")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeActionTab === "immediate"
                    ? "bg-amber-500 text-stone-950 font-bold shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Flame className="w-3.5 h-3.5" /> What to Do Now
              </button>

              <button
                id="action-tab-organic"
                onClick={() => setActiveActionTab("organic")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeActionTab === "organic"
                    ? "bg-emerald-500 text-stone-950 font-bold shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Leaf className="w-3.5 h-3.5" /> Organic
              </button>

              <button
                id="action-tab-chemical"
                onClick={() => setActiveActionTab("chemical")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeActionTab === "chemical"
                    ? "bg-cyan-500 text-stone-950 font-bold shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5" /> Treatment
              </button>

              <button
                id="action-tab-storage"
                onClick={() => setActiveActionTab("storage")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeActionTab === "storage"
                    ? "bg-purple-500 text-white font-bold shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Warehouse className="w-3.5 h-3.5" /> Storage Tips
              </button>

              <button
                id="action-tab-prevention"
                onClick={() => setActiveActionTab("prevention")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeActionTab === "prevention"
                    ? "bg-white text-stone-950 font-bold shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Prevention
              </button>
            </div>

            {/* Tab Contents */}
            <div className="bg-[#0d130e] border border-emerald-900/30 rounded-xl p-4 min-h-[130px]">
              {activeActionTab === "immediate" && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Flame className="w-3.5 h-3.5" /> Immediate Step
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                    {diagnosis.actionPlan.immediateAction}
                  </p>
                </div>
              )}

              {activeActionTab === "organic" && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-emerald-400">
                    Natural & Organic Remedies
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {diagnosis.actionPlan.organicRemedies.map((remedy, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{remedy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeActionTab === "chemical" && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-cyan-400">
                    Targeted Sprays & Treatment
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
                  <div className="text-xs font-bold text-purple-400">
                    Proper Storage & Preservation
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
                  <div className="text-xs font-bold text-slate-300">
                    Future Crop & Harvest Prevention
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

          {/* Lookalike Diseases */}
          {diagnosis.differentialDiagnoses && diagnosis.differentialDiagnoses.length > 0 && (
            <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-emerald-400" /> Similar Conditions & Differences
              </div>
              <div className="space-y-2">
                {diagnosis.differentialDiagnoses.map((diff, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#0d130e] border border-emerald-900/30 rounded-xl text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{diff.condition}</span>
                      <span className="text-[11px] px-2 py-0.5 bg-emerald-950/40 rounded-md border border-emerald-900/40 text-slate-300">
                        {diff.likelihood} Likelihood
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      <strong className="text-slate-300">Difference:</strong> {diff.distinction}
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

