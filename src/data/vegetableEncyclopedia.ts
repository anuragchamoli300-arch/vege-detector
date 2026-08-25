import { EncyclopediaDisease } from "../types";

export const ENCYCLOPEDIA_DISEASES: EncyclopediaDisease[] = [
  // ==========================================
  // 1. ALLIUM (ONION, GARLIC, SHALLOTS, LEEK)
  // ==========================================
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
    scientificAgent: "Pectobacterium carotovorum / Burkholderia gladioli (Bacterium)",
    vegetableType: "Onion, Garlic, Potato, Cabbage",
    family: "Allium (Onion, Garlic, Leek)",
    category: "Bacterial",
    typicalSymptoms: [
      "One or more inner fleshy scales turn mushy, water-soaked, and pale yellow to light brown",
      "When bulb is squeezed at the base, foul-smelling liquid oozes from the neck ('slippery skin')",
      "Outer scales may look deceptively normal while inner core is completely liquefied",
      "Putrid, sharp decaying sulfurous odor",
    ],
    favorableConditions: [
      "Warm rainy weather (>28°C / 82°F) before or during harvest",
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

  // ==========================================
  // 2. TOMATO (SOLANACEAE)
  // ==========================================
  {
    id: "tomato-late-blight",
    name: "Late Blight of Tomato & Potato",
    scientificAgent: "Phytophthora infestans (Oomycete / Water Mold)",
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
      "Extended leaf wetness (>8 hours) from rain or dense fog",
    ],
    organicCure: [
      "Preventive sprays of Copper sulfate / Bordeaux mixture before rainfall",
      "Bio-fungicide containing Bacillus amyloliquefaciens or Trichoderma",
      "Promptly prune and bag infected foliage — never compost infected plants",
    ],
    chemicalCure: [
      "Systemic fungicides: Metalaxyl + Mancozeb (2.5 g/L), Cymoxanil + Mancozeb, or Dimethomorph",
    ],
    prevention: [
      "Plant certified disease-free seed tubers and resistant tomato hybrids (e.g., Defiant, Mountain Magic)",
      "Space plants generously and stake/trellis tomatoes for maximum air circulation",
      "Water exclusively at soil base using drip irrigation",
    ],
    edibilityRisk: "Affected tomato fruits and potato tubers develop secondary bacterial rot and bitter off-flavors. Do not consume blighted portions.",
    keyVisualSign: "Olive-brown greasy leathery rot with white fungal fringe at margin.",
  },
  {
    id: "tomato-blossom-end-rot",
    name: "Blossom End Rot (BER)",
    scientificAgent: "Physiological / Calcium Deficiency & Moisture Stress",
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
      "Acidic soil (pH < 6.0) limiting calcium uptake during rapid fruit expansion",
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
    id: "tomato-early-blight",
    name: "Early Blight & Target Spot",
    scientificAgent: "Alternaria solani (Fungus)",
    vegetableType: "Tomato, Potato, Eggplant",
    family: "Solanaceae (Tomato, Potato, Pepper)",
    category: "Fungal",
    typicalSymptoms: [
      "Circular brown-to-black spots with prominent concentric rings resembling a target board",
      "Surrounding leaf tissue turns chlorotic yellow (yellow halo)",
      "Bottom-up defoliation starting on oldest lower leaves",
      "Stem collar rot and sunken dark fruit lesions near the stem attachment",
    ],
    favorableConditions: [
      "Warm temperatures (24°C - 29°C) accompanied by heavy dew or frequent rain",
      "Stressed plants carrying heavy fruit loads",
    ],
    organicCure: [
      "Spray copper octanoate or copper hydroxide every 7-10 days",
      "Bio-fungicide with Bacillus subtilis (Serenade)",
      "Strip off the lowest 12 inches of leaves to prevent soil splash",
    ],
    chemicalCure: [
      "Chlorothalonil (2 g/L), Azoxystrobin, or Difenoconazole foliar spray",
    ],
    prevention: [
      "Mulch heavily under plants to prevent fungal spores in soil splashing onto foliage",
      "Rotate with non-solanaceous crops for 3-4 years",
      "Stake and prune plants for maximum sunlight and air movement",
    ],
    edibilityRisk: "Fruits with superficial stem lesions can be trimmed and eaten safely. Discard if deep fungal rot is present.",
    keyVisualSign: "Concentric target-board rings surrounded by bright yellow halo on lower leaves.",
  },

  // ==========================================
  // 3. POTATO (SOLANACEAE)
  // ==========================================
  {
    id: "potato-common-scab",
    name: "Common Potato Scab",
    scientificAgent: "Streptomyces scabies (Actinomycete Bacterium)",
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
  {
    id: "potato-black-scurf",
    name: "Black Scurf & Rhizoctonia Canker",
    scientificAgent: "Rhizoctonia solani (Fungus)",
    vegetableType: "Potato",
    family: "Solanaceae (Tomato, Potato, Pepper)",
    category: "Fungal",
    typicalSymptoms: [
      "Hard, dark brown to black irregular dirt-like crusts (sclerotia) sticking to potato skin ('dirt that won't wash off')",
      "Brown sunken necrotic cankers on underground sprouts and stolons",
      "Formation of aerial tubers in leaf axils due to restricted carbohydrate transport",
      "Stunted uneven plant emergence in spring",
    ],
    favorableConditions: [
      "Cold, wet soils at planting time (<10°C / 50°F)",
      "Delaying tuber harvest after vine death in wet autumn soils",
    ],
    organicCure: [
      "Solarize seed potatoes (green sprouting / chitting) before planting to accelerate emergence",
      "Treat seed tubers with biological antagonist Trichoderma harzianum",
    ],
    chemicalCure: [
      "Seed tuber dressing with Fludioxonil or Azoxystrobin in-furrow spray",
    ],
    prevention: [
      "Plant into warm, well-drained soil (>12°C)",
      "Harvest tubers promptly within 2-3 weeks of vine killing",
      "Rotate with cereals, corn, or brassicas for 3+ years",
    ],
    edibilityRisk: "Completely safe to eat. The black sclerotia are superficial and peel off easily with the skin.",
    keyVisualSign: "Hard black tar-like specks on tuber skin that cannot be rinsed away with water.",
  },

  // ==========================================
  // 4. EGGPLANT & BRINJAL (SOLANACEAE)
  // ==========================================
  {
    id: "eggplant-phomopsis-blight",
    name: "Phomopsis Blight & Fruit Rot of Eggplant",
    scientificAgent: "Phomopsis vexans (Diaporthe vexans) (Fungus)",
    vegetableType: "Eggplant, Brinjal, Aubergine",
    family: "Solanaceae (Tomato, Potato, Pepper, Eggplant)",
    category: "Fungal",
    typicalSymptoms: [
      "Circular, pale brown sunken spots on fruit expanding into large soft, spongy rots",
      "Concentric rings of tiny black pycnidia pimples covering the rotted eggplant fruit surface",
      "Leaves develop clear circular gray spots with black margins that drop out ('shot-hole')",
      "Stem cankers causing wilting and death of entire fruiting branches",
    ],
    favorableConditions: [
      "Hot, humid weather (28°C - 32°C / 82°F - 90°F) with frequent rain or high sprinkler irrigation",
      "Infected crop debris remaining in soil from prior seasons",
    ],
    organicCure: [
      "Hot water seed treatment at 50°C for 25 minutes prior to nursery sowing",
      "Bio-fungicide spray with Trichoderma harzianum or Bacillus amyloliquefaciens",
      "Prune and destroy infected fruit and twigs immediately",
    ],
    chemicalCure: [
      "Mancozeb (2.5 g/L), Azoxystrobin, or Copper oxychloride protective sprays every 10 days",
    ],
    prevention: [
      "Plant resistant brinjal cultivars (e.g. Florida Market, Pant Samrat)",
      "Rotate with non-solanaceous crops (beans, corn, brassicas) for 3 years",
      "Use drip irrigation to prevent water splashing onto fruit and lower branches",
    ],
    edibilityRisk: "Discard affected fruits. The spongy fruit decay penetrates deeply into the pulp and produces bitter off-flavors.",
    keyVisualSign: "Sunken pale brown fruit craters covered in concentric rings of tiny black pimples.",
  },
  {
    id: "eggplant-bacterial-wilt",
    name: "Bacterial Wilt & Slime Disease of Eggplant",
    scientificAgent: "Ralstonia solanacearum (Bacterium)",
    vegetableType: "Eggplant, Tomato, Potato, Pepper",
    family: "Solanaceae (Tomato, Potato, Pepper, Eggplant)",
    category: "Bacterial",
    typicalSymptoms: [
      "Rapid daytime wilting of green leaves without initial yellowing ('green wilt')",
      "Plants recover temporarily at night but permanently wilt and collapse within 2-4 days",
      "Stem vascular rings turn brown; cutting stem and placing in clear water releases milky white bacterial streaming threads",
      "Pith at stem base becomes water-soaked and dark brown",
    ],
    favorableConditions: [
      "High soil temperatures (>28°C / 82°F) and high soil moisture / flooding",
      "Root-knot nematode feeding providing root infection wounds",
    ],
    organicCure: [
      "Graft susceptible eggplant scions onto resistant wild brinjal rootstocks (Solanum torvum)",
      "Soil drench with Pseudomonas fluorescens or Bacillus subtilis",
      "Uproot and burn diseased plants along with surrounding soil",
    ],
    chemicalCure: [
      "Soil-borne vascular bacteria cannot be eradicated chemically once systemic in plant",
    ],
    prevention: [
      "Solarize nursery beds with clear polyethylene for 6-8 weeks during peak summer",
      "Plant resistant varieties and maintain strict 4-year crop rotation",
    ],
    edibilityRisk: "Mature fruits harvested before plant collapse are safe, though fruit production terminates rapidly.",
    keyVisualSign: "Sudden daytime collapse of lush green foliage and milky white bacterial stream from cut stem.",
  },

  // ==========================================
  // 5. CAULIFLOWER & BROCCOLI (BRASSICA)
  // ==========================================
  {
    id: "cauliflower-curd-brown-rot",
    name: "Curd Brown Rot & Downy Mildew of Cauliflower",
    scientificAgent: "Alternaria brassicicola / Peronospora parasitica (Fungal Complex)",
    vegetableType: "Cauliflower, Broccoli",
    family: "Brassica (Cabbage, Broccoli, Cauliflower, Kale)",
    category: "Fungal",
    typicalSymptoms: [
      "Pinpoint brown to black specks appearing across the white cauliflower curd florets",
      "Specks coalesce into large water-soaked velvety brownish-black decayed patches",
      "Underside of leaves shows white downy felt with yellow angular top patches",
      "Curd develops an unpleasant stale, sulfurous smell and turns mushy",
    ],
    favorableConditions: [
      "Cool, damp, foggy autumn/winter mornings (10°C - 18°C) with prolonged dew on curd",
      "Lack of leaf tying (un-blanched curds exposed to dew and rain)",
    ],
    organicCure: [
      "Tie outer wrapper leaves over young curd (blanching) to shield from rain and sunlight",
      "Spray bio-fungicide Bacillus subtilis (Serenade) or Copper hydroxide",
    ],
    chemicalCure: [
      "Iprodione, Chlorothalonil, or Azoxystrobin applied before curd maturity",
    ],
    prevention: [
      "Plant tolerant hybrid cultivars with strong self-wrapping leaf habits",
      "Water exclusively via ground drip to keep cauliflower curds completely dry",
    ],
    edibilityRisk: "If curd has minor surface brown flecks, pare away 5 mm of surface florets before cooking. If decay is deep and soft, discard.",
    keyVisualSign: "Velvety blackish-brown water-soaked decay patches across white cauliflower curd.",
  },
  {
    id: "cauliflower-bacterial-soft-rot",
    name: "Bacterial Soft Rot & Curd Collapse",
    scientificAgent: "Pectobacterium carotovorum subsp. carotovorum (Bacterium)",
    vegetableType: "Cauliflower, Broccoli, Cabbage",
    family: "Brassica (Cabbage, Broccoli, Cauliflower, Kale)",
    category: "Bacterial",
    typicalSymptoms: [
      "Small water-soaked translucent spots on curd that rapidly turn dark brown and slimy",
      "Curd collapses into a foul-smelling, liquefied, mushy pulp within 24-48 hours",
      "Stem pith becomes hollow, dark brown, and filled with bacterial slime",
    ],
    favorableConditions: [
      "Warm, wet weather (>25°C) with rain or dew settling in the curd crevices",
      "Insect feeding wounds (cabbage loopers, root maggots)",
    ],
    organicCure: [
      "Remove and bag rotting curds immediately — sanitize harvest knives with 70% alcohol",
      "Dust surrounding heads with wood ash or bio-stimulant dry powders",
    ],
    chemicalCure: [
      "Fixed copper bactericide sprays in nursery and early head formation stage",
    ],
    prevention: [
      "Control caterpillars and flea beetles to prevent wounding",
      "Harvest curds only when completely dry in afternoon sun",
    ],
    edibilityRisk: "Unsafe to consume. Bacterial curd breakdown produces foul rotting matter.",
    keyVisualSign: "Liquefied slimy dark brown curd with overpowering rotting odor.",
  },

  // ==========================================
  // 6. RADISH & BEETROOT (ROOT & TUBER)
  // ==========================================
  {
    id: "radish-black-root-rot",
    name: "Black Root Rot & Girdling of Radish",
    scientificAgent: "Aphanomyces raphani (Oomycete)",
    vegetableType: "Radish, Daikon, Turnip, Beetroot",
    family: "Root & Tuber (Carrot, Radish, Beetroot, Turnip)",
    category: "Fungal",
    typicalSymptoms: [
      "Steel-gray to bluish-black discolored bands circling the radish taproot where side roots emerge",
      "Infected root tissue fails to expand, producing a pinched, waist-like constriction (girdling)",
      "Internal radish flesh turns grayish-black and glassy while skin remains intact",
      "Roots crack open radially in heavy soils",
    ],
    favorableConditions: [
      "Warm soil temperatures (20°C - 27°C / 68°F - 80°F) with high soil moisture / waterlogging",
      "Heavy clay soils with poor percolation",
    ],
    organicCure: [
      "Grow radishes on raised sandy beds with excellent rapid drainage",
      "Incorporate bio-fungicide Trichoderma harzianum at seeding",
    ],
    chemicalCure: [
      "Hymexazol or Metalaxyl soil drench at planting time",
    ],
    prevention: [
      "Practice 3-year crop rotation with non-brassica crops",
      "Avoid over-watering; maintain consistent moderate soil moisture",
    ],
    edibilityRisk: "Superficial surface bands can be peeled away. Discard radishes with deep internal black glassy flesh discoloration.",
    keyVisualSign: "Bluish-black horizontal girdling band constricting radish taproot into a pinched waist.",
  },
  {
    id: "radish-cercospora-leaf-spot",
    name: "Cercospora Leaf Spot of Radish & Beetroot",
    scientificAgent: "Cercospora brassicicola / Cercospora beticola (Fungus)",
    vegetableType: "Radish, Beetroot, Swiss Chard",
    family: "Root & Tuber (Carrot, Radish, Beetroot, Turnip)",
    category: "Fungal",
    typicalSymptoms: [
      "Circular to irregular tan-to-gray spots with sharp reddish-brown or purple margins on leaves",
      "Centers of spots become thin, papery, and fall out, giving foliage a shot-hole appearance",
      "Severe leaf blighting reduces taproot sizing and sugar accumulation",
    ],
    favorableConditions: [
      "Warm humid days (24°C - 30°C) with nocturnal dew or rain splash",
    ],
    organicCure: [
      "Copper hydroxide spray at first appearance of spots",
      "Bio-fungicide containing Bacillus amyloliquefaciens every 7-10 days",
    ],
    chemicalCure: [
      "Azoxystrobin, Pyraclostrobin, or Difenoconazole foliar sprays",
    ],
    prevention: [
      "Deeply bury crop residues after harvest; practice 2-3 year rotation",
      "Avoid overhead sprinkler irrigation in late afternoon",
    ],
    edibilityRisk: "Radish and beetroot taproots are 100% safe to eat; trim and discard spotted leafy tops.",
    keyVisualSign: "Tan papery leaf spots with distinct reddish-purple borders and shot-hole centers.",
  },

  // ==========================================
  // 7. ZUCCHINI & SUMMER SQUASH (CUCURBIT)
  // ==========================================
  {
    id: "zucchini-choanephora-rot",
    name: "Choanephora Blossom & Wet Fruit Rot",
    scientificAgent: "Choanephora cucurbitarum (Fungus)",
    vegetableType: "Zucchini, Squash, Pumpkin, Cucumber",
    family: "Cucurbit (Cucumber, Squash, Pumpkin, Zucchini)",
    category: "Fungal",
    typicalSymptoms: [
      "Water-soaked soft rot starting at the blossom end of young zucchini fruits attached to wilted flower petals",
      "Rot advances rapidly toward the stem, consuming the fruit in 24-48 hours into soft mush",
      "Infected fruit is covered by a dense whisker-like beard of silvery-white fungal threads tipped with tiny black pinheads (sporangia)",
    ],
    favorableConditions: [
      "Very high humidity (>90%) with warm to hot temperatures (25°C - 32°C / 77°F - 90°F)",
      "Spent flower blossoms remaining wet and adhering to growing fruit tips",
    ],
    organicCure: [
      "Gently pinch off and remove spent, wilted flower blossoms from fruit tips in morning hours",
      "Mulch beds with dry straw or black plastic to keep zucchini fruit off damp soil",
      "Apply copper hydroxide or bio-fungicide Bacillus subtilis",
    ],
    chemicalCure: [
      "Chlorothalonil or Mancozeb sprays during early bloom and fruit setting",
    ],
    prevention: [
      "Plant on high raised beds with wide spacing for maximum air circulation",
      "Water strictly with drip lines under mulch",
    ],
    edibilityRisk: "Discard affected fruits. The blossom-end wet rot quickly liquefies the interior pulp.",
    keyVisualSign: "Silvery-white whiskery fungal beard tipped with tiny black pinheads on rotting zucchini tip.",
  },
  {
    id: "zucchini-cucumber-mosaic-virus",
    name: "Cucumber Mosaic Virus (CMV) on Squash",
    scientificAgent: "Cucumber Mosaic Virus (Aphid Vector)",
    vegetableType: "Zucchini, Squash, Cucumber, Pepper",
    family: "Cucurbit (Cucumber, Squash, Pumpkin, Zucchini)",
    category: "Viral",
    typicalSymptoms: [
      "Yellow and green mottled mosaic pattern with severe leaf distortion, bubbling, and 'shoestring' leaves",
      "Zucchini fruit develops knobby, wart-like raised green/yellow bumps with distorted shape",
      "Extreme stunting of plant vine growth with shortened bushy internodes",
    ],
    favorableConditions: [
      "High populations of aphid vectors in spring and summer",
    ],
    organicCure: [
      "Control aphid vectors with insecticidal soap, Neem oil, or reflective silver mulch",
      "Remove and destroy infected plants immediately to prevent spread",
    ],
    chemicalCure: [
      "Insecticides targeting aphids: Acetamiprid or Flonicamid",
    ],
    prevention: [
      "Plant CMV-resistant zucchini cultivars (e.g. Dividend, Tigress, Cashflow)",
      "Eradicate perennial broadleaf weeds around field borders",
    ],
    edibilityRisk: "Warty fruit is safe to eat if cooked, though texture is tough and flavor is bland.",
    keyVisualSign: "Knobby wart-like bumps and yellow-green mottled patterns on distorted zucchini fruit.",
  },

  // ==========================================
  // 8. BELL PEPPER & CHILI (SOLANACEAE)
  // ==========================================
  {
    id: "pepper-anthracnose",
    name: "Anthracnose Fruit Rot of Pepper & Chili",
    scientificAgent: "Colletotrichum capsici / Colletotrichum truncatum (Fungus)",
    vegetableType: "Bell Pepper, Chili Pepper, Cayenne, Jalapeño",
    family: "Solanaceae (Tomato, Potato, Pepper)",
    category: "Fungal",
    typicalSymptoms: [
      "Circular or elliptical sunken water-soaked spots on green or ripening pepper pods",
      "Spots enlarge rapidly, turning straw-colored to dark brown with concentric rings",
      "In moist weather, salmon-colored or orange-pink gelatinous spore masses ooze from rings",
      "Multiple spots merge, causing the entire pepper pod to shrivel, dry up, and drop",
    ],
    favorableConditions: [
      "Warm to hot rainy weather (27°C - 32°C) with high humidity (>80%)",
      "Water splashing from rain or overhead sprinklers spreading conidia spores",
    ],
    organicCure: [
      "Foliar spray with Copper oxychloride (3 g/L) + Neem oil (3 ml/L)",
      "Spray bio-control agent Trichoderma harzianum at first flowering",
      "Pick and discard all infected fruit immediately to halt spore spread",
    ],
    chemicalCure: [
      "Fungicide sprays: Azoxystrobin + Difenoconazole, Mancozeb (2.5 g/L), or Tebuconazole",
    ],
    prevention: [
      "Use certified disease-free pepper seeds; treat seeds in hot water (50°C for 25 min)",
      "Rotate with non-solanaceous crops (sweet corn, brassicas, beans) for 3 years",
      "Use black plastic mulch and drip irrigation to eliminate rain soil splash",
    ],
    edibilityRisk: "Discard pods with active anthracnose rots; the lesions produce bitter off-flavors and secondary decay.",
    keyVisualSign: "Sunken concentric circular rings with salmon-orange spore droplets on pepper fruit wall.",
  },

  // ==========================================
  // 9. CABBAGE & BROCCOLI (BRASSICA)
  // ==========================================
  {
    id: "cabbage-black-rot",
    name: "Black Rot of Crucifers",
    scientificAgent: "Xanthomonas campestris pv. campestris (Bacterium)",
    vegetableType: "Cabbage, Cauliflower, Broccoli, Kale, Brussels Sprouts",
    family: "Brassica (Cabbage, Broccoli, Cauliflower)",
    category: "Bacterial",
    typicalSymptoms: [
      "V-shaped chlorotic yellow lesions starting at leaf margins with wide end facing outward",
      "Leaf veins inside the yellow patch turn distinctly black and netted",
      "Stem vascular bundles turn black when cut in cross-section",
      "Heads fail to form or develop foul internal decay in storage",
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
  {
    id: "cabbage-clubroot",
    name: "Clubroot of Brassicas",
    scientificAgent: "Plasmodiophora brassicae (Soil-borne Protist)",
    vegetableType: "Cabbage, Cauliflower, Broccoli, Turnip, Radish",
    family: "Brassica (Cabbage, Broccoli, Cauliflower)",
    category: "Fungal",
    typicalSymptoms: [
      "Plants wilt during warm sunny days and recover partially at night",
      "Foliage becomes pale green, yellowish, or purplish with severely stunted growth",
      "Roots develop massive swollen, distorted, spindle-shaped club-like galls and tumors",
      "Clubbed roots decay into dark, foul-smelling mush releasing millions of resting spores into soil",
    ],
    favorableConditions: [
      "Acidic soils (pH < 6.5) with poor drainage and high soil moisture",
      "Warm soil temperatures (20°C - 25°C)",
    ],
    organicCure: [
      "Raise soil pH to 7.2 - 7.5 by incorporating agricultural hydrated lime 6-8 weeks before planting",
      "Incorporate bio-fungicide (Trichoderma virens) into transplant holes",
    ],
    chemicalCure: [
      "Fluazinam (Omega) or Cyazofamid drench at transplanting",
    ],
    prevention: [
      "Test soil pH and maintain above 7.2 in brassica beds",
      "Improve field drainage and avoid planting in low-lying soggy plots",
      "Clean tractor tires and farm boots to prevent transferring infested mud to clean fields",
    ],
    edibilityRisk: "Edible if head forms before plant collapse, but roots must be discarded and soil sanitized.",
    keyVisualSign: "Distorted club-like swollen root tumors and daytime foliage wilting.",
  },

  // ==========================================
  // 10. CARROT (APIACEAE)
  // ==========================================
  {
    id: "carrot-cavity-spot",
    name: "Cavity Spot & Root Dieback",
    scientificAgent: "Pythium sulcatum / Pythium violae (Oomycete)",
    vegetableType: "Carrot, Parsnip",
    family: "Root & Tuber (Carrot, Radish, Beet)",
    category: "Fungal",
    typicalSymptoms: [
      "Small (2-5 mm), elliptical, horizontal sunken lesions developing across the carrot taproot",
      "Lesions initially appear as light brown water-soaked pinheads that expand into dark brown cavities",
      "Cavities are shallow with ruptured root skin resembling a horizontal slit",
      "Secondary rots (fungal or bacterial) enter through cavities in wet soil or storage",
    ],
    favorableConditions: [
      "Waterlogged, compacted soils with high soil moisture (>80% field capacity)",
      "Cool to moderate soil temperatures (10°C - 18°C / 50°F - 64°F)",
      "High soil acidity (pH < 6.0)",
    ],
    organicCure: [
      "Apply agricultural lime to raise soil pH to 7.0 - 7.5 (Pythium activity drops sharply in neutral/alkaline soil)",
      "Incorporate composted bio-control fungi (Trichoderma) at seeding",
    ],
    chemicalCure: [
      "Mefenoxam (Ridomil Gold) or Metalaxyl applied in-furrow at planting time",
    ],
    prevention: [
      "Plant carrots on deep raised beds (at least 20-30 cm high) to ensure rapid drainage",
      "Avoid planting in fields with a history of cavity spot for at least 3-4 years",
      "Harvest carrots promptly once mature; do not leave in wet cold soil",
    ],
    edibilityRisk: "Carrots with cavity spot are 100% safe to eat once peeled, as the lesions are strictly superficial on the outer cortex.",
    keyVisualSign: "Horizontal elliptical sunken crater slits across the orange carrot taproot.",
  },
  {
    id: "carrot-alternaria-blight",
    name: "Alternaria Leaf Blight of Carrot",
    scientificAgent: "Alternaria dauci (Fungus)",
    vegetableType: "Carrot, Parsnip, Celery",
    family: "Root & Tuber (Carrot, Radish, Beet)",
    category: "Fungal",
    typicalSymptoms: [
      "Small, dark brown-to-black spots with yellow halos appearing along leaf margins of older leaves",
      "Leaflets curl, turn completely brown, and dry up giving foliage a burned, scorched appearance",
      "Petioles (leaf stalks) develop elongated brown lesions causing whole leaves to snap during mechanical top-lifting",
      "Stunted taproot size due to loss of photosynthetic leaf canopy",
    ],
    favorableConditions: [
      "Warm, humid weather (20°C - 28°C) with frequent showers or heavy dew",
      "Dense carrot foliage canopy trapping moisture",
    ],
    organicCure: [
      "Copper hydroxide spray applied at first symptom appearance",
      "Bio-fungicide containing Bacillus amyloliquefaciens every 7-10 days",
    ],
    chemicalCure: [
      "Azoxystrobin + Difenoconazole, Chlorothalonil, or Iprodione foliar sprays",
    ],
    prevention: [
      "Plant resistant carrot cultivars (e.g., Bolero, Maestro, Romance)",
      "Treat carrot seed with hot water (50°C for 20 minutes)",
      "Use wide row spacing to maximize airflow through the leaf canopy",
    ],
    edibilityRisk: "Carrot taproots are completely safe and edible; simply trim away the blighted green tops.",
    keyVisualSign: "Brown burned leaf margins and snapped petioles giving foliage a fire-scorched look.",
  },

  // ==========================================
  // 11. OKRA & BHINDI (MALVACEAE)
  // ==========================================
  {
    id: "okra-yellow-vein-mosaic",
    name: "Yellow Vein Mosaic Virus (YVMV) of Okra",
    scientificAgent: "Bhendi yellow vein mosaic virus (Vector: Bemisia tabaci / Whitefly)",
    vegetableType: "Okra, Bhindi, Ladyfinger",
    family: "Malvaceae (Okra, Hibiscus)",
    category: "Viral",
    typicalSymptoms: [
      "Network of bright yellow veins interlaced with green leaf tissues ('yellow vein network')",
      "Complete chlorosis/yellowing of leaf blades in advanced stage",
      "Okra pods become stunted, fibrous, yellowish-white, and tough",
      "Severe stunting of young plants with minimal fruit yield",
    ],
    favorableConditions: [
      "Warm, dry weather favoring high whitefly populations (28°C - 35°C)",
      "Continuous cropping of okra or nearby infected weeds",
    ],
    organicCure: [
      "Install yellow sticky traps (15-20 traps per acre) to monitor and capture whiteflies",
      "Spray 5% Neem seed kernel extract (NSKE) or insecticidal soap weekly",
      "Rogue out and bury virus-infected plants as soon as initial vein clearing appears",
    ],
    chemicalCure: [
      "Seed treatment with Imidacloprid (5 g/kg seed) followed by foliar sprays of Acetamiprid or Spiromesifen",
    ],
    prevention: [
      "Sow YVMV-resistant varieties (e.g. Parbhani Kranti, Arka Anamika, Pusa Sawani)",
      "Maintain 3-4 buffer rows of maize or pearl millet as barrier crops",
    ],
    edibilityRisk: "Discolored tough pods are non-toxic, but too fibrous and woody for culinary use. Harvest uninfected tender green pods.",
    keyVisualSign: "Bright golden-yellow vein network standing out sharply against green leaf blades.",
  },
  {
    id: "okra-powdery-mildew",
    name: "Okra Powdery Mildew",
    scientificAgent: "Erysiphe cichoracearum (Fungus)",
    vegetableType: "Okra, Ladyfinger",
    family: "Malvaceae (Okra, Hibiscus)",
    category: "Fungal",
    typicalSymptoms: [
      "White powdery circular patches on both surfaces of older leaves and stems",
      "Leaves turn yellowish, dry up, turn brown, and drop prematurely",
      "Fruit production is reduced due to rapid defoliation",
    ],
    favorableConditions: [
      "Warm days (22°C - 30°C) with dry atmospheric humidity and cool nights",
    ],
    organicCure: [
      "Wettable sulfur (2 g/L) or Potassium bicarbonate (3 g/L) foliar spray",
      "Bio-fungicide containing Bacillus subtilis (Serenade)",
    ],
    chemicalCure: [
      "Hexaconazole (1 ml/L), Dinocap, or Azoxystrobin protective sprays",
    ],
    prevention: [
      "Maintain adequate plant spacing (60 x 30 cm) for air flow",
      "Avoid overhead sprinkler irrigation in late afternoon",
    ],
    edibilityRisk: "Okra pods are safe to eat; fungi primarily infect leaf blades and stems.",
    keyVisualSign: "Talcum powdery white patches covering okra leaf surfaces and petioles.",
  },

  // ==========================================
  // 12. CUCUMBER & ZUCCHINI (CUCURBITACEAE)
  // ==========================================
  {
    id: "cucurbit-powdery-mildew",
    name: "Cucurbit Powdery Mildew",
    scientificAgent: "Podosphaera xanthii / Golovinomyces cichoracearum (Fungus)",
    vegetableType: "Cucumber, Zucchini, Squash, Pumpkin, Watermelon",
    family: "Cucurbit (Cucumber, Zucchini, Melon)",
    category: "Fungal",
    typicalSymptoms: [
      "Circular white talcum-powder-like spots on upper and lower surfaces of leaves and stems",
      "Spots rapidly enlarge and coalesce until entire leaves are blanketed in white powdery felt",
      "Infected leaves turn chlorotic yellow, become brittle, brown, and die prematurely",
      "Fruits suffer sunburn and poor flavor/sugar content due to loss of leaf canopy shade",
    ],
    favorableConditions: [
      "Warm temperatures (20°C - 28°C) with dense shading and moderate-to-high relative humidity (50-90%)",
      "Overcrowded vine planting and greenhouse environments",
    ],
    organicCure: [
      "Potassium bicarbonate (3-5 g/L) + horticultural oil spray (effective eradicant)",
      "Neem oil (5 ml/L) spray applied in the evening",
      "Bio-fungicide containing Bacillus amyloliquefaciens (Double Nickel / Serenade)",
    ],
    chemicalCure: [
      "Myclobutanil, Trifloxystrobin, Cyflufenamid, or Penthiopyrad applied at first white spot",
    ],
    prevention: [
      "Plant mildew-resistant cucumber and squash hybrids",
      "Trellis vines vertically to enhance sun penetration and air movement",
      "Avoid excess nitrogen fertilization which creates overly lush, susceptible foliage",
    ],
    edibilityRisk: "Cucumber and zucchini fruits are completely safe to eat; the fungus primarily targets foliage. Harvest promptly before sunscald occurs.",
    keyVisualSign: "Fluffy white talcum powder dust coating green leaves like snow.",
  },
  {
    id: "cucurbit-downy-mildew",
    name: "Cucurbit Downy Mildew",
    scientificAgent: "Pseudoperonospora cubensis (Oomycete)",
    vegetableType: "Cucumber, Cantaloupe, Melon, Squash",
    family: "Cucurbit (Cucumber, Zucchini, Melon)",
    category: "Fungal",
    typicalSymptoms: [
      "Bright yellow angular chlorotic spots on upper leaf surfaces, strictly bounded by leaf veins (checkerboard mosaic)",
      "Purplish-gray or dark brownish downy spore felt visible on the leaf undersides in humid mornings",
      "Yellow angular spots quickly turn necrotic brown, curl upwards, and crispy brown leaf collapse occurs in days",
      "Vines defoliate with alarming speed ('wildfire disease')",
    ],
    favorableConditions: [
      "Cool to warm temperatures (15°C - 22°C) with extended leaf wetness from fog, dew, or rain (>6 hours)",
    ],
    organicCure: [
      "Copper hydroxide or copper octanoate applied preventively before rain events",
      "Bio-fungicide with Bacillus subtilis or Trichoderma",
      "Prune out heavily infected lower leaves immediately",
    ],
    chemicalCure: [
      "Fluopicolide + Mancozeb, Cyazofamid, Propamocarb hydrochloride, or Mandipropamid",
    ],
    prevention: [
      "Plant downy mildew tolerant cultivars (e.g., SV3462CS, Citadel, Peacemaker)",
      "Water crops only in the early morning using drip irrigation to ensure foliage dries quickly",
      "Monitor regional downy mildew forecasting alerts and apply protective fungicides before spore arrival",
    ],
    edibilityRisk: "Cucumber fruits remain edible and safe if harvested before plant collapse, though fruit sugar and yield are reduced.",
    keyVisualSign: "Angular yellow checkerboard spots bounded sharply by leaf veins with purplish spores beneath.",
  },

  // --- ADDITIONAL EXTENSIVE DISEASES PER RECOGNIZED CROP PATH ---

  // ONION & ALLIUM PATH
  {
    id: "onion-fusarium-basal-rot",
    name: "Fusarium Basal Plate Rot & Bulb Decay",
    scientificAgent: "Fusarium oxysporum f. sp. cepae (Soil Fungus)",
    vegetableType: "Onion, Garlic, Shallots",
    family: "Allium (Onion, Garlic, Leek)",
    category: "Fungal",
    typicalSymptoms: [
      "Foliage yellowing and tip dieback starting from oldest leaves, advancing downwards",
      "Basal plate (root plate) becomes spongy, water-soaked, and develops brownish-pink rot",
      "White to light pink cottony fungal mycelium visible between scales at the bulb base",
      "Roots turn brown, rot away completely, allowing bulb to be pulled from soil with zero resistance",
    ],
    favorableConditions: [
      "High soil temperatures (25°C - 32°C / 77°F - 90°F)",
      "Continuous allium cropping without multi-year rotation",
      "Root feeding wounds caused by onion maggots or nematodes",
    ],
    organicCure: [
      "Drench planting furrows with Trichoderma harzianum or Bacillus subtilis bio-fungicide",
      "Solarize garden soil with clear plastic sheets for 6-8 weeks during peak summer before planting",
    ],
    chemicalCure: [
      "Bulb seed dipping in Carbendazim (0.1%) or Fludioxonil before sowing",
      "Fungicide drench with Azoxystrobin or Thiophanate-methyl",
    ],
    prevention: [
      "Mandatory 4 to 5 year crop rotation away from allium species",
      "Plant fusarium-resistant onion hybrids",
      "Control onion root maggots early to prevent root wound entry",
    ],
    edibilityRisk: "Discard bulbs with basal decay; the fungus produces bitter mycotoxins and triggers complete bulb collapse.",
    keyVisualSign: "Pinkish-white fungal mold at the basal root plate with easily detached roots.",
  },
  {
    id: "onion-translucent-scale",
    name: "Translucent Scale & Storage Scald",
    scientificAgent: "Physiological / Post-Harvest Heat & Delay in Cooling",
    vegetableType: "Onion, Garlic",
    family: "Allium (Onion, Garlic, Leek)",
    category: "Storage Disorder",
    typicalSymptoms: [
      "Outer 1 to 3 fleshy scales appear water-soaked, grayish-yellow, and translucent (glassy look)",
      "Resembles frost or freezing injury without any bacterial odor",
      "Affected scales soften and can develop secondary fungal mold if kept in warm storage",
    ],
    favorableConditions: [
      "Delayed cold storage: bulbs kept at high temperatures (>30°C) for 2+ weeks after field curing",
      "High relative humidity coupled with stagnant air during transit or curing",
      "Excessive nitrogen application prior to harvest",
    ],
    organicCure: [
      "Immediately peel away and use or compost the glassy translucent outer layers",
      "Rapidly transfer remaining intact bulbs to dry, well-ventilated cool storage",
    ],
    chemicalCure: [
      "Non-pathogenic physiological disorder — chemical pesticides not applicable",
    ],
    prevention: [
      "Move cured onions promptly into 0°C - 2°C storage with 65-70% RH",
      "Avoid rough handling and direct high-temperature sun exposure after initial curing",
    ],
    edibilityRisk: "100% safe to eat. Peel away the translucent outer fleshy layer; inner core rings are crisp, flavorful, and safe.",
    keyVisualSign: "Water-soaked glassy translucent outer flesh scale without foul bacterial smell.",
  },

  // TOMATO PATH
  {
    id: "tomato-septoria-leaf-spot",
    name: "Septoria Leaf Spot of Tomato",
    scientificAgent: "Septoria lycopersici (Fungus)",
    vegetableType: "Tomato",
    family: "Solanaceae (Tomato, Potato, Pepper)",
    category: "Fungal",
    typicalSymptoms: [
      "Numerous small (2-3 mm) circular spots with grayish-white centers and dark brown margins",
      "Tiny black specks (pycnidia fruiting bodies) visible inside the center of mature spots with a hand lens",
      "Severe bottom-up leaf yellowing and rapid defoliation exposing green tomatoes to sunscald",
    ],
    favorableConditions: [
      "Moderate warm temperatures (20°C - 26°C / 68°F - 78°F) with prolonged high humidity and rain splash",
      "Dense unpruned plant foliage touching the ground",
    ],
    organicCure: [
      "Copper octanoate or liquid copper fungicide sprayed every 7-10 days",
      "Prune all lower leaves up to 18 inches off the ground",
    ],
    chemicalCure: [
      "Chlorothalonil (2 g/L), Mancozeb, or Azoxystrobin foliar spray",
    ],
    prevention: [
      "Mulch soil under tomatoes with straw or woodchips to block spore splash",
      "Stake or cage vines vertically; water exclusively at soil level",
    ],
    edibilityRisk: "Tomato fruits remain 100% safe and uninfected as Septoria strictly attacks leaves and stems.",
    keyVisualSign: "Small circular spots with white centers and tiny black pepper-grain dots inside.",
  },
  {
    id: "tomato-bacterial-canker",
    name: "Bacterial Canker & Bird's Eye Spot",
    scientificAgent: "Clavibacter michiganensis subsp. michiganensis (Bacterium)",
    vegetableType: "Tomato",
    family: "Solanaceae (Tomato, Potato, Pepper)",
    category: "Bacterial",
    typicalSymptoms: [
      "One-sided wilting of leaf leaflets (unilateral wilting) during daytime",
      "Leaves develop browning along margins ('marginal leaf scorch')",
      "Stems develop open brown canker splits with yellowish-brown pith inside",
      "Green and ripe fruits develop small white blister spots with dark brown centers ('bird's eye spots')",
    ],
    favorableConditions: [
      "Warm temperatures (24°C - 28°C) with overhead irrigation and mechanical pruning wounds",
    ],
    organicCure: [
      "Immediately remove and bag infected plants to protect healthy neighbors",
      "Disinfect pruning shears in 70% alcohol or 10% bleach between every single plant",
    ],
    chemicalCure: [
      "Copper hydroxide + Mancozeb protective sprays during early vegetative growth",
    ],
    prevention: [
      "Use certified pathogen-free seeds; treat seed with hot water (50°C for 25 min)",
      "Never prune tomato plants while leaves are wet with dew or rain",
    ],
    edibilityRisk: "Fruits with bird's eye spots are safe to eat after peeling or washing, though fruit quality is reduced.",
    keyVisualSign: "White blister spots on tomato skin with dark brown centers resembling miniature bird eyes.",
  },
  {
    id: "tomato-yellow-leaf-curl",
    name: "Tomato Yellow Leaf Curl Virus (TYLCV)",
    scientificAgent: "Begomovirus (Transmitted by Whitefly Bemisia tabaci)",
    vegetableType: "Tomato, Pepper",
    family: "Solanaceae (Tomato, Potato, Pepper)",
    category: "Viral",
    typicalSymptoms: [
      "Severe upward cupping and curling of young leaves",
      "Interveinal chlorosis with bright yellow or pale green leaf margins",
      "Severe stunting of plant bushy growth with shortened internodes",
      "Massive flower blossom drop resulting in near-zero fruit set",
    ],
    favorableConditions: [
      "Warm tropical and subtropical climates with high whitefly insect populations",
    ],
    organicCure: [
      "Spray insecticidal soap, Neem oil, or Beauveria bassiana bio-insecticide to suppress whiteflies",
      "Install yellow sticky traps across the greenhouse/garden canopy",
    ],
    chemicalCure: [
      "Systemic insecticides targeting whitefly vectors: Acetamiprid, Imidacloprid, or Spirotetramat",
    ],
    prevention: [
      "Plant TYLCV-resistant tomato cultivars (e.g. Tygress, Invictus)",
      "Use fine mesh insect netting (50-mesh) on greenhouse vents",
    ],
    edibilityRisk: "Any fruit that forms is completely safe to eat; plant viruses do not infect humans.",
    keyVisualSign: "Crumpled upward-curled leaves with yellow margins and severely stunted bushy growth.",
  },

  // POTATO PATH
  {
    id: "potato-hollow-heart",
    name: "Hollow Heart & Internal Brown Spot",
    scientificAgent: "Physiological / Rapid Tuber Expansion & Moisture Surges",
    vegetableType: "Potato",
    family: "Solanaceae (Tomato, Potato, Pepper)",
    category: "Physiological/Abiotic",
    typicalSymptoms: [
      "Exterior tuber looks perfectly normal, smooth, and healthy",
      "When sliced open, an irregular star-shaped or lens-shaped hollow cavity is found in center",
      "Cavity wall is lined with dry, light brown, corky, healing periderm tissue",
      "No bacterial odor, slime, or liquid decay present",
    ],
    favorableConditions: [
      "Rapid tuber growth following heavy irrigation or rain after an extended dry spell",
      "Excessive nitrogen fertilizer promoting oversized tubers",
      "Wide spacing between potato plants allowing giant tuber development",
    ],
    organicCure: [
      "Maintain strict uniform soil moisture via timed drip irrigation",
      "Avoid sudden heavy nitrogen top-dressing after tuber initiation",
    ],
    chemicalCure: [
      "Non-parasitic physiological disorder — fungicides/pesticides not applicable",
    ],
    prevention: [
      "Plant seed pieces closer together (20-25 cm) to encourage uniform medium tuber sizing",
      "Split nitrogen fertilizer into multiple small applications rather than one heavy dose",
    ],
    edibilityRisk: "100% safe to eat. The internal cavity is sterile cork; simply cut around it and cook normally.",
    keyVisualSign: "Star-shaped dry hollow brown cavity inside the center of an otherwise healthy potato.",
  },
  {
    id: "potato-soft-rot-blackleg",
    name: "Bacterial Blackleg & Tuber Soft Rot",
    scientificAgent: "Pectobacterium atrosepticum / Dickeya dadantii (Bacterium)",
    vegetableType: "Potato",
    family: "Solanaceae (Tomato, Potato, Pepper)",
    category: "Bacterial",
    typicalSymptoms: [
      "Lower stem turns inky-black, slimy, and rots from the seed tuber upward ('blackleg')",
      "Foliage wilts, leaves roll upward, turn yellow, and entire plant collapses",
      "Tubers develop cream-colored to tan water-soaked soft rot that turns slimy with a pungent sulfurous odor",
    ],
    favorableConditions: [
      "Cool, wet soils at planting followed by warm weather (>20°C / 68°F)",
      "Poorly ventilated, wet storage bins without wound curing",
    ],
    organicCure: [
      "Cull and destroy rotted tubers; never wash potatoes before storage unless they can be dried immediately with forced air",
      "Disinfect seed cutting blades and potato bins with 10% bleach",
    ],
    chemicalCure: [
      "Streptomycin seed piece treatment where registered; copper sprays in field",
    ],
    prevention: [
      "Plant whole certified seed tubers instead of cut pieces to prevent entry wounds",
      "Ensure potato storage has continuous forced air circulation at 4°C - 8°C",
    ],
    edibilityRisk: "Strictly unsafe to eat. Bacterial soft rot completely liquefies flesh with foul decay.",
    keyVisualSign: "Inky-black slimy lower stem and foul-smelling liquefied tuber flesh.",
  },

  // SPINACH & LEAFY GREENS PATH
  {
    id: "spinach-downy-mildew",
    name: "Downy Mildew (Blue Mold) of Spinach",
    scientificAgent: "Peronospora effusa (Oomycete)",
    vegetableType: "Spinach, Swiss Chard",
    family: "Leafy Greens (Spinach, Lettuce, Chard)",
    category: "Fungal",
    typicalSymptoms: [
      "Dull chlorotic yellow patches on the upper surface of spinach leaves",
      "Dense, purplish-gray to violet-black downy felt sporulation on leaf undersides",
      "Leaves curl downward, become puckered, yellow, and rot rapidly after harvest",
      "Entire plant can become stunted and unmarketable within days",
    ],
    favorableConditions: [
      "Cool, damp, overcast conditions (10°C - 18°C / 50°F - 64°F) with high relative humidity (>85%)",
      "Overhead sprinkler irrigation or morning dew persisting on foliage",
    ],
    organicCure: [
      "Preventive sprays with Copper hydroxide or Copper octanoate",
      "Bio-fungicide containing Bacillus subtilis (Serenade) or Streptomyces",
      "Harvest early in the morning only when dew has dried completely",
    ],
    chemicalCure: [
      "Mandipropamid, Oxathiapiprolin, or Cyazofamid foliar sprays",
    ],
    prevention: [
      "Plant resistant spinach hybrids (races 1-19 resistant varieties)",
      "Avoid overhead watering; use wide plant spacing for rapid air circulation",
      "Practice 2-3 year crop rotation away from Chenopodiaceae",
    ],
    edibilityRisk: "Discard leaves with active violet downy felt; unaffected young leaves are safe after thorough washing.",
    keyVisualSign: "Yellow upper leaf patches with dense purplish-violet downy felt underneath.",
  },
  {
    id: "spinach-anthracnose",
    name: "Anthracnose & Leaf Spot of Spinach",
    scientificAgent: "Colletotrichum dematium f. sp. spinaciae (Fungus)",
    vegetableType: "Spinach, Lettuce, Swiss Chard",
    family: "Leafy Greens (Spinach, Lettuce, Chard)",
    category: "Fungal",
    typicalSymptoms: [
      "Small, circular, water-soaked spots on leaves expanding into papery tan to whitish lesions",
      "Lesions dry up, become brittle, and glass-like centers crack or drop out",
      "Tiny black spiny fungal hairs (setae) visible in lesion centers with a hand lens",
    ],
    favorableConditions: [
      "Warm, wet weather (20°C - 28°C / 68°F - 82°F) accompanied by rain splash",
    ],
    organicCure: [
      "Copper hydroxide spray applied at first symptom appearance",
      "Remove and bag blighted outer leaves immediately",
    ],
    chemicalCure: [
      "Azoxystrobin, Pyraclostrobin, or Chlorothalonil foliar sprays",
    ],
    prevention: [
      "Use certified pathogen-free seed; hot water seed treatment (50°C for 25 min)",
      "Drip irrigation to keep spinach foliage dry",
    ],
    edibilityRisk: "Safe to eat. Discard spotted leaves and wash remaining crisp leaves thoroughly.",
    keyVisualSign: "Papery whitish circular leaf spots with tiny black spiny hairs in the center.",
  },

  // BELL PEPPER PATH
  {
    id: "pepper-bacterial-spot",
    name: "Bacterial Spot of Pepper & Tomato",
    scientificAgent: "Xanthomonas euvesicatoria / Xanthomonas perforans (Bacterium)",
    vegetableType: "Bell Pepper, Chili, Tomato",
    family: "Solanaceae (Tomato, Potato, Pepper)",
    category: "Bacterial",
    typicalSymptoms: [
      "Small (1-3 mm), water-soaked angular spots on leaves turning dark brown with pale halos",
      "Severe premature leaf drop giving plants a bare, skeletonized look",
      "Pepper pods develop raised, rough, wart-like brown or black blister scabs (2-5 mm)",
      "Cracked fruit scabs allow secondary soft rot fungi to enter",
    ],
    favorableConditions: [
      "Warm, wet weather (24°C - 30°C) with driving rain or overhead sprinkler irrigation",
    ],
    organicCure: [
      "Preventive sprays of Copper hydroxide + bio-stimulants",
      "Prune and destroy severely spotted lower branches",
    ],
    chemicalCure: [
      "Fixed copper bactericide mixed with Mancozeb (boosts copper efficacy) every 7-10 days",
    ],
    prevention: [
      "Plant bacterial spot resistant pepper varieties (races 1-10 resistant hybrids)",
      "Soak seed in 20% household bleach solution for 1 minute or hot water (50°C for 25 min)",
    ],
    edibilityRisk: "Safe to eat. Peel or slice away the rough surface scabs; flesh underneath is unharmed.",
    keyVisualSign: "Raised rough wart-like blister scabs on pepper skin and angular leaf spots with yellow halos.",
  },

  // CABBAGE & BRASSICA PATH
  {
    id: "cabbage-diamondback-moth",
    name: "Diamondback Moth & Caterpillar Damage",
    scientificAgent: "Plutella xylostella (Lepidopteran Pest)",
    vegetableType: "Cabbage, Cauliflower, Broccoli, Kale, Brussels Sprouts",
    family: "Brassica (Cabbage, Broccoli, Cauliflower)",
    category: "Insect/Pest",
    typicalSymptoms: [
      "Small green caterpillars feeding on the lower leaf surface, leaving upper cuticle intact ('windowpane feeding')",
      "Leaves become riddled with hundreds of small irregular shot-holes",
      "Cabbage heads fail to form or are contaminated with dark green frass pellets and silky cocoons",
    ],
    favorableConditions: [
      "Hot, dry weather which accelerates moth life cycle (one generation every 10-14 days)",
    ],
    organicCure: [
      "Spray Bacillus thuringiensis (Bt var. kurstaki @ 2 g/L) in evening hours",
      "Apply Spinosad or Neem-based Azadirachtin spray",
    ],
    chemicalCure: [
      "Chlorantraniliprole, Emamectin benzoate, or Flubendiamide",
    ],
    prevention: [
      "Install fine insect exclusion netting over brassica seedlings from day one",
      "Intercrop with trap crops such as Indian mustard or collards",
    ],
    edibilityRisk: "100% safe to eat. Strip damaged outer leaves and soak cabbage in salty water to remove any residual larvae.",
    keyVisualSign: "Windowpane translucent leaf holes and small pale green wriggling caterpillars.",
  },

  // CARROT PATH
  {
    id: "carrot-root-knot-nematode",
    name: "Root-Knot Nematode Galls & Forking",
    scientificAgent: "Meloidogyne hapla (Microscopic Roundworm)",
    vegetableType: "Carrot, Parsnip, Radish",
    family: "Root & Tuber (Carrot, Radish, Beet)",
    category: "Insect/Pest",
    typicalSymptoms: [
      "Stunted, forked, twisted, multi-legged, and hairy taproots",
      "Small bead-like swellings and knobby galls on feeder side-roots",
      "Aboveground foliage shows yellowing, stunting, and daytime wilting during heat",
    ],
    favorableConditions: [
      "Sandy, well-aerated, warm soils (>18°C / 64°F)",
    ],
    organicCure: [
      "Incorporate French marigold (Tagetes patula) or bio-fumigant mustard into soil prior to planting",
      "Apply beneficial bio-nematicide Paecilomyces lilacinus or Purpureocillium",
    ],
    chemicalCure: [
      "Fluopyram (Velum Prime) or Oxamyl applied pre-planting",
    ],
    prevention: [
      "Practice 3-year crop rotation with non-host cereals or corn",
      "Solarize sandy beds with clear plastic mulch during midsummer",
    ],
    edibilityRisk: "100% safe to eat. The knobby forked shape is cosmetic; peel, trim, and enjoy.",
    keyVisualSign: "Distorted forked multi-legged carrot root with tiny knobby bead galls on side roots.",
  },

  // OKRA PATH
  {
    id: "okra-cercospora-leaf-spot",
    name: "Cercospora Leaf Spot & Blight of Okra",
    scientificAgent: "Cercospora malayensis / Cercospora abelmoschi (Fungus)",
    vegetableType: "Okra, Bhindi",
    family: "Malvaceae (Okra, Hibiscus)",
    category: "Fungal",
    typicalSymptoms: [
      "Brown irregular sooty patches on the lower surface of older leaves",
      "Corresponding upper surface turns yellowish, dries up, and drops prematurely",
      "Severe defoliation reduces the number of flower flushes and pod yield",
    ],
    favorableConditions: [
      "Warm, humid weather (25°C - 32°C) with frequent showers or high dew",
    ],
    organicCure: [
      "Copper hydroxide spray at first sign of leaf spots",
      "Bio-fungicide containing Bacillus subtilis every 10 days",
    ],
    chemicalCure: [
      "Carbendazim (1 g/L), Mancozeb (2.5 g/L), or Azoxystrobin foliar spray",
    ],
    prevention: [
      "Burn or deeply plow under crop residues after harvest",
      "Maintain wider spacing for canopy aeration",
    ],
    edibilityRisk: "Okra pods are 100% edible and safe. Wash pods thoroughly before cooking.",
    keyVisualSign: "Sooty brownish-gray fungal patches on okra leaf undersides with early leaf fall.",
  },

  // CUCUMBER PATH
  {
    id: "cucurbit-anthracnose",
    name: "Anthracnose of Cucurbits",
    scientificAgent: "Colletotrichum orbiculare (Fungus)",
    vegetableType: "Cucumber, Watermelon, Cantaloupe, Zucchini",
    family: "Cucurbit (Cucumber, Zucchini, Melon)",
    category: "Fungal",
    typicalSymptoms: [
      "Circular brown-to-reddish spots on leaves that dry up and shatter, giving leaves a 'shot-hole' look",
      "Elongated sunken water-soaked streaks on stems and petioles",
      "Circular, sunken, saucer-like water-soaked craters on cucumber fruit skin",
      "Under moist conditions, pinkish-orange salmon spore droplets ooze from center of craters",
    ],
    favorableConditions: [
      "Warm temperatures (22°C - 28°C / 72°F - 82°F) accompanied by frequent rain or overhead sprinkler watering",
    ],
    organicCure: [
      "Spray Copper hydroxide or Bordeaux mixture every 7-10 days during rainy weather",
      "Apply bio-fungicide Bacillus amyloliquefaciens at first fruit set",
    ],
    chemicalCure: [
      "Chlorothalonil (2 g/L), Azoxystrobin, or Mancozeb protective foliar sprays",
    ],
    prevention: [
      "Use certified disease-free seeds; rotate crops for 2-3 years away from cucurbits",
      "Trellis cucumbers and use drip irrigation to keep fruit and leaves dry",
    ],
    edibilityRisk: "Trim shallow surface lesions; discard cucumber if deep soft fungal rot has invaded seed cavity.",
    keyVisualSign: "Sunken saucer-like craters on cucumber skin oozing salmon-pink spore droplets.",
  },
];

// ==========================================
// RECOGNIZED CROP PATH KNOWLEDGE MATRIX
// ==========================================

export interface RecognizedCropInfo {
  cropKey: string;
  displayName: string;
  scientificName: string;
  family: string;
  category: "Vegetable" | "Fruit";
  iconName: string;
  description: string;
  problems: EncyclopediaDisease[];
  storageBlueprint: {
    optimalTemperature: string;
    optimalHumidity: string;
    shelfLifeDays: string;
    ethyleneSensitivity: "High" | "Medium" | "Low" | "Producer";
    curingAdvice: string;
  };
  cultivationGuide: {
    idealSoilPh: string;
    sunRequirement: string;
    wateringMethod: string;
    rotationInterval: string;
    companionPlants: string[];
  };
}

export const CROP_PROFILES: Record<string, Omit<RecognizedCropInfo, "problems">> = {
  onion: {
    cropKey: "onion",
    displayName: "Onion & Alliums",
    scientificName: "Allium cepa",
    family: "Allium (Onion, Garlic, Leek)",
    category: "Vegetable",
    iconName: "Layers",
    description: "Bulbous biennial crop sensitive to curing duration, storage humidity, and neck rot pathogens.",
    storageBlueprint: {
      optimalTemperature: "0°C - 4°C (32°F - 40°F)",
      optimalHumidity: "65% - 70% RH",
      shelfLifeDays: "90 - 210 days (if cured properly)",
      ethyleneSensitivity: "Medium",
      curingAdvice: "Sun-dry or heat-cure (30°C) for 10-14 days until neck is completely paper-dry and closed.",
    },
    cultivationGuide: {
      idealSoilPh: "6.0 - 6.8",
      sunRequirement: "Full Sun (12-14 hours)",
      wateringMethod: "Drip irrigation; stop watering 2-3 weeks before harvest",
      rotationInterval: "4 Years",
      companionPlants: ["Carrots", "Beetroot", "Lettuce", "Chamomile"],
    },
  },
  tomato: {
    cropKey: "tomato",
    displayName: "Tomato",
    scientificName: "Solanum lycopersicum",
    family: "Solanaceae (Tomato, Potato, Pepper, Eggplant)",
    category: "Vegetable",
    iconName: "Sparkles",
    description: "High-value fruit vegetable susceptible to foliar blights, calcium-related blossom end rot, and viral vectors.",
    storageBlueprint: {
      optimalTemperature: "13°C - 15°C (55°F - 60°F) (Never refrigerate ripe tomatoes)",
      optimalHumidity: "85% - 90% RH",
      shelfLifeDays: "7 - 18 days",
      ethyleneSensitivity: "Producer",
      curingAdvice: "Keep stem-side down at room temperature in indirect light; avoid refrigerator chilling injury.",
    },
    cultivationGuide: {
      idealSoilPh: "6.2 - 6.8",
      sunRequirement: "Full Sun (8+ hours daily)",
      wateringMethod: "Deep basal drip watering; avoid wetting foliage",
      rotationInterval: "3 - 4 Years",
      companionPlants: ["Basil", "Marigolds", "Chives", "Parsley"],
    },
  },
  potato: {
    cropKey: "potato",
    displayName: "Potato",
    scientificName: "Solanum tuberosum",
    family: "Solanaceae (Tomato, Potato, Pepper, Eggplant)",
    category: "Vegetable",
    iconName: "Sparkles",
    description: "Subterranean starch tuber prone to soil-borne scab, late blight, rhizoctonia scurf, and storage blackleg.",
    storageBlueprint: {
      optimalTemperature: "4°C - 8°C (39°F - 46°F) in pitch-black dark",
      optimalHumidity: "90% - 95% RH",
      shelfLifeDays: "120 - 240 days",
      ethyleneSensitivity: "High",
      curingAdvice: "Cure newly dug tubers at 15°C with 95% RH for 10-14 days to thicken skin and heal minor scuffs.",
    },
    cultivationGuide: {
      idealSoilPh: "5.0 - 5.5 (Acidic suppresses common scab)",
      sunRequirement: "Full Sun for vines; keep tubers deeply hilled against sunlight (prevents solanine greening)",
      wateringMethod: "Consistent moisture during tuber bulking (weeks 4-10)",
      rotationInterval: "3 - 4 Years",
      companionPlants: ["Beans", "Corn", "Cabbage", "Horseradish"],
    },
  },
  pepper: {
    cropKey: "pepper",
    displayName: "Bell Pepper & Chili",
    scientificName: "Capsicum annuum",
    family: "Solanaceae (Tomato, Potato, Pepper, Eggplant)",
    category: "Vegetable",
    iconName: "Sparkles",
    description: "Warm-season pod vegetable vulnerable to anthracnose fruit rot, bacterial spot blisters, and blossom end rot.",
    storageBlueprint: {
      optimalTemperature: "7°C - 10°C (45°F - 50°F)",
      optimalHumidity: "90% - 95% RH",
      shelfLifeDays: "14 - 21 days",
      ethyleneSensitivity: "Medium",
      curingAdvice: "Avoid storing below 7°C to prevent chilling injury pitting and calyx decay.",
    },
    cultivationGuide: {
      idealSoilPh: "6.0 - 6.8",
      sunRequirement: "Full Sun with afternoon heat protection",
      wateringMethod: "Consistent drip irrigation to maintain calcium delivery",
      rotationInterval: "3 Years",
      companionPlants: ["Basil", "Carrots", "Onions", "Oregano"],
    },
  },
  cabbage: {
    cropKey: "cabbage",
    displayName: "Cabbage & Brassicas",
    scientificName: "Brassica oleracea",
    family: "Brassica (Cabbage, Broccoli, Cauliflower, Kale)",
    category: "Vegetable",
    iconName: "Sparkles",
    description: "Cool-season crucifer susceptible to Xanthomonas black rot, clubroot galls, diamondback moth, and head tipburn.",
    storageBlueprint: {
      optimalTemperature: "0°C - 1°C (32°F - 34°F)",
      optimalHumidity: "95% - 98% RH",
      shelfLifeDays: "60 - 150 days",
      ethyleneSensitivity: "High",
      curingAdvice: "Leave 2-3 outer wrapper leaves on head for natural moisture barrier; store in high humidity.",
    },
    cultivationGuide: {
      idealSoilPh: "6.5 - 7.5 (Neutral to slightly alkaline prevents clubroot)",
      sunRequirement: "Full Sun to partial shade in hot weather",
      wateringMethod: "Uniform soil moisture (25-35 mm weekly)",
      rotationInterval: "3 - 4 Years",
      companionPlants: ["Mint", "Sage", "Dill", "Rosemary", "Celery"],
    },
  },
  carrot: {
    cropKey: "carrot",
    displayName: "Carrot & Root Crops",
    scientificName: "Daucus carota",
    family: "Root & Tuber (Carrot, Radish, Beetroot, Turnip)",
    category: "Vegetable",
    iconName: "Sparkles",
    description: "Biennial taproot sensitive to Pythium cavity spot, Alternaria leaf fire, and root-knot nematode galling.",
    storageBlueprint: {
      optimalTemperature: "0°C - 1°C (32°F - 34°F)",
      optimalHumidity: "95% - 100% RH",
      shelfLifeDays: "90 - 180 days (with tops removed)",
      ethyleneSensitivity: "High",
      curingAdvice: "Trim green tops down to 0.5 cm immediately after harvest to prevent root dehydration.",
    },
    cultivationGuide: {
      idealSoilPh: "6.0 - 6.8 in deep, loose, stone-free sandy loam",
      sunRequirement: "Full Sun",
      wateringMethod: "Even drip irrigation to prevent taproot splitting",
      rotationInterval: "3 Years",
      companionPlants: ["Leeks", "Onions", "Rosemary", "Radishes"],
    },
  },
  cucumber: {
    cropKey: "cucumber",
    displayName: "Cucumber & Zucchini",
    scientificName: "Cucumis sativus",
    family: "Cucurbit (Cucumber, Squash, Pumpkin, Zucchini)",
    category: "Vegetable",
    iconName: "Sparkles",
    description: "Fast-growing climbing vine prone to powdery mildew felt, angular leaf spot, downy mildew, and anthracnose craters.",
    storageBlueprint: {
      optimalTemperature: "10°C - 12°C (50°F - 54°F) (Chills and pits below 10°C)",
      optimalHumidity: "90% - 95% RH",
      shelfLifeDays: "10 - 14 days",
      ethyleneSensitivity: "High",
      curingAdvice: "Wrap in moisture barrier film or food-grade carnauba wax to prevent rapid moisture loss.",
    },
    cultivationGuide: {
      idealSoilPh: "6.0 - 6.8 with high organic matter",
      sunRequirement: "Full Sun with vertical trellising for clean straight fruit",
      wateringMethod: "Morning drip watering at base of vine",
      rotationInterval: "3 Years",
      companionPlants: ["Dill", "Sunflowers", "Nasturtiums", "Radishes"],
    },
  },
  eggplant: {
    cropKey: "eggplant",
    displayName: "Eggplant & Brinjal",
    scientificName: "Solanum melongena",
    family: "Solanaceae (Tomato, Potato, Pepper, Eggplant)",
    category: "Vegetable",
    iconName: "Sparkles",
    description: "Warm-season glossy nightshade vegetable susceptible to Phomopsis fruit rot, bacterial wilt, and flea beetle damage.",
    storageBlueprint: {
      optimalTemperature: "10°C - 12°C (50°F - 54°F)",
      optimalHumidity: "90% - 95% RH",
      shelfLifeDays: "7 - 14 days",
      ethyleneSensitivity: "High",
      curingAdvice: "Store with calyx intact; do not seal in plastic bags without ventilation holes.",
    },
    cultivationGuide: {
      idealSoilPh: "6.0 - 6.8",
      sunRequirement: "Full Sun (requires warm soil >20°C)",
      wateringMethod: "Drip irrigation; avoid water splash on lower foliage",
      rotationInterval: "3 - 4 Years",
      companionPlants: ["Bush Beans", "Marigolds", "Spinach", "Tarragon"],
    },
  },
  spinach: {
    cropKey: "spinach",
    displayName: "Spinach & Leafy Greens",
    scientificName: "Spinacia oleracea",
    family: "Leafy Greens (Spinach, Lettuce, Chard)",
    category: "Vegetable",
    iconName: "Sparkles",
    description: "Fast-maturing cool-season leafy vegetable prone to downy mildew (blue mold), anthracnose leaf spots, and bolting.",
    storageBlueprint: {
      optimalTemperature: "0°C - 2°C (32°F - 36°F)",
      optimalHumidity: "95% - 100% RH",
      shelfLifeDays: "10 - 14 days",
      ethyleneSensitivity: "High",
      curingAdvice: "Pre-cool with ice water or hydro-cooler immediately after harvest; store unwashed in breathable bags.",
    },
    cultivationGuide: {
      idealSoilPh: "6.5 - 7.0 (Sensitive to acidic soil)",
      sunRequirement: "Full Sun to partial afternoon shade in warm periods",
      wateringMethod: "Frequent light drip watering; keep soil evenly moist",
      rotationInterval: "2 - 3 Years",
      companionPlants: ["Strawberries", "Cabbage", "Peas", "Radishes"],
    },
  },
  okra: {
    cropKey: "okra",
    displayName: "Okra & Bhindi",
    scientificName: "Abelmoschus esculentus",
    family: "Malvaceae (Okra, Hibiscus)",
    category: "Vegetable",
    iconName: "Sparkles",
    description: "Heat-loving fibrous pod crop susceptible to Yellow Vein Mosaic Virus (YVMV), powdery mildew, and root-knot nematodes.",
    storageBlueprint: {
      optimalTemperature: "7°C - 10°C (45°F - 50°F)",
      optimalHumidity: "90% - 95% RH",
      shelfLifeDays: "7 - 10 days",
      ethyleneSensitivity: "Medium",
      curingAdvice: "Harvest when tender and snap-crisp; store in perforated paper bags at 10°C.",
    },
    cultivationGuide: {
      idealSoilPh: "6.0 - 6.8",
      sunRequirement: "Full Sun (thrives in high heat 30°C+)",
      wateringMethod: "Deep furrow or drip irrigation during flowering and fruiting",
      rotationInterval: "3 Years",
      companionPlants: ["Peppers", "Eggplant", "Cucumbers", "Melons"],
    },
  },
};

/**
 * Given any detected vegetable or crop name (e.g. "Red Onion", "Beefsteak Tomato", "Potato", "Okra", "Brinjal"),
 * matches and returns the complete recognized crop problem path, all diseases, storage blueprint, and cultivation guide.
 */
export function getRecognizedCropPath(vegetableName: string): RecognizedCropInfo {
  const normalized = (vegetableName || "").toLowerCase();

  let matchedKey = "onion"; // default fallback
  if (normalized.includes("tomato")) matchedKey = "tomato";
  else if (normalized.includes("potato") || normalized.includes("tuber")) matchedKey = "potato";
  else if (normalized.includes("onion") || normalized.includes("garlic") || normalized.includes("shallot") || normalized.includes("leek")) matchedKey = "onion";
  else if (normalized.includes("pepper") || normalized.includes("chili") || normalized.includes("capsicum") || normalized.includes("jalapeno")) matchedKey = "pepper";
  else if (normalized.includes("cabbage") || normalized.includes("broccoli") || normalized.includes("cauliflower") || normalized.includes("kale")) matchedKey = "cabbage";
  else if (normalized.includes("carrot") || normalized.includes("parsnip") || normalized.includes("radish") || normalized.includes("beet")) matchedKey = "carrot";
  else if (normalized.includes("cucumber") || normalized.includes("zucchini") || normalized.includes("squash") || normalized.includes("pumpkin")) matchedKey = "cucumber";
  else if (normalized.includes("eggplant") || normalized.includes("brinjal") || normalized.includes("aubergine")) matchedKey = "eggplant";
  else if (normalized.includes("spinach") || normalized.includes("lettuce") || normalized.includes("chard") || normalized.includes("greens")) matchedKey = "spinach";
  else if (normalized.includes("okra") || normalized.includes("bhindi") || normalized.includes("ladyfinger")) matchedKey = "okra";

  const profile = CROP_PROFILES[matchedKey] || CROP_PROFILES.onion;

  // Filter all encyclopedia diseases matching this crop or family
  const cropProblems = ENCYCLOPEDIA_DISEASES.filter((disease) => {
    const vegType = disease.vegetableType.toLowerCase();
    const fam = disease.family.toLowerCase();
    const dName = disease.name.toLowerCase();

    if (matchedKey === "onion") {
      return vegType.includes("onion") || vegType.includes("garlic") || fam.includes("allium") || dName.includes("onion");
    }
    if (matchedKey === "tomato") {
      return vegType.includes("tomato") || dName.includes("tomato");
    }
    if (matchedKey === "potato") {
      return vegType.includes("potato") || dName.includes("potato");
    }
    if (matchedKey === "pepper") {
      return vegType.includes("pepper") || vegType.includes("chili") || dName.includes("pepper");
    }
    if (matchedKey === "cabbage") {
      return vegType.includes("cabbage") || vegType.includes("broccoli") || vegType.includes("cauliflower") || fam.includes("brassica") || dName.includes("cabbage") || dName.includes("crucifer");
    }
    if (matchedKey === "carrot") {
      return vegType.includes("carrot") || vegType.includes("radish") || fam.includes("root") || dName.includes("carrot") || dName.includes("radish");
    }
    if (matchedKey === "cucumber") {
      return vegType.includes("cucumber") || vegType.includes("zucchini") || vegType.includes("squash") || fam.includes("cucurbit") || dName.includes("cucurbit") || dName.includes("zucchini");
    }
    if (matchedKey === "eggplant") {
      return vegType.includes("eggplant") || vegType.includes("brinjal") || dName.includes("eggplant");
    }
    if (matchedKey === "spinach") {
      return vegType.includes("spinach") || fam.includes("leafy") || dName.includes("spinach");
    }
    if (matchedKey === "okra") {
      return vegType.includes("okra") || vegType.includes("bhindi") || fam.includes("malvaceae") || dName.includes("okra");
    }

    return disease.vegetableType.toLowerCase().includes(matchedKey);
  });

  return {
    ...profile,
    problems: cropProblems,
  };
}

export function getAllRecognizedVegetables(): Array<Omit<RecognizedCropInfo, "problems"> & { problemCount: number }> {
  return Object.keys(CROP_PROFILES).map((key) => {
    const full = getRecognizedCropPath(key);
    return {
      cropKey: full.cropKey,
      displayName: full.displayName,
      scientificName: full.scientificName,
      family: full.family,
      category: full.category,
      iconName: full.iconName,
      description: full.description,
      storageBlueprint: full.storageBlueprint,
      cultivationGuide: full.cultivationGuide,
      problemCount: full.problems.length,
    };
  });
}
