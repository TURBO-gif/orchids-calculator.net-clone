
<high_level_design>
## 1. Brand & Art Direction Overview

Calculator.net employs a **professional, utilitarian design system** focused on functionality and clarity. The visual style is clean and straightforward with a strong emphasis on usability over decoration. The interface features:

- **Dark blue header** (#003d6b) with high contrast white branding
- **Light blue-gray background** (#dbe3e8) for the main content area providing subtle contrast
- **White content containers** with clean edges for the calculator and content sections
- **Professional typography** with clear hierarchy using standard sans-serif fonts
- **Muted color palette** emphasizing blues, grays, and greens
- **Functional button design** with clear tactile appearance mimicking physical calculator buttons
- **Circular image containers** for category icons creating visual consistency
- **Minimal ornamentation** - design serves function first

The overall aesthetic is **serious, trustworthy, and academic** - appropriate for a calculation tool requiring accuracy and reliability.

## 2. Color Palette (Light Theme)

| Token | HEX / RGB | Usage | Notes |
|-------|-----------|-------|-------|
| Primary Dark Blue | #003d6b / rgb(0, 61, 107) | Header background, primary branding | Main brand color |
| Light Blue-Gray | #dbe3e8 / rgb(219, 227, 232) | Page background, calculator container background | Soft neutral background |
| Calculator Display Blue | #3d6d8e / rgb(61, 109, 142) | Calculator display area | Darker blue for contrast |
| Pure White | #ffffff / rgb(255, 255, 255) | Content backgrounds, text on dark backgrounds, button backgrounds | Primary light surface |
| Link Blue | #0066cc / rgb(0, 102, 204) | Hyperlinks, interactive text | Standard accessible link color |
| Link Hover Blue | #0052a3 / rgb(0, 82, 163) | Link hover state | Darker on interaction |
| Button Blue | #4a7c9e / rgb(74, 124, 158) | Calculator operator buttons, search button | Muted blue for actions |
| Function Button | #e8e8e8 / rgb(232, 232, 232) | Scientific function buttons | Light gray for secondary functions |
| Number Button | #f5f5f5 / rgb(245, 245, 245) | Calculator number buttons | Near-white for primary input |
| Equals/AC Green-Blue | #6b8e9d / rgb(107, 142, 157) | Special calculator functions | Distinctive color for key actions |
| All Calculators Green | #5f7f3a / rgb(95, 127, 58) | CTA button at bottom | Earth-tone green for emphasis |
| Text Dark Gray | #333333 / rgb(51, 51, 51) | Body text, headings | High contrast readable text |
| Text Medium Gray | #555555 / rgb(85, 85, 85) | Secondary text | Slightly lighter text |
| Border Light Gray | #cccccc / rgb(204, 204, 204) | Borders, separators | Subtle dividers |
| Category Green | #3d8f4c / rgb(61, 143, 76) | Category heading text | Financial, Fitness, Math, Other categories |

## 3. Typography Scale

**Font Family:**
- Primary: Arial, Helvetica, sans-serif (system fonts for maximum compatibility)

**Font Sizes & Weights:**

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| H1 Main Title | 26px | bold (700) | 1.3 | "Free Online Calculators" |
| Category Headings | 18px | bold (700) | 1.4 | "Financial Calculators", "Math Calculators", etc. |
| Body Text | 14px | normal (400) | 1.6 | Paragraph text, descriptions |
| Link Text | 14px | normal (400) | 1.5 | Navigation, calculator links |
| Calculator Display | 20px | normal (400) | 1.2 | Calculator output display |
| Calculator Buttons | 13px | normal (400) | 1.2 | Button labels |
| Footer Text | 12px | normal (400) | 1.7 | Footer content |
| Logo Text | 22px | bold (700) | 1 | Header branding |
| Small Text | 11px | normal (400) | 1.4 | Meta information |

**Text Treatments:**
- Links: underlined on hover only
- Color: #0066cc default, #0052a3 on hover
- Superscripts used for mathematical notations (x², sin⁻¹, etc.)

## 4. Spacing & Layout Grid

**Container Widths:**
- Maximum content width: ~1200px
- Calculator container: 100% up to ~1000px
- Content margins: 0 auto for centering

**Grid System:**
- 4-column grid for category tiles on desktop
- Equal width columns with gaps
- Responsive collapse to 2 columns, then 1 column

**Spacing Scale:**

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight internal spacing |
| sm | 8px | Button padding, small gaps |
| md | 12px | Standard element spacing |
| lg | 20px | Section padding, larger gaps |
| xl | 30px | Major section separation |
| xxl | 40px | Large section breaks |

**Specific Measurements:**
- Header height: ~50px
- Header logo width: 208px × 22px
- Calculator button size: ~45px × 35px (varies)
- Category icon: 135px × 135px (circular display)
- Search input height: ~32px
- Footer padding: 20px vertical, 30px horizontal

**Layout Padding:**
- Header horizontal padding: 20px
- Content section padding: 20px
- Calculator internal padding: 15px
- Category tile padding: 20px
- Footer padding: 30px

## 5. Visual Effects & Treatments

**Shadows:**
- Calculator container: subtle box-shadow `0 2px 8px rgba(0,0,0,0.1)`
- Button hover: slight shadow `0 1px 3px rgba(0,0,0,0.2)`
- None on most elements - minimal shadow usage

**Borders:**
- Calculator buttons: 1px solid #cccccc
- Calculator display: 2px solid border (darker blue)
- Input fields: 1px solid #cccccc
- Category tiles: no visible borders

**Border Radius:**
- Buttons: 3px (subtle rounding)
- Input fields: 3px
- Calculator container: 4px
- Category images: 50% (perfect circles)
- Search button: 3px
- All Calculators button: 4px

**Gradients:**
- Minimal gradient usage
- Calculator display may have subtle gradient from darker to lighter blue

**Opacity & Overlays:**
- Hover states: slight opacity change (~0.9)
- No complex overlays

**Transitions:**
- Button hover: 0.2s ease
- Link hover: 0.15s ease
- Color transitions on interactive elements

**Filters:**
- Category images: slight grayscale or desaturation (appears as black & white circular photos)

**Background Treatments:**
- Header: solid color
- Main background: solid light blue-gray
- Calculator: white background
- Button backgrounds: solid colors with hover state changes

## 6. Component Styles

### Header Component
- **Background:** #003d6b (dark blue)
- **Height:** ~50px
- **Padding:** 15px 20px
- **Layout:** Flexbox, space-between
- **Logo:** White SVG, 208px × 22px
- **Sign In Link:** White text, right-aligned, 14px, no background

### Calculator Component (Scientific)
- **Container Background:** White
- **Display Background:** #3d6d8e (blue-gray)
- **Display Text:** White, 20px, right-aligned
- **Input Display:** Light gray background, white text
- **Button Grid:** 5×5 grid for numbers/operators, additional function rows
- **Number Buttons:** Light gray (#f5f5f5), 1px border
- **Operator Buttons:** Blue-gray (#4a7c9e), white text
- **Function Buttons:** Light gray (#e8e8e8)
- **Equals/AC Buttons:** Teal/green-blue accent
- **Radio Buttons:** Deg/Rad toggle in calculator

### Search Component
- **Container:** White background
- **Input Field:** White background, 1px border #ccc, 3px radius
- **Input Padding:** 8px 12px
- **Search Button:** Blue (#4a7c9e), white text, 3px radius
- **Button Padding:** 8px 20px
- **Width:** Input stretches, button fixed width

### Category Tile Component
- **Container:** White background, minimal/no border
- **Icon Container:** Circular, 135px diameter
- **Icon Image:** Grayscale circular photo
- **Heading:** 18px bold, green color (#3d8f4c), margin-bottom 12px
- **Link List:** Unstyled list, blue links (#0066cc)
- **Link Spacing:** 6px vertical between items
- **Link Hover:** Underline, darker blue
- **Tile Padding:** 20px
- **Tile Layout:** Inline-block or grid item

### CTA Button (All Calculators)
- **Background:** Green (#5f7f3a)
- **Text:** White, 16px, bold
- **Padding:** 12px 30px
- **Border Radius:** 4px
- **Width:** Fixed width ~250px
- **Icon:** Right-pointing arrow/play symbol
- **Hover:** Darker green, slight shadow

### Footer Component
- **Background:** Light gray (#e8e8e8)
- **Text Color:** Dark gray (#555)
- **Font Size:** 12px
- **Line Height:** 1.7
- **Padding:** 30px 40px
- **Links:** Standard blue, underline on hover
- **Layout:** Single column, centered content

### List Styles
- **Bullet Lists:** Standard disc bullets
- **Link Lists:** No bullets (list-style: none)
- **Spacing:** 6-8px between list items
- **Indentation:** 0 for category lists

## 7. Site Sections (In Order)

1. **Header Section**
   - Dark blue background (#003d6b)
   - Contains logo (left) and "sign in" link (right)
   - Full width, fixed positioning possible
   - Height: ~50px

2. **Calculator Hero Section**
   - Light blue-gray background (#dbe3e8)
   - Contains scientific calculator (left ~60%) and search box (right ~40%)
   - Calculator with display, function buttons, number pad, operators
   - "Free Online Calculators" heading above search
   - Search input with blue search button
   - Full width container, centered content

3. **Category Grid Section**
   - White background
   - Four-column grid of calculator categories
   - Each tile contains:
     - Circular grayscale image (135px)
     - Category heading (green text)
     - List of calculator links
   - Categories: Financial, Fitness & Health, Math, Other
   - Equal width columns with spacing

4. **CTA Section**
   - White background
   - Centered "All Calculators" button/link
   - Green background button with SVG icon
   - Padding above and below

5. **Footer Section**
   - Light gray background
   - Two paragraphs of descriptive text
   - Navigation links (about us | sitemap | terms | privacy)
   - Copyright notice
   - Full width, centered content
   - Bottom of page
</high_level_design>

<theme>
light
</theme>

<sections>
<clone_section>
    <file_path>src/components/sections/header.tsx</file_path>
    <design_instructions>
Clone the top navigation header with dark blue background (#003d6b). Include white "Calculator.net" logo/text on the left (208x22px) using the calculator-white SVG, and "sign in" link aligned to the right. The header should have fixed positioning with full width, padding of 12px horizontal, and maintain consistent spacing. Logo should be clickable linking to home. Sign in text should be white with hover underline effect.
    </design_instructions>
    <assets>["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/198ec530-e0fb-461c-9f7a-9b251371b6fb-calculator-net/assets/svgs/calculator-white-1.svg"]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/calculator-hero.tsx</file_path>
    <design_instructions>
Clone the scientific calculator and search section with light gray/blue background (#dce4e8). Left side: Full-featured scientific calculator with dark blue display bar showing "0", input field above. Calculator includes trigonometric functions (sin, cos, tan with inverse variants), radio buttons for Deg/Rad toggle, power functions (xy, x³, x², ex, 10x), root functions (ʸ√x, ³√x, √x), logarithms (ln, log), parentheses, factorial, and percentage. Number pad section (0-9, decimal point) with operators (+, -, ×, /), memory functions (M+, M-, MR), and special buttons (Back, Ans, EXP, AC, =, RND, ±). Buttons should have subtle borders, light backgrounds with hover states. Right side: "Free Online Calculators" heading in dark text, search input field with blue "Search" button. Layout uses table/grid structure with proper spacing between sections.
    </design_instructions>
    <assets>[]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/calculator-categories.tsx</file_path>
    <design_instructions>
Clone the four-column calculator categories grid on white background. Each category tile includes: circular grayscale image (135x135px) at top, category heading in green text (#2d8e2d), and bulleted list of calculator links in blue (#0066cc). Categories from left to right: 1) Financial Calculators with coins/money image (15 links starting with Mortgage, Loan, Auto Loan), 2) Fitness & Health Calculators with exercise equipment image (9 links starting with BMI, Calorie, Body Fat), 3) Math Calculators with mathematical equations image (6 links starting with Scientific, Fraction, Percentage), 4) Other Calculators with hourglass image (10 links starting with Age, Date, Time). Maintain consistent spacing, hover effects on links with underlines. Below grid, center-aligned green button "All Calculators" with play icon and rounded corners.
    </design_instructions>
    <assets>["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/198ec530-e0fb-461c-9f7a-9b251371b6fb-calculator-net/assets/images/financial-calculator-1.jpg", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/198ec530-e0fb-461c-9f7a-9b251371b6fb-calculator-net/assets/images/fitness-calculator-2.jpg", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/198ec530-e0fb-461c-9f7a-9b251371b6fb-calculator-net/assets/images/math-calculator-3.jpg", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/198ec530-e0fb-461c-9f7a-9b251371b6fb-calculator-net/assets/images/other-calculator-4.jpg", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/198ec530-e0fb-461c-9f7a-9b251371b6fb-calculator-net/assets/svgs/all-calculators-2.svg"]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/footer.tsx</file_path>
    <design_instructions>
Clone the footer section with light gray background (#e8e8e8). Include two paragraphs of descriptive text in dark gray (#333) about Calculator.net's mission and calculator development (starting with "Calculator.net's sole focus is to provide fast, comprehensive..." and "We coded and developed each calculator individually..."). Text should be center-aligned with proper line spacing. Below text, add footer navigation links (about us, sitemap, terms of use, privacy policy) separated by pipe characters, followed by copyright "© 2008 - 2025 calculator.net". All links in blue (#0066cc) with hover underlines. Footer should have padding of 40px vertical and 20px horizontal, max-width container centered.
    </design_instructions>
    <assets>[]</assets>
  </clone_section>
</sections>
