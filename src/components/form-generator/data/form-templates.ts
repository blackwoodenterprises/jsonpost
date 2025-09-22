export interface FormField {
  id: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'number' | 'date' | 'time' | 'url' | 'password';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  fields: FormField[];
}

export const FORM_TEMPLATES: FormTemplate[] = [
  {
    id: 'blank',
    name: 'Blank Form',
    description: 'Blank Form',
    icon: '📧',
    fields: []
  },
  {
    id: 'contact',
    name: 'Contact Form',
    description: 'Basic contact form for customer inquiries',
    icon: '📧',
    fields: [
      { id: 'name', type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true },
      { id: 'email', type: 'email', label: 'Email Address', placeholder: 'Enter your email', required: true },
      { id: 'subject', type: 'text', label: 'Subject', placeholder: 'What is this about?', required: true },
      { id: 'message', type: 'textarea', label: 'Message', placeholder: 'Your message here...', required: true }
    ]
  },
  {
    id: 'feedback',
    name: 'Feedback Form',
    description: 'Collect user feedback and suggestions',
    icon: '💬',
    fields: [
      { id: 'name', type: 'text', label: 'Name', placeholder: 'Your name (optional)', required: false },
      { id: 'email', type: 'email', label: 'Email', placeholder: 'Your email (optional)', required: false },
      { id: 'rating', type: 'select', label: 'Overall Rating', required: true, options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'] },
      { id: 'feedback', type: 'textarea', label: 'Your Feedback', placeholder: 'Tell us what you think...', required: true },
      { id: 'recommend', type: 'radio', label: 'Would you recommend us?', required: true, options: ['Yes', 'No', 'Maybe'] }
    ]
  },
  {
    id: 'survey',
    name: 'Survey Form',
    description: 'Comprehensive survey for data collection',
    icon: '📊',
    fields: [
      { id: 'age', type: 'select', label: 'Age Group', required: true, options: ['18-25', '26-35', '36-45', '46-55', '55+'] },
      { id: 'gender', type: 'radio', label: 'Gender', required: false, options: ['Male', 'Female', 'Other', 'Prefer not to say'] },
      { id: 'occupation', type: 'text', label: 'Occupation', placeholder: 'Your job title', required: false },
      { id: 'experience', type: 'select', label: 'Experience with our service', required: true, options: ['First time', 'Less than 6 months', '6-12 months', '1-2 years', 'More than 2 years'] },
      { id: 'suggestions', type: 'textarea', label: 'Suggestions for improvement', placeholder: 'Any suggestions?', required: false }
    ]
  },
  {
    id: 'order',
    name: 'Order Form',
    description: 'Product or service order form',
    icon: '🛒',
    fields: [
      { id: 'customerName', type: 'text', label: 'Customer Name', placeholder: 'Full name', required: true },
      { id: 'email', type: 'email', label: 'Email Address', placeholder: 'Email for order confirmation', required: true },
      { id: 'phone', type: 'tel', label: 'Phone Number', placeholder: 'Contact number', required: true },
      { id: 'product', type: 'select', label: 'Product/Service', required: true, options: ['Product A', 'Product B', 'Product C', 'Service Package'] },
      { id: 'quantity', type: 'number', label: 'Quantity', placeholder: '1', required: true },
      { id: 'address', type: 'textarea', label: 'Delivery Address', placeholder: 'Full delivery address', required: true },
      { id: 'notes', type: 'textarea', label: 'Special Instructions', placeholder: 'Any special requests?', required: false }
    ]
  },
  {
    id: 'donation',
    name: 'Donation Form',
    description: 'Charitable donation collection form',
    icon: '❤️',
    fields: [
      { id: 'donorName', type: 'text', label: 'Donor Name', placeholder: 'Your full name', required: true },
      { id: 'email', type: 'email', label: 'Email Address', placeholder: 'For donation receipt', required: true },
      { id: 'amount', type: 'select', label: 'Donation Amount', required: true, options: ['$10', '$25', '$50', '$100', '$250', 'Other'] },
      { id: 'customAmount', type: 'number', label: 'Custom Amount ($)', placeholder: 'Enter amount', required: false },
      { id: 'frequency', type: 'radio', label: 'Donation Frequency', required: true, options: ['One-time', 'Monthly', 'Quarterly', 'Annually'] },
      { id: 'anonymous', type: 'checkbox', label: 'Make this donation anonymous', required: false },
      { id: 'message', type: 'textarea', label: 'Message (Optional)', placeholder: 'Leave a message...', required: false }
    ]
  },
  {
    id: 'booking',
    name: 'Booking Form',
    description: 'General booking and reservation form',
    icon: '📅',
    fields: [
      { id: 'name', type: 'text', label: 'Full Name', placeholder: 'Your full name', required: true },
      { id: 'email', type: 'email', label: 'Email Address', placeholder: 'Contact email', required: true },
      { id: 'phone', type: 'tel', label: 'Phone Number', placeholder: 'Contact number', required: true },
      { id: 'service', type: 'select', label: 'Service Type', required: true, options: ['Consultation', 'Meeting', 'Event', 'Other'] },
      { id: 'date', type: 'date', label: 'Preferred Date', required: true },
      { id: 'time', type: 'time', label: 'Preferred Time', required: true },
      { id: 'guests', type: 'number', label: 'Number of Guests', placeholder: '1', required: true },
      { id: 'requirements', type: 'textarea', label: 'Special Requirements', placeholder: 'Any special needs?', required: false }
    ]
  },
  {
    id: 'login',
    name: 'Login Form',
    description: 'User authentication login form',
    icon: '🔐',
    fields: [
      { id: 'username', type: 'text', label: 'Username or Email', placeholder: 'Enter username or email', required: true },
      { id: 'password', type: 'password', label: 'Password', placeholder: 'Enter your password', required: true },
      { id: 'remember', type: 'checkbox', label: 'Remember me', required: false }
    ]
  },
  {
    id: 'quiz',
    name: 'Quiz Form',
    description: 'Interactive quiz or assessment form',
    icon: '🧠',
    fields: [
      { id: 'name', type: 'text', label: 'Your Name', placeholder: 'Enter your name', required: true },
      { id: 'email', type: 'email', label: 'Email Address', placeholder: 'For results', required: false },
      { id: 'question1', type: 'radio', label: 'Question 1: What is 2+2?', required: true, options: ['3', '4', '5', '6'] },
      { id: 'question2', type: 'select', label: 'Question 2: Choose the correct answer', required: true, options: ['Option A', 'Option B', 'Option C', 'Option D'] },
      { id: 'question3', type: 'checkbox', label: 'Question 3: Select all that apply', required: false, options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'] },
      { id: 'feedback', type: 'textarea', label: 'Additional Comments', placeholder: 'Any thoughts on this quiz?', required: false }
    ]
  },
  {
    id: 'appointment',
    name: 'Appointment Booking Form',
    description: 'Professional appointment scheduling',
    icon: '🗓️',
    fields: [
      { id: 'firstName', type: 'text', label: 'First Name', placeholder: 'First name', required: true },
      { id: 'lastName', type: 'text', label: 'Last Name', placeholder: 'Last name', required: true },
      { id: 'email', type: 'email', label: 'Email Address', placeholder: 'Contact email', required: true },
      { id: 'phone', type: 'tel', label: 'Phone Number', placeholder: 'Phone number', required: true },
      { id: 'appointmentType', type: 'select', label: 'Appointment Type', required: true, options: ['Consultation', 'Follow-up', 'New Patient', 'Emergency'] },
      { id: 'preferredDate', type: 'date', label: 'Preferred Date', required: true },
      { id: 'preferredTime', type: 'select', label: 'Preferred Time', required: true, options: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'] },
      { id: 'reason', type: 'textarea', label: 'Reason for Appointment', placeholder: 'Brief description...', required: true }
    ]
  },
  {
    id: 'event-registration',
    name: 'Event Registration Form',
    description: 'Event signup and registration form',
    icon: '🎉',
    fields: [
      { id: 'fullName', type: 'text', label: 'Full Name', placeholder: 'Your full name', required: true },
      { id: 'email', type: 'email', label: 'Email Address', placeholder: 'Contact email', required: true },
      { id: 'phone', type: 'tel', label: 'Phone Number', placeholder: 'Contact number', required: true },
      { id: 'organization', type: 'text', label: 'Organization/Company', placeholder: 'Your organization', required: false },
      { id: 'ticketType', type: 'select', label: 'Ticket Type', required: true, options: ['General Admission', 'VIP', 'Student', 'Group'] },
      { id: 'attendees', type: 'number', label: 'Number of Attendees', placeholder: '1', required: true },
      { id: 'dietary', type: 'select', label: 'Dietary Requirements', required: false, options: ['None', 'Vegetarian', 'Vegan', 'Gluten-free', 'Other'] },
      { id: 'comments', type: 'textarea', label: 'Additional Comments', placeholder: 'Any special requirements?', required: false }
    ]
  },
  {
    id: 'newsletter',
    name: 'Newsletter Signup Form',
    description: 'Email newsletter subscription form',
    icon: '📰',
    fields: [
      { id: 'email', type: 'email', label: 'Email Address', placeholder: 'Enter your email', required: true },
      { id: 'firstName', type: 'text', label: 'First Name', placeholder: 'Your first name', required: false },
      { id: 'lastName', type: 'text', label: 'Last Name', placeholder: 'Your last name', required: false },
      { id: 'interests', type: 'checkbox', label: 'Interests', required: false, options: ['Technology', 'Business', 'Marketing', 'Design', 'Development'] },
      { id: 'frequency', type: 'radio', label: 'Email Frequency', required: true, options: ['Daily', 'Weekly', 'Monthly'] }
    ]
  },
  {
    id: 'registration',
    name: 'Registration Form',
    description: 'User account registration form',
    icon: '👤',
    fields: [
      { id: 'firstName', type: 'text', label: 'First Name', placeholder: 'First name', required: true },
      { id: 'lastName', type: 'text', label: 'Last Name', placeholder: 'Last name', required: true },
      { id: 'email', type: 'email', label: 'Email Address', placeholder: 'Email address', required: true },
      { id: 'username', type: 'text', label: 'Username', placeholder: 'Choose a username', required: true },
      { id: 'password', type: 'password', label: 'Password', placeholder: 'Create a password', required: true },
      { id: 'confirmPassword', type: 'password', label: 'Confirm Password', placeholder: 'Confirm your password', required: true },
      { id: 'phone', type: 'tel', label: 'Phone Number', placeholder: 'Phone number', required: false },
      { id: 'terms', type: 'checkbox', label: 'I agree to the Terms and Conditions', required: true }
    ]
  },
  {
    id: 'email-subscription',
    name: 'Email Subscription Form',
    description: 'Email list subscription with preferences',
    icon: '✉️',
    fields: [
      { id: 'email', type: 'email', label: 'Email Address', placeholder: 'Your email address', required: true },
      { id: 'name', type: 'text', label: 'Full Name', placeholder: 'Your full name', required: false },
      { id: 'subscriptionType', type: 'select', label: 'Subscription Type', required: true, options: ['Newsletter', 'Product Updates', 'Promotions', 'All Updates'] },
      { id: 'format', type: 'radio', label: 'Email Format', required: true, options: ['HTML', 'Text Only'] },
      { id: 'topics', type: 'checkbox', label: 'Topics of Interest', required: false, options: ['News', 'Tips & Tricks', 'Case Studies', 'Product Announcements'] }
    ]
  },
  {
    id: 'customer-satisfaction',
    name: 'Customer Satisfaction Survey Form',
    description: 'Detailed customer satisfaction assessment',
    icon: '⭐',
    fields: [
      { id: 'customerName', type: 'text', label: 'Customer Name', placeholder: 'Your name (optional)', required: false },
      { id: 'email', type: 'email', label: 'Email Address', placeholder: 'Email (optional)', required: false },
      { id: 'overallSatisfaction', type: 'select', label: 'Overall Satisfaction', required: true, options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'] },
      { id: 'productQuality', type: 'select', label: 'Product Quality Rating', required: true, options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'] },
      { id: 'customerService', type: 'select', label: 'Customer Service Rating', required: true, options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'] },
      { id: 'likelihood', type: 'select', label: 'Likelihood to Recommend', required: true, options: ['Very Likely', 'Likely', 'Neutral', 'Unlikely', 'Very Unlikely'] },
      { id: 'improvements', type: 'textarea', label: 'Suggestions for Improvement', placeholder: 'How can we improve?', required: false },
      { id: 'additionalComments', type: 'textarea', label: 'Additional Comments', placeholder: 'Any other feedback?', required: false }
    ]
  },
  {
    id: 'product-return',
    name: 'Product Return Form',
    description: 'Product return and refund request form',
    icon: '↩️',
    fields: [
      { id: 'customerName', type: 'text', label: 'Customer Name', placeholder: 'Full name', required: true },
      { id: 'email', type: 'email', label: 'Email Address', placeholder: 'Contact email', required: true },
      { id: 'orderNumber', type: 'text', label: 'Order Number', placeholder: 'Order/Invoice number', required: true },
      { id: 'productName', type: 'text', label: 'Product Name', placeholder: 'Name of product to return', required: true },
      { id: 'purchaseDate', type: 'date', label: 'Purchase Date', required: true },
      { id: 'reason', type: 'select', label: 'Reason for Return', required: true, options: ['Defective Product', 'Wrong Item', 'Not as Described', 'Changed Mind', 'Size Issue', 'Other'] },
      { id: 'condition', type: 'select', label: 'Product Condition', required: true, options: ['New/Unused', 'Lightly Used', 'Used', 'Damaged'] },
      { id: 'description', type: 'textarea', label: 'Detailed Description', placeholder: 'Describe the issue or reason...', required: true },
      { id: 'refundMethod', type: 'radio', label: 'Preferred Refund Method', required: true, options: ['Original Payment Method', 'Store Credit', 'Exchange'] }
    ]
  },
  {
    id: 'volunteer-signup',
    name: 'Volunteer Signup Form',
    description: 'Volunteer registration and interest form',
    icon: '🤝',
    fields: [
      { id: 'firstName', type: 'text', label: 'First Name', placeholder: 'First name', required: true },
      { id: 'lastName', type: 'text', label: 'Last Name', placeholder: 'Last name', required: true },
      { id: 'email', type: 'email', label: 'Email Address', placeholder: 'Contact email', required: true },
      { id: 'phone', type: 'tel', label: 'Phone Number', placeholder: 'Phone number', required: true },
      { id: 'age', type: 'select', label: 'Age Group', required: true, options: ['Under 18', '18-25', '26-35', '36-50', '51-65', 'Over 65'] },
      { id: 'availability', type: 'checkbox', label: 'Availability', required: true, options: ['Weekdays', 'Weekends', 'Evenings', 'Mornings', 'Flexible'] },
      { id: 'interests', type: 'checkbox', label: 'Areas of Interest', required: true, options: ['Event Support', 'Administrative', 'Fundraising', 'Community Outreach', 'Education', 'Other'] },
      { id: 'experience', type: 'textarea', label: 'Previous Volunteer Experience', placeholder: 'Describe any relevant experience...', required: false },
      { id: 'motivation', type: 'textarea', label: 'Why do you want to volunteer?', placeholder: 'Tell us about your motivation...', required: true },
      { id: 'emergency', type: 'text', label: 'Emergency Contact', placeholder: 'Name and phone number', required: true }
    ]
  }
];