import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export default function Home() {
  return (
    <div className="container px-4 mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">XScraper Twitter API</h1>
        <p className="text-lg mb-8 text-gray-300">Powerful API for scraping and analyzing Twitter data</p>

        <Alert className="bg-amber-950 border-amber-900 text-amber-200 mb-8 mx-auto max-w-xl">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-300">
            The XScraper dashboard is still in development. API keys cannot be delivered at this time.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-black">
            <Link href="/docs/introduction">Get Started</Link>
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-950">
                  <Link href="/docs/get-started">Start Now</Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 border-gray-800 text-white">
                <p>Dashboard in development</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12 md:mt-16">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-3 text-emerald-500">User Data</h2>
          <p className="text-gray-300 mb-4">Access comprehensive user profiles, tweets, followers, and more.</p>
          <Button asChild variant="link" className="text-emerald-500 p-0 hover:text-emerald-400">
            <Link href="/docs/endpoints/users">Explore User Endpoints →</Link>
          </Button>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-3 text-emerald-500">Tweet Data</h2>
          <p className="text-gray-300 mb-4">Retrieve tweets, replies, quotes, and analyze tweet content.</p>
          <Button asChild variant="link" className="text-emerald-500 p-0 hover:text-emerald-400">
            <Link href="/docs/endpoints/tweets">Explore Tweet Endpoints →</Link>
          </Button>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-3 text-emerald-500">Search</h2>
          <p className="text-gray-300 mb-4">Powerful search capabilities to find specific tweets and users.</p>
          <Button asChild variant="link" className="text-emerald-500 p-0 hover:text-emerald-400">
            <Link href="/docs/endpoints/search">Explore Search Endpoints →</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
