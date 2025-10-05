# JSONPost Color Palette Documentation

This document outlines all colors used in the JSONPost application theme and design upgrade. The primary theme has been updated to use **Emerald Green** as the main brand color.

## Primary Brand Colors

### Emerald (Primary Brand Color)
- `emerald-50` - Very light emerald background
- `emerald-100` - Light emerald background for subtle highlights
- `emerald-200` - Light emerald for borders and accents
- `emerald-400` - Medium emerald for dark mode text
- `emerald-600` - **Primary emerald** - Main brand color for buttons and CTAs
- `emerald-700` - **Hover emerald** - Darker shade for hover states
- `emerald-950` - Very dark emerald for dark mode backgrounds

### Teal (Complementary)
- `teal-600` - Used in gradient combinations with emerald

### Green (Supporting)
- `green-100` - Light green backgrounds
- `green-600` - Medium green for gradients
- `green-700` - Darker green for gradients
- `green-800` - Dark green text
- `green-900` - Very dark green backgrounds

## Neutral Colors (Slate)

### Light Mode
- `slate-50` - Very light background
- `slate-100` - Light background sections
- `slate-200` - Light borders and dividers
- `slate-300` - Medium light borders
- `slate-400` - Medium neutral elements
- `slate-600` - Medium text color
- `slate-700` - Dark text
- `slate-800` - Very dark text
- `slate-900` - Primary dark text and backgrounds

### Dark Mode
- `slate-200` - Light text in dark mode
- `slate-300` - Medium light text in dark mode
- `slate-400` - Medium text in dark mode
- `slate-600` - Medium dark elements
- `slate-700` - Dark borders in dark mode
- `slate-800` - Dark backgrounds
- `slate-900` - Medium dark backgrounds
- `slate-950` - Very dark backgrounds

## Legacy/Accent Colors (Still in Use)

### Blue
- `blue-50` - Light blue backgrounds
- `blue-100` - Light blue highlights
- `blue-200` - Light blue borders
- `blue-400` - Medium blue for dark mode
- `blue-500` - Medium blue accents
- `blue-600` - Primary blue (legacy)
- `blue-700` - Dark blue borders
- `blue-800` - Dark blue text
- `blue-900` - Very dark blue backgrounds
- `blue-950` - Very dark blue for dark mode

### Purple
- `purple-100` - Light purple backgrounds
- `purple-200` - Light purple borders
- `purple-400` - Medium purple for dark mode
- `purple-600` - Primary purple accents
- `purple-700` - Dark purple borders
- `purple-800` - Dark purple text
- `purple-900` - Very dark purple backgrounds

### Indigo
- `indigo-100` - Light indigo backgrounds
- `indigo-200` - Light indigo borders
- `indigo-400` - Medium indigo for dark mode
- `indigo-600` - Primary indigo accents
- `indigo-700` - Dark indigo borders
- `indigo-950` - Very dark indigo for dark mode

### Cyan
- `cyan-100` - Light cyan backgrounds
- `cyan-200` - Light cyan borders
- `cyan-400` - Medium cyan for dark mode
- `cyan-600` - Primary cyan accents
- `cyan-700` - Dark cyan borders
- `cyan-950` - Very dark cyan for dark mode

### Sky
- `sky-100` - Light sky blue backgrounds
- `sky-950` - Very dark sky blue for dark mode

### Pink
- `pink-600` - Primary pink accents (used in gradients)
- `pink-700` - Dark pink for hover states

## Common Color Patterns

### Primary Buttons
```css
bg-emerald-600 hover:bg-emerald-700 text-white
```

### Secondary/Outline Buttons
```css
border-2 border-white text-white hover:bg-white hover:text-emerald-700 hover:border-white
```

### Card Hover Effects
```css
border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700
```

### Gradient Backgrounds
```css
/* Primary hero gradients */
bg-gradient-to-br from-emerald-600 to-teal-600

/* Light section gradients */
bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 to-green-950

/* Text gradients */
bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-800 dark:from-white dark:via-emerald-400 dark:to-slate-200 bg-clip-text text-transparent
```

## Usage Guidelines

### Primary Actions
- Use `emerald-600` for primary buttons and CTAs
- Use `emerald-700` for hover states
- Always pair with white text for accessibility

### Backgrounds
- Use `slate-50` to `slate-100` for light mode sections
- Use `slate-900` to `slate-950` for dark mode sections
- Use emerald gradients for hero sections and highlights

### Text
- Use `slate-900` for primary text in light mode
- Use `white` or `slate-200` for primary text in dark mode
- Use `slate-600` to `slate-700` for secondary text in light mode
- Use `slate-300` to `slate-400` for secondary text in dark mode

### Borders
- Use `slate-200` for light mode borders
- Use `slate-800` for dark mode borders
- Use `emerald-300` for hover borders in light mode
- Use `emerald-700` for hover borders in dark mode

## Migration Notes

The theme upgrade primarily replaced:
- Blue primary colors (`blue-600`, `blue-700`) → Emerald (`emerald-600`, `emerald-700`)
- Blue/purple gradients → Emerald/teal gradients
- Blue hero backgrounds → Emerald hero backgrounds

Legacy blue, purple, indigo, and cyan colors are still used for:
- Feature icons and accents
- Form validation states
- Dashboard components
- Pricing cards and badges
- Loading states and progress indicators

## Accessibility

All color combinations have been tested for WCAG AA compliance:
- Primary emerald buttons maintain 4.5:1 contrast ratio with white text
- Text colors maintain proper contrast ratios with their backgrounds
- Hover states provide sufficient visual feedback
- Dark mode variants ensure readability in low-light conditions