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

  /* --------------------------------------------------------- mascot */
  // Drawn fallback for empty photo/GIF slots: an original little mochi in a party hat.
  const heartPath = (x, y, s, cls = "m-heart") => `<path class="${cls}" transform="translate(${x} ${y}) scale(${s})" d="M0 4C-6 0-6-5 0-2C6-5 6 0 0 4Z"/>`;
  function mascot(mood) {
    let eyes, mouth, extra = "";
    if (mood === "pleading") {
      eyes = `<circle class="m-ink" cx="46" cy="70" r="7"/><circle class="m-shine" cx="48.5" cy="67" r="2.6"/><circle class="m-ink" cx="74" cy="70" r="7"/><circle class="m-shine" cx="76.5" cy="67" r="2.6"/>`;
      mouth = `<path class="m-line" d="M55 86 q2.5-3 5 0 q2.5 3 5 0"/>`;
    } else if (mood === "pouty") {
      eyes = `<path class="m-line" d="M40 66 l10 4 M80 66 l-10 4"/><circle class="m-ink" cx="46" cy="73" r="4"/><circle class="m-ink" cx="74" cy="73" r="4"/>`;
      mouth = `<path class="m-line" d="M53 88 q7-7 14 0"/>`;
      extra = `<path class="m-tear" d="M92 52 q5 8 0 11 q-5-3 0-11z"/>`;
    } else if (mood === "love") {
      eyes = heartPath(46, 69, 1.5) + heartPath(74, 69, 1.5);
      mouth = `<path class="m-ink" d="M52 80 q8 11 16 0 z"/>`;
      extra = heartPath(22, 30, 1.2, "m-heart m-float") + heartPath(98, 26, 1, "m-heart m-float") + heartPath(104, 52, .9, "m-heart m-float");
    } else {
      eyes = `<path class="m-line" d="M40 71 q6-8 12 0 M68 71 q6-8 12 0"/>`;
      mouth = `<path class="m-ink" d="M53 79 q7 9 14 0 z"/>`;
    }
    return `<svg class="mascot" viewBox="0 0 120 120" role="img" aria-label="A cute little mochi">
      <ellipse cx="60" cy="112" rx="34" ry="5" fill="#be185d" opacity=".1"/>
      <ellipse class="m-body" cx="40" cy="106" rx="9" ry="6"/><ellipse class="m-body" cx="80" cy="106" rx="9" ry="6"/>
      <path class="m-body" d="M60 34c27 0 46 20 46 44 0 20-18 31-46 31S14 98 14 78c0-24 19-44 46-44z"/>
      <ellipse class="m-body" cx="16" cy="82" rx="7" ry="10" transform="rotate(25 16 82)"/><ellipse class="m-body" cx="104" cy="82" rx="7" ry="10" transform="rotate(-25 104 82)"/>
      <path class="m-hat" d="M46 40 L74 36 L63 4 Z"/><circle class="m-dot" cx="60" cy="28" r="2.4"/><circle class="m-dot" cx="65" cy="18" r="2"/><circle class="m-pom" cx="63" cy="5" r="5"/>
      <ellipse class="m-cheek" cx="34" cy="80" rx="7" ry="4.5"/><ellipse class="m-cheek" cx="86" cy="80" rx="7" ry="4.5"/>
      ${eyes}${mouth}${extra}</svg>`;
  }

  /* --------------------------------------------- photo / GIF slots */
  function media(src, mood, extraClass = "") {
    const box = document.createElement("div");
    box.className = ("media pop " + extraClass).trim();
    const fallback = () => {
      box.classList.add("is-mascot");
      box.innerHTML = mascot(mood) + (showHints && src ? `<span class="hint">add ${esc(src)}</span>` : "");
    };
    if (!src) { fallback(); return box; }
    const img = new Image();
    img.alt = "Us";
    img.onerror = fallback;
    img.src = src;
    box.append(img);
    return box;
  }

  /* ---------------------------------------------------------- state */
  const STORE = "birthdayAnswers";
  const answers = { date: null, hour: "7", minute: "00", ampm: "PM", dinner: "", activity: "", movie: "", excitement: 50 };
  try { Object.assign(answers, JSON.parse(localStorage.getItem(STORE) || "{}")); } catch (e) {}
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(answers)); } catch (e) {} };
  const time = () => `${answers.hour}:${answers.minute} ${answers.ampm}`;
  const parseISO = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const fmtDate = (s) => s ? parseISO(s).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }) : "";

  const confetti = () => { if (window.confetti && !matchMedia("(prefers-reduced-motion: reduce)").matches) window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); };

  /* ------------------------------------------------------- stepping */
  const stage = $("#stage");
  const TOTAL = 6; // numbered steps after the question
  let step = 0;
  function go(n) {
    const old = stage.firstElementChild;
    const show = () => {
      step = n;
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
  function choiceStep({ n, key, title, items, nextLabel, cols3 }) {
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
      const b = document.createElement("button");
      b.type = "button"; b.className = "tile"; b.dataset.v = it.name; b.style.setProperty("--i", i);
      b.innerHTML = `${icon(it.icon)}<span>${esc(it.name)}</span>`;
      b.addEventListener("click", () => { otherBox.dataset.on = ""; answers[key] = it.name; save(); paint(); });
      grid.append(b);
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
    // 0. Happy Birthday
    () => {
      const s = el(`<h1 class="title title--xl">Happy Birthday, ${esc(C.herName)}!</h1><div class="photos"></div><p class="lead">${esc(C.introMessage)}</p><button class="btn btn--grad" type="button">Open your surprise ${icon("heart")}</button>`);
      const ph = $(".photos", s);
      (C.media.intro || []).slice(0, 3).forEach((src, i) => { const m = media(src, ["happy", "love", "happy"][i]); m.style.animationDelay = `${i * 120 + 150}ms`; ph.append(m); });
      $(".btn", s).addEventListener("click", () => { confetti(); go(1); });
      return s;
    },

    // 1. The big question
    () => {
      const s = el(`<h2 class="title">Will you let me spoil you on your birthday?</h2><div class="slot"></div><div class="row"><button class="btn btn--solid" type="button" id="yes">Yes, I'd love to!</button><button class="btn btn--outline" type="button" id="no">No</button></div>`);
      $(".slot", s).replaceWith(media(C.media.ask, "pleading"));
      $("#yes", s).addEventListener("click", () => { confetti(); go(2); });
      $("#no", s).addEventListener("click", openNo);
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
      $(".slot", s).replaceWith(media(C.media.date, "love"));
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
    () => choiceStep({ n: 2, key: "dinner", title: "What shall we feast on, my dear?", items: C.dinner, nextLabel: "Looks delicious! 🍽️", cols3: true }),

    // 4. Activity
    () => choiceStep({ n: 3, key: "activity", title: "What shall we do together?", items: C.activity, nextLabel: "Sounds so fun! ✨", cols3: true }),

    // 5. Movie
    () => choiceStep({ n: 4, key: "movie", title: "What shall we watch together?", items: C.movies.map((m) => ({ name: m, icon: "film" })), nextLabel: "Popcorn ready! 🍿" }),

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
      $(".btn--grad", s).addEventListener("click", () => { go(7); setTimeout(confetti, 500); });
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
      $(".slot", s).replaceWith(media(C.media.final, "love"));
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

  /* ---------------------------------------------------- "No" pop-up */
  const modal = $("#no-modal");
  let noMediaSet = false;
  function openNo() {
    if (!noMediaSet) { $("#no-media").replaceWith(media(C.media.no, "pouty")); noMediaSet = true; }
    modal.hidden = false; modal.classList.remove("closing");
    $("#no-yes").focus();
  }
  function closeNo(cb) {
    modal.classList.add("closing");
    setTimeout(() => { modal.hidden = true; if (cb) cb(); }, 200);
  }
  $("#no-yes").addEventListener("click", () => closeNo(() => { confetti(); go(2); }));
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

  go(0);
})();
