import { AvatarFallback } from "../components/ui/avatar"
import { AvatarImage } from "../components/ui/avatar"
import { Avatar } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Search } from "lucide-react"
import StartupGrid from "../components/startupGrid"
import UserAvatars from "../components/userAvatars"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-yellow-300 px-3 py-1 rounded-full text-sm font-medium mb-6">
              PITCH, VOTE, AND GROW
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              PITCH YOUR STARTUP,
              <br />
              CONNECT WITH ENTREPRENEURS
            </h1>

            <p className="text-white/90 mb-8">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>

            <div className="relative max-w-md mx-auto">
              <Input placeholder="SEARCH STARTUP" className="pl-4 pr-12 py-6 rounded-full bg-white/90 text-gray-800" />
              <Button size="icon" className="absolute right-1 top-1 rounded-full h-10 w-10">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-8">
          <div className="flex justify-end">
            <UserAvatars />
          </div>
        </div>
      </section>

      {/* Featured Startups */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold">Featured startups</h2>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <Avatar className="border-2 border-white">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
              </div>
              <span className="font-medium">3</span>
            </div>
          </div>

          <StartupGrid />
        </div>
      </section>
    </div>
  )
}
