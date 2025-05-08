"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Eye, Rocket } from "lucide-react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

const { projectId, dataset } = client.config();

const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const UserStartups = ({ userEmail }) => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch("/api/startups");
        const { data } = await response.json();

        const userStartups = data.filter(
          (startup) => startup.author.email === userEmail
        );
        setStartups(userStartups);
      } catch (error) {
        console.error("Error fetching startups:", error);
        setError("Failed to load startups");
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg" />
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {startups.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <Rocket className="h-12 w-12 text-emerald-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Startups Yet</h3>
          <p className="text-gray-500 text-center mb-6 max-w-md">
            Start your entrepreneurial journey by creating your first startup. Share your vision with the world!
          </p>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
            <Link href="/startup/create" className="flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              Create Your First Startup
            </Link>
          </Button>
        </div>
      ) : (
        startups.map((startup) => (
          <Link href={`/startup/${startup.slug.current}`} key={startup._id}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-200">
              <div className="relative h-48">
                {startup.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={urlFor(startup.image)?.url() || ""}
                      alt={startup.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
              </div>
              <CardHeader>
                <h3 className="text-xl font-semibold line-clamp-1">
                  {startup.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-2 mb-4">
                  {startup.description}
                </p>
                <Badge variant="secondary">{startup.category}</Badge>
              </CardContent>
              <CardFooter className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{startup.views}</span>
                </div>
                <span>
                  {new Date(startup.publishedAt).toLocaleDateString()}
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
};

export default UserStartups;
