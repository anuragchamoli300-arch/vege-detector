import React, { useState, useEffect } from "react";
import {
  Code,
  Globe,
  Copy,
  Check,
  X,
  Play,
  Terminal,
  ExternalLink,
  Sparkles,
  Search,
  BookOpen,
  Loader2,
  FileCode,
  Layers,
  ArrowRight,
  ShieldCheck,
  Image as ImageIcon,
} from "lucide-react";
import { GoogleResearchResult, DiagnosticResult } from "../types";
import { soundEngine } from "../utils/audioEffects";
import { SAMPLE_PRESETS } from "../data/sampleImages";

interface VegetableApiModalProps {
  isOpen: boolean;
  onClose: () => void;
  vegetableName?: string;
  conditionName?: string;
  imagePreview?: string;
  activeDiagnosis?: DiagnosticResult | null;
}

const SUPPORTED_CROPS = [
  { slug: "onion", name: "Onion & Garlic", family: "Allium" },
  { slug: "tomato", name: "Tomato", family: "Solanaceae" },
  { slug: "potato", name: "Potato", family: "Solanaceae" },
  { slug: "pepper", name: "Bell Pepper / Chili", family: "Solanaceae" },
  { slug: "cabbage", name: "Cabbage & Broccoli", family: "Brassicaceae" },
  { slug: "carrot", name: "Carrot & Radish", family: "Apiaceae" },
  { slug: "cucumber", name: "Cucumber & Zucchini", family: "Cucurbitaceae" },
  { slug: "eggplant", name: "Eggplant / Brinjal", family: "Solanaceae" },
  { slug: "spinach", name: "Spinach & Leafy Greens", family: "Amaranthaceae" },
  { slug: "okra", name: "Okra / Bhindi", family: "Malvaceae" },
  { slug: "garlic", name: "Garlic & Shallots", family: "Allium" },
];

export const VegetableApiModal: React.FC<VegetableApiModalProps> = ({
  isOpen,
  onClose,
  vegetableName = "Onion",
  conditionName = "Black Mold",
  imagePreview,
  activeDiagnosis,
}) => {
  // Derive initial crop slug
  const initialSlug =
    SUPPORTED_CROPS.find((c) =>
      c.name.toLowerCase().includes(vegetableName.toLowerCase().split(" ")[0]) ||
      vegetableName.toLowerCase().includes(c.slug)
    )?.slug || "onion";

  const [selectedSlug, setSelectedSlug] = useState<string>(initialSlug);
  const [activeTab, setActiveTab] = useState<"google-data" | "api-endpoints" | "code-samples" | "live-test">("google-data");
  const [codeLanguage, setCodeLanguage] = useState<"curl" | "python" | "javascript">("curl");
  const [copiedCode, setCopiedCode] = useState(false);

  // Search input state
  const [customSearchQuery, setCustomSearchQuery] = useState("");

  // Google Research State
  const [isResearching, setIsResearching] = useState(false);
  const [googleData, setGoogleData] = useState<GoogleResearchResult | null>(null);
  const [researchError, setResearchError] = useState<string | null>(null);

  // Live API test state
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      // Set slug based on current prop
      const match = SUPPORTED_CROPS.find((c) =>
        c.name.toLowerCase().includes(vegetableName.toLowerCase().split(" ")[0]) ||
        vegetableName.toLowerCase().includes(c.slug)
      )?.slug || "onion";
      setSelectedSlug(match);
      
      // Auto-trigger Google Research if not fetched yet
      if (!googleData || googleData.vegetable !== vegetableName) {
        fetchGoogleResearch(vegetableName, conditionName);
      }
    }
  }, [isOpen, vegetableName, conditionName]);

  const fetchGoogleResearch = async (veg: string, cond: string) => {
    try {
      setIsResearching(true);
      setResearchError(null);

      const res = await fetch("/api/google-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vegetable: veg,
          condition: cond,
        }),
      });

      if (!res.ok) throw new Error("Failed to retrieve Google Research data.");
      const data = await res.json();
      setGoogleData(data);
    } catch (err: any) {
      console.error("Error fetching Google data:", err);
      setResearchError(err.message || "Failed to load Google search research data.");
    } finally {
      setIsResearching(false);
    }
  };

  const runLiveApiTest = async () => {
    try {
      setIsTestingApi(true);
      soundEngine.playScanLaser();

      // Find matching preset image or use valid preview
      const matchingPreset = SAMPLE_PRESETS.find((p) =>
        p.vegetable.toLowerCase().includes(selectedSlug) ||
        selectedSlug.includes(p.vegetable.toLowerCase())
      ) || SAMPLE_PRESETS[0];

      const sampleBase64 = imagePreview || matchingPreset.imageData;
      
      const res = await fetch(`/api/vegetables/${selectedSlug}/diagnose`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: sampleBase64,
          mimeType: sampleBase64.startsWith("data:image/svg") ? "image/svg+xml" : "image/jpeg",
          notes: `Live API request from CropVision test console for ${selectedSlug}`,
          stage: "Storage / Post-Harvest",
        }),
      });

      const json = await res.json();
      setApiResponse(json);
      soundEngine.playSuccessChime();
    } catch (err: any) {
      setApiResponse({ error: err.message || "API request failed" });
    } finally {
      setIsTestingApi(false);
    }
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    soundEngine.playSaveSnap();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!isOpen) return null;

  const currentCrop = SUPPORTED_CROPS.find((c) => c.slug === selectedSlug) || SUPPORTED_CROPS[0];
  const baseUrl = window.location.origin;

  // Code snippets for selected crop
  const curlCode = `curl -X POST "${baseUrl}/api/vegetables/${selectedSlug}/diagnose" \\
  -H "Content-Type: application/json" \\
  -d '{
    "imageBase64": "<BASE64_IMAGE_DATA>",
    "mimeType": "image/jpeg",
    "stage": "Storage / Kitchen / Field",
    "notes": "Specimen photographed with high-resolution lens"
  }'`;

  const pythonCode = `import requests
import base64

# 1. Load your vegetable photo
with open("specimen.jpg", "rb") as img_file:
    base64_str = base64.b64encode(img_file.read()).decode("utf-8")

# 2. Call the CropVision Vegetable API
url = "${baseUrl}/api/vegetables/${selectedSlug}/diagnose"
payload = {
    "imageBase64": base64_str,
    "mimeType": "image/jpeg",
    "stage": "Storage / Kitchen",
    "notes": "Targeted scan for ${currentCrop.name}"
}

response = requests.post(url, json=payload)
data = response.json()

# 3. Print diagnosis & action plan
print("Vegetable:", data["diagnosis"]["vegetableName"])
print("Detected Issue:", data["diagnosis"]["primaryIssue"])
print("Health Status:", data["diagnosis"]["healthStatus"])
print("Confidence:", data["diagnosis"]["confidenceScore"], "%")
print("Edible?", data["diagnosis"]["edibilitySafety"]["isSafeToEat"])
print("Immediate Action:", data["diagnosis"]["actionPlan"]["immediateAction"])`;

  const jsCode = `// Call CropVision API for ${currentCrop.name}
async function diagnoseVegetable(base64Image) {
  const response = await fetch("${baseUrl}/api/vegetables/${selectedSlug}/diagnose", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageBase64: base64Image,
      mimeType: "image/jpeg",
      stage: "Storage / Kitchen",
      notes: "Diagnosing ${currentCrop.name} specimen"
    })
  });

  const data = await response.json();
  console.log("Diagnostic Result:", data);
  return data;
}`;

  return (
    <div
      id="modal-search-api"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#141d16] border border-emerald-900/40 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-emerald-900/30 bg-[#162219]">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    Search &amp; Crop Intelligence Engine
                  </h2>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Grounded
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Search agricultural extension publications, real-time Google research &amp; vegetable REST endpoints
                </p>
              </div>
            </div>

            <button
              id="btn-close-api-modal"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#0d130e] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search Input Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 pb-2">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search vegetable or disease (e.g. Onion Black Mold, Tomato Blight, Potato Scab)..."
                value={customSearchQuery}
                onChange={(e) => setCustomSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && customSearchQuery.trim()) {
                    fetchGoogleResearch(currentCrop.name, customSearchQuery.trim());
                  }
                }}
                className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>
            <button
              id="btn-search-grounded"
              onClick={() => {
                if (customSearchQuery.trim()) {
                  fetchGoogleResearch(currentCrop.name, customSearchQuery.trim());
                } else {
                  fetchGoogleResearch(currentCrop.name, conditionName);
                }
              }}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 active:scale-95"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search Google</span>
            </button>
          </div>

          {/* Crop Selector Bar */}
          <div className="flex items-center gap-2 pt-2 border-t border-emerald-900/20 overflow-x-auto">
            <span className="text-[11px] font-semibold text-slate-400 shrink-0">Selected Crop API:</span>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {SUPPORTED_CROPS.map((crop) => (
                <button
                  key={crop.slug}
                  onClick={() => {
                    setSelectedSlug(crop.slug);
                    fetchGoogleResearch(crop.name, conditionName);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    selectedSlug === crop.slug
                      ? "bg-emerald-500 text-stone-950 font-bold shadow"
                      : "bg-[#0d130e] text-slate-400 hover:text-slate-200 border border-emerald-900/30"
                  }`}
                >
                  {crop.name}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-emerald-900/20">
            <button
              id="tab-google-data"
              onClick={() => setActiveTab("google-data")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "google-data"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/40"
                  : "bg-[#0d130e] text-slate-400 hover:text-slate-200"
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Research &amp; Extension Data</span>
            </button>

            <button
              id="tab-api-endpoints"
              onClick={() => setActiveTab("api-endpoints")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "api-endpoints"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/40"
                  : "bg-[#0d130e] text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>REST Endpoints</span>
            </button>

            <button
              id="tab-code-samples"
              onClick={() => setActiveTab("code-samples")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "code-samples"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/40"
                  : "bg-[#0d130e] text-slate-400 hover:text-slate-200"
              }`}
            >
              <Code className="w-3.5 h-3.5 text-emerald-400" />
              <span>Code Snippets</span>
            </button>

            <button
              id="tab-live-test"
              onClick={() => setActiveTab("live-test")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "live-test"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/40"
                  : "bg-[#0d130e] text-slate-400 hover:text-slate-200"
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Console Tester</span>
            </button>
          </div>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* TAB 1: GOOGLE DATA & RESEARCH */}
          {activeTab === "google-data" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#0d130e] border border-emerald-900/30 p-3.5 rounded-2xl">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Google Search Grounded Research for {currentCrop.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Live scientific extension publications, USDA/ICAR alerts, and certified fungicides for {conditionName}
                  </p>
                </div>

                <button
                  id="btn-refresh-google-data"
                  onClick={() => fetchGoogleResearch(currentCrop.name, conditionName)}
                  disabled={isResearching}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {isResearching ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Searching Google...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-3.5 h-3.5" />
                      <span>Refresh Research</span>
                    </>
                  )}
                </button>
              </div>

              {isResearching && (
                <div className="py-12 text-center space-y-3 bg-[#0d130e] border border-emerald-900/30 rounded-2xl p-6">
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                  <div className="text-sm font-semibold text-white">
                    Querying Google Search Grounding &amp; Agricultural Bulletins...
                  </div>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Retrieving real-time data for {currentCrop.name} ({conditionName}) from UC Davis, Cornell Extension, USDA, and ICAR.
                  </p>
                </div>
              )}

              {researchError && !isResearching && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-xs text-rose-300">
                  {researchError}
                </div>
              )}

              {googleData && !isResearching && (
                <div className="space-y-4">
                  {/* Citations & Authentic Sources from Google */}
                  {googleData.sources && googleData.sources.length > 0 && (
                    <div className="bg-[#0d130e] border border-emerald-900/30 rounded-2xl p-4 space-y-2.5">
                      <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Google Search Grounded Web Sources &amp; Extension Bulletins:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {googleData.sources.map((source, idx) => (
                          <a
                            key={idx}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-[#141d16] hover:bg-[#1a261d] border border-emerald-900/40 rounded-xl text-xs flex items-center justify-between gap-2 text-emerald-300 group transition-all"
                          >
                            <span className="truncate group-hover:text-emerald-200">
                              {source.title}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Research Synthesis Report */}
                  <div className="bg-[#0d130e] border border-emerald-900/30 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-emerald-900/30">
                      <span className="text-xs font-bold text-slate-200">
                        Pathology &amp; Management Bulletin
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Synced: {new Date(googleData.timestamp).toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="prose prose-invert prose-emerald text-xs leading-relaxed text-slate-300 max-w-none whitespace-pre-line">
                      {googleData.fullReport}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: REST ENDPOINTS */}
          {activeTab === "api-endpoints" && (
            <div className="space-y-3">
              <div className="text-xs text-slate-400">
                CropVision exposes dedicated REST endpoints for automated greenhouse cameras, field drones, and sorting systems.
              </div>

              {/* Endpoint 1 */}
              <div className="bg-[#0d130e] border border-emerald-900/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    POST
                  </span>
                  <code className="text-xs font-mono text-white">
                    /api/vegetables/{selectedSlug}/diagnose
                  </code>
                </div>
                <p className="text-xs text-slate-300">
                  Targeted plant pathology diagnosis tailored specifically for <strong>{currentCrop.name}</strong> ({currentCrop.family}). Accepts base64 encoded JPG/PNG/WEBP images.
                </p>
                <div className="text-[11px] text-slate-400 font-mono bg-[#141d16] p-2 rounded-xl border border-emerald-900/30">
                  Payload: &#123; imageBase64: string, mimeType?: string, stage?: string, notes?: string &#125;
                </div>
              </div>

              {/* Endpoint 2 */}
              <div className="bg-[#0d130e] border border-emerald-900/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    POST
                  </span>
                  <code className="text-xs font-mono text-white">
                    /api/vegetables/{selectedSlug}/google-research
                  </code>
                </div>
                <p className="text-xs text-slate-300">
                  Fetches real-time Google Search Grounded research data and university extension publications for {currentCrop.name}.
                </p>
              </div>

              {/* Endpoint 3 */}
              <div className="bg-[#0d130e] border border-emerald-900/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    GET
                  </span>
                  <code className="text-xs font-mono text-white">
                    /api/vegetables
                  </code>
                </div>
                <p className="text-xs text-slate-300">
                  Returns the complete catalog of all 12 supported produce species with their botanical families, common diseases, and curing rules.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CODE SAMPLES */}
          {activeTab === "code-samples" && (
            <div className="space-y-3">
              {/* Language Switcher */}
              <div className="flex items-center justify-between bg-[#0d130e] p-2 rounded-xl border border-emerald-900/30">
                <div className="flex gap-1">
                  <button
                    onClick={() => setCodeLanguage("curl")}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      codeLanguage === "curl"
                        ? "bg-emerald-500 text-stone-950 font-bold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    cURL (CLI)
                  </button>
                  <button
                    onClick={() => setCodeLanguage("python")}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      codeLanguage === "python"
                        ? "bg-emerald-500 text-stone-950 font-bold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Python
                  </button>
                  <button
                    onClick={() => setCodeLanguage("javascript")}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      codeLanguage === "javascript"
                        ? "bg-emerald-500 text-stone-950 font-bold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Node.js / JS
                  </button>
                </div>

                <button
                  id="btn-copy-code-snippet"
                  onClick={() => {
                    const code =
                      codeLanguage === "curl"
                        ? curlCode
                        : codeLanguage === "python"
                        ? pythonCode
                        : jsCode;
                    handleCopyCode(code);
                  }}
                  className="px-3 py-1 rounded-lg bg-[#141d16] hover:bg-[#1a261d] border border-emerald-900/40 text-xs font-medium text-emerald-300 flex items-center gap-1.5 transition-all"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Box */}
              <div className="bg-[#080d09] border border-emerald-900/40 rounded-2xl p-4 overflow-x-auto font-mono text-xs text-emerald-300">
                <pre>
                  {codeLanguage === "curl" && curlCode}
                  {codeLanguage === "python" && pythonCode}
                  {codeLanguage === "javascript" && jsCode}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: LIVE CONSOLE TESTER */}
          {activeTab === "live-test" && (
            <div className="space-y-4">
              <div className="bg-[#0d130e] border border-emerald-900/30 rounded-2xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      Live API Execution Console
                    </h3>
                    <p className="text-xs text-slate-400">
                      Send a real POST request to <code>/api/vegetables/{selectedSlug}/diagnose</code>
                    </p>
                  </div>

                  <button
                    id="btn-run-api-test"
                    onClick={runLiveApiTest}
                    disabled={isTestingApi}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-950/40 disabled:opacity-50 active:scale-95"
                  >
                    {isTestingApi ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-stone-950" />
                        <span>Test API Endpoint</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Response Viewer */}
                {apiResponse && (
                  <div className="space-y-2 pt-2 border-t border-emerald-900/30">
                    <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                      <span>Server Response Status: 200 OK</span>
                      <span className="text-[11px] text-emerald-400">JSON Payload</span>
                    </div>
                    <div className="bg-[#080d09] border border-emerald-900/40 rounded-xl p-3 max-h-64 overflow-y-auto font-mono text-xs text-emerald-400">
                      <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
