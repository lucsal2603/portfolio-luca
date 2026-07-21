# LUCA™ — Portfolio di Luca Salvemini

Portfolio one-page ispirato a [noth.in](https://www.noth.in/): bianco/nero, tipografia gigante,
scroll animation ovunque, e una voce che prende in giro chi i siti li genera con l'AI.

## Avviare in locale

```bash
python3 -m http.server 8019 --directory /Users/lucas/portfolio-umano
# → http://localhost:8019
```

(oppure config `portfolio-umano` in ~/.claude/launch.json, porta 8019)

## Struttura

- `index.html` — tutto il contenuto e la copy
- `style.css` — design system (Hanken Grotesk + IBM Plex Mono, bianco/nero)
- `script.js` — GSAP + ScrollTrigger + Lenis (CDN), preloader, cursore, menu, marquee

## Cose da sapere

- **Immagini progetti**: sono placeholder bianchi (`.work__ph`). Per mettere gli screenshot veri:
  dentro ogni `<figure class="work__media">` sostituisci il div `.work__ph` con
  `<img src="..." alt="..." loading="lazy">` (l'animazione clip-path resta).
- **`?static`**: aggiungi `?static` all'URL per disattivare lo smooth scroll (debug).
- **Wordmark**: si adatta da solo alla larghezza (`fitWordmark` in script.js); con viewport
  bassi limita l'altezza al 46% e allarga le lettere (stile extended).
- **Accessibilità**: rispetta `prefers-reduced-motion`, skip-link, focus visibili.
- **Le battute** sono nella copy dell'HTML: cambiale liberamente, niente si rompe.
