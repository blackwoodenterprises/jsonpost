"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface IntegrationExamplesProps {
  endpointUrl: string;
  method: string;
}

export function IntegrationExamples({ endpointUrl, method }: IntegrationExamplesProps) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const copyToClipboard = async (text: string, tabId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(tabId);
      setTimeout(() => setCopiedTab(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const htmlExample = `<form action="${endpointUrl}" method="${method.toLowerCase()}">
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div>
    <label for="message">Message:</label>
    <textarea id="message" name="message" required></textarea>
  </div>
  <button type="submit">Submit</button>
</form>`;

  const javascriptExample = `// Using fetch API
const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('email', 'john@example.com');
formData.append('message', 'Hello from JavaScript!');

fetch('${endpointUrl}', {
  method: '${method}',
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch(error => {
  console.error('Error:', error);
});

// Or with JSON data
const jsonData = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello from JavaScript!'
};

fetch('${endpointUrl}', {
  method: '${method}',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(jsonData)
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));`;

  const reactExample = `import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('${endpointUrl}', {
        method: '${method}',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}`;

  const nodejsExample = `// Using axios
const axios = require('axios');

const formData = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello from Node.js!'
};

axios.${method.toLowerCase()}('${endpointUrl}', formData)
  .then(response => {
    console.log('Success:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response?.data || error.message);
  });

// Using fetch (Node.js 18+)
const fetch = require('node-fetch');

const submitForm = async () => {
  try {
    const response = await fetch('${endpointUrl}', {
      method: '${method}',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello from Node.js!'
      })
    });

    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

submitForm();`;

  const pythonExample = `import requests
import json

# Using requests library
url = '${endpointUrl}'
data = {
    'name': 'John Doe',
    'email': 'john@example.com',
    'message': 'Hello from Python!'
}

# Send as form data
response = requests.${method.toLowerCase()}(url, data=data)

# Or send as JSON
headers = {'Content-Type': 'application/json'}
response = requests.${method.toLowerCase()}(url, json=data, headers=headers)

if response.status_code == 200:
    print('Success:', response.json())
else:
    print('Error:', response.status_code, response.text)

# Using urllib (built-in)
import urllib.request
import urllib.parse

data = urllib.parse.urlencode({
    'name': 'John Doe',
    'email': 'john@example.com',
    'message': 'Hello from Python!'
}).encode('utf-8')

req = urllib.request.Request('${endpointUrl}', data=data, method='${method}')
try:
    with urllib.request.urlopen(req) as response:
        result = response.read().decode('utf-8')
        print('Success:', result)
except urllib.error.HTTPError as e:
    print('Error:', e.code, e.read().decode('utf-8'))`;

  const examples = [
    { id: 'html', label: 'Plain HTML', code: htmlExample, language: 'html' },
    { id: 'javascript', label: 'JavaScript', code: javascriptExample, language: 'javascript' },
    { id: 'react', label: 'React', code: reactExample, language: 'jsx' },
    { id: 'nodejs', label: 'Node.js', code: nodejsExample, language: 'javascript' },
    { id: 'python', label: 'Python', code: pythonExample, language: 'python' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Examples</CardTitle>
        <CardDescription>
          Code examples showing how to integrate with this endpoint using various methods
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="html" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {examples.map((example) => (
              <TabsTrigger key={example.id} value={example.id}>
                {example.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {examples.map((example) => (
            <TabsContent key={example.id} value={example.id}>
              <div className="relative">
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 z-10"
                  onClick={() => copyToClipboard(example.code, example.id)}
                >
                  {copiedTab === example.id ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
                <div className="rounded-lg overflow-hidden">
                  <SyntaxHighlighter
                    language={example.language}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: '16px',
                      fontSize: '13px',
                      lineHeight: '1.4',
                      maxHeight: '400px',
                      overflow: 'auto'
                    }}
                    showLineNumbers={false}
                    wrapLines={true}
                    wrapLongLines={true}
                  >
                    {example.code}
                  </SyntaxHighlighter>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}