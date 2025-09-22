export interface SubmissionMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  codeTemplate: (endpoint: string, formId: string) => string;
}

export const SUBMISSION_METHODS: SubmissionMethod[] = [
  {
    id: 'http-post',
    name: 'HTTP POST',
    description: 'Standard HTML form submission',
    icon: '📤',
    codeTemplate: (endpoint: string, formId: string) => `
<!-- Standard HTML Form with HTTP POST -->
<form id="${formId}" action="${endpoint}" method="POST">
  <!-- Form fields will be inserted here -->
  <button type="submit">Submit</button>
</form>`
  },
  {
    id: 'ajax',
    name: 'AJAX',
    description: 'Asynchronous JavaScript submission with fetch API',
    icon: '⚡',
    codeTemplate: (endpoint: string, formId: string) => `
<!-- AJAX Form Submission with Enhanced Features -->
<form id="${formId}">
  <!-- Form fields will be inserted here -->
  <button type="submit">Submit</button>
</form>

<script>
// Enhanced AJAX Form Submission Handler
document.getElementById('${formId}').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Get form elements
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  // Validate required fields
  const requiredFields = this.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#ef4444';
      field.style.boxShadow = '0 0 0 1px #ef4444';
      isValid = false;
    } else {
      field.style.borderColor = '';
      field.style.boxShadow = '';
    }
  });
  
  if (!isValid) {
    alert('Please fill in all required fields.');
    return;
  }
  
  // Show loading state
  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';
  
  // Prepare form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  try {
    const response = await fetch('${endpoint}', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (response.ok && (result.success || response.status === 200)) {
      // Success feedback
      submitBtn.textContent = '✓ Submitted!';
      submitBtn.style.backgroundColor = '#10b981';
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.innerHTML = '✅ Form submitted successfully!';
      successMsg.style.cssText = 'color: #10b981; margin-top: 10px; padding: 10px; background: #f0fdf4; border: 1px solid #10b981; border-radius: 4px;';
      this.appendChild(successMsg);
      
      // Reset form after delay
      setTimeout(() => {
        this.reset();
        successMsg.remove();
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.style.opacity = '';
        submitBtn.disabled = false;
      }, 3000);
      
    } else {
      throw new Error(result.message || result.error || 'Submission failed');
    }
    
  } catch (error) {
    console.error('AJAX Error:', error);
    
    // Error feedback
    submitBtn.textContent = '✗ Error';
    submitBtn.style.backgroundColor = '#ef4444';
    
    // Show error message
    const errorMsg = document.createElement('div');
    errorMsg.innerHTML = '❌ ' + (error.message || 'Network error. Please check your connection and try again.');
    errorMsg.style.cssText = 'color: #ef4444; margin-top: 10px; padding: 10px; background: #fef2f2; border: 1px solid #ef4444; border-radius: 4px;';
    this.appendChild(errorMsg);
    
    // Reset button after delay
    setTimeout(() => {
      errorMsg.remove();
      submitBtn.textContent = originalText;
      submitBtn.style.backgroundColor = '';
      submitBtn.style.opacity = '';
      submitBtn.disabled = false;
    }, 5000);
  }
});

// Reset field styling on input
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('${formId}');
  if (form) {
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
      });
    });
  }
});
</script>`
  },
  {
    id: 'jquery',
    name: 'jQuery',
    description: 'jQuery-based form submission with AJAX',
    icon: '📦',
    codeTemplate: (endpoint: string, formId: string) => `
<!-- jQuery Form Submission with Enhanced Features -->
<form id="${formId}">
  <!-- Form fields will be inserted here -->
  <button type="submit">Submit</button>
</form>

<!-- Include jQuery from CDN -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

<script>
// Enhanced jQuery Form Submission Handler
$(document).ready(function() {
  // Form validation styling
  function validateField($field) {
    if ($field.prop('required') && !$field.val().trim()) {
      $field.css({
        'border-color': '#ef4444',
        'box-shadow': '0 0 0 1px #ef4444'
      });
      return false;
    } else {
      $field.css({
        'border-color': '',
        'box-shadow': ''
      });
      return true;
    }
  }
  
  // Reset field styling on input
  $('#${formId} input, #${formId} select, #${formId} textarea').on('input change', function() {
    $(this).css({
      'border-color': '',
      'box-shadow': ''
    });
  });
  
  // Form submission handler
  $('#${formId}').on('submit', function(e) {
    e.preventDefault();
    
    const $form = $(this);
    const $submitBtn = $form.find('button[type="submit"]');
    const originalText = $submitBtn.text();
    
    // Validate all required fields
    let isValid = true;
    $form.find('[required]').each(function() {
      if (!validateField($(this))) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      // Show validation error with jQuery animation
      const $errorMsg = $('<div class="validation-error">⚠️ Please fill in all required fields.</div>');
      $errorMsg.css({
        'color': '#ef4444',
        'margin-top': '10px',
        'padding': '10px',
        'background': '#fef2f2',
        'border': '1px solid #ef4444',
        'border-radius': '4px',
        'display': 'none'
      });
      
      $form.find('.validation-error').remove();
      $form.append($errorMsg);
      $errorMsg.fadeIn(300);
      
      setTimeout(() => {
        $errorMsg.fadeOut(300, function() {
          $(this).remove();
        });
      }, 4000);
      
      return;
    }
    
    // Show loading state with jQuery effects
    $submitBtn.text('Submitting...')
             .prop('disabled', true)
             .css('opacity', '0.7');
    
    // Serialize form data
    const formData = {};
    $form.serializeArray().forEach(function(item) {
      formData[item.name] = item.value;
    });
    
    // AJAX request with jQuery
    $.ajax({
      url: '${endpoint}',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(formData),
      timeout: 30000, // 30 second timeout
      
      success: function(response, textStatus, xhr) {
        if (response.success || xhr.status === 200) {
          // Success feedback with jQuery animations
          $submitBtn.text('✓ Submitted!')
                   .css('background-color', '#10b981');
          
          // Show success message with fade-in effect
          const $successMsg = $('<div class="success-message">✅ Form submitted successfully!</div>');
          $successMsg.css({
            'color': '#10b981',
            'margin-top': '10px',
            'padding': '10px',
            'background': '#f0fdf4',
            'border': '1px solid #10b981',
            'border-radius': '4px',
            'display': 'none'
          });
          
          $form.find('.success-message, .error-message').remove();
          $form.append($successMsg);
          $successMsg.fadeIn(500);
          
          // Reset form after delay with jQuery effects
          setTimeout(() => {
            $successMsg.fadeOut(300, function() {
              $(this).remove();
            });
            
            $form[0].reset();
            $submitBtn.text(originalText)
                     .css({
                       'background-color': '',
                       'opacity': ''
                     })
                     .prop('disabled', false);
          }, 3000);
          
        } else {
          throw new Error(response.message || response.error || 'Submission failed');
        }
      },
      
      error: function(xhr, textStatus, errorThrown) {
        console.error('jQuery AJAX Error:', {
          status: xhr.status,
          statusText: xhr.statusText,
          textStatus: textStatus,
          errorThrown: errorThrown,
          responseText: xhr.responseText
        });
        
        let errorMessage = 'Network error. Please check your connection and try again.';
        
        if (xhr.responseJSON && xhr.responseJSON.message) {
          errorMessage = xhr.responseJSON.message;
        } else if (textStatus === 'timeout') {
          errorMessage = 'Request timed out. Please try again.';
        } else if (xhr.status === 0) {
          errorMessage = 'Network connection failed. Please check your internet connection.';
        } else if (xhr.status >= 400) {
          errorMessage = 'Server error (' + xhr.status + '). Please try again later.';
        }
        
        // Error feedback with jQuery animations
        $submitBtn.text('✗ Error')
                 .css('background-color', '#ef4444');
        
        // Show error message with fade-in effect
        const $errorMsg = $('<div class="error-message">❌ ' + errorMessage + '</div>');
        $errorMsg.css({
          'color': '#ef4444',
          'margin-top': '10px',
          'padding': '10px',
          'background': '#fef2f2',
          'border': '1px solid #ef4444',
          'border-radius': '4px',
          'display': 'none'
        });
        
        $form.find('.success-message, .error-message').remove();
        $form.append($errorMsg);
        $errorMsg.fadeIn(500);
        
        // Reset button after delay
        setTimeout(() => {
          $errorMsg.fadeOut(300, function() {
            $(this).remove();
          });
          
          $submitBtn.text(originalText)
                   .css({
                     'background-color': '',
                     'opacity': ''
                   })
                   .prop('disabled', false);
        }, 5000);
      }
    });
  });
});
</script>`
  }
];