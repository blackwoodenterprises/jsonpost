# Form Builder Feature

## Overview

The Form Builder is a comprehensive visual form creation tool that allows users to create, customize, and deploy dynamic multi-step or single-page forms without coding. It provides a complete form management solution with template gallery, field editors, theme customization, embedding options, and short link generation.

## Table of Contents

1. [Architecture & Location](#architecture--location)
2. [Form Builder Page](#form-builder-page)
3. [Form Templates](#form-templates)
4. [Field Types](#field-types)
5. [Theme System](#theme-system)
6. [Field Editor](#field-editor)
7. [Form Rendering](#form-rendering)
8. [Embedding Options](#embedding-options)
9. [Short Link Generation](#short-link-generation)
10. [Auto-save & Data Persistence](#auto-save--data-persistence)
11. [Code Generation](#code-generation)
12. [Form Generator Wizard](#form-generator-wizard)
13. [Data Flow](#data-flow)

---

## Architecture & Location

### Route
```
/dashboard/projects/[id]/endpoints/[endpointId]/form-builder
```

**File Location:**
```
/Users/adityasingh/Developer/jsonpost/src/app/dashboard/projects/[id]/endpoints/[endpointId]/form-builder/page.tsx
```

### Component Structure

```
src/
├── app/
│   └── dashboard/
│       └── projects/
│           └── [id]/
│               └── endpoints/
│                   └── [endpointId]/
│                       └── form-builder/
│                           └── page.tsx (Main Form Builder Page)
└── components/
    ├── form-generator/ (Form Generator Wizard)
    │   ├── form-generator-wizard.tsx
    │   ├── data/
    │   │   ├── form-templates.ts
    │   │   ├── themes.ts
    │   │   └── submission-methods.ts
    │   ├── steps/
    │   │   ├── template-selection.tsx
    │   │   ├── field-editor.tsx
    │   │   ├── theme-selection.tsx
    │   │   └── code-preview.tsx
    │   └── utils/
    │       └── form-renderer.ts
    └── dashboard/
        └── embed-modal.tsx
```

---

## Form Builder Page

### Main Features

1. **Welcome Step Configuration**
   - Form title and description
   - Logo upload (branding_logo)
   - Cover image upload (branding_cover)
   - Redirect URL (after form submission)
   - JSONPost branding toggle

2. **Form Steps Management**
   - Add, edit, remove, and reorder form steps
   - Each step represents one question/field
   - Support for 16 different field types
   - Real-time validation

3. **Template Gallery**
   - 14 pre-built form templates
   - Blank form option
   - Preview templates before loading

4. **Theme Selection**
   - 29 theme options
   - Visual theme selector
   - Real-time theme preview

5. **Production URLs**
   - Single-page form URL
   - Multi-step form URL
   - Copy and preview functionality

6. **Short Links**
   - Generate shareable short links
   - Customizable form type and theme
   - Manage existing short links

7. **Embedding**
   - Multiple embed types (modal, chatbox, drawer, button)
   - Customizable dimensions
   - Copy embed code

### Form Schema Structure

```typescript
interface FormSchema {
  title: string;
  description: string;
  submitEndpoint: string;
  steps: FormStep[];
  branding_logo?: string;
  branding_cover?: string;
  redirect_url?: string;
  jsonpost_branding?: boolean;
}

interface FormStep {
  id: string;
  type: string;
  title: string;
  content?: string;
  placeholder?: string;
  required: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    minDate?: string;
    maxDate?: string;
  };
  options?: Array<{ value: string; label: string }>;
  mask?: string;
  maxStars?: number;
  labels?: Record<string, string>;
  scale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
  acceptedTypes?: string[];
  maxSize?: string;
  multiple?: boolean;
  fields?: Record<string, { label: string; required: boolean }>;
}
```

---

## Form Templates

### Available Templates (14 Total)

Located in: `/Users/adityasingh/Developer/jsonpost/form_definitions/`

1. **Create a Blank Form** - Start with a simple welcome statement
2. **Demo Form Wizard** - Comprehensive demo showcasing all field types
3. **Customer Feedback** - Collect customer feedback and ratings
4. **Event Registration** - Register attendees for events
5. **Fitness Membership** - Gym and fitness membership application
6. **Healthcare Appointment** - Schedule medical appointments
7. **Job Application** - Employment application form
8. **Online Course Enrollment** - Enroll students in online courses
9. **Pet Adoption** - Pet adoption application form
10. **Product Launch Survey** - Gather feedback for product launches
11. **Real Estate Inquiry** - Property inquiry and contact form
12. **Restaurant Reservation** - Make restaurant reservations
13. **Travel Booking** - Book travel and accommodations
14. **Volunteer Application** - Apply for volunteer opportunities
15. **Wedding Planning** - Plan your perfect wedding

### Template Gallery Features

- Preview templates (single-page and multi-step views)
- Quick template loading
- Icon and description for each template
- Direct template application to form

---

## Field Types

### 16 Supported Field Types

| Type | Description | Special Properties |
|------|-------------|-------------------|
| `statement` | Display text only | `content` |
| `short_text` | Single line input | `placeholder`, validation |
| `long_text` | Multi-line textarea | `placeholder`, validation |
| `email` | Email input with validation | `placeholder`, pattern validation |
| `phone` | Phone number input | `mask` (e.g., "(999) 999-9999") |
| `website` | URL input with validation | `placeholder`, pattern validation |
| `number` | Numeric input | `min`, `max` validation |
| `single_select` | Radio buttons | `options` array |
| `multiple_select` | Checkboxes | `options` array |
| `dropdown` | Select dropdown | `options` array |
| `date` | Date picker | `minDate`, `maxDate` |
| `address` | Address fields (fixed structure) | Predefined `fields` object |
| `contact_info` | Contact form fields (fixed structure) | Predefined `fields` object |
| `star_rating` | Star rating input | `maxStars`, `labels` |
| `opinion_scale` | Scale rating | `scale` object (min, max, labels) |
| `file_upload` | File upload input | `acceptedTypes`, `maxSize`, `multiple` |

### Field Editor Capabilities

**For All Fields:**
- Edit title and ID
- Toggle required status
- Set placeholder text
- Configure validation rules

**Type-Specific Options:**

**Statement:**
- Edit content text

**Phone:**
- Input mask configuration

**Select/Radio/Checkbox:**
- Add/remove options
- Edit option values and labels

**Star Rating:**
- Set maximum stars (1-10)
- Configure labels for each star level

**Opinion Scale:**
- Set min/max values
- Configure min/max labels

**File Upload:**
- Accepted file types
- Maximum file size
- Single/multiple files

**Address/Contact Info:**
- Fixed field structures (non-editable)
- Display information about included fields

---

## Theme System

### Available Themes (29 Total)

Located in: `/Users/adityasingh/Developer/jsonpost/src/lib/themes.json`

**Categories:**

**Light Themes:**
1. Light - Clean and bright
2. Cupcake - Sweet and playful
3. Bumblebee - Bright and energetic
4. Emerald - Fresh and natural
5. Corporate - Professional and clean
6. Retro - Vintage vibes
7. Valentine - Romantic and warm
8. Garden - Natural and serene
9. Lofi - Calm and minimal
10. Pastel - Soft and gentle
11. Fantasy - Magical and dreamy
12. Wireframe - Minimal and structured
13. Luxury - Elegant and premium
14. CMYK - Print-inspired colors
15. Autumn - Warm and cozy
16. Business - Professional and trustworthy
17. Lemonade - Fresh and zesty
18. Winter - Cool and crisp

**Dark Themes:**
1. Dark - Sleek and modern
2. Synthwave - Retro futuristic
3. Cyberpunk - Neon and electric
4. Halloween - Spooky and fun
5. Forest - Deep and mysterious
6. Aqua - Cool and refreshing
7. Black - Bold and dramatic
8. Dracula - Dark and mysterious
9. Acid - Vibrant and electric
10. Night - Deep and calming
11. Coffee - Rich and warm

### Theme Structure

Each theme includes:
- ID (unique identifier)
- Name (display name)
- Description
- Color palette (3 colors)

**Example:**
```json
{
  "id": "corporate",
  "name": "Corporate",
  "description": "Professional and clean",
  "colors": ["#f8fafc", "#3b82f6", "#1e293b"]
}
```

### Form Generator Themes

The Form Generator Wizard has its own theme system with 6 themes:

1. **Minimal White** - Clean white background with subtle borders
2. **Modern Gray** - Contemporary gray theme with rounded corners
3. **Elegant Blue** - Professional blue accent theme
4. **Soft Green** - Nature-inspired green theme
5. **Dark Mode** - Sleek dark theme for modern interfaces
6. **Warm Orange** - Friendly orange accent theme

Each includes full CSS styling for:
- Container
- Form content
- Field groups
- Labels
- Input elements
- Textareas
- Select dropdowns
- Buttons
- Checkboxes and radios
- Dark mode support

---

## Field Editor

### Features

1. **Visual Field Management**
   - Add new fields
   - Edit existing fields
   - Delete fields
   - Reorder fields (up/down)

2. **Field Configuration Dialog**
   - Title and ID editor
   - Type selector
   - Placeholder configuration
   - Required toggle
   - Validation rules
   - Type-specific options

3. **Unique ID Generation**
   - Auto-generates slug from title
   - Ensures unique IDs across all steps
   - Validates ID format (lowercase, alphanumeric, hyphens, underscores only)

4. **Validation**
   - Client-side validation
   - Duplicate ID detection
   - Invalid character detection
   - Required field validation

---

## Form Rendering

### Form Renderer Utility

Located in: `/Users/adityasingh/Developer/jsonpost/src/components/form-generator/utils/form-renderer.ts`

**Key Functions:**

1. **`generateFormHTML()`** - Generates form HTML with optional CSS and JavaScript
2. **`generateCompleteHTML()`** - Generates complete HTML document for preview

### HTML Generation Features

- Dynamic field rendering based on type
- Theme-based styling
- Submission method integration
- Validation attributes
- Required field indicators
- Option rendering for select/radio/checkbox
- Complete HTML document generation

---

## Embedding Options

### Embed Modal Component

Located in: `/Users/adityasingh/Developer/jsonpost/src/components/dashboard/embed-modal.tsx`

### Embed Types

1. **Modal Popup**
   - Opens form in modal overlay
   - Captures attention without leaving page
   - Configurable dimensions

2. **Floating Chatbox**
   - Floating chat icon in corner
   - Opens form in popover
   - Customizable position and colors

3. **Side Drawer**
   - Slides in from side of screen
   - Ideal for detailed forms
   - Configurable side (left/right)

4. **Button Trigger**
   - Attach to existing button
   - Opens as modal on click
   - Custom button selector

---

## Short Link Generation

### Features

1. **Generate Short Links**
   - Random 10-character code generation
   - Form type selection (single-page or multi-step)
   - Theme customization
   - Stores in Supabase `short_links` table

2. **Manage Existing Links**
   - View all short links for endpoint
   - Copy short link URL
   - Open in new tab
   - Delete short links

### Short Link Structure

```typescript
interface ShortLink {
  id: string;
  short_code: string;
  endpoint_id: string;
  form_type: 'single-page' | 'multi-step';
  theme: string;
  created_at: string | null;
  updated_at: string | null;
}
```

### Short Link URL Format

```
https://forms.jsonpost.com/s/{short_code}
```

---

## Auto-save & Data Persistence

### Auto-save Features

1. **LocalStorage Auto-save**
   - Saves form state to localStorage on changes
   - 24-hour expiration
   - Tracks last save timestamp

2. **Auto-restore**
   - Restores unsaved changes on page load
   - Shows toast notification
   - Only restores if newer than last database save

3. **Browser Event Handlers**
   - `beforeunload` - Warns user about unsaved changes
   - `visibilitychange` - Auto-saves when tab becomes hidden

4. **Unsaved Changes Tracking**
   - Visual indicator (Save button turns red)
   - Prevents accidental data loss
   - Clears on successful save

---

## Code Generation

### Submission Methods

Located in: `/Users/adityasingh/Developer/jsonpost/src/components/form-generator/data/submission-methods.ts`

### 3 Submission Methods

1. **HTTP POST** - Standard HTML form submission
2. **AJAX** - Asynchronous JavaScript submission with fetch API
3. **jQuery** - jQuery-based form submission with AJAX

### Features of Generated Code

**All Methods Include:**
- Form validation
- Required field checking
- Error handling
- Success feedback
- Loading states

**AJAX & jQuery Methods Include:**
- Visual feedback (success/error messages)
- Button state management
- Timeout handling
- Network error detection
- Automatic form reset on success
- Enhanced error messages

---

## Form Generator Wizard

### Overview

The Form Generator Wizard is a separate tool for creating embeddable HTML forms with a 4-step wizard interface.

Located in: `/Users/adityasingh/Developer/jsonpost/src/components/form-generator/`

### Wizard Steps

1. **Template Selection**
   - Choose from 15 pre-built templates
   - Search functionality
   - Field count and required field indicators
   - Template preview

2. **Field Editor**
   - Add, edit, remove, and reorder fields
   - Endpoint URL configuration
   - Submission method selection (HTTP POST, AJAX, jQuery)
   - "What are Endpoints?" educational section

3. **Theme Selection**
   - 6 theme options with CSS styling
   - Live preview with actual form fields
   - Theme comparison

4. **Code Preview**
   - Form summary (field count, theme, method, required fields)
   - Three output tabs:
     - Live Preview (iframe)
     - HTML Fragment (embeddable code)
     - Complete Code (standalone HTML file)
   - Copy to clipboard
   - Download HTML file
   - Open preview in new window

---

## Data Flow

### Form Builder Page Flow

```
User Opens Form Builder
        ↓
Load Endpoint Data from Supabase
        ↓
Check for Auto-saved Data
        ↓
Restore Auto-save OR Load from Database
        ↓
User Makes Changes
        ↓
Auto-save to LocalStorage
        ↓
User Clicks Save
        ↓
Validate Form Schema
        ↓
Save to Supabase endpoints table
        ↓
Clear Auto-save Data
        ↓
Generate Production URLs
```

### Form Submission Flow (Generated Forms)

```
User Fills Form
        ↓
User Clicks Submit
        ↓
Client-side Validation
        ↓
Submission Method Executes
        ↓
POST to Endpoint URL
        ↓
Server Processes Submission
        ↓
Response Returned
        ↓
Display Success/Error Feedback
        ↓
Optional: Redirect to redirect_url
```

---

## Key Features Summary

### Form Builder Page

✅ 14 Pre-built Templates
✅ 16 Field Types
✅ 29 Themes
✅ Visual Field Editor
✅ Drag-and-drop Field Reordering
✅ Auto-save to LocalStorage
✅ Browser Tab/Close Protection
✅ Single-page and Multi-step Forms
✅ Short Link Generation
✅ 4 Embed Types
✅ Logo and Cover Image Upload
✅ Custom Redirect URL
✅ JSONPost Branding Toggle
✅ Production URL Generation
✅ Real-time Preview

### Form Generator Wizard

✅ 4-Step Wizard Interface
✅ 15 Templates
✅ 12 Field Types
✅ 6 Themes with Full CSS
✅ 3 Submission Methods
✅ Live Preview
✅ HTML Fragment Export
✅ Complete HTML File Export
✅ Copy to Clipboard
✅ Download HTML

---

## Technical Notes

### Image Upload

Images are uploaded to:
```
/api/upload/image
```

POST with FormData:
- file: File
- endpointId: string
- imageType: 'logo' | 'cover'

Returns:
```json
{ "url": "https://..." }
```

### Database Schema

**endpoints table fields:**
- id
- project_id
- name
- description
- path
- form_json (JSONB)
- theme_id
- branding_logo
- branding_cover
- redirect_url
- jsonpost_branding

**short_links table fields:**
- id
- endpoint_id
- short_code
- form_type ('single-page' | 'multi-step')
- theme
- created_at
- updated_at

### URL Patterns

**Single-page form:**
```
https://forms.jsonpost.com/single-page/{endpoint_id}/{theme_id}
```

**Multi-step form:**
```
https://forms.jsonpost.com/multi-page/{endpoint_id}/{theme_id}
```

**Short link:**
```
https://forms.jsonpost.com/s/{short_code}
```

**Submission endpoint:**
```
{origin}/api/submit/{project_id}/{endpoint_path}
```

---

## Best Practices

### Form Design
1. Use statement steps for instructions and context
2. Group related fields together
3. Mark required fields clearly
4. Provide helpful placeholder text
5. Use appropriate field types for data validation

### Theme Selection
1. Match theme to brand identity
2. Consider target audience
3. Test theme on different devices
4. Ensure text readability

### Validation
1. Set appropriate min/max values
2. Use regex patterns for specific formats
3. Provide clear validation error messages
4. Test validation thoroughly

### Performance
1. Limit number of fields per page
2. Use multi-step for long forms
3. Optimize images (logo/cover)
4. Test on slow connections

### Accessibility
1. Use descriptive field labels
2. Mark required fields
3. Provide error messages
4. Test with screen readers
