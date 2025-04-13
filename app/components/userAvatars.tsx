import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserAvatars() {
  return (
    <div className="flex -space-x-2">
      <Avatar className="border-2 border-white bg-purple-500">
        <AvatarImage src="/placeholder.svg?height=40&width=40" />
        <AvatarFallback>S</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-white bg-orange-500">
        <AvatarImage src="/placeholder.svg?height=40&width=40" />
        <AvatarFallback>O</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-white bg-blue-500">
        <AvatarImage src="/placeholder.svg?height=40&width=40" />
        <AvatarFallback>B</AvatarFallback>
      </Avatar>
    </div>
  )
}
