import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import StartupCard from "@/app/components/startupCard"

interface PageProps {
  params: {
    id: string
  }
}

export default function StartupDetailPage({ params }: PageProps) {
  // Mock data for the startup detail
  const startup = {
    id: params.id,
    title: "JSM ACADEMY MASTERCLASS",
    date: "OCTOBER 3, 2023",
    description:
      "An online platform offering project-based learning for web developers, aimed at leveling up junior to mid-level developers by focusing on real-world applications.",
    image: "/placeholder.svg?height=300&width=600",
    founder: {
      name: "Adrian Hajdin",
      title: "JS Mastery",
      username: "@adrianhajdin",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    category: "Education",
    rating: 4.9,
    reviews: 1745,
    students: 23000,
    pitchDetails: `
      EcoCart is an innovative e-commerce platform designed for eco-conscious shoppers looking to make a positive environmental impact with their purchases.
      
      We connect users with local businesses that offer eco-friendly, sustainable products across categories like home goods, fashion, beauty, and more.
      
      By partnering with small and medium-sized enterprises committed to sustainable practices, we reduce carbon footprints and promote greener consumer choices.
      
      Our platform not only helps users find ethically sourced and environmentally responsible products but also offers features like carbon offset tracking, green certifications, and personalized sustainability goals.
      
      EcoCart is built to encourage mindful shopping, making it easier for people to make smart, support local communities, and contribute to a more sustainable future.
      
      Our mission is simple: Shop better, live better, and create a greener world—one purchase at a time.
    `,
  }

  // Mock data for similar startups
  const similarStartup = {
    id: 101,
    date: "20 May, 2023",
    likes: 232,
    founder: "Olivia Chen",
    name: "Genovate",
    description: "A mobile app that helps train users and promotes sustainable habits.",
    image: "/placeholder.svg?height=200&width=300",
    founderImage: "/placeholder.svg?height=32&width=32",
    category: "Senior level",
  }

  return (
    <div>
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500 py-16 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/20"></div>
        </div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-teal-300 rounded-full opacity-20 blur-3xl"></div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-yellow-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 shadow-lg transform hover:scale-105 transition-transform">
              <span className="inline-block w-2 h-2 bg-yellow-600 rounded-full"></span>
              {startup.date}
            </div>

            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white bg-black inline-block px-6 py-3 mb-4 shadow-xl transform -rotate-1">
                {startup.title}
              </h1>
            </div>

            <p className="text-white text-lg md:text-xl font-medium max-w-3xl leading-relaxed backdrop-blur-sm bg-black/10 p-4 rounded-lg border-l-4 border-yellow-300">
              {startup.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-white text-sm font-medium">{startup.category}</span>
              </div>

              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span className="text-white text-sm font-medium">{startup.students}+ students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-[2fr_1fr] gap-8">
            {/* Left Column - Main Content */}
            <div>
              <div className="bg-gray-900 rounded-lg overflow-hidden mb-8">
                <div className="relative aspect-video">
                  <Image src={startup.image || "/placeholder.svg"} alt={startup.title} fill className="object-cover" />

                  <div className="absolute bottom-4 right-4 bg-white rounded-full p-4">
                    <div className="relative h-16 w-16">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt="JS Mastery"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 text-white">
                  <h2 className="text-2xl font-bold mb-2">
                    Master <span className="text-blue-400">Modern</span> Web Development
                    <br />
                    With a <span className="text-purple-400">Project-Based</span> Approach
                  </h2>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1">{startup.rating}</span>
                    </div>
                    <span>{startup.reviews} reviews on Trustpilot</span>
                    <span>{startup.students}+ students & subscribers</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={startup.founder.avatar || "/placeholder.svg"} alt={startup.founder.name} />
                  <AvatarFallback>AH</AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-bold">
                    {startup.founder.name} - {startup.founder.title}
                  </h3>
                  <p className="text-sm text-gray-600">{startup.founder.username}</p>
                </div>

                <Badge className="ml-auto bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                  {startup.category}
                </Badge>
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">Pitch details</h3>
                <div className="space-y-4 text-gray-700">
                  {startup.pitchDetails.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Similar Startups */}
            <div>
              <h3 className="font-bold text-lg mb-4">Similar startups</h3>
              <StartupCard startup={similarStartup} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
