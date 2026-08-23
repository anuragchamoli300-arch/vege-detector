import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Layers,
  Leaf,
  FlaskConical,
  Warehouse,
  ShieldAlert,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Bot,
} from "lucide-react";
import { ENCYCLOPEDIA_DISEASES } from "../data/vegetableEncyclopedia";
import { EncyclopediaDisease, VegetableFamily } from "../types";

interface EncyclopediaViewProps {
  onAskAgronomistAboutDisease: (diseaseName: string) => void;
}

const FAMILIES: ("All" | VegetableFamily)[] = [
  "All",
  "Allium (Onion, Garlic, Leek)",
  "Solanaceae (Tomato, Potato, Pepper)",
  "Brassica (Cabbage, Broccoli)",
];

export const EncyclopediaView: React.FC<EncyclopediaViewProps> = ({
  onAskAgronomistAboutDisease,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFamily, setSelectedFamily] = useState<"All" | VegetableFamily>("All");
  const [expandedId, setExpandedId] = useState<string | null>(ENCYCLOPEDIA_DISEASES[0].id);

  const filteredDiseases = ENCYCLOPEDIA_DISEASES.filter((item) => {
    const matchesFamily = selectedFamily === "All" || item.family === selectedFamily;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.scientificAgent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vegetableType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keyVisualSign.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFamily && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Banner */}
      <div className="bg-[#151D16] border border-white/10 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] uppercase font-bold tracking-[0.2em] bg-green-500/10 text-green-400 border border-green-500/30">
            <BookOpen className="w-3 h-3" /> Botanical Pathology Index
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-400">Peer-Reviewed Taxonomy</span>
        </div>
        <h1 className="text-lg sm:text-xl font-bold tracking-[0.1em] uppercase text-white mt-2">
          Vegetable Pathology, Rot &amp; Spoilage Classification Guide
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Diagnostic visual indicators, causative biological agents, post-harvest storage decay controls, and verified bio vs. chemical treatment regimens for Allium crops, solanaceae, and brassicas.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#151D16] border border-white/10 p-4 sm:p-5 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="encyclopedia-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search pathology (e.g. Black Mold, Purple Blotch, Soft Rot, Scab)..."
              className="w-full bg-[#0F1410] border border-white/10 pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-green-500 transition-colors placeholder:text-slate-600 font-mono"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {FAMILIES.map((fam) => (
              <button
                key={fam}
                onClick={() => setSelectedFamily(fam)}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold transition-colors border ${
                  selectedFamily === fam
                    ? "bg-green-500 text-black border-green-500 font-bold"
                    : "bg-[#0F1410] hover:bg-white/5 text-slate-400 border-white/10"
                }`}
              >
                {fam === "All" ? "All Families" : fam.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Disease Cards List */}
      <div className="space-y-3">
        {filteredDiseases.map((disease) => {
          const isExpanded = expandedId === disease.id;
          return (
            <div
              key={disease.id}
              className="bg-[#121813] border border-white/10 overflow-hidden transition-colors"
            >
              {/* Card Header (Clickable Accordion) */}
              <div
                onClick={() => toggleExpand(disease.id)}
                className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                      {disease.name}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/30">
                      {disease.category}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wide">
                      Crops: <strong className="text-slate-300">{disease.vegetableType}</strong>
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 italic">
                    Agent: {disease.scientificAgent}
                  </p>
                  <p className="text-xs text-slate-300">
                    <strong className="text-yellow-400 uppercase text-[10px]">Key Visual Marker:</strong> {disease.keyVisualSign}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAskAgronomistAboutDisease(disease.name);
                    }}
                    className="px-2.5 py-1.5 border border-green-500/50 bg-green-500/10 hover:bg-green-500 hover:text-black text-green-300 text-[10px] uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors"
                    title="Consult Dr. Flora AI regarding this disease"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ask Dr. Flora</span>
                  </button>

                  <div className="w-7 h-7 border border-white/10 bg-white/5 flex items-center justify-center text-slate-300">
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Diagnostic Detail */}
              {isExpanded && (
                <div className="p-5 border-t border-white/10 bg-[#0F1410] space-y-4 text-xs">
                  {/* Symptoms & Conditions Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-[#151D16] border border-white/10 p-4 space-y-2">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> Diagnostic Clinical Signs
                      </div>
                      <ul className="space-y-1.5 text-slate-300 list-disc pl-4 text-xs">
                        {disease.typicalSymptoms.map((sym, i) => (
                          <li key={i}>{sym}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#151D16] border border-white/10 p-4 space-y-2">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 flex items-center gap-1.5">
                        <Warehouse className="w-3.5 h-3.5" /> Storage &amp; Climatic Triggers
                      </div>
                      <ul className="space-y-1.5 text-slate-300 list-disc pl-4 text-xs">
                        {disease.favorableConditions.map((cond, i) => (
                          <li key={i}>{cond}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Treatments Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Organic */}
                    <div className="bg-[#151D16] border border-white/10 p-4 space-y-2">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-400 flex items-center gap-1.5">
                        <Leaf className="w-3.5 h-3.5" /> Organic &amp; Bio-Control Protocols
                      </div>
                      <ul className="space-y-1.5 text-slate-300 list-disc pl-4 text-xs">
                        {disease.organicCure.map((org, i) => (
                          <li key={i}>{org}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Chemical */}
                    <div className="bg-[#151D16] border border-white/10 p-4 space-y-2">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 flex items-center gap-1.5">
                        <FlaskConical className="w-3.5 h-3.5" /> Agricultural Fungicides
                      </div>
                      <ul className="space-y-1.5 text-slate-300 list-disc pl-4 text-xs">
                        {disease.chemicalCure.map((chem, i) => (
                          <li key={i}>{chem}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Long-term prevention & Edibility */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-[#151D16] border border-white/10 p-4 space-y-2">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                        Field Prevention &amp; Curing Management
                      </div>
                      <ul className="space-y-1.5 text-slate-300 list-disc pl-4 text-xs">
                        {disease.prevention.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#151D16] border border-white/10 p-4 space-y-2">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400 flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5" /> Culinary Safety &amp; Ingestion Risk
                      </div>
                      <p className="text-slate-300 leading-relaxed text-xs">{disease.edibilityRisk}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
