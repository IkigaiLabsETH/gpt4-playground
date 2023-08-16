import React from "react";
import ReactMarkdown from "react-markdown";
import rangeParser from "parse-numeric-range";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import clojure from "react-syntax-highlighter/dist/esm/languages/prism/clojure";
import docker from "react-syntax-highlighter/dist/esm/languages/prism/docker";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
import graphql from "react-syntax-highlighter/dist/esm/languages/prism/graphql";
import handlebars from "react-syntax-highlighter/dist/esm/languages/prism/handlebars";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import makefile from "react-syntax-highlighter/dist/esm/languages/prism/makefile";
import processing from "react-syntax-highlighter/dist/esm/languages/prism/processing";
import rust from "react-syntax-highlighter/dist/esm/languages/prism/rust";
import solidity from "react-syntax-highlighter/dist/esm/languages/prism/solidity";
import MathJax from "react-mathjax";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("clojure", clojure);
SyntaxHighlighter.registerLanguage("docker", docker);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("graphql", graphql);
SyntaxHighlighter.registerLanguage("handlebars", handlebars);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("makefile", makefile);
SyntaxHighlighter.registerLanguage("processing", processing);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("solidity", solidity);
SyntaxHighlighter.registerLanguage("json", json);

const syntaxTheme = oneDark;

type Props = {
  content: string;
};

export default function AssistantMessageContent({ content, ...props }: Props) {
  const MarkdownComponents: any = {
    // Work around for not rending <em> and <strong> tags
    em: ({ node, inline, className, children, ...props }: any) => {
      return (
        <span className={className} {...props}>
          _{children}_
        </span>
      );
    },
    strong: ({ node, inline, className, children, ...props }: any) => {
      return (
        <span className={className} {...props}>
          __{children}__
        </span>
      );
    },

    pre: ({ node, inline, className, children, ...props }: any) => {
      return (
        <pre className={`m-0 ${className || ""}`} {...props}>
          {children}
        </pre>
      );
    },

    math: (props: any) => <MathJax.Node formula={props.value} />,
    inlineMath: (props: any) => <MathJax.Node inline formula={props.value} />,

    code({ node, inline, className, ...props }: any) {
      const hasLang = /language-(\w+)/.exec(className || "");
      const hasMeta = node?.data?.meta;

      const applyHighlights: object = (applyHighlights: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node.data.meta?.replace(/\s/g, "");
          const strlineNumbers = RE?.test(metadata)
            ? RE?.exec(metadata)?.[1]
            : "0";
          const highlightLines = rangeParser(strlineNumbers || "0");
          const highlight = highlightLines;
          const data: string = highlight.includes(applyHighlights)
            ? "highlight"
            : "";
          return { data };
        } else {
          return {};
        }
      };

      return hasLang ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={hasLang[1]}
          PreTag="div"
          className="overflow-hidden rounded-md"
          showLineNumbers={true}
          wrapLines={hasMeta}
          useInlineStyles={true}
          lineProps={applyHighlights}
        >
          {props.children}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props} />
      );
    },
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={MarkdownComponents}
      {...props}
    >
      {content}
    </ReactMarkdown>
  );
}
