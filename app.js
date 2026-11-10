/* Birthday planner. You shouldn't need to edit this file; see config.js.
   Flow and look adapted from datebyte by Tharushka Dinujaya (MIT License). */
(() => {
  "use strict";
  const C = window.BIRTHDAY;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const showHints = location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);

  /* ------------------------------------------------------------- icons */
  const ICONS = {
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    coffee: '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M6 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>',
    fish: '<path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    wine: '<path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/>',
    home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    spa: '<circle cx="12" cy="12" r="3"/><path d="M12 9a3 3 0 1 1 3-3 3 3 0 1 1-3 3"/><path d="M12 9a3 3 0 1 0-3-3 3 3 0 1 0 3 3"/><path d="M12 15a3 3 0 1 1 3 3 3 3 0 1 1-3-3"/><path d="M12 15a3 3 0 1 0-3 3 3 3 0 1 0 3-3"/>',
    palette: '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    gamepad: '<path d="M6 12h4"/><path d="M8 10v4"/><path d="M15 13h.01"/><path d="M18 11h.01"/><path d="M17.32 5H6.68a4 4 0 0 0-3.98 3.59C2.6 9.42 2 14.46 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.41-1.41A2 2 0 0 1 9.83 16h4.34a2 2 0 0 1 1.41.59L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.55-.6-6.58-.69-7.26A4 4 0 0 0 17.32 5z"/>',
    museum: '<path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M12 2 20 7H4z"/>',
    star: '<path d="M11.53 2.3a.53.53 0 0 1 .95 0l2.31 4.68a2.12 2.12 0 0 0 1.6 1.16l5.16.76a.53.53 0 0 1 .3.9l-3.74 3.64a2.12 2.12 0 0 0-.61 1.88l.88 5.14a.53.53 0 0 1-.77.56l-4.62-2.43a2.12 2.12 0 0 0-1.97 0L6.4 21.01a.53.53 0 0 1-.77-.56l.88-5.14a2.12 2.12 0 0 0-.61-1.88L2.16 9.8a.53.53 0 0 1 .3-.9l5.16-.76a2.12 2.12 0 0 0 1.6-1.16z"/>',
    film: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    popcorn: '<path d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4"/><path d="M10 22 9 8"/><path d="m14 22 1-14"/><path d="M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>'
  };
  const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.heart}</svg>`;
  const HEART_FILL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';

  /* ---------------------------------------------------- background hearts */
  const HEARTS = [
    [15, 0, .6, 12, "#f9a8d4"], [25, 1, .7, 14, "#fda4af"], [35, 2, .5, 16, "rgba(251,207,232,.8)"],
    [45, .5, .8, 18, "rgba(254,205,211,.8)"], [55, 1.5, .6, 13, "#f9a8d4"], [65, 2.5, .7, 15, "#fda4af"],
    [75, .3, .5, 17, "rgba(251,207,232,.8)"], [85, 1.8, .75, 14, "rgba(254,205,211,.8)"],
    [10, 3, .6, 16, "#f9a8d4"], [90, .8, .65, 12, "#fda4af"]
  ];
  $("#hearts").innerHTML = HEARTS.map(([l, d, s, t, c]) =>
    `<span style="left:${l}%;--s:${s};animation-duration:${t}s;animation-delay:${d}s;color:${c}">${HEART_FILL}</span>`).join("");
  const SPARKS = [[12,15,5,0],[25,35,6,.5],[38,22,4,1],[52,45,7,1.5],[68,18,5,2],[81,40,6,.3],[15,65,4,.8],[45,72,5,1.2],[72,68,6,1.8],[88,25,4,2.2],[35,8,5,.6],[62,85,7,1.4],[92,55,5,.9],[8,48,6,1.6],[78,12,4,2],[28,80,5,.4],[55,28,6,1.1],[18,92,4,1.9]];
  $("#sparkles").innerHTML = SPARKS.map(([l, t, s, d]) => `<i style="left:${l}%;top:${t}%;width:${s}px;height:${s}px;animation-delay:${d}s"></i>`).join("");

  /* ------------------------------------------------ the birthday cat */
  // A round cat portrait with a drawn party hat on top.
  let hatId = 0;
  function hatSVG() {
    const id = "hat" + (hatId++);
    return `<svg class="hat" viewBox="0 0 100 130" aria-hidden="true">
      <defs>
        <linearGradient id="${id}g" x1="0" x2="1"><stop offset="0" stop-color="#f472b6"/><stop offset="1" stop-color="#ec4899"/></linearGradient>
        <clipPath id="${id}c"><path d="M50 14 L90 116 Q50 128 10 116 Z"/></clipPath>
      </defs>
      <path d="M50 14 L90 116 Q50 128 10 116 Z" fill="url(#${id}g)" stroke="#9d174d" stroke-width="3" stroke-linejoin="round"/>
      <g clip-path="url(#${id}c)" fill="#fde68a" opacity=".95">
        <path d="M-10 70 L110 30 L110 44 L-10 84 Z"/><path d="M-10 108 L110 68 L110 82 L-10 122 Z"/>
      </g>
      <g fill="#fff"><circle cx="42" cy="58" r="3"/><circle cx="60" cy="96" r="3.5"/><circle cx="34" cy="98" r="2.5"/><circle cx="66" cy="62" r="2.2"/></g>
      <path d="M8 116 q7 -8 14 0 t14 0 t14 0 t14 0 t14 0 t14 0" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
      <circle cx="50" cy="12" r="10" fill="#fde68a" stroke="#9d174d" stroke-width="2.5"/>
    </svg>`;
  }
  // Crochet-style bucket hats for the dogs (inspired by a knitted piggy hat).
  function bucketHat(kind) {
    const id = "bh" + (hatId++);
    const pig = kind === "pig";
    const main = pig ? "#f9b8c9" : "#8fd19e", dark = pig ? "#e07a98" : "#4f9e63", light = pig ? "#fcd3dd" : "#b9e6c2";
    const stitches = `<pattern id="${id}s" width="8" height="7" patternUnits="userSpaceOnUse"><path d="M1 2 l3 3 l3 -3" fill="none" stroke="${light}" stroke-width="1.4" stroke-linecap="round"/></pattern>`;
    const crown = "M24 64 Q22 16 60 13 Q98 16 96 64 Z";
    const brim = "M4 66 Q12 57 23 61 Q33 55 43 60 Q52 55 60 59 Q68 55 77 60 Q87 55 97 61 Q108 57 116 66 Q114 80 98 78 Q87 84 77 79 Q68 85 60 80 Q52 85 43 79 Q33 84 22 78 Q6 80 4 66 Z";
    const face = pig
      ? `<path d="M30 30 Q22 6 46 16 Z" fill="${main}" stroke="${dark}" stroke-width="2.5" stroke-linejoin="round"/><path d="M33 26 Q29 13 42 18 Z" fill="#f48fb1"/>
         <path d="M90 30 Q98 6 74 16 Z" fill="${main}" stroke="${dark}" stroke-width="2.5" stroke-linejoin="round"/><path d="M87 26 Q91 13 78 18 Z" fill="#f48fb1"/>
         <circle cx="48" cy="35" r="3.2" fill="#2b1b22"/><circle cx="72" cy="35" r="3.2" fill="#2b1b22"/>
         <ellipse cx="60" cy="46" rx="12" ry="7.5" fill="#f48fb1" stroke="${dark}" stroke-width="2"/>
         <ellipse cx="56" cy="46" rx="1.8" ry="2.6" fill="#9d3a5c"/><ellipse cx="64" cy="46" rx="1.8" ry="2.6" fill="#9d3a5c"/>`
      : `<circle cx="42" cy="18" r="12" fill="${main}" stroke="${dark}" stroke-width="2.5"/><circle cx="78" cy="18" r="12" fill="${main}" stroke="${dark}" stroke-width="2.5"/>
         <circle cx="42" cy="18" r="7.5" fill="#fff"/><circle cx="78" cy="18" r="7.5" fill="#fff"/>
         <circle cx="44" cy="19" r="4" fill="#1f2a22"/><circle cx="76" cy="19" r="4" fill="#1f2a22"/>
         <circle cx="45.5" cy="17.5" r="1.3" fill="#fff"/><circle cx="77.5" cy="17.5" r="1.3" fill="#fff"/>
         <path d="M46 44 Q60 54 74 44" fill="none" stroke="${dark}" stroke-width="2.8" stroke-linecap="round"/>
         <ellipse cx="38" cy="46" rx="5" ry="3" fill="#f6a5b8" opacity=".85"/><ellipse cx="82" cy="46" rx="5" ry="3" fill="#f6a5b8" opacity=".85"/>`;
    return `<svg class="hat hat--bucket" viewBox="0 0 120 90" aria-hidden="true">
      <defs>${stitches}</defs>
      <path d="${crown}" fill="${main}" stroke="${dark}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="${crown}" fill="url(#${id}s)" opacity=".7"/>
      ${face}
      <path d="${brim}" fill="${main}" stroke="${dark}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="${brim}" fill="url(#${id}s)" opacity=".8"/>
    </svg>`;
  }
  const catAt = (n) => C.cats[((n % C.cats.length) + C.cats.length) % C.cats.length];
  function petPic(pet, extraClass = "") {
    const box = document.createElement("div");
    box.className = ("catpic " + extraClass).trim();
    const h = pet.hat || {};
    box.style.setProperty("--hx", h.x + "%");
    box.style.setProperty("--hy", h.y + "%");
    box.style.setProperty("--hr", (h.rot || 0) + "deg");
    box.style.setProperty("--hw", (h.size || 40) + "%");
    if (pet.mouth) { box.style.setProperty("--mx", pet.mouth.x + "%"); box.style.setProperty("--my", pet.mouth.y + "%"); }
    const type = h.type || "party";
    box.innerHTML = `<img src="${esc(pet.src)}" alt="${esc(pet.alt || "A party animal in a silly hat")}">${type === "party" ? hatSVG() : bucketHat(type)}`;
    return box;
  }
  const catPic = (n, extraClass = "") => petPic(catAt(n), extraClass);

  /* --------------------------------------------- photo / GIF slots */
  // A file path, or "cat:N" for one of the party-hat cats. Missing files fall back to a cat.
  let catTurn = 0;
  function media(src, extraClass = "") {
    const box = document.createElement("div");
    box.className = ("media pop " + extraClass).trim();
    const asCat = (n) => {
      box.classList.add("is-cat");
      box.innerHTML = "";
      box.append(catPic(n));
      if (showHints && src && !/^cat:/.test(src)) box.insertAdjacentHTML("beforeend", `<span class="hint">add ${esc(src)}</span>`);
    };
    const m = /^cat:(\d+)$/.exec(src || "");
    if (m) { asCat(+m[1] - 1); return box; }
    if (!src) { asCat(catTurn++); return box; }
    const img = new Image();
    img.alt = "Us";
    img.onerror = () => asCat(catTurn++);
    img.src = src;
    box.append(img);
    return box;
  }

  /* --------------------------- the cat pops up and blows confetti */
  const hornSVG = () => `<svg viewBox="0 0 200 40" aria-hidden="true">
      <rect x="0" y="12" width="34" height="16" rx="4" fill="#fde68a" stroke="#9d174d" stroke-width="2.5"/>
      <path d="M32 10 H176 a10 10 0 0 1 0 20 H32 Z" fill="#ec4899" stroke="#9d174d" stroke-width="2.5"/>
      <g fill="#fff" opacity=".9"><rect x="52" y="10" width="9" height="20"/><rect x="82" y="10" width="9" height="20"/><rect x="112" y="10" width="9" height="20"/><rect x="142" y="10" width="9" height="20"/></g>
      <circle class="horn__tip" cx="190" cy="20" r="6" fill="#fde68a" stroke="#9d174d" stroke-width="2.5"/>
    </svg>`;
  const CONFETTI_COLORS = ["#ec4899", "#f472b6", "#fbcfe8", "#f43f5e", "#fde68a", "#c4b5fd", "#ffffff"];
  function catBlow(sides = ["left"]) {
    if (!window.confetti) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Reduce Motion is on: skip the cat animation but still celebrate.
      sides.forEach((side) => window.confetti({ particleCount: 120, angle: side === "left" ? 60 : 120, spread: 60, origin: { x: side === "left" ? 0.05 : 0.95, y: 0.9 }, colors: CONFETTI_COLORS, zIndex: 60 }));
      return;
    }
    sides.forEach((side, k) => {
      const wrap = document.createElement("div");
      wrap.className = `blower blower--${side}`;
      wrap.setAttribute("aria-hidden", "true");
      const pic = catPic((C.blowerCat || 1) - 1 + k);
      const horn = document.createElement("div");
      horn.className = "horn";
      horn.innerHTML = hornSVG();
      pic.append(horn);
      wrap.append(pic);
      document.body.append(wrap);
      requestAnimationFrame(() => requestAnimationFrame(() => wrap.classList.add("up")));
      setTimeout(() => {
        wrap.classList.add("blowing");
        setTimeout(() => {
          const t = horn.querySelector(".horn__tip").getBoundingClientRect();
          const origin = { x: (t.left + t.width / 2) / innerWidth, y: (t.top + t.height / 2) / innerHeight };
          const angle = side === "left" ? 58 : 122;
          [0, 220, 440, 660].forEach((d, i) => setTimeout(() => window.confetti({
            particleCount: i === 0 ? 90 : 55, angle, spread: 50, startVelocity: 62 - i * 4,
            origin, colors: CONFETTI_COLORS, scalar: 1.1, ticks: 260, zIndex: 60,
            shapes: i % 2 ? ["circle"] : ["square", "circle"]
          }), d));
        }, 260);
      }, 650 + k * 150);
      setTimeout(() => wrap.classList.remove("up", "blowing"), 2800 + k * 150);
      setTimeout(() => wrap.remove(), 3600 + k * 150);
    });
  }

  /* ------------------- extra cats that pop up around the intro page */
  let popTimers = [], popEls = [];
  function placeRandomly(node, other) {
    // Any free spot on screen that doesn't cover the title, the big cat, the message, the button or the other cat.
    const w = innerWidth, h = innerHeight, size = node.offsetWidth || 120;
    const hatRoom = size * 0.35;
    const rectsOf = (e) => {
      if (e.matches("h1, p")) { const r = document.createRange(); r.selectNodeContents(e); return Array.from(r.getClientRects()); }
      const btn = e.querySelector(".btn");
      return [(btn || e).getBoundingClientRect()];
    };
    const blocked = Array.from(document.querySelectorAll("#stage .seq")).flatMap(rectsOf)
      .filter((r) => r.bottom > 0 && r.top < h);
    if (other) blocked.push({ left: other.x, top: other.y - hatRoom, right: other.x + size, bottom: other.y + size });
    const hits = (x, y) => blocked.some((r) => x < r.right + 10 && x + size > r.left - 10 && y - hatRoom < r.bottom + 10 && y + size > r.top - 10);
    let best = null;
    for (let tries = 0; tries < 80; tries++) {
      const x = 8 + Math.random() * Math.max(1, w - size - 16);
      const y = hatRoom + 8 + Math.random() * Math.max(1, h - size - hatRoom - 16);
      if (!hits(x, y)) { best = { x, y }; break; }
    }
    if (!best) {
      // No free space (very small screen): tuck it into a corner instead.
      const corner = Math.random() < 0.5;
      best = { x: corner ? 4 : w - size - 4, y: h - size - 12 };
    }
    node.style.left = best.x + "px";
    node.style.top = best.y + "px";
    node.style.setProperty("--tilt", (Math.random() * 24 - 12).toFixed(1) + "deg");
    return best;
  }
  function startPoppers(delays) {
    stopPoppers();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const spots = [];
    (C.media.introPoppers || []).forEach((src, i) => {
      const m = /^cat:(\d+)$/.exec(src || "");
      const wrap = document.createElement("div");
      wrap.className = "popper";
      wrap.setAttribute("aria-hidden", "true");
      wrap.append(m ? catPic(+m[1] - 1) : media(src));
      document.body.append(wrap);
      popEls.push(wrap);
      const appear = () => {
        spots[i] = placeRandomly(wrap, spots[1 - i]);
        wrap.classList.remove("hide");
        void wrap.offsetWidth;
        wrap.classList.add("show");
      };
      const hop = () => {
        wrap.classList.remove("show");
        wrap.classList.add("hide");
        popTimers.push(setTimeout(appear, 550));
      };
      popTimers.push(setTimeout(() => {
        appear();
        // then hop somewhere new every few seconds
        popTimers.push(setInterval(hop, 4200 + i * 1300));
      }, delays[i] || 2000));
    });
  }
  function stopPoppers() {
    popTimers.forEach((t) => { clearTimeout(t); clearInterval(t); });
    popTimers = [];
    popEls.forEach((p) => { p.classList.remove("show"); p.classList.add("hide"); setTimeout(() => p.remove(), 500); });
    popEls = [];
  }

  /* ---------------------------------------------------------- state */
  const STORE = "birthdayAnswers";
  const answers = { date: null, hour: "7", minute: "00", ampm: "PM", dinner: "", activity: "", movie: "", excitement: 50 };
  // Saved answers are only reused while the options are the same; editing the
  // options in config.js resets them, so a removed option never comes back.
  const optionsKey = JSON.stringify([C.dinner, C.activity, C.movies].map((list) => (list || []).map((o) => (typeof o === "string" ? o : o.name))));
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || "{}");
    if (saved.optionsKey === optionsKey) Object.assign(answers, saved.answers || {});
  } catch (e) {}
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify({ optionsKey, answers })); } catch (e) {} };
  const time = () => `${answers.hour}:${answers.minute} ${answers.ampm}`;
  const parseISO = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const fmtDate = (s) => s ? parseISO(s).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }) : "";

  const confetti = () => { if (window.confetti) window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, zIndex: 60 }); };

  /* ------------------------------------------------------- stepping */
  const stage = $("#stage");
  const TOTAL = 6; // numbered steps after the question
  let step = 0;
  function go(n) {
    const old = stage.firstElementChild;
    const show = () => {
      step = n;
      document.querySelectorAll(".runaway").forEach((e) => e.remove());
      stage.innerHTML = "";
      stage.append(STEPS[n]());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    if (old) { old.classList.add("out"); setTimeout(show, 300); } else show();
  }
  const el = (html) => { const d = document.createElement("div"); d.className = "step"; d.innerHTML = html; return d; };
  const progress = (n) => {
    const pct = Math.round((n / TOTAL) * 100);
    const w = el("");
    w.className = "progress";
    w.innerHTML = `<div class="progress__row"><span>Step ${n} of ${TOTAL}</span><span>${pct}%</span></div><div class="progress__track"><div class="progress__fill"></div></div>`;
    requestAnimationFrame(() => requestAnimationFrame(() => { $(".progress__fill", w).style.width = pct + "%"; }));
    return w;
  };

  /* A choice step: tiles + "Something else" + next button */
  function choiceStep({ n, key, title, items, nextLabel }) {
    const cols3 = items.length % 3 === 0;
    const s = el(`<h2 class="title">${title}</h2><div class="grid ${cols3 ? "grid--3" : ""}"></div><div class="other" hidden><input class="input" id="${key}-other" maxlength="120" placeholder="Tell me what you have in mind"></div><button class="btn btn--grad" type="button" disabled>${nextLabel}</button>`);
    s.prepend(progress(n));
    const grid = $(".grid", s), otherBox = $(".other", s), other = $("input", otherBox), next = $(".btn--grad", s);
    const names = items.map((it) => it.name);
    const isOther = () => answers[key] !== "" && !names.includes(answers[key]) || otherBox.dataset.on === "1";
    const paint = () => {
      const otherOn = isOther();
      grid.querySelectorAll(".tile").forEach((t) => t.setAttribute("aria-pressed", String(t.dataset.v === "__other" ? otherOn : (!otherOn && t.dataset.v === answers[key]))));
      otherBox.hidden = !otherOn;
      next.disabled = !answers[key];
    };
    items.forEach((it, i) => {
      const cell = document.createElement("div");
      cell.className = "choice";
      cell.style.setProperty("--i", i);
      const b = document.createElement("button");
      b.type = "button"; b.className = "tile"; b.dataset.v = it.name;
      b.innerHTML = `${icon(it.icon)}<span>${esc(it.name)}</span>${it.sub ? `<small>${esc(it.sub)}</small>` : ""}`;
      b.addEventListener("click", () => { otherBox.dataset.on = ""; answers[key] = it.name; save(); paint(); });
      cell.append(b);
      if (it.links && it.links.length) {
        const links = document.createElement("div");
        links.className = "tile-links";
        links.innerHTML = it.links.map((l) =>
          `<a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${icon(/trailer/i.test(l.label) ? "film" : /review/i.test(l.label) ? "star" : "right")}${esc(l.label)}</a>`).join("");
        cell.append(links);
      }
      grid.append(cell);
    });
    const ob = document.createElement("button");
    ob.type = "button"; ob.className = "tile tile--wide"; ob.dataset.v = "__other"; ob.style.setProperty("--i", items.length);
    ob.innerHTML = `${icon("plus")}<span>Something else</span>`;
    ob.addEventListener("click", () => {
      otherBox.dataset.on = "1";
      if (names.includes(answers[key])) answers[key] = "";
      answers[key] = other.value.trim() || answers[key];
      paint(); save(); setTimeout(() => other.focus(), 50);
    });
    grid.append(ob);
    if (answers[key] && !names.includes(answers[key])) other.value = answers[key];
    other.addEventListener("input", () => { answers[key] = other.value.trim(); save(); paint(); });
    other.addEventListener("keydown", (e) => { if (e.key === "Enter" && !next.disabled) next.click(); });
    next.addEventListener("click", () => go(step + 1));
    paint();
    return s;
  }

  /* ---------------------------------------------------------- steps */
  const STEPS = [
    // 0. Happy Birthday: title, then the cat, then the message and button (top-down)
    () => {
      const s = el(`<h1 class="title title--xl seq" style="--at:.2s">Happy Birthday &lt;3</h1><div class="slot"></div><p class="lead seq" style="--at:2s">${esc(C.introMessage)}</p><div class="seq" style="--at:2.8s"><button class="btn btn--grad" type="button">Open your surprise ${icon("heart")}</button></div>`);
      const hero = media(C.media.intro, "hero seq");
      hero.style.setProperty("--at", "1s");
      $(".slot", s).replaceWith(hero);
      $(".btn", s).addEventListener("click", () => { stopPoppers(); confetti(); go(1); });
      startPoppers([2000, 2800]);
      return s;
    },

    // 1. The big question
    () => {
      const s = el(`<h2 class="title">Will you let me spoil you on your birthday?</h2><div class="slot"></div><div class="row"><button class="btn btn--solid" type="button" id="yes">Yes, I'd love to!</button><button class="btn btn--outline" type="button" id="no">No</button></div>`);
      $(".slot", s).replaceWith(media(C.media.ask));
      $("#yes", s).addEventListener("click", () => { catBlow(["left"]); go(2); });
      setupRunawayNo($("#no", s), $("#yes", s));
      return s;
    },

    // 2. Calendar
    () => {
      const s = el(`<h2 class="title">YAYYYYY! WHEN SHALL WE CELEBRATE?</h2><div class="slot"></div>
        <div class="cal-box"><div class="cal"></div>
          <div class="time">
            <select id="hour" aria-label="Hour">${Array.from({ length: 12 }, (_, i) => `<option>${i + 1}</option>`).join("")}</select>
            <select id="minute" aria-label="Minute">${["00", "15", "30", "45"].map((m) => `<option>${m}</option>`).join("")}</select>
            <select id="ampm" aria-label="AM or PM"><option>AM</option><option>PM</option></select>
          </div></div>
        <button class="btn btn--grad" type="button" disabled>${icon("clock")} Set our date! ${icon("heart")}</button>`);
      s.prepend(progress(1));
      $(".slot", s).replaceWith(media(C.media.date));
      const next = $(".btn--grad", s);
      ["hour", "minute", "ampm"].forEach((k) => {
        const sel = $("#" + k, s);
        sel.value = answers[k];
        sel.addEventListener("change", () => { answers[k] = sel.value; save(); });
      });
      buildCalendar($(".cal", s), () => { next.disabled = !answers.date; });
      next.disabled = !answers.date;
      next.addEventListener("click", () => go(3));
      return s;
    },

    // 3. Dinner
    () => choiceStep({ n: 2, key: "dinner", title: "What shall we feast on, my dear?", items: C.dinner, nextLabel: "Looks delicious! 🍽️" }),

    // 4. Activity
    () => choiceStep({ n: 3, key: "activity", title: "What shall we do together?", items: C.activity, nextLabel: "Sounds so fun! ✨" }),

    // 5. Movie
    () => choiceStep({ n: 4, key: "movie", title: "What shall we watch together?", items: C.movies.map((m) => typeof m === "string" ? { name: m, icon: "film" } : m), nextLabel: "Popcorn ready! 🍿" }),

    // 6. Excitement
    () => {
      const s = el(`<h2 class="title">How excited are you for your birthday?</h2>
        <div class="slider-box"><input class="range" type="range" id="excite" min="0" max="100" step="25" aria-label="Excitement level">
          <div class="range-labels"><span>😐 Can't wait!</span><span>🤩 Super duper excited!</span></div></div>
        <div class="big spring">Excitement level: <span id="pct"></span></div>
        <button class="btn btn--grad" type="button">Let's make it official! 💕</button>`);
      s.prepend(progress(5));
      const r = $("#excite", s), pct = $("#pct", s);
      const paint = () => { pct.textContent = answers.excitement + "%"; r.style.setProperty("--v", answers.excitement + "%"); };
      r.value = answers.excitement;
      r.addEventListener("input", () => { answers.excitement = +r.value; save(); paint(); });
      paint();
      $(".btn--grad", s).addEventListener("click", () => { go(7); setTimeout(() => catBlow(["left", "right"]), 400); });
      return s;
    },

    // 7. It's a date
    () => {
      const s = el(`<h2 class="title title--xl">It's a date, my love!</h2>
        <p class="lead">I can't wait to celebrate you on:</p>
        <div class="pill pop"><p>${esc(fmtDate(answers.date))} at ${esc(time())}</p></div>
        <div class="slot"></div>
        <div class="heart-big spring" style="animation-delay:.5s">${icon("heart")}</div>
        <div class="recap">
          <p>We'll feast on <b>${esc(answers.dinner)}</b>,</p>
          <p>then <b>${esc(answers.activity)}</b>,</p>
          <p>and end the night watching <b><i>"${esc(answers.movie)}"</i></b> together.</p>
          <p class="big">Your excitement level: <span>${answers.excitement}/100</span></p>
        </div>
        <div class="send"><p class="send__title">Send me your answers</p><p class="send__status" role="status"></p><div class="row"></div></div>
        <button class="restart" type="button">Change my answers</button>`);
      s.prepend(progress(6));
      if (C.media.final === "dogs" && C.dogs && C.dogs.length) {
        // The two dogs snuggled into the two halves of a big drawn heart.
        const duo = document.createElement("div");
        duo.className = "duo";
        duo.innerHTML = `<svg class="duo__heart" viewBox="0 0 200 180" aria-hidden="true">
          <path pathLength="1" d="M100 174 C42 134 2 100 2 56 C2 24 26 2 56 2 C76 2 92 12 100 28 C108 12 124 2 144 2 C174 2 198 24 198 56 C198 100 158 134 100 174 Z"/></svg>`;
        C.dogs.slice(0, 2).forEach((d, i) => {
          const spot = document.createElement("div");
          spot.className = `duo__pet duo__pet--${i ? "right" : "left"}`;
          const p = petPic(d);
          spot.append(p);
          duo.append(spot);
        });
        $(".slot", s).replaceWith(duo);
        $(".heart-big", s).remove();
      } else {
        $(".slot", s).replaceWith(media(C.media.final));
      }
      setupSend(s);
      $(".restart", s).addEventListener("click", () => go(2));
      return s;
    }
  ];

  /* ------------------------------------------------------- calendar */
  function buildCalendar(host, onChange) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const bday = C.birthday ? parseISO(C.birthday) : null;
    const start = answers.date ? parseISO(answers.date) : (bday && bday >= today ? bday : today);
    let y = start.getFullYear(), m = start.getMonth();
    const render = () => {
      const first = new Date(y, m, 1);
      const label = first.toLocaleDateString(undefined, { month: "long", year: "numeric" });
      const atStart = y === today.getFullYear() && m === today.getMonth();
      let html = `<div class="cal__head"><button class="cal__nav cal__nav--prev" type="button" aria-label="Previous month" ${atStart ? "disabled" : ""}>${icon("left")}</button>
        <span class="cal__month" aria-live="polite">${label}</span>
        <button class="cal__nav cal__nav--next" type="button" aria-label="Next month">${icon("right")}</button></div><div class="cal__grid">`;
      ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].forEach((d) => { html += `<span class="cal__dow">${d}</span>`; });
      const offset = first.getDay();
      const cells = Math.ceil((offset + new Date(y, m + 1, 0).getDate()) / 7) * 7;
      for (let i = 0; i < cells; i++) {
        const d = new Date(y, m, 1 - offset + i);
        const v = iso(d);
        const cls = ["cal__day"];
        if (d.getMonth() !== m) cls.push("is-outside");
        if (+d === +today) cls.push("is-today");
        if (bday && d.getMonth() === bday.getMonth() && d.getDate() === bday.getDate()) cls.push("is-bday");
        html += `<button type="button" class="${cls.join(" ")}" data-d="${v}" aria-pressed="${answers.date === v}" aria-label="${d.toDateString()}" ${d < today ? "disabled" : ""}>${d.getDate()}</button>`;
      }
      host.innerHTML = html + "</div>";
      $(".cal__nav--prev", host).addEventListener("click", () => { if (--m < 0) { m = 11; y--; } render(); });
      $(".cal__nav--next", host).addEventListener("click", () => { if (++m > 11) { m = 0; y++; } render(); });
      host.querySelectorAll(".cal__day:not(:disabled)").forEach((b) => b.addEventListener("click", () => {
        answers.date = b.dataset.d; save();
        const d = parseISO(b.dataset.d);
        if (d.getMonth() !== m) { y = d.getFullYear(); m = d.getMonth(); }
        render(); onChange();
      }));
    };
    render();
  }

  /* ------------------------------ the "No" button runs away a few times */
  function setupRunawayNo(no, yes) {
    const maxDodges = 3 + Math.floor(Math.random() * 2); // 3 or 4, then it gives up
    const taunts = ["Nope!", "Too slow!", "Catch me!", "Hehe, nope"];
    let dodges = 0, lastDodge = 0;
    const cooling = () => performance.now() - lastDodge < 500; // one attempt = one dodge
    const dodge = () => {
      if (cooling()) return;
      lastDodge = performance.now();
      dodges++;
      const r = no.getBoundingClientRect(), y = yes.getBoundingClientRect();
      if (!no.classList.contains("runaway")) {
        // Leave a placeholder so the Yes button doesn't jump when No leaves the row.
        const ghost = document.createElement("span");
        ghost.className = "no-ghost";
        ghost.style.width = r.width + "px";
        no.after(ghost);
        no.style.left = r.left + "px";
        no.style.top = r.top + "px";
        no.classList.add("runaway");
        document.body.append(no); // free of the card's animation, so it can roam the whole screen
        void no.offsetWidth;
      }
      no.textContent = dodges < maxDodges ? taunts[(dodges - 1) % taunts.length] : "Okay fine... No?";
      const pad = 16, w = no.offsetWidth + 16, h = no.offsetHeight + 8; // measured with the new text
      let x, t, tries = 0;
      do {
        x = pad + Math.random() * Math.max(1, innerWidth - w - pad * 2);
        t = pad + Math.random() * Math.max(1, innerHeight - h - pad * 2);
        tries++;
      } while (tries < 40 && (Math.hypot(x - r.left, t - r.top) < 140 ||
               (x < y.right + 24 && x + w > y.left - 24 && t < y.bottom + 24 && t + h > y.top - 24)));
      no.style.left = x + "px";
      no.style.top = t + "px";
      no.style.setProperty("--spin", (Math.random() * 30 - 15).toFixed(0) + "deg");
      yes.style.setProperty("--grow", (1 + dodges * 0.12).toFixed(2));
      if (dodges >= maxDodges) no.classList.add("tired");
    };
    const canDodge = () => dodges < maxDodges;
    // Mouse: it slips away as soon as the cursor gets near it.
    no.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse" && canDodge()) dodge(); });
    // Touch: it jumps away the moment a finger lands on it.
    no.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse" && canDodge()) { e.preventDefault(); dodge(); } });
    no.addEventListener("click", (e) => {
      e.preventDefault();
      if (cooling()) return;                // the same tap that just made it run
      if (canDodge()) { dodge(); return; } // keyboard or a lucky click
      openNo();
    });
  }

  /* ---------------------------------------------------- "No" pop-up */
  const modal = $("#no-modal");
  let noMediaSet = false;
  function openNo() {
    if (!noMediaSet) { $("#no-media").replaceWith(media(C.media.no)); noMediaSet = true; }
    modal.hidden = false; modal.classList.remove("closing");
    $("#no-yes").focus();
  }
  function closeNo(cb) {
    modal.classList.add("closing");
    setTimeout(() => { modal.hidden = true; if (cb) cb(); }, 200);
  }
  $("#no-yes").addEventListener("click", () => closeNo(() => { catBlow(["left"]); go(2); }));
  $("#no-x").addEventListener("click", () => closeNo());
  modal.addEventListener("click", (e) => { if (e.target === modal) closeNo(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeNo(); });

  /* -------------------------------------------- getting answers to you */
  function message() {
    return [
      `${C.herName}'s birthday answers`,
      "",
      `Date: ${fmtDate(answers.date)} at ${time()}`,
      `Dinner: ${answers.dinner}`,
      `Activity: ${answers.activity}`,
      `Movie: ${answers.movie}`,
      `Excitement: ${answers.excitement}/100`
    ].join("\n");
  }
  let lastSent = "";
  function setupSend(s) {
    const text = message();
    const row = $(".send .row", s), status = $(".send__status", s);
    const phone = (C.contact.phone || "").replace(/[^\d+]/g, "");
    const email = (C.contact.email || "").trim();
    if (phone) row.insertAdjacentHTML("beforeend", `<a class="btn btn--solid" href="sms:${phone}?&body=${encodeURIComponent(text)}">Text me your answers</a>`);
    if (email) row.insertAdjacentHTML("beforeend", `<a class="btn ${phone ? "btn--outline" : "btn--solid"}" href="mailto:${email}?subject=${encodeURIComponent("Birthday answers")}&body=${encodeURIComponent(text)}">Email me your answers</a>`);
    const copy = document.createElement("button");
    copy.type = "button"; copy.className = "btn btn--outline"; copy.textContent = "Copy my answers";
    copy.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(text); status.textContent = "Copied! Paste it in a text to me."; }
      catch (e) {
        let pre = $(".send__text", s);
        if (!pre) { pre = document.createElement("pre"); pre.className = "send__text"; pre.textContent = text; $(".send", s).append(pre); }
        const r = document.createRange(); r.selectNodeContents(pre);
        const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
        status.textContent = "Copy the message below and send it to me.";
      }
    });
    row.append(copy);
    status.textContent = (phone || email) ? "Tap a button so I know what to plan." : "Copy your answers (or screenshot this) and send them to me.";

    if (C.formspreeEndpoint && lastSent !== text) {
      status.textContent = "Sending your answers…";
      fetch(C.formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: `${C.herName}'s birthday answers`, date: `${fmtDate(answers.date)} at ${time()}`, dinner: answers.dinner, activity: answers.activity, movie: answers.movie, excitement: `${answers.excitement}/100`, message: text })
      }).then((r) => {
        if (!r.ok) throw new Error(r.status);
        lastSent = text;
        status.textContent = "Sent! I have your answers."; status.classList.add("ok");
      }).catch(() => { status.textContent = "Couldn't send automatically. Use a button below instead."; });
    }
  }

  const sig = $("#signature");
  if (sig && C.signature) sig.textContent = C.signature;

  go(0);
})();
