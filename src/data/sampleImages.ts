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

// 5. Bell Pepper with Anthracnose Rot
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

// 6. Cabbage with Black Rot
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

// 7. Carrot with Cavity Spot
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

// 8. Cucumber with Powdery Mildew & Anthracnose
const cucumberDiseaseSvg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgCuke" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1f2520"/>
      <stop offset="100%" stop-color="#101311"/>
    </radialGradient>
    <linearGradient id="cukeGreen" x1="20%" y1="20%" x2="80%" y2="80%">
      <stop offset="0%" stop-color="#4ade80"/>
      <stop offset="40%" stop-color="#16a34a"/>
      <stop offset="80%" stop-color="#15803d"/>
      <stop offset="100%" stop-color="#14532d"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgCuke)"/>
  <ellipse cx="300" cy="510" rx="190" ry="28" fill="#080809" opacity="0.8"/>
  <!-- Stem -->
  <path d="M 170 190 Q 150 160 135 150" stroke="#15803d" stroke-width="8" stroke-linecap="round" fill="none"/>
  <!-- Cucumber Curved Body -->
  <path d="M 170 190 C 230 200 370 230 450 330 C 480 370 485 410 460 435 C 430 460 380 430 330 360 C 270 280 200 240 160 210 Z" fill="url(#cukeGreen)" stroke="#0f381e" stroke-width="3"/>
  <!-- Warty Bumps & Spines -->
  <circle cx="220" cy="240" r="4" fill="#86efac"/>
  <circle cx="280" cy="280" r="5" fill="#86efac"/>
  <circle cx="340" cy="330" r="4" fill="#86efac"/>
  <circle cx="400" cy="380" r="5" fill="#86efac"/>
  <!-- Anthracnose Sunken Brown Craters with Spore Center -->
  <ellipse cx="310" cy="310" rx="26" ry="18" fill="#2d1c0b" stroke="#ca8a04" stroke-width="1.5" transform="rotate(25 310 310)"/>
  <circle cx="310" cy="310" r="6" fill="#fb923c" opacity="0.9"/>
  <ellipse cx="390" cy="370" rx="22" ry="15" fill="#2d1c0b" stroke="#ca8a04" stroke-width="1.5" transform="rotate(35 390 370)"/>
  <circle cx="390" cy="370" r="5" fill="#fb923c" opacity="0.9"/>
  <!-- Powdery Mildew White Felt Patches -->
  <ellipse cx="230" cy="230" rx="24" ry="14" fill="#ffffff" opacity="0.4" transform="rotate(-15 230 230)"/>
  <ellipse cx="265" cy="260" rx="20" ry="12" fill="#ffffff" opacity="0.45" transform="rotate(10 265 260)"/>
  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Cucumber (Cucumis sativus) - Anthracnose &amp; Mildew</text>
  <text x="30" y="585" fill="#4ade80" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Sunken leathery brown craters with salmon centers &amp; white felt</text>
</svg>
`;

// 9. Eggplant / Brinjal with Phomopsis Fruit Rot
const eggplantRotSvg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgEggplant" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#242129"/>
      <stop offset="100%" stop-color="#121017"/>
    </radialGradient>
    <radialGradient id="eggplantPurple" cx="35%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#581c87"/>
      <stop offset="45%" stop-color="#3b0764"/>
      <stop offset="85%" stop-color="#1e053a"/>
      <stop offset="100%" stop-color="#0e011c"/>
    </radialGradient>
    <radialGradient id="eggplantRot" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#382312"/>
      <stop offset="60%" stop-color="#54361c"/>
      <stop offset="90%" stop-color="#785028"/>
      <stop offset="100%" stop-color="#3b0764" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgEggplant)"/>
  <ellipse cx="300" cy="515" rx="180" ry="32" fill="#080809" opacity="0.8"/>
  <!-- Calyx & Stem -->
  <path d="M 300 120 C 300 80 310 50 320 40" stroke="#3f6212" stroke-width="8" stroke-linecap="round" fill="none"/>
  <g fill="#4d7c0f" stroke="#365314" stroke-width="2">
    <path d="M 300 125 L 240 180 L 270 140 Z"/>
    <path d="M 300 125 L 360 180 L 330 140 Z"/>
    <path d="M 300 125 L 300 190 L 315 140 Z"/>
  </g>
  <!-- Eggplant Body -->
  <path d="M 300 130 C 220 160 170 280 180 390 C 190 470 240 495 300 495 C 360 495 410 470 420 390 C 430 280 380 160 300 130 Z" fill="url(#eggplantPurple)" stroke="#1a0230" stroke-width="3"/>
  <ellipse cx="240" cy="240" rx="25" ry="45" transform="rotate(-20 240 240)" fill="#ffffff" opacity="0.25"/>
  <!-- Phomopsis Soft Rot Blotch -->
  <ellipse cx="310" cy="360" rx="65" ry="55" fill="url(#eggplantRot)" stroke="#271404" stroke-width="2"/>
  <!-- Concentric Rings of Tiny Black Pycnidia Pustules -->
  <g fill="#18181b">
    <circle cx="310" cy="360" r="5"/>
    <circle cx="295" cy="345" r="4"/><circle cx="325" cy="345" r="4"/><circle cx="310" cy="380" r="4"/>
    <circle cx="280" cy="335" r="3.5"/><circle cx="340" cy="335" r="3.5"/><circle cx="275" cy="370" r="3.5"/><circle cx="345" cy="370" r="3.5"/>
    <circle cx="300" cy="400" r="3"/><circle cx="320" cy="400" r="3"/>
  </g>
  <text x="30" y="565" fill="#ffffff" opacity="0.8" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">Specimen: Eggplant / Brinjal (Solanum melongena) - Phomopsis Rot</text>
  <text x="30" y="585" fill="#c084fc" font-family="system-ui, sans-serif" font-size="13">Visual Marker: Sunken brown soft rot patch with concentric black pimples</text>
</svg>
`;

export const SAMPLE_VEGETABLES: SamplePreset[] = [
  // 1. ONION - BLACK MOLD
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
  // 2. RED ONION - PURPLE BLOTCH
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
  // 3. TOMATO - LATE BLIGHT
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
  // 4. POTATO - COMMON SCAB
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
  // 5. BELL PEPPER - ANTHRACNOSE
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
  // 6. CABBAGE - BLACK ROT
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
  // 7. CARROT - CAVITY SPOT
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
  // 8. CUCUMBER - ANTHRACNOSE & MILDEW
  {
    id: "sample-cucumber-mildew",
    title: "Cucumber - Anthracnose & Powdery Mildew",
    vegetable: "Cucumber",
    conditionName: "Cucurbit Anthracnose & Powdery Felt",
    expectedHealth: "MODERATE_DISEASE",
    description: "Sunken leathery circular craters on fruit rind with powdery white fungal felt on neck.",
    imageData: svgToDataUrl(cucumberDiseaseSvg),
    notes: "Greenhouse trellis cucumber. High humidity with morning dew.",
  },
  // 9. EGGPLANT / BRINJAL - PHOMOPSIS ROT
  {
    id: "sample-eggplant-phomopsis",
    title: "Eggplant - Phomopsis Fruit Rot",
    vegetable: "Eggplant",
    conditionName: "Phomopsis Blight & Fruit Rot",
    expectedHealth: "SEVERE_DAMAGE",
    description: "Sunken circular brown water-soaked soft rot lesion covered in concentric black pycnidia pustules.",
    imageData: svgToDataUrl(eggplantRotSvg),
    notes: "Garden bed during warm humid monsoon weather. Calyx turning brown.",
  },
];

export const SAMPLE_PRESETS = SAMPLE_VEGETABLES;

