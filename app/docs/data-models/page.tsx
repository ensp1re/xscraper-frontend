import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CodeBlock from "@/components/code-block"

export default function DataModelsPage() {
  return (
    <div className="container px-4 py-10 max-w-5xl">
      <h1 className="text-3xl font-bold text-white mb-6">Data Models</h1>
      <p className="text-gray-400 mb-8">This page describes the data structures returned by the XScraper API.</p>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Profile</h2>
          <p className="text-gray-400 mb-4">The Profile object contains information about a Twitter user.</p>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="typescript"
                code={`interface Profile {
  avatar?: string;
  banner?: string;
  biography?: string;
  birthday?: string;
  followersCount?: number;
  followingCount?: number;
  friendsCount?: number;
  mediaCount?: number;
  statusesCount?: number;
  isPrivate?: boolean;
  isVerified?: boolean;
  isBlueVerified?: boolean;
  joined?: Date;
  likesCount?: number;
  listedCount?: number;
  location: string;
  name?: string;
  pinnedTweetIds?: string[];
  tweetsCount?: number;
  url?: string;
  userId?: string;
  username?: string;
  website?: string;
  canDm?: boolean;
}`}
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Tweet</h2>
          <p className="text-gray-400 mb-4">The Tweet object contains information about a Twitter tweet.</p>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Tweet</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="typescript"
                code={`interface Tweet {
  bookmarkCount?: number;
  conversationId?: string;
  hashtags: string[];
  html?: string;
  id?: string;
  inReplyToStatus?: Tweet;
  inReplyToStatusId?: string;
  isQuoted?: boolean;
  isPin?: boolean;
  isReply?: boolean;
  isRetweet?: boolean;
  isSelfThread?: boolean;
  likes?: number;
  name?: string;
  mentions: Mention[];
  permanentUrl?: string;
  photos: Photo[];
  place?: PlaceRaw;
  quotedStatus?: Tweet;
  quotedStatusId?: string;
  replies?: number;
  retweets?: number;
  retweetedStatus?: Tweet;
  retweetedStatusId?: string;
  text?: string;
  thread: Tweet[];
  timeParsed?: Date;
  timestamp?: number;
  urls: string[];
  userId?: string;
  username?: string;
  videos: Video[];
  views?: number;
  sensitiveContent?: boolean;
  poll?: PollV2 | null;
}`}
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Mention</h2>
          <p className="text-gray-400 mb-4">
            The Mention object contains information about a user mentioned in a tweet.
          </p>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Mention</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="typescript"
                code={`interface Mention {
  id: string;
  username?: string;
  name?: string;
}`}
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Photo</h2>
          <p className="text-gray-400 mb-4">The Photo object contains information about a photo attached to a tweet.</p>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="typescript"
                code={`interface Photo {
  id: string;
  url: string;
  alt_text: string | undefined;
}`}
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Video</h2>
          <p className="text-gray-400 mb-4">The Video object contains information about a video attached to a tweet.</p>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Video</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="typescript"
                code={`interface Video {
  id: string;
  preview: string;
  url?: string;
}`}
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Place</h2>
          <p className="text-gray-400 mb-4">
            The Place object contains information about a location tagged in a tweet.
          </p>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Place</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="typescript"
                code={`interface PlaceRaw {
  id?: string;
  place_type?: string;
  name?: string;
  full_name?: string;
  country_code?: string;
  country?: string;
  bounding_box?: {
    type?: string;
    coordinates?: number[][][];
  };
}`}
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Poll</h2>
          <p className="text-gray-400 mb-4">The Poll object contains information about a poll attached to a tweet.</p>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Poll</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="typescript"
                code={`interface PollData {
  id?: string;
  end_datetime?: string;
  voting_status?: string;
  duration_minutes: number;
  options: PollOption[];
}

interface PollOption {
  position?: number;
  label: string;
  votes?: number;
}`}
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Response Formats</h2>
          <p className="text-gray-400 mb-4">The API returns data in the following formats:</p>

          <h3 className="text-lg font-semibold mb-3 text-emerald-500">Success Response</h3>
          <Card className="bg-gray-900 border-gray-800 mb-6">
            <CardContent className="pt-4">
              <CodeBlock
                language="json"
                code={`{
  "data": {
    // Response data here
  },
  "meta": {
    "statusCode": 200, // HTTP status code
    "timestamp": "2025-04-19T15:49:28.824Z" // Response timestamp
  }
}`}
              />
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold mb-3 text-emerald-500">Error Response</h3>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-4">
              <CodeBlock
                language="json"
                code={`{
  "statusCode": 401, // HTTP status code
  "timestamp": "2025-04-19T15:49:28.824Z", // Response timestamp
  "path": "/api/v1/twitter/users/following/154800500438809805", // Request path
  "method": "GET", // HTTP method
  "message": "Invalid or expired API key" // Error message
}`}
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Paginated Responses</h2>
          <p className="text-gray-400 mb-4">Some endpoints return paginated results with next/previous cursors:</p>

          <h3 className="text-lg font-semibold mb-3 text-emerald-500">QueryTweetsResponse</h3>
          <Card className="bg-gray-900 border-gray-800 mb-6">
            <CardContent className="pt-4">
              <CodeBlock
                language="typescript"
                code={`interface QueryTweetsResponse {
  tweets: Tweet[];
  next?: string; // Cursor for the next page
  previous?: string; // Cursor for the previous page
}`}
              />
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold mb-3 text-emerald-500">QueryProfilesResponse</h3>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-4">
              <CodeBlock
                language="typescript"
                code={`interface QueryProfilesResponse {
  profiles: Profile[];
  next?: string; // Cursor for the next page
  previous?: string; // Cursor for the previous page
}`}
              />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
