"use client"

import { useState, useEffect } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState<string>(code)

  useEffect(() => {
    // Simple syntax highlighting function with direct styling
    const highlight = (code: string, language: string) => {
      // For TypeScript interfaces, use a completely different approach
      if (language === "typescript") {
        // First escape any HTML to prevent XSS
        const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

        // Split by lines to process each line separately
        const lines = escaped.split("\n")
        const highlightedLines = lines.map((line) => {
          // Handle keywords
          line = line.replace(/\b(interface|type|extends)\b/g, '<span style="color: #c084fc;">$1</span>')

          // Handle types (only when they appear after a colon)
          line = line.replace(/: (\w+)(\[\])?/g, ': <span style="color: #67e8f9;">$1$2</span>')

          // Handle property names (must come after type handling)
          line = line.replace(/^(\s*)(\w+)(\??:)/g, '$1<span style="color: #f472b6;">$2</span>$3')

          // Handle special characters
          line = line.replace(/([{}[\]])/g, '<span style="color: #6b7280;">$1</span>')

          return line
        })

        return highlightedLines.join("\n")
      }

      // For JSON
      if (language === "json") {
        try {
          // Try to parse and format JSON
          const parsed = JSON.parse(code)
          const formatted = JSON.stringify(parsed, null, 2)

          // Apply syntax highlighting
          return formatted
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"([^"]+)":/g, '"<span style="color: #f472b6;">$1</span>":')
            .replace(/: "([^"]+)"/g, ': "<span style="color: #6ee7b7;">$1</span>"')
            .replace(/: (\d+)/g, ': <span style="color: #67e8f9;">$1</span>')
            .replace(/: (true|false)/g, ': <span style="color: #fcd34d;">$1</span>')
            .replace(/: (null)/g, ': <span style="color: #6b7280;">$1</span>')
            .replace(/([{}[\]])/g, '<span style="color: #6b7280;">$1</span>')
        } catch (e) {
          // If JSON parsing fails, just do basic highlighting
          return code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"([^"]+)":/g, '"<span style="color: #f472b6;">$1</span>":')
            .replace(/: "([^"]+)"/g, ': "<span style="color: #6ee7b7;">$1</span>"')
            .replace(/: (\d+)/g, ': <span style="color: #67e8f9;">$1</span>')
            .replace(/: (true|false)/g, ': <span style="color: #fcd34d;">$1</span>')
            .replace(/: (null)/g, ': <span style="color: #6b7280;">$1</span>')
            .replace(/([{}[\]])/g, '<span style="color: #6b7280;">$1</span>')
        }
      }

      // For other languages, do basic highlighting
      return code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/(["'`].*?["'`])/g, '<span style="color: #fcd34d;">$1</span>')
        .replace(
          /\b(const|let|var|function|return|import|export|from|if|else|for|while|class)\b/g,
          '<span style="color: #c084fc;">$1</span>',
        )
        .replace(/\b(\d+)\b/g, '<span style="color: #67e8f9;">$1</span>')
        .replace(/(\w+)(\()/g, '<span style="color: #fcd34d;">$1</span>$2')
    }

    setHighlightedCode(highlight(code, language))
  }, [code, language])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <pre
        className={cn(
          "bg-gray-950 border border-gray-800 rounded-md p-4 overflow-x-auto text-sm text-gray-300",
          "transition-all duration-200 group-hover:border-gray-700",
        )}
      >
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={copyToClipboard}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span className="sr-only">Copy code</span>
      </Button>
    </div>
  )
}
