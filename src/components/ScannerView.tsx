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
  Volume2,
  Globe,
  Code,
  Search,
} from "lucide-react";
import { SAMPLE_VEGETABLES } from "../data/sampleImages";
import { SamplePreset, DiagnosticResult } from "../types";
import { soundEngine } from "../utils/audioEffects";
import { VegetableApiModal } from "./VegetableApiModal";
import { VegetableSearchBar, VegetableItem } from "./VegetableSearchBar";

interface ScannerViewProps {
  onDiagnosisComplete: (result: DiagnosticResult, imageBase64: string, notes: string) => void;
  initialVegetable?: string;
  triggerCameraTimestamp?: number;
  onSelectVegetableForCamera?: (vegetable: VegetableItem) => void;
}

const PRODUCE_OPTIONS = [
  "Onion (Allium cepa)",
  "Tomato (Solanum lycopersicum)",
  "Potato (Solanum tuberosum)",
  "Bell Pepper / Chilli (Capsicum annuum)",
  "Cabbage / Broccoli / Cauliflower (Brassica oleracea)",
  "Carrot / Radish (Daucus carota)",
  "Cucumber / Zucchini / Squash (Cucumis sativus)",
  "Eggplant / Brinjal (Solanum melongena)",
  "Spinach / Leafy Greens (Spinacia oleracea)",
  "Okra / Bhindi (Abelmoschus esculentus)",
  "Garlic / Shallots (Allium sativum)",
  "Any / Auto-Detect Vegetable",
];

const STAGE_OPTIONS = [
  "Storage / Warehouse / Cold Store",
  "Field / Garden Standing Crop",
  "Kitchen / Domestic Storage",
  "Market / Retail Display",
  "Transit / Shipping Container",
];

export const ScannerView: React.FC<ScannerViewProps> = ({
  onDiagnosisComplete,
  initialVegetable,
  triggerCameraTimestamp,
  onSelectVegetableForCamera,
}) => {
  // Input states
  const [selectedImage, setSelectedImage] = useState<string | null>(SAMPLE_VEGETABLES[0]?.imageData || null);
  const [mimeType, setMimeType] = useState<string>("image/svg+xml");
  const [produceHint, setProduceHint] = useState<string>(initialVegetable || "Onion (Allium cepa)");
  const [stage, setStage] = useState<string>("Storage / Warehouse / Cold Store");
  const [notes, setNotes] = useState<string>(SAMPLE_VEGETABLES[0]?.notes || "");

  // Camera state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraFacing, setCameraFacing] = useState<"user" | "environment">("environment");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const cameraViewportRef = useRef<HTMLDivElement | null>(null);

  // Analysis / Loading state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isApiModalOpen, setIsApiModalOpen] = useState<boolean>(false);
  const [cameraActiveVegetableName, setCameraActiveVegetableName] = useState<string | null>(null);

  // Stop camera helper
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setCameraActiveVegetableName(null);
  }, []);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Handle external vegetable selection & auto-camera trigger
  useEffect(() => {
    if (initialVegetable) {
      const match = PRODUCE_OPTIONS.find(
        (p) => p.toLowerCase().includes(initialVegetable.toLowerCase()) || initialVegetable.toLowerCase().includes(p.toLowerCase())
      );
      setProduceHint(match || initialVegetable);
    }
  }, [initialVegetable]);

  useEffect(() => {
    if (triggerCameraTimestamp) {
      startCamera();
      if (initialVegetable) {
        setCameraActiveVegetableName(initialVegetable);
      }
      setTimeout(() => {
        cameraViewportRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [triggerCameraTimestamp]);

  // Handle local vegetable search selection
  const handleLocalVegetableSearchSelect = (veg: VegetableItem) => {
    const match = PRODUCE_OPTIONS.find(
      (p) => p.toLowerCase().includes(veg.name.toLowerCase()) || veg.name.toLowerCase().includes(p.toLowerCase())
    ) || veg.scannerOption;

    setProduceHint(match);
    setCameraActiveVegetableName(veg.name);
    startCamera();
    
    // Also propagate to parent if provided
    if (onSelectVegetableForCamera) {
      onSelectVegetableForCamera(veg);
    }

    setTimeout(() => {
      cameraViewportRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  // Bind active stream to video element whenever video element or camera state mounts
  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch((e) => console.warn("Video autoPlay caught:", e));
    }
  }, [isCameraActive]);

  // Start Camera - Requests browser permission on-demand
  const startCamera = async () => {
    setCameraError(null);
    if (typeof navigator === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError(
        "Direct camera access is not supported by your browser in this view. Please use 'Take Photo with Mobile Camera' or upload an image file."
      );
      return;
    }

    try {
      if (streamRef.current) {
        stopCamera();
      }

      let stream: MediaStream;
      try {
        // Attempt ideal resolution & requested facing mode
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: cameraFacing },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
      } catch (idealErr) {
        console.warn("Retrying camera with generic constraints:", idealErr);
        // Fallback to basic video constraint if device does not support ideal parameters
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      streamRef.current = stream;
      setIsCameraActive(true);

      // If video element is already available in DOM:
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch((e) => console.warn("Video play error:", e));
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setCameraError(
          "Camera access permission was denied or dismissed. Please click the camera/lock icon in your browser address bar to allow camera access, or use the Native Camera / Upload option."
        );
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setCameraError("No camera found on this device. Please upload an image or select a specimen preset.");
      } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
        setCameraError("Camera is already in use by another application or tab. Please close other camera apps and retry.");
      } else {
        setCameraError(
          `Camera could not be started (${err.message || "access error"}). Please grant browser permissions or use file upload.`
        );
      }
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

  // Visual Shutter Flash Effect & Audio
  const [isShutterFlashing, setIsShutterFlashing] = useState<boolean>(false);

  const triggerShutterFlashAndSound = () => {
    soundEngine.playCameraShutter();
    setIsShutterFlashing(true);
    setTimeout(() => {
      setIsShutterFlashing(false);
    }, 350);
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

    // Trigger instant optical audio shutter click & flash
    triggerShutterFlashAndSound();

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
        triggerShutterFlashAndSound();
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
          triggerShutterFlashAndSound();
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
    triggerShutterFlashAndSound();
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

    // Play high-tech scanner audio
    soundEngine.playScanLaser();
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
      // Play triumphant success chime
      soundEngine.playSuccessChime();
      onDiagnosisComplete(result, selectedImage, notes);
    } catch (err: any) {
      console.error("Diagnosis error:", err);
      setIsAnalyzing(false);
      setErrorMsg(
        err.message || "Failed to complete crop diagnosis. Please check network connection and try again."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar for Vegetable Name (Auto Opens Camera) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="input-vegetable-camera-search" className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
            <Search className="w-4 h-4 text-emerald-400" />
            <span>Search Vegetable to Open Camera &amp; Scan</span>
          </label>
          <span className="text-[11px] text-emerald-400/90 font-medium">
            Select any vegetable &bull; Camera auto-launches
          </span>
        </div>
        <VegetableSearchBar
          onSelectVegetableForCamera={handleLocalVegetableSearchSelect}
          placeholder="Type vegetable name (e.g. Onion, Tomato, Potato, Garlic, Pepper, Eggplant) to open camera..."
        />
      </div>

      {/* Header Banner */}
      <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" /> AI Vegetable Health &amp; Rot Diagnostic Lab
            </span>
          </div>
          {cameraActiveVegetableName && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-pulse">
              <Camera className="w-3.5 h-3.5" />
              <span>Camera active for {cameraActiveVegetableName}</span>
            </div>
          )}
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white mt-2">
          AI Vegetable Health &amp; Rot Scanner
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Scan onions, tomatoes, potatoes, bell peppers, carrots, cabbages, cucumbers, eggplants, spinach, okra, and more for rot, fungal blight, bacterial wilt, storage disorders, and culinary edibility.
        </p>
      </div>

      {/* Main Scanner Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Viewport & Capture (7 cols) */}
        <div className="lg:col-span-7 space-y-4" ref={cameraViewportRef}>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="bg-[#141d16] border border-emerald-900/40 rounded-2xl p-4 min-h-[380px] sm:min-h-[420px] flex flex-col items-center justify-center relative overflow-hidden group shadow-inner"
          >
            {/* Shutter Flash Animation Overlay */}
            {isShutterFlashing && (
              <div className="absolute inset-0 z-30 pointer-events-none animate-shutter-flash rounded-2xl" />
            )}

            {/* Laser Scanning Animation Overlay during Analysis */}
            {isAnalyzing && (
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10b981] animate-laser-sweep" />
                <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
                {/* Holographic corner reticles */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-emerald-400" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-400" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-400" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-emerald-400" />
                {/* Centered scanning crosshair */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="w-32 h-32 rounded-full border border-dashed border-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
              </div>
            )}

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
                <div className="absolute bottom-4 flex flex-wrap items-center justify-center gap-2 px-2">
                  <button
                    id="btn-retake-photo"
                    onClick={startCamera}
                    className="px-3 py-1.5 rounded-lg bg-[#141d16]/90 hover:bg-[#1a261d] text-slate-200 border border-emerald-900/40 text-xs font-medium flex items-center gap-1.5 backdrop-blur transition-all shadow"
                    title="Open camera to take a new live photo"
                  >
                    <Camera className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Scan Live</span>
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
                  <button
                    id="btn-inspect-crop-api"
                    onClick={() => setIsApiModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 backdrop-blur transition-all shadow-md shadow-emerald-950/40"
                    title="View Search & Agricultural Extension Intelligence"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search</span>
                  </button>
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
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow-md shadow-emerald-950/40 transition-all active:scale-95"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Open Live Camera</span>
                  </button>

                  <label
                    htmlFor="native-camera-capture"
                    className="px-3.5 py-2 rounded-xl bg-[#1a261d] hover:bg-[#233327] text-emerald-300 font-medium text-xs flex items-center gap-2 border border-emerald-800/50 cursor-pointer transition-all shadow-sm"
                    title="Take photo using your device's camera app"
                  >
                    <Camera className="w-4 h-4 text-emerald-400" />
                    <span>Device Camera Snap</span>
                    <input
                      id="native-camera-capture"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

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

          {/* Sample Preset Selector with Vegetable Types */}
          <div className="bg-[#141d16] border border-emerald-900/30 rounded-2xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" /> Preset Vegetable Specimen Presets
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {SAMPLE_VEGETABLES.map((sample) => {
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

            {/* Search & Google Extension Intelligence Quick Action Button */}
            <button
              id="btn-open-veg-api-data"
              onClick={() => setIsApiModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0d130e] hover:bg-[#162219] text-emerald-300 border border-emerald-900/40 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Search</span>
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

      {/* Vegetable API & Google Data Explorer Modal */}
      <VegetableApiModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        vegetableName={produceHint}
        imagePreview={selectedImage || undefined}
      />
    </div>
  );
};

