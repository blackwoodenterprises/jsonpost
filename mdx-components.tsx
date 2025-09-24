import type { MDXComponents } from 'mdx/types'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const components: MDXComponents = {
  // Custom heading components with proper styling
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-semibold mb-4 mt-8 text-gray-900 dark:text-white">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold mb-3 mt-6 text-gray-900 dark:text-white">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-semibold mb-2 mt-4 text-gray-900 dark:text-white">
      {children}
    </h4>
  ),
  
  // Paragraph styling
  p: ({ children }) => (
    <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
      {children}
    </p>
  ),
  
  // List styling
  ul: ({ children }) => (
    <ul className="mb-4 ml-6 list-disc text-gray-700 dark:text-gray-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 ml-6 list-decimal text-gray-700 dark:text-gray-300">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="mb-1">{children}</li>
  ),
  
  // Link styling
  a: ({ href, children }) => (
    <a 
      href={href} 
      className="text-blue-600 dark:text-blue-400 hover:underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  
  // Code block styling with syntax highlighting
  pre: ({ children }) => {
    const child = children as any;
    const className = child?.props?.className || '';
    const language = className.replace('language-', '') || 'text';
    const code = child?.props?.children || '';
    
    return (
      <div className="mb-6">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            borderRadius: '8px',
            padding: '16px',
            fontSize: '14px',
            lineHeight: '1.5',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  },
  
  // Inline code styling
  code: ({ children }) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-900 dark:text-gray-100">
      {children}
    </code>
  ),
  
  // Blockquote styling
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 mb-4 italic text-gray-700 dark:text-gray-300">
      {children}
    </blockquote>
  ),
  
  // Table styling
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full border border-gray-200 dark:border-gray-700">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 font-semibold text-left">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
      {children}
    </td>
  ),
  
  // Horizontal rule
  hr: () => (
    <hr className="my-8 border-gray-200 dark:border-gray-700" />
  ),
}

export function useMDXComponents(): MDXComponents {
  return components
}