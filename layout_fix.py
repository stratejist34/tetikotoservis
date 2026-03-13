import re

file_path = r'c:\Users\Emrah\Desktop\ASTRO  Projeler\tetikotoservis\src\layouts\Layout.astro'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace fonts
pattern_fonts = r'@font-face\s*\{\s*font-family:\s*"ManifoldExtended";.*?font-display:\s*swap;\s*\}\s*@font-face\s*\{\s*font-family:\s*"ManifoldExtended";.*?font-display:\s*swap;\s*\}'
rep_fonts = '''      @font-face {
        font-family: "BronsonBlack";
        src: url("/fonts/BronsonBlack-BWP1B.ttf") format("truetype");
        font-weight: 900;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: "Cremo";
        src: url("/fonts/CremoDEMO-Regular.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }'''
text = re.sub(pattern_fonts, rep_fonts, text, flags=re.DOTALL)

# Inject variables
rep_root = ''':root {
        --font-body: "Manrope", system-ui, -apple-system, sans-serif;
        --font-heading-readable: var(--font-body);
        --font-display: "BronsonBlack", var(--font-heading-readable);
        --font-display-alt: "Cremo", var(--font-display);'''
text = text.replace(':root {', rep_root, 1)

# Body replacement
pattern_body = r'body\s*\{\s*font-family:\s*"Manrope",\s*system-ui,\s*sans-serif;\s*font-size:\s*18px;\s*line-height:\s*1.7;\s*color:\s*#2a2a2a;\s*background:\s*#020617;\s*\}'
rep_body = '''body {
        font-family: var(--font-body);
        font-size: 17px;
        line-height: 1.7;
        color: #2a2a2a;
        background: #020617;
        text-rendering: optimizeLegibility;
      }'''
text = re.sub(pattern_body, rep_body, text)

# Global Headings
pattern_headings = r'h1,\s*\.h1\s*\{.*?text-transform:\s*uppercase;\s*\}\s*h2,\s*\.h2\s*\{.*?letter-spacing:\s*-0\.01em;\s*\}\s*h3,\s*\.h3\s*\{.*?letter-spacing:\s*0;\s*\}'
rep_headings = '''h1,
      .h1 {
        font-family: var(--font-display);
        font-size: clamp(32px, 4vw, 52px);
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -0.02em;
        text-transform: uppercase;
      }

      h2,
      .h2 {
        font-family: var(--font-heading-readable);
        font-size: clamp(20px, 2.2vw, 28px);
        font-weight: 650;
        line-height: 1.25;
        letter-spacing: -0.01em;
      }

      h3,
      .h3 {
        font-family: var(--font-heading-readable);
        font-size: clamp(16px, 1.6vw, 20px);
        font-weight: 650;
        line-height: 1.2;
        letter-spacing: -0.01em;
      }

      .accent-heading {
        color: var(--brand-orange) !important;
      }'''
text = re.sub(pattern_headings, rep_headings, text, flags=re.DOTALL)

# Revert specific Manifold usages to heading-readable and display
text = text.replace('font-family: "ManifoldExtended", sans-serif;', 'font-family: var(--font-heading-readable);')
text = text.replace('font-family: "ManifoldExtended", system-ui, sans-serif;', 'font-family: var(--font-heading-readable);')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)
