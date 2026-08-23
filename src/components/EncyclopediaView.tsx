import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Leaf,
  FlaskConical,
  Warehouse,
  ShieldAlert,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Bot,
  Apple,
  CheckCircle2,
  Filter,
  Layers,
  Sparkles,
} from "lucide-react";
import { ENCYCLOPEDIA_DISEASES } from "../data/vegetableEncyclopedia";
import { VegetableFamily, PathogenCategory } from "../types";

interface EncyclopediaViewProps {
  onAskAgronomistAboutDisease: (diseaseName: string) => void;
  onSelectCropForScanning?: (cropName: string) => void;
}

const CROP_CATEGORIES = ["All Crops", "Vegetables", "Fruits"] as const;

const FAMILIES: ("All Families" | VegetableFamily)[] = [
  "All Families",
  "Allium (Onion, Garlic, Leek)",
  "Solanaceae (Tomato, Potato, Pepper)",
  "Rosaceae Fruits (Apple, Strawberry, Peach)",
  "Citrus & Tropical (Orange, Banana, Lemon)",
  "Brassica (Cabbage, Broccoli, Cauliflower)",
  "Root & Tuber (Carrot, Radish, Beet)",
  "Vitaceae (Grapes & Berries)",
  "Cucurbit (Cucumber, Zucchini, Melon)",
];

const POPULAR_CROPS = [
  { name: "All", label: "All Crops" },
  { name: "Onion", label: "🧅 Onion / Garlic", type: "Vegetables" },
  { name: "Tomato", label: "🍅 Tomato", type: "Vegetables" },
  { name: "Potato", label: "🥔 Potato", type: "Vegetables" },
  { name: "Apple", label: "🍎 Apple", type: "Fruits" },
  { name: "Banana", label: "🍌 Banana", type: "Fruits" },
  { name: "Orange", label: "🍊 Orange / Citrus", type: "Fruits" },
  { name: "Strawberry", label: "🍓 Strawberry", type: "Fruits" },
  { name: "Bell Pepper", label: "🫑 Bell Pepper / Chili", type: "Vegetables" },
  { name: "Cabbage", label: "🥬 Cabbage / Broccoli", type: "Vegetables" },
  { name: "Carrot", label: "🥕 Carrot", type: "Vegetables" },
  { name: "Grapes", label: "🍇 Grapes", type: "Fruits" },
  { name: "Cucumber", label: "🥒 Cucumber / Squash", type: "Vegetables" },
];

export const EncyclopediaView: React.FC<EncyclopediaViewProps> = ({
  onAskAgronomistAboutDisease,
  onSelectCropForScanning,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All Crops" | "Vegetables" | "Fruits">("All Crops");
  const [selectedFamily, setSelectedFamily] = useState<"All Families" | VegetableFamily>("All Families");
  const [selectedCrop, setSelectedCrop] = useState<string>("All");
  const [selectedPathogen, setSelectedPathogen] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(ENCYCLOPEDIA_DISEASES[0]?.id || null);

  const filteredDiseases = ENCYCLOPEDIA_DISEASES.filter((item) => {
    // Category check (Fruits vs Vegetables)
    let matchesCategory = true;
    if (selectedCategory === "Fruits") {
      matchesCategory =
        item.family.includes("Rosaceae") ||
        item.family.includes("Citrus") ||
        item.family.includes("Vitaceae") ||
        item.vegetableType.toLowerCase().includes("apple") ||
        item.vegetableType.toLowerCase().includes("banana") ||
        item.vegetableType.toLowerCase().includes("orange") ||
        item.vegetableType.toLowerCase().includes("strawberry") ||
        item.vegetableType.toLowerCase().includes("grape");
    } else if (selectedCategory === "Vegetables") {
      matchesCategory =
        item.family.includes("Allium") ||
        item.family.includes("Solanaceae") ||
        item.family.includes("Brassica") ||
        item.family.includes("Root") ||
        item.family.includes("Cucurbit") ||
        item.vegetableType.toLowerCase().includes("onion") ||
        item.vegetableType.toLowerCase().includes("tomato") ||
        item.vegetableType.toLowerCase().includes("potato") ||
        item.vegetableType.toLowerCase().includes("pepper") ||
        item.vegetableType.toLowerCase().includes("cabbage") ||
        item.vegetableType.toLowerCase().includes("carrot") ||
        item.vegetableType.toLowerCase().includes("cucumber");
    }

    // Family match
    const matchesFamily = selectedFamily === "All Families" || item.family === selectedFamily;

    // Crop match
    const matchesCrop =
      selectedCrop === "All" ||
      item.vegetableType.toLowerCase().includes(selectedCrop.toLowerCase()) ||
      item.name.toLowerCase().includes(selectedCrop.toLowerCase());

    // Pathogen match
    const matchesPathogen = selectedPathogen === "All" || item.category === selectedPathogen;

    // Search query match
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.scientificAgent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vegetableType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keyVisualSign.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.typicalSymptoms.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesFamily && matchesCrop && matchesPathogen && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getPathogenBadgeColor = (category: PathogenCategory) => {
    switch (category) {
      case "Fungal":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Bacterial":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "Viral":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      case "Insect/Pest":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Physiological/Abiotic":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Storage Disorder":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      default:
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BookOpen className="w-3.5 h-3.5" /> 10+ Vegetable &amp; Fruit Disease Encyclopedia
            </span>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <strong>{filteredDiseases.length}</strong> of {ENCYCLOPEDIA_DISEASES.length} Comprehensive Disease Profiles
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-white mt-2">
          Vegetable &amp; Fruit Disease &amp; Rot Guide
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Complete botanical descriptions, pathogen identification, environmental triggers, organic bio-treatments, chemical management, storage guidelines, and edibility safety assessments for 10+ common vegetables and fruits.
        </p>

        {/* Category Tabs (All / Vegetables / Fruits) */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-emerald-900/40">
          {CROP_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedCrop("All");
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-950/40"
                  : "bg-[#0d130e] text-slate-400 hover:text-white border border-emerald-900/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Crop Selector Chips */}
      <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Select Crop to Inspect:
          </label>
          <div className="flex flex-wrap gap-2">
            {POPULAR_CROPS.filter(
              (c) =>
                selectedCategory === "All Crops" ||
                c.name === "All" ||
                c.type === selectedCategory
            ).map((crop) => (
              <button
                key={crop.name}
                onClick={() => {
                  setSelectedCrop(crop.name);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCrop === crop.name
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/40"
                    : "bg-[#0d130e] hover:bg-[#1a261d] text-slate-300 border border-emerald-900/40"
                }`}
              >
                {crop.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Advanced Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-emerald-900/30">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="encyclopedia-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by disease, pathogen, symptoms (e.g. Scab, Late Blight, Cavity Spot)..."
              className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedFamily}
              onChange={(e) => setSelectedFamily(e.target.value as any)}
              className="bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {FAMILIES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <select
              value={selectedPathogen}
              onChange={(e) => setSelectedPathogen(e.target.value)}
              className="bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All Pathogens</option>
              <option value="Fungal">Fungal Diseases</option>
              <option value="Bacterial">Bacterial Infections</option>
              <option value="Physiological/Abiotic">Physiological / Deficiencies</option>
              <option value="Insect/Pest">Pest Infestations</option>
            </select>
          </div>
        </div>
      </div>

      {/* Disease Cards List */}
      <div className="space-y-4">
        {filteredDiseases.length === 0 ? (
          <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 mx-auto flex items-center justify-center text-emerald-400">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-white font-semibold">No disease matches found</p>
            <p className="text-xs text-slate-400">
              Try adjusting your search terms, crop filters, or family selections.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCrop("All");
                setSelectedCategory("All Crops");
                setSelectedFamily("All Families");
                setSelectedPathogen("All");
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredDiseases.map((disease) => {
            const isExpanded = expandedId === disease.id;
            return (
              <div
                key={disease.id}
                id={`disease-card-${disease.id}`}
                className="bg-[#141d16] border border-emerald-900/30 hover:border-emerald-700/50 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                {/* Card Header (Clickable Accordion) */}
                <div
                  onClick={() => toggleExpand(disease.id)}
                  className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base sm:text-lg font-bold text-white">
                        {disease.name}
                      </span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${getPathogenBadgeColor(disease.category)}`}>
                        {disease.category}
                      </span>
                      <span className="text-xs text-slate-400 bg-[#0d130e] px-2.5 py-0.5 rounded-md border border-emerald-900/30">
                        Host: <strong className="text-emerald-300">{disease.vegetableType}</strong>
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 italic">
                      Pathogen / Cause: <strong className="text-slate-200">{disease.scientificAgent}</strong>
                    </p>
                    <p className="text-xs text-slate-300">
                      <strong className="text-amber-400 font-semibold">Key Identifier:</strong> {disease.keyVisualSign}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAskAgronomistAboutDisease(disease.name);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-700/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                      title="Ask Dr. Flora AI about this disease"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Ask Dr. Flora AI</span>
                    </button>

                    <div className="w-8 h-8 rounded-xl bg-[#0d130e] border border-emerald-900/40 flex items-center justify-center text-slate-300">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Full Disease Profile Details */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 border-t border-emerald-900/40 bg-[#0d130e]/80 space-y-5 text-xs sm:text-sm">
                    {/* Symptoms & Conditions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Typical Symptoms */}
                      <div className="bg-[#141d16] border border-emerald-900/30 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-2 text-rose-400 font-bold">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Typical Symptoms &amp; Disease Manifestations</span>
                        </div>
                        <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                          {disease.typicalSymptoms.map((symptom, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Favorable Conditions / Triggers */}
                      <div className="bg-[#141d16] border border-emerald-900/30 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-2 text-amber-400 font-bold">
                          <Warehouse className="w-4 h-4" />
                          <span>Favorable Conditions &amp; Triggers</span>
                        </div>
                        <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                          {disease.favorableConditions.map((cond, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {cond}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Cures & Treatment Plan */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Organic Cures */}
                      <div className="bg-[#141d16] border border-emerald-900/30 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold">
                          <Leaf className="w-4 h-4" />
                          <span>Organic &amp; Biological Remedies</span>
                        </div>
                        <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                          {disease.organicCure.map((cure, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {cure}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Chemical Treatments */}
                      <div className="bg-[#141d16] border border-emerald-900/30 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-2 text-blue-400 font-bold">
                          <FlaskConical className="w-4 h-4" />
                          <span>Chemical &amp; Agricultural Treatments</span>
                        </div>
                        <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                          {disease.chemicalCure.map((chem, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {chem}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Prevention & Storage Management */}
                    <div className="bg-[#141d16] border border-emerald-900/30 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-teal-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Prevention &amp; Post-Harvest Preservation Guidelines</span>
                      </div>
                      <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                        {disease.prevention.map((prev, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {prev}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Edibility & Culinary Safety Notice */}
                    <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-4 space-y-1.5">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                        <ShieldAlert className="w-4 h-4" />
                        <span>Edibility &amp; Culinary Safety Assessment</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {disease.edibilityRisk}
                      </p>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-emerald-900/30">
                      <span className="text-xs text-slate-400">
                        Botanical Family: <strong className="text-slate-300">{disease.family}</strong>
                      </span>

                      <div className="flex items-center gap-2">
                        {onSelectCropForScanning && (
                          <button
                            onClick={() => onSelectCropForScanning(disease.vegetableType.split(",")[0].trim())}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            Scan {disease.vegetableType.split(",")[0].trim()} Now
                          </button>
                        )}
                        <button
                          onClick={() => onAskAgronomistAboutDisease(disease.name)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#141d16] hover:bg-[#1a261d] text-emerald-300 border border-emerald-700/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                        >
                          <Bot className="w-3.5 h-3.5" />
                          Ask AI Plant Doctor
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
