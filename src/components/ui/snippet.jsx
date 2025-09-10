import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const customTheme = {
    ...oneDark,
    'comment': { color: '#BFDBFE' },
    'keyword': { color: '#60A5FA', fontWeight: 'bold' },
    'string': { color: '#93C5FD' },
    'function': { color: '#3B82F6' },
    'number': { color: '#22D3EE' },
    'boolean': { color: '#67E8F9' },
    'operator': { color: '#38BDF8' },
    'punctuation': { color: '#E0F2FE' },
    'variable': { color: '#FFFFFF' },
  };
const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-full sm:max-w-2xl relative bg-gray-900 text-white p-4 rounded-md overflow-x-auto mt-6 pr-10 mx-2">
      <button
        onClick={handleCopy}
        className="sticky top-2 left-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs rounded-md transition-all duration-200"
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      <SyntaxHighlighter
        language="javascript"
        style={customTheme}
        showLineNumbers
        customStyle={{
          background: "transparent",
          fontSize: "0.85rem",
          margin: 0,
          boxShadow: "none",
        }}
        codeTagProps={{
          style: {
            background: "transparent",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
