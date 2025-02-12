"use client"; 
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Card from "@mui/material/Card";

import { CodeBlock } from "./code-block"
interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {

  const renderCodeBlock = ({ inline, className, children }: unknown) => {
    const match = /language-(\w+)/.exec(className || "");
    const code = String(children).trim();

    return !inline && match ? (
    <>
    <CodeBlock language="typescript" filename="utils/generateStructure.ts" code={code}/>
    </>
    ): ""
  };

  return (
    <div className="markdown">
      <Card className="p-4 bg-[#2d2d2d] text-white">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{ code: renderCodeBlock }}
        >
          {content}
        </ReactMarkdown>
      </Card>
    </div>
  );
};

export default MarkdownViewer;

