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
  // 4. APPLE (ROSACEAE FRUIT)
  // ==========================================
  {
    id: "apple-scab",
    name: "Apple Scab Disease",
    scientificAgent: "Venturia inaequalis (Fungus)",
    vegetableType: "Apple, Pear, Crabapple",
    family: "Rosaceae Fruits (Apple, Strawberry, Peach)",
    category: "Fungal",
    typicalSymptoms: [
      "Velvety olive-green to dull dark brown spots on leaves that later turn black and puckered",
      "Fruit develops scabby, corky, cracked brownish-black circular lesions",
      "Infected young apples become distorted, lopsided, or crack open deeply",
      "Premature summer leaf drop causing tree decline",
    ],
    favorableConditions: [
      "Cool, rainy spring weather (13°C - 24°C) with prolonged leaf wetness (6-12+ hours)",
      "Overwintered fungal spores in fallen orchard leaf litter",
    ],
    organicCure: [
      "Liquid sulfur or lime sulfur sprays during bud break and pink petal stages",
      "Copper octanoate fungicide sprays in early spring prior to green tip",
      "Rake and shred or compost all fallen orchard leaves in autumn with urea to accelerate leaf breakdown",
    ],
    chemicalCure: [
      "Fungicide sprays: Myclobutanil, Captan (2 g/L), or Difenoconazole applied at green tip through petal fall",
    ],
    prevention: [
      "Plant scab-resistant apple cultivars (e.g., Liberty, Enterprise, Freedom, GoldRush, Prima)",
      "Prune apple tree canopy annually into open-center or central leader for rapid sun drying",
    ],
    edibilityRisk: "Apples with minor surface scabs are perfectly safe to eat; simply pare away the corky skin. If deep cracks harbor mold or rot, trim generously.",
    keyVisualSign: "Olive-green to black corky scabs on apple skin causing distortion and surface cracking.",
  },
  {
    id: "apple-bitter-rot",
    name: "Bitter Rot & Bull's Eye Rot",
    scientificAgent: "Colletotrichum fioriniae / Colletotrichum gloeosporioides (Fungus)",
    vegetableType: "Apple, Pear",
    family: "Rosaceae Fruits (Apple, Strawberry, Peach)",
    category: "Fungal",
    typicalSymptoms: [
      "Small circular light brown sunken spots that rapidly enlarge into saucer-shaped depressed craters",
      "Concentric rings of tiny black dots producing slimy, gelatinous salmon-pink spore masses in moist weather",
      "V-shaped cone of rotten brown flesh extending deeply straight to the core when sliced open",
      "Rotten flesh tastes intensely bitter and watery",
    ],
    favorableConditions: [
      "Warm, hot, humid summer weather (27°C - 32°C / 80°F - 90°F) with frequent afternoon thunderstorms",
      "Mummified dead apples remaining on tree branches from previous season",
    ],
    organicCure: [
      "Remove and destroy all mummified apples and dead twig cankers during winter pruning",
      "Spray copper sulfate or bio-fungicide (Bacillus subtilis) every 10-14 days during summer",
    ],
    chemicalCure: [
      "Captan + Pyraclostrobin / Boscalid or Trifloxystrobin cover sprays starting 2-3 weeks after petal fall",
    ],
    prevention: [
      "Flail-mow fallen fruit to destroy inoculum reservoirs",
      "Ensure proper fungicide cover through hot midsummer rains right up to harvest",
    ],
    edibilityRisk: "Do NOT consume bitter-rotted apples. The fungus penetrates deeply to the core and generates bitter mycotoxins.",
    keyVisualSign: "Sunken saucer lesion with concentric rings of bright salmon-pink gelatinous spore tendrils.",
  },

  // ==========================================
  // 5. BANANA (MUSACEAE FRUIT)
  // ==========================================
  {
    id: "banana-anthracnose",
    name: "Banana Anthracnose & Crown Rot",
    scientificAgent: "Colletotrichum musae (Fungus)",
    vegetableType: "Banana, Plantain",
    family: "Citrus & Tropical (Orange, Banana, Lemon)",
    category: "Fungal",
    typicalSymptoms: [
      "Small dark brown to black diamond spots appearing on the yellow banana peel as it ripens",
      "Spots coalesce into sunken black blemishes covered with bright pink or salmon-orange spore slime",
      "Crown stalk (neck) blackens, softens, and causes fingers to detach and drop prematurely ('finger drop')",
      "Internal pulp underneath lesions becomes soft, brown, and loses sweetness",
    ],
    favorableConditions: [
      "Warm, humid tropical conditions (24°C - 30°C, RH >85%)",
      "Fruit bruising, rough handling, or abrasion during packing and transit",
      "Wet packing facilities without clean wash water",
    ],
    organicCure: [
      "Post-harvest hot water dip (50°C for 2-3 minutes) to pasteurize peel surface without cooking pulp",
      "Wash harvested banana hands in clean chlorinated or ozonated water",
      "Apply protective food-grade chitosan or carnauba wax bio-coating",
    ],
    chemicalCure: [
      "Pre-harvest bunch sprays with Azoxystrobin or Difenoconazole",
      "Post-harvest crown treatment with Thiabendazole or Imazalil fungicide",
    ],
    prevention: [
      "De-flower young bunches and cover with perforated blue polythene sleeves in the field",
      "Handle fruit with cushioned padding to avoid skin abrasions",
      "Maintain post-harvest green banana storage at 13°C - 14°C (never below 12°C to prevent chilling injury)",
    ],
    edibilityRisk: "If peel has minor anthracnose freckles but pulp is creamy, firm, and white, it is delicious and safe. If black rot penetrates deep into pulp with foul smell, discard.",
    keyVisualSign: "Sunken black peel lesions bearing bright salmon-colored fungal spore masses on ripe fruit.",
  },
  {
    id: "banana-black-sigatoka",
    name: "Black Sigatoka (Black Leaf Streak)",
    scientificAgent: "Pseudocercospora fijiensis (Fungus)",
    vegetableType: "Banana, Plantain",
    family: "Citrus & Tropical (Orange, Banana, Lemon)",
    category: "Fungal",
    typicalSymptoms: [
      "Tiny reddish-brown specks on leaf undersides expanding into dark rusty brown streaks parallel to leaf veins",
      "Streaks coalesce into black elliptical necrotic spots with light gray sunken centers",
      "Premature total collapse of leaves leaving banana bunches unshaded and unfulfilled",
      "Bunches ripen prematurely on the plant before reaching harvest size",
    ],
    favorableConditions: [
      "High temperatures (26°C - 28°C) and continuous high relative humidity (>90%) with standing water on leaves",
    ],
    organicCure: [
      "Regular de-leafing (cutting off diseased leaf tissue) to reduce spore pressure",
      "Spray emulsified mineral oils combined with bio-fungicides",
    ],
    chemicalCure: [
      "Systemic fungicides: Azoxystrobin, Epoxiconazole, or Mancozeb alternating with mineral oil",
    ],
    prevention: [
      "Plant resistant banana cultivars (e.g., FHIA hybrids)",
      "Optimize plantation drainage to reduce ambient canopy humidity",
    ],
    edibilityRisk: "Harvested bananas from affected plants that reach full maturity are safe to eat, though bunch yield and size are reduced.",
    keyVisualSign: "Dark reddish-brown streaks turning into gray-centered black eye spots across banana foliage.",
  },

  // ==========================================
  // 6. ORANGE & CITRUS (RUTACEAE FRUIT)
  // ==========================================
  {
    id: "citrus-canker",
    name: "Asiatic Citrus Canker",
    scientificAgent: "Xanthomonas citri subsp. citri (Bacterium)",
    vegetableType: "Orange, Lemon, Lime, Grapefruit, Tangerine",
    family: "Citrus & Tropical (Orange, Banana, Lemon)",
    category: "Bacterial",
    typicalSymptoms: [
      "Raised, corky, crater-like blister pustules on fruit rind, leaves, and green twigs",
      "Lesions on leaves and fruit are surrounded by a distinct oily water-soaked yellow halo margin",
      "Canker lesions have a sunken, volcano-like crater center with rough brown edges",
      "Severe infections trigger premature fruit drop and twig dieback",
    ],
    favorableConditions: [
      "Warm, wet, windy weather (20°C - 30°C) especially following tropical storms or hurricanes",
      "Citrus leafminer insect feeding tunnels which provide direct infection wounds",
    ],
    organicCure: [
      "Preventive sprays with Copper hydroxide or Copper oxychloride every 2-3 weeks during growth flushes",
      "Prune out infected twigs during dry winter periods and burn prunings",
    ],
    chemicalCure: [
      "Fixed copper bactericide sprays combined with Mancozeb to boost efficacy",
    ],
    prevention: [
      "Plant windbreaks (e.g. Casuarina, Bamboo) around orchards to reduce windblown rain spread",
      "Control citrus leafminer with Spinosad or horticultural oil",
      "Decontaminate tools, ladders, and harvesting crates with quaternary ammonium disinfectant",
    ],
    edibilityRisk: "Citrus canker is strictly a cosmetic rind disease; internal juice and fruit pulp remain uninfected, sweet, and 100% safe to eat or juice.",
    keyVisualSign: "Raised volcano-like brown corky rind scabs surrounded by oily yellow halos.",
  },
  {
    id: "citrus-green-mold",
    name: "Citrus Green Mold & Blue Mold",
    scientificAgent: "Penicillium digitatum / Penicillium italicum (Fungus)",
    vegetableType: "Orange, Lemon, Lime, Grapefruit, Mandarin",
    family: "Citrus & Tropical (Orange, Banana, Lemon)",
    category: "Fungal",
    typicalSymptoms: [
      "Soft, water-soaked, slightly discolored circular spot on the fruit peel that yields easily to finger pressure",
      "White fungal mycelium quickly grows out from the center of the soft spot",
      "A dense, olive-green powdery carpet of spores rapidly envelops the white zone",
      "Fruit completely collapses into a soft, mushy, rotten mass covered in spore clouds",
    ],
    favorableConditions: [
      "Storage temperatures around 20°C - 25°C (68°F - 77°F)",
      "Mechanical harvesting wounds, fingernail scratches, clipping snags, or fruit fly punctures on peel",
      "High humidity in packing boxes without fungicide treatment",
    ],
    organicCure: [
      "Post-harvest hot water immersion (45°C for 2 minutes or 52°C for 20 seconds)",
      "Wash fruit with 2-3% food-grade Sodium bicarbonate (baking soda) or Potassium sorbate solution",
      "Apply biocontrol yeast (Candida oleophila or Metschnikowia fructicola)",
    ],
    chemicalCure: [
      "Post-harvest fungicide wax coating with Imazalil, Thiabendazole, or Fludioxonil + Pyrimethanil",
    ],
    prevention: [
      "Harvest citrus carefully with cotton gloves; never pull fruit (use blunt clippers)",
      "Sanitize packing lines and cool storage rooms regularly with chlorine dioxide",
      "Store citrus fruit at 4°C - 8°C with 85-90% RH to slow fungal germination",
    ],
    edibilityRisk: "Unfit for consumption. Discard molded fruit immediately to prevent powdery airborne spores from infecting surrounding healthy citrus in the crate.",
    keyVisualSign: "Soft water-soaked rind spot covered by a velvety olive-green powdery fungal dust surrounded by a broad white margin.",
  },

  // ==========================================
  // 7. STRAWBERRY (ROSACEAE FRUIT)
  // ==========================================
  {
    id: "strawberry-gray-mold",
    name: "Gray Mold Fruit Rot of Strawberry",
    scientificAgent: "Botrytis cinerea (Fungus)",
    vegetableType: "Strawberry, Raspberry, Blackberry",
    family: "Rosaceae Fruits (Apple, Strawberry, Peach)",
    category: "Fungal",
    typicalSymptoms: [
      "Light brown water-soaked soft spot near the stem calyx or where berry touches soil/another berry",
      "Berry loses firmness and is rapidly covered in a thick, velvety mouse-gray furry mold coat",
      "In dry air, infected berries shrivel into hard, leathery brown mummies hanging on the stem",
      "Flowers turn brown, die prematurely, and pass latent infection directly into developing receptacle",
    ],
    favorableConditions: [
      "Cool to moderate temperatures (15°C - 22°C / 59°F - 72°F) with high relative humidity (>85%)",
      "Prolonged rain, overhead watering, or wet straw bedding",
      "Berries remaining ripe on the plant past harvest peak",
    ],
    organicCure: [
      "Spray bio-fungicide containing Bacillus subtilis, Trichoderma, or Aureobasidium pullulans from bloom through harvest",
      "Apply potassium bicarbonate (3-5 g/L) at first sign of blossom infection",
      "Daily harvesting: Pick all ripe and rotting berries to stop spore clouds",
    ],
    chemicalCure: [
      "Fungicide sprays at 10% and 50% bloom: Fenhexamid, Cyprodinil + Fludioxonil, or Boscalid",
    ],
    prevention: [
      "Grow on raised beds with black plastic mulch or dry straw to keep berries off bare damp soil",
      "Water exclusively via drip irrigation under mulch",
      "Rapid post-harvest forced-air cooling to 0°C - 2°C within 1 hour of picking",
    ],
    edibilityRisk: "Do NOT eat gray-mold berries. The fungal hyphae destroy cellular pectin and produce allergen-rich spore masses.",
    keyVisualSign: "Soft brownish berry covered with dense smoky-gray velvety fungal fuzz.",
  },
  {
    id: "strawberry-anthracnose",
    name: "Anthracnose Fruit Rot & Crown Rot",
    scientificAgent: "Colletotrichum acutatum / Colletotrichum gloeosporioides (Fungus)",
    vegetableType: "Strawberry",
    family: "Rosaceae Fruits (Apple, Strawberry, Peach)",
    category: "Fungal",
    typicalSymptoms: [
      "Distinct round, firm, sunken, dark brown to black crater lesions on green and ripe berries",
      "Under moist conditions, bright salmon-pink to orange gelatinous spore droplets form in crater center",
      "Lesions remain firm and leathery (unlike soft watery gray mold)",
      "Plant crown can rot from inside, causing sudden daytime collapse and plant death",
    ],
    favorableConditions: [
      "Warm to hot temperatures (25°C - 30°C / 77°F - 86°F) combined with rain splash or overhead sprinklers",
    ],
    organicCure: [
      "Bio-fungicide drench with Streptomyces lydicus or Bacillus amyloliquefaciens",
      "Remove and destroy infected strawberry crowns immediately",
    ],
    chemicalCure: [
      "Fungicides: Azoxystrobin, Pyraclostrobin, or Captan applied during flowering and fruit sizing",
    ],
    prevention: [
      "Use certified disease-free plug plants",
      "Avoid overhead sprinkler irrigation during fruiting season",
      "Disinfect picking containers between field rows",
    ],
    edibilityRisk: "Discard affected berries; the firm lesions harbor bitter fungal toxins.",
    keyVisualSign: "Firm sunken dark brown craters with salmon-orange gelatinous spore droplets on berry surface.",
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
  // 11. GRAPES (VITACEAE FRUIT)
  // ==========================================
  {
    id: "grape-downy-mildew",
    name: "Grapevine Downy Mildew",
    scientificAgent: "Plasmopara viticola (Oomycete)",
    vegetableType: "Grapes (Table & Wine)",
    family: "Vitaceae (Grapes & Berries)",
    category: "Fungal",
    typicalSymptoms: [
      "Yellowish, oily, translucent patches ('oil spots') on the upper surface of grape leaves",
      "Dense, cottony, delicate white downy fungal growth on the lower leaf surface directly under oil spots",
      "Young infected berry clusters curl into an S-shape (shepherd's crook), turn brown, and dry up",
      "Older berries turn dull grayish-blue, harden, and shrivel into wrinkled brown 'leather' berries",
    ],
    favorableConditions: [
      "The '10-10-24 rule': 10 mm rainfall, temperatures of at least 10°C (50°F), within a 24-hour period",
      "High humidity (>95%) overnight triggering massive spore release",
    ],
    organicCure: [
      "Bordeaux mixture (Copper sulfate + Hydrated lime) spray applied before rain events",
      "Potassium phosphite or Potassium bicarbonate foliar applications",
      "Canopy leaf thinning around fruiting zones to improve air circulation and sunlight exposure",
    ],
    chemicalCure: [
      "Systemic fungicides: Metalaxyl, Dimethomorph, Cyazofamid, or Mandipropamid",
    ],
    prevention: [
      "Shoot positioning and tucking to keep grapevine canopy open and dry",
      "Manage vineyard floor groundcover to reduce humidity beneath vine trellises",
      "Apply protective copper sprays prior to major spring and summer rain spells",
    ],
    edibilityRisk: "Affected berries shrivel, dry into hard unpalatable leathery pellets, and must be culled. Healthy berries on unaffected bunches are delicious and safe.",
    keyVisualSign: "Translucent yellow 'oil spots' on top of leaves with dense white downy felt beneath.",
  },
  {
    id: "grape-powdery-mildew",
    name: "Grape Powdery Mildew",
    scientificAgent: "Erysiphe necator (Fungus)",
    vegetableType: "Grapes (Table & Wine)",
    family: "Vitaceae (Grapes & Berries)",
    category: "Fungal",
    typicalSymptoms: [
      "Ash-white or powdery gray coating on leaves, shoots, and green berry clusters",
      "Infected berries stop expanding, become hard, and skin splits open longitudinally exposing seeds",
      "Cracked berries are rapidly invaded by secondary sour rot fungi and fruit flies",
      "Distinct musty, mushroom-like odor in heavily infected vineyard blocks",
    ],
    favorableConditions: [
      "Warm, cloudy, shaded conditions (20°C - 27°C / 68°F - 80°F) with high humidity (does NOT require free rain water)",
      "Dense, unpruned vine canopies blocking sunlight",
    ],
    organicCure: [
      "Wettable sulfur or micronized sulfur dustings every 10-14 days until bunch closure",
      "Spray 0.5% horticultural mineral oil or Potassium bicarbonate",
      "Milk spray (1 part milk to 9 parts water) under full sunlight",
    ],
    chemicalCure: [
      "Tebuconazole, Myclobutanil, Quinoxyfen, or Pyraclostrobin rotated to prevent resistance",
    ],
    prevention: [
      "Ensure aggressive leaf removal in the fruiting zone immediately after berry set (direct sunlight kills powdery mildew)",
      "Maintain a strict preventive sulfur spray schedule from 6-inch shoot growth through veraison",
    ],
    edibilityRisk: "Infected cracked berries are unfit for table use or wine due to off-flavors and sour rots. Discard affected clusters.",
    keyVisualSign: "Ash-white talcum powdery fungal coating causing berry skin splitting and seed exposure.",
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
];
