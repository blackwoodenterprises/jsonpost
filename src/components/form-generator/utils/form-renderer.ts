import { FormField } from "../data/form-templates";
import { FormTheme } from "../data/themes";
import { SubmissionMethod } from "../data/submission-methods";

export interface FormRenderOptions {
  fields: FormField[];
  theme: FormTheme;
  formId?: string;
  includeSubmitButton?: boolean;
  submitButtonText?: string;
  includeCSS?: boolean;
}

/**
 * Generate form HTML with optional CSS and JavaScript
 */
export function generateFormHTML(options: FormRenderOptions & {
  endpointUrl?: string;
  submissionMethod?: SubmissionMethod;
  includeJavaScript?: boolean;
}): string {
  const { fields, theme, formId, includeSubmitButton = true, submitButtonText = "Submit Form", endpointUrl, submissionMethod, includeJavaScript = false, includeCSS = false } = options;

  const fieldsHTML = fields.map(field => {
    let fieldHTML = '';
    
    switch (field.type) {
      case 'textarea':
        fieldHTML = `    <div class="${theme.styles.fieldGroup}">
      <label class="${theme.styles.label}" for="${field.id}">
        ${field.label}${field.required ? ' <span style="color: red;">*</span>' : ''}
      </label>
      <textarea 
        id="${field.id}" 
        name="${field.id}" 
        class="${theme.styles.textarea}"
        placeholder="${field.placeholder || ''}"
        ${field.required ? 'required' : ''}
      ></textarea>
    </div>`;
        break;
        
      case 'select':
        const options = field.options?.map(option => 
          `        <option value="${option}">${option}</option>`
        ).join('\n') || '';
        fieldHTML = `    <div class="${theme.styles.fieldGroup}">
      <label class="${theme.styles.label}" for="${field.id}">
        ${field.label}${field.required ? ' <span style="color: red;">*</span>' : ''}
      </label>
      <select 
        id="${field.id}" 
        name="${field.id}" 
        class="${theme.styles.select}"
        ${field.required ? 'required' : ''}
      >
        <option value="">${field.placeholder || 'Select an option'}</option>
${options}
      </select>
    </div>`;
        break;
        
      case 'radio':
        const radioOptions = field.options?.map((option, idx) => 
          `        <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <input 
            type="radio" 
            id="${field.id}_${idx}" 
            name="${field.id}" 
            value="${option}"
            class="${theme.styles.radio}"
            ${field.required ? 'required' : ''}
          />
          <span>${option}</span>
        </label>`
        ).join('\n') || '';
        fieldHTML = `    <div class="${theme.styles.fieldGroup}">
      <label class="${theme.styles.label}">
        ${field.label}${field.required ? ' <span style="color: red;">*</span>' : ''}
      </label>
      <div style="margin-top: 8px;">
${radioOptions}
      </div>
    </div>`;
        break;
        
      case 'checkbox':
        if (field.options && field.options.length > 1) {
          const checkboxOptions = field.options.map((option, idx) => 
            `        <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <input 
            type="checkbox" 
            id="${field.id}_${idx}" 
            name="${field.id}[]" 
            value="${option}"
            class="${theme.styles.checkbox}"
          />
          <span>${option}</span>
        </label>`
          ).join('\n') || '';
          fieldHTML = `    <div class="${theme.styles.fieldGroup}">
      <label class="${theme.styles.label}">
        ${field.label}${field.required ? ' <span style="color: red;">*</span>' : ''}
      </label>
      <div style="margin-top: 8px;">
${checkboxOptions}
      </div>
    </div>`;
        } else {
          fieldHTML = `    <div class="${theme.styles.fieldGroup}">
      <label style="display: flex; align-items: center; gap: 8px;">
        <input 
          type="checkbox" 
          id="${field.id}" 
          name="${field.id}" 
          value="1"
          class="${theme.styles.checkbox}"
          ${field.required ? 'required' : ''}
        />
        <span class="${theme.styles.label}">${field.label}${field.required ? ' <span style="color: red;">*</span>' : ''}</span>
      </label>
    </div>`;
        }
        break;
        
      default:
        fieldHTML = `    <div class="${theme.styles.fieldGroup}">
      <label class="${theme.styles.label}" for="${field.id}">
        ${field.label}${field.required ? ' <span style="color: red;">*</span>' : ''}
      </label>
      <input 
        type="${field.type}" 
        id="${field.id}" 
        name="${field.id}" 
        class="${theme.styles.input}"
        placeholder="${field.placeholder || ''}"
        ${field.required ? 'required' : ''}
      />
    </div>`;
    }
    
    return fieldHTML;
  }).join('\n\n');

  // Build the complete form HTML
  let formHTML;
  
  if (submissionMethod && endpointUrl && formId) {
    // Use submission method template and inject fields
    const submissionTemplate = submissionMethod.codeTemplate(endpointUrl, formId);
    
    // Extract the form opening tag from the template
    const formOpenMatch = submissionTemplate.match(/<form[^>]*>/);
    const formOpenTag = formOpenMatch ? formOpenMatch[0] : `<form class="${theme.styles.form}" id="${formId}">`;
    
    // Build form with proper opening tag and form content wrapper
    formHTML = `  ${formOpenTag}
    <div class="${theme.styles.form}">
${fieldsHTML}`;

    if (includeSubmitButton) {
      formHTML += `

      <button type="submit" class="${theme.styles.button}">${submitButtonText}</button>`;
    }

    formHTML += `
    </div>
  </form>`;
  } else {
    // Fallback to basic form with form content wrapper
    formHTML = `  <form${formId ? ` id="${formId}"` : ''}>
    <div class="${theme.styles.form}">
${fieldsHTML}`;

    if (includeSubmitButton) {
      formHTML += `

      <button type="submit" class="${theme.styles.button}">${submitButtonText}</button>`;
    }

    formHTML += `
    </div>
  </form>`;
  }

  // Add CSS if requested
  if (includeCSS) {
    formHTML = `<style>
${theme.css}
</style>

<div class="${theme.styles.container}">
${formHTML}
</div>`;
  }

  // Add JavaScript if requested and submission method is provided
  if (includeJavaScript && submissionMethod && endpointUrl && formId) {
    const submissionCode = submissionMethod.codeTemplate(endpointUrl, formId);
    
    // Extract script tags from the submission method template
    const scriptMatch = submissionCode.match(/<script[\s\S]*?<\/script>/g);
    if (scriptMatch) {
      formHTML += '\n\n' + scriptMatch.join('\n');
    }
  }

  return formHTML;
}

/**
 * Generate complete HTML document for iframe preview
 */
export function generateCompleteHTML(options: FormRenderOptions & {
  endpointUrl?: string;
  submissionMethod?: SubmissionMethod;
}): string {
  const { theme, endpointUrl, submissionMethod } = options;
  const formId = options.formId || `form_${Date.now()}`;
  
  const formHTML = generateFormHTML({
    ...options,
    formId,
    includeSubmitButton: true,
    includeCSS: false
  });

  let completeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form Preview</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      background-color: #f8f9fa;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #1a1a1a;
        color: #ffffff;
      }
    }
    ${theme.css}
  </style>
</head>
<body>
  <div class="${theme.styles.container}">
    ${formHTML}
  </div>`;

  // Add submission handling if provided
  if (submissionMethod && endpointUrl) {
    const submissionTemplate = submissionMethod.codeTemplate(endpointUrl, formId);
    const scriptTags = submissionTemplate.match(/<script[\s\S]*?<\/script>/g) || [];
    
    if (scriptTags.length > 0) {
      completeHTML += `
  ${scriptTags.join('\n  ')}`;
    }
  }

  completeHTML += `
</body>
</html>`;

  return completeHTML;
}