/* ============================================================
   UMANO™ — scritto a mano, riga per riga.
   (GSAP + ScrollTrigger + Lenis. Loro sì che sono strumenti.)
   ============================================================ */

document.documentElement.classList.add("js");

/* al ricaricamento si riparte sempre da cima: niente atterraggi
   a metà pagina (o a metà scena pinnata) dopo refresh o cambio lingua.
   Il ripristino del browser può scattare dopo lo script: lo battiamo sul load */
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const forceTop = () => window.scrollTo(0, 0);
forceTop();
window.addEventListener("load", () => { forceTop(); setTimeout(forceTop, 0); });

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE_POINTER = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ------------------------------------------------------------
   LINGUA — italiano di casa, inglese per il resto del mondo.
   Priorità: scelta salvata > lingua del dispositivo.
   ------------------------------------------------------------ */
const LANG = (() => {
  const fromUrl = location.search.match(/[?&]lang=(it|en)\b/);
  if (fromUrl) return fromUrl[1];
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "it" || saved === "en") return saved;
  } catch (e) {}
  return (navigator.language || "it").toLowerCase().startsWith("it") ? "it" : "en";
})();

const I18N = LANG === "en"
  ? {
      menu: "MENU", close: "CLOSE",
      loader: ["writing the code by hand…", "zero prompts sent", "no AI consulted", "almost there, promise"],
      ai: ["no.", "I said no.", "not a chance.", "ok, you're funny. still no."],
    }
  : {
      menu: "MENU", close: "CHIUDI",
      loader: ["sto scrivendo il codice a mano…", "zero prompt inviati", "nessuna AI consultata", "quasi pronto, giuro"],
      ai: ["no.", "ho detto no.", "neanche per sogno.", "ok, sei simpatico. ma no."],
    };

function applyEnglish() {
  const set = (sel, txt) => document.querySelectorAll(sel).forEach((el) => (el.textContent = txt));
  const setN = (el, i, txt) => { if (el && el.childNodes[i]) el.childNodes[i].nodeValue = txt; };

  document.documentElement.lang = "en";
  document.title = "Luca Salvemini — Web Developer in Brescia, Italy · 100% human";
  const meta = (s, v) => { const m = document.querySelector(s); if (m) m.setAttribute("content", v); };
  meta('meta[name="description"]', "Freelance web developer in Brescia, Italy. Handmade showcase sites, e-commerce and landing pages: zero AI, zero templates, lots of care (and coffee).");
  meta('meta[property="og:title"]', "Luca Salvemini — Web Developer in Brescia, Italy");
  meta('meta[property="og:description"]', "Handmade websites, 100% human. In a world that generates, I write.");
  meta('meta[name="twitter:title"]', "Luca Salvemini — Web Developer in Brescia, Italy");
  meta('meta[name="twitter:description"]', "Handmade websites, 100% human. In a world that generates, I write.");

  set(".skip-link", "Skip to work");

  /* header + menu */
  const navTxt = ["WORK", "METHOD", "CONTACT"];
  document.querySelectorAll(".site-head__nav a").forEach((a, i) => (a.textContent = navTxt[i]));
  document.querySelectorAll(".overlay__link").forEach((a, i) => setN(a, 1, navTxt[i]));
  set(".overlay__joke", "( menu drawn by hand — you can tell )");

  /* hero */
  const tag = document.querySelector(".hero__tagline");
  if (tag) {
    tag.setAttribute("aria-label", "No AI, no degree, no templates. Because handmade is better made.");
    tag.innerHTML = ["No", "AI,", "no", "degree,", "no", "templates.", "Because", "handmade", "is", "better&nbsp;made."]
      .map((w) => "<span>" + w + "</span>").join("");
  }
  setN(document.querySelector(".hero__cta .pill__label"), 0, "LET'S TALK");
  set(".hero__cert", "( certified 100% human )");
  const wm = document.querySelector(".hero__wordmark");
  if (wm) wm.setAttribute("aria-label", "LUCA™ — Luca Salvemini, web developer in Brescia, Italy");
  const where = document.querySelector(".hero__where");
  if (where) where.innerHTML = "Web developer<br>in Brescia, Italy";

  /* presa di posizione */
  set(".manifesto__label", "( the stance )");
  set(".js-manifesto-s1", "By now, AI makes websites. Thirty seconds, one prompt, and there's yet another site that looks like all the others. Not me. I make them by hand.");
  set(".js-manifesto-s2", "In a world generating ten thousand pages a minute, the rarest thing is a page that was actually thought through. Tailor-made. With someone inside.");

  /* lavori */
  const rail = document.querySelector(".works__rail");
  if (rail) rail.innerHTML = "WORKS".split("").map((l) => '<span class="works__rail-letter">' + l + "</span>").join("");
  set(".works__intro", "AI websites all look alike. Mine look like you.");
  set(".works__intro-aside", "( judge for yourself )");
  const descs = [
    "A typeface drawn from scratch, letter by letter. Yes, even the Q. Especially the Q.",
    "AI consulting for companies. Yes, sometimes the enemy is a client. Pays on time, though.",
    "A bubbly, chunky, groovy display typeface. Seven styles, one ego.",
    "An art farmhouse near Mantua. Any more handcrafted and it's the Middle Ages.",
  ];
  document.querySelectorAll(".work__desc").forEach((el, i) => (el.textContent = descs[i] || el.textContent));
  document.querySelectorAll(".work[data-cursor]").forEach((el) => el.setAttribute("data-cursor", "see it live →"));
  set(".works__count", "TOTAL ( 04 )");
  setN(document.querySelector(".js-ai-toggle"), 0, "\n            AI MODE\n            ");

  /* metodo */
  set(".js-metodo-words", "I call it a “method” because it sounds professional. It's actually simple: I listen, I ask questions, then I write the code. Line by line. By hand. Like artisans do — or madmen.");
  set(".js-metodo-label", "( the method )");
  set(".studio__motto", "Form follows the idea.");
  set(".studio__services > .mono-label", "What I do :");
  const servizi = [["Showcase websites", "( pretty )"], ["E-commerce", "( that sells )"], ["Landing pages", "( that convert )"], ["Web apps", "( that work )"], ["Old website makeovers", "( about time )"]];
  document.querySelectorAll(".service-row").forEach((row, i) => {
    if (!servizi[i]) return;
    const s = row.querySelectorAll("span");
    if (s[0]) s[0].textContent = servizi[i][0];
    if (s[1]) s[1].textContent = servizi[i][1];
  });
  set(".studio__closing", "No degree hanging on the wall. Just websites online, doing their job.");
  const closingLabel = document.querySelector(".studio__closing + .mono-label");
  if (closingLabel) closingLabel.textContent = "( practice beats theory )";

  /* team */
  set(".team .statement", "A website without people doesn't exist :");
  const team = [["FOUNDER & CEO", "Luca Salvemini"], ["DESIGN DEPARTMENT", "Luca Salvemini"], ["DEV DEPARTMENT", "Luca Salvemini"], ["PROJECT MANAGER", "Luca Salvemini"], ["COMPLAINTS OFFICE", "always Luca Salvemini"], ["AI DEPARTMENT", "( position eliminated )"]];
  document.querySelectorAll(".team-row").forEach((row, i) => {
    if (!team[i]) return;
    const lab = row.querySelector(".mono-label");
    const name = row.querySelector(".team-row__name");
    if (lab) lab.textContent = team[i][0];
    if (name) name.textContent = team[i][1];
  });

  /* marquee + glitch */
  const marquees = document.querySelectorAll(".js-marquee");
  if (marquees[0]) marquees[0].querySelectorAll(".marquee__chunk").forEach((c) => (c.textContent = "handmade — no AI — no degree — no fear — "));
  if (marquees[1]) marquees[1].querySelectorAll(".marquee__chunk").forEach((c) => (c.textContent = "Sure! Here's a modern and captivating website for your business… — "));
  if (marquees[2]) marquees[2].querySelectorAll(".marquee__chunk").forEach((c) => (c.textContent = "100% human — 0% prompts — 100% coffee — 0% excuses — "));

  /* finale */
  set(".js-cta-sm", "I make websites for people who'd rather stand out than generate.");
  set(".cta .statement-big", "Let's start from a blank page.");
  set(".js-cta-aside-1", "( AI wouldn't know what to put here.");
  set(".js-cta-aside-2", "I do )");
  const pills = document.querySelectorAll(".cta__actions .pill .pill__label");
  if (pills[0]) setN(pills[0], 0, "EMAIL ME");
  if (pills[1]) setN(pills[1], 0, "CALL ME");
  set(".cta__note", "( a human answers, always )");

  /* footer + hint */
  const legal = document.querySelectorAll(".footer__legal p");
  if (legal[0]) legal[0].textContent = "©2026 — Luca Salvemini. Made in Brescia, by hand.";
  if (legal[1]) legal[1].innerHTML = 'Website written line by line by a human<sup>*</sup> <span class="mono-label">*pinky promise</span>';
  if (legal[2]) legal[2].textContent = "No artificial intelligence was mistreated: it simply wasn't invited.";
  const hintEl = document.querySelector(".scroll-hint");
  if (hintEl && hintEl.lastChild) hintEl.lastChild.nodeValue = "  scroll — the rest won’t write itself";

  /* cookie banner */
  set(".js-cookie-text", "( I use Microsoft Clarity to understand how you browse the site: clicks and time on page. No personal data, you can refuse anytime )");
  set(".js-cookie-reject", "DECLINE");
  set(".js-cookie-accept", "ACCEPT");
}

if (LANG === "en") applyEnglish();

/* il badge in hero mostra la lingua verso cui puoi passare */
const langBtn = document.querySelector(".js-lang-toggle");
if (langBtn) {
  langBtn.textContent = LANG === "it" ? "EN" : "IT";
  langBtn.title = LANG === "it" ? "English version" : "Versione italiana";
  langBtn.addEventListener("click", () => {
    const next = LANG === "it" ? "en" : "it";
    try { localStorage.setItem("lang", next); } catch (e) {}
    /* URL nuovo, non reload: così si riparte sempre da cima */
    location.replace(location.pathname + "?lang=" + next);
  });
}

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------
   SMOOTH SCROLL (Lenis) — il burro sotto la marmellata
   ------------------------------------------------------------ */
let lenis = null;
const STATIC_MODE = location.search.includes("static"); // debug: ?static disattiva lo smooth scroll
if (!REDUCED && !STATIC_MODE) {
  lenis = new Lenis({ lerp: 0.11 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ------------------------------------------------------------
   UTILITY — split di un elemento in parole (span.w)
   ------------------------------------------------------------ */
function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = "";
  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.className = "w";
    span.textContent = word + (i < words.length - 1 ? " " : "");
    el.appendChild(span);
  });
  return el.querySelectorAll(".w");
}

/* ------------------------------------------------------------
   WORDMARK — "UMANO™" largo quanto lo schermo, sempre
   ------------------------------------------------------------ */
const wordmark = document.querySelector(".js-wordmark");
function fitWordmark() {
  if (!wordmark) return;
  const outer = wordmark.parentElement;      // l'h1: la sua larghezza è lo spazio disponibile
  const target = outer.offsetWidth - 2;
  if (target <= 0 || window.innerHeight <= 0) return; // viewport non pronto: riproverà al resize

  // 1) misura il rapporto larghezza/font con una taglia campione
  wordmark.style.transform = "none";
  wordmark.style.fontSize = "100px";
  const ratio = wordmark.offsetWidth / 100;  // px di testo per px di font
  if (!ratio) return;

  // 2) font ideale: riempi la larghezza, ma senza superare metà viewport in altezza
  const sizeByWidth = target / ratio;
  const sizeByHeight = (window.innerHeight * 0.46) / 0.78;
  const size = Math.min(sizeByWidth, sizeByHeight);
  wordmark.style.fontSize = size + "px";

  // 3) se l'altezza ha vinto, stira le lettere in orizzontale fino al bordo (stile extended)
  const scale = Math.min(target / wordmark.offsetWidth, 1.8);
  wordmark.style.transform = scale > 1.01 ? `scaleX(${scale.toFixed(4)})` : "none";
}

/* ------------------------------------------------------------
   PRELOADER — conta fino a 100 come i siti seri
   ------------------------------------------------------------ */
const loader = document.querySelector(".loader");
const loaderCount = document.querySelector(".js-loader-count");
const loaderLine = document.querySelector(".js-loader-line");
const LOADER_LINES = I18N.loader;
if (loaderLine) loaderLine.textContent = LOADER_LINES[0];

function heroEntrance(delay = 0) {
  const tl = gsap.timeline({ delay, defaults: { ease: "power4.out" } });
  tl.to(".js-wm-letter", { y: 0, opacity: 1, duration: 1.1, stagger: 0.055 })
    .to(".hero__tagline span", { opacity: 1, y: 0, duration: 0.7, stagger: 0.05 }, "-=0.75")
    .to(".hero__cta", { opacity: 1, duration: 0.6 }, "-=0.4")
    .to([".hero__where", ".hero__social", ".site-head__menu", ".site-head__nav a"], {
      opacity: 1, duration: 0.6, stagger: 0.06,
    }, "-=0.45");
  return tl;
}

function runLoader() {
  if (REDUCED) {
    loader.style.display = "none";
    gsap.set([".js-wm-letter", ".hero__tagline span", ".hero__cta", ".hero__where",
      ".hero__social", ".site-head__menu", ".site-head__nav a"], { opacity: 1, y: 0 });
    window.dispatchEvent(new Event("app:ready"));
    return;
  }

  if (lenis) lenis.stop();
  gsap.set(".hero__tagline span", { y: 18 });

  let lineIndex = 0;
  const lineTimer = setInterval(() => {
    lineIndex = (lineIndex + 1) % LOADER_LINES.length;
    loaderLine.textContent = LOADER_LINES[lineIndex];
  }, 520);

  const counter = { v: 0 };
  const tl = gsap.timeline();
  tl.to([loaderLine, loaderCount], { opacity: 1, duration: 0.3 })
    .to(counter, {
      v: 100,
      duration: 1.7,
      ease: "power2.inOut",
      onUpdate: () => (loaderCount.textContent = Math.round(counter.v)),
    })
    .add(() => clearInterval(lineTimer))
    .to([loaderLine, loaderCount], { opacity: 0, duration: 0.25 })
    .to(loader, {
      yPercent: -100,
      duration: 0.9,
      ease: "power4.inOut",
      onComplete: () => {
        loader.style.display = "none";
        if (lenis) lenis.start();
        ScrollTrigger.refresh();
        window.dispatchEvent(new Event("app:ready"));
      },
    })
    .add(heroEntrance(), "-=0.55");
}

document.fonts.ready.then(() => {
  fitWordmark();
  runLoader();
});
window.addEventListener("resize", fitWordmark);
window.addEventListener("pageshow", fitWordmark);
document.addEventListener("visibilitychange", fitWordmark);

/* ------------------------------------------------------------
   SCROLL ANIMATIONS — "ovunque", come da contratto
   ------------------------------------------------------------ */
if (!REDUCED) {
  const pinScenes = [];   /* le scene pinnate: servono al suggerimento anti-blocco */

  /* pista di scroll del pannello nero: va impostata PRIMA di creare
     qualsiasi trigger, così tutte le misure partono dal layout definitivo */
  const studioRest = document.querySelector(".studio__rest");
  if (studioRest) gsap.set(studioRest, { marginTop: "160vh" });

  /* Grandi frasi: reveal parola per parola, legato allo scroll */
  document.querySelectorAll(".reveal-words").forEach((el) => {
    const words = splitWords(el);
    gsap.fromTo(words, { opacity: 0.12 }, {
      opacity: 1,
      stagger: 0.05,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top 82%", end: "top 30%", scrub: true },
    });
  });

  /* Micro-label e note: entrata morbida */
  document.querySelectorAll(".fade-up").forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 18 }, {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  /* Card lavori: la cornice si apre come una tenda */
  document.querySelectorAll(".fade-card").forEach((card) => {
    const media = card.querySelector(".work__media");
    const meta = card.querySelector(".work__meta");
    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: "top 78%" },
    });
    tl.to(card, { opacity: 1, duration: 0.01 })
      .fromTo(media, { clipPath: "inset(0 0 100% 0)" }, {
        clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power4.inOut",
      })
      .fromTo(meta, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
      }, "-=0.45");
    /* parallasse leggera dentro la cornice; le immagini vere viaggiano
       leggermente ingrandite così i bordi non si scoprono mai.
       data-shift sposta l'inquadratura in orizzontale (%) per dare aria al soggetto */
    const inner = card.querySelector(".work__img") || card.querySelector(".work__ph");
    const overscan = inner.classList.contains("work__img") ? 1.12 : 1;
    const shiftX = parseFloat(inner.dataset && inner.dataset.shift ? inner.dataset.shift : 0) || 0;
    gsap.fromTo(inner, { yPercent: -6, xPercent: shiftX, scale: overscan }, {
      yPercent: 6, xPercent: shiftX, scale: overscan, ease: "none",
      scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  /* Righe servizi e team: sfilata con stagger */
  const rowReveal = (selector) => {
    document.querySelectorAll(selector).forEach((row, i) => {
      gsap.fromTo(row, { opacity: 0, x: -28 }, {
        opacity: 1, x: 0, duration: 0.7, delay: (i % 6) * 0.06, ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 90%" },
      });
    });
  };
  rowReveal(".service-row");
  rowReveal(".team-row");

  /* "REPARTO AI": la riga si cancella da sola */
  const strike = document.querySelector(".js-strike");
  if (strike) {
    ScrollTrigger.create({
      trigger: strike,
      start: "top 82%",
      onEnter: () => strike.classList.add("struck"),
    });
  }

  /* Wordmark: parallasse in uscita dal hero */
  gsap.to(".hero__wordmark", {
    yPercent: 22,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "bottom bottom", end: "bottom top", scrub: true },
  });

  /* PRESA DI POSIZIONE: label ferma in alto a sinistra, schermo bloccato;
     la prima frase sale dal basso, la seconda entra da sinistra */
  const manifestoPin = document.querySelector(".js-manifesto-pin");
  if (manifestoPin) {
    const s1 = manifestoPin.querySelector(".js-manifesto-s1");
    const s1words = splitWords(s1);
    const s2 = manifestoPin.querySelector(".js-manifesto-s2");
    const manifestoTl = gsap.timeline({
      scrollTrigger: {
        trigger: manifestoPin,
        start: "top top",
        end: "+=170%",
        pin: true,
        scrub: true,
        anticipatePin: 1,
      },
    })
      .set(s1, { opacity: 1 }, 0)
      .fromTo(s1words, { opacity: 0, y: 60 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.8, ease: "none" }, 0.08)
      .fromTo(s2, { opacity: 0, x: -90 }, { opacity: 1, x: 0, duration: 0.7, ease: "none" }, ">+=0.35")
      .to({}, { duration: 0.55 });   /* coda: tutto il testo resta in scena prima dello sblocco */
    pinScenes.push(manifestoTl.scrollTrigger);
  }

  /* Rail LAVORI: pinnata su desktop, lettere che si girano.
     Le lettere entrano solo quando la sezione è quasi tutta a schermo,
     così non spuntano mentre sopra c'è ancora la presa di posizione */
  ScrollTrigger.matchMedia({
    "(min-width: 900px)": function () {
      ScrollTrigger.create({
        trigger: ".works",
        start: "top top+=90",
        end: "bottom bottom-=120",
        pin: ".works__rail",
        pinSpacing: false,
      });
      gsap.from(".works__rail-letter", {
        opacity: 0,
        rotateX: 90,
        y: 30,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".works", start: "top 15%" },
      });
    },
    "(max-width: 899px)": function () {
      gsap.from(".works__rail-letter", {
        opacity: 0,
        rotateX: 90,
        y: 30,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".works", start: "top 75%" },
      });
    },
  });

  /* METODO: lo schermo si blocca, il testo si rivela con lo scroll,
     "( il metodo )" appare per ultimo — poi una pausa, e la parte sotto
     sale col suo sfondo bianco a coprire la scena
     (pista di scroll: reveal ~130vh + pausa ~30vh + copertura 100vh) */
  const metodoPin = document.querySelector(".js-metodo-pin");
  if (metodoPin) {
    const metodoWords = splitWords(metodoPin.querySelector(".js-metodo-words"));
    const metodoLabel = metodoPin.querySelector(".js-metodo-label");
    const metodoTl = gsap.timeline({
      scrollTrigger: {
        trigger: metodoPin,
        start: "top top",
        end: "+=260%",
        pin: true,
        pinSpacing: false,   /* niente spazio extra: la parte dopo scorre SOPRA la scena */
        scrub: true,
        anticipatePin: 1,
      },
    })
      .fromTo(metodoWords, { opacity: 0.08 }, { opacity: 1, stagger: 0.06, ease: "none" })
      .fromTo(metodoLabel, { opacity: 0, y: 16 }, { opacity: 0.55, y: 0, duration: 0.6, ease: "none" }, ">+=0.25");
    /* coda pari al reveal: il resto della corsa è pausa + copertura */
    metodoTl.to({}, { duration: metodoTl.duration() });
    pinScenes.push(metodoTl.scrollTrigger);
  }

  /* CTA finale: all'arrivo si vede subito "Partiamo da un foglio bianco.",
     poi lo schermo si blocca. Con lo scroll appare "Creo siti…" sopra,
     poi la battuta in due tempi, e per ultimi i tasti con la nota */
  const ctaAside = document.querySelector(".js-cta-aside");
  if (ctaAside) {
    const ctaSm = document.querySelector(".js-cta-sm");
    const ctaSmWords = splitWords(ctaSm);
    const ctaTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cta",
        start: "top top",
        end: "+=250%",
        pin: true,
        scrub: true,
        /* niente anticipatePin: col titolo già visibile qualsiasi
           aggancio anticipato si vedrebbe come uno scatto */
      },
    });
    ctaTl
      .set(ctaSm, { opacity: 1 }, 0)
      .fromTo(ctaSmWords, { opacity: 0 }, { opacity: 1, stagger: 0.12, duration: 1, ease: "none" }, 0.1)
      .fromTo(".js-cta-aside-1", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "none" }, ">+=0.35")
      /* "io sì" si fa desiderare: arriva dopo un bel pezzo di scroll, e in grassetto */
      .fromTo(".js-cta-aside-2", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "none" }, ">+=0.95")
      .fromTo(".js-cta-end", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "none" }, ">+=0.35")
      .to({}, { duration: 0.65 });   /* coda: tutto resta in scena prima dello sblocco */
    pinScenes.push(ctaTl.scrollTrigger);
  }

  /* i refresh devono ricalcolare i trigger dall'alto verso il basso,
     così ogni pin tiene conto dello spazio dei pin precedenti.
     Ordino per posizione REALE nel documento (a prova di valori stantii)
     e ri-ordino a ogni refresh (resize, barra mobile, ecc.) */
  const byDocOrder = (a, b) => {
    if (!a.trigger || !b.trigger || a.trigger === b.trigger) return 0;
    return a.trigger.compareDocumentPosition(b.trigger) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  };
  ScrollTrigger.sort(byDocOrder);
  ScrollTrigger.addEventListener("refreshInit", () => ScrollTrigger.sort(byDocOrder));

  /* SUGGERIMENTO ANTI-BLOCCO: se l'utente si ferma dentro una scena pinnata
     e il testo non è ancora tutto comparso, glielo diciamo con gentilezza */
  const scrollHint = document.querySelector(".scroll-hint");
  if (scrollHint && pinScenes.length) {
    let hintTimer = null;
    const armHint = () => {
      scrollHint.classList.remove("show");
      clearTimeout(hintTimer);
      hintTimer = setTimeout(() => {
        if (typeof menuOpen !== "undefined" && menuOpen) return;
        const stuck = pinScenes.some(
          (st) => st && st.isActive && st.animation && st.animation.progress() < 0.98
        );
        if (stuck) scrollHint.classList.add("show");
      }, 2400);
    };
    ["scroll", "wheel", "touchmove"].forEach((ev) =>
      window.addEventListener(ev, armHint, { passive: true })
    );
    if (lenis) lenis.on("scroll", armHint);
    armHint();
  }

  /* Marquee: scorrono da sole, accelerano se scrolli forte */
  document.querySelectorAll(".js-marquee").forEach((m) => {
    const track = m.querySelector(".js-marquee-track");
    const dir = parseInt(m.dataset.dir || "1", 10);
    const tween = dir === 1
      ? gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, repeat: -1, duration: 22, ease: "none" })
      : gsap.fromTo(track, { xPercent: -50 }, { xPercent: 0, repeat: -1, duration: 22, ease: "none" });
    ScrollTrigger.create({
      trigger: m,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 900, 3);
        gsap.to(tween, { timeScale: boost, duration: 0.3, overwrite: true });
      },
    });
  });
}

/* ------------------------------------------------------------
   GLITCH — l'AI prova a scrivere, il sito la corregge
   ------------------------------------------------------------ */
if (!REDUCED) {
  const GLYPHS = "@#§$%&/=?!*+^~<>|¤{}[]";
  let glitchActive = false;
  document.querySelectorAll(".js-glitch-text").forEach((el) => {
    const base = el.textContent;
    setInterval(() => {
      if (!glitchActive) return;
      let out = base.split("");
      const swaps = 2 + Math.floor(Math.random() * 4);
      for (let i = 0; i < swaps; i++) {
        const idx = Math.floor(Math.random() * base.length);
        out[idx] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = out.join("");
    }, 90);
  });
  ScrollTrigger.create({
    trigger: ".glitch",
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => (glitchActive = self.isActive),
  });
}

/* ------------------------------------------------------------
   CURSORE — un pallino che vive di vita propria
   ------------------------------------------------------------ */
if (FINE_POINTER && !REDUCED) {
  document.documentElement.classList.add("has-cursor");
  const cursor = document.querySelector(".cursor");
  const label = document.querySelector(".js-cursor-label");
  const pos = { x: -100, y: -100 };
  const target = { x: -100, y: -100 };

  window.addEventListener("mousemove", (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
  });

  gsap.ticker.add(() => {
    pos.x += (target.x - pos.x) * 0.18;
    pos.y += (target.y - pos.y) * 0.18;
    cursor.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
  });

  const grow = (scale) => gsap.to(cursor, { width: scale, height: scale, duration: 0.35, ease: "power3.out" });

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => grow(40));
    el.addEventListener("mouseleave", () => grow(12));
  });

  document.querySelectorAll("[data-cursor]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      label.textContent = el.dataset.cursor;
      cursor.classList.add("is-label");
      gsap.to(cursor, { width: 88, height: 88, duration: 0.4, ease: "power3.out" });
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-label");
      grow(12);
    });
  });
}

/* ------------------------------------------------------------
   PILLOLE MAGNETICHE — i bottoni ti vengono incontro
   ------------------------------------------------------------ */
if (FINE_POINTER && !REDUCED) {
  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: "power3.out" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    });
  });
}

/* ------------------------------------------------------------
   MENU OVERLAY — nero, grosso, disegnato a mano
   ------------------------------------------------------------ */
const overlay = document.querySelector(".overlay");
const menuToggle = document.querySelector(".js-menu-toggle");
const menuWord = document.querySelector(".js-menu-word");
let menuOpen = false;

const menuTl = gsap.timeline({ paused: true });
menuTl
  .set(overlay, { visibility: "visible" })
  .to(overlay, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" })
  .fromTo(".overlay__link", { yPercent: 60, opacity: 0 }, {
    yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power4.out",
  }, "-=0.25")
  .fromTo(".overlay__foot", { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.3");

function setMenu(open) {
  menuOpen = open;
  menuToggle.setAttribute("aria-expanded", String(open));
  overlay.setAttribute("aria-hidden", String(!open));
  menuWord.textContent = open ? I18N.close : I18N.menu;
  if (open) {
    if (lenis) lenis.stop();
    REDUCED ? gsap.set(overlay, { visibility: "visible", clipPath: "inset(0 0 0% 0)" }) : menuTl.play();
  } else {
    if (lenis) lenis.start();
    REDUCED ? gsap.set(overlay, { visibility: "hidden", clipPath: "inset(0 0 100% 0)" }) : menuTl.reverse();
  }
}
menuToggle.addEventListener("click", () => setMenu(!menuOpen));
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuOpen) setMenu(false);
});

/* ------------------------------------------------------------
   ANCORE — scroll morbido, niente strappi
   ------------------------------------------------------------ */
document.querySelectorAll(".js-anchor").forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id.startsWith("#")) return;
    e.preventDefault();
    if (menuOpen) setMenu(false);
    const go = () => {
      if (lenis) lenis.scrollTo(id, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
      else document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    };
    menuOpen ? setTimeout(go, 350) : go();
  });
});

/* ------------------------------------------------------------
   MODALITÀ AI — l'interruttore più onesto del web
   ------------------------------------------------------------ */
const aiToggle = document.querySelector(".js-ai-toggle");
const aiMsg = document.querySelector(".js-ai-msg");
const AI_REPLIES = I18N.ai;
let aiClicks = 0;
let aiTimer = null;

aiToggle.addEventListener("click", () => {
  const dot = aiToggle.querySelector(".ai-toggle__dot");
  /* il pallino ci prova, poi ci ripensa */
  gsap.timeline()
    .to(dot, { x: 16, duration: 0.15, ease: "power2.out" })
    .to(dot, { x: 0, duration: 0.3, ease: "elastic.out(1, 0.35)" }, "+=0.12");
  aiMsg.textContent = AI_REPLIES[Math.min(aiClicks, AI_REPLIES.length - 1)];
  aiClicks++;
  aiToggle.classList.add("show-msg");
  clearTimeout(aiTimer);
  aiTimer = setTimeout(() => aiToggle.classList.remove("show-msg"), 1800);
});

/* ------------------------------------------------------------
   RIGA CANCELLATA — il reparto AI non ce l'ha fatta
   ------------------------------------------------------------ */
/* (gestita via classe .struck: la riga si disegna in CSS) */
const strikeStyle = document.createElement("style");
strikeStyle.textContent = `
  .js-strike.struck::after { transform: scaleX(1); transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1) 0.2s; }
`;
document.head.appendChild(strikeStyle);
if (REDUCED) {
  const s = document.querySelector(".js-strike");
  if (s) s.classList.add("struck");
}

/* ------------------------------------------------------------
   COOKIE / CONSENSO — Microsoft Clarity parte solo dopo l'ok.
   ------------------------------------------------------------ */
(function () {
  const CONSENT_KEY = "clarity-consent";

  function loadClarity() {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "xqvxauky8h");
  }

  let consent = null;
  try { consent = localStorage.getItem(CONSENT_KEY); } catch (e) {}

  if (consent === "granted") { loadClarity(); return; }
  if (consent === "denied") return;

  const banner = document.querySelector(".js-cookie-banner");
  if (!banner) return;
  window.addEventListener("app:ready", () => { banner.classList.add("is-visible"); }, { once: true });

  const accept = banner.querySelector(".js-cookie-accept");
  const reject = banner.querySelector(".js-cookie-reject");

  accept.addEventListener("click", () => {
    try { localStorage.setItem(CONSENT_KEY, "granted"); } catch (e) {}
    banner.classList.remove("is-visible");
    loadClarity();
  });
  reject.addEventListener("click", () => {
    try { localStorage.setItem(CONSENT_KEY, "denied"); } catch (e) {}
    banner.classList.remove("is-visible");
  });
})();
