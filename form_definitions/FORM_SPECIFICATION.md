# Form Wizard JSON Specification

This document describes the JSON specification for creating multi-step form wizards in the Form Wizard application.

## Root Structure

```json
{
  "title": "Form Title",
  "description": "Form description (optional)",
  "submitEndpoint": "https://api.example.com/submit",
  "steps": [...]
}
```

### Root Properties

- **title** (string, required): The main title of the form
- **description** (string, optional): A brief description of the form
- **submitEndpoint** (string, required): The API endpoint where form data will be submitted
- **steps** (array, required): Array of form step objects

## Step Structure

Each step in the `steps` array represents a single screen in the form wizard:

```json
{
  "id": "unique_step_id",
  "type": "field_type",
  "title": "Question or field title",
  "required": true,
  ...additional_properties
}
```

### Common Step Properties

- **id** (string, required): Unique identifier for the step
- **type** (string, required): The type of form field (see Field Types below)
- **title** (string, required): The question or label displayed to the user
- **required** (boolean, optional): Whether the field is required (default: false)

## Field Types

### 1. Statement
Display-only text for welcome messages, instructions, or thank you pages.

```json
{
  "id": "welcome",
  "type": "statement",
  "title": "Welcome!",
  "content": "Welcome to our form. Let's get started!",
  "required": false
}
```

**Properties:**
- **content** (string, required): The text content to display

### 2. Short Text
Single-line text input for names, titles, etc.

```json
{
  "id": "name",
  "type": "short_text",
  "title": "What's your name?",
  "placeholder": "Enter your name",
  "required": true,
  "validation": {
    "minLength": 2,
    "maxLength": 100
  }
}
```

**Properties:**
- **placeholder** (string, optional): Placeholder text
- **validation** (object, optional): Validation rules
  - **minLength** (number): Minimum character length
  - **maxLength** (number): Maximum character length

### 3. Long Text
Multi-line textarea for longer responses.

```json
{
  "id": "bio",
  "type": "long_text",
  "title": "Tell us about yourself",
  "placeholder": "Write your bio...",
  "required": false,
  "validation": {
    "maxLength": 500
  }
}
```

**Properties:**
- **placeholder** (string, optional): Placeholder text
- **validation** (object, optional): Validation rules
  - **maxLength** (number): Maximum character length

### 4. Email
Email input with built-in validation.

```json
{
  "id": "email",
  "type": "email",
  "title": "What's your email?",
  "placeholder": "your.email@example.com",
  "required": true,
  "validation": {
    "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
  }
}
```

**Properties:**
- **placeholder** (string, optional): Placeholder text
- **validation** (object, optional): Validation rules
  - **pattern** (string): Custom regex pattern

### 5. Phone
Phone number input.

```json
{
  "id": "phone",
  "type": "phone",
  "title": "What's your phone number?",
  "placeholder": "+1 (555) 123-4567",
  "required": true
}
```

**Properties:**
- **placeholder** (string, optional): Placeholder text

### 6. Website
URL input for websites.

```json
{
  "id": "website",
  "type": "website",
  "title": "Your website URL",
  "placeholder": "https://yoursite.com",
  "required": false,
  "validation": {
    "pattern": "^https?:\\/\\/.+"
  }
}
```

**Properties:**
- **placeholder** (string, optional): Placeholder text
- **validation** (object, optional): Validation rules
  - **pattern** (string): Custom regex pattern

### 7. Number
Numeric input with validation.

```json
{
  "id": "age",
  "type": "number",
  "title": "How old are you?",
  "placeholder": "Enter your age",
  "required": true,
  "validation": {
    "min": 13,
    "max": 120
  }
}
```

**Properties:**
- **placeholder** (string, optional): Placeholder text
- **validation** (object, optional): Validation rules
  - **min** (number): Minimum value
  - **max** (number): Maximum value

### 8. Single Select
Radio button selection (choose one option).

```json
{
  "id": "experience",
  "type": "single_select",
  "title": "Your experience level?",
  "required": true,
  "options": [
    { "value": "beginner", "label": "Beginner" },
    { "value": "intermediate", "label": "Intermediate" },
    { "value": "advanced", "label": "Advanced" }
  ]
}
```

**Properties:**
- **options** (array, required): Array of option objects
  - **value** (string): The value to be submitted
  - **label** (string): Display text for the option

### 9. Multiple Select
Checkbox selection (choose multiple options).

```json
{
  "id": "skills",
  "type": "multiple_select",
  "title": "What skills do you have?",
  "required": false,
  "options": [
    { "value": "javascript", "label": "JavaScript" },
    { "value": "python", "label": "Python" },
    { "value": "react", "label": "React" }
  ]
}
```

**Properties:**
- **options** (array, required): Array of option objects (same as single_select)

### 10. Dropdown
Dropdown/select menu.

```json
{
  "id": "country",
  "type": "dropdown",
  "title": "Which country?",
  "required": true,
  "options": [
    { "value": "us", "label": "United States" },
    { "value": "ca", "label": "Canada" },
    { "value": "uk", "label": "United Kingdom" }
  ]
}
```

**Properties:**
- **options** (array, required): Array of option objects (same as single_select)

### 11. Date
Date picker input.

```json
{
  "id": "birthdate",
  "type": "date",
  "title": "When is your birthday?",
  "required": false,
  "validation": {
    "minDate": "1900-01-01",
    "maxDate": "today"
  }
}
```

**Properties:**
- **validation** (object, optional): Validation rules
  - **minDate** (string): Minimum date (YYYY-MM-DD or "today")
  - **maxDate** (string): Maximum date (YYYY-MM-DD or "today")

### 12. Address
Multi-field address input.

```json
{
  "id": "address",
  "type": "address",
  "title": "What's your address?",
  "required": false,
  "fields": {
    "street": { "label": "Street Address", "required": true },
    "city": { "label": "City", "required": true },
    "state": { "label": "State/Province", "required": true },
    "zip": { "label": "ZIP/Postal Code", "required": true },
    "country": { "label": "Country", "required": true }
  }
}
```

**Properties:**
- **fields** (object, required): Configuration for address fields
  - Each field can have **label** (string) and **required** (boolean)

### 13. Contact Info
Multi-field contact information.

```json
{
  "id": "contact",
  "type": "contact_info",
  "title": "Your contact information",
  "required": true,
  "fields": {
    "firstName": { "label": "First Name", "required": true },
    "lastName": { "label": "Last Name", "required": true },
    "email": { "label": "Email", "required": true },
    "phone": { "label": "Phone", "required": true },
    "address": { "label": "Address", "required": false }
  }
}
```

**Properties:**
- **fields** (object, required): Configuration for contact fields
  - Each field can have **label** (string) and **required** (boolean)
  - **firstName**, **lastName**, **email**, and **phone** are mandatory fields that must be included and set as required
  - Additional fields like **address** can be added as optional

### 14. Star Rating
Star-based rating system.

```json
{
  "id": "rating",
  "type": "star_rating",
  "title": "Rate our service",
  "required": false,
  "maxStars": 5,
  "labels": {
    "1": "Poor",
    "2": "Fair",
    "3": "Good",
    "4": "Very Good",
    "5": "Excellent"
  }
}
```

**Properties:**
- **maxStars** (number, optional): Maximum number of stars (default: 5)
- **labels** (object, optional): Labels for each star rating

### 15. Opinion Scale
Numeric scale rating.

```json
{
  "id": "satisfaction",
  "type": "opinion_scale",
  "title": "How satisfied are you?",
  "required": false,
  "scale": {
    "min": 1,
    "max": 10,
    "minLabel": "Not satisfied",
    "maxLabel": "Very satisfied"
  }
}
```

**Properties:**
- **scale** (object, required): Scale configuration
  - **min** (number): Minimum scale value
  - **max** (number): Maximum scale value
  - **minLabel** (string): Label for minimum value
  - **maxLabel** (string): Label for maximum value

### 16. File Upload
File upload input.

```json
{
  "id": "resume",
  "type": "file_upload",
  "title": "Upload your resume",
  "required": false,
  "acceptedTypes": [".pdf", ".doc", ".docx"],
  "maxSize": "5MB",
  "multiple": false
}
```

**Properties:**
- **acceptedTypes** (array, optional): Allowed file extensions
- **maxSize** (string, optional): Maximum file size (e.g., "5MB", "1GB")
- **multiple** (boolean, optional): Allow multiple file uploads (default: false)

## Form Submission

When the form is completed, all field values are collected and submitted to the `submitEndpoint` as a JSON object. The keys correspond to the step `id` values, and the values are the user's responses.

Example submission data:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "experience": "intermediate",
  "skills": ["javascript", "react"],
  "rating": 4
}
```

## Best Practices

1. **Step IDs**: Use descriptive, unique IDs for each step
2. **Required Fields**: Mark essential fields as required
3. **Validation**: Add appropriate validation rules for data quality
4. **User Experience**: Use clear, concise titles and helpful placeholder text
5. **Progressive Disclosure**: Order steps logically from simple to complex
6. **Statements**: Use statement steps for welcome messages and instructions