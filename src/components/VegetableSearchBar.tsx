import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Camera,
  X,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Leaf,
  Check,
  Zap,
} from "lucide-react";
import { soundEngine } from "../utils/audioEffects";

export interface VegetableItem {
  id: string;
  name: string;
  botanicalName: string;
  emoji: string;
  family: string;
  commonIssues: string[];
  color: string;
  scannerOption: string;
}

export const POPULAR_VEGETABLES: VegetableItem[] = [
  {
    id: "onion",
    name: "Onion",
    botanicalName: "Allium cepa",
    emoji: "🧅",
    family: "Allium",
    commonIssues: ["Black Mold (Aspergillus)", "Neck Rot (Botrytis)", "Purple Blotch", "Bacterial Soft Rot", "Sprouting"],
    color: "from-amber-600/30 to-purple-600/30 border-amber-500/30 text-amber-300",
    scannerOption: "Onion (Allium cepa)",
  },
  {
    id: "tomato",
    name: "Tomato",
    botanicalName: "Solanum lycopersicum",
    emoji: "🍅",
    family: "Solanaceae",
    commonIssues: ["Early Blight", "Late Blight", "Blossom End Rot", "Bacterial Canker", "Anthracnose Fruit Rot"],
    color: "from-rose-600/30 to-red-600/30 border-rose-500/30 text-rose-300",
    scannerOption: "Tomato (Solanum lycopersicum)",
  },
  {
    id: "potato",
    name: "Potato",
    botanicalName: "Solanum tuberosum",
    emoji: "🥔",
    family: "Solanaceae",
    commonIssues: ["Common Scab", "Late Blight Tuber Rot", "Dry Rot (Fusarium)", "Black Scurf", "Greening / Solanine"],
    color: "from-amber-700/30 to-yellow-600/30 border-amber-600/30 text-amber-200",
    scannerOption: "Potato (Solanum tuberosum)",
  },
  {
    id: "garlic",
    name: "Garlic",
    botanicalName: "Allium sativum",
    emoji: "🧄",
    family: "Allium",
    commonIssues: ["White Rot (Stromatinia)", "Penicillium Blue Mold", "Basal Rot (Fusarium)", "Bulb Nematode"],
    color: "from-slate-500/30 to-emerald-600/30 border-slate-400/30 text-slate-200",
    scannerOption: "Garlic / Shallots (Allium sativum)",
  },
  {
    id: "bell-pepper",
    name: "Bell Pepper / Chilli",
    botanicalName: "Capsicum annuum",
    emoji: "🫑",
    family: "Solanaceae",
    commonIssues: ["Anthracnose", "Bacterial Spot", "Phytophthora Blight", "Sunscald", "Tobacco Mosaic Virus"],
    color: "from-emerald-600/30 to-green-600/30 border-emerald-500/30 text-emerald-300",
    scannerOption: "Bell Pepper / Chilli (Capsicum annuum)",
  },
  {
    id: "cabbage",
    name: "Cabbage / Broccoli / Cauliflower",
    botanicalName: "Brassica oleracea",
    emoji: "🥬",
    family: "Brassica",
    commonIssues: ["Black Rot (Xanthomonas)", "Clubroot", "Downy Mildew", "Bacterial Soft Rot", "Alternaria Leaf Spot"],
    color: "from-emerald-700/30 to-teal-600/30 border-emerald-600/30 text-emerald-200",
    scannerOption: "Cabbage / Broccoli / Cauliflower (Brassica oleracea)",
  },
  {
    id: "carrot",
    name: "Carrot / Radish / Beetroot",
    botanicalName: "Daucus carota",
    emoji: "🥕",
    family: "Root & Tuber",
    commonIssues: ["Cavity Spot", "Black Rot (Alternaria radicina)", "Sclerotinia White Mold", "Root Knot Nematode"],
    color: "from-orange-600/30 to-amber-600/30 border-orange-500/30 text-orange-300",
    scannerOption: "Carrot / Radish (Daucus carota)",
  },
  {
    id: "cucumber",
    name: "Cucumber / Zucchini / Squash",
    botanicalName: "Cucumis sativus",
    emoji: "🥒",
    family: "Cucurbit",
    commonIssues: ["Powdery Mildew", "Downy Mildew", "Anthracnose", "Bacterial Wilt", "Gummy Stem Blight"],
    color: "from-green-600/30 to-emerald-600/30 border-green-500/30 text-green-300",
    scannerOption: "Cucumber / Zucchini / Squash (Cucumis sativus)",
  },
  {
    id: "eggplant",
    name: "Eggplant / Brinjal",
    botanicalName: "Solanum melongena",
    emoji: "🍆",
    family: "Solanaceae",
    commonIssues: ["Phomopsis Blight", "Verticillium Wilt", "Fruit Rot", "Cercospora Leaf Spot"],
    color: "from-purple-700/30 to-indigo-700/30 border-purple-500/30 text-purple-300",
    scannerOption: "Eggplant / Brinjal (Solanum melongena)",
  },
  {
    id: "spinach",
    name: "Spinach / Leafy Greens",
    botanicalName: "Spinacia oleracea",
    emoji: "🍃",
    family: "Leafy Greens",
    commonIssues: ["Downy Mildew (Blue Mold)", "Cladosporium Leaf Spot", "Fusarium Wilt", "Damping-off"],
    color: "from-teal-600/30 to-emerald-700/30 border-teal-500/30 text-teal-300",
    scannerOption: "Spinach / Leafy Greens (Spinacia oleracea)",
  },
  {
    id: "okra",
    name: "Okra / Bhindi",
    botanicalName: "Abelmoschus esculentus",
    emoji: "🌱",
    family: "Malvaceae",
    commonIssues: ["Yellow Vein Mosaic Virus (YVMV)", "Enation Leaf Curl", "Powdery Mildew", "Fusarium Wilt"],
    color: "from-lime-600/30 to-emerald-600/30 border-lime-500/30 text-lime-300",
    scannerOption: "Okra / Bhindi (Abelmoschus esculentus)",
  },
  {
    id: "ginger",
    name: "Ginger",
    botanicalName: "Zingiber officinale",
    emoji: "🫚",
    family: "Zingiberaceae",
    commonIssues: ["Rhizome Soft Rot (Pythium)", "Bacterial Wilt (Ralstonia)", "Dry Rot (Fusarium)"],
    color: "from-amber-600/30 to-yellow-700/30 border-amber-500/30 text-amber-300",
    scannerOption: "Any / Auto-Detect Vegetable",
  },
  {
    id: "peas",
    name: "Green Peas / Beans",
    botanicalName: "Pisum sativum",
    emoji: "🫛",
    family: "Fabaceae",
    commonIssues: ["Powdery Mildew", "Ascochyta Blight", "Fusarium Root Rot", "Bacterial Blight"],
    color: "from-emerald-600/30 to-green-700/30 border-emerald-500/30 text-emerald-300",
    scannerOption: "Any / Auto-Detect Vegetable",
  },
  {
    id: "pumpkin",
    name: "Pumpkin / Winter Squash",
    botanicalName: "Cucurbita pepo",
    emoji: "🎃",
    family: "Cucurbit",
    commonIssues: ["Black Rot (Didymella)", "Phytophthora Fruit Rot", "Powdery Mildew", "Bacterial Spot"],
    color: "from-orange-600/30 to-amber-700/30 border-orange-500/30 text-orange-200",
    scannerOption: "Cucumber / Zucchini / Squash (Cucumis sativus)",
  },
  {
    id: "sweet-potato",
    name: "Sweet Potato",
    botanicalName: "Ipomoea batatas",
    emoji: "🍠",
    family: "Convolvulaceae",
    commonIssues: ["Black Rot (Ceratocystis)", "Scurf (Monilochaetes)", "Soft Rot (Rhizopus)", "Internal Cork"],
    color: "from-purple-600/30 to-pink-700/30 border-purple-500/30 text-purple-200",
    scannerOption: "Carrot / Radish (Daucus carota)",
  },
  {
    id: "mushroom",
    name: "Mushroom",
    botanicalName: "Agaricus bisporus",
    emoji: "🍄",
    family: "Fungi / Agaricaceae",
    commonIssues: ["Bacterial Blotch", "Green Mold (Trichoderma)", "Dry Bubble (Verticillium)", "Cobweb Mold"],
    color: "from-stone-600/30 to-amber-800/30 border-stone-500/30 text-stone-200",
    scannerOption: "Any / Auto-Detect Vegetable",
  },
];

interface VegetableSearchBarProps {
  onSelectVegetableForCamera: (vegetable: VegetableItem) => void;
  placeholder?: string;
  variant?: "header" | "standalone" | "compact";
  className?: string;
}

export const VegetableSearchBar: React.FC<VegetableSearchBarProps> = ({
  onSelectVegetableForCamera,
  placeholder = "Search vegetable (e.g. Onion, Tomato, Potato, Pepper) & open camera...",
  variant = "standalone",
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter vegetables based on query
  const filteredVegetables = query.trim() === ""
    ? POPULAR_VEGETABLES
    : POPULAR_VEGETABLES.filter((veg) => {
        const q = query.toLowerCase();
        return (
          veg.name.toLowerCase().includes(q) ||
          veg.botanicalName.toLowerCase().includes(q) ||
          veg.family.toLowerCase().includes(q) ||
          veg.commonIssues.some((issue) => issue.toLowerCase().includes(q))
        );
      });

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (veg: VegetableItem) => {
    soundEngine.playCameraShutter();
    setQuery("");
    setIsOpen(false);
    onSelectVegetableForCamera(veg);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        return;
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredVegetables.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredVegetables.length) % Math.max(1, filteredVegetables.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredVegetables[selectedIndex]) {
        handleSelect(filteredVegetables[selectedIndex]);
      } else if (query.trim()) {
        // Auto create or map fallback
        handleSelect({
          id: "custom",
          name: query.trim(),
          botanicalName: "Custom vegetable search",
          emoji: "🌱",
          family: "Vegetable",
          commonIssues: ["Rot / Blight", "Post-Harvest Storage Disorder"],
          color: "from-emerald-600/30 to-teal-600/30 border-emerald-500/30 text-emerald-300",
          scannerOption: "Any / Auto-Detect Vegetable",
        });
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Input Container */}
      <div
        className={`relative flex items-center transition-all ${
          isOpen
            ? "ring-2 ring-emerald-500/80 shadow-lg shadow-emerald-950/50"
            : "hover:border-emerald-700/60"
        } rounded-2xl bg-[#101712] border border-emerald-900/40`}
      >
        <div className="pl-3.5 pr-2 py-2 flex items-center justify-center text-emerald-400">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
        </div>

        <input
          ref={inputRef}
          type="text"
          id="input-vegetable-camera-search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent py-2.5 sm:py-3 pr-10 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
        />

        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="p-1 mr-2 text-slate-400 hover:text-white rounded-md transition-colors"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Quick Camera Action Badge inside Input */}
        <div className="pr-3 hidden sm:flex items-center gap-1.5 shrink-0 select-none">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-semibold text-emerald-300">
            <Camera className="w-3 h-3 text-emerald-400" />
            <span>Opens Camera</span>
          </span>
        </div>
      </div>

      {/* Dropdown Suggestions Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          id="dropdown-vegetable-camera-results"
          className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#121a14] border border-emerald-800/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 max-h-[380px] flex flex-col"
        >
          {/* Header Indicator */}
          <div className="px-4 py-2.5 bg-[#0e1610] border-b border-emerald-900/30 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-slate-300">Select Vegetable to Launch Live Camera</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 font-mono">
              {filteredVegetables.length} Available
            </span>
          </div>

          {/* List of Vegetables */}
          <div className="overflow-y-auto divide-y divide-emerald-950/40 p-1.5">
            {filteredVegetables.length > 0 ? (
              filteredVegetables.map((veg, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={veg.id}
                    id={`btn-select-veg-${veg.id}`}
                    onClick={() => handleSelect(veg)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-emerald-900/40 border border-emerald-600/40 shadow-sm"
                        : "hover:bg-emerald-950/30 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#17231a] border border-emerald-800/40 flex items-center justify-center text-xl shrink-0 shadow-inner">
                        {veg.emoji}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white truncate">
                            {veg.name}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800/40 font-mono shrink-0">
                            {veg.botanicalName}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5 flex items-center gap-1">
                          <span className="text-slate-500">Detects:</span>
                          <span>{veg.commonIssues.slice(0, 3).join(", ")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950/50 transition-all">
                        <Camera className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Open Camera</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-emerald-400/60" />
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-6 text-center space-y-3">
                <p className="text-sm text-slate-400">
                  No exact preset found for &quot;<span className="text-white font-semibold">{query}</span>&quot;
                </p>
                <button
                  onClick={() =>
                    handleSelect({
                      id: "custom",
                      name: query.trim(),
                      botanicalName: "Vegetable Specimen",
                      emoji: "🌱",
                      family: "Custom",
                      commonIssues: ["General Botanical Rot / Disorder"],
                      color: "from-emerald-600/30 to-teal-600/30 border-emerald-500/30 text-emerald-300",
                      scannerOption: "Any / Auto-Detect Vegetable",
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-2 shadow transition-all"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Open Camera to Scan &quot;{query}&quot;</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Popular Chips Bar */}
          <div className="px-3.5 py-2.5 bg-[#0e1610] border-t border-emerald-900/30 flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-[11px] text-slate-400 font-semibold shrink-0">Popular:</span>
            {POPULAR_VEGETABLES.slice(0, 6).map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="px-2.5 py-1 rounded-lg bg-[#141e16] hover:bg-emerald-900/40 text-slate-200 hover:text-white border border-emerald-900/30 text-[11px] flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
              >
                <span>{item.emoji}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
