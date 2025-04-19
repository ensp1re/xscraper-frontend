"use client"

import { useState, useEffect } from "react"
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ResponseExampleProps {
  code: string
  maxHeight?: string
  defaultExpanded?: boolean
}

export default function ResponseExample({ code, maxHeight = "400px", defaultExpanded = true }: ResponseExampleProps) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [formattedCode, setFormattedCode] = useState<string>(code)

  useEffect(() => {
    try {
      // First check if this is TypeScript interface code rather than JSON
      if (code.includes("interface ") || code.includes("type ")) {
        // For TypeScript interfaces, use a completely different approach
        let highlighted = code

        // Apply highlighting in a specific order to avoid conflicts

        // 1. First handle comments
        highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span style="color: #6b7280;">$1</span>')

        // 2. Handle keywords
        highlighted = highlighted.replace(
          /\b(interface|type|extends|readonly|keyof|typeof|public|private|protected|static|abstract|implements|namespace|module|declare|as|is)\b/g,
          '<span style="color: #c084fc;">$1</span>',
        )

        // 3. Handle types
        highlighted = highlighted.replace(
          /\b(string|number|boolean|any|void|null|undefined|never|object|symbol|unknown|Date|Promise|Array|Record|Partial|Omit|Pick|Exclude|Extract|Required|Readonly)\b/g,
          '<span style="color: #67e8f9;">$1</span>',
        )

        // 4. Handle special characters
        highlighted = highlighted.replace(/([{}[\]<>])/g, '<span style="color: #6b7280;">$1</span>')

        // 5. Handle property names with careful regex to avoid overlapping with already highlighted parts
        highlighted = highlighted.replace(/(\w+)(\??:)/g, (match, p1, p2) => {
          // Only color the property name if it's not already colored
          if (match.includes('style="color:')) return match
          return `<span style="color: #f472b6;">${p1}</span>${p2}`
        })

        setFormattedCode(highlighted)
        return
      }

      // For JSON, use the existing approach
      if (code.trim().startsWith("{") || code.trim().startsWith("[")) {
        try {
          const parsed = JSON.parse(code)
          const formatted = JSON.stringify(parsed, null, 2)

          // Apply syntax highlighting with direct styling instead of classes
          const highlighted = formatted
            // Keys
            .replace(/"([^"]+)":/g, '<span style="color: #f472b6;">"$1"</span>:')
            // String values
            .replace(/: "([^"]+)"/g, ': <span style="color: #6ee7b7;">"$1"</span>')
            // Numbers
            .replace(/: (\d+)/g, ': <span style="color: #67e8f9;">$1</span>')
            // Booleans
            .replace(/: (true|false)/g, ': <span style="color: #fcd34d;">$1</span>')
            // null
            .replace(/: (null)/g, ': <span style="color: #6b7280;">$1</span>')
            // Brackets and braces
            .replace(/([{}[\]])/g, '<span style="color: #6b7280;">$1</span>')

          setFormattedCode(highlighted)
        } catch (jsonError) {
          // If JSON parsing fails, apply basic syntax highlighting without parsing
          console.warn("JSON parse error, applying basic highlighting:", jsonError)
          applyBasicHighlighting()
        }
      } else {
        applyBasicHighlighting()
      }
    } catch (e) {
      // If any error occurs, apply basic highlighting
      console.error("Error formatting code:", e)
      applyBasicHighlighting()
    }

    // Helper function for basic syntax highlighting without parsing
    function applyBasicHighlighting() {
      // For TypeScript interfaces, use a completely different approach
      if (code.includes("interface ") || code.includes("type ")) {
        let highlighted = code

        // Apply highlighting in a specific order to avoid conflicts

        // 1. First handle comments
        highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span style="color: #6b7280;">$1</span>')

        // 2. Handle keywords
        highlighted = highlighted.replace(
          /\b(interface|type|extends|readonly|keyof|typeof|public|private|protected|static|abstract|implements|namespace|module|declare|as|is)\b/g,
          '<span style="color: #c084fc;">$1</span>',
        )

        // 3. Handle types
        highlighted = highlighted.replace(
          /\b(string|number|boolean|any|void|null|undefined|never|object|symbol|unknown|Date|Promise|Array|Record|Partial|Omit|Pick|Exclude|Extract|Required|Readonly)\b/g,
          '<span style="color: #67e8f9;">$1</span>',
        )

        // 4. Handle special characters
        highlighted = highlighted.replace(/([{}[\]<>])/g, '<span style="color: #6b7280;">$1</span>')

        // 5. Handle property names with careful regex to avoid overlapping with already highlighted parts
        highlighted = highlighted.replace(/(\w+)(\??:)/g, (match, p1, p2) => {
          // Only color the property name if it's not already colored
          if (match.includes('style="color:')) return match
          return `<span style="color: #f472b6;">${p1}</span>${p2}`
        })

        setFormattedCode(highlighted)
        return
      }

      const highlighted = code
        // TypeScript/JavaScript-like syntax
        .replace(
          /\b(interface|type|extends|class|function|return|if|else|for|while|switch|case|break|continue|try|catch|throw|new|this|super|import|export|from|as|const|let|var)\b/g,
          '<span style="color: #c084fc;">$1</span>',
        )
        // Types
        .replace(
          /\b(string|number|boolean|any|void|null|undefined|never|object|symbol|unknown|Date|Promise|Array)\b/g,
          '<span style="color: #67e8f9;">$1</span>',
        )
        // Property names in objects
        .replace(/(\w+)(\??:)/g, '<span style="color: #f472b6;">$1</span>$2')
        // Strings
        .replace(/"([^"]*)"/g, '<span style="color: #6ee7b7;">"$1"</span>')
        // Special characters
        .replace(/([{}[\]<>])/g, '<span style="color: #6b7280;">$1</span>')
        // Comments
        .replace(/(\/\/.*$)/gm, '<span style="color: #6b7280;">$1</span>')

      setFormattedCode(highlighted)
    }
  }, [code])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 flex gap-1 z-10">
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          <span className="sr-only">{expanded ? "Collapse" : "Expand"}</span>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={copyToClipboard}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span className="sr-only">Copy response</span>
        </Button>
      </div>
      <pre
        className={cn(
          "bg-gray-950 border border-gray-800 rounded-md p-4 overflow-x-auto text-sm text-gray-300 transition-all duration-300",
          "group-hover:border-gray-700",
          expanded ? `max-h-[${maxHeight}]` : "max-h-[150px]",
          "overflow-y-auto",
        )}
      >
        <code dangerouslySetInnerHTML={{ __html: formattedCode }} />
      </pre>
    </div>
  )
}
