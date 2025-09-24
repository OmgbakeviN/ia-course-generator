import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// Astuce: utiliser un thème light par défaut, pas besoin de l’importer si vous aimez le style par défaut de Tailwind

// Normalisation douce: retire BOM, uniformise retours ligne
function normalizeModelText(text = "") {
  return String(text)
    .replace(/^\uFEFF/, "")
    .replace(/\r\n?/g, "\n")
    .trim();
}

export default function Markdown({ text }) {
  const safe = normalizeModelText(text);

  return (
    <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-semibold mt-4 mb-2" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-semibold mt-3 mb-1.5" {...props} />,
          p:  ({node, ...props}) => <p className="my-2 leading-relaxed" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-6 my-2 space-y-1" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-2 space-y-1" {...props} />,
          li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
          hr: ({node, ...props}) => <hr className="my-4 border-slate-200" {...props} />,
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-4 border-slate-300 pl-3 italic text-slate-700 my-3" {...props} />
          ),
          a: ({node, ...props}) => (
            <a className="text-blue-600 underline hover:no-underline" target="_blank" rel="noopener noreferrer" {...props} />
          ),
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || "");
            if (inline) {
              return <code className="px-1 py-0.5 rounded bg-slate-100" {...props}>{children}</code>;
            }
            return (
              <div className="my-3 overflow-auto rounded-lg border border-slate-200">
                <SyntaxHighlighter language={match?.[1] || "bash"} PreTag="div" {...props}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            );
          },
          strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
          em: ({node, ...props}) => <em className="italic" {...props} />,
          // Tables GFM
          table: ({node, ...props}) => <table className="table-auto border-collapse my-3" {...props} />,
          thead: ({node, ...props}) => <thead className="bg-slate-50" {...props} />,
          th: ({node, ...props}) => <th className="border px-3 py-1 text-left font-medium" {...props} />,
          td: ({node, ...props}) => <td className="border px-3 py-1 align-top" {...props} />,
        }}
      >
        {safe}
      </ReactMarkdown>
    </div>
  );
}
