import { EncyclopediaDisease } from "../types";

export const ENCYCLOPEDIA_DISEASES: EncyclopediaDisease[] = [
  // ALLIUM (ONION, GARLIC, SHALLOTS)
  {
    id: "onion-black-mold",
    name: "Black Mold of Onion & Garlic",
    scientificAgent: "Aspergillus niger (Fungus)",
    vegetableType: "Onion, Garlic, Shallots",
    family: "Allium (Onion, Garlic, Leek)",
    category: "Fungal",
    typicalSymptoms: [
      "Black powdery sooty masses of spores forming beneath dry outer scales",
      "Spore dust concentrates along bulb veins and around the neck",
      "Softening of outer scales without foul bacterial smell (unless secondary soft rot invades)",
      "Bulbs shrivel or desiccate prematurely in warm storage",
    ],
    favorableConditions: [
      "Storage temperatures between 24°C to 35°C (75°F - 95°F)",
      "High relative humidity (>75%) in storage rooms or transport containers",
      "Delayed or incomplete bulb curing after harvest",
      "Wounds, bruising, or sunburn on outer scales",
    ],
    organicCure: [
      "Dust harvested bulbs with bio-fungicide containing Trichoderma harzianum or Bacillus subtilis before storage",
      "Immediately peel off and discard all affected dry outer tunics; sun-dry the inner clean layers in good ventilation",
      "Wipe clean tools with 3% hydrogen peroxide or diluted vinegar solution",
    ],
    chemicalCure: [
      "Post-harvest seed/bulb treatment with Mancozeb (0.25%) or Carbendazim (0.1%)",
      "Foliar sprays in field prior to harvest: Azoxystrobin or Difenoconazole if pre-harvest rains occur",
    ],
    prevention: [
      "Cure harvested onions thoroughly in direct sunlight or dry forced air (30°C at 60% RH) for 10-14 days until neck is completely dry and tight",
      "Store bulbs in mesh bags at 0°C - 4°C with 65-70% Relative Humidity and constant air circulation",
      "Avoid cutting tops too close to the bulb (leave at least 3-5 cm / 1.5 inches of neck)",
    ],
    edibilityRisk: "If localized strictly to outer dry scales, peel away until clean white flesh is reached and wash thoroughly. If mold has penetrated into inner fleshy rings or bulb feels soft/mushy, discard completely due to mycotoxins.",
    keyVisualSign: "Black sooty charcoal-like powder streaks between papery onion skins.",
  },
  {
    id: "onion-purple-blotch",
    name: "Purple Blotch & Leaf Blight",
    scientificAgent: "Alternaria porri (Fungus)",
    vegetableType: "Onion, Garlic, Leek",
    family: "Allium (Onion, Garlic, Leek)",
    category: "Fungal",
    typicalSymptoms: [
      "Small water-soaked lesions on leaves or seed stalks turning brown to dark purple",
      "Sunken elliptical zonate patches with prominent yellow or chlorotic margins",
      "Neck tissue becomes dark brown, spongy, and fails to close properly",
      "Inner bulb scale decay with reddish-purple discoloration spreading downwards",
    ],
    favorableConditions: [
      "Warm, humid weather with frequent rain, dew, or overhead sprinkler irrigation (21°C - 30°C)",
      "Thrips feeding wounds which provide entry portals for fungal spores",
      "Dense crop canopy with poor air penetration",
    ],
    organicCure: [
      "Neem oil spray (3-5 ml/L) mixed with bio-fungicide (Trichoderma viride @ 5g/L)",
      "Bordeaux mixture (1%) or Copper oxychloride spray on foliage",
      "Prune and destroy heavily blighted outer foliage immediately",
    ],
    chemicalCure: [
      "Foliar fungicide spray: Mancozeb (2.5 g/L) or Chlorothalonil (2 g/L) at 10-14 day intervals",
      "Systemic fungicides: Tebuconazole (1 ml/L) or Pyraclostrobin + Boscalid",
    ],
    prevention: [
      "Implement 3-year crop rotation with non-allium crops (corn, brassicas, beans)",
      "Adopt drip or furrow irrigation rather than overhead sprinklers to keep foliage dry",
      "Control onion thrips early in the season to prevent wound entry points",
    ],
    edibilityRisk: "If bulb flesh is intact and firm with only surface neck discoloration, trim affected neck/outer scale. If internal reddish decay has spread into bulb core, discard.",
    keyVisualSign: "Sunken elliptical purple-centered spots with distinct yellow halo rings.",
  },
  {
    id: "onion-neck-rot",
    name: "Botrytis Neck Rot & Gray Mold",
    scientificAgent: "Botrytis aclada / Botrytis allii (Fungus)",
    vegetableType: "Onion, Garlic",
    family: "Allium (Onion, Garlic, Leek)",
    category: "Fungal",
    typicalSymptoms: [
      "Softening and water-soaked breakdown starting at the neck and moving down into the bulb",
      "Affected fleshy scales turn pale brownish and look cooked or translucent",
      "Dense gray velvety mold (mycelium and conidia) emerging from the neck in humid storage",
      "Hard, black crust-like sclerotia forming on outer scales",
    ],
    favorableConditions: [
      "Harvesting during cool, damp weather when onion necks are still thick and green",
      "Incomplete neck curing before storage",
      "Excess late nitrogen fertilization prolonging green neck growth",
    ],
    organicCure: [
      "Immediate sorting: Cull all soft-necked bulbs to prevent nest-rot spreading in bins",
      "Hot air curing at 32°C - 35°C with high airflow for 48 hours to dry neck quickly",
    ],
    chemicalCure: [
      "Seed treatment with Thiram or Fludioxonil before planting",
      "Field application of Cyprodinil + Fludioxonil or Boscalid prior to harvest",
    ],
    prevention: [
      "Stop irrigation 2 to 3 weeks before harvest; harvest only when 70%+ tops have fallen over naturally",
      "Cut tops leaving at least 5 cm (2 inches) of neck; never top while foliage is wet",
      "Maintain storage at 0°C to 1°C with 65-70% RH and good air circulation",
    ],
    edibilityRisk: "Unfit for consumption once the neck or inner scales become brown, spongy, and water-soaked.",
    keyVisualSign: "Soft spongy neck with grayish velvety fungal fuzz and brownish cooked inner rings.",
  },
  {
    id: "onion-bacterial-soft-rot",
    name: "Bacterial Soft Rot & Slippery Skin",
    scientificAgent: "Pectobacterium carotovorum / Burkholderia gladioli",
    vegetableType: "Onion, Potato, Carrot, Tomato, Cabbage",
    family: "Allium (Onion, Garlic, Leek)",
    category: "Bacterial",
    typicalSymptoms: [
      "One or more inner fleshy scales turn mushy, water-soaked, and pale yellow to light brown",
      "When bulb is squeezed at the base, foul-smelling liquid oozes from the neck ('slippery skin')",
      "Outer scales may look deceptively normal while inner core is completely liquefied",
      "Putrid, sharp decaying odor",
    ],
    favorableConditions: [
      "Warm rainy weather (>28°C) before or during harvest",
      "Overhead irrigation splashing bacteria from soil onto neck tissue",
      "Sunburn or mechanical wounding during lifting or transport",
    ],
    organicCure: [
      "Immediately quarantine and destroy infected rotting bulbs — do not compost near gardens",
      "Disinfect all harvesting crates and storage shelving with 10% bleach solution",
    ],
    chemicalCure: [
      "Copper hydroxide + Mancozeb protective foliar sprays during high risk rainy spells in field",
      "Bactericides are generally ineffective once bacteria enters the bulb",
    ],
    prevention: [
      "Avoid overhead irrigation after bulb formation",
      "Handle bulbs gently during harvest to avoid bruising or skin punctures",
      "Ensure rapid curing and dry conditions throughout storage",
    ],
    edibilityRisk: "Strictly unsafe to eat. Bacterial soft rot produces foul decomposing matter and toxins. Discard immediately.",
    keyVisualSign: "Inner rings slip out like liquid jelly when squeezed, accompanied by foul odor.",
  },
  {
    id: "onion-thrips-damage",
    name: "Onion Thrips Infestation",
    scientificAgent: "Thrips tabaci (Insect Pest)",
    vegetableType: "Onion, Garlic, Shallots, Leek",
    family: "Allium (Onion, Garlic, Leek)",
    category: "Insect/Pest",
    typicalSymptoms: [
      "Silvery-white patches, streaks, or speckling on leaves where plant cells are rasped and emptied",
      "Tiny black specks of tar-like frass (feces) dotted across silvery leaf surfaces",
      "Leaf tips turn brown, curl, and wither prematurely; stunted bulb growth",
      "Bulbs smaller with loose scales and increased susceptibility to fungal rot",
    ],
    favorableConditions: [
      "Hot, dry, and dusty weather (temperatures 25°C - 35°C)",
      "Presence of alternative weed hosts around field margins",
    ],
    organicCure: [
      "Spray Neem oil (Azadirachtin 1%) or insecticidal soap (20 ml/L) directed into leaf sheaths",
      "Release natural predators: predatory mites (Amblyseius swirskii) or minute pirate bugs (Orius)",
      "Install blue or yellow sticky traps around crop beds",
    ],
    chemicalCure: [
      "Insecticides: Spinetoram (0.9 ml/L), Cyantraniliprole, or Fipronil (2 ml/L) alternating modes of action",
    ],
    prevention: [
      "Overhead sprinkling can physically wash thrips off plants during vegetative stage",
      "Reflective silver plastic mulches repel adult thrips during early growth",
      "Eliminate weed hosts (lambsquarters, clover) near allium beds",
    ],
    edibilityRisk: "Bulbs are completely safe to eat once cleaned and peeled.",
    keyVisualSign: "Silvery metallic scarring and black fecal specks on foliage and outer bulb neck.",
  },

  // SOLANACEAE (TOMATO, POTATO, PEPPER)
  {
    id: "tomato-late-blight",
    name: "Late Blight of Tomato & Potato",
    scientificAgent: "Phytophthora infestans (Oomycete)",
    vegetableType: "Tomato, Potato",
    family: "Solanaceae (Tomato, Potato, Pepper)",
    category: "Fungal",
    typicalSymptoms: [
      "Large, irregular water-soaked greasy olive-green to dark brown lesions on leaves and stems",
      "Delicate white cottony mold sporulation visible on leaf undersides in humid mornings",
      "Fruit develops firm, dark brown, leathery, greasy decay with bumpy surface",
      "Potato tubers show purplish-brown sunken skin with dry granular reddish-brown flesh rot inside",
    ],
    favorableConditions: [
      "Cool, damp, overcast conditions (15°C - 22°C) with relative humidity >90%",
      "Extended leaf wetness (>8 hours)",
    ],
    organicCure: [
      "Preventive sprays of Copper sulfate / Bordeaux mixture before rainfall",
      "Bio-fungicide containing Bacillus amyloliquefaciens",
      "Promptly prune and bag infected foliage — never compost infected plants",
    ],
    chemicalCure: [
      "Systemic fungicides: Metalaxyl + Mancozeb (2.5 g/L), Cymoxanil + Mancozeb, or Dimethomorph",
    ],
    prevention: [
      "Plant certified disease-free seed tubers and resistant tomato hybrids",
      "Space plants generously and stake/trellis tomatoes for maximum air circulation",
      "Water exclusively at soil base using drip irrigation",
    ],
    edibilityRisk: "Affected tomato fruits and potato tubers develop secondary bacterial rot and bitter off-flavors. Do not consume blighted portions.",
    keyVisualSign: "Olive-brown greasy leathery rot with white fungal fringe at margin.",
  },
  {
    id: "tomato-blossom-end-rot",
    name: "Blossom End Rot (BER)",
    scientificAgent: "Physiological / Calcium Deficiency",
    vegetableType: "Tomato, Bell Pepper, Eggplant, Zucchini",
    family: "Solanaceae (Tomato, Potato, Pepper)",
    category: "Physiological/Abiotic",
    typicalSymptoms: [
      "Water-soaked spot at the bottom (blossom end) of the fruit while still green",
      "Lesion rapidly enlarges, turns dark brown to black, flat, and leathery",
      "Secondary black mold (Alternaria) often colonizes the dead tissue",
      "Foliage remains green and healthy (non-infectious disorder)",
    ],
    favorableConditions: [
      "Fluctuating soil moisture (drought followed by heavy irrigation)",
      "High soil salinity or excessive nitrogen fertilizer (ammonium form)",
      "Acidic soil (pH < 6.0) limiting calcium uptake",
    ],
    organicCure: [
      "Foliar calcium spray (Calcium chloride or chelated calcium 0.5%) applied during fruit set",
      "Mulch soil with 3-inch organic straw to maintain uniform moisture levels",
      "Top-dress soil with agricultural gypsum (calcium sulfate) or bone meal",
    ],
    chemicalCure: [
      "Soil drench with Calcium nitrate (1-2 g/L) at first fruit cluster stage",
    ],
    prevention: [
      "Maintain consistent soil moisture through timed drip irrigation",
      "Avoid root damage during hoeing and cultivation",
      "Test and balance soil pH to 6.2 - 6.8",
    ],
    edibilityRisk: "Safe to eat. Slice off and discard the dry black bottom end; remaining upper fruit is delicious and harmless.",
    keyVisualSign: "Flat, sunken, leathery black disc at the exact bottom base of the fruit.",
  },
  {
    id: "potato-common-scab",
    name: "Common Potato Scab",
    scientificAgent: "Streptomyces scabies (Bacterial/Actinomycete)",
    vegetableType: "Potato, Radish, Turnip, Beetroot",
    family: "Solanaceae (Tomato, Potato, Pepper)",
    category: "Bacterial",
    typicalSymptoms: [
      "Rough, raised corky circular or irregular scabs on potato skin",
      "Pitted craters with jagged margins that can penetrate 1-3 mm into periderm",
      "Internal potato flesh remains white, firm, and unaffected",
    ],
    favorableConditions: [
      "Dry, warm soil during tuber initiation (2 to 6 weeks after plant emergence)",
      "Alkaline soil with pH above 5.5 (especially pH 6.5 - 7.5)",
      "Fresh uncomposted livestock manure applied right before planting",
    ],
    organicCure: [
      "Lower soil pH to 5.0 - 5.2 by applying elemental agricultural sulfur",
      "Incorporate green manure crops (mustard, rye) prior to potato planting",
    ],
    chemicalCure: [
      "Tuber seed treatment with Mancozeb or Fludioxonil before planting",
    ],
    prevention: [
      "Keep soil consistently moist during the 4-6 weeks after tuber set (scab cannot infect wet tubers)",
      "Plant scab-resistant cultivars (e.g., Superior, Russet Burbank, Norland)",
      "Avoid applying lime or fresh manure directly to potato beds",
    ],
    edibilityRisk: "100% safe to eat. Peel away the rough corky skin and cook normally.",
    keyVisualSign: "Brown raised corky crater scabs across potato skin with healthy white flesh beneath.",
  },

  // BRASSICAS (CABBAGE, CAULIFLOWER, BROCCOLI)
  {
    id: "cabbage-black-rot",
    name: "Black Rot of Crucifers",
    scientificAgent: "Xanthomonas campestris pv. campestris (Bacterium)",
    vegetableType: "Cabbage, Cauliflower, Broccoli, Kale",
    family: "Brassica (Cabbage, Broccoli)",
    category: "Bacterial",
    typicalSymptoms: [
      "V-shaped chlorotic yellow lesions starting at leaf margins with wide end facing outward",
      "Leaf veins inside the yellow patch turn distinctly black and netted",
      "Stem vascular bundles turn black when cut in cross-section",
      "Heads fail to form or develop foul internal decay",
    ],
    favorableConditions: [
      "Warm, humid weather (24°C - 30°C) with frequent rain or overhead watering",
      "Bacteria enters through hydathodes (leaf margin water pores) or insect wounds",
    ],
    organicCure: [
      "Hot water seed treatment (50°C for 25 minutes for cabbage, 20 min for broccoli)",
      "Copper hydroxide spray combined with bio-stimulants",
      "Remove and destroy infected plants immediately",
    ],
    chemicalCure: [
      "Copper oxychloride (2.5 g/L) + Streptocycline (0.1 g/L) spray in nursery and early field",
    ],
    prevention: [
      "Practice 3-year rotation away from all brassica crops",
      "Use certified black-rot-free seeds and transplants",
      "Control flea beetles and caterpillars to minimize leaf entry wounds",
    ],
    edibilityRisk: "If head has only minor outer leaf margin yellowing, strip outer leaves. If vascular core has turned black and spongy, do not eat.",
    keyVisualSign: "V-shaped yellow leaf wedge with blackened veins pointing toward the midrib.",
  },
];
