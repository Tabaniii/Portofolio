<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
## STRICT DESIGN LOCK & VISUAL RULES (Source of Truth)

You must cross-reference all code generation with the rules defined in `design.md`. The project visual style is a "raw personal portfolio layout" with bold block compositions, high-contrast tokens, and heavy typography. 

### 1. Code-to-Visual Constraints
- **Zero Layout Drift:** Never restructure the component tree or section reordering. The layout must strictly follow this approved Section hierarchy in Next.js App Router component mapping: (1) Hero, (2) ProjectBand [Selected Projects], (3) About, (4) BentoSection [Workflow & Stack], (5) Footer [Contact].
- **Tailwind / Global CSS Mapping:** Do not substitute color variables or inject generic Tailwind classes that dilute the raw high-contrast color palette (e.g., `#e66060` for Bio Red, `#ff8d28` for Orange).
- **Typography Preservation:** Keep typography weights extra bold and massive as defined. The text `TABANI` on the Hero section must remain absolute uppercase, transparent fill, with text-stroke outline overlaying the background image.

### 2. Content & Copy Lock
- Do not auto-correct intentional lowercase markers or informal copy strings. 
- Words like "gua" and "nggak" are intentional components of the brand identity. Keep them verbatim.
- Visible text tokens like `card name`, `dkv side`, and `dw cv` must preserve their exact casing during component rendering.

### 3. Refactoring Guardrails
- Refactor for Next.js performance (e.g., using `React.lazy` or optimizing metadata) ONLY if the final rendered screen layout output matches the mobile-first vertical block composition exactly.
- Do not add standard modern layout polishments (like soft gradients, standard grid cards, drop shadows, or glassmorphism) unless explicitly requested.