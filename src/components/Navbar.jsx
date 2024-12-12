import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Code2 } from 'lucide-react'


export default function Navbar({ selectedVersion, setSelectedVersion }) {
    return (
        <nav className="bg-background border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Code2 className="h-6 w-6" />
                    <span className="text-xl font-bold">E-Commerce API</span>
                </div>
                <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="express">Express.js</SelectItem>
                        <SelectItem value="nestjs">NestJS</SelectItem>
                        <SelectItem value="go">Go</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </nav>
    )
}

