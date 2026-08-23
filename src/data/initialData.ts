import { TrackedScan } from "../types";
import { SAMPLE_VEGETABLES } from "./sampleImages";

export const INITIAL_TRACKED_SCANS: TrackedScan[] = [
  // 1. ONION
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

  // 2. TOMATO
  {
    id: "scan-tomato-blight-203",
    timestamp: new Date(Date.now() - 3600000 * 24 * 1.5).toISOString(),
    imagePreview: SAMPLE_VEGETABLES[2].imageData,
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

  // 3. APPLE
  {
    id: "scan-apple-scab-305",
    timestamp: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    imagePreview: SAMPLE_VEGETABLES[4].imageData,
    vegetableName: "Apple (Malus domestica)",
    primaryIssue: "Apple Scab & Bitter Rot",
    healthStatus: "MODERATE_DISEASE",
    severityLevel: "Medium",
    trackingState: "Treating",
    batchOrLocation: "Orchard Block C (Honeycrisp)",
    userNotes: "Applied liquid sulfur foliar spray after wet spring rainfall. Monitoring fruit sizing.",
    diagnosis: {
      vegetableName: "Honeycrisp Apple",
      scientificName: "Malus domestica",
      plantPart: "Fruit Rind & Flesh",
      healthStatus: "MODERATE_DISEASE",
      primaryIssue: "Apple Scab & Bitter Rot",
      pathogenType: "Fungal",
      confidenceScore: 94,
      severityLevel: "Medium",
      summary: "Olive-black corky scabs on outer skin with surface cracking and concentric salmon-pink spore dots.",
      identifiedSymptoms: [
        "Velvety olive-black corky crater scabs on fruit skin",
        "Small surface fissures and skin distortion",
        "Concentric rings of salmon-pink spore tendrils in moist conditions",
      ],
      probableCauses: [
        "Extended spring rain spells (>10 hours leaf wetness at 15°C)",
        "Overwintering fungal spores on unraked orchard leaf mulch",
      ],
      edibilitySafety: {
        isSafeToEat: true,
        rating: "Edible with Trim (Peel affected outer layer)",
        guidance: "Peel away corky surface scabs; internal white fruit flesh is crisp, sweet, and safe to eat.",
      },
      actionPlan: {
        immediateAction: "Prune dense inner water sprouts to open tree canopy to direct sunlight.",
        organicRemedies: [
          "Spray lime sulfur or wettable sulfur during pink bud and petal fall",
          "Rake and compost fallen leaf debris in autumn",
        ],
        chemicalTreatments: [
          "Fungicides: Captan (2 g/L) or Difenoconazole applied at green tip through petal fall",
        ],
        storageAndPreservation: [
          "Store sorted apples at 0.5°C - 2°C with 90% RH; do not store cracked fruit for long-term hold",
        ],
        preventiveMeasures: [
          "Plant scab-resistant cultivars (Liberty, GoldRush, Enterprise)",
        ],
      },
      differentialDiagnoses: [
        {
          condition: "Sooty Blotch (Gloeodes pomigena)",
          likelihood: "Low",
          distinction: "Sooty blotch forms smudgy dark superficial film that wipes off, whereas scab creates corky cracked craters.",
        },
      ],
      marketImpact: "Downgraded from Fresh Grade A to Processing/Cider class due to skin blemishes.",
    },
  },

  // 4. POTATO
  {
    id: "scan-potato-scab-112",
    timestamp: new Date(Date.now() - 3600000 * 24 * 4).toISOString(),
    imagePreview: SAMPLE_VEGETABLES[3].imageData,
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

  // 5. STRAWBERRY
  {
    id: "scan-strawberry-botrytis-502",
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
    imagePreview: SAMPLE_VEGETABLES[7].imageData,
    vegetableName: "Strawberry (Fragaria × ananassa)",
    primaryIssue: "Gray Mold (Botrytis cinerea)",
    healthStatus: "SPOILED_UNFIT",
    severityLevel: "Critical",
    trackingState: "Discarded",
    batchOrLocation: "Field Bed #4 (South Mulch)",
    userNotes: "Culled 8 baskets after 2 days of rain. Disposed of infected berries in sealed bags.",
    diagnosis: {
      vegetableName: "Garden Strawberry fruit",
      scientificName: "Fragaria × ananassa",
      plantPart: "Ripe Receptacle & Calyx",
      healthStatus: "SPOILED_UNFIT",
      primaryIssue: "Gray Mold (Botrytis cinerea)",
      pathogenType: "Fungal",
      confidenceScore: 98,
      severityLevel: "Critical",
      summary: "Soft watery fruit breakdown covered in a dense velvety smoky-gray spore coat.",
      identifiedSymptoms: [
        "Brown water-soaked soft rot starting at calyx neck",
        "Dense smoky-gray velvety fungal fuzz blanket",
        "Loss of berry firmness and rapid liquefaction",
      ],
      probableCauses: [
        "Prolonged rain and high relative humidity (>90% RH) during peak berry ripening",
        "Berries in direct contact with wet mulch or decaying leaves",
      ],
      edibilitySafety: {
        isSafeToEat: false,
        rating: "Do Not Consume / Discard",
        guidance: "Unsafe to consume. Fungal hyphae thoroughly degrade cellular structure and generate spore mycotoxins.",
      },
      actionPlan: {
        immediateAction: "Pick and cull all moldy berries daily to stop airborne spore clouds.",
        organicRemedies: [
          "Bio-fungicide spray containing Bacillus subtilis or Aureobasidium pullulans",
          "Apply potassium bicarbonate during early bloom",
        ],
        chemicalTreatments: [
          "Fungicide sprays at bloom: Fenhexamid or Cyprodinil + Fludioxonil",
        ],
        storageAndPreservation: [
          "Cool harvested berries to 0°C - 2°C within 1 hour of picking to arrest fungal growth",
        ],
        preventiveMeasures: [
          "Maintain fresh clean straw mulch to keep berries elevated above damp soil",
        ],
      },
      differentialDiagnoses: [
        {
          condition: "Rhizopus Rot / Leak (Rhizopus stolonifer)",
          likelihood: "Low",
          distinction: "Rhizopus produces coarse whiskery black-headed mold and copious juice leakage in hot weather.",
        },
      ],
      marketImpact: "100% loss for affected fruit; rapid harvest and cooling required for remainder of crop.",
    },
  },

  // 6. BANANA
  {
    id: "scan-banana-anthracnose-601",
    timestamp: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
    imagePreview: SAMPLE_VEGETABLES[5].imageData,
    vegetableName: "Banana (Musa acuminata)",
    primaryIssue: "Banana Anthracnose (Colletotrichum musae)",
    healthStatus: "SEVERE_DAMAGE",
    severityLevel: "High",
    trackingState: "Treating",
    batchOrLocation: "Ripening Room #2",
    userNotes: "Treated fruit crowns with hot water dip. Adjusted room humidity down to 75%.",
    diagnosis: {
      vegetableName: "Cavendish Banana hand",
      scientificName: "Musa acuminata",
      plantPart: "Fruit Peel & Crown Stalk",
      healthStatus: "SEVERE_DAMAGE",
      primaryIssue: "Banana Anthracnose (Colletotrichum musae)",
      pathogenType: "Fungal",
      confidenceScore: 95,
      severityLevel: "High",
      summary: "Sunken black diamond lesions on peel with salmon-orange spore droplets and neck softening.",
      identifiedSymptoms: [
        "Sunken dark brown to black peel diamond spots",
        "Bright salmon-orange gelatinous spore slime",
        "Crown neck softening leading to finger detachment",
      ],
      probableCauses: [
        "Warm, humid ripening conditions (26°C, RH >85%)",
        "Skin abrasions and bruising during de-handing and packaging",
      ],
      edibilitySafety: {
        isSafeToEat: true,
        rating: "Edible with Trim (Peel affected outer layer)",
        guidance: "Peel is heavily blemished, but if inner pulp is firm and creamy white, it is safe and sweet. Discard if black rot penetrates deep into flesh.",
      },
      actionPlan: {
        immediateAction: "Perform post-harvest hot water immersion (50°C for 2-3 minutes).",
        organicRemedies: [
          "Apply protective food-grade chitosan bio-coating",
          "Wash hands in chlorinated clean water",
        ],
        chemicalTreatments: [
          "Post-harvest crown treatment with Thiabendazole or Imazalil",
        ],
        storageAndPreservation: [
          "Maintain green banana storage at 13°C - 14°C (never below 12°C to prevent chilling injury)",
        ],
        preventiveMeasures: [
          "Sleeve bunches in field with perforated polyethylene bags",
        ],
      },
      differentialDiagnoses: [
        {
          condition: "Cigar End Rot (Verticillium theobromae)",
          likelihood: "Low",
          distinction: "Cigar end rot forms dry ash-gray rot restricted to the flower tip of the fruit.",
        },
      ],
      marketImpact: "25% retail discount required due to cosmetic peel blemishes; pulp quality remains good.",
    },
  },

  // 7. ORANGE
  {
    id: "scan-orange-canker-704",
    timestamp: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    imagePreview: SAMPLE_VEGETABLES[6].imageData,
    vegetableName: "Valencia Orange (Citrus sinensis)",
    primaryIssue: "Citrus Canker & Green Mold",
    healthStatus: "SEVERE_DAMAGE",
    severityLevel: "High",
    trackingState: "Quarantined",
    batchOrLocation: "Packing House Crate #18",
    userNotes: "Quarantined crate. Sanitized packing conveyor with chlorine dioxide solution.",
    diagnosis: {
      vegetableName: "Valencia Orange fruit",
      scientificName: "Citrus sinensis",
      plantPart: "Fruit Rind & Periderm",
      healthStatus: "SEVERE_DAMAGE",
      primaryIssue: "Citrus Canker & Green Mold",
      pathogenType: "Fungal",
      confidenceScore: 97,
      severityLevel: "High",
      summary: "Raised volcano-like corky pustules with yellow halos plus green velvety spore mold patch.",
      identifiedSymptoms: [
        "Raised volcano-like corky rind scabs surrounded by oily yellow halos",
        "Soft water-soaked peel spot rapidly covered in olive-green spore dust",
        "Peel collapse and spore clouding upon contact",
      ],
      probableCauses: [
        "Mechanical clipping wounds during harvest combined with humid packing box transit",
        "Windblown rain spreading Xanthomonas bacteria in grove prior to harvest",
      ],
      edibilitySafety: {
        isSafeToEat: false,
        rating: "Do Not Consume / Discard",
        guidance: "Discard molded oranges immediately to prevent spore clouds from infecting adjacent healthy fruit.",
      },
      actionPlan: {
        immediateAction: "Remove and bag all green mold fruit to stop airborne spore spread.",
        organicRemedies: [
          "Wash fruit with 2% food-grade sodium bicarbonate (baking soda) dip",
          "Apply bio-control yeast (Candida oleophila)",
        ],
        chemicalTreatments: [
          "Post-harvest wax coating with Imazalil or Fludioxonil",
        ],
        storageAndPreservation: [
          "Store citrus at 4°C - 8°C with 85-90% RH to retard spore germination",
        ],
        preventiveMeasures: [
          "Harvest with cotton gloves using blunt clippers; avoid fingernail scrapes",
        ],
      },
      differentialDiagnoses: [
        {
          condition: "Blue Mold (Penicillium italicum)",
          likelihood: "Medium",
          distinction: "Blue mold forms bright blue-colored spores with a narrower white mycelial margin.",
        },
      ],
      marketImpact: "100% loss of infected fruit; essential to preserve remaining harvest through sanitation.",
    },
  },

  // 8. BELL PEPPER
  {
    id: "scan-pepper-anthracnose-802",
    timestamp: new Date(Date.now() - 3600000 * 24 * 2.5).toISOString(),
    imagePreview: SAMPLE_VEGETABLES[8].imageData,
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

  // 9. CABBAGE
  {
    id: "scan-cabbage-blackrot-901",
    timestamp: new Date(Date.now() - 3600000 * 24 * 3.5).toISOString(),
    imagePreview: SAMPLE_VEGETABLES[9].imageData,
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

  // 10. CARROT
  {
    id: "scan-carrot-cavity-1001",
    timestamp: new Date(Date.now() - 3600000 * 24 * 6).toISOString(),
    imagePreview: SAMPLE_VEGETABLES[10].imageData,
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
];
