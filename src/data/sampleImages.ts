import { SamplePreset } from "../types";

// Helper to encode SVG string into base64 data URL
function svgToDataUrl(svg: string): string {
  const base64 = btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${base64}`;
}

// 1. Onion with Black Mold (Aspergillus niger)
const onionBlackMoldSvg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a2e33"/>
      <stop offset="100%" stop-color="#181a1d"/>
    </radialGradient>
    <radialGradient id="onionSkin" cx="42%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#d49255"/>
      <stop offset="60%" stop-color="#aa5e2b"/>
      <stop offset="90%" stop-color="#733816"/>
      <stop offset="100%" stop-color="#4e210b"/>
    </radialGradient>
    <radialGradient id="innerFlesh" cx="45%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#fff5ea"/>
      <stop offset="70%" stop-color="#e2cbb2"/>
      <stop offset="100%" stop-color="#b89370"/>
    </radialGradient>
    <radialGradient id="blackMold1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#111111"/>
      <stop offset="70%" stop-color="#222222"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Background Studio Surface -->
  <rect width="600" height="600" fill="url(#bgGrad)"/>
  
  <!-- Wooden surface shadow -->
  <ellipse cx="300" cy="510" rx="190" ry="35" fill="#0c0d0f" opacity="0.75"/>
  
  <!-- Onion Roots at Basal Plate -->
  <g stroke="#8d6b47" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85">
    <path d="M 280 470 Q 270 510 260 540"/>
    <path d="M 290 475 Q 285 520 280 545"/>
    <path d="M 300 480 Q 300 525 305 550"/>
    <path d="M 310 475 Q 320 515 330 542"/>
    <path d="M 320 470 Q 335 505 348 535"/>
  </g>

  <!-- Onion Neck / Sprout tip -->
  <path d="M 288 160 C 292 110 300 90 304 80 C 308 90 314 115 318 160 Z" fill="#6a3915" stroke="#4a240d" stroke-width="2"/>
  
  <!-- Onion Main Bulb Body -->
  <path d="M 300 150 C 430 150 470 270 460 380 C 450 460 370 485 300 485 C 230 485 150 460 140 380 C 130 270 170 150 300 150 Z" 
        fill="url(#onionSkin)" stroke="#522409" stroke-width="3"/>
  
  <!-- Outer Papery Scale Texture Striations -->
  <g stroke="#f4b277" stroke-width="1.5" fill="none" opacity="0.45">
    <path d="M 300 150 C 370 200 400 320 380 470"/>
    <path d="M 300 150 C 340 220 350 350 330 480"/>
    <path d="M 300 150 C 260 220 250 350 270 480"/>
    <path d="M 300 150 C 230 200 200 320 220 470"/>
    <path d="M 300 150 C 180 230 160 330 180 430"/>
    <path d="M 300 150 C 420 230 440 330 420 430"/>
  </g>

  <!-- Peeling Scale Revealing Mold Underneath -->
  <path d="M 230 240 Q 320 220 380 270 Q 340 380 250 390 Q 210 320 230 240 Z" fill="url(#innerFlesh)" stroke="#7a4b27" stroke-width="2"/>
  
  <!-- Black Mold (Aspergillus niger) Clusters - Powdery dark masses -->
  <g fill="#181818" stroke="#000000" stroke-width="0.5">
    <!-- Main Cluster -->
    <circle cx="280" cy="290" r="28" fill="#121212"/>
    <circle cx="310" cy="300" r="34" fill="#0a0a0a"/>
    <circle cx="340" cy="285" r="22" fill="#1a1a1a"/>
    <circle cx="295" cy="330" r="26" fill="#151515"/>
    <circle cx="325" cy="335" r="20" fill="#0d0d0d"/>
    <circle cx="265" cy="320" r="16" fill="#181818"/>
    <!-- Sooty Spores scatter -->
    <circle cx="250" cy="275" r="7"/>
    <circle cx="260" cy="255" r="9"/>
    <circle cx="345" cy="320" r="11"/>
    <circle cx="360" cy="295" r="8"/>
    <circle cx="330" cy="260" r="10"/>
    <circle cx="275" cy="355" r="9"/>
    <circle cx="305" cy="365" r="12"/>
    <circle cx="355" cy="345" r="8"/>
    <circle cx="240" cy="340" r="6"/>
    <!-- Micro spores -->
    <circle cx="235" cy="290" r="3.5"/><circle cx="245" cy="305" r="4"/><circle cx="370" cy="280" r="3.5"/>
    <circle cx="365" cy="310" r="4"/><circle cx="320" cy="360" r="5"/><circle cx="290" cy="250" r="4.5"/>
  </g>

  <!-- Neck decay signs -->
  <ellipse cx="302" cy="180" rx="35" ry="15" fill="#2d1708" opacity="0.7"/>

  <!-- Label watermark for scanning AI simulation -->
  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Yellow Onion (Allium cepa) - Storage Rot</text>
  <text x="30" y="585" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Black sooty spore masses under dry outer tunics</text>
</svg>
`;

// 2. Onion with Purple Blotch (Alternaria porri) & Neck Decay
const onionPurpleBlotchSvg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1f2421"/>
      <stop offset="100%" stop-color="#111413"/>
    </radialGradient>
    <radialGradient id="redOnion" cx="40%" cy="38%" r="60%">
      <stop offset="0%" stop-color="#a62c5a"/>
      <stop offset="50%" stop-color="#7a143a"/>
      <stop offset="85%" stop-color="#4a0820"/>
      <stop offset="100%" stop-color="#2a0311"/>
    </radialGradient>
    <radialGradient id="purpleBlotch" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2b0d2b"/>
      <stop offset="40%" stop-color="#4a154b"/>
      <stop offset="70%" stop-color="#782352"/>
      <stop offset="90%" stop-color="#d48259"/>
      <stop offset="100%" stop-color="#7a143a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgGrad2)"/>
  <ellipse cx="300" cy="515" rx="180" ry="32" fill="#090a0a" opacity="0.8"/>

  <!-- Basal roots -->
  <g stroke="#96735a" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8">
    <path d="M 285 470 Q 275 515 265 545"/>
    <path d="M 300 478 Q 300 525 302 552"/>
    <path d="M 315 472 Q 328 518 340 546"/>
  </g>

  <!-- Onion Neck -->
  <path d="M 290 150 C 295 100 300 80 305 70 C 310 80 315 100 320 150 Z" fill="#4d0c24"/>
  
  <!-- Red Onion Bulb -->
  <path d="M 300 145 C 430 145 465 260 455 375 C 445 455 365 480 300 480 C 235 480 155 455 145 375 C 135 260 170 145 300 145 Z" 
        fill="url(#redOnion)" stroke="#380415" stroke-width="3"/>
  
  <!-- Purple Blotch Lesions (Sunken concentric zones with yellow-brown haloes) -->
  <!-- Major Lesion 1 -->
  <ellipse cx="270" cy="300" rx="48" ry="60" fill="url(#purpleBlotch)"/>
  <ellipse cx="270" cy="300" rx="32" ry="42" fill="#380d38" stroke="#ba4870" stroke-width="1.5"/>
  <ellipse cx="270" cy="300" rx="16" ry="22" fill="#1f051f"/>

  <!-- Secondary Lesion 2 -->
  <ellipse cx="370" cy="340" rx="35" ry="40" fill="url(#purpleBlotch)"/>
  <ellipse cx="370" cy="340" rx="22" ry="26" fill="#3b0e3b" stroke="#ba4870" stroke-width="1.2"/>
  <ellipse cx="370" cy="340" rx="10" ry="12" fill="#1f051f"/>

  <!-- Minor satellite spots -->
  <circle cx="210" cy="240" r="14" fill="#4a154b" stroke="#e09267" stroke-width="1.5"/>
  <circle cx="340" cy="220" r="18" fill="#4a154b" stroke="#e09267" stroke-width="1.5"/>
  <circle cx="230" cy="380" r="16" fill="#3b0e3b" stroke="#ba4870" stroke-width="1.2"/>

  <!-- Foliage neck leaf scar with brown necrotic blight -->
  <path d="M 285 130 Q 300 160 315 130" stroke="#ffaa55" stroke-width="3" fill="none" opacity="0.7"/>

  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Red Onion (Allium cepa) - Purple Blotch</text>
  <text x="30" y="585" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Elliptical purple necrotic lesions with yellow margins</text>
</svg>
`;

// 3. Pristine Healthy Red Onion
const healthyOnionSvg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad3" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#23272d"/>
      <stop offset="100%" stop-color="#121417"/>
    </radialGradient>
    <radialGradient id="freshRedOnion" cx="38%" cy="35%" r="58%">
      <stop offset="0%" stop-color="#d93b74"/>
      <stop offset="45%" stop-color="#9e184c"/>
      <stop offset="85%" stop-color="#5e092b"/>
      <stop offset="100%" stop-color="#360317"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgGrad3)"/>
  <ellipse cx="300" cy="510" rx="180" ry="32" fill="#0a0c0e" opacity="0.8"/>

  <!-- Basal roots -->
  <g stroke="#b89377" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.9">
    <path d="M 285 470 Q 275 510 265 540"/>
    <path d="M 295 475 Q 295 520 295 548"/>
    <path d="M 305 475 Q 310 520 315 548"/>
    <path d="M 318 470 Q 330 510 342 538"/>
  </g>

  <!-- Clean tight neck -->
  <path d="M 292 145 C 296 100 300 75 304 65 C 308 75 312 100 316 145 Z" fill="#5e092b" stroke="#360317" stroke-width="2"/>
  
  <!-- Lustrous glossy red onion bulb -->
  <path d="M 300 140 C 435 140 470 260 460 375 C 450 455 370 480 300 480 C 230 480 150 455 140 375 C 130 260 165 140 300 140 Z" 
        fill="url(#freshRedOnion)" stroke="#360317" stroke-width="3"/>

  <!-- Natural lustrous sheen and scale striations -->
  <g stroke="#ff94be" stroke-width="1.8" fill="none" opacity="0.5">
    <path d="M 300 140 C 375 190 405 310 385 465"/>
    <path d="M 300 140 C 345 210 355 340 335 475"/>
    <path d="M 300 140 C 255 210 245 340 265 475"/>
    <path d="M 300 140 C 225 190 195 310 215 465"/>
  </g>

  <!-- Specular Light Highlight -->
  <ellipse cx="250" cy="250" rx="35" ry="55" transform="rotate(-25 250 250)" fill="#ffffff" opacity="0.22"/>
  <ellipse cx="240" cy="235" rx="15" ry="25" transform="rotate(-25 240 235)" fill="#ffffff" opacity="0.35"/>

  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Fresh Red Onion (Grade A Prime)</text>
  <text x="30" y="585" fill="#34d399" font-family="system-ui, sans-serif" font-size="13">Status: 100% Healthy - Firm bulb, tight dry neck, no fungal spores</text>
</svg>
`;

// 4. Tomato with Late Blight (Phytophthora infestans)
const tomatoLateBlightSvg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad4" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#242628"/>
      <stop offset="100%" stop-color="#141517"/>
    </radialGradient>
    <radialGradient id="tomatoRed" cx="38%" cy="38%" r="60%">
      <stop offset="0%" stop-color="#ff4733"/>
      <stop offset="50%" stop-color="#d92411"/>
      <stop offset="85%" stop-color="#941204"/>
      <stop offset="100%" stop-color="#570800"/>
    </radialGradient>
    <radialGradient id="blightRot" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3d2a14"/>
      <stop offset="50%" stop-color="#5e411f"/>
      <stop offset="80%" stop-color="#7d5c33"/>
      <stop offset="100%" stop-color="#a8804e" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgGrad4)"/>
  <ellipse cx="300" cy="510" rx="190" ry="32" fill="#08090a" opacity="0.8"/>

  <!-- Tomato Calyx (Green sepals) -->
  <g fill="#3e782e" stroke="#254d19" stroke-width="2">
    <path d="M 300 130 C 270 90 230 95 210 110 C 240 125 270 135 300 140 Z"/>
    <path d="M 300 130 C 330 90 370 95 390 110 C 360 125 330 135 300 140 Z"/>
    <path d="M 300 130 C 290 70 295 50 305 40 C 310 60 305 100 300 130 Z" fill="#2d5722"/>
    <path d="M 300 130 C 280 145 250 160 230 180 C 255 170 280 155 300 140 Z"/>
    <path d="M 300 130 C 320 145 350 160 370 180 C 345 170 320 155 300 140 Z"/>
    <circle cx="300" cy="135" r="14" fill="#254d19"/>
  </g>

  <!-- Tomato Fruit Body -->
  <ellipse cx="300" cy="330" rx="185" ry="165" fill="url(#tomatoRed)" stroke="#4a0801" stroke-width="3"/>

  <!-- Specular sheen -->
  <ellipse cx="230" cy="250" rx="30" ry="45" transform="rotate(-20 230 250)" fill="#ffffff" opacity="0.3"/>

  <!-- Late Blight Dark Brown Greasy Lesion -->
  <path d="M 310 240 C 440 220 480 340 440 430 C 370 470 320 450 300 400 C 270 340 250 280 310 240 Z" 
        fill="url(#blightRot)" stroke="#2b1a0a" stroke-width="2"/>
  
  <!-- Wrinkled Leathery Surface Texture on Blight -->
  <g stroke="#9e7c53" stroke-width="1.8" fill="none" opacity="0.65">
    <path d="M 340 280 Q 380 300 420 290"/>
    <path d="M 330 320 Q 370 350 430 330"/>
    <path d="M 315 365 Q 360 390 410 380"/>
    <path d="M 335 410 Q 370 420 395 405"/>
  </g>

  <!-- White Fungal Mildew Fuzz at Margin (Phytophthora sporangia) -->
  <g fill="#e5e7eb" opacity="0.65">
    <circle cx="305" cy="275" r="5"/><circle cx="300" cy="295" r="6"/><circle cx="295" cy="320" r="7"/>
    <circle cx="290" cy="350" r="6"/><circle cx="292" cy="375" r="7"/><circle cx="305" cy="405" r="6"/>
    <circle cx="325" cy="430" r="6"/><circle cx="355" cy="445" r="7"/><circle cx="385" cy="440" r="5"/>
  </g>

  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Ripe Tomato (Solanum lycopersicum) - Late Blight</text>
  <text x="30" y="585" fill="#ef4444" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Greasy brownish olive-brown firm rot with white mold fringe</text>
</svg>
`;

// 5. Potato with Hollow Heart & Common Scab
const potatoScabSvg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad5" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#212326"/>
      <stop offset="100%" stop-color="#121314"/>
    </radialGradient>
    <radialGradient id="potatoSkin" cx="40%" cy="38%" r="60%">
      <stop offset="0%" stop-color="#d4b07b"/>
      <stop offset="50%" stop-color="#ad844e"/>
      <stop offset="85%" stop-color="#7a5526"/>
      <stop offset="100%" stop-color="#4d3210"/>
    </radialGradient>
    <radialGradient id="scabPatch" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2e1a0c"/>
      <stop offset="60%" stop-color="#4a2e19"/>
      <stop offset="100%" stop-color="#805631"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgGrad5)"/>
  <ellipse cx="300" cy="505" rx="200" ry="35" fill="#080809" opacity="0.8"/>

  <!-- Tuber shape -->
  <path d="M 170 300 C 140 200 240 150 360 160 C 470 170 500 280 470 390 C 440 480 320 485 220 460 C 150 440 190 360 170 300 Z" 
        fill="url(#potatoSkin)" stroke="#4a2e19" stroke-width="3"/>

  <!-- Potato Eyes (Sprout buds) -->
  <ellipse cx="230" cy="220" rx="14" ry="6" fill="#3b210e" transform="rotate(-15 230 220)"/>
  <ellipse cx="380" cy="210" rx="16" ry="7" fill="#3b210e" transform="rotate(10 380 210)"/>
  <ellipse cx="440" cy="330" rx="15" ry="6" fill="#3b210e" transform="rotate(40 440 330)"/>
  <ellipse cx="250" cy="410" rx="14" ry="7" fill="#3b210e" transform="rotate(-20 250 410)"/>

  <!-- Common Scab (Streptomyces scabies) Corky Pitted Lesions -->
  <!-- Scab Cluster 1 -->
  <g fill="url(#scabPatch)" stroke="#1a0c04" stroke-width="1.5">
    <circle cx="280" cy="280" r="24"/>
    <circle cx="315" cy="295" r="28"/>
    <circle cx="345" cy="275" r="20"/>
    <circle cx="300" cy="335" r="22"/>
    <circle cx="335" cy="330" r="18"/>
  </g>
  <!-- Corky crater texture -->
  <g stroke="#9e7345" stroke-width="1.8" fill="none">
    <circle cx="280" cy="280" r="14" stroke-dasharray="3,3"/>
    <circle cx="315" cy="295" r="18" stroke-dasharray="4,2"/>
    <circle cx="345" cy="275" r="11" stroke-dasharray="3,3"/>
    <circle cx="300" cy="335" r="12" stroke-dasharray="3,2"/>
  </g>

  <!-- Secondary Scab cluster -->
  <circle cx="410" cy="380" r="18" fill="url(#scabPatch)" stroke="#1a0c04" stroke-width="1.5"/>
  <circle cx="410" cy="380" r="10" stroke="#9e7345" stroke-width="1.5" stroke-dasharray="3,3" fill="none"/>

  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Russet Potato (Solanum tuberosum) - Common Scab</text>
  <text x="30" y="585" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Raised corky eruptive scab lesions on tuber periderm</text>
</svg>
`;

export const SAMPLE_VEGETABLES: SamplePreset[] = [
  {
    id: "sample-onion-black-mold",
    title: "Yellow Onion - Black Mold Rot",
    vegetable: "Onion",
    conditionName: "Black Mold (Aspergillus niger)",
    expectedHealth: "SEVERE_DAMAGE",
    description: "Typical post-harvest storage rot featuring black sooty powdery spores between outer bulb tunics and soft neck breakdown.",
    imageData: svgToDataUrl(onionBlackMoldSvg),
    notes: "Stored in warm room with high humidity for 3 weeks after harvest. Scales feel slightly soft.",
  },
  {
    id: "sample-onion-purple-blotch",
    title: "Red Onion - Purple Blotch Disease",
    vegetable: "Onion",
    conditionName: "Purple Blotch (Alternaria porri)",
    expectedHealth: "MODERATE_DISEASE",
    description: "Sunken elliptical purple-to-brown necrotic lesions with chlorotic yellow halo margins on the bulb and neck tissue.",
    imageData: svgToDataUrl(onionPurpleBlotchSvg),
    notes: "Field-grown onion after warm rainy season. Leaf tips showed purple blotches prior to harvest.",
  },
  {
    id: "sample-onion-healthy",
    title: "Red Onion - Fresh & Healthy (Grade A)",
    vegetable: "Onion",
    conditionName: "Healthy Onion Specimen",
    expectedHealth: "HEALTHY",
    description: "Pristine, firm red onion bulb with tight neck, intact shiny dry papery skin, and no mold or softness.",
    imageData: svgToDataUrl(healthyOnionSvg),
    notes: "Freshly cured onion kept in cool, dry ventilated mesh storage.",
  },
  {
    id: "sample-tomato-late-blight",
    title: "Tomato - Late Blight Rot",
    vegetable: "Tomato",
    conditionName: "Late Blight (Phytophthora infestans)",
    expectedHealth: "SPOILED_UNFIT",
    description: "Greasy olive-brown firm necrotic rot expanding across the fruit surface with white mildew sporulation at border.",
    imageData: svgToDataUrl(tomatoLateBlightSvg),
    notes: "Spotted in greenhouse after cool humid foggy conditions. Fruit rapidly turning brown.",
  },
  {
    id: "sample-potato-scab",
    title: "Potato - Common Scab Infection",
    vegetable: "Potato",
    conditionName: "Common Scab (Streptomyces scabies)",
    expectedHealth: "MILD_ISSUE",
    description: "Raised corky, rough circular scab craters on the potato skin while internal flesh remains largely firm.",
    imageData: svgToDataUrl(potatoScabSvg),
    notes: "Harvested from alkaline sandy soil (pH 7.4). Skin is rough and pitted.",
  },
];
