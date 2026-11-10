/* Birthday planner. You shouldn't need to edit this file; see config.js. */
(() => {
  "use strict";
  const C = window.BIRTHDAY;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.1 4.3 2.4.7-1.3 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>';
  const CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6 11-11-1.4-1.4z"/></svg>';

  /* ---------------------------------------------------------------- state */
  const STORE = "bday-picks-v1";
  const picks = { excite: 3, note: "" };
  C.steps.forEach((s) => { picks[s.id] = null; picks[s.id + "Other"] = ""; });
  picks.movieTitle = ""; picks.movieWhere = null;
  try { Object.assign(picks, JSON.parse(localStorage.getItem(STORE) || "{}")); } catch (e) {}
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(picks)); } catch (e) {} };

  /* --------------------------------------------------------------- mascot */
  // An original little mochi character with a party hat. Moods: happy, pleading, shocked, sad, love.
  const heartPath = (x, y, s, cls = "m-heart") =>
    `<path class="${cls}" transform="translate(${x} ${y}) scale(${s})" d="M0 4C-6 0-6-5 0-2C6-5 6 0 0 4Z"/>`;
  function mascotSVG(mood) {
    let eyes = "", mouth = "", extra = "";
    switch (mood) {
      case "pleading":
        eyes = `<g class="m-eye-blink"><circle class="m-ink" cx="46" cy="70" r="7"/><circle class="m-shine" cx="48.5" cy="67" r="2.6"/><circle class="m-shine" cx="44" cy="73" r="1.2"/></g>
                <g class="m-eye-blink"><circle class="m-ink" cx="74" cy="70" r="7"/><circle class="m-shine" cx="76.5" cy="67" r="2.6"/><circle class="m-shine" cx="72" cy="73" r="1.2"/></g>`;
        mouth = `<path class="m-line" d="M55 86 q2.5-3 5 0 q2.5 3 5 0"/>`;
        break;
      case "shocked":
        eyes = `<circle class="m-ink" cx="46" cy="69" r="5"/><circle class="m-shine" cx="47.5" cy="67.5" r="1.6"/>
                <circle class="m-ink" cx="74" cy="69" r="5"/><circle class="m-shine" cx="75.5" cy="67.5" r="1.6"/>
                <path class="m-line" d="M38 58 l10 3 M82 58 l-10 3"/>`;
        mouth = `<ellipse class="m-ink" cx="60" cy="86" rx="5" ry="6.5"/>`;
        extra = `<path class="m-tear" d="M92 52 q5 8 0 11 q-5-3 0-11z"/>`;
        break;
      case "sad":
        eyes = `<path class="m-line" d="M40 68 q6 5 12 0 M68 68 q6 5 12 0"/>`;
        mouth = `<path class="m-line" d="M53 88 q7-7 14 0"/>`;
        extra = `<path class="m-tear" d="M43 75 q4 7 0 10 q-4-3 0-10z"/>`;
        break;
      case "love":
        eyes = heartPath(46, 69, 1.5) + heartPath(74, 69, 1.5);
        mouth = `<path class="m-ink" d="M52 80 q8 11 16 0 z"/>`;
        extra = heartPath(22, 30, 1.2, "m-heart m-float") + heartPath(98, 26, 1, "m-heart m-float") + heartPath(104, 52, .9, "m-heart m-float");
        break;
      default: // happy
        eyes = `<path class="m-line" d="M40 71 q6-8 12 0 M68 71 q6-8 12 0"/>`;
        mouth = `<path class="m-ink" d="M53 79 q7 9 14 0 z"/>`;
    }
    return `<svg class="mascot mascot--${mood}" viewBox="0 0 120 120" role="img" aria-label="A little mochi friend looking ${mood}">
      <ellipse cx="60" cy="112" rx="34" ry="5" fill="#3a1e2a" opacity=".12"/>
      <ellipse class="m-body" cx="40" cy="106" rx="9" ry="6"/><ellipse class="m-body" cx="80" cy="106" rx="9" ry="6"/>
      <path class="m-body" d="M60 34c27 0 46 20 46 44 0 20-18 31-46 31S14 98 14 78c0-24 19-44 46-44z"/>
      <ellipse class="m-body" cx="16" cy="82" rx="7" ry="10" transform="rotate(25 16 82)"/>
      <ellipse class="m-body" cx="104" cy="82" rx="7" ry="10" transform="rotate(-25 104 82)"/>
      <path class="m-hat" d="M46 40 L74 36 L63 4 Z"/>
      <circle class="m-dot" cx="60" cy="28" r="2.4"/><circle class="m-dot" cx="65" cy="18" r="2"/><circle class="m-dot" cx="55" cy="35" r="1.8"/>
      <circle class="m-pom" cx="63" cy="5" r="5"/>
      <ellipse class="m-cheek" cx="34" cy="80" rx="7" ry="4.5"/><ellipse class="m-cheek" cx="86" cy="80" rx="7" ry="4.5"/>
      ${eyes}${mouth}${extra}
    </svg>`;
  }
  function setMascot(slot, mood) {
    if (!slot || slot.dataset.current === mood) return;
    slot.dataset.current = mood;
    slot.innerHTML = `<div class="m-wrap">${mascotSVG(mood)}</div>`;
    slot.classList.remove("pop"); void slot.offsetWidth; slot.classList.add("pop");
  }
  $$("[data-mascot]").forEach((s) => setMascot(s, s.dataset.mascot));

  /* --------------------------------------------------------------- photos */
  function photo(p, tilt = 0, extraCls = "") {
    const item = typeof p === "string" ? { src: p } : p || {};
    const f = el("figure", ("polaroid " + extraCls).trim());
    f.style.setProperty("--tilt", tilt + "deg");
    const frame = el("div", "polaroid__img");
    const img = new Image();
    img.alt = item.caption || "A photo of us";
    img.decoding = "async";
    img.onerror = () => {
      frame.classList.add("is-empty");
      frame.innerHTML = `<span>${HEART}<b>Add photo</b><code>${esc(item.src || "photos/…")}</code></span>`;
    };
    img.src = item.src || "";
    frame.append(img);
    f.append(frame);
    if (item.caption !== undefined) f.append(el("figcaption", null, esc(item.caption || "")));
    return f;
  }

  /* ---------------------------------------------------------------- intro */
  const hbd = $("#hbd");
  let i = 0;
  hbd.innerHTML = "Happy Birthday".split("").map((ch) =>
    ch === " " ? '<span class="space"> </span>' : `<span class="letter" style="--i:${i++}">${esc(ch)}</span>`
  ).join("");
  $("#her-name").textContent = C.herName;
  $("#intro-message").textContent = C.introMessage;
  $("#finale-message").textContent = C.finaleMessage;
  const introRow = $("#intro-photos");
  const introTilts = [-7, 3, 8], introFx = ["-60px", "0px", "60px"];
  (C.photos.intro || []).slice(0, 3).forEach((p, n) => {
    const f = photo(p, introTilts[n % 3], "fly");
    f.style.setProperty("--d", n);
    f.style.setProperty("--fx", introFx[n % 3]);
    introRow.append(f);
  });

  /* ---------------------------------------------------------------- steps */
  const cheers = {
    dinner: ["Ooh, yummy choice", "My tummy approves", "Table for two!", "Great taste, as always"],
    activity: ["Ahh I'm so excited", "Best idea ever", "Let's gooo", "This is going to be fun"],
    movie: ["Popcorn secured", "Good pick!", "I'll bring snacks", "Movie night, yay"]
  };
  const stepsHost = $("#steps");
  const order = ["intro", "ask", ...C.steps.map((s) => s.id), "note", "finale"];

  C.steps.forEach((step, idx) => {
    const prev = idx === 0 ? "ask" : C.steps[idx - 1].id;
    const next = C.steps[idx + 1] ? C.steps[idx + 1].id : "note";
    const sec = el("section", "scene");
    sec.id = step.id;
    sec.hidden = true;
    const bars = C.steps.map((_, k) => `<i class="${k < idx ? "done" : k === idx ? "on" : ""}"></i>`).join("");
    sec.innerHTML = `
      <div class="step">
        <div class="step__top">
          <header class="step__head">
            <div class="progress rise" style="--d:0" aria-label="Step ${idx + 1} of ${C.steps.length}">${bars}<span>${esc(step.label)} · ${idx + 1} of ${C.steps.length}</span></div>
            <h2 class="display rise" style="--d:1">${esc(step.title)}</h2>
            <p class="sub rise" style="--d:2">${esc(step.subtitle)}</p>
          </header>
          <div class="step__photo-slot"></div>
        </div>
        <div class="options" role="group" aria-label="${esc(step.label)} options"></div>
        <div class="extras-slot"></div>
        <nav class="step__nav rise" style="--d:4">
          <button class="btn btn--ghost" type="button" data-go="${prev}" data-back>Back</button>
          <p class="step__hint">Pick one to continue</p>
          <button class="btn btn--primary next" type="button" data-go="${next}" disabled>${next === "note" ? "Almost done" : "Next"}</button>
        </nav>
      </div>`;
    const ph = photo(C.photos[step.id], idx % 2 ? -5 : 5, "step__photo fly");
    ph.style.setProperty("--d", 1);
    ph.style.setProperty("--fx", "40px");
    $(".step__photo-slot", sec).replaceWith(ph);

    const grid = $(".options", sec);
    step.options.forEach((o, n) => {
      const b = el("button", "option");
      b.type = "button";
      b.dataset.id = o.id;
      b.style.setProperty("--d", n);
      b.setAttribute("aria-pressed", "false");
      b.innerHTML = `<span class="option__check">${CHECK}</span>
        <span class="option__tag">${esc(o.tag || "")}</span>
        <span class="option__title">${esc(o.title)}</span>
        <span class="option__text">${esc(o.text || "")}</span>`;
      grid.append(b);
    });
    const other = el("button", "option option--other");
    other.type = "button";
    other.dataset.id = "other";
    other.style.setProperty("--d", step.options.length);
    other.setAttribute("aria-pressed", "false");
    other.innerHTML = `<span class="option__check">${CHECK}</span><span class="option__plus">+</span>
      <span class="option__title">Something else</span><span class="option__text">Have your own idea? Tell me.</span>`;
    grid.append(other);
    const reveal = el("div", "reveal");
    reveal.style.gridColumn = "1 / -1";
    reveal.innerHTML = `<div><div class="other-field">
      <label class="field-label" for="${step.id}-other">Your idea</label>
      <input class="field" id="${step.id}-other" type="text" maxlength="160" placeholder="Tell me what you're craving">
    </div></div>`;
    grid.append(reveal);
    const otherInput = $("input", reveal);
    otherInput.value = picks[step.id + "Other"] || "";

    // Movie step extras
    if (step.where) {
      const ex = el("div", "extras rise");
      ex.style.setProperty("--d", 3);
      ex.innerHTML = `
        <div><label class="field-label" for="movie-title">A specific movie in mind? (optional)</label>
          <input class="field" id="movie-title" type="text" maxlength="120" placeholder="Title goes here"></div>
        <div><span class="field-label" id="where-label">Where are we watching?</span>
          <div class="chips" role="group" aria-labelledby="where-label">${step.where.map((w) =>
            `<button class="chip" type="button" data-where="${esc(w.id)}" aria-pressed="false">${esc(w.title)}</button>`).join("")}</div></div>`;
      $(".extras-slot", sec).replaceWith(ex);
      const t = $("#movie-title", ex);
      t.value = picks.movieTitle || "";
      t.addEventListener("input", () => { picks.movieTitle = t.value.trim(); save(); });
      const chips = $$(".chip", ex);
      const paintChips = () => chips.forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.where === picks.movieWhere)));
      chips.forEach((c) => c.addEventListener("click", (e) => {
        picks.movieWhere = picks.movieWhere === c.dataset.where ? null : c.dataset.where;
        paintChips(); save();
        if (picks.movieWhere) burst(e.clientX, e.clientY, 10);
      }));
      paintChips();
    } else {
      $(".extras-slot", sec).remove();
    }

    const nextBtn = $(".next", sec), hint = $(".step__hint", sec);
    const valid = () => !!picks[step.id] && (picks[step.id] !== "other" || !!picks[step.id + "Other"]);
    const paint = () => {
      $$(".option", grid).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.id === picks[step.id])));
      reveal.classList.toggle("open", picks[step.id] === "other");
      nextBtn.disabled = !valid();
      hint.style.opacity = valid() ? 0 : 1;
      hint.textContent = picks[step.id] === "other" ? "Type your idea to continue" : "Pick one to continue";
    };
    grid.addEventListener("click", (e) => {
      const b = e.target.closest(".option");
      if (!b) return;
      picks[step.id] = b.dataset.id;
      save(); paint();
      if (b.dataset.id === "other") setTimeout(() => otherInput.focus({ preventScroll: true }), 250);
      else {
        burst(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, 18);
        cheer(cheers[step.id] || cheers.dinner);
      }
    });
    otherInput.addEventListener("input", () => { picks[step.id + "Other"] = otherInput.value.trim(); save(); paint(); });
    paint();
    stepsHost.append(sec);
  });

  /* --------------------------------------------------- cheer pop-up mascot */
  let cheerTimer;
  function cheer(lines) {
    const box = $("#cheer");
    $("#cheer-text").textContent = lines[Math.floor(Math.random() * lines.length)];
    const slot = $(".mascot-slot", box);
    slot.dataset.current = "";
    setMascot(slot, Math.random() < 0.5 ? "love" : "happy");
    box.classList.add("show");
    clearTimeout(cheerTimer);
    cheerTimer = setTimeout(() => box.classList.remove("show"), 1900);
  }

  /* ---------------------------------------------- the "No" button dilemma */
  const noBtn = $("#no-btn"), yesBtn = $("#yes-btn"), askMascot = $("#ask .mascot-slot");
  const noLabels = ["No", "Are you sure?", "Really sure?", "Think again", "Pretty please?", "You're breaking my heart", "Last chance", "Okay, no more No"];
  const modalLines = [
    ['Error 404: "No" not found', '"No" is not an available answer. Please try again.'],
    ["Nice try", "That button is just for decoration. The answer is yes."],
    ["Hmm, suspicious", "I'm going to pretend you clicked Yes."],
    ["Still no?", "The mochi is crying now. Look what you did."],
    ["Okay, stop", "The Yes button is right there. It's very big. You can't miss it."]
  ];
  let noTries = 0;
  const isTouch = matchMedia("(hover: none)").matches;
  function growYes() {
    noTries++;
    yesBtn.style.setProperty("--grow", Math.min(1 + noTries * 0.14, 1.9).toFixed(2));
    noBtn.textContent = noLabels[Math.min(noTries, noLabels.length - 1)];
    setMascot(askMascot, noTries > 2 ? "sad" : "pleading");
    $("#ask-sub").textContent = noTries > 2 ? "Please? It's your birthday and I really want to spoil you." : "Wrong button, I think.";
  }
  function dodge() {
    const r = noBtn.getBoundingClientRect();
    if (!noBtn.classList.contains("runaway")) {
      noBtn.style.left = r.left + "px";
      noBtn.style.top = r.top + "px";
      noBtn.classList.add("runaway");
      void noBtn.offsetWidth;
    }
    const pad = 20, w = r.width, h = r.height;
    const yr = yesBtn.getBoundingClientRect();
    let x, y, tries = 0;
    do {
      x = pad + Math.random() * Math.max(1, innerWidth - w - pad * 2);
      y = pad + 60 + Math.random() * Math.max(1, innerHeight - h - pad * 2 - 60);
      tries++;
    } while (tries < 20 && x < yr.right + 20 && x + w > yr.left - 20 && y < yr.bottom + 20 && y + h > yr.top - 20);
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    growYes();
  }
  function showNoModal() {
    const [t, s] = modalLines[Math.min(Math.max(noTries - 1, 0), modalLines.length - 1)];
    $("#no-title").textContent = t;
    $("#no-text").textContent = s;
    const m = $("#no-modal");
    m.hidden = false;
    m.classList.remove("closing");
    const slot = $("#no-mascot");
    slot.dataset.current = "";
    setMascot(slot, noTries > 3 ? "sad" : "shocked");
    $("#no-close").focus();
  }
  function closeNoModal() {
    const m = $("#no-modal");
    m.classList.add("closing");
    setTimeout(() => { m.hidden = true; if (isTouch) dodge(); }, reduceMotion ? 0 : 240);
  }
  if (!isTouch) noBtn.addEventListener("pointerenter", () => { if (noTries < 4 || Math.random() < 0.7) dodge(); });
  noBtn.addEventListener("click", (e) => { e.preventDefault(); if (!isTouch) growYes(); else noTries++; showNoModal(); });
  $("#no-close").addEventListener("click", closeNoModal);
  $("#no-modal").addEventListener("click", (e) => { if (e.target.id === "no-modal") closeNoModal(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#no-modal").hidden) closeNoModal(); });
  yesBtn.addEventListener("click", (e) => {
    setMascot(askMascot, "love");
    $("#ask-sub").textContent = "Yay! Okay, let's plan it.";
    burst(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, 60, true);
    setTimeout(() => go("dinner"), reduceMotion ? 0 : 1100);
  });
  function resetNo() {
    noBtn.classList.remove("runaway");
    noBtn.style.left = noBtn.style.top = "";
  }

  /* ----------------------------------------------------------- note scene */
  const strip = $("#filmstrip");
  const gal = C.photos.gallery || [];
  [...gal, ...gal].forEach((p, n) => strip.append(photo(p, n % 2 ? 3 : -3)));
  const note = $("#note-text");
  note.value = picks.note || "";
  note.addEventListener("input", () => { picks.note = note.value.trim(); save(); });
  const excite = $("#excite"), exciteLabels = ["Mildly curious", "Kind of excited", "Pretty excited", "Super excited", "Can't sit still"];
  const exciteMoods = ["sad", "pleading", "happy", "happy", "love"];
  const paintExcite = () => {
    const v = +excite.value;
    $("#excite-label").textContent = exciteLabels[v - 1];
    setMascot($("#excite-mascot"), exciteMoods[v - 1]);
  };
  excite.value = picks.excite || 3;
  excite.addEventListener("input", () => { picks.excite = +excite.value; save(); paintExcite(); });
  excite.addEventListener("change", () => { if (+excite.value === 5) { const r = excite.getBoundingClientRect(); burst(r.right - 10, r.top, 24); } });
  paintExcite();

  /* --------------------------------------------------------------- finale */
  const label = (step) => {
    const v = picks[step.id];
    if (v === "other") return { main: picks[step.id + "Other"] || "Her own idea", sub: "Her own idea" };
    const o = step.options.find((x) => x.id === v);
    return { main: o ? o.title : "Not chosen", sub: o ? o.text : "" };
  };
  function summaryData() {
    const rows = C.steps.map((s) => {
      const l = label(s);
      if (s.where) {
        const where = s.where.find((w) => w.id === picks.movieWhere);
        const bits = [picks.movieTitle ? `"${picks.movieTitle}"` : "", where ? where.title : ""].filter(Boolean);
        if (bits.length) l.sub = bits.join(" · ");
      }
      return { key: s.label, ...l };
    });
    return rows;
  }
  function messageText() {
    const rows = summaryData();
    const lines = [`Birthday picks from ${C.herName}`, ""];
    rows.forEach((r) => lines.push(`${r.key}: ${r.main}${r.sub && r.sub !== "Her own idea" && r.key === "Movie" ? ` (${r.sub})` : ""}`));
    lines.push(`Excitement: ${picks.excite}/5, ${exciteLabels[(picks.excite || 3) - 1]}`);
    if (picks.note) lines.push(`Wishes: ${picks.note}`);
    return lines.join("\n");
  }
  let lastSent = "";
  function renderFinale() {
    const fan = $("#finale-photos");
    if (!fan.childElementCount) {
      const tilts = [-9, 2, 10], fx = ["-80px", "0px", "80px"];
      (C.photos.finale || []).slice(0, 3).forEach((p, n) => {
        const f = photo(p, tilts[n % 3], "fly");
        f.style.setProperty("--d", n + 1);
        f.style.setProperty("--fx", fx[n % 3]);
        fan.append(f);
      });
    }
    $("#summary").innerHTML = summaryData().map((r) =>
      `<li><span class="ticket__k">${esc(r.key)}</span><span class="ticket__v">${esc(r.main)}${r.sub ? `<small>${esc(r.sub)}</small>` : ""}</span></li>`
    ).join("");

    const text = messageText();
    $("#send-text").textContent = text;
    const btns = $("#send-buttons");
    btns.innerHTML = "";
    const phone = (C.contact.phone || "").replace(/[^\d+]/g, "");
    const email = (C.contact.email || "").trim();
    const status = $("#send-status");
    status.className = "send__status";
    if (phone) {
      const a = el("a", "btn btn--primary", `${HEART} Text me your picks`);
      a.href = `sms:${phone}?&body=${encodeURIComponent(text)}`;
      btns.append(a);
    }
    if (email) {
      const a = el("a", phone ? "btn btn--soft" : "btn btn--primary", "Email me your picks");
      a.href = `mailto:${email}?subject=${encodeURIComponent("My birthday picks")}&body=${encodeURIComponent(text)}`;
      btns.append(a);
    }
    const copy = el("button", "btn btn--soft", "Copy my picks");
    copy.type = "button";
    copy.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(text); status.textContent = "Copied. Paste it into a text to me."; }
      catch (e) {
        $(".send__details").open = true;
        const r = document.createRange(); r.selectNodeContents($("#send-text"));
        const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
        status.textContent = "Selected the message below. Copy it and send it over.";
      }
    });
    btns.append(copy);

    $("#send-title").textContent = "Send me your picks";
    if (!phone && !email && !C.formspreeEndpoint) status.textContent = "Copy your picks (or take a screenshot) and send them to me.";
    else if (!C.formspreeEndpoint) status.textContent = "Tap a button below so I know what to book.";

    if (C.formspreeEndpoint && lastSent !== text) {
      status.textContent = "Sending your picks…";
      const payload = { _subject: `${C.herName}'s birthday picks`, message: text };
      summaryData().forEach((r) => { payload[r.key] = r.sub ? `${r.main} (${r.sub})` : r.main; });
      payload.Excitement = `${picks.excite}/5`;
      payload.Wishes = picks.note || "";
      fetch(C.formspreeEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) })
        .then((r) => {
          if (!r.ok) throw new Error(r.status);
          lastSent = text;
          status.textContent = "Sent! I have your picks.";
          status.classList.add("ok");
        })
        .catch(() => { status.textContent = `Couldn't send automatically. Use a button below instead.`; });
    }
  }

  /* ------------------------------------------------------------ navigation */
  let current = "intro";
  function go(id) {
    if (id === current) return;
    const from = document.getElementById(current), to = document.getElementById(id);
    if (!to) return;
    document.body.dataset.dir = order.indexOf(id) < order.indexOf(current) ? "back" : "fwd";
    if (id === "finale") renderFinale();
    from.classList.add("leaving");
    setTimeout(() => {
      from.hidden = true;
      from.classList.remove("leaving", "entered");
      if (from.id === "ask") resetNo();
      to.hidden = false;
      window.scrollTo({ top: 0, behavior: "auto" });
      requestAnimationFrame(() => requestAnimationFrame(() => to.classList.add("entered")));
      if (id === "finale") setTimeout(() => confetti(), reduceMotion ? 0 : 600);
    }, reduceMotion ? 0 : 480);
    current = id;
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-go]");
    if (b && !b.disabled) go(b.dataset.go);
  });

  /* --------------------------------------------------------------- opener */
  $("#seal").addEventListener("click", (e) => {
    const cur = $("#curtain");
    burst(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, 40, true);
    cur.classList.add("is-open");
    const intro = $("#intro");
    intro.hidden = false;
    setTimeout(() => intro.classList.add("entered"), reduceMotion ? 0 : 350);
    setTimeout(() => cur.classList.add("is-gone"), reduceMotion ? 0 : 1400);
  });

  /* ------------------------------------------------- canvases: atmosphere */
  const rose = () => getComputedStyle(document.documentElement).getPropertyValue("--rose").trim() || "#c43f6c";
  const PALETTE = ["#e0507e", "#f6a3bd", "#ffd1dc", "#d8b37b", "#c43f6c", "#ffffff"];
  function drawHeart(ctx, x, y, s, rot) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    ctx.beginPath(); ctx.moveTo(0, 4); ctx.bezierCurveTo(-6, 0, -6, -5, 0, -2); ctx.bezierCurveTo(6, -5, 6, 0, 0, 4); ctx.fill();
    ctx.restore();
  }
  function fit(c) {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    c.width = innerWidth * dpr; c.height = innerHeight * dpr;
    c.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  const amb = $("#ambient"), bc = $("#burst");
  fit(amb); fit(bc);
  addEventListener("resize", () => { fit(amb); fit(bc); });

  // Slow floating hearts in the background
  const floaters = Array.from({ length: reduceMotion ? 0 : 22 }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    s: 0.8 + Math.random() * 1.8, v: 0.15 + Math.random() * 0.35,
    sway: Math.random() * Math.PI * 2, rot: (Math.random() - .5) * .6, a: 0.08 + Math.random() * 0.14
  }));
  let roseColor = rose(), tick = 0;
  (function ambient() {
    const ctx = amb.getContext("2d");
    if (++tick % 120 === 0) roseColor = rose();
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = roseColor;
    floaters.forEach((f) => {
      f.y -= f.v; f.sway += 0.01;
      if (f.y < -20) { f.y = innerHeight + 20; f.x = Math.random() * innerWidth; }
      ctx.globalAlpha = f.a;
      drawHeart(ctx, f.x + Math.sin(f.sway) * 18, f.y, f.s, f.rot);
    });
    ctx.globalAlpha = 1;
    if (floaters.length) requestAnimationFrame(ambient);
  })();

  // Bursts of hearts and confetti
  const parts = [];
  let running = false;
  function burst(x, y, n = 20, big = false) {
    if (reduceMotion) return;
    for (let k = 0; k < n; k++) {
      const ang = Math.random() * Math.PI * 2, sp = (big ? 4 : 2.5) + Math.random() * (big ? 6 : 3.5);
      parts.push({ x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 2, g: 0.12, life: 1, decay: 0.012 + Math.random() * 0.012,
        s: 1 + Math.random() * 1.4, rot: Math.random() * 6, vr: (Math.random() - .5) * .2,
        heart: Math.random() < 0.6, c: PALETTE[Math.floor(Math.random() * PALETTE.length)], w: 6 + Math.random() * 6 });
    }
    if (!running) { running = true; requestAnimationFrame(loop); }
  }
  function confetti() {
    if (reduceMotion) return;
    for (let k = 0; k < 120; k++) {
      parts.push({ x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * 0.5, vx: (Math.random() - .5) * 2, vy: 2 + Math.random() * 3,
        g: 0.04, life: 1, decay: 0.004 + Math.random() * 0.004, s: 1 + Math.random() * 1.3, rot: Math.random() * 6, vr: (Math.random() - .5) * .25,
        heart: Math.random() < 0.35, c: PALETTE[Math.floor(Math.random() * PALETTE.length)], w: 6 + Math.random() * 8 });
    }
    if (!running) { running = true; requestAnimationFrame(loop); }
  }
  function loop() {
    const ctx = bc.getContext("2d");
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let k = parts.length - 1; k >= 0; k--) {
      const p = parts[k];
      p.vy += p.g; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= p.decay;
      if (p.life <= 0 || p.y > innerHeight + 40) { parts.splice(k, 1); continue; }
      ctx.globalAlpha = Math.min(1, p.life * 1.5);
      ctx.fillStyle = p.c;
      if (p.heart) drawHeart(ctx, p.x, p.y, p.s, p.rot);
      else { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillRect(-p.w / 2, -p.w / 4, p.w, p.w / 2); ctx.restore(); }
    }
    ctx.globalAlpha = 1;
    if (parts.length) requestAnimationFrame(loop); else running = false;
  }
})();
