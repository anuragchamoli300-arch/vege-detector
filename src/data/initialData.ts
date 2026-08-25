import { TrackedScan } from "../types";
import { SAMPLE_VEGETABLES } from "./sampleImages";

const getImage = (idx: number): string => {
  return SAMPLE_VEGETABLES[idx]?.imageData || SAMPLE_VEGETABLES[0]?.imageData || "";
};

export const INITIAL_TRACKED_SCANS: TrackedScan[] = [
  // 1. ONION
  {
    id: "scan-onion-lot-401",
    timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    imagePreview: getImage(0),
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

  // 2. TOMATO
  {
    id: "scan-tomato-blight-203",
    timestamp: new Date(Date.now() - 3600000 * 24 * 1.5).toISOString(),
    imagePreview: getImage(2),
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

  // 3. POTATO
  {
    id: "scan-potato-scab-112",
    timestamp: new Date(Date.now() - 3600000 * 24 * 4).toISOString(),
    imagePreview: getImage(3),
    vegetableName: "Potato (Solanum tuberosum)",
    primaryIssue: "Common Scab (Streptomyces scabies)",
    healthStatus: "MILD_ISSUE",
    severityLevel: "Low",
    trackingState: "Resolved",
    batchOrLocation: "Field Lot #12 (Sandy Loam)",
    userNotes: "Tuber skin has rough corky spots but internal flesh is grade A. Peeled easily.",
    diagnosis: {
      vegetableName: "Russet Potato tuber",
      scientificName: "Solanum tuberosum",
      plantPart: "Tuber Periderm",
      healthStatus: "MILD_ISSUE",
      primaryIssue: "Common Scab (Streptomyces scabies)",
      pathogenType: "Bacterial",
      confidenceScore: 95,
      severityLevel: "Low",
      summary: "Raised corky eruptive scab craters across the periderm skin with sound healthy white internal starch.",
      identifiedSymptoms: [
        "Rough, raised corky circular scabs on potato skin",
        "Shallow pitted craters with jagged brown margins",
        "Firm uninvaded interior tuber flesh",
      ],
      probableCauses: [
        "Warm, dry soil during initial tuber set (weeks 2 to 6)",
        "Alkaline soil pH (pH 7.2) favoring Streptomyces bacteria",
      ],
      edibilitySafety: {
        isSafeToEat: true,
        rating: "Safe & Fresh",
        guidance: "100% safe to consume. Simply peel or scrub the corky skin before boiling, roasting, or baking.",
      },
      actionPlan: {
        immediateAction: "Wash and dry tubers before placing in dark, cool storage.",
        organicRemedies: [
          "Incorporate elemental sulfur into soil before next season to lower pH to 5.2",
          "Plant green manure mustard cover crop",
        ],
        chemicalTreatments: [
          "Seed tuber dressing with Fludioxonil before planting",
        ],
        storageAndPreservation: [
          "Store in well-ventilated dark crates at 4°C - 7°C (never expose to light to prevent solanine greening)",
        ],
        preventiveMeasures: [
          "Keep soil consistently moist during the 4-6 weeks after tuber set",
        ],
      },
      differentialDiagnoses: [
        {
          condition: "Powdery Scab (Spongospora subterranea)",
          likelihood: "Low",
          distinction: "Powdery scab occurs in cold wet soils and produces pustules filled with brown powdery spore balls.",
        },
      ],
      marketImpact: "Minor cosmetic downgrade for table market; excellent for processing and home culinary use.",
    },
  },

  // 4. BELL PEPPER
  {
    id: "scan-pepper-anthracnose-802",
    timestamp: new Date(Date.now() - 3600000 * 24 * 2.5).toISOString(),
    imagePreview: getImage(4),
    vegetableName: "Bell Pepper (Capsicum annuum)",
    primaryIssue: "Pepper Anthracnose (Colletotrichum)",
    healthStatus: "SEVERE_DAMAGE",
    severityLevel: "High",
    trackingState: "Treating",
    batchOrLocation: "Field Plot B4 (Yellow Bell)",
    userNotes: "Applied copper oxychloride spray across block. Harvesting healthy green pods early.",
    diagnosis: {
      vegetableName: "Yellow Bell Pepper pod",
      scientificName: "Capsicum annuum",
      plantPart: "Fruit Wall & Calyx",
      healthStatus: "SEVERE_DAMAGE",
      primaryIssue: "Pepper Anthracnose (Colletotrichum)",
      pathogenType: "Fungal",
      confidenceScore: 96,
      severityLevel: "High",
      summary: "Sunken circular leathery craters with concentric salmon-orange spore droplets on pod wall.",
      identifiedSymptoms: [
        "Sunken circular water-soaked craters on pepper pod",
        "Concentric rings of dark brown fungal tissue",
        "Gelatinous salmon-orange spore masses oozing in moist air",
      ],
      probableCauses: [
        "Warm rainy weather (28°C) with overhead irrigation splashing spores",
      ],
      edibilitySafety: {
        isSafeToEat: false,
        rating: "Do Not Consume / Discard",
        guidance: "Discard heavily spotted pods; the rot penetrates into seed cavity creating bitter off-flavors.",
      },
      actionPlan: {
        immediateAction: "Pick and destroy all rotting pepper pods.",
        organicRemedies: [
          "Copper oxychloride (3 g/L) + Neem oil spray",
          "Bio-fungicide Trichoderma harzianum at first bloom",
        ],
        chemicalTreatments: [
          "Azoxystrobin + Difenoconazole or Mancozeb foliar spray",
        ],
        storageAndPreservation: [
          "Keep harvested peppers dry at 7°C - 10°C with 90% RH",
        ],
        preventiveMeasures: [
          "Install black plastic mulch and drip irrigation to prevent soil splash",
        ],
      },
      differentialDiagnoses: [
        {
          condition: "Sunscald (Abiotic)",
          likelihood: "Low",
          distinction: "Sunscald produces papery bleached white patches on sun-exposed fruit sides without concentric spore rings.",
        },
      ],
      marketImpact: "Significant yield reduction; cull affected fruits immediately.",
    },
  },

  // 5. CABBAGE
  {
    id: "scan-cabbage-blackrot-901",
    timestamp: new Date(Date.now() - 3600000 * 24 * 3.5).toISOString(),
    imagePreview: getImage(5),
    vegetableName: "Cabbage (Brassica oleracea)",
    primaryIssue: "Black Rot of Crucifers",
    healthStatus: "MODERATE_DISEASE",
    severityLevel: "Medium",
    trackingState: "Treating",
    batchOrLocation: "Field Block 7 (Autumn Cabbage)",
    userNotes: "Trimmed yellowing outer leaves. Applied copper hydroxide bactericide spray.",
    diagnosis: {
      vegetableName: "Green Cabbage head",
      scientificName: "Brassica oleracea var. capitata",
      plantPart: "Outer Wrapper Leaves & Veins",
      healthStatus: "MODERATE_DISEASE",
      primaryIssue: "Black Rot of Crucifers",
      pathogenType: "Bacterial",
      confidenceScore: 94,
      severityLevel: "Medium",
      summary: "Distinct V-shaped yellow chlorotic leaf margin wedge with blackened netted veins.",
      identifiedSymptoms: [
        "V-shaped yellow wedge lesions extending inward from leaf hydathodes",
        "Blackened vascular vein network inside yellow lesion",
        "Outer wrapper leaf chlorosis and premature browning",
      ],
      probableCauses: [
        "Warm, rainy conditions (26°C) allowing Xanthomonas bacteria to enter leaf pores",
      ],
      edibilitySafety: {
        isSafeToEat: true,
        rating: "Edible with Trim (Peel affected outer layer)",
        guidance: "Strip away the affected outer wrapper leaves; the tight inner green head is clean, firm, and safe to eat.",
      },
      actionPlan: {
        immediateAction: "Remove and dispose of yellowed outer leaves.",
        organicRemedies: [
          "Copper hydroxide bactericide spray combined with bio-stimulants",
          "Hot water seed soaking for future crops (50°C for 25 min)",
        ],
        chemicalTreatments: [
          "Copper oxychloride (2.5 g/L) + Streptocycline (0.1 g/L)",
        ],
        storageAndPreservation: [
          "Store trimmed sound cabbage heads at 0°C with 95% RH",
        ],
        preventiveMeasures: [
          "Rotate away from brassicas for 3 years to break soil inoculum cycle",
        ],
      },
      differentialDiagnoses: [
        {
          condition: "Fusarium Yellows (Fusarium oxysporum f. sp. conglutinans)",
          likelihood: "Low",
          distinction: "Fusarium causes one-sided leaf yellowing and vascular browning without the classic V-shaped margin wedge.",
        },
      ],
      marketImpact: "Minor cosmetic trimming required; inner heads retain good culinary value.",
    },
  },

  // 6. CARROT
  {
    id: "scan-carrot-cavity-1001",
    timestamp: new Date(Date.now() - 3600000 * 24 * 6).toISOString(),
    imagePreview: getImage(6),
    vegetableName: "Carrot (Daucus carota)",
    primaryIssue: "Cavity Spot (Pythium sulcatum)",
    healthStatus: "MILD_ISSUE",
    severityLevel: "Low",
    trackingState: "Resolved",
    batchOrLocation: "Cold Store Vault #1",
    userNotes: "Washed and sorted harvest. Peeling tests confirmed sound interior crisp flesh.",
    diagnosis: {
      vegetableName: "Nantes Carrot taproot",
      scientificName: "Daucus carota subsp. sativus",
      plantPart: "Taproot Periderm",
      healthStatus: "MILD_ISSUE",
      primaryIssue: "Cavity Spot (Pythium sulcatum)",
      pathogenType: "Fungal",
      confidenceScore: 93,
      severityLevel: "Low",
      summary: "Horizontal dark sunken elliptical crater slits across the taproot surface with sound interior flesh.",
      identifiedSymptoms: [
        "Small 2-5 mm horizontal sunken dark brown slits on root surface",
        "Shallow ruptured periderm cavities",
        "Crisp orange internal core unaffected",
      ],
      probableCauses: [
        "Waterlogged heavy soil during root maturation",
        "Acidic soil conditions favoring Pythium oomycetes",
      ],
      edibilitySafety: {
        isSafeToEat: true,
        rating: "Safe & Fresh",
        guidance: "100% safe to eat. Peel away the skin with a standard vegetable peeler to remove the shallow cavities.",
      },
      actionPlan: {
        immediateAction: "Wash, hydrocool, and store carrots in perforated plastic bags.",
        organicRemedies: [
          "Apply agricultural lime to raise bed pH above 7.0",
          "Incorporate Trichoderma bio-control fungi at seeding",
        ],
        chemicalTreatments: [
          "Mefenoxam (Ridomil Gold) in-furrow treatment at planting",
        ],
        storageAndPreservation: [
          "Store at 0°C with 95-98% RH to preserve crunch and prevent desiccation",
        ],
        preventiveMeasures: [
          "Plant carrots on high raised beds (25 cm) for optimal drainage",
        ],
      },
      differentialDiagnoses: [
        {
          condition: "Carrot Rust Fly Damage (Psila rosae)",
          likelihood: "Low",
          distinction: "Rust fly larvae bore winding rusty-brown tunnels deep into the root core rather than shallow horizontal surface slits.",
        },
      ],
      marketImpact: "Excellent for fresh peeled market and home kitchen use.",
    },
  },

  // 7. CUCUMBER
  {
    id: "scan-cucumber-mildew-1101",
    timestamp: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
    imagePreview: getImage(7),
    vegetableName: "Cucumber (Cucumis sativus)",
    primaryIssue: "Cucurbit Anthracnose & Mildew",
    healthStatus: "MODERATE_DISEASE",
    severityLevel: "Medium",
    trackingState: "Treating",
    batchOrLocation: "High Tunnel Greenhouse #2",
    userNotes: "Detected sunken lesions on fruit rind with powdery white patches on stems.",
    diagnosis: {
      vegetableName: "English Cucumber fruit",
      scientificName: "Cucumis sativus",
      plantPart: "Fruit Rind & Petiole",
      healthStatus: "MODERATE_DISEASE",
      primaryIssue: "Cucurbit Anthracnose & Mildew",
      pathogenType: "Fungal",
      confidenceScore: 95,
      severityLevel: "Medium",
      summary: "Sunken leathery circular craters on fruit rind with white powdery fungal felt on neck.",
      identifiedSymptoms: [
        "Sunken circular lesions with dark brown margins on fruit skin",
        "Powdery talcum-like white fungal coating on stem and foliage",
        "Water-soaked rind spots exuding amber sap droplets",
      ],
      probableCauses: [
        "Elevated humidity (>85%) combined with warm greenhouse temperatures (24-28°C)",
        "Poor airflow through trellis canopy",
      ],
      edibilitySafety: {
        isSafeToEat: true,
        rating: "Edible with Trim (Peel affected outer layer)",
        guidance: "Peel away rind craters; unaffected crisp white flesh is completely edible. Discard if fruit becomes soft or bitter.",
      },
      actionPlan: {
        immediateAction: "Prune heavily diseased leaves and increase ventilation fan speed.",
        organicRemedies: [
          "Potassium bicarbonate (3 g/L) foliar spray",
          "Neem oil emulsion (0.5%) applied weekly",
        ],
        chemicalTreatments: [
          "Azoxystrobin or Chlorothalonil foliar spray",
        ],
        storageAndPreservation: [
          "Store at 10°C - 12°C with 90% RH (avoid storing below 10°C to prevent chilling injury)",
        ],
        preventiveMeasures: [
          "Space trellis rows for morning sunlight and swift leaf drying",
        ],
      },
      differentialDiagnoses: [
        {
          condition: "Gummy Stem Blight (Didymella bryoniae)",
          likelihood: "Low",
          distinction: "Gummy stem blight features black fruiting bodies in stem splits oozing characteristic gummy brown sap.",
        },
      ],
      marketImpact: "Grade B classification; marketable for fresh local consumption after sorting.",
    },
  },

  // 8. EGGPLANT
  {
    id: "scan-eggplant-phomopsis-1201",
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
    imagePreview: getImage(8),
    vegetableName: "Eggplant (Solanum melongena)",
    primaryIssue: "Phomopsis Blight & Fruit Rot",
    healthStatus: "SEVERE_DAMAGE",
    severityLevel: "High",
    trackingState: "Quarantined",
    batchOrLocation: "Field Block 3 (Black Beauty)",
    userNotes: "Large brown soft rot patch observed with concentric ring of black pimples.",
    diagnosis: {
      vegetableName: "Black Beauty Eggplant",
      scientificName: "Solanum melongena",
      plantPart: "Fruit Rind & Flesh",
      healthStatus: "SEVERE_DAMAGE",
      primaryIssue: "Phomopsis Blight & Fruit Rot",
      pathogenType: "Fungal",
      confidenceScore: 96,
      severityLevel: "High",
      summary: "Sunken circular brown water-soaked soft rot lesion covered in concentric black pycnidia pustules.",
      identifiedSymptoms: [
        "Large sunken circular brown soft rot crater on fruit side",
        "Concentric rings of tiny black pimples (pycnidia)",
        "Spongy watery collapse of inner spongy pulp",
      ],
      probableCauses: [
        "Prolonged rainy conditions (27-32°C) with water splashing soil spores onto hanging fruit",
      ],
      edibilitySafety: {
        isSafeToEat: false,
        rating: "Do Not Consume / Discard",
        guidance: "Discard rotting eggplants; the fungus turns internal pulp spongy, watery, and bitter.",
      },
      actionPlan: {
        immediateAction: "Harvest and destroy all rotting fruits to prevent spore dispersal.",
        organicRemedies: [
          "Copper oxychloride (2.5 g/L) foliar spray",
          "Bio-fungicide Trichoderma viride root drench",
        ],
        chemicalTreatments: [
          "Mancozeb or Carbendazim foliar application",
        ],
        storageAndPreservation: [
          "Store sound eggplants at 10°C - 12°C with 90% RH",
        ],
        preventiveMeasures: [
          "Mulch beds with straw to prevent rain-splash inoculum from reaching lower canopy",
        ],
      },
      differentialDiagnoses: [
        {
          condition: "Anthracnose Fruit Rot (Colletotrichum melongenae)",
          likelihood: "Low",
          distinction: "Anthracnose produces salmon-pink spore masses in humid conditions rather than dry black pycnidia pimples.",
        },
      ],
      marketImpact: "Total loss for infected fruit; sound fruits on same bush remain marketable.",
    },
  },
];
