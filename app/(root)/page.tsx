"use client";
import { AvatarFallback } from "@/app/components/ui/avatar"
import { AvatarImage } from "@/app/components/ui/avatar"
import { Avatar } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Search, ArrowUpDown } from "lucide-react"
import StartupGrid from "@/app/components/startupGrid"
import UserAvatars from "@/app/components/userAvatars"
import { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"

const CATEGORIES = [
  "Finance",
  "E-commerce",
  "Technology",
  "Healthcare",
  "Education",
  "Entertainment",
  "Real Estate",
  "Food & Beverage",
  "Travel",
  "Other"
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("publishedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/startups/search?query=${encodeURIComponent(searchQuery)}&sortBy=${sortBy}&sortOrder=${sortOrder}&category=${selectedCategory}`
      );
      const { data } = await response.json();
      setStartups(data);
    } catch (error) {
      console.error("Error searching startups:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [sortBy, sortOrder, selectedCategory]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
              <Input 
                placeholder="SEARCH STARTUP" 
                className="pl-4 pr-12 py-6 rounded-full bg-white/90 text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button 
                size="icon" 
                className="absolute right-1 top-1 rounded-full h-10 w-10"
                onClick={handleSearch}
              >
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Featured startups</h2>
            <div className="flex items-center gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="publishedAt">Date</SelectItem>
                  <SelectItem value="views">Views</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <StartupGrid startups={startups} loading={loading} />
        </div>
      </section>
    </div>
  )
}
