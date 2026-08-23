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
  </defs>
  <rect width="600" height="600" fill="url(#bgGrad)"/>
  <ellipse cx="300" cy="510" rx="190" ry="35" fill="#0c0d0f" opacity="0.75"/>
  <g stroke="#8d6b47" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85">
    <path d="M 280 470 Q 270 510 260 540"/>
    <path d="M 290 475 Q 285 520 280 545"/>
    <path d="M 300 480 Q 300 525 305 550"/>
    <path d="M 310 475 Q 320 515 330 542"/>
    <path d="M 320 470 Q 335 505 348 535"/>
  </g>
  <path d="M 288 160 C 292 110 300 90 304 80 C 308 90 314 115 318 160 Z" fill="#6a3915" stroke="#4a240d" stroke-width="2"/>
  <path d="M 300 150 C 430 150 470 270 460 380 C 450 460 370 485 300 485 C 230 485 150 460 140 380 C 130 270 170 150 300 150 Z" fill="url(#onionSkin)" stroke="#522409" stroke-width="3"/>
  <g stroke="#f4b277" stroke-width="1.5" fill="none" opacity="0.45">
    <path d="M 300 150 C 370 200 400 320 380 470"/>
    <path d="M 300 150 C 340 220 350 350 330 480"/>
    <path d="M 300 150 C 260 220 250 350 270 480"/>
    <path d="M 300 150 C 230 200 200 320 220 470"/>
  </g>
  <path d="M 230 240 Q 320 220 380 270 Q 340 380 250 390 Q 210 320 230 240 Z" fill="url(#innerFlesh)" stroke="#7a4b27" stroke-width="2"/>
  <g fill="#181818" stroke="#000000" stroke-width="0.5">
    <circle cx="280" cy="290" r="28" fill="#121212"/>
    <circle cx="310" cy="300" r="34" fill="#0a0a0a"/>
    <circle cx="340" cy="285" r="22" fill="#1a1a1a"/>
    <circle cx="295" cy="330" r="26" fill="#151515"/>
    <circle cx="325" cy="335" r="20" fill="#0d0d0d"/>
    <circle cx="265" cy="320" r="16" fill="#181818"/>
    <circle cx="250" cy="275" r="7"/>
    <circle cx="260" cy="255" r="9"/>
    <circle cx="345" cy="320" r="11"/>
    <circle cx="360" cy="295" r="8"/>
    <circle cx="330" cy="260" r="10"/>
    <circle cx="275" cy="355" r="9"/>
    <circle cx="305" cy="365" r="12"/>
  </g>
  <ellipse cx="302" cy="180" rx="35" ry="15" fill="#2d1708" opacity="0.7"/>
  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Yellow Onion (Allium cepa) - Storage Rot</text>
  <text x="30" y="585" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Black sooty spore masses under dry outer tunics</text>
</svg>
`;

// 2. Red Onion with Purple Blotch
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
  <path d="M 290 150 C 295 100 300 80 305 70 C 310 80 315 100 320 150 Z" fill="#4d0c24"/>
  <path d="M 300 145 C 430 145 465 260 455 375 C 445 455 365 480 300 480 C 235 480 155 455 145 375 C 135 260 170 145 300 145 Z" fill="url(#redOnion)" stroke="#380415" stroke-width="3"/>
  <ellipse cx="270" cy="300" rx="48" ry="60" fill="url(#purpleBlotch)"/>
  <ellipse cx="270" cy="300" rx="32" ry="42" fill="#380d38" stroke="#ba4870" stroke-width="1.5"/>
  <ellipse cx="270" cy="300" rx="16" ry="22" fill="#1f051f"/>
  <ellipse cx="370" cy="340" rx="35" ry="40" fill="url(#purpleBlotch)"/>
  <ellipse cx="370" cy="340" rx="22" ry="26" fill="#3b0e3b" stroke="#ba4870" stroke-width="1.2"/>
  <circle cx="210" cy="240" r="14" fill="#4a154b" stroke="#e09267" stroke-width="1.5"/>
  <circle cx="340" cy="220" r="18" fill="#4a154b" stroke="#e09267" stroke-width="1.5"/>
  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Red Onion (Allium cepa) - Purple Blotch</text>
  <text x="30" y="585" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Elliptical purple necrotic lesions with yellow margins</text>
</svg>
`;

// 3. Tomato with Late Blight
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
  <g fill="#3e782e" stroke="#254d19" stroke-width="2">
    <path d="M 300 130 C 270 90 230 95 210 110 C 240 125 270 135 300 140 Z"/>
    <path d="M 300 130 C 330 90 370 95 390 110 C 360 125 330 135 300 140 Z"/>
    <circle cx="300" cy="135" r="14" fill="#254d19"/>
  </g>
  <ellipse cx="300" cy="330" rx="185" ry="165" fill="url(#tomatoRed)" stroke="#4a0801" stroke-width="3"/>
  <ellipse cx="230" cy="250" rx="30" ry="45" transform="rotate(-20 230 250)" fill="#ffffff" opacity="0.3"/>
  <path d="M 310 240 C 440 220 480 340 440 430 C 370 470 320 450 300 400 C 270 340 250 280 310 240 Z" fill="url(#blightRot)" stroke="#2b1a0a" stroke-width="2"/>
  <g fill="#e5e7eb" opacity="0.75">
    <circle cx="305" cy="275" r="5"/><circle cx="300" cy="295" r="6"/><circle cx="295" cy="320" r="7"/>
    <circle cx="290" cy="350" r="6"/><circle cx="305" cy="405" r="6"/><circle cx="355" cy="445" r="7"/>
  </g>
  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Tomato (Solanum lycopersicum) - Late Blight</text>
  <text x="30" y="585" fill="#ef4444" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Greasy brown firm rot with white mold fringe</text>
</svg>
`;

// 4. Potato with Common Scab
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
  <path d="M 170 300 C 140 200 240 150 360 160 C 470 170 500 280 470 390 C 440 480 320 485 220 460 C 150 440 190 360 170 300 Z" fill="url(#potatoSkin)" stroke="#4a2e19" stroke-width="3"/>
  <ellipse cx="230" cy="220" rx="14" ry="6" fill="#3b210e" transform="rotate(-15 230 220)"/>
  <ellipse cx="380" cy="210" rx="16" ry="7" fill="#3b210e" transform="rotate(10 380 210)"/>
  <ellipse cx="440" cy="330" rx="15" ry="6" fill="#3b210e" transform="rotate(40 440 330)"/>
  <g fill="url(#scabPatch)" stroke="#1a0c04" stroke-width="1.5">
    <circle cx="280" cy="280" r="24"/>
    <circle cx="315" cy="295" r="28"/>
    <circle cx="345" cy="275" r="20"/>
    <circle cx="300" cy="335" r="22"/>
    <circle cx="410" cy="380" r="18"/>
  </g>
  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Russet Potato (Solanum tuberosum) - Common Scab</text>
  <text x="30" y="585" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Raised corky eruptive scab lesions on tuber periderm</text>
</svg>
`;

// 5. Apple with Apple Scab & Bitter Rot
const appleScabSvg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgApple" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#26292b"/>
      <stop offset="100%" stop-color="#121314"/>
    </radialGradient>
    <radialGradient id="appleRed" cx="35%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#ff5247"/>
      <stop offset="40%" stop-color="#e01a24"/>
      <stop offset="75%" stop-color="#990b14"/>
      <stop offset="100%" stop-color="#540409"/>
    </radialGradient>
    <radialGradient id="scabLesion" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#242e18"/>
      <stop offset="60%" stop-color="#161c0d"/>
      <stop offset="90%" stop-color="#4a3e21"/>
      <stop offset="100%" stop-color="#805b19"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgApple)"/>
  <ellipse cx="300" cy="515" rx="175" ry="30" fill="#080809" opacity="0.8"/>
  <!-- Stem & Leaf -->
  <path d="M 300 135 C 310 90 325 60 350 40" stroke="#5a3d1c" stroke-width="6" stroke-linecap="round" fill="none"/>
  <path d="M 315 90 Q 360 70 380 95 Q 350 120 315 90 Z" fill="#4d7c0f" stroke="#365314" stroke-width="1.5"/>
  <!-- Apple Body -->
  <path d="M 300 135 C 340 135 445 155 450 290 C 455 425 365 480 300 480 C 235 480 145 425 150 290 C 155 155 260 135 300 135 Z" fill="url(#appleRed)" stroke="#420307" stroke-width="3"/>
  <ellipse cx="230" cy="230" rx="30" ry="50" transform="rotate(-25 230 230)" fill="#ffffff" opacity="0.25"/>
  <!-- Apple Scab & Bitter Rot Craters -->
  <circle cx="340" cy="270" r="32" fill="url(#scabLesion)" stroke="#111609" stroke-width="2"/>
  <circle cx="340" cy="270" r="20" stroke="#997a3d" stroke-width="1.5" stroke-dasharray="4,2" fill="none"/>
  <circle cx="250" cy="340" r="26" fill="url(#scabLesion)" stroke="#111609" stroke-width="2"/>
  <circle cx="380" cy="360" r="22" fill="url(#scabLesion)" stroke="#111609" stroke-width="1.5"/>
  <circle cx="280" cy="400" r="16" fill="url(#scabLesion)"/>
  <circle cx="340" cy="270" r="6" fill="#f472b6" opacity="0.75"/>
  <circle cx="346" cy="265" r="4" fill="#f472b6" opacity="0.75"/>
  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Honeycrisp Apple (Malus domestica) - Apple Scab & Rot</text>
  <text x="30" y="585" fill="#eab308" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Olive-black corky cracked scabs & salmon spore dots</text>
</svg>
`;

// 6. Banana with Anthracnose & Crown Rot
const bananaAnthracnoseSvg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgBanana" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1f2324"/>
      <stop offset="100%" stop-color="#101213"/>
    </radialGradient>
    <linearGradient id="bananaYellow" x1="20%" y1="20%" x2="80%" y2="80%">
      <stop offset="0%" stop-color="#ffe359"/>
      <stop offset="50%" stop-color="#f5c723"/>
      <stop offset="85%" stop-color="#cf980c"/>
      <stop offset="100%" stop-color="#8a5f00"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgBanana)"/>
  <ellipse cx="300" cy="510" rx="200" ry="25" fill="#070809" opacity="0.8"/>
  <!-- Crown stalk (Rotting brown) -->
  <path d="M 120 160 C 130 130 145 120 165 125 C 160 145 150 175 140 190 Z" fill="#3b220d" stroke="#211205" stroke-width="2"/>
  <!-- Banana Curve Body -->
  <path d="M 140 180 C 220 200 380 230 460 360 C 490 410 495 440 480 455 C 465 470 435 460 395 410 C 310 300 200 240 135 200 Z" fill="url(#bananaYellow)" stroke="#664700" stroke-width="2.5"/>
  <!-- Brown / Black Anthracnose Diamond Blotch Spots -->
  <ellipse cx="320" cy="275" rx="28" ry="18" fill="#241407" stroke="#fb923c" stroke-width="1.2" transform="rotate(25 320 275)"/>
  <circle cx="320" cy="275" r="7" fill="#fb923c" opacity="0.85"/>
  <ellipse cx="390" cy="335" rx="34" ry="22" fill="#1c0f04" stroke="#fb923c" stroke-width="1.5" transform="rotate(35 390 335)"/>
  <circle cx="390" cy="335" r="9" fill="#fb923c" opacity="0.9"/>
  <ellipse cx="440" cy="390" rx="26" ry="16" fill="#1f1005" transform="rotate(45 440 390)"/>
  <circle cx="230" cy="225" r="8" fill="#3b220d"/>
  <circle cx="270" cy="245" r="10" fill="#3b220d"/>
  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Cavendish Banana (Musa acuminata) - Anthracnose</text>
  <text x="30" y="585" fill="#fb923c" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Sunken black lesions with salmon-orange spore droplets</text>
</svg>
`;

// 7. Orange with Citrus Canker & Green Mold
const orangeCankerSvg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgCitrus" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#242628"/>
      <stop offset="100%" stop-color="#121315"/>
    </radialGradient>
    <radialGradient id="orangeRind" cx="38%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#ff9924"/>
      <stop offset="50%" stop-color="#e66e00"/>
      <stop offset="85%" stop-color="#ad4800"/>
      <stop offset="100%" stop-color="#6e2a00"/>
    </radialGradient>
    <radialGradient id="greenMold" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2d5236"/>
      <stop offset="60%" stop-color="#1f3b26"/>
      <stop offset="85%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#ff9924" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgCitrus)"/>
  <ellipse cx="300" cy="510" rx="180" ry="30" fill="#080809" opacity="0.8"/>
  <!-- Calyx button -->
  <circle cx="300" cy="140" r="10" fill="#2d5016"/>
  <circle cx="300" cy="330" r="175" fill="url(#orangeRind)" stroke="#521f00" stroke-width="3"/>
  <ellipse cx="230" cy="250" rx="25" ry="40" transform="rotate(-30 230 250)" fill="#ffffff" opacity="0.2"/>
  <!-- Green Mold (Penicillium digitatum) Spore Patch -->
  <circle cx="360" cy="340" r="55" fill="url(#greenMold)"/>
  <circle cx="360" cy="340" r="38" fill="#315c3c" stroke="#16301d" stroke-width="1.5"/>
  <circle cx="360" cy="340" r="18" fill="#1e3b24"/>
  <!-- Canker Crater Pustules with Yellow Halos -->
  <circle cx="240" cy="350" r="18" fill="#542e0d" stroke="#facc15" stroke-width="4"/>
  <circle cx="240" cy="350" r="8" fill="#261202"/>
  <circle cx="280" cy="420" r="14" fill="#542e0d" stroke="#facc15" stroke-width="3.5"/>
  <circle cx="200" cy="280" r="12" fill="#542e0d" stroke="#facc15" stroke-width="3"/>
  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Valencia Orange (Citrus sinensis) - Canker & Green Mold</text>
  <text x="30" y="585" fill="#4ade80" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Corky crater pustules with yellow halos + green spore mold</text>
</svg>
`;

// 8. Strawberry with Gray Mold (Botrytis cinerea)
const strawberryGrayMoldSvg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgBerry" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#232629"/>
      <stop offset="100%" stop-color="#121314"/>
    </radialGradient>
    <radialGradient id="strawberryRed" cx="40%" cy="38%" r="60%">
      <stop offset="0%" stop-color="#ff334b"/>
      <stop offset="55%" stop-color="#d61129"/>
      <stop offset="85%" stop-color="#8a0515"/>
      <stop offset="100%" stop-color="#4d010b"/>
    </radialGradient>
    <radialGradient id="grayMold" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#64748b"/>
      <stop offset="60%" stop-color="#475569"/>
      <stop offset="90%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#1e293b" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgBerry)"/>
  <ellipse cx="300" cy="510" rx="170" ry="28" fill="#080809" opacity="0.8"/>
  <!-- Calyx Leaves -->
  <g fill="#2d6a1b" stroke="#1b450e" stroke-width="2">
    <path d="M 300 150 C 260 110 200 120 180 135 C 220 150 260 155 300 160 Z"/>
    <path d="M 300 150 C 340 110 400 120 420 135 C 380 150 340 155 300 160 Z"/>
    <path d="M 300 150 C 290 80 305 60 310 50 C 315 70 310 110 300 150 Z" fill="#1b450e"/>
  </g>
  <!-- Berry Heart Shape -->
  <path d="M 300 160 C 430 160 450 300 390 420 C 340 480 300 500 300 500 C 300 500 260 480 210 420 C 150 300 170 160 300 160 Z" fill="url(#strawberryRed)" stroke="#4a020a" stroke-width="3"/>
  <!-- Yellow Achenes / Seeds -->
  <g fill="#fef08a" opacity="0.85">
    <circle cx="250" cy="220" r="3"/><circle cx="280" cy="200" r="3"/><circle cx="320" cy="210" r="3"/><circle cx="350" cy="230" r="3"/>
    <circle cx="230" cy="280" r="3"/><circle cx="260" cy="270" r="3"/><circle cx="280" cy="330" r="3"/><circle cx="250" cy="380" r="3"/>
  </g>
  <!-- Botrytis Gray Mold Fuzz on Shoulder & Side -->
  <ellipse cx="360" cy="290" rx="65" ry="75" fill="url(#grayMold)"/>
  <g fill="#94a3b8" opacity="0.9">
    <circle cx="340" cy="260" r="8"/><circle cx="370" cy="270" r="10"/><circle cx="390" cy="290" r="9"/>
    <circle cx="360" cy="310" r="11"/><circle cx="330" cy="300" r="8"/><circle cx="380" cy="330" r="8"/>
  </g>
  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Garden Strawberry (Fragaria) - Gray Mold (Botrytis)</text>
  <text x="30" y="585" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Soft watery rot covered with dense smoky-gray velvet fuzz</text>
</svg>
`;

// 9. Bell Pepper with Anthracnose & Bacterial Spot
const pepperAnthracnoseSvg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgPepper" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#242628"/>
      <stop offset="100%" stop-color="#121415"/>
    </radialGradient>
    <radialGradient id="pepperYellow" cx="38%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#facc15"/>
      <stop offset="60%" stop-color="#ca8a04"/>
      <stop offset="90%" stop-color="#854d0e"/>
      <stop offset="100%" stop-color="#422006"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgPepper)"/>
  <ellipse cx="300" cy="510" rx="180" ry="30" fill="#080809" opacity="0.8"/>
  <!-- Stem & Cap -->
  <path d="M 300 130 C 290 80 310 60 330 45" stroke="#365314" stroke-width="8" stroke-linecap="round" fill="none"/>
  <path d="M 240 140 Q 300 120 360 140 Q 300 160 240 140 Z" fill="#4d7c0f"/>
  <!-- Pepper Body -->
  <path d="M 240 140 C 180 160 160 280 180 400 C 200 480 250 490 270 480 C 290 470 300 470 310 480 C 330 490 380 480 400 400 C 420 280 400 160 340 140 Z" fill="url(#pepperYellow)" stroke="#5e3a00" stroke-width="3"/>
  <!-- Anthracnose Sunken Circles -->
  <circle cx="280" cy="300" r="36" fill="#291807" stroke="#fb923c" stroke-width="2"/>
  <circle cx="280" cy="300" r="22" stroke="#ea580c" stroke-width="1.5" stroke-dasharray="4,2" fill="none"/>
  <circle cx="280" cy="300" r="8" fill="#fb923c" opacity="0.9"/>
  <circle cx="340" cy="370" r="28" fill="#291807" stroke="#fb923c" stroke-width="2"/>
  <circle cx="340" cy="370" r="6" fill="#fb923c" opacity="0.9"/>
  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Bell Pepper (Capsicum annuum) - Anthracnose Rot</text>
  <text x="30" y="585" fill="#fb923c" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Sunken circular leathery craters with orange spore tendrils</text>
</svg>
`;

// 10. Cabbage with Black Rot
const cabbageBlackRotSvg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgCabbage" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#202421"/>
      <stop offset="100%" stop-color="#101311"/>
    </radialGradient>
    <radialGradient id="cabbageGreen" cx="45%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#86efac"/>
      <stop offset="50%" stop-color="#22c55e"/>
      <stop offset="85%" stop-color="#15803d"/>
      <stop offset="100%" stop-color="#14532d"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgCabbage)"/>
  <ellipse cx="300" cy="510" rx="190" ry="30" fill="#080809" opacity="0.8"/>
  <!-- Outer Leaves Layer -->
  <circle cx="300" cy="330" r="180" fill="url(#cabbageGreen)" stroke="#0f381e" stroke-width="3"/>
  <path d="M 180 200 Q 300 160 420 200 Q 460 330 400 440 Q 300 490 200 440 Z" fill="#4ade80" opacity="0.6" stroke="#166534" stroke-width="2"/>
  <circle cx="300" cy="330" r="120" fill="#bbf7d0" stroke="#16a34a" stroke-width="2"/>
  <!-- V-Shaped Yellow Black Rot Lesion on Leaf Margin -->
  <path d="M 400 200 L 470 290 L 370 310 Z" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
  <!-- Blackened Net Veins inside V-wedge -->
  <path d="M 470 290 L 400 240 M 440 270 L 385 285 M 420 250 L 390 260" stroke="#18181b" stroke-width="2.5" stroke-linecap="round"/>
  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Green Cabbage (Brassica oleracea) - Black Rot</text>
  <text x="30" y="585" fill="#eab308" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Marginal V-shaped yellow wedge with blackened leaf veins</text>
</svg>
`;

// 11. Carrot with Cavity Spot
const carrotCavitySpotSvg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgCarrot" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#242628"/>
      <stop offset="100%" stop-color="#121314"/>
    </radialGradient>
    <linearGradient id="carrotOrange" x1="30%" y1="0%" x2="70%" y2="100%">
      <stop offset="0%" stop-color="#fb923c"/>
      <stop offset="40%" stop-color="#ea580c"/>
      <stop offset="85%" stop-color="#9a3412"/>
      <stop offset="100%" stop-color="#431407"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgCarrot)"/>
  <ellipse cx="300" cy="520" rx="150" ry="25" fill="#080809" opacity="0.8"/>
  <!-- Green Feathery Top Leaves -->
  <g stroke="#16a34a" stroke-width="3" stroke-linecap="round" fill="none">
    <path d="M 300 130 C 280 80 240 50 200 40"/>
    <path d="M 300 130 C 300 70 310 40 320 30"/>
    <path d="M 300 130 C 320 80 360 50 400 40"/>
  </g>
  <!-- Carrot Taproot -->
  <path d="M 230 140 Q 300 130 370 140 L 315 490 Q 300 500 285 490 Z" fill="url(#carrotOrange)" stroke="#431407" stroke-width="3"/>
  <!-- Horizontal Cavity Spot Elliptical Slits -->
  <ellipse cx="295" cy="220" rx="28" ry="8" fill="#271203" stroke="#451a03" stroke-width="1.5"/>
  <ellipse cx="310" cy="280" rx="34" ry="10" fill="#271203" stroke="#451a03" stroke-width="1.5"/>
  <ellipse cx="285" cy="350" rx="24" ry="7" fill="#271203" stroke="#451a03" stroke-width="1.5"/>
  <ellipse cx="300" cy="410" rx="18" ry="6" fill="#271203" stroke="#451a03" stroke-width="1.5"/>
  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Nantes Carrot (Daucus carota) - Cavity Spot</text>
  <text x="30" y="585" fill="#ea580c" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Horizontal dark sunken elliptical crater slits on taproot</text>
</svg>
`;

// 12. Grapes with Downy Mildew & Bunch Rot
const grapesDownyMildewSvg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrape" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#232528"/>
      <stop offset="100%" stop-color="#111213"/>
    </radialGradient>
    <radialGradient id="grapePurple" cx="35%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="50%" stop-color="#7e22ce"/>
      <stop offset="85%" stop-color="#3b0764"/>
      <stop offset="100%" stop-color="#1a0230"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgGrape)"/>
  <ellipse cx="300" cy="515" rx="160" ry="25" fill="#080809" opacity="0.8"/>
  <!-- Vine Stem & Grapevine Leaf -->
  <path d="M 300 80 Q 300 130 300 160" stroke="#713f12" stroke-width="6" stroke-linecap="round" fill="none"/>
  <path d="M 230 110 Q 300 70 370 110 Q 340 160 230 110 Z" fill="#65a30d" stroke="#365314" stroke-width="2"/>
  <!-- Grape Cluster Berries -->
  <g stroke="#1a0230" stroke-width="1.5">
    <circle cx="260" cy="200" r="26" fill="url(#grapePurple)"/>
    <circle cx="310" cy="190" r="28" fill="url(#grapePurple)"/>
    <circle cx="355" cy="210" r="25" fill="url(#grapePurple)"/>
    <circle cx="230" cy="250" r="25" fill="url(#grapePurple)"/>
    <circle cx="280" cy="250" r="28" fill="url(#grapePurple)"/>
    <circle cx="330" cy="260" r="27" fill="url(#grapePurple)"/>
    <circle cx="375" cy="270" r="24" fill="url(#grapePurple)"/>
    <!-- Shriveled rot berries with white downy mold -->
    <ellipse cx="260" cy="310" rx="20" ry="26" fill="#382314" stroke="#64748b"/>
    <circle cx="260" cy="310" r="8" fill="#e2e8f0" opacity="0.85"/>
    <ellipse cx="310" cy="320" rx="18" ry="24" fill="#382314" stroke="#64748b"/>
    <circle cx="310" cy="320" r="7" fill="#e2e8f0" opacity="0.85"/>
    <circle cx="350" cy="330" r="22" fill="url(#grapePurple)"/>
    <circle cx="290" cy="375" r="22" fill="url(#grapePurple)"/>
    <ellipse cx="325" cy="385" rx="16" ry="20" fill="#382314"/>
    <circle cx="305" cy="430" r="18" fill="url(#grapePurple)"/>
  </g>
  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Table Grapes (Vitis vinifera) - Downy Mildew & Bunch Rot</text>
  <text x="30" y="585" fill="#c084fc" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Shriveled brown leathery berries with white downy felt</text>
</svg>
`;

export const SAMPLE_VEGETABLES: SamplePreset[] = [
  // 1. ONION
  {
    id: "sample-onion-black-mold",
    title: "Yellow Onion - Black Mold Rot",
    vegetable: "Onion",
    conditionName: "Black Mold (Aspergillus niger)",
    expectedHealth: "SEVERE_DAMAGE",
    description: "Post-harvest storage rot with black sooty spores between outer bulb tunics and soft neck decay.",
    imageData: svgToDataUrl(onionBlackMoldSvg),
    notes: "Warm storage room (>28°C) with 80% humidity. Scales feel slightly soft.",
  },
  // 2. RED ONION
  {
    id: "sample-onion-purple-blotch",
    title: "Red Onion - Purple Blotch Disease",
    vegetable: "Onion",
    conditionName: "Purple Blotch (Alternaria porri)",
    expectedHealth: "MODERATE_DISEASE",
    description: "Sunken elliptical purple necrotic lesions with yellow halo margins on the bulb neck.",
    imageData: svgToDataUrl(onionPurpleBlotchSvg),
    notes: "Field harvested after warm rainy spell. Neck tissue shows brownish-purple rings.",
  },
  // 3. TOMATO
  {
    id: "sample-tomato-late-blight",
    title: "Tomato - Late Blight Fruit Rot",
    vegetable: "Tomato",
    conditionName: "Late Blight (Phytophthora infestans)",
    expectedHealth: "SPOILED_UNFIT",
    description: "Greasy olive-brown firm necrotic rot expanding across the fruit surface with white mold fringe.",
    imageData: svgToDataUrl(tomatoLateBlightSvg),
    notes: "Greenhouse humid foggy conditions. Fruit rapidly turning brown and leathery.",
  },
  // 4. POTATO
  {
    id: "sample-potato-scab",
    title: "Russet Potato - Common Scab",
    vegetable: "Potato",
    conditionName: "Common Scab (Streptomyces scabies)",
    expectedHealth: "MILD_ISSUE",
    description: "Raised corky, rough circular scab craters on the potato skin while internal flesh remains firm.",
    imageData: svgToDataUrl(potatoScabSvg),
    notes: "Harvested from alkaline sandy soil (pH 7.4). Pitted scab craters across tuber.",
  },
  // 5. APPLE
  {
    id: "sample-apple-scab",
    title: "Apple - Scab & Bitter Rot",
    vegetable: "Apple",
    conditionName: "Apple Scab (Venturia inaequalis)",
    expectedHealth: "MODERATE_DISEASE",
    description: "Olive-black corky cracked scabs and sunken saucer lesions with salmon-pink spore rings.",
    imageData: svgToDataUrl(appleScabSvg),
    notes: "Cool wet spring in orchard. Surface cracking and bitter rot spots.",
  },
  // 6. BANANA
  {
    id: "sample-banana-anthracnose",
    title: "Banana - Anthracnose & Crown Rot",
    vegetable: "Banana",
    conditionName: "Banana Anthracnose (Colletotrichum musae)",
    expectedHealth: "SEVERE_DAMAGE",
    description: "Sunken black diamond lesions on peel with salmon-orange spore droplets and neck softening.",
    imageData: svgToDataUrl(bananaAnthracnoseSvg),
    notes: "Ripening room batch. Finger drop occurring at crown neck.",
  },
  // 7. ORANGE / CITRUS
  {
    id: "sample-orange-canker",
    title: "Orange - Citrus Canker & Green Mold",
    vegetable: "Orange",
    conditionName: "Citrus Canker & Penicillium Mold",
    expectedHealth: "SEVERE_DAMAGE",
    description: "Raised volcano-like corky pustules with yellow halos plus green velvety spore mold.",
    imageData: svgToDataUrl(orangeCankerSvg),
    notes: "Storage crate showing green spore powder and rind canker scabs.",
  },
  // 8. STRAWBERRY
  {
    id: "sample-strawberry-gray-mold",
    title: "Strawberry - Gray Mold (Botrytis)",
    vegetable: "Strawberry",
    conditionName: "Gray Mold (Botrytis cinerea)",
    expectedHealth: "SPOILED_UNFIT",
    description: "Soft watery fruit breakdown covered in dense, smoky-gray velvety fungal fuzz.",
    imageData: svgToDataUrl(strawberryGrayMoldSvg),
    notes: "Post-rain harvest in field punnet. Soft berry rapidly molding.",
  },
  // 9. BELL PEPPER
  {
    id: "sample-pepper-anthracnose",
    title: "Bell Pepper - Anthracnose Rot",
    vegetable: "Bell Pepper",
    conditionName: "Pepper Anthracnose (Colletotrichum)",
    expectedHealth: "SEVERE_DAMAGE",
    description: "Sunken circular leathery craters with concentric salmon-orange spore tendrils.",
    imageData: svgToDataUrl(pepperAnthracnoseSvg),
    notes: "Standing crop pods turning soft and sunken after heavy rainfall.",
  },
  // 10. CABBAGE
  {
    id: "sample-cabbage-black-rot",
    title: "Cabbage - Black Rot (Xanthomonas)",
    vegetable: "Cabbage",
    conditionName: "Black Rot of Crucifers",
    expectedHealth: "MODERATE_DISEASE",
    description: "Distinct V-shaped yellow chlorotic leaf margin wedge with blackened netted veins.",
    imageData: svgToDataUrl(cabbageBlackRotSvg),
    notes: "Field cabbage showing yellowing margins and blackened vein network.",
  },
  // 11. CARROT
  {
    id: "sample-carrot-cavity-spot",
    title: "Carrot - Cavity Spot Slits",
    vegetable: "Carrot",
    conditionName: "Cavity Spot (Pythium sulcatum)",
    expectedHealth: "MILD_ISSUE",
    description: "Horizontal dark sunken elliptical crater slits across the taproot surface.",
    imageData: svgToDataUrl(carrotCavitySpotSvg),
    notes: "Heavy clay soil with high winter moisture. Superficial brown slits.",
  },
  // 12. GRAPES
  {
    id: "sample-grapes-downy-mildew",
    title: "Grapes - Downy Mildew & Bunch Rot",
    vegetable: "Grapes",
    conditionName: "Grapevine Downy Mildew",
    expectedHealth: "SEVERE_DAMAGE",
    description: "Shriveled hard brown leathery berries with white downy fungal spore coating.",
    imageData: svgToDataUrl(grapesDownyMildewSvg),
    notes: "Vineyard block after rain spell. Bunch berries turning into dry leathery mummies.",
  },
];
