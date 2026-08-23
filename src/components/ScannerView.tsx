import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Camera,
  Upload,
  Sparkles,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Layers,
  HelpCircle,
  Zap,
  Info,
  SwitchCamera,
  Image as ImageIcon,
  Check,
  Apple,
} from "lucide-react";
import { SAMPLE_VEGETABLES } from "../data/sampleImages";
import { SamplePreset, DiagnosticResult } from "../types";

interface ScannerViewProps {
  onDiagnosisComplete: (result: DiagnosticResult, imageBase64: string, notes: string) => void;
}

const PRODUCE_OPTIONS = [
  "Onion (Allium cepa)",
  "Tomato (Solanum lycopersicum)",
  "Potato (Solanum tuberosum)",
  "Apple (Malus domestica)",
  "Banana (Musa acuminata)",
  "Orange / Citrus (Citrus sinensis)",
  "Strawberry (Fragaria × ananassa)",
  "Bell Pepper / Chilli (Capsicum annuum)",
  "Cabbage / Broccoli (Brassica oleracea)",
  "Carrot / Root (Daucus carota)",
  "Grapes / Berries (Vitis vinifera)",
  "Cucumber / Squash (Cucumis sativus)",
  "Garlic / Shallots (Allium sativum)",
  "Any / Auto-Detect Produce",
];

const STAGE_OPTIONS = [
  "Storage / Warehouse / Cold Store",
  "Field / Garden Standing Crop",
  "Kitchen / Domestic Storage",
  "Market / Retail Display",
  "Transit / Shipping Container",
];

export const ScannerView: React.FC<ScannerViewProps> = ({ onDiagnosisComplete }) => {
  // Input states
  const [selectedImage, setSelectedImage] = useState<string | null>(SAMPLE_VEGETABLES[0].imageData);
  const [mimeType, setMimeType] = useState<string>("image/svg+xml");
  const [produceHint, setProduceHint] = useState<string>("Onion (Allium cepa)");
  const [stage, setStage] = useState<string>("Storage / Warehouse / Cold Store");
  const [notes, setNotes] = useState<string>(SAMPLE_VEGETABLES[0].notes);
  const [sampleFilter, setSampleFilter] = useState<"All" | "Vegetables" | "Fruits">("All");

  // Camera state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraFacing, setCameraFacing] = useState<"user" | "environment">("environment");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Analysis / Loading state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Stop camera helper
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Start Camera
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        stopCamera();
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: cameraFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError(
        "Camera access failed. Please ensure camera permissions are granted in browser or upload an image file instead."
      );
      setIsCameraActive(false);
    }
  };

  // Flip Camera
  const toggleCameraFacing = async () => {
    const nextFacing = cameraFacing === "user" ? "environment" : "user";
    setCameraFacing(nextFacing);
    if (isCameraActive) {
      stopCamera();
      setTimeout(() => {
        startCamera();
      }, 200);
    }
  };

  // Snap Photo from Video Stream
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
    setSelectedImage(dataUrl);
    setMimeType("image/jpeg");
    stopCamera();
  };

  // File Upload Handler (Drag-and-Drop or Input)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
        setMimeType(file.type || "image/jpeg");
        setErrorMsg(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Drag and Drop Handler
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          setMimeType(file.type || "image/jpeg");
          setErrorMsg(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Select Sample Preset
  const handleSelectSample = (sample: SamplePreset) => {
    stopCamera();
    setSelectedImage(sample.imageData);
    setMimeType("image/svg+xml");
    setNotes(sample.notes);

    // Pick matching produce option
    const matched = PRODUCE_OPTIONS.find((v) =>
      v.toLowerCase().includes(sample.vegetable.toLowerCase())
    );
    if (matched) {
      setProduceHint(matched);
    }
  };

  // Trigger Gemini Diagnostic API
  const handleRunDiagnosis = async () => {
    if (!selectedImage) {
      setErrorMsg("Please select or capture a crop photo first.");
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);
    setAnalysisStep("Uploading specimen & parsing image features...");

    try {
      setTimeout(() => {
        setAnalysisStep("Identifying botanical structures & surface pathologies...");
      }, 700);

      setTimeout(() => {
        setAnalysisStep("Differential diagnostics & pathogen identification...");
      }, 1500);

      setTimeout(() => {
        setAnalysisStep("Formulating IPM remedies, storage guidance & culinary safety...");
      }, 2300);

      const response = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: mimeType,
          vegetableHint: produceHint,
          stage: stage,
          userNotes: notes,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${response.status}`);
      }

      const result: DiagnosticResult = await response.json();
      setIsAnalyzing(false);
      onDiagnosisComplete(result, selectedImage, notes);
    } catch (err: any) {
      console.error("Diagnosis error:", err);
      setIsAnalyzing(false);
      setErrorMsg(
        err.message || "Failed to complete crop diagnosis. Please check network connection and try again."
      );
    }
  };

  const filteredSamples = SAMPLE_VEGETABLES.filter((sample) => {
    const isFruit =
      sample.vegetable.toLowerCase().includes("apple") ||
      sample.vegetable.toLowerCase().includes("banana") ||
      sample.vegetable.toLowerCase().includes("orange") ||
      sample.vegetable.toLowerCase().includes("strawberry") ||
      sample.vegetable.toLowerCase().includes("grape");

    if (sampleFilter === "Fruits") return isFruit;
    if (sampleFilter === "Vegetables") return !isFruit;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> 10+ Vegetable &amp; Fruit AI Diagnostic Lab
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white mt-2">
          AI Vegetable &amp; Fruit Disease Scanner
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Scan onions, tomatoes, potatoes, apples, bananas, citrus, strawberries, bell peppers, carrots, cabbages, grapes, and more for rot, fungal blight, bacterial wilt, storage disorders, and culinary safety.
        </p>
      </div>

      {/* Main Scanner Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Viewport & Capture (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="bg-[#141d16] border border-emerald-900/40 rounded-2xl p-4 min-h-[380px] sm:min-h-[420px] flex flex-col items-center justify-center relative overflow-hidden group shadow-inner"
          >
            {/* Live Camera View */}
            {isCameraActive ? (
              <div className="w-full h-full flex flex-col items-center justify-center relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full max-h-[360px] object-contain rounded-xl bg-black"
                />
                <div className="absolute bottom-4 flex items-center gap-3">
                  <button
                    id="btn-capture-photo"
                    onClick={capturePhoto}
                    className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all active:scale-95"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture Photo</span>
                  </button>
                  <button
                    onClick={toggleCameraFacing}
                    className="p-2.5 rounded-full bg-[#0d130e]/80 hover:bg-[#0d130e] text-white border border-emerald-900/50 backdrop-blur transition-all"
                    title="Switch Camera"
                  >
                    <SwitchCamera className="w-4 h-4" />
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-4 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-slate-300 text-xs font-semibold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : selectedImage ? (
              /* Selected / Captured Image Preview */
              <div className="w-full h-full flex flex-col items-center justify-center relative">
                <div className="max-h-[340px] sm:max-h-[380px] w-full flex items-center justify-center overflow-hidden rounded-xl bg-[#0d130e] p-2">
                  <img
                    src={selectedImage}
                    alt="Specimen preview"
                    className="max-h-[330px] w-auto object-contain rounded-lg shadow-md"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Overlaid quick actions */}
                <div className="absolute bottom-4 flex items-center gap-2">
                  <button
                    id="btn-retake-photo"
                    onClick={startCamera}
                    className="px-3 py-1.5 rounded-lg bg-[#141d16]/90 hover:bg-[#1a261d] text-slate-200 border border-emerald-900/40 text-xs font-medium flex items-center gap-1.5 backdrop-blur transition-all shadow"
                  >
                    <Camera className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Retake</span>
                  </button>
                  <label
                    htmlFor="file-upload-overlay"
                    className="px-3 py-1.5 rounded-lg bg-[#141d16]/90 hover:bg-[#1a261d] text-slate-200 border border-emerald-900/40 text-xs font-medium flex items-center gap-1.5 backdrop-blur transition-all cursor-pointer shadow"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>Upload Image</span>
                    <input
                      id="file-upload-overlay"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              /* Empty state / dropzone */
              <div className="text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-center mx-auto text-emerald-400 shadow-inner">
                  <Camera className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Upload or Take a Photo</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Drag &amp; drop any fruit or vegetable image, take a camera snap, or choose a preset specimen below.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    id="btn-start-camera"
                    onClick={startCamera}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow-md shadow-emerald-950/40 transition-all"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Open Camera</span>
                  </button>
                  <label
                    htmlFor="file-upload-empty"
                    className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-medium text-xs flex items-center gap-2 border border-stone-700 cursor-pointer transition-all"
                  >
                    <Upload className="w-4 h-4 text-amber-400" />
                    <span>Upload Image</span>
                    <input
                      id="file-upload-empty"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Camera Error Message */}
          {cameraError && (
            <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{cameraError}</span>
            </div>
          )}

          {/* Sample Preset Selector with 12 Produce Types */}
          <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" /> 12 Preset Crop Specimen Presets
              </span>

              {/* Sample Filter Tabs */}
              <div className="flex items-center gap-1">
                {(["All", "Vegetables", "Fruits"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSampleFilter(tab)}
                    className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium transition-all ${
                      sampleFilter === tab
                        ? "bg-emerald-600 text-white font-semibold"
                        : "bg-[#0d130e] text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {filteredSamples.map((sample) => {
                const isSelected = selectedImage === sample.imageData;
                return (
                  <button
                    key={sample.id}
                    id={`btn-sample-${sample.id}`}
                    onClick={() => handleSelectSample(sample)}
                    className={`p-2 rounded-xl border text-left transition-all relative flex flex-col ${
                      isSelected
                        ? "bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50"
                        : "bg-[#0d130e] hover:bg-[#1a261d] border-emerald-950 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#0d130e] mb-1.5 border border-emerald-900/30">
                      <img
                        src={sample.imageData}
                        alt={sample.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-xs font-semibold truncate block text-slate-200">
                      {sample.vegetable}
                    </span>
                    <span className="text-[10px] text-slate-400 line-clamp-1">
                      {sample.conditionName}
                    </span>
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-[10px]">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Scan Parameters & Trigger (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-5 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Diagnosis Specimen Parameters
            </h2>

            {/* Produce Type Selector */}
            <div>
              <label htmlFor="select-produce-type" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Vegetable or Fruit Crop
              </label>
              <select
                id="select-produce-type"
                value={produceHint}
                onChange={(e) => setProduceHint(e.target.value)}
                className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {PRODUCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0d130e] text-slate-200">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Growth / Storage Stage */}
            <div>
              <label htmlFor="select-stage" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Environment / Specimen Origin
              </label>
              <select
                id="select-stage"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {STAGE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0d130e] text-slate-200">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Observation Notes */}
            <div>
              <label htmlFor="input-notes" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Observed Symptoms &amp; Storage Conditions (Optional)
              </label>
              <textarea
                id="input-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Soft rotting neck, powdery black spores, storage room humidity at 80%..."
                className="w-full bg-[#0d130e] border border-emerald-900/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
              />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit / Run Scan Button */}
            <button
              id="btn-run-diagnosis"
              disabled={isAnalyzing || !selectedImage}
              onClick={handleRunDiagnosis}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all active:scale-[0.99]"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Specimen with Gemini...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Diagnose Crop Health &amp; Rot</span>
                </>
              )}
            </button>

            {/* Progress Step Indicator during Scan */}
            {isAnalyzing && (
              <div className="p-3.5 bg-[#0d130e] border border-emerald-900/50 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Deep Botanical Scan
                  </span>
                  <span className="text-slate-400 text-[11px]">Gemini 3.7 Flash</span>
                </div>
                <p className="text-xs text-slate-300">{analysisStep}</p>
                <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            )}

            {/* Confidence & Diagnostic Guarantee info */}
            <div className="pt-2 border-t border-emerald-900/30 flex items-center gap-2 text-slate-400 text-[11px]">
              <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                Evaluates 10+ crops against 40+ fungal, bacterial, physiological &amp; post-harvest diseases.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
