import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Parameter {
  name: string
  type: string
  required: boolean
  description: string
  defaultValue?: string
  enum?: string[]
}

interface ParameterTableProps {
  parameters: Parameter[]
}

export default function ParameterTable({ parameters }: ParameterTableProps) {
  return (
    <Table className="border border-gray-800 rounded-md overflow-hidden">
      <TableHeader className="bg-gray-900">
        <TableRow className="border-gray-800">
          <TableHead className="text-white">Name</TableHead>
          <TableHead className="text-white">Type</TableHead>
          <TableHead className="text-white">Required</TableHead>
          <TableHead className="text-white">Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parameters.map((param, index) => (
          <TableRow key={index} className={`border-gray-800 ${index % 2 === 0 ? "bg-gray-900" : "bg-gray-950"}`}>
            <TableCell className="font-mono text-emerald-500">{param.name}</TableCell>
            <TableCell className="text-gray-300">{param.type}</TableCell>
            <TableCell>
              {param.required ? (
                <Badge variant="outline" className="border-red-500 text-red-500">
                  required
                </Badge>
              ) : (
                <Badge variant="outline" className="border-gray-500 text-gray-500">
                  optional
                </Badge>
              )}
            </TableCell>
            <TableCell className="text-gray-300">
              <div>
                {param.description}
                {param.defaultValue && (
                  <div className="mt-1 text-sm text-gray-400">
                    Default: <code className="bg-gray-800 px-1 rounded">{param.defaultValue}</code>
                  </div>
                )}
                {param.enum && (
                  <div className="mt-1 text-sm text-gray-400">
                    Allowed values:{" "}
                    {param.enum.map((value, i) => (
                      <code key={i} className="bg-gray-800 px-1 rounded mx-1">
                        {value}
                      </code>
                    ))}
                  </div>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
