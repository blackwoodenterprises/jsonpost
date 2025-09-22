export interface FormTheme {
  id: string;
  name: string;
  description: string;
  preview: string;
  styles: {
    container: string;
    form: string;
    fieldGroup: string;
    label: string;
    input: string;
    textarea: string;
    select: string;
    button: string;
    checkbox: string;
    radio: string;
  };
  css: string; // Raw CSS for the theme
}

export const FORM_THEMES: FormTheme[] = [
  {
    id: 'minimal-white',
    name: 'Minimal White',
    description: 'Clean white background with subtle borders',
    preview: '🤍',
    styles: {
      container: 'jsonpost-form-container',
      form: 'jsonpost-form-content',
      fieldGroup: 'jsonpost-field-group',
      label: 'jsonpost-field-label',
      input: 'jsonpost-field-input',
      textarea: 'jsonpost-field-textarea',
      select: 'jsonpost-field-select',
      button: 'jsonpost-submit-button',
      checkbox: 'jsonpost-field-checkbox',
      radio: 'jsonpost-field-radio'
    },
    css: `
.jsonpost-form-container {
  max-width: 28rem;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

@media (prefers-color-scheme: dark) {
  .jsonpost-form-container {
    background-color: #1f2937;
    border-color: #374151;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
}

.jsonpost-form-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.jsonpost-field-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.jsonpost-field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

@media (prefers-color-scheme: dark) {
  .jsonpost-field-label {
    color: #e5e7eb;
  }
}

.jsonpost-field-input, .jsonpost-field-textarea, .jsonpost-field-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  box-sizing: border-box;
}

@media (prefers-color-scheme: dark) {
  .jsonpost-field-input, .jsonpost-field-textarea, .jsonpost-field-select {
    background-color: #374151;
    border-color: #4b5563;
    color: #ffffff;
  }
  
  .jsonpost-field-input::placeholder, .jsonpost-field-textarea::placeholder {
    color: #9ca3af;
  }
}

.jsonpost-field-input:focus, .jsonpost-field-textarea:focus, .jsonpost-field-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.jsonpost-field-textarea {
  resize: vertical;
  min-height: 80px;
}

.jsonpost-submit-button {
  width: 100%;
  background-color: #2563eb;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.jsonpost-submit-button:hover {
  background-color: #1d4ed8;
}

.jsonpost-field-checkbox, .jsonpost-field-radio {
  width: 1rem;
  height: 1rem;
  color: #2563eb;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

@media (prefers-color-scheme: dark) {
  .jsonpost-field-checkbox, .jsonpost-field-radio {
    background-color: #374151;
    border-color: #4b5563;
    color: #ffffff;
  }
}
    `
  },
  {
    id: 'modern-gray',
    name: 'Modern Gray',
    description: 'Contemporary gray theme with rounded corners',
    preview: '🔘',
    styles: {
      container: 'jsonpost-form-container',
      form: 'jsonpost-form-content',
      fieldGroup: 'jsonpost-field-group',
      label: 'jsonpost-field-label',
      input: 'jsonpost-field-input',
      textarea: 'jsonpost-field-textarea',
      select: 'jsonpost-field-select',
      button: 'jsonpost-submit-button',
      checkbox: 'jsonpost-field-checkbox',
      radio: 'jsonpost-field-radio'
    },
    css: `
.jsonpost-form-container {
  max-width: 28rem;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #f9fafb;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

@media (prefers-color-scheme: dark) {
  .jsonpost-form-container {
    background-color: #111827;
    border-color: #374151;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
}

.jsonpost-form-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.jsonpost-field-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.jsonpost-field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

@media (prefers-color-scheme: dark) {
  .jsonpost-field-label {
    color: #e5e7eb;
  }
}

.jsonpost-field-input, .jsonpost-field-textarea, .jsonpost-field-select {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  box-sizing: border-box;
}

@media (prefers-color-scheme: dark) {
  .jsonpost-field-input, .jsonpost-field-textarea, .jsonpost-field-select {
    background-color: #1f2937;
    border-color: #4b5563;
    color: #ffffff;
  }
  
  .jsonpost-field-input::placeholder, .jsonpost-field-textarea::placeholder {
    color: #9ca3af;
  }
}

.jsonpost-field-input:focus, .jsonpost-field-textarea:focus, .jsonpost-field-select:focus {
  outline: none;
  border-color: #6b7280;
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.1);
}

.jsonpost-field-textarea {
  resize: vertical;
  min-height: 80px;
}

.jsonpost-submit-button {
  width: 100%;
  background-color: #1f2937;
  color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.jsonpost-submit-button:hover {
  background-color: #111827;
}

.jsonpost-field-checkbox, .jsonpost-field-radio {
  width: 1rem;
  height: 1rem;
  color: #6b7280;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

@media (prefers-color-scheme: dark) {
  .jsonpost-field-checkbox, .jsonpost-field-radio {
    background-color: #1f2937;
    border-color: #4b5563;
    color: #ffffff;
  }
}
    `
  },
  {
    id: 'elegant-blue',
    name: 'Elegant Blue',
    description: 'Professional blue accent theme',
    preview: '💙',
    styles: {
      container: 'jsonpost-form-container',
      form: 'jsonpost-form-content',
      fieldGroup: 'jsonpost-field-group',
      label: 'jsonpost-field-label',
      input: 'jsonpost-field-input',
      textarea: 'jsonpost-field-textarea',
      select: 'jsonpost-field-select',
      button: 'jsonpost-submit-button',
      checkbox: 'jsonpost-field-checkbox',
      radio: 'jsonpost-field-radio'
    },
    css: `
.jsonpost-form-container {
  max-width: 28rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3b82f6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.jsonpost-form-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.jsonpost-field-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.jsonpost-field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e3a8a;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.jsonpost-field-input, .jsonpost-field-textarea, .jsonpost-field-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #dbeafe;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  transition: all 0.15s ease-in-out;
  box-sizing: border-box;
}

.jsonpost-field-input:focus, .jsonpost-field-textarea:focus, .jsonpost-field-select:focus {
  outline: none;
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.1);
}

.jsonpost-field-textarea {
  resize: vertical;
  min-height: 80px;
}

.jsonpost-submit-button {
  width: 100%;
  background: linear-gradient(to right, #3b82f6, #2563eb);
  color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.jsonpost-submit-button:hover {
  background: linear-gradient(to right, #2563eb, #1d4ed8);
}

.jsonpost-field-checkbox, .jsonpost-field-radio {
  width: 1.25rem;
  height: 1.25rem;
  color: #2563eb;
  border: 1px solid #93c5fd;
  border-radius: 0.25rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

@media (prefers-color-scheme: dark) {
  .jsonpost-form-container {
    background-color: #1f2937;
    border-color: #374151;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  
  .jsonpost-field-label {
    color: #e5e7eb;
  }
  
  .jsonpost-field-input, .jsonpost-field-textarea, .jsonpost-field-select {
    background-color: #374151;
    border-color: #4b5563;
    color: #ffffff;
  }
  
  .jsonpost-field-input::placeholder, .jsonpost-field-textarea::placeholder {
    color: #9ca3af;
  }
  
  .jsonpost-field-checkbox, .jsonpost-field-radio {
    background-color: #374151;
    border-color: #4b5563;
    color: #ffffff;
  }
}
    `
  },
  {
    id: 'soft-green',
    name: 'Soft Green',
    description: 'Nature-inspired green theme',
    preview: '💚',
    styles: {
      container: 'jsonpost-form-container',
      form: 'jsonpost-form-content',
      fieldGroup: 'jsonpost-field-group',
      label: 'jsonpost-field-label',
      input: 'jsonpost-field-input',
      textarea: 'jsonpost-field-textarea',
      select: 'jsonpost-field-select',
      button: 'jsonpost-submit-button',
      checkbox: 'jsonpost-field-checkbox',
      radio: 'jsonpost-field-radio'
    },
    css: `
.jsonpost-form-container {
  max-width: 28rem;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #f0fdf4;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #bbf7d0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.jsonpost-form-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.jsonpost-field-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.jsonpost-field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #166534;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.jsonpost-field-input, .jsonpost-field-textarea, .jsonpost-field-select {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #ffffff;
  border: 1px solid #bbf7d0;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  box-sizing: border-box;
}

.jsonpost-field-input:focus, .jsonpost-field-textarea:focus, .jsonpost-field-select:focus {
  outline: none;
  border-color: #4ade80;
  box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
}

.jsonpost-field-textarea {
  resize: vertical;
  min-height: 80px;
}

.jsonpost-submit-button {
  width: 100%;
  background-color: #16a34a;
  color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.jsonpost-submit-button:hover {
  background-color: #15803d;
}

.jsonpost-field-checkbox, .jsonpost-field-radio {
  width: 1rem;
  height: 1rem;
  color: #16a34a;
  border: 1px solid #bbf7d0;
  border-radius: 0.25rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

@media (prefers-color-scheme: dark) {
  .jsonpost-form-container {
    background-color: #1f2937;
    border-color: #374151;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  
  .jsonpost-field-label {
    color: #e5e7eb;
  }
  
  .jsonpost-field-input, .jsonpost-field-textarea, .jsonpost-field-select {
    background-color: #374151;
    border-color: #4b5563;
    color: #ffffff;
  }
  
  .jsonpost-field-input::placeholder, .jsonpost-field-textarea::placeholder {
    color: #9ca3af;
  }
  
  .jsonpost-field-checkbox, .jsonpost-field-radio {
    background-color: #374151;
    border-color: #4b5563;
    color: #ffffff;
  }
}
    `
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    description: 'Sleek dark theme for modern interfaces',
    preview: '🌙',
    styles: {
      container: 'jsonpost-form-container',
      form: 'jsonpost-form-content',
      fieldGroup: 'jsonpost-field-group',
      label: 'jsonpost-field-label',
      input: 'jsonpost-field-input',
      textarea: 'jsonpost-field-textarea',
      select: 'jsonpost-field-select',
      button: 'jsonpost-submit-button',
      checkbox: 'jsonpost-field-checkbox',
      radio: 'jsonpost-field-radio'
    },
    css: `
.jsonpost-form-container {
  max-width: 28rem;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #111827;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid #374151;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.jsonpost-form-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.jsonpost-field-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.jsonpost-field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #e5e7eb;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.jsonpost-field-input, .jsonpost-field-textarea, .jsonpost-field-select {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #1f2937;
  border: 1px solid #4b5563;
  border-radius: 0.5rem;
  color: #ffffff;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  box-sizing: border-box;
}

.jsonpost-field-input::placeholder, .jsonpost-field-textarea::placeholder {
  color: #9ca3af;
}

.jsonpost-field-input:focus, .jsonpost-field-textarea:focus, .jsonpost-field-select:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.jsonpost-field-textarea {
  resize: vertical;
  min-height: 80px;
}

.jsonpost-submit-button {
  width: 100%;
  background-color: #8b5cf6;
  color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.jsonpost-submit-button:hover {
  background-color: #7c3aed;
}

.jsonpost-field-checkbox, .jsonpost-field-radio {
  width: 1rem;
  height: 1rem;
  color: #8b5cf6;
  border: 1px solid #4b5563;
  border-radius: 0.25rem;
  background-color: #1f2937;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
    `
  },
  {
    id: 'warm-orange',
    name: 'Warm Orange',
    description: 'Friendly orange accent theme',
    preview: '🧡',
    styles: {
      container: 'jsonpost-form-container',
      form: 'jsonpost-form-content',
      fieldGroup: 'jsonpost-field-group',
      label: 'jsonpost-field-label',
      input: 'jsonpost-field-input',
      textarea: 'jsonpost-field-textarea',
      select: 'jsonpost-field-select',
      button: 'jsonpost-submit-button',
      checkbox: 'jsonpost-field-checkbox',
      radio: 'jsonpost-field-radio'
    },
    css: `
.jsonpost-form-container {
  max-width: 28rem;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #fff7ed;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #fed7aa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.jsonpost-form-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.jsonpost-field-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.jsonpost-field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #9a3412;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.jsonpost-field-input, .jsonpost-field-textarea, .jsonpost-field-select {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #ffffff;
  border: 1px solid #fed7aa;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  box-sizing: border-box;
}

.jsonpost-field-input:focus, .jsonpost-field-textarea:focus, .jsonpost-field-select:focus {
  outline: none;
  border-color: #fb923c;
  box-shadow: 0 0 0 3px rgba(251, 146, 60, 0.1);
}

.jsonpost-field-textarea {
  resize: vertical;
  min-height: 80px;
}

.jsonpost-submit-button {
  width: 100%;
  background-color: #ea580c;
  color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.jsonpost-submit-button:hover {
  background-color: #c2410c;
}

.jsonpost-field-checkbox, .jsonpost-field-radio {
  width: 1rem;
  height: 1rem;
  color: #ea580c;
  border: 1px solid #fed7aa;
  border-radius: 0.25rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

@media (prefers-color-scheme: dark) {
  .jsonpost-form-container {
    background-color: #1f2937;
    border-color: #374151;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  
  .jsonpost-field-label {
    color: #e5e7eb;
  }
  
  .jsonpost-field-input, .jsonpost-field-textarea, .jsonpost-field-select {
    background-color: #374151;
    border-color: #4b5563;
    color: #ffffff;
  }
  
  .jsonpost-field-input::placeholder, .jsonpost-field-textarea::placeholder {
    color: #9ca3af;
  }
  
  .jsonpost-field-checkbox, .jsonpost-field-radio {
    background-color: #374151;
    border-color: #4b5563;
    color: #ffffff;
  }
}
    `
  }
];