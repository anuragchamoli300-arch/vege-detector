import React, { useState, useMemo } from "react";
import {
  Search,
  X,
  AlertTriangle,
  Leaf,
  FlaskConical,
  ShieldCheck,
  ShieldAlert,
  Bot,
  BookmarkPlus,
  ArrowRight,
  Filter,
  CheckCircle2,
  Sparkles,
  Info,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { ENCYCLOPEDIA_DISEASES } from "../data/vegetableEncyclopedia";
import { EncyclopediaDisease, PathogenCategory, DiagnosticResult } from "../types";
import { soundEngine } from "../utils/audioEffects";

interface ProblemSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCropName?: string;
  onSelectProblem?: (disease: EncyclopediaDisease) => void;
  onAskAgronomist?: (diseaseName: string) => void;
  onSaveToDatabase?: (disease: EncyclopediaDisease) => void;
}

const CATEGORIES: { label: string; value: string }[] = [
  { label: "All Pathologies", value: "All" },
  { label: "Fungal Diseases", value: "Fungal" },
  { label: "Bacterial Invasions", value: "Bacterial" },
  { label: "Viral Infections", value: "Viral" },
  { label: "Pests & Insects", value: "Insect/Pest" },
  { label: "Storage Disorders", value: "Storage Disorder" },
  { label: "Physiological/Abiotic", value: "Physiological/Abiotic" },
];

const CROPS = [
  "All Vegetables",
  "Onion & Garlic",
  "Tomato",
  "Potato",
  "Bell Pepper",
  "Cabbage & Broccoli",
  "Carrot & Radish",
  "Cucumber & Zucchini",
  "Eggplant & Brinjal",
  "Spinach & Greens",
  "Okra & Bhindi",
];

export const ProblemSearchModal: React.FC<ProblemSearchModalProps> = ({
  isOpen,
  onClose,
  currentCropName,
  onSelectProblem,
  onAskAgronomist,
  onSaveToDatabase,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCrop, setSelectedCrop] = useState<string>(
    currentCropName
      ? CROPS.find((c) =>
          c.toLowerCase().includes(currentCropName.toLowerCase().split(" ")[0])
        ) || "All Vegetables"
      : "All Vegetables"
  );
  const [expandedDiseaseId, setExpandedDiseaseId] = useState<string | null>(null);

  // Filtered diseases based on query, category, and crop
  const searchResults = useMemo(() => {
    return ENCYCLOPEDIA_DISEASES.filter((disease) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All" || disease.category === selectedCategory;

      // Crop filter
      const matchesCrop =
        selectedCrop === "All Vegetables" ||
        disease.vegetableType.toLowerCase().includes(
          selectedCrop.toLowerCase().split("&")[0].split("/")[0].trim()
        ) ||
        disease.name.toLowerCase().includes(
          selectedCrop.toLowerCase().split("&")[0].split("/")[0].trim()
        );

      // Search Query filter across name, symptoms, causes, pathogen, remedies
      if (!searchQuery.trim()) {
        return matchesCategory && matchesCrop;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        disease.name.toLowerCase().includes(q) ||
        disease.scientificAgent.toLowerCase().includes(q) ||
        disease.vegetableType.toLowerCase().includes(q) ||
        disease.category.toLowerCase().includes(q) ||
        disease.keyVisualSign.toLowerCase().includes(q) ||
        disease.edibilityRisk.toLowerCase().includes(q) ||
        disease.typicalSymptoms.some((s) => s.toLowerCase().includes(q)) ||
        disease.organicCure.some((o) => o.toLowerCase().includes(q)) ||
        disease.chemicalCure.some((c) => c.toLowerCase().includes(q)) ||
        disease.prevention.some((p) => p.toLowerCase().includes(q));

      return matchesCategory && matchesCrop && matchesQuery;
    });
  }, [searchQuery, selectedCategory, selectedCrop]);

  if (!isOpen) return null;

  const handleSelect = (disease: EncyclopediaDisease) => {
    soundEngine.playSaveSnap();
    if (onSelectProblem) {
      onSelectProblem(disease);
    }
    onClose();
  };

  const handleAsk = (disease: EncyclopediaDisease) => {
    if (onAskAgronomist) {
      onAskAgronomist(disease.name);
    }
    onClose();
  };

  const handleSave = (disease: EncyclopediaDisease) => {
    soundEngine.playSaveSnap();
    if (onSaveToDatabase) {
      onSaveToDatabase(disease);
    }
  };

  return (
    <div
      id="modal-problem-search"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#141d16] border border-emerald-900/40 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-emerald-900/30 bg-[#162219]">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Search Crop Problems &amp; Disease Library
                </h2>
                <p className="text-xs text-slate-400">
                  Search across 50+ diseases, rots, blights, and disorders for 12 produce types
                </p>
              </div>
            </div>

            <button
              id="btn-close-problem-search"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#0d130e] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by disease name, symptom (e.g. 'black mold', 'purple spots', 'soft rot', 'yellowing')..."
              className="w-full bg-[#0d130e] border border-emerald-900/50 rounded-2xl pl-11 pr-10 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 transition-colors shadow-inner"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-emerald-900/20">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <Filter className="w-3 h-3 text-emerald-400" /> Category:
            </span>
            <div className="flex flex-wrap gap-1.5 overflow-x-auto max-w-full pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat.value
                      ? "bg-emerald-500 text-stone-950 font-bold shadow"
                      : "bg-[#0d130e] text-slate-400 hover:text-slate-200 border border-emerald-900/30"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Crop Selector Bar */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-[11px] font-semibold text-slate-400">Crop:</span>
            <div className="flex flex-wrap gap-1.5 overflow-x-auto max-w-full">
              {CROPS.map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium transition-all ${
                    selectedCrop === crop
                      ? "bg-teal-500 text-stone-950 font-bold"
                      : "bg-[#0d130e]/70 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter & List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Found <strong className="text-emerald-400">{searchResults.length}</strong> matching crop problems
            </span>
            {searchQuery && (
              <span className="text-[11px] text-slate-400">
                Filtered by &quot;{searchQuery}&quot;
              </span>
            )}
          </div>

          {searchResults.length === 0 ? (
            <div className="text-center py-12 space-y-3 bg-[#0d130e] border border-emerald-900/30 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-center mx-auto text-emerald-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-white">No Matching Problems Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Try broadening your search term or switching to &quot;All Pathologies&quot; / &quot;All Crops&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedCrop("All Crops");
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {searchResults.map((disease) => {
                const isExpanded = expandedDiseaseId === disease.id;
                const isSafe = disease.edibilityRisk.toLowerCase().includes("safe");

                return (
                  <div
                    key={disease.id}
                    className="bg-[#0d130e] border border-emerald-900/30 hover:border-emerald-700/50 rounded-2xl p-4 sm:p-5 transition-all shadow-sm space-y-3"
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                            {disease.vegetableType}
                          </span>
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-stone-800 text-slate-300">
                            {disease.category}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white">
                          {disease.name}
                        </h3>
                        <p className="text-xs text-slate-400 italic">
                          {disease.scientificAgent}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {onSelectProblem && (
                          <button
                            id={`btn-select-problem-${disease.id}`}
                            onClick={() => handleSelect(disease)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-all active:scale-95"
                            title="Apply this condition to the active diagnosis view"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Set as Diagnosis</span>
                          </button>
                        )}

                        <button
                          id={`btn-ask-disease-${disease.id}`}
                          onClick={() => handleAsk(disease)}
                          className="px-3 py-1.5 rounded-xl bg-[#141d16] hover:bg-[#1a261d] text-emerald-300 border border-emerald-900/40 text-xs font-medium flex items-center gap-1.5 transition-all"
                          title="Ask Dr. Flora AI Agronomist about this condition"
                        >
                          <Bot className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Ask Agronomist</span>
                        </button>

                        <button
                          id={`btn-save-disease-${disease.id}`}
                          onClick={() => handleSave(disease)}
                          className="p-1.5 rounded-xl bg-[#141d16] hover:bg-[#1a261d] text-amber-400 border border-emerald-900/40 transition-all"
                          title="Save this problem to the database"
                        >
                          <BookmarkPlus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Key Visual Sign */}
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <strong>Key Visual Identifier:</strong> {disease.keyVisualSign}
                      </div>
                    </div>

                    {/* Symptoms preview */}
                    <div className="text-xs text-slate-300 space-y-1">
                      <div className="font-semibold text-slate-200">Observed Symptoms:</div>
                      <ul className="list-disc pl-5 space-y-0.5 text-slate-300 text-xs">
                        {disease.typicalSymptoms.slice(0, isExpanded ? undefined : 2).map((symp, sIdx) => (
                          <li key={sIdx}>{symp}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Expanded details (Organic, Chemical, Prevention, Edibility) */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-emerald-900/30 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-[#141d16] border border-emerald-900/30 rounded-xl space-y-1.5">
                          <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                            <Leaf className="w-3.5 h-3.5" /> Organic Treatment
                          </div>
                          <ul className="space-y-1 text-slate-300 list-disc pl-4">
                            {disease.organicCure.map((cure, cIdx) => (
                              <li key={cIdx}>{cure}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 bg-[#141d16] border border-emerald-900/30 rounded-xl space-y-1.5">
                          <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                            <FlaskConical className="w-3.5 h-3.5" /> Chemical / IPM Sprays
                          </div>
                          <ul className="space-y-1 text-slate-300 list-disc pl-4">
                            {disease.chemicalCure.map((chem, chIdx) => (
                              <li key={chIdx}>{chem}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="md:col-span-2 p-3 bg-[#141d16] border border-emerald-900/30 rounded-xl space-y-1">
                          <div className="font-bold text-slate-200 flex items-center gap-1.5">
                            {isSafe ? (
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                            )}
                            <span>Culinary &amp; Edibility Guidance:</span>
                          </div>
                          <p className="text-slate-300 leading-relaxed">
                            {disease.edibilityRisk}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Toggle expand button */}
                    <div className="pt-1 flex items-center justify-between text-xs">
                      <button
                        onClick={() => setExpandedDiseaseId(isExpanded ? null : disease.id)}
                        className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
                      >
                        <span>{isExpanded ? "Show Less" : "View Complete Treatment & Prevention"}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "-rotate-90" : "rotate-90"}`} />
                      </button>

                      <span className="text-[11px] text-slate-500">
                        {disease.family}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
