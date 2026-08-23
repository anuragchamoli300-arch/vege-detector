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
} from "lucide-react";
import { SAMPLE_VEGETABLES } from "../data/sampleImages";
import { SamplePreset, DiagnosticResult } from "../types";

interface ScannerViewProps {
  onDiagnosisComplete: (result: DiagnosticResult, imageBase64: string, notes: string) => void;
}

const VEGETABLE_OPTIONS = [
  "Onion (Allium cepa)",
  "Garlic (Allium sativum)",
  "Tomato (Solanum lycopersicum)",
  "Potato (Solanum tuberosum)",
  "Cabbage / Cauliflower / Broccoli",
  "Bell Pepper / Chilli",
  "Cucumber / Zucchini",
  "Carrot / Radish",
  "Any / Auto-Detect Vegetable",
];

const STAGE_OPTIONS = [
  "Storage / Warehouse / Pantry",
  "Kitchen / Cooking Prep",
  "Field / Garden Standing Crop",
  "Market / Retail Display",
];

export const ScannerView: React.FC<ScannerViewProps> = ({ onDiagnosisComplete }) => {
  // Input states
  const [selectedImage, setSelectedImage] = useState<string | null>(SAMPLE_VEGETABLES[0].imageData);
  const [mimeType, setMimeType] = useState<string>("image/svg+xml");
  const [vegetableHint, setVegetableHint] = useState<string>("Onion (Allium cepa)");
  const [stage, setStage] = useState<string>("Storage / Warehouse / Pantry");
  const [notes, setNotes] = useState<string>(SAMPLE_VEGETABLES[0].notes);

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
      console.error("Camera access failed:", err);
      setCameraError(
        "Could not access camera. Please check camera permissions or upload an image directly."
      );
      setIsCameraActive(false);
    }
  };

  // Toggle Camera Facing
  const toggleCameraFacing = () => {
    const nextFacing = cameraFacing === "environment" ? "user" : "environment";
    setCameraFacing(nextFacing);
    if (isCameraActive) {
      setTimeout(() => {
        startCamera();
      }, 100);
    }
  };

  // Capture snapshot from camera
  const captureSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      setSelectedImage(dataUrl);
      setMimeType("image/jpeg");
      stopCamera();
    }
  };

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type || "image/jpeg";
    setMimeType(fileType);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
        stopCamera();
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Drag and Drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setMimeType(file.type || "image/jpeg");
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          stopCamera();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Load a preset sample
  const handleSelectSample = (sample: SamplePreset) => {
    setSelectedImage(sample.imageData);
    setMimeType("image/svg+xml");
    setVegetableHint(
      sample.vegetable === "Onion"
        ? "Onion (Allium cepa)"
        : sample.vegetable === "Tomato"
        ? "Tomato (Solanum lycopersicum)"
        : sample.vegetable === "Potato"
        ? "Potato (Solanum tuberosum)"
        : "Any / Auto-Detect Vegetable"
    );
    setNotes(sample.notes);
    stopCamera();
  };

  // Run AI Diagnostic Scan
  const handleRunScan = async () => {
    if (!selectedImage) {
      setErrorMsg("Please select, capture, or upload a vegetable photo to scan.");
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);

    // Progressive step indicator
    setAnalysisStep("Extracting morphological features & scale surface texture...");
    const timer1 = setTimeout(() => {
      setAnalysisStep("Screening for fungal spores, bacterial rot & tissue softening...");
    }, 1200);
    const timer2 = setTimeout(() => {
      setAnalysisStep("Synthesizing clinical diagnosis, edibility rating & treatment protocol...");
    }, 2400);

    try {
      const response = await fetch("/api/diagnose-vegetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType,
          vegetableHint,
          stage,
          notes,
        }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to diagnose vegetable.");
      }

      onDiagnosisComplete(data.diagnosis, selectedImage, notes);
    } catch (err: any) {
      console.error("Scan error:", err);
      setErrorMsg(
        err.message || "Diagnostic service is currently unavailable. Please verify connection."
      );
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep("");
    }
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Intro banner */}
      <div className="bg-[#151D16] border border-white/10 p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] uppercase font-bold tracking-[0.2em] bg-green-500/10 text-green-400 border border-green-500/30">
                <Sparkles className="w-3 h-3" /> Sensor Feed Active
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400">Ref: OC-9422 // Multi-Spectrum</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-[0.1em] uppercase text-white mt-2">
              Onion &amp; Vegetable Pathology Diagnostic Scanner
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Optical morphology analysis for Allium crops, solanaceae, and field harvest. Detects fungal rot, bacterial lesions, storage soft-neck desiccation, and verifies edibility rating.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="scanner-action-preset-onion"
              onClick={() => handleSelectSample(SAMPLE_VEGETABLES[0])}
              className="px-3 py-2 border border-yellow-400/40 bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-300 text-[10px] uppercase tracking-[0.15em] font-semibold transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-3 h-3" /> Preset: Onion Mold
            </button>
            <button
              id="scanner-action-preset-healthy"
              onClick={() => handleSelectSample(SAMPLE_VEGETABLES[2])}
              className="px-3 py-2 border border-green-500/40 bg-green-500/10 hover:bg-green-500/20 text-green-300 text-[10px] uppercase tracking-[0.15em] font-semibold transition-colors flex items-center gap-1.5"
            >
              <Check className="w-3 h-3" /> Preset: Healthy Grade-A
            </button>
          </div>
        </div>
      </div>

      {/* Main Scanner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image / Camera Stage (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="relative bg-[#0F1410] border border-white/10 aspect-[4/3] flex items-center justify-center overflow-hidden geometric-grid group select-none"
          >
            {/* Geometric Corner Brackets */}
            <div className="absolute inset-4 sm:inset-6 border border-white/10 pointer-events-none z-10">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-400" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-400" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-400" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-400" />
            </div>

            {/* Live Camera View */}
            {isCameraActive ? (
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />

                {/* Reticle / Framing Target */}
                <div className="absolute inset-10 border border-dashed border-green-400/50 pointer-events-none flex flex-col justify-between p-3 z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] tracking-[0.2em] uppercase font-bold bg-[#0F1410]/90 text-green-400 px-2 py-0.5 border border-green-500/40">
                      TARGET ALIGNED
                    </span>
                    <span className="text-[9px] tracking-[0.2em] uppercase font-bold bg-[#0F1410]/90 text-yellow-400 px-2 py-0.5 border border-yellow-500/40">
                      CALIBRATING OPTIC
                    </span>
                  </div>
                  <div className="text-center text-[10px] tracking-wider uppercase text-green-300 bg-[#0F1410]/90 px-3 py-1 border border-white/10 self-center">
                    Align vegetable specimen within optical crosshair
                  </div>
                </div>

                {/* Camera Controls */}
                <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-3 z-20">
                  <button
                    id="btn-toggle-camera-facing"
                    type="button"
                    onClick={toggleCameraFacing}
                    className="p-2.5 bg-[#151D16] hover:bg-[#1f2b20] text-slate-200 border border-white/20 transition-colors"
                    title="Switch Camera"
                  >
                    <SwitchCamera className="w-4 h-4" />
                  </button>

                  <button
                    id="btn-capture-snapshot"
                    type="button"
                    onClick={captureSnapshot}
                    className="px-5 py-2.5 bg-green-500 hover:bg-green-400 text-black font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-2 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture Target</span>
                  </button>

                  <button
                    id="btn-cancel-camera"
                    type="button"
                    onClick={stopCamera}
                    className="px-3 py-2.5 bg-[#151D16] hover:bg-white/10 text-slate-300 border border-white/20 text-xs uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : selectedImage ? (
              /* Selected Image Preview */
              <div className="relative w-full h-full bg-[#0F1410] flex items-center justify-center p-4">
                <img
                  src={selectedImage}
                  alt="Vegetable specimen to scan"
                  className="max-h-full max-w-full object-contain"
                />

                {/* Geometric Scanning Metadata Stamp */}
                <div className="absolute bottom-3 left-4 text-[9px] uppercase tracking-widest text-slate-400 z-20 bg-[#0F1410]/90 px-2 py-1 border border-white/10">
                  FOV: 65.4° // RES: 4K OPTIC // SENSOR: LOCKED
                </div>

                {/* Geometric Scanning Animation Overlay during AI Processing */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-[#0F1410]/80 backdrop-blur-[2px] flex flex-col items-center justify-center z-30">
                    <div className="w-full absolute top-0 left-0 h-0.5 bg-green-400 shadow-[0_0_15px_#22c55e] animate-pulse" />
                    <div className="p-6 bg-[#151D16] border border-green-500/40 text-center max-w-xs mx-4">
                      <div className="w-10 h-10 border border-green-500/50 flex items-center justify-center mx-auto mb-3 text-green-400 animate-spin">
                        <RefreshCw className="w-5 h-5" />
                      </div>
                      <div className="text-xs uppercase tracking-[0.2em] font-bold text-white">Diagnostic Analysis</div>
                      <div className="text-[10px] text-green-400 mt-2 tracking-wider uppercase">{analysisStep}</div>
                    </div>
                  </div>
                )}

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 bg-[#151D16]/90 border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-green-400 flex items-center gap-1.5 z-20">
                  <div className="w-1.5 h-1.5 bg-green-400 animate-pulse" />
                  <span>Specimen Loaded</span>
                </div>

                {/* Change photo actions on hover */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
                  <button
                    id="btn-switch-to-camera"
                    onClick={startCamera}
                    className="px-3 py-1.5 bg-[#151D16] hover:bg-[#1f2b20] text-slate-200 border border-white/20 text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5 text-green-400" />
                    <span>Retake</span>
                  </button>
                  <label
                    htmlFor="file-upload-overlay"
                    className="px-3 py-1.5 bg-[#151D16] hover:bg-[#1f2b20] text-slate-200 border border-white/20 text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Upload</span>
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
                <div className="text-xs text-green-400 opacity-60 tracking-[0.3em] uppercase">
                  Awaiting Target Alignment
                </div>
                <div className="w-32 h-32 border border-white/10 bg-white/5 flex items-center justify-center mx-auto">
                  <svg className="w-16 h-16 opacity-20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5">
                    <path d="M12 2v20M2 12h20" />
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                </div>
                <div className="flex justify-center gap-2">
                  <div className="w-1 h-1 bg-green-400" />
                  <div className="w-1 h-1 bg-green-400" />
                  <div className="w-8 h-1 bg-green-400" />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    id="btn-start-camera"
                    onClick={startCamera}
                    className="px-4 py-2 bg-green-500 hover:bg-green-400 text-black font-bold text-xs uppercase tracking-[0.15em] flex items-center gap-2 transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Active Camera</span>
                  </button>
                  <label
                    htmlFor="file-upload-empty"
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-medium text-xs uppercase tracking-[0.15em] flex items-center gap-2 border border-white/10 cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
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
            <div className="p-3 bg-red-950/40 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{cameraError}</span>
            </div>
          )}

          {/* Sample Preset Selector */}
          <div className="bg-[#121813] border border-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-green-400" /> Specimen Presets Reference
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400">Instant Load</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {SAMPLE_VEGETABLES.map((sample) => {
                const isSelected = selectedImage === sample.imageData;
                return (
                  <button
                    key={sample.id}
                    id={`btn-sample-${sample.id}`}
                    onClick={() => handleSelectSample(sample)}
                    className={`p-2 border text-left transition-colors relative flex flex-col ${
                      isSelected
                        ? "bg-green-500/10 border-green-500 text-green-300"
                        : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="w-full aspect-square bg-[#0F1410] mb-1.5 border border-white/10 overflow-hidden">
                      <img
                        src={sample.imageData}
                        alt={sample.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider truncate block text-white">
                      {sample.vegetable}
                    </span>
                    <span className="text-[9px] text-slate-400 line-clamp-1">
                      {sample.conditionName}
                    </span>
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-green-500 text-black flex items-center justify-center font-bold text-[8px]">
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
          <div className="bg-[#121813] border border-white/10 p-5 sm:p-6 space-y-4">
            <div className="text-[10px] tracking-[0.2em] uppercase opacity-60 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-green-400" />
              <span>Target Parameters</span>
            </div>

            {/* Vegetable Type Selector */}
            <div>
              <label htmlFor="select-vegetable-type" className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
                Crop Species Classification
              </label>
              <select
                id="select-vegetable-type"
                value={vegetableHint}
                onChange={(e) => setVegetableHint(e.target.value)}
                className="w-full bg-[#0F1410] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-green-500 transition-colors"
              >
                {VEGETABLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0F1410] text-slate-200">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Stage / Context Selector */}
            <div>
              <label htmlFor="select-stage-context" className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
                Storage &amp; Environmental Phase
              </label>
              <select
                id="select-stage-context"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full bg-[#0F1410] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-green-500 transition-colors"
              >
                {STAGE_OPTIONS.map((st) => (
                  <option key={st} value={st} className="bg-[#0F1410] text-slate-200">
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* User Observations / Field Notes */}
            <div>
              <label htmlFor="input-field-notes" className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
                Field Observation Telemetry (Optional)
              </label>
              <textarea
                id="input-field-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="E.g. Onion neck softening, dark powdery spores under outer tunics, stored at 75% RH..."
                className="w-full bg-[#0F1410] border border-white/10 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-green-500 transition-colors placeholder:text-slate-600 resize-none font-mono"
              />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-red-950/50 border border-red-800 text-xs text-red-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold uppercase tracking-wider text-[10px]">Diagnostic Failure</p>
                  <p className="text-red-300/90 text-xs">{errorMsg}</p>
                </div>
              </div>
            )}

            {/* Scan Action Buttons - Geometric Balance Style */}
            <div className="space-y-3 pt-2">
              <button
                id="btn-execute-diagnosis-scan"
                type="button"
                disabled={isAnalyzing || !selectedImage}
                onClick={handleRunScan}
                className={`w-full py-4 border text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transition-colors ${
                  isAnalyzing || !selectedImage
                    ? "border-white/10 bg-white/5 text-white/40 cursor-not-allowed"
                    : "border-green-500 text-green-400 hover:bg-green-500 hover:text-black"
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Spectrum...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Initiate Scan</span>
                  </>
                )}
              </button>

              <div className="text-[9px] uppercase tracking-widest text-slate-400 text-center opacity-60">
                Optical Model: Botanical Pathology ML v4.1
              </div>
            </div>
          </div>

          {/* Quick Diagnostics Tip Card */}
          <div className="bg-[#151D16] border border-white/10 p-4 space-y-2 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-300 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-yellow-400" />
              <span>Inspection Guidelines</span>
            </div>
            <ul className="text-[11px] text-slate-400 space-y-1.5 pl-4 list-disc">
              <li>Onions: inspect both dried outer tunics and the neck closure plate.</li>
              <li>Internal decay: cross-sectioning allows diagnostic view of fleshy scale rings.</li>
              <li>Avoid high-glare lighting directly over lesion surface.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
