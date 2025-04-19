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

export default function UserInfoPage() {
  const [tryItOpen, setTryItOpen] = useState(false)

  return (
    <div className="container px-4 py-6 md:py-10 max-w-5xl">
      <EndpointHeader
        title="Get User Info"
        description="Get user info by screen name"
        endpoint="GET /twitter/users/profile_by_username/:username"
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
              name: "username",
              type: "string",
              required: true,
              description: "The screen name of the user",
            },
          ]}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Example Request</h2>
        <Tabs defaultValue="curl" className="w-full">
          <TabsList className="bg-gray-800 border-gray-700 overflow-x-auto">
            <TabsTrigger value="curl">cURL</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="php">PHP</TabsTrigger>
            <TabsTrigger value="go">Go</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
          </TabsList>
          <TabsContent value="curl" className="mt-2">
            <CodeBlock
              language="bash"
              code={`curl -X GET \\
  https://api.xscraper.xyz/twitter/users/profile_by_username/elonmusk \\
  -H "X-API-Key: <your-api-key>"`}
            />
          </TabsContent>
          <TabsContent value="javascript" className="mt-2">
            <CodeBlock
              language="javascript"
              code={`fetch('https://api.xscraper.xyz/twitter/users/profile_by_username/elonmusk', {
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

url = "https://api.xscraper.xyz/twitter/users/profile_by_username/elonmusk"
headers = {
    "X-API-Key": "<your-api-key>"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)`}
            />
          </TabsContent>
          <TabsContent value="php" className="mt-2">
            <CodeBlock
              language="php"
              code={`<?php
$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.xscraper.xyz/twitter/users/profile_by_username/elonmusk",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => [
    "X-API-Key: <your-api-key>"
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
?>`}
            />
          </TabsContent>
          <TabsContent value="go" className="mt-2">
            <CodeBlock
              language="go"
              code={`package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	url := "https://api.xscraper.xyz/twitter/users/profile_by_username/elonmusk"
	
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("X-API-Key", "<your-api-key>")
	
	res, _ := http.DefaultClient.Do(req)
	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	
	fmt.Println(string(body))
}`}
            />
          </TabsContent>
          <TabsContent value="java" className="mt-2">
            <CodeBlock
              language="java"
              code={`import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.xscraper.xyz/twitter/users/profile_by_username/elonmusk"))
                .header("X-API-Key", "<your-api-key>")
                .GET()
                .build();
                
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`}
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Response</h2>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">User Info</CardTitle>
              <Badge className="bg-gray-700">application/json</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponseExample
              code={`{
  "data": {
    "avatar": "https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_400x400.jpg",
    "banner": "https://pbs.twimg.com/profile_banners/44196397/1576183471/1500x500",
    "biography": "Nothing",
    "birthday": null,
    "followersCount": 181293000,
    "followingCount": 150,
    "friendsCount": 150,
    "mediaCount": 3950,
    "statusesCount": 35000,
    "isPrivate": false,
    "isVerified": true,
    "isBlueVerified": true,
    "joined": "2009-06-02T20:12:29.000Z",
    "likesCount": 21300,
    "listedCount": 150000,
    "location": "Mars",
    "name": "Elon Musk",
    "pinnedTweetIds": ["1722715025402413077"],
    "tweetsCount": 35000,
    "url": "https://twitter.com/elonmusk",
    "userId": "44196397",
    "username": "elonmusk",
    "website": "https://x.com",
    "canDm": false
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
  "path": "/api/v1/twitter/users/profile_by_username/elonmusk",
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
  "path": "/api/v1/twitter/users/profile_by_username/nonexistentuser",
  "method": "GET",
  "message": "Profile not found"
}`}
            />
          </CardContent>
        </Card>
      </div>

      <TryItDialog
        open={tryItOpen}
        onOpenChange={setTryItOpen}
        endpoint="/twitter/users/profile_by_username/:username"
        method="GET"
        parameters={[
          {
            name: "username",
            type: "string",
            required: true,
            description: "The screen name of the user",
          },
        ]}
      />
    </div>
  )
}
