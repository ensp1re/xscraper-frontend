"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"


interface TryItDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  endpoint: string
  method: string
  parameters?: Array<{
    name: string
    type: string
    required: boolean
    description: string
    defaultValue?: string
  }>
}

export default function TryItDialog({ open, onOpenChange, endpoint, method, parameters = [] }: TryItDialogProps) {
  const [apiKey, setApiKey] = useState("")
  const [paramValues, setParamValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)
  const responseRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const [codeLanguage, setCodeLanguage] = useState<"curl" | "python" | "javascript" | "php" | "go" | "java">("curl")
  const [authSectionOpen, setAuthSectionOpen] = useState(true)
  const [querySectionOpen, setQuerySectionOpen] = useState(true)
  const [statusCode, setStatusCode] = useState<number | null>(200)

  // Format endpoint with parameters
  const formatEndpoint = (endpoint: string, paramValues: Record<string, string>) => {
    let formattedEndpoint = endpoint

    // Ensure endpoint starts with /api/v1/twitter
    if (!formattedEndpoint.startsWith("/api/v1/twitter")) {
      if (formattedEndpoint.startsWith("/twitter")) {
        formattedEndpoint = "/api/v1" + formattedEndpoint
      } else {
        formattedEndpoint =
          "/api/v1/twitter" + (formattedEndpoint.startsWith("/") ? formattedEndpoint : "/" + formattedEndpoint)
      }
    }

    // Replace path parameters (e.g., :userId) with their values
    Object.keys(paramValues).forEach((param) => {
      if (formattedEndpoint.includes(`:${param}`)) {
        formattedEndpoint = formattedEndpoint.replace(`:${param}`, paramValues[param] || `:${param}`)
      }
    })

    // Add query parameters for those that don't appear in the path
    const queryParams = Object.keys(paramValues)
      .filter((param) => !endpoint.includes(`:${param}`) && paramValues[param])
      .map((param) => {
        // Special handling for advanced search mode parameter
        if (param === "mode" && endpoint.includes("advanced_search")) {
          // Convert mode string to numeric value (Latest = 1, Top = 0)
          const modeValue = paramValues[param] === "Latest" ? "1" : "0"
          return `${param}=${modeValue}`
        }
        return `${param}=${encodeURIComponent(paramValues[param])}`
      })

    if (queryParams.length > 0) {
      formattedEndpoint += `?${queryParams.join("&")}`
    }

    return formattedEndpoint
  }

  // Generate code snippet based on selected language
  const generateCodeSnippet = () => {
    const formattedEndpoint = formatEndpoint(endpoint, paramValues)
    const apiUrl = `https://api.xscraper.xyz${formattedEndpoint}`

    switch (codeLanguage) {
      case "curl":
        return `curl --request ${method} \\
--url '${apiUrl}' \\
--header 'X-API-Key: ${apiKey || "<your-api-key>"}'`
      case "python":
        return `import requests

url = "${apiUrl}"
headers = {
  "X-API-Key": "${apiKey || "<your-api-key>"}"
}

response = requests.${method.toLowerCase()}(url, headers=headers)
data = response.json()
print(data)`
      case "javascript":
        return `// Using fetch API
fetch('${apiUrl}', {
  method: '${method}',
  headers: {
    'X-API-Key': '${apiKey || "<your-api-key>"}',
    'Accept': 'application/json'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error(\`HTTP error! Status: \${response.status}\`);
  }
  return response.json();
})
.then(data => {
  console.log('Success:', data);
})
.catch(error => {
  console.error('Error:', error);
});`
      case "php":
        return `<?php
$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "${apiUrl}",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => [
    "X-API-Key: ${apiKey || "<your-api-key>"}"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
?>`
      case "go":
        return `package main

import (
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "${apiUrl}"

  req, _ := http.NewRequest("${method}", url, nil)
  req.Header.Add("X-API-Key", "${apiKey || "<your-api-key>"}")

  res, _ := http.DefaultClient.Do(req)
  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)

  fmt.Println(string(body))
}`
      case "java":
        return `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class Main {
  public static void main(String[] args) throws Exception {
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create("${apiUrl}"))
      .header("X-API-Key", "${apiKey || "<your-api-key>"}")
      .${method.toLowerCase()}()
      .build();
        
    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    System.out.println(response.body());
  }
}`
      default:
        return ""
    }
  }

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true)
    setResponse(null)
    setError(null)
    setStatusCode(null)

    if (!apiKey) {
      setLoading(false)
      setError("API key is required")
      return
    }

    // Check if required parameters are provided
    const missingParams = parameters
      .filter((param) => param.required && !paramValues[param.name])
      .map((param) => param.name)

    if (missingParams.length > 0) {
      setLoading(false)
      setError(`Required parameters missing: ${missingParams.join(", ")}`)
      return
    }

    // Get the formatted endpoint for the API call
    const formattedEndpoint = formatEndpoint(endpoint, paramValues)
    const apiUrl = `https://api.xscraper.xyz${formattedEndpoint}`

    try {
      // Make the actual API call
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          "X-API-Key": apiKey,
          "Content-Type": "application/json",
        },
      })

      // Get status code
      setStatusCode(response.status)

      // Try to parse as JSON first
      let responseData
      const responseText = await response.text()

      try {
        // Try to parse as JSON
        responseData = JSON.parse(responseText)
        setResponse(JSON.stringify(responseData, null, 2))
      } catch (e) {
        // If not JSON, just use the text
        setResponse(responseText)
      }

      // If response is not ok, set error message but still show the response
      if (!response.ok) {
        setError(`Request failed with status: ${response.status}`)
      }
    } catch (err) {
      // Network or other errors
      setError(`Request failed: ${err instanceof Error ? err.message : String(err)}`)
      setStatusCode(0) // Use 0 to indicate network error
    } finally {
      setLoading(false)
    }
  }

  const handleParamChange = (name: string, value: string) => {
    setParamValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copied to clipboard",
        description: "Response has been copied to your clipboard",
        duration: 2000,
      })
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(generateCodeSnippet())
    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 2000)
    toast({
      title: "Copied to clipboard",
      description: "Code snippet has been copied to your clipboard",
      duration: 2000,
    })
  }

  // Format JSON response for display with syntax highlighting
  const formatJsonResponse = (responseText: string) => {
    try {
      // Try to parse as JSON for highlighting
      const obj = JSON.parse(responseText)
      const formatted = JSON.stringify(obj, null, 2)

      // Apply syntax highlighting with colors matching IDE
      return formatted
        .replace(/"([^"]+)":/g, '"<span style="color: #ec4899;">$1</span>":')
        .replace(/: "([^"]+)"/g, ': "<span style="color: #22c55e;">$1</span>"')
        .replace(/: (\d+)/g, ': <span style="color: #3b82f6;">$1</span>')
        .replace(/: (true|false)/g, ': <span style="color: #f59e0b;">$1</span>')
        .replace(/: (null)/g, ': <span style="color: #6b7280;">$1</span>')
    } catch (e) {
      // If not valid JSON, return as plain text
      return responseText.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
  }

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      // Wait for dialog close animation before resetting
      const timeout = setTimeout(() => {
        setResponse(null)
        setError(null)
        setLoading(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [open])

  // Scroll to response when it's available
  useEffect(() => {
    if (response && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [response])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle hidden className="text-lg font-semibold text-gray-300">
        Try It Out
      </DialogTitle>
      <DialogContent className="max-w-[1200px] p-0 bg-gray-950 border-gray-800 text-white overflow-hidden rounded-lg mx-1">
        <div className="flex flex-col w-full max-h-[90vh] overflow-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-800 sticky top-0 bg-gray-950 z-10">
            <div className="flex items-center space-x-4 flex-1 min-w-0 mr-4">
              <div className="flex-shrink-0 flex items-center justify-center h-8 w-16 rounded bg-gray-900 border border-gray-800">
                <Badge className="bg-emerald-500 text-black font-medium">{method}</Badge>
              </div>
              <div className="text-sm text-gray-300 font-mono truncate">{endpoint}</div>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-shrink-0 bg-emerald-500 hover:bg-emerald-600 text-black font-medium px-6"
            >
              Send {loading && <span className="ml-2 animate-spin">⟳</span>}
            </Button>
          </div>

          {/* Description */}
          <div className="px-5 py-3 text-sm text-gray-400 border-b border-gray-800">
            {endpoint.includes("tweet/replies")
              ? "Get tweet replies by tweet id. Each page returns exactly 20 replies. Use cursor for pagination. Order by reply time desc"
              : "Make a request to this endpoint to retrieve data."}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left panel - Parameters */}
            <div className="border-r border-gray-800 p-5">
              {/* Authorization Section */}
              <div className="mb-5 border border-gray-800 rounded-md overflow-hidden">
                <button
                  className="w-full px-5 py-3 flex items-center justify-between text-left bg-gray-900"
                  onClick={() => setAuthSectionOpen(!authSectionOpen)}
                >
                  <div className="flex items-center gap-2">
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${authSectionOpen ? "rotate-0" : "-rotate-90"}`}
                    />
                    <span className="font-medium">Authorization</span>
                  </div>
                </button>

                {authSectionOpen && (
                  <div className="p-5 bg-gray-950">
                    <div className="grid grid-cols-1 gap-4 items-start">
                      <div>
                        <div className="text-sm font-medium text-gray-300 mb-1">X-API-Key</div>
                        <div className="flex items-center mb-2">
                          <span className="text-xs text-gray-500 mr-2">string</span>
                          <span className="text-xs text-red-500">required</span>
                        </div>
                        <Input
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          placeholder="Enter your API key"
                          className="w-full bg-gray-900 border-gray-800 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Query Parameters Section */}
              <div className="border border-gray-800 rounded-md overflow-hidden">
                <button
                  className="w-full px-5 py-3 flex items-center justify-between text-left bg-gray-900"
                  onClick={() => setQuerySectionOpen(!querySectionOpen)}
                >
                  <div className="flex items-center gap-2">
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${querySectionOpen ? "rotate-0" : "-rotate-90"}`}
                    />
                    <span className="font-medium">Query Parameters</span>
                  </div>
                </button>

                {querySectionOpen && (
                  <div className="p-5 bg-gray-950 space-y-5">
                    {parameters.length > 0 ? (
                      parameters.map((param) => (
                        <div key={param.name} className="space-y-2">
                          <div>
                            <div className="text-sm font-medium text-gray-300">{param.name}</div>
                            <div className="flex items-center mt-1 mb-2">
                              <span className="text-xs text-gray-500 mr-2">{param.type}</span>
                              {param.required && <span className="text-xs text-red-500">required</span>}
                            </div>
                          </div>
                          <div className="space-y-2">
                            {param.name === "mode" ? (
                              <div className="relative">
                                <select
                                  className="w-full bg-gray-900 border-gray-800 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 text-gray-300 text-sm rounded-md px-3 py-2 appearance-none"
                                  value={paramValues[param.name] || ""}
                                  onChange={(e) => handleParamChange(param.name, e.target.value)}
                                >
                                  <option value="Latest">Latest</option>
                                  <option value="Top">Top</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                              </div>
                            ) : (
                              <Input
                                placeholder={param.defaultValue || `Enter ${param.name}`}
                                className="w-full bg-gray-900 border-gray-800 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                                onChange={(e) => handleParamChange(param.name, e.target.value)}
                              />
                            )}
                            {param.description && <p className="text-xs text-gray-400">{param.description}</p>}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-400">No parameters required for this endpoint.</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right panel - Code and Response */}
            <div className="flex flex-col">
              {/* Code tabs */}
              <div className="border-b border-gray-800 bg-gray-950">
                <div className="flex overflow-x-auto">
                  {["curl", "python", "javascript", "php", "go", "java"].map((lang) => (
                    <button
                      key={lang}
                      className={cn(
                        "px-5 py-3 text-sm font-medium transition-colors",
                        codeLanguage === lang ? "text-emerald-500" : "text-gray-400 hover:text-gray-300",
                      )}
                      onClick={() => setCodeLanguage(lang as any)}
                    >
                      {lang === "curl"
                        ? "cURL"
                        : lang === "javascript"
                          ? "JavaScript"
                          : lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                  <div className="ml-auto p-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
                      onClick={copyCode}
                    >
                      {codeCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span className="sr-only">Copy code</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Code snippet */}
              <div className="p-5 border-b border-gray-800 overflow-x-auto bg-gray-950">
                <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                  <code>{generateCodeSnippet()}</code>
                </pre>
              </div>

              {/* Response section */}
              <div className="flex flex-col flex-1">
                {/* Response header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800 bg-gray-950">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={cn(
                        "font-medium",
                        statusCode && statusCode >= 200 && statusCode < 300
                          ? "bg-emerald-500 text-black"
                          : statusCode && statusCode >= 400
                            ? "bg-red-500 text-white"
                            : "bg-yellow-500 text-black",
                      )}
                    >
                      {statusCode || 200}
                    </Badge>
                    <span className="text-sm text-gray-400">
                      {statusCode && statusCode >= 200 && statusCode < 300
                        ? "Success"
                        : statusCode && statusCode >= 400
                          ? "Error"
                          : "Warning"}
                    </span>
                  </div>
                  {response && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
                      onClick={copyResponse}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span className="sr-only">Copy response</span>
                    </Button>
                  )}
                </div>

                {/* Response content */}
                <div className="p-5 bg-gray-950 overflow-auto" ref={responseRef}>
                  {error ? <div className="mb-3 text-red-400 text-sm">{error}</div> : null}

                  {response ? (
                    <pre className="text-sm text-gray-300 font-mono">
                      <code dangerouslySetInnerHTML={{ __html: formatJsonResponse(response) }} />
                    </pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-500 text-sm">
                      <div>Send a request to see the response</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
