import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import StartupGrid from "../components/startupGrid"
import { auth } from "@/auth"

export default async function ProfilePage() {

    const session = await auth()
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div className="relative">
          <div className="bg-emerald-600 rounded-lg p-6 text-center relative">
            <div className="absolute -top-2 -left-2 bg-black text-white px-3 py-1 rounded-lg font-bold">
              {session?.user ? session.user.name : "Guest"}
            </div>

            <div className="mt-6 mb-4 relative inline-block">
              <Avatar className="h-32 w-32 mx-auto border-4 border-white">
                <AvatarImage src={session?.user?.image ?? ""} alt="Alex Johnson" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </div>

            <h2 className="text-white font-bold text-xl">{session?.user ? session.user.name : "Guest"}</h2>
            <p className="text-emerald-100 text-sm mt-2">Startup Enthusiast & Educator</p>
          </div>
        </div>

        <div>
          <StartupGrid />
        </div>
      </div>
    </div>
  )
}
