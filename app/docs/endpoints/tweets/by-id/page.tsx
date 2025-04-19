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
import { PlayCircle } from "lucide-react"

export default function TweetByIdPage() {
  const [tryItOpen, setTryItOpen] = useState(false)

  return (
    <div className="container px-4 py-6 md:py-10 max-w-5xl">
      <EndpointHeader
        title="Get Tweet by ID"
        description="Get a specific tweet by its ID"
        endpoint="GET /api/v1/twitter/tweets/:tweetId"
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
              name: "tweetId",
              type: "string",
              required: true,
              description: "The ID of the tweet to retrieve",
            },
          ]}
        />
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
"https://api.xscraper.xyz/api/v1/twitter/tweets/1722715025402413077" \\
-H "X-API-Key: <your-api-key>"`}
            />
          </TabsContent>
          <TabsContent value="javascript" className="mt-2">
            <CodeBlock
              language="javascript"
              code={`fetch('https://api.xscraper.xyz/api/v1/twitter/tweets/1722715025402413077', {
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

url = "https://api.xscraper.xyz/api/v1/twitter/tweets/1722715025402413077"
headers = {
  "X-API-Key": "<your-api-key>"
}

response = requests.get(url, headers=headers)
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
              <CardTitle className="text-white">Tweet</CardTitle>
              <Badge className="bg-gray-700">application/json</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponseExample
              code={`{
  "data": {
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
    "photos": [
      {
        "id": "1722715025402413078",
        "url": "https://pbs.twimg.com/media/sample-image.jpg",
        "alt_text": "Sample image description"
      }
    ],
    "videos": [],
    "urls": [],
    "isReply": false,
    "isRetweet": false,
    "isQuoted": false,
    "html": "<p>This is a sample tweet</p><p>#sample #tweet</p>"
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
  "path": "/api/v1/twitter/tweets/1722715025402413077",
  "method": "GET",
  "message": "Invalid or expired API key"
}`}
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white text-base">404 Not Found</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ResponseExample
              code={`{
  "statusCode": 404,
  "timestamp": "2025-04-19T15:49:28.824Z",
  "path": "/api/v1/twitter/tweets/nonexistenttweetid",
  "method": "GET",
  "message": "Tweet not found"
}`}
            />
          </CardContent>
        </Card>
      </div>

      <TryItDialog
        open={tryItOpen}
        onOpenChange={setTryItOpen}
        endpoint="/api/v1/twitter/tweets/:tweetId"
        method="GET"
        parameters={[
          {
            name: "tweetId",
            type: "string",
            required: true,
            description: "The ID of the tweet to retrieve",
          },
        ]}
      />
    </div>
  )
}
