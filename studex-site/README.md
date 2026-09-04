# studex-site

The Studex Global Markets marketing site — tenth-anniversary edition.

```
studex-site/
├── index.html               the site, self-contained
├── POSITIONING-LUXURY.md    how to position as a high-end service
└── assets/
    ├── studex-mark-ivory.png   for dark backgrounds
    └── studex-mark-black.png   for light backgrounds
```

## Run it

```bash
cd studex-site && python3 -m http.server 8901
# → http://localhost:8901
```

Self-contained: one HTML file, no build step, no dependencies. Fonts come from Google
Fonts (Cormorant Garamond, Inter). Deploys to Vercel or any static host as-is.

## The assets

Both marks are derived from `deployment/brand_assets/studex_global_markets_logo.jpeg` —
trimmed to the artwork, background removed, ink recoloured, alpha preserved. The ivory
variant is for the dark site; the black one is for light backgrounds and print.

The source JPEG has letterboxing and a hard white field, so it cannot be dropped onto a
dark page directly. Regenerate with the script in the commit history if the source mark
is ever updated.

## Design intent

Obsidian `#0a0a0a`, ivory `#f2f0e9`, one gold `#c9a84c`. Cormorant Garamond at scale for
display, Inter for body, and a great deal of empty space.

Tom Ford discipline means **reduction, not ornament** — which is the same grammar as the
product design language in [`studex-os/design/`](../studex-os/design/DESIGN.md), just a
different register. The marketing site is cinematic and spare; the product is quiet and
functional. Both are reductive. Neither uses gradients, glows, textures or filigree.

Two choices worth keeping:

- **A wordmark in the masthead, the full crest only in hero and footer.** The circuit-globe
  loses its detail below about 80px and reads as a smudge. Houses use wordmarks in
  navigation for exactly this reason.
- **Roman numerals, not "10 Years!"** `MMXVI · MMXXVI` states a fact and trusts the reader.
  An exclamation mark is a company celebrating itself.

## Before it goes live

Dates and claims need verifying — see the checklist at the end of
[`POSITIONING-LUXURY.md`](POSITIONING-LUXURY.md). A page whose entire argument is a decade
of provenance cannot carry a date somebody can disprove.

The biggest single upgrade available is **one photograph** in place of the hero mark:
Ankole horns, close, single light, near-black. That needs a photographer, not a designer.
