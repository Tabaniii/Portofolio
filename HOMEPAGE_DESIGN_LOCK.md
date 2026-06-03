# Homepage Design Lock for Cursor Agent

This document is the fixed design reference for the homepage. Use it as the source of truth when editing the project. The goal is to keep the current visual style stable and prevent accidental redesign, layout drift, color changes, typography changes, section reordering, or unwanted polishing.

Reference screenshot size: `692px × 2048px`.
Design direction: raw personal portfolio homepage, bold block layout, high-contrast colors, oversized typography, mobile-first vertical composition.

---

## 1. Non-Negotiable Design Rules

Do not redesign the page.
Do not modernize the layout unless explicitly requested.
Do not replace the color palette.
Do not change the order of sections.
Do not rename visible labels unless explicitly requested.
Do not auto-correct intentional lowercase or informal copy.
Do not add extra decorative elements, gradients, shadows, animations, icons, or cards unless explicitly requested.
Do not convert the design into a standard corporate landing page.

The homepage must keep this exact visual hierarchy:

1. Hero image with oversized outlined text `TABANI`
2. Gray greeting block with `Halo Semua`
3. Two-column intro section: red bio block on the left, black `card name` block on the right
4. Orange skills/navigation card grid
5. Maroon project section with centered `Projek`
6. Gray contact/footer section with centered `Contact & Footer`

Only these changes are allowed by default:

- Replacing placeholder content with real content
- Updating links or routes
- Connecting buttons/cards to actual pages
- Replacing the hero image with the same framing and mood
- Improving code cleanliness without changing the visual output

---

## 2. Global Layout Behavior

The design is mobile-first and vertically stacked. The layout should fill the full viewport width. On larger screens, keep the same visual proportions unless a desktop redesign is explicitly requested.

Recommended page container behavior:

```css
body {
  margin: 0;
  padding: 0;
  font-family: Inter, Poppins, Arial, Helvetica, sans-serif;
  background: #d9d9d9;
  color: #000000;
}

.homepage {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}
```

Do not add a global max-width by default. The screenshot uses full-width horizontal sections.

---

## 3. Color Tokens

Use these colors consistently. Do not substitute them with similar colors.

```css
:root {
  --color-white: #ffffff;
  --color-black: #000000;
  --color-light-gray: #d9d9d9;
  --color-bio-red: #e66060;
  --color-orange: #ff8d28;
  --color-project-maroon: #8e3b3b;
  --color-hero-outline: #f5f5f5;
}
```

Color usage:

- Hero text outline: `#f5f5f5` or white with transparent fill
- Greeting background: `#d9d9d9`
- Greeting text: `#000000`
- Bio block background: `#e66060`
- Bio text: `#000000`
- Right intro block background: `#000000`
- Right intro text: `#ffffff`
- Card grid background: `#ff8d28`
- Cards: `#ffffff`
- Card text: `#000000`
- Project section background: `#8e3b3b`
- Project title: `#ffffff`
- Footer background: `#d9d9d9`
- Footer text: `#ffffff`

---

## 4. Typography Rules

Use a heavy, clean sans-serif font. Recommended fonts: `Inter`, `Poppins`, `Montserrat`, or system sans-serif. Keep font weights bold and visually strong.

General typography:

```css
h1, h2, h3, p, a, button {
  font-family: Inter, Poppins, Arial, Helvetica, sans-serif;
}
```

Specific text styling:

### Hero Word: `TABANI`

- Text: `TABANI`
- Uppercase
- Transparent fill
- White/light outline
- Very large size
- Heavy font weight
- Must visually dominate the hero image
- Must overlay the image, not sit below it

Recommended CSS:

```css
.hero-title {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(96px, 25vw, 190px);
  font-weight: 900;
  letter-spacing: -0.08em;
  color: transparent;
  -webkit-text-stroke: 3px var(--color-hero-outline);
  text-stroke: 3px var(--color-hero-outline);
  line-height: 0.9;
  pointer-events: none;
  user-select: none;
}
```

### Greeting: `Halo Semua`

- Centered horizontally and vertically
- Black text
- Very bold
- Large but smaller than hero title

Recommended CSS:

```css
.greeting-title {
  font-size: clamp(44px, 9vw, 72px);
  font-weight: 900;
  line-height: 1;
  text-align: center;
}
```

### Intro Bio Text

Current copy:

```text
Gua Tabani, seorang Junior Programmer yang hobi ngulik ekosistem Laravel. Fokus gua adalah ngebangun aplikasi web yang nggak cuma jalan, tapi juga aman dan punya fitur real-time yang responsif. Dari magang di Rubicweb sampai bikin marketplace otomotif, gua selalu percaya kalau kode yang bersih adalah kunci aplikasi yang hebat
```

Rules:

- Keep informal tone
- Center aligned
- Black text
- Bold
- Compact paragraph width
- Do not make it too thin or too small

Recommended CSS:

```css
.bio-text {
  max-width: 330px;
  margin: 0 auto;
  font-size: clamp(16px, 2.9vw, 20px);
  font-weight: 800;
  line-height: 1.35;
  text-align: center;
  letter-spacing: 0.02em;
}
```

### Card Labels

Current labels:

```text
Stack
Projek
Filosofi
Pendidikan
dkv side
dw cv
```

Rules:

- Keep exact casing unless user requests changes
- Centered text
- Black text
- Extra bold
- Large size

Recommended CSS:

```css
.card-label {
  font-size: clamp(34px, 7vw, 52px);
  font-weight: 900;
  line-height: 1;
  text-align: center;
}
```

---

## 5. Section-by-Section Layout Specification

### Section 1: Hero

Purpose: visual identity opener.

Required structure:

```html
<section class="hero-section">
  <img class="hero-image" src="..." alt="Tabani" />
  <h1 class="hero-title">TABANI</h1>
</section>
```

Recommended CSS:

```css
.hero-section {
  position: relative;
  width: 100%;
  height: clamp(420px, 65vw, 470px);
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
}
```

Important:

- The image must remain behind the outlined text.
- The text must be oversized and may visually touch the page edges.
- Do not add dark overlays unless the text becomes unreadable.
- Do not crop the person out of the center.

---

### Section 2: Greeting Block

Purpose: simple greeting divider.

Required structure:

```html
<section class="greeting-section">
  <h2 class="greeting-title">Halo Semua</h2>
</section>
```

Recommended CSS:

```css
.greeting-section {
  width: 100%;
  min-height: 120px;
  background: var(--color-light-gray);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Important:

- Keep this block flat gray.
- Do not add subtitle text.
- Do not add padding that makes it look like a normal website header.

---

### Section 3: Intro Split Block

Purpose: personal description and visual black card placeholder.

Required structure:

```html
<section class="intro-section">
  <div class="intro-bio">
    <p class="bio-text">...</p>
  </div>
  <div class="intro-card-name">
    <span>card name</span>
  </div>
</section>
```

Recommended CSS:

```css
.intro-section {
  width: 100%;
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  min-height: 400px;
}

.intro-bio {
  background: var(--color-bio-red);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
}

.intro-card-name {
  background: var(--color-black);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(34px, 7vw, 52px);
  font-weight: 900;
  line-height: 1;
  text-align: center;
}
```

Important:

- Left side must be red.
- Right side must be black.
- No gap between the two blocks.
- Bio text must remain centered.
- `card name` must remain lowercase unless the user asks otherwise.

---

### Section 4: Orange Card Grid

Purpose: navigation/skill/project category cards.

Required visual behavior:

- Orange section background
- White rectangular cards
- Slightly rounded corners
- Large black labels
- Irregular grid composition
- Generous gaps
- No shadows
- No icons by default

Required structure:

```html
<section class="card-grid-section">
  <div class="card-grid">
    <a class="grid-card card-stack" href="#stack"><span class="card-label">Stack</span></a>
    <a class="grid-card card-projek" href="#projek"><span class="card-label">Projek</span></a>
    <a class="grid-card card-filosofi" href="#filosofi"><span class="card-label">Filosofi</span></a>
    <a class="grid-card card-pendidikan" href="#pendidikan"><span class="card-label">Pendidikan</span></a>
    <a class="grid-card card-dkv" href="#dkv-side"><span class="card-label">dkv side</span></a>
    <a class="grid-card card-cv" href="#cv"><span class="card-label">dw cv</span></a>
  </div>
</section>
```

Recommended CSS:

```css
.card-grid-section {
  width: 100%;
  background: var(--color-orange);
  padding: 18px;
  box-sizing: border-box;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 181px 224px 181px;
  gap: 18px 22px;
}

.grid-card {
  background: var(--color-white);
  color: var(--color-black);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-sizing: border-box;
}

.card-stack {
  grid-column: 1 / span 2;
  grid-row: 1;
}

.card-projek {
  grid-column: 3;
  grid-row: 1;
}

.card-filosofi {
  grid-column: 1;
  grid-row: 2;
}

.card-pendidikan {
  grid-column: 2 / span 2;
  grid-row: 2;
}

.card-dkv {
  grid-column: 1 / span 2;
  grid-row: 3;
}

.card-cv {
  grid-column: 3;
  grid-row: 3;
}
```

Important:

- Keep orange as the entire section background.
- Keep all cards white.
- Do not add borders, shadows, hover scaling, gradient backgrounds, glassmorphism, or icons.
- Keep the uneven card layout. Do not convert all cards into equal-sized cards.
- If hover behavior is needed, use only a very subtle opacity change.

Allowed hover:

```css
.grid-card:hover {
  opacity: 0.92;
}
```

---

### Section 5: Project Band

Purpose: project section title divider.

Required structure:

```html
<section id="projek" class="project-section">
  <h2 class="project-title">Projek</h2>
</section>
```

Recommended CSS:

```css
.project-section {
  width: 100%;
  min-height: 270px;
  background: var(--color-project-maroon);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-title {
  font-size: clamp(42px, 8vw, 64px);
  font-weight: 900;
  line-height: 1;
  text-align: center;
}
```

Important:

- Keep this section visually empty except the centered title unless actual project cards are explicitly requested.
- Do not place project cards here by default.
- Do not change maroon to red, brown, or purple.

---

### Section 6: Contact & Footer

Purpose: final footer block.

Required structure:

```html
<footer class="footer-section">
  <h2 class="footer-title">Contact & Footer</h2>
</footer>
```

Recommended CSS:

```css
.footer-section {
  width: 100%;
  min-height: 150px;
  background: var(--color-light-gray);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-title {
  font-size: clamp(38px, 7vw, 56px);
  font-weight: 900;
  line-height: 1;
  text-align: center;
}
```

Important:

- Footer text must remain white.
- Background must remain gray.
- Do not add social icons, copyright rows, columns, or forms unless explicitly requested.

---

## 6. Responsive Rules

Default target is mobile-first. Do not create a drastically different desktop layout unless explicitly requested.

For small screens below `480px`:

```css
@media (max-width: 480px) {
  .intro-section {
    grid-template-columns: 1.35fr 1fr;
    min-height: 360px;
  }

  .card-grid-section {
    padding: 14px;
  }

  .card-grid {
    grid-template-rows: 160px 200px 160px;
    gap: 14px 16px;
  }

  .hero-title {
    -webkit-text-stroke-width: 2px;
  }
}
```

For desktop screens, preserve the composition:

```css
@media (min-width: 900px) {
  .hero-section {
    height: 470px;
  }

  .intro-section {
    min-height: 400px;
  }

  .card-grid {
    grid-template-rows: 181px 224px 181px;
  }
}
```

Avoid stacking the intro blocks vertically unless the user asks for a different mobile layout. The screenshot keeps a split composition.

---

## 7. Component Naming Recommendation

Use these class names or equivalent component names to prevent confusion:

```text
Homepage
HeroSection
GreetingSection
IntroSection
CardGridSection
ProjectSection
FooterSection
```

Recommended file/component structure:

```text
src/
  components/
    homepage/
      HeroSection.*
      GreetingSection.*
      IntroSection.*
      CardGridSection.*
      ProjectSection.*
      FooterSection.*
  styles/
    homepage.css
```

For Laravel Blade projects:

```text
resources/views/home.blade.php
resources/css/homepage.css
public/images/hero-tabani.*
```

For Next.js/React projects:

```text
app/page.tsx
components/homepage/*.tsx
app/homepage.css
public/images/hero-tabani.*
```

---

## 8. Content Lock

Current visible content must stay as follows unless explicitly changed by the user:

```text
TABANI
Halo Semua
Gua Tabani, seorang Junior Programmer yang hobi ngulik ekosistem Laravel. Fokus gua adalah ngebangun aplikasi web yang nggak cuma jalan, tapi juga aman dan punya fitur real-time yang responsif. Dari magang di Rubicweb sampai bikin marketplace otomotif, gua selalu percaya kalau kode yang bersih adalah kunci aplikasi yang hebat
card name
Stack
Projek
Filosofi
Pendidikan
dkv side
dw cv
Projek
Contact & Footer
```

Do not change `gua` into `saya`.
Do not change `nggak` into `tidak`.
Do not change `dkv side` casing.
Do not change `dw cv` casing.
Do not change `card name` casing.

---

## 9. Implementation Checklist Before Committing Changes

Before finishing any edit, verify these points:

- The hero still shows a background image.
- `TABANI` is still huge, outlined, transparent, and placed over the image.
- The gray `Halo Semua` section still appears directly below the hero.
- The intro section still has red-left and black-right columns.
- The bio text is still centered, bold, and compact.
- The card grid still uses orange background with white cards.
- The card layout is still irregular, not equal-card corporate style.
- The maroon `Projek` section still appears after the orange card grid.
- The gray `Contact & Footer` section still appears at the bottom.
- No extra visual effects were added without instruction.
- No color substitutions were made.
- No content casing was auto-corrected.

---

## 10. Cursor Agent Instruction

When modifying this project, prioritize visual consistency over generic best practices. Refactor code only if the rendered output remains visually equivalent to the reference design.

If a requested change conflicts with this design lock, make the smallest possible adjustment and preserve the original section order, colors, typography weight, and block-based layout.

Do not infer a new design system. This file is the design system.
