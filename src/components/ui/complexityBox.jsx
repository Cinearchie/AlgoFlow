"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ComplexityBoxes({ complexity }) {
  const [copied, setCopied] = useState(false);

  if (!complexity) return null;

  const textToCopy = `Time Complexity:\n${complexity.time}\n\nSpace Complexity:\n${complexity.space}\n\nNotes:\n${complexity.notes}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="max-w-full sm:max-w-2xl relative bg-gray-900 text-white p-4 rounded-md overflow-x-auto mt-6 pr-10 mx-2">
      <h2 className="text-lg font-semibold mb-3">Complexity</h2>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      {/* Time Complexity */}
      <div className="mb-6">
        <div className="mb-2">
          <div className="text-sm font-medium text-gray-200">Time Complexity</div>
          <div className="text-xs text-gray-400">Best / Avg / Worst</div>
        </div>
        <SyntaxHighlighter
          language="text"
          style={oneDark}
          customStyle={{
            background: "transparent",
            fontSize: "0.85rem",
            margin: 0,
            boxShadow: "none",
          }}
          codeTagProps={{ style: { background: "transparent" } }}
        >
          {complexity.time}
        </SyntaxHighlighter>
      </div>

      {/* Space Complexity */}
      <div className="mb-6">
        <div className="mb-2">
          <div className="text-sm font-medium text-gray-200">Space Complexity</div>
          <div className="text-xs text-gray-400">Auxiliary / Total</div>
        </div>
        <SyntaxHighlighter
          language="text"
          style={oneDark}
          customStyle={{
            background: "transparent",
            fontSize: "0.85rem",
            margin: 0,
            boxShadow: "none",
          }}
          codeTagProps={{ style: { background: "transparent" } }}
        >
          {complexity.space}
        </SyntaxHighlighter>
      </div>

      {/* Notes */}
      <div>
        <div className="mb-2">
          <div className="text-sm font-medium text-gray-200">Notes</div>
        </div>
        <SyntaxHighlighter
          language="text"
          style={oneDark}
          customStyle={{
            background: "transparent",
            fontSize: "0.85rem",
            margin: 0,
            boxShadow: "none",
          }}
          codeTagProps={{ style: { background: "transparent" } }}
        >
          {complexity.notes}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
