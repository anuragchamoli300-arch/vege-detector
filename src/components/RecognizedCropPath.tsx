import React, { useState } from "react";
import {
  Sparkles,
  Search,
  AlertTriangle,
  Leaf,
  FlaskConical,
  Warehouse,
  ShieldCheck,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Bot,
  Layers,
  Thermometer,
  Droplets,
  Calendar,
  CheckCircle2,
  HelpCircle,
  Eye,
  ArrowRight,
  Filter,
} from "lucide-react";
import { getRecognizedCropPath, RecognizedCropInfo } from "../data/vegetableEncyclopedia";
import { EncyclopediaDisease, PathogenCategory } from "../types";

interface RecognizedCropPathProps {
  vegetableName: string;
  currentPrimaryIssue?: string;
  scannedImagePreview?: string;
  onSelectProblem?: (disease: EncyclopediaDisease) => void;
  onAskAgronomist?: (diseaseName: string) => void;
}

export const RecognizedCropPath: React.FC<RecognizedCropPathProps> = ({
  vegetableName,
  currentPrimaryIssue,
  scannedImagePreview,
  onSelectProblem,
  onAskAgronomist,
}) => {
  const cropPath: RecognizedCropInfo = getRecognizedCropPath(vegetableName);
  
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedDiseaseId, setExpandedDiseaseId] = useState<string | null>(
    // Default open the scanned issue or first disease
    cropPath.problems.find(p => p.name.toLowerCase().includes((currentPrimaryIssue || "").toLowerCase()))?.id ||
    cropPath.problems[0]?.id || null
  );
  const [comparingDisease, setComparingDisease] = useState<EncyclopediaDisease | null>(null);
  const [activePathView, setActivePathView] = useState<"problems" | "storage" | "cultivation">("problems");

  // Filter problems by category and search query
  const filteredProblems = cropPath.problems.filter((problem) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Fungal" && problem.category === "Fungal") ||
      (selectedCategory === "Bacterial" && problem.category === "Bacterial") ||
      (selectedCategory === "Viral" && problem.category === "Viral") ||
      (selectedCategory === "Physiological" && problem.category === "Physiological/Abiotic") ||
      (selectedCategory === "Pest" && problem.category === "Insect/Pest") ||
      (selectedCategory === "Storage" && (problem.category === "Storage Disorder" || problem.category === "Fungal"));

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      problem.name.toLowerCase().includes(query) ||
      problem.scientificAgent.toLowerCase().includes(query) ||
      problem.keyVisualSign.toLowerCase().includes(query) ||
      problem.typicalSymptoms.some((s) => s.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const getCategoryBadgeColor = (category: PathogenCategory) => {
    switch (category) {
      case "Fungal":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "Bacterial":
        return "bg-rose-500/15 text-rose-400 border-rose-500/30";
      case "Viral":
        return "bg-purple-500/15 text-purple-400 border-purple-500/30";
      case "Physiological/Abiotic":
        return "bg-sky-500/15 text-sky-400 border-sky-500/30";
      case "Insect/Pest":
        return "bg-orange-500/15 text-orange-400 border-orange-500/30";
      case "Storage Disorder":
        return "bg-indigo-500/15 text-indigo-400 border-indigo-500/30";
      default:
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    }
  };

  const isCurrentScannedIssue = (problemName: string) => {
    if (!currentPrimaryIssue) return false;
    const normScanned = currentPrimaryIssue.toLowerCase();
    const normProb = problemName.toLowerCase();
    return normProb.includes(normScanned) || normScanned.includes(normProb.split(" ")[0]);
  };

  return (
    <div className="bg-[#141d16] border border-emerald-800/40 rounded-2xl p-5 sm:p-6 space-y-6 shadow-md">
      {/* Header Banner for Recognized Vegetable Path */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <Sparkles className="w-3.5 h-3.5" /> Recognized Crop Path
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/60 text-slate-300 border border-emerald-900/50">
              {cropPath.family}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950/50 text-cyan-300 border border-cyan-800/40">
              {cropPath.problems.length} Documented Issues
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>All Problems &amp; Pathologies for {cropPath.displayName}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Scientific taxonomy: <em className="text-emerald-400">{cropPath.scientificName}</em> &bull; {cropPath.description}
          </p>
        </div>

        {/* View Switcher: Problems Matrix vs Storage Blueprint vs Cultivation */}
        <div className="flex items-center bg-[#0d130e] p-1.5 rounded-xl border border-emerald-900/40 self-start md:self-auto shrink-0">
          <button
            id="btn-path-problems"
            onClick={() => setActivePathView("problems")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activePathView === "problems"
                ? "bg-emerald-500 text-stone-950 shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Problem Path ({cropPath.problems.length})
          </button>
          <button
            id="btn-path-storage"
            onClick={() => setActivePathView("storage")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activePathView === "storage"
                ? "bg-emerald-500 text-stone-950 shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Warehouse className="w-3.5 h-3.5" /> Storage Specs
          </button>
          <button
            id="btn-path-cultivation"
            onClick={() => setActivePathView("cultivation")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activePathView === "cultivation"
                ? "bg-emerald-500 text-stone-950 shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Leaf className="w-3.5 h-3.5" /> Growing Guide
          </button>
        </div>
      </div>

      {/* VIEW 1: RECOGNIZED PROBLEMS MATRIX */}
      {activePathView === "problems" && (
        <div className="space-y-4">
          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
              {["All", "Fungal", "Bacterial", "Physiological", "Viral", "Pest", "Storage"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-emerald-600 text-white font-bold shadow-sm"
                      : "bg-[#0d130e] text-slate-400 hover:text-slate-200 border border-emerald-900/30"
                  }`}
                >
                  {cat === "All" ? `All (${cropPath.problems.length})` : cat}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative min-w-[200px] sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search symptoms in ${cropPath.displayName}...`}
                className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Scanned Specimen Comparison Notification Banner */}
          {currentPrimaryIssue && (
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-200">
                  Current Scan Diagnosed: <strong className="text-emerald-300 font-semibold">{currentPrimaryIssue}</strong>. Explore the full list below to see alternative or co-occurring problems for this vegetable.
                </span>
              </div>
            </div>
          )}

          {/* Problems List */}
          <div className="space-y-3">
            {filteredProblems.length === 0 ? (
              <div className="bg-[#0d130e] border border-emerald-900/30 rounded-xl p-8 text-center space-y-2">
                <HelpCircle className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-sm font-semibold text-slate-300">No matching problem found for "{searchQuery}"</p>
                <p className="text-xs text-slate-500">Try searching for other symptoms like "blight", "spots", "rot", "mold", or "wilt".</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-2 px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800/40 text-xs font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredProblems.map((problem) => {
                const isExpanded = expandedDiseaseId === problem.id;
                const isCurrent = isCurrentScannedIssue(problem.name);

                return (
                  <div
                    key={problem.id}
                    className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                      isCurrent
                        ? "bg-[#162219] border-emerald-500/50 shadow-md shadow-emerald-950/30"
                        : "bg-[#0d130e] border-emerald-900/30 hover:border-emerald-700/50"
                    }`}
                  >
                    {/* Collapsed Header Bar */}
                    <div
                      onClick={() => setExpandedDiseaseId(isExpanded ? null : problem.id)}
                      className="p-4 cursor-pointer flex items-center justify-between gap-3 select-none"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border shrink-0 ${getCategoryBadgeColor(
                            problem.category
                          )}`}
                        >
                          {problem.category}
                        </span>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm sm:text-base font-bold text-white truncate">
                              {problem.name}
                            </h3>
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-stone-950 shrink-0">
                                Detected in Scan
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            Pathogen: <span className="text-slate-300 italic">{problem.scientificAgent}</span> &bull; Visual: {problem.keyVisualSign}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {scannedImagePreview && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setComparingDisease(problem);
                            }}
                            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-[#141d16] hover:bg-emerald-900/40 text-emerald-300 border border-emerald-800/40 font-medium transition-colors"
                          >
                            <Eye className="w-3 h-3" /> Compare Scan
                          </button>
                        )}
                        <div className="p-1 rounded-lg bg-[#141d16] text-slate-400 border border-emerald-900/30">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Clinical Breakdown */}
                    {isExpanded && (
                      <div className="p-4 sm:p-5 pt-0 border-t border-emerald-900/30 bg-[#121913]/60 space-y-4 text-xs">
                        {/* Quick Diagnostic Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                          {/* Symptoms List */}
                          <div className="bg-[#0d130e] border border-emerald-900/30 rounded-xl p-3.5 space-y-2">
                            <div className="font-bold text-slate-200 flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Typical Symptoms in {cropPath.displayName}
                            </div>
                            <ul className="space-y-1.5 text-slate-300">
                              {problem.typicalSymptoms.map((sym, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                  <span>{sym}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Favorable Environmental Conditions */}
                          <div className="bg-[#0d130e] border border-emerald-900/30 rounded-xl p-3.5 space-y-2">
                            <div className="font-bold text-slate-200 flex items-center gap-1.5">
                              <Thermometer className="w-3.5 h-3.5 text-cyan-400" /> Risk Factors &amp; Environmental Triggers
                            </div>
                            <ul className="space-y-1.5 text-slate-300">
                              {problem.favorableConditions.map((cond, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                                  <span>{cond}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Remedies & Treatment Blueprint */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Organic Management */}
                          <div className="bg-[#0d130e] border border-emerald-900/30 rounded-xl p-3.5 space-y-2">
                            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                              <Leaf className="w-3.5 h-3.5" /> Organic &amp; Bio-Control Cure
                            </div>
                            <ul className="space-y-1.5 text-slate-300">
                              {problem.organicCure.map((cure, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Leaf className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{cure}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Chemical IPM & Sprays */}
                          <div className="bg-[#0d130e] border border-emerald-900/30 rounded-xl p-3.5 space-y-2">
                            <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                              <FlaskConical className="w-3.5 h-3.5" /> Chemical Treatments &amp; IPM
                            </div>
                            <ul className="space-y-1.5 text-slate-300">
                              {problem.chemicalCure.map((chem, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <FlaskConical className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                                  <span>{chem}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Culinary Safety & Edibility */}
                        <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-3.5 flex items-start gap-2.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <div className="font-bold text-slate-200">Edibility &amp; Consumption Safety:</div>
                            <p className="text-slate-300 leading-relaxed">{problem.edibilityRisk}</p>
                          </div>
                        </div>

                        {/* Action Buttons for this specific problem */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5">
                          <div className="flex items-center gap-2">
                            {scannedImagePreview && (
                              <button
                                onClick={() => setComparingDisease(problem)}
                                className="px-3 py-1.5 rounded-lg bg-[#0d130e] hover:bg-[#1a261d] text-emerald-300 border border-emerald-800/40 text-xs font-medium flex items-center gap-1.5 transition-colors"
                              >
                                <Eye className="w-3.5 h-3.5 text-emerald-400" /> Side-by-Side Photo Comparison
                              </button>
                            )}

                            {onAskAgronomist && (
                              <button
                                onClick={() => onAskAgronomist(problem.name)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                              >
                                <Bot className="w-3.5 h-3.5" /> Consult Dr. Flora on {problem.name.split(" ")[0]}
                              </button>
                            )}
                          </div>

                          {onSelectProblem && !isCurrent && (
                            <button
                              onClick={() => onSelectProblem(problem)}
                              className="px-3 py-1.5 rounded-lg bg-[#0d130e] hover:bg-emerald-900/40 text-slate-200 hover:text-white border border-emerald-700/50 text-xs font-medium flex items-center gap-1.5 transition-colors ml-auto"
                            >
                              <span>Apply this Diagnosis</span>
                              <ArrowRight className="w-3 h-3 text-emerald-400" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: STORAGE & POST-HARVEST BLUEPRINT */}
      {activePathView === "storage" && (
        <div className="space-y-4">
          <div className="bg-[#0d130e] border border-emerald-900/30 rounded-xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Warehouse className="w-4 h-4 text-emerald-400" /> Post-Harvest Storage Protocol for {cropPath.displayName}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-[#141d16] border border-emerald-900/30 rounded-xl p-3.5 space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-amber-400" /> Target Temperature
                </div>
                <div className="text-sm font-bold text-slate-100">{cropPath.storageBlueprint.optimalTemperature}</div>
              </div>

              <div className="bg-[#141d16] border border-emerald-900/30 rounded-xl p-3.5 space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-cyan-400" /> Relative Humidity
                </div>
                <div className="text-sm font-bold text-slate-100">{cropPath.storageBlueprint.optimalHumidity}</div>
              </div>

              <div className="bg-[#141d16] border border-emerald-900/30 rounded-xl p-3.5 space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-400" /> Storage Longevity
                </div>
                <div className="text-sm font-bold text-slate-100">{cropPath.storageBlueprint.shelfLifeDays}</div>
              </div>

              <div className="bg-[#141d16] border border-emerald-900/30 rounded-xl p-3.5 space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Layers className="w-3 h-3 text-purple-400" /> Ethylene Response
                </div>
                <div className="text-sm font-bold text-slate-100">{cropPath.storageBlueprint.ethyleneSensitivity} Sensitivity</div>
              </div>
            </div>

            <div className="p-4 bg-emerald-950/20 border border-emerald-800/30 rounded-xl space-y-2 text-xs">
              <div className="font-bold text-emerald-300">Curing &amp; Preparation Advice:</div>
              <p className="text-slate-300 leading-relaxed">{cropPath.storageBlueprint.curingAdvice}</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: CULTIVATION & ROTATION BLUEPRINT */}
      {activePathView === "cultivation" && (
        <div className="space-y-4">
          <div className="bg-[#0d130e] border border-emerald-900/30 rounded-xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400" /> Botanical Growing &amp; Prevention Guide for {cropPath.displayName}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#141d16] border border-emerald-900/30 rounded-xl p-4 space-y-1.5">
                <div className="font-bold text-slate-200">Ideal Soil pH Target:</div>
                <p className="text-slate-300">{cropPath.cultivationGuide.idealSoilPh}</p>
              </div>

              <div className="bg-[#141d16] border border-emerald-900/30 rounded-xl p-4 space-y-1.5">
                <div className="font-bold text-slate-200">Sun &amp; Light Exposure:</div>
                <p className="text-slate-300">{cropPath.cultivationGuide.sunRequirement}</p>
              </div>

              <div className="bg-[#141d16] border border-emerald-900/30 rounded-xl p-4 space-y-1.5">
                <div className="font-bold text-slate-200">Watering Best Practices:</div>
                <p className="text-slate-300">{cropPath.cultivationGuide.wateringMethod}</p>
              </div>

              <div className="bg-[#141d16] border border-emerald-900/30 rounded-xl p-4 space-y-1.5">
                <div className="font-bold text-slate-200">Mandatory Crop Rotation:</div>
                <p className="text-slate-300">{cropPath.cultivationGuide.rotationInterval} (Prevents soil pathogen buildup)</p>
              </div>
            </div>

            <div className="bg-[#141d16] border border-emerald-900/30 rounded-xl p-4 space-y-2 text-xs">
              <div className="font-bold text-slate-200">Recommended Companion Plants:</div>
              <div className="flex flex-wrap gap-2">
                {cropPath.cultivationGuide.companionPlants.map((plant, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 font-medium"
                  >
                    + {plant}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SIDE-BY-SIDE PHOTO COMPARISON MODAL */}
      {comparingDisease && scannedImagePreview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141d16] border border-emerald-500/40 rounded-2xl max-w-3xl w-full p-5 sm:p-6 space-y-5 shadow-2xl animate-in fade-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Compare Scanned Specimen vs. {comparingDisease.name}
                </h3>
              </div>
              <button
                onClick={() => setComparingDisease(null)}
                className="text-slate-400 hover:text-white px-2 py-1 rounded-lg text-xs bg-[#0d130e]"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Current Scanned Photo */}
              <div className="bg-[#0d130e] border border-emerald-900/40 rounded-xl p-3 space-y-2">
                <div className="text-xs font-bold text-emerald-400">Your Scanned Produce</div>
                <div className="aspect-[4/3] bg-black/40 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={scannedImagePreview}
                    alt="Scanned specimen"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="text-[11px] text-slate-400">Current Vegetable: {cropPath.displayName}</p>
              </div>

              {/* Right: Disease Clinical Markers */}
              <div className="bg-[#0d130e] border border-emerald-900/40 rounded-xl p-4 space-y-3 text-xs">
                <div className="font-bold text-amber-400">Diagnostic Markers for {comparingDisease.name}:</div>
                
                <div className="space-y-1">
                  <span className="font-semibold text-slate-300">Key Visual Signature:</span>
                  <p className="text-slate-200 bg-amber-950/20 p-2.5 rounded-lg border border-amber-800/30">
                    {comparingDisease.keyVisualSign}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-semibold text-slate-300">Matching Symptoms:</span>
                  <ul className="space-y-1 text-slate-300 pl-3 list-disc">
                    {comparingDisease.typicalSymptoms.slice(0, 3).map((sym, idx) => (
                      <li key={idx}>{sym}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1">
                  <span className="font-semibold text-slate-300">Edibility Status:</span>
                  <p className="text-slate-300">{comparingDisease.edibilityRisk}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setComparingDisease(null)}
                className="px-4 py-2 rounded-xl bg-[#0d130e] hover:bg-[#1a261d] text-slate-300 text-xs font-medium border border-emerald-900/40"
              >
                Close Comparison
              </button>
              {onAskAgronomist && (
                <button
                  onClick={() => {
                    const disease = comparingDisease.name;
                    setComparingDisease(null);
                    onAskAgronomist(disease);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow"
                >
                  Ask Agronomist AI About This Difference
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
