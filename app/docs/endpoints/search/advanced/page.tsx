"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CodeBlock from "@/components/code-block"
import EndpointHeader from "@/components/endpoint-header"
import ParameterTable from "@/components/parameter-table"
import ResponseExample from "@/components/response-example"
import TryItDialog from "@/components/try-it-dialog"
import { PlayCircle, ExternalLink } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import Link from "next/link"

export default function AdvancedSearchPage() {
  const [tryItOpen, setTryItOpen] = useState(false)

  return (
    <div className="container px-4 py-6 md:py-10 max-w-5xl">
      <EndpointHeader
        title="Advanced Search"
        description="Search for tweets using advanced query parameters"
        endpoint="GET /api/v1/twitter/tweets/advanced_search"
        badge="GET"
      />

      <div className="flex justify-end mt-4">
        <Button
          onClick={() => setTryItOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium shadow-lg hover:shadow-emerald-900/20"
        >
          <PlayCircle className="mr-2 h-4 w-4" />
          Try it
        </Button>
      </div>

      <Alert className="mt-6 bg-gray-900 border-gray-800 text-gray-300">
        <InfoIcon className="h-4 w-4 text-emerald-500" />
        <AlertDescription>
          <p>
            You can use Twitter's{" "}
            <Link
              href="https://x.com/search-advanced"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:underline inline-flex items-center"
            >
              Advanced Search Interface <ExternalLink className="h-3 w-3 ml-1" />
            </Link>{" "}
            to visually build complex search queries. After creating your search on Twitter, you can copy the generated
            search query from the URL or search box and use it with this API endpoint.
          </p>
        </AlertDescription>
      </Alert>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Authorization</h2>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500 text-black font-medium">X-API-Key</Badge>
                <span className="text-gray-400">string</span>
              </div>
              <Badge variant="outline" className="border-red-500 text-red-500">
                required
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Parameters</h2>
        <ParameterTable
          parameters={[
            {
              name: "query",
              type: "string",
              required: true,
              description: "Twitter search query",
            },
            {
              name: "mode",
              type: "string",
              required: false,
              description: "Search mode (Latest = 1, Top = 0)",
              enum: ["Latest", "Top"],
              defaultValue: "Latest",
            },
            {
              name: "cursor",
              type: "string",
              required: false,
              description: "Pagination cursor for fetching next page of results",
            },
          ]}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Query Syntax</h2>
        <Card className="bg-gray-900 border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-base">Common Search Operators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="grid grid-cols-12 gap-2 border-b border-gray-800 pb-2">
                <div className="col-span-3 font-mono text-emerald-500">from:username</div>
                <div className="col-span-9 text-gray-300">Tweets from a specific user</div>
              </div>
              <div className="grid grid-cols-12 gap-2 border-b border-gray-800 pb-2">
                <div className="col-span-3 font-mono text-emerald-500">to:username</div>
                <div className="col-span-9 text-gray-300">Tweets replying to a specific user</div>
              </div>
              <div className="grid grid-cols-12 gap-2 border-b border-gray-800 pb-2">
                <div className="col-span-3 font-mono text-emerald-500">"exact phrase"</div>
                <div className="col-span-9 text-gray-300">Tweets containing the exact phrase</div>
              </div>
              <div className="grid grid-cols-12 gap-2 border-b border-gray-800 pb-2">
                <div className="col-span-3 font-mono text-emerald-500">word1 OR word2</div>
                <div className="col-span-9 text-gray-300">Tweets containing either word</div>
              </div>
              <div className="grid grid-cols-12 gap-2 border-b border-gray-800 pb-2">
                <div className="col-span-3 font-mono text-emerald-500">-word</div>
                <div className="col-span-9 text-gray-300">Tweets excluding the word</div>
              </div>
              <div className="grid grid-cols-12 gap-2 border-b border-gray-800 pb-2">
                <div className="col-span-3 font-mono text-emerald-500">#hashtag</div>
                <div className="col-span-9 text-gray-300">Tweets containing a specific hashtag</div>
              </div>
              <div className="grid grid-cols-12 gap-2 border-b border-gray-800 pb-2">
                <div className="col-span-3 font-mono text-emerald-500">since:YYYY-MM-DD</div>
                <div className="col-span-9 text-gray-300">Tweets after a specific date</div>
              </div>
              <div className="grid grid-cols-12 gap-2 border-b border-gray-800 pb-2">
                <div className="col-span-3 font-mono text-emerald-500">until:YYYY-MM-DD</div>
                <div className="col-span-9 text-gray-300">Tweets before a specific date</div>
              </div>
              <div className="grid grid-cols-12 gap-2 border-b border-gray-800 pb-2">
                <div className="col-span-3 font-mono text-emerald-500">filter:media</div>
                <div className="col-span-9 text-gray-300">Tweets containing media</div>
              </div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-3 font-mono text-emerald-500">filter:links</div>
                <div className="col-span-9 text-gray-300">Tweets containing links</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Example Request</h2>
        <Tabs defaultValue="curl" className="w-full">
          <TabsList className="bg-gray-800 border-gray-700 overflow-x-auto">
            <TabsTrigger value="curl">cURL</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
          </TabsList>
          <TabsContent value="curl" className="mt-2">
            <CodeBlock
              language="bash"
              code={`curl -X GET \\
"https://api.xscraper.xyz/api/v1/twitter/tweets/advanced_search?query=from:elonmusk&mode=1" \\
-H "X-API-Key: <your-api-key>"`}
            />
          </TabsContent>
          <TabsContent value="javascript" className="mt-2">
            <CodeBlock
              language="javascript"
              code={`fetch('https://api.xscraper.xyz/api/v1/twitter/tweets/advanced_search?query=from:elonmusk&mode=1', {
method: 'GET',
headers: {
  'X-API-Key': '<your-api-key>'
}
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
            />
          </TabsContent>
          <TabsContent value="python" className="mt-2">
            <CodeBlock
              language="python"
              code={`import requests

url = "https://api.xscraper.xyz/api/v1/twitter/tweets/advanced_search"
params = {
  "query": "from:elonmusk",
  "mode": 1
}
headers = {
  "X-API-Key": "<your-api-key>"
}

response = requests.get(url, params=params, headers=headers)
data = response.json()
print(data)`}
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Response</h2>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Search Results</CardTitle>
              <Badge className="bg-gray-700">application/json</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponseExample
              code={`{
  "data": {
    "tweets": [
      {
        "id": "1722715025402413077",
        "text": "This is a sample tweet",
        "username": "elonmusk",
        "name": "Elon Musk",
        "userId": "44196397",
        "likes": 50000,
        "replies": 5000,
        "retweets": 10000,
        "views": 2000000,
        "timeParsed": "2025-04-18T15:30:00.000Z",
        "hashtags": ["sample", "tweet"],
        "mentions": [],
        "photos": [],
        "videos": [],
        "urls": [],
        "isReply": false,
        "isRetweet": false,
        "isQuoted": false
      }
    ],
    "next": "cursor_token_for_next_page",
    "previous": null
  },
  "meta": {
    "statusCode": 200,
    "timestamp": "2025-04-19T15:49:28.824Z"
  }
}`}
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Error Responses</h2>
        <Card className="bg-gray-900 border-gray-800 mb-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white text-base">401 Unauthorized</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ResponseExample
              code={`{
  "statusCode": 401,
  "timestamp": "2025-04-19T15:49:28.824Z",
  "path": "/api/v1/twitter/tweets/advanced_search",
  "method": "GET",
  "message": "Invalid or expired API key"
}`}
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white text-base">429 Too Many Requests</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ResponseExample
              code={`{
  "statusCode": 429,
  "timestamp": "2025-04-19T15:49:28.824Z",
  "path": "/api/v1/twitter/tweets/advanced_search",
  "method": "GET",
  "message": "Rate limit exceeded. Please try again later."
}`}
            />
          </CardContent>
        </Card>
      </div>

      <TryItDialog
        open={tryItOpen}
        onOpenChange={setTryItOpen}
        endpoint="/api/v1/twitter/tweets/advanced_search"
        method="GET"
        parameters={[
          {
            name: "query",
            type: "string",
            required: true,
            description: "Twitter search query",
          },
          {
            name: "mode",
            type: "string",
            required: false,
            description: "Search mode (Latest, Top)",
            defaultValue: "Latest",
          },
          {
            name: "cursor",
            type: "string",
            required: false,
            description: "Pagination cursor for fetching next page of results",
          },
        ]}
      />
    </div>
  )
}
