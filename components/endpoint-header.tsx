import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface EndpointHeaderProps {
  title: string
  description: string
  endpoint: string
  badge: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
}

export default function EndpointHeader({ title, description, endpoint, badge }: EndpointHeaderProps) {
  const badgeColors = {
    GET: "bg-emerald-500 text-black",
    POST: "bg-blue-500 text-white",
    PUT: "bg-yellow-500 text-black",
    DELETE: "bg-red-500 text-white",
    PATCH: "bg-purple-500 text-white",
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <Badge className={cn("font-medium", badgeColors[badge])}>{badge}</Badge>
      </div>
      <p className="mt-2 text-gray-400">{description}</p>
      <div className="mt-4 p-3 bg-gray-900 rounded-md border border-gray-800 font-mono text-sm text-white overflow-x-auto">
        {endpoint}
      </div>
    </div>
  )
}
