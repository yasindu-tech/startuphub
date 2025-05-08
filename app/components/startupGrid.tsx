"use client";
import React from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Eye } from "lucide-react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

interface Startup {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: any;
  views: number;
  slug: { current: string };
  publishedAt: string;
}

interface StartupGridProps {
  startups: Startup[];
  loading: boolean;
}

const { projectId, dataset } = client.config();

interface SanityImageSource {
  asset: {
    _ref: string;
  };
}

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const StartupGrid: React.FC<StartupGridProps> = ({ startups = [], loading = false }) => {
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

  if (startups.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No startups found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {startups.map((startup) => (
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
      ))}
    </div>
  );
};

export default StartupGrid;
