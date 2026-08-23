import { TrackedScan } from "../types";
import { SAMPLE_VEGETABLES } from "./sampleImages";

export const INITIAL_TRACKED_SCANS: TrackedScan[] = [
  {
    id: "scan-onion-lot-401",
    timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    imagePreview: SAMPLE_VEGETABLES[0].imageData,
    vegetableName: "Yellow Onion (Allium cepa)",
    primaryIssue: "Black Mold (Aspergillus niger)",
    healthStatus: "SEVERE_DAMAGE",
    severityLevel: "High",
    trackingState: "Treating",
    batchOrLocation: "Storage Shed Bin #3B (North Wing)",
    userNotes: "Culled 15% affected outer tunics. Activated forced dry ventilation and lowered relative humidity to 65%.",
    diagnosis: {
      vegetableName: "Yellow Onion bulb",
      scientificName: "Allium cepa",
      plantPart: "Outer Bulb Tunics & Neck",
      healthStatus: "SEVERE_DAMAGE",
      primaryIssue: "Black Mold (Aspergillus niger)",
      pathogenType: "Fungal",
      confidenceScore: 96,
      severityLevel: "High",
      summary: "Severe black mold fungal sporulation observed under dry outer papery scales with soft neck scaling.",
      identifiedSymptoms: [
        "Black powdery sooty spore clusters between dry scales",
        "Neck tissue softening and discoloration",
        "Premature scale desiccation",
      ],
      probableCauses: [
        "Elevated storage humidity (>75%) with poor air flow",
        "Inadequate curing period before bulk stacking",
      ],
      edibilitySafety: {
        isSafeToEat: true,
        rating: "Edible with Trim (Peel affected outer layer)",
        guidance: "Peel away all outer black-spored layers until clean, crisp white inner flesh is reached. Wash thoroughly before cooking.",
      },
      actionPlan: {
        immediateAction: "Isolate affected bulbs immediately to prevent spread to adjacent healthy crates.",
        organicRemedies: [
          "Dust bulbs with Trichoderma harzianum bio-fungicide",
          "Thoroughly sun-dry peeled inner layers with good air movement",
        ],
        chemicalTreatments: [
          "Post-harvest storage dusting with Mancozeb (0.25%) where permitted",
        ],
        storageAndPreservation: [
          "Maintain temperature at 0°C - 4°C and Relative Humidity at 65-70%",
          "Ensure continuous ventilation through mesh sacks",
        ],
        preventiveMeasures: [
          "Allow full field curing for 10-14 days until necks are completely dry and tight",
        ],
      },
      differentialDiagnoses: [
        {
          condition: "Onion Smut (Urocystis cepulae)",
          likelihood: "Low",
          distinction: "Smut causes raised blister lesions on seedlings rather than superficial post-harvest sooty spore dust.",
        },
      ],
      marketImpact: "35% wholesale value reduction due to cosmetic scale discoloration; immediate sorting required.",
    },
  },
  {
    id: "scan-onion-healthy-102",
    timestamp: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    imagePreview: SAMPLE_VEGETABLES[2].imageData,
    vegetableName: "Red Onion (Allium cepa)",
    primaryIssue: "Healthy Specimen (Grade A)",
    healthStatus: "HEALTHY",
    severityLevel: "Healthy",
    trackingState: "Resolved",
    batchOrLocation: "Cold Room Vault A",
    userNotes: "Passed export quality inspection. Firm tight neck with no fungal presence.",
    diagnosis: {
      vegetableName: "Red Onion (Grade A Prime)",
      scientificName: "Allium cepa",
      plantPart: "Whole Bulb & Basal Plate",
      healthStatus: "HEALTHY",
      primaryIssue: "Healthy Specimen (Grade A)",
      pathogenType: "None/Healthy",
      confidenceScore: 99,
      severityLevel: "Healthy",
      summary: "Pristine, firm red onion bulb with tight dry neck, intact shiny papery skin, and clean basal plate.",
      identifiedSymptoms: [
        "Smooth, glossy burgundy-red outer tunics",
        "Firm basal plate with no root mold",
        "Completely dry, tight neck closure",
      ],
      probableCauses: [
        "Optimal curing and proper storage humidity balance",
      ],
      edibilitySafety: {
        isSafeToEat: true,
        rating: "Safe & Fresh",
        guidance: "Excellent culinary quality. Suitable for raw salads and high-heat cooking.",
      },
      actionPlan: {
        immediateAction: "Maintain current ideal cold, dry storage conditions.",
        organicRemedies: ["No treatment needed."],
        chemicalTreatments: ["No chemical application needed."],
        storageAndPreservation: [
          "Store in ventilated dark crates at 2°C - 5°C with 65% RH.",
        ],
        preventiveMeasures: [
          "Keep away from high-moisture fruits (e.g. apples, bananas) that release ethylene gas.",
        ],
      },
      differentialDiagnoses: [],
      marketImpact: "Full premium market value.",
    },
  },
  {
    id: "scan-tomato-blight-203",
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    imagePreview: SAMPLE_VEGETABLES[3].imageData,
    vegetableName: "Tomato (Solanum lycopersicum)",
    primaryIssue: "Late Blight (Phytophthora infestans)",
    healthStatus: "SPOILED_UNFIT",
    severityLevel: "Critical",
    trackingState: "Quarantined",
    batchOrLocation: "Greenhouse Row 4",
    userNotes: "Greenhouse humid spell caused outbreak. Quarantined row and applied copper spray.",
    diagnosis: {
      vegetableName: "Ripe Tomato fruit",
      scientificName: "Solanum lycopersicum",
      plantPart: "Fruit periderm & Calyx",
      healthStatus: "SPOILED_UNFIT",
      primaryIssue: "Late Blight (Phytophthora infestans)",
      pathogenType: "Fungal",
      confidenceScore: 97,
      severityLevel: "Critical",
      summary: "Aggressive late blight rot showing firm, greasy olive-brown necrotic patches with white fungal sporulation.",
      identifiedSymptoms: [
        "Sunken, leathery greasy brown fruit lesions",
        "White sporulating mold fringe at margin",
        "Rapid fruit breakdown and soft decay",
      ],
      probableCauses: [
        "Cool damp conditions (>90% RH, 16°C-20°C) with standing condensation",
      ],
      edibilitySafety: {
        isSafeToEat: false,
        rating: "Do Not Consume / Discard",
        guidance: "Do not eat. The blight induces bitter secondary spoilage and bacterial rot.",
      },
      actionPlan: {
        immediateAction: "Immediately pick and bag all infected fruits and prune blighted foliage.",
        organicRemedies: [
          "Preventive spray with Copper oxychloride / Bordeaux mixture",
          "Bacillus subtilis bio-fungicide drench",
        ],
        chemicalTreatments: [
          "Systemic fungicide: Metalaxyl + Mancozeb (2.5 g/L) or Cymoxanil",
        ],
        storageAndPreservation: [
          "Do not store infected tomatoes alongside healthy harvest.",
        ],
        preventiveMeasures: [
          "Improve greenhouse ventilation and install drip irrigation to avoid wet foliage.",
        ],
      },
      differentialDiagnoses: [
        {
          condition: "Early Blight (Alternaria solani)",
          likelihood: "Low",
          distinction: "Early blight produces concentric target-board rings on stems/leaves, whereas late blight produces greasy brown water-soaked firm rot.",
        },
      ],
      marketImpact: "100% loss of affected fruits; rapid intervention needed to protect green crop.",
    },
  },
];
