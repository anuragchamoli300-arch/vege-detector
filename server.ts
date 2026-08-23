import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. API calls will fail until configured in Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON payload limit for base64 image data
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Vegetable problem diagnosis endpoint
  app.post("/api/diagnose-vegetable", async (req, res) => {
    try {
      const { imageBase64, mimeType = "image/jpeg", vegetableHint = "Auto-detect", notes = "", stage = "Storage / Kitchen / Field" } = req.body;

      if (!imageBase64) {
        return res.status(400).json({ error: "No image provided for diagnosis." });
      }

      // Clean base64 string if data URL prefix is included
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

      const ai = getAiClient();

      const promptText = `
You are a world-class plant pathologist, vegetable agronomist, and post-harvest food safety specialist.
Analyze this vegetable photograph meticulously. The user provided:
- Vegetable hint / known type: ${vegetableHint}
- Growth or storage stage: ${stage}
- User observations / notes: ${notes || "None provided"}

Carefully inspect the image for:
1. Exact vegetable species & variety (e.g. Red Onion, Yellow Onion, White Onion, Garlic, Shallot, Tomato, Potato, Bell Pepper, Cabbage, Cauliflower, Carrot, Cucumber, Brinjal/Eggplant, etc.).
2. Botanical part captured (e.g. Bulb & Outer Dry Tunics, Cut Cross-Section, Basal Plate / Roots, Neck / Crown, Leaves / Foliage, Stem, Fruit flesh).
3. Primary problem, disease, physiological disorder, pest damage, decay, or mechanical damage (e.g. Onion Black Mold [Aspergillus niger], Purple Blotch [Alternaria porri], Onion Neck Rot [Botrytis aclada], Onion Smut, Bacterial Soft Rot [Pectobacterium], Downy Mildew, Fusarium Basal Rot, Thrips Damage, Sprouting / Dormancy Break, Translucent Scale / Sunscald, Storage Scald, Late Blight, Early Blight, Potato Scab, Hollow Heart, Cabbage Black Rot, or Healthy state).
4. Overall health assessment and severity level.
5. Edibility & culinary safety: Can humans safely eat this? (E.g. safe if outer layers peeled, unsafe due to mycotoxins/systemic rot, or completely healthy).
6. Concrete immediate steps, organic/biological treatments, chemical fungicides/pesticides if applicable for farmers/gardeners, proper storage & humidity management, and preventive cultivation measures.
7. Differential diagnoses (other conditions it might resemble and why).

Return an accurate, highly structured JSON diagnosis matching the requested schema.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: {
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType: mimeType,
              },
            },
            {
              text: promptText,
            },
          ],
        },
        config: {
          systemInstruction: "You are an expert AI agricultural diagnostician and plant doctor specializing in vegetable pathology, crop disorders, post-harvest rot, storage diseases (especially Allium crops like onions and garlic, solanaceous vegetables, brassicas, and tubers), and food safety guidance. Provide rigorous, scientifically grounded yet actionable advice.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              vegetableName: {
                type: Type.STRING,
                description: "Identified vegetable name and variety (e.g., Red Onion bulb, Yellow Onion, Beefsteak Tomato, Russet Potato)",
              },
              scientificName: {
                type: Type.STRING,
                description: "Botanical binomial name if applicable (e.g., Allium cepa, Solanum lycopersicum)",
              },
              plantPart: {
                type: Type.STRING,
                description: "Part of the vegetable shown (e.g., Outer Bulb Tunics, Basal Plate, Cut Cross-Section, Foliage, Root)",
              },
              healthStatus: {
                type: Type.STRING,
                description: "Overall health status: HEALTHY, MILD_ISSUE, MODERATE_DISEASE, SEVERE_DAMAGE, or SPOILED_UNFIT",
              },
              primaryIssue: {
                type: Type.STRING,
                description: "Main problem or disease identified (e.g., Black Mold (Aspergillus niger), Purple Blotch, Bacterial Soft Rot, Healthy Sample)",
              },
              pathogenType: {
                type: Type.STRING,
                description: "Classification: Fungal, Bacterial, Viral, Insect/Pest, Physiological/Abiotic, Storage Disorder, or None/Healthy",
              },
              confidenceScore: {
                type: Type.INTEGER,
                description: "Diagnostic confidence score between 1 and 100",
              },
              severityLevel: {
                type: Type.STRING,
                description: "Severity: Healthy, Low, Medium, High, or Critical",
              },
              summary: {
                type: Type.STRING,
                description: "A clear 2-3 sentence overview of the diagnosis and what is happening to the vegetable.",
              },
              identifiedSymptoms: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of specific visual cues observed in the scan (e.g., black sooty powdery spores between outer scales, water-soaked soft neck, sunken concentric rings)",
              },
              probableCauses: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Underlying causes (e.g. high ambient storage humidity above 75%, improper field curing, rain before harvest, fungal spore airborne transmission)",
              },
              edibilitySafety: {
                type: Type.OBJECT,
                properties: {
                  isSafeToEat: {
                    type: Type.BOOLEAN,
                    description: "Whether any portion of this vegetable is safe for human consumption",
                  },
                  rating: {
                    type: Type.STRING,
                    description: "Safety status: 'Safe & Fresh', 'Edible with Trim (Peel affected outer layer)', 'Caution - Cook thoroughly', or 'Do Not Consume / Discard'",
                  },
                  guidance: {
                    type: Type.STRING,
                    description: "Detailed culinary safety advice, mycotoxin cautions, and food prep instructions.",
                  },
                },
                required: ["isSafeToEat", "rating", "guidance"],
              },
              actionPlan: {
                type: Type.OBJECT,
                properties: {
                  immediateAction: {
                    type: Type.STRING,
                    description: "Single most critical step to take right now (e.g. isolate from other onions immediately to prevent secondary infection).",
                  },
                  organicRemedies: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Natural, bio-control, neem, trichoderma, copper or organic management practices.",
                  },
                  chemicalTreatments: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Approved agricultural fungicides, bactericides, or insect treatments if appropriate for crop cultivation.",
                  },
                  storageAndPreservation: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Optimal storage temperature, relative humidity, air circulation, curing instructions, and separation tips.",
                  },
                  preventiveMeasures: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Long term agricultural/gardening preventive measures (crop rotation, certified clean seeds, drip irrigation, proper curing).",
                  },
                },
                required: [
                  "immediateAction",
                  "organicRemedies",
                  "chemicalTreatments",
                  "storageAndPreservation",
                  "preventiveMeasures",
                ],
              },
              differentialDiagnoses: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    condition: { type: Type.STRING },
                    likelihood: { type: Type.STRING },
                    distinction: { type: Type.STRING },
                  },
                  required: ["condition", "likelihood", "distinction"],
                },
                description: "2-3 alternative conditions this could be confused with and how to tell them apart.",
              },
              marketImpact: {
                type: Type.STRING,
                description: "Impact on commercial marketability, shelf-life estimate, and storage longevity.",
              },
            },
            required: [
              "vegetableName",
              "scientificName",
              "plantPart",
              "healthStatus",
              "primaryIssue",
              "pathogenType",
              "confidenceScore",
              "severityLevel",
              "summary",
              "identifiedSymptoms",
              "probableCauses",
              "edibilitySafety",
              "actionPlan",
              "differentialDiagnoses",
              "marketImpact",
            ],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No diagnostic response received from AI model.");
      }

      const diagnosisData = JSON.parse(responseText.trim());
      res.json({ success: true, diagnosis: diagnosisData });
    } catch (err: any) {
      console.error("Diagnosis error:", err);
      res.status(500).json({
        error: err.message || "Failed to analyze vegetable image.",
      });
    }
  });

  // Agronomist AI follow-up chat advisor endpoint
  app.post("/api/chat-advisor", async (req, res) => {
    try {
      const { messages, diagnosisContext } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      const ai = getAiClient();

      const systemPrompt = `You are "Dr. Flora", an expert Vegetable Agronomist, Plant Pathologist, and Crop Health Consultant.
You assist farmers, home gardeners, students, and consumers in diagnosing vegetable health issues, managing storage problems (especially with onions, garlic, potatoes, tomatoes, and other produce), safe chemical/organic interventions, and post-harvest storage management.

${diagnosisContext ? `Current Vegetable Under Discussion:\n${JSON.stringify(diagnosisContext, null, 2)}` : "No specific scan is loaded yet."}

Guidelines:
- Give concise, highly practical, scientifically accurate recommendations.
- Always clarify organic alternatives vs commercial agricultural options.
- Provide clear guidance on whether affected vegetables can be safely consumed or need to be discarded.
- Format responses with clean markdown (bullet points, bold key terms) for effortless reading.`;

      // Convert conversation messages
      const contents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents,
        config: {
          systemInstruction: systemPrompt,
        },
      });

      res.json({
        success: true,
        reply: response.text || "I was unable to formulate a response. Please try again.",
      });
    } catch (err: any) {
      console.error("Chat advisor error:", err);
      res.status(500).json({
        error: err.message || "Failed to communicate with agronomist advisor.",
      });
    }
  });

  // --- Admin & Security Management Endpoints ---
  // In-memory server user database (synced with client admin vault)
  let serverAdminKey = "cropadmin2026";
  const serverUsers: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    passwordDisplay: string;
    status: string;
    scansCount: number;
    createdAt: string;
    lastLogin: string;
    deviceType?: string;
  }> = [
    {
      id: "ADM-00101",
      name: "System Administrator",
      email: "admin@cropvision.local",
      role: "Administrator",
      passwordDisplay: "cropadmin2026",
      status: "Active",
      scansCount: 42,
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      lastLogin: new Date().toISOString(),
      deviceType: "Admin Workstation",
    },
    {
      id: "USR-00204",
      name: "Sarah Green",
      email: "sarah.green@garden.local",
      role: "Home Gardener",
      passwordDisplay: "greenSprout#88",
      status: "Active",
      scansCount: 14,
      createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
      lastLogin: new Date(Date.now() - 3600000 * 5).toISOString(),
      deviceType: "Mobile iOS / Safari",
    },
  ];

  const serverAuditLogs: Array<{
    id: string;
    timestamp: string;
    event: string;
    details: string;
    userEmail: string;
    ipOrDevice: string;
  }> = [
    {
      id: "LOG-1001",
      timestamp: new Date().toISOString(),
      event: "ADMIN_INITIALIZED",
      details: "Admin security gateway initialized and ready",
      userEmail: "admin@cropvision.local",
      ipOrDevice: "127.0.0.1",
    },
  ];

  // Auth: Record User Registration / Login
  app.post("/api/auth/save-user", (req, res) => {
    try {
      const { user, password } = req.body;
      if (!user || !user.email) {
        return res.status(400).json({ error: "User profile required" });
      }

      const existingIndex = serverUsers.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase());
      const now = new Date().toISOString();

      if (existingIndex >= 0) {
        serverUsers[existingIndex].lastLogin = now;
        if (password) serverUsers[existingIndex].passwordDisplay = password;
        if (user.role) serverUsers[existingIndex].role = user.role;
        if (user.name) serverUsers[existingIndex].name = user.name;
        serverAuditLogs.unshift({
          id: `LOG-${Date.now().toString().slice(-4)}`,
          timestamp: now,
          event: "USER_LOGIN",
          details: `User ${user.name} authenticated into system`,
          userEmail: user.email,
          ipOrDevice: req.ip || "Client Browser",
        });
      } else {
        const newUser = {
          id: `USR-${Math.floor(10000 + Math.random() * 90000)}`,
          name: user.name || "Crop Grower",
          email: user.email,
          role: user.role || "Home Gardener",
          passwordDisplay: password || "Secure_Passcode",
          status: "Active",
          scansCount: 0,
          createdAt: now,
          lastLogin: now,
          deviceType: "Web App Client",
        };
        serverUsers.unshift(newUser);
        serverAuditLogs.unshift({
          id: `LOG-${Date.now().toString().slice(-4)}`,
          timestamp: now,
          event: "USER_SIGNUP",
          details: `New account registered [ID: ${newUser.id}] Role: ${newUser.role}`,
          userEmail: user.email,
          ipOrDevice: req.ip || "Client Browser",
        });
      }

      res.json({ success: true, message: "User securely synchronized in admin vault" });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Admin: Get all registered user credentials and logs (Protected by admin passkey)
  app.get("/api/admin/data", (req, res) => {
    const key = req.headers["x-admin-key"] as string;
    if (!key || key !== serverAdminKey) {
      return res.status(403).json({ error: "Unauthorized: Invalid Admin Master Key" });
    }
    res.json({
      success: true,
      users: serverUsers,
      logs: serverAuditLogs,
    });
  });

  // Admin: Update user status or reset password
  app.post("/api/admin/update-user", (req, res) => {
    const key = req.headers["x-admin-key"] as string;
    if (!key || key !== serverAdminKey) {
      return res.status(403).json({ error: "Unauthorized: Invalid Admin Master Key" });
    }
    const { userId, status, role, newPassword } = req.body;
    const user = serverUsers.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (status) user.status = status;
    if (role) user.role = role;
    if (newPassword) user.passwordDisplay = newPassword;

    serverAuditLogs.unshift({
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      event: "STATUS_CHANGED",
      details: `Admin modified user ${user.name} (${user.id})`,
      userEmail: user.email,
      ipOrDevice: "Admin Console",
    });

    res.json({ success: true, user });
  });

  // Admin: Update master passcode
  app.post("/api/admin/set-key", (req, res) => {
    const key = req.headers["x-admin-key"] as string;
    const { newKey } = req.body;
    if (!key || key !== serverAdminKey) {
      return res.status(403).json({ error: "Unauthorized: Invalid Admin Master Key" });
    }
    if (newKey && newKey.length >= 6) {
      serverAdminKey = newKey;
      return res.json({ success: true, message: "Admin master key updated successfully" });
    }
    res.status(400).json({ error: "New key must be at least 6 characters" });
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Vegetable Problem Scanner server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal server start error:", err);
});
