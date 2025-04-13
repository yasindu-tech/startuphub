import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface StartupCardProps {
  startup: {
    id: number
    date: string
    likes: number
    founder: string
    name: string
    description: string
    image: string
    founderImage: string
    category: string
  }
}

export default function StartupCard({ startup }: StartupCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={startup.founderImage || "/placeholder.svg"} alt={startup.founder} />
              <AvatarFallback>{startup.founder[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-gray-600">{startup.founder}</p>
              <p className="font-semibold">{startup.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>{startup.date}</span>
            <div className="flex items-center gap-1 text-rose-500">
              <Heart className="h-3 w-3 fill-rose-500" />
              <span>{startup.likes}</span>
            </div>
          </div>
        </div>

        <div className="px-4 pb-2">
          <p className="text-sm text-gray-600 line-clamp-2">{startup.description}</p>
        </div>

        <div className="aspect-video relative">
          <Image src={startup.image || "/placeholder.svg"} alt={startup.name} fill className="object-cover" />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-4">
        <div className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">{startup.category}</div>

        <Link href={`/startup/${startup.id}`}>
          <Button variant="outline" size="sm">
            Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
