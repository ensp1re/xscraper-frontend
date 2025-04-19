import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function IntroductionPage() {
  return (
    <div className="container px-4 py-6 md:py-10 max-w-5xl">
      <h1 className="text-3xl font-bold text-white mb-6">Introduction to XScraper API</h1>

      <Alert className="bg-amber-950 border-amber-900 text-amber-200 mb-8">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <AlertTitle className="text-amber-500">Development Notice</AlertTitle>
        <AlertDescription className="text-amber-300">
          The XScraper dashboard is still in development. API keys cannot be delivered at this time.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">What is XScraper?</h2>
          <p className="text-gray-300 mb-4">
            XScraper is a powerful API designed to extract and analyze data from Twitter. It provides developers with
            easy access to user profiles, tweets, followers, and more, without the need for official API access.
          </p>
          <p className="text-gray-300 mb-4">
            Whether you're building a social media analytics tool, conducting research, or creating a Twitter-based
            application, XScraper provides the data you need with simple, RESTful API endpoints.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white mb-1">Comprehensive User Data</h3>
                    <p className="text-gray-400">
                      Access detailed user profiles including followers, following, and engagement metrics.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white mb-1">Tweet Content & Metadata</h3>
                    <p className="text-gray-400">
                      Retrieve tweets with full content, media, engagement metrics, and conversation context.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white mb-1">Advanced Search</h3>
                    <p className="text-gray-400">
                      Find specific tweets using powerful search queries with filtering options.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white mb-1">Pagination Support</h3>
                    <p className="text-gray-400">
                      Easily navigate through large datasets with cursor-based pagination.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Getting Started</h2>
          <p className="text-gray-300 mb-4">
            To use the XScraper API, you'll need an API key. Once the dashboard is available, you can sign up and obtain
            your API key to start making requests.
          </p>
          <p className="text-gray-300 mb-6">
            All API requests require authentication using the{" "}
            <code className="bg-gray-800 px-1 rounded">X-API-Key</code> header. Check out our{" "}
            <Link href="/docs/authentication" className="text-emerald-500 hover:underline">
              Authentication
            </Link>{" "}
            guide for more details.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-black">
              <Link href="/docs/authentication">Authentication Guide</Link>
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="outline"
                    className="border-emerald-500 text-emerald-500 hover:bg-emerald-950"
                  >
                    <Link href="/docs/get-started">Get API Key</Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-900 border-gray-800 text-white">
                  <p>Dashboard in development</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Example Use Cases</h2>
          <div className="space-y-4">
            <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
              <h3 className="text-lg font-medium text-emerald-500 mb-2">Social Media Analytics</h3>
              <p className="text-gray-300">
                Track user engagement, analyze tweet performance, and monitor social media presence over time.
              </p>
            </div>

            <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
              <h3 className="text-lg font-medium text-emerald-500 mb-2">Competitive Research</h3>
              <p className="text-gray-300">
                Monitor competitors' social media activity, engagement rates, and content strategy.
              </p>
            </div>

            <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
              <h3 className="text-lg font-medium text-emerald-500 mb-2">Content Aggregation</h3>
              <p className="text-gray-300">
                Build applications that aggregate and display tweets based on specific topics, hashtags, or users.
              </p>
            </div>

            <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
              <h3 className="text-lg font-medium text-emerald-500 mb-2">Academic Research</h3>
              <p className="text-gray-300">
                Collect Twitter data for research purposes, sentiment analysis, and social network studies.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">API Endpoints</h2>
          <p className="text-gray-300 mb-6">
            XScraper provides a variety of endpoints organized into the following categories:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/docs/endpoints/users"
              className="bg-gray-900 p-5 rounded-lg border border-gray-800 hover:border-emerald-800 transition-colors"
            >
              <h3 className="text-lg font-medium text-emerald-500 mb-2">User Endpoints</h3>
              <p className="text-gray-300">Access user profiles, tweets, followers, and following lists.</p>
            </Link>

            <Link
              href="/docs/endpoints/tweets"
              className="bg-gray-900 p-5 rounded-lg border border-gray-800 hover:border-emerald-800 transition-colors"
            >
              <h3 className="text-lg font-medium text-emerald-500 mb-2">Tweet Endpoints</h3>
              <p className="text-gray-300">Retrieve individual tweets, replies, quotes, and retweets.</p>
            </Link>

            <Link
              href="/docs/endpoints/search"
              className="bg-gray-900 p-5 rounded-lg border border-gray-800 hover:border-emerald-800 transition-colors"
            >
              <h3 className="text-lg font-medium text-emerald-500 mb-2">Search Endpoints</h3>
              <p className="text-gray-300">Search for tweets using advanced query parameters.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
