import StartupCard from "./startupCard"

export default function StartupGrid() {
  // Mock data for startup cards
  const startups = [
    {
      id: 1,
      date: "20 May, 2023",
      likes: 232,
      founder: "Steven Smith",
      name: "EcoTrack",
      description:
        "A mobile app that helps users track and reduce their carbon footprint through daily habits and sustainable choices.",
      image: "/placeholder.svg?height=200&width=300",
      founderImage: "/placeholder.svg?height=32&width=32",
      category: "Senior level",
    },
    {
      id: 2,
      date: "20 May, 2023",
      likes: 232,
      founder: "Steven Smith",
      name: "EcoTrack",
      description:
        "A mobile app that helps users track and reduce their carbon footprint through daily habits and sustainable choices.",
      image: "/placeholder.svg?height=200&width=300",
      founderImage: "/placeholder.svg?height=32&width=32",
      category: "Education",
    },
    {
      id: 3,
      date: "20 May, 2023",
      likes: 232,
      founder: "Steven Smith",
      name: "EcoTrack",
      description:
        "A mobile app that helps users track and reduce their carbon footprint through daily habits and sustainable choices.",
      image: "/placeholder.svg?height=200&width=300",
      founderImage: "/placeholder.svg?height=32&width=32",
      category: "EdTech",
    },
    {
      id: 4,
      date: "20 May, 2023",
      likes: 232,
      founder: "Steven Smith",
      name: "EcoTrack",
      description:
        "A mobile app that helps users track and reduce their carbon footprint through daily habits and sustainable choices.",
      image: "/placeholder.svg?height=200&width=300",
      founderImage: "/placeholder.svg?height=32&width=32",
      category: "Senior level",
    },
    {
      id: 5,
      date: "20 May, 2023",
      likes: 232,
      founder: "Steven Smith",
      name: "EcoTrack",
      description:
        "A mobile app that helps users track and reduce their carbon footprint through daily habits and sustainable choices.",
      image: "/placeholder.svg?height=200&width=300",
      founderImage: "/placeholder.svg?height=32&width=32",
      category: "Management",
    },
    {
      id: 6,
      date: "20 May, 2023",
      likes: 232,
      founder: "Steven Smith",
      name: "EcoTrack",
      description:
        "A mobile app that helps users track and reduce their carbon footprint through daily habits and sustainable choices.",
      image: "/placeholder.svg?height=200&width=300",
      founderImage: "/placeholder.svg?height=32&width=32",
      category: "EdTech",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {startups.map((startup) => (
        <StartupCard key={startup.id} startup={startup} />
      ))}
    </div>
  )
}
