import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import CodeBlock from "@/components/code-block"

export default function AuthenticationPage() {
  return (
    <div className="container px-4 py-10 max-w-5xl">
      <h1 className="text-3xl font-bold text-white mb-6">Authentication</h1>
      <p className="text-gray-400 mb-8">
        The XScraper API uses API keys to authenticate requests. You can obtain an API key by signing up on our website.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">API Key Authentication</h2>
          <p className="text-gray-400 mb-4">
            All API requests must include your API key in the{" "}
            <code className="bg-gray-800 px-1 rounded">X-API-Key</code> header.
          </p>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Example Request with API Key</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`curl -X GET \\
https://api.xscraper.xyz/api/v1/twitter/users/profile_by_username/elonmusk \\
-H "X-API-Key: your_api_key_here"`}
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Rate Limiting</h2>
          <p className="text-gray-400 mb-4">
            API requests are rate-limited based on your subscription plan. If you exceed your rate limit, you'll receive
            a 429 Too Many Requests response.
          </p>
          <Alert className="bg-amber-950 border-amber-900 text-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertTitle className="text-amber-500">Rate Limit Warning</AlertTitle>
            <AlertDescription className="text-amber-300">
              If you exceed your rate limit, your requests will be throttled. Upgrade your plan for higher limits.
            </AlertDescription>
          </Alert>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Error Responses</h2>
          <p className="text-gray-400 mb-4">
            If your API key is invalid or expired, you'll receive a 401 Unauthorized response.
          </p>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">401 Unauthorized Response</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
"statusCode": 401,
"timestamp": "2025-04-19T15:49:28.824Z",
"path": "/api/v1/twitter/users/profile_by_username/elonmusk",
"method": "GET",
"message": "Invalid or expired API key"
}`}
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Securing Your API Key</h2>
          <p className="text-gray-400 mb-4">
            Your API key grants access to your account and should be kept secure. Follow these best practices:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Never share your API key in public repositories or client-side code</li>
            <li>Use environment variables to store your API key in your applications</li>
            <li>Rotate your API key periodically for enhanced security</li>
            <li>Set up IP restrictions for your API key in your account settings</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
