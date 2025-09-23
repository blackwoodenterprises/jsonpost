"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField } from "../data/form-templates";
import { FormTheme } from "../data/themes";
import { SubmissionMethod } from "../data/submission-methods";
import { generateFormHTML, generateCompleteHTML } from "../utils/form-renderer";
import { 
  Copy, 
  Download, 
  Eye, 
  Code, 
  CheckCircle,
  ExternalLink
} from "lucide-react";

interface CodePreviewProps {
  fields: FormField[];
  theme: FormTheme;
  submissionMethod: SubmissionMethod;
  endpointUrl: string;
  onBack: () => void;
  onStartOver: () => void;
}

export function CodePreview({
  fields,
  theme,
  submissionMethod,
  endpointUrl,
  onBack,
  onStartOver
}: CodePreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'fragment' | 'complete'>('preview');
  const [copied, setCopied] = useState(false);

  const formId = `form_${Date.now()}`;

  // Use unified renderer for form HTML generation
  const getFormHTML = () => {
    return generateFormHTML({
      fields,
      theme,
      formId,
      includeSubmitButton: true,
      submitButtonText: "Submit Form",
      endpointUrl,
      submissionMethod,
      includeJavaScript: true,
      includeCSS: true
    });
  };

  // Generate complete code with CSS and JavaScript
  const getCompleteCode = () => {
    return generateCompleteHTML({
      fields,
      theme,
      formId,
      endpointUrl,
      submissionMethod,
      includeSubmitButton: true,
      submitButtonText: "Submit Form"
    });
  };

  // Use unified renderer for complete HTML generation
  const getCompleteHTML = () => {
    return generateCompleteHTML({
      fields,
      theme,
      formId,
      endpointUrl,
      submissionMethod,
      includeSubmitButton: true,
      submitButtonText: "Submit Form"
    });
  };

  const copyToClipboard = async () => {
    try {
      const textToCopy = activeTab === 'complete' ? getCompleteCode() : getFormHTML();
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const downloadHTML = () => {
    const html = activeTab === 'complete' ? getCompleteCode() : getFormHTML();
    const filename = activeTab === 'complete' ? 'complete-form.html' : 'form-fragment.html';
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openPreviewWindow = () => {
    const html = getCompleteHTML();
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Your Form is Ready!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Copy the code below or download the HTML file
        </p>
      </div>

      {/* Form Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Form Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{fields.length}</div>
              <div className="text-sm text-gray-600">Fields</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{theme.name}</div>
              <div className="text-sm text-gray-600">Theme</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{submissionMethod.name}</div>
              <div className="text-sm text-gray-600">Method</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {fields.filter(f => f.required).length}
              </div>
              <div className="text-sm text-gray-600">Required</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'preview'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Eye className="w-4 h-4 inline mr-2" />
          Preview
        </button>
        <button
          onClick={() => setActiveTab('fragment')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'fragment'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Code className="w-4 h-4 inline mr-2" />
          HTML Fragment
        </button>
        <button
          onClick={() => setActiveTab('complete')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'complete'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Code className="w-4 h-4 inline mr-2" />
          Complete Code
        </button>
      </div>

      {/* Content */}
      {activeTab === 'preview' ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live Preview</CardTitle>
              <Button onClick={openPreviewWindow} variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-1" />
                Open in New Window
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 bg-gray-50">
              <iframe
                srcDoc={getCompleteHTML()}
                className="w-full h-96 border-0 rounded"
                title="Form Preview"
              />
            </div>
          </CardContent>
        </Card>
      ) : activeTab === 'fragment' ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>HTML Fragment</CardTitle>
              <div className="flex space-x-2">
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy Fragment
                    </>
                  )}
                </Button>
                <Button onClick={downloadHTML} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download Fragment
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>HTML Fragment:</strong> This code includes the form HTML, CSS, and JavaScript for {submissionMethod.name} submission. Ready to embed in your webpage.
              </p>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{getFormHTML()}</code>
            </pre>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Complete Code</CardTitle>
              <div className="flex space-x-2">
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy Complete Code
                    </>
                  )}
                </Button>
                <Button onClick={downloadHTML} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download Complete HTML
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Ready to use:</strong> This complete HTML file includes CSS styling, JavaScript for form submission ({submissionMethod.name}), and can be used directly in any webpage.
              </p>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{getCompleteCode()}</code>
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back to Themes
        </Button>
        <Button onClick={onStartOver} variant="outline">
          Create Another Form
        </Button>
      </div>
    </div>
  );
}